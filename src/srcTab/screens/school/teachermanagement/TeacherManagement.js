import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform, View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import COLORS from "../../../../utils/Colors";
import PAGESTYLE from './Style';
import HeaderTM from "./header/HeaderTM";
import { baseUrl, showMessage, Var } from "../../../../utils/Constant";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import { BadgeIcon, User } from "../../../../utils/Model";
import ArrowNext from "../../../../svg/teacher/pupilmanagement/ArrowNext";
import NoPupil from "../../../../svg/emptystate/NoPupil";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import TeacherProfileView from "./TeacherProfileView";
import TeacherProfileAdd from "./TeacherProfileAdd";
import TeacherProfileEdit from "./TeacherProfileEdit";
import MESSAGE from "../../../../utils/Messages";
import { FlatList } from "react-native-gesture-handler";
import FONTS from "../../../../utils/Fonts";

var pageNo = 1;
var DataArr = [];

const Pupillist = (props) => (
    <TouchableOpacity onPress={() => { props.onPress() }}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile}>
                <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + props.item.ProfilePicture }}></Image>
                <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{props.item.TitleName}</Text>
            </View>
            <View style={PAGESTYLE.nameColumnmain}>
                <View style={PAGESTYLE.groupColumn}>
                    <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: '75%' }]}>{props.item.FirstName} {props.item.LastName}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.groupColumnmain}>
                <View style={PAGESTYLE.groupColumn}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{props.item.TeachingYear.length > 0 ? props.item.TeachingYear : ' - '}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{props.item.LessonCount}</Text>
                </View>
                <View style={PAGESTYLE.perfomanceDotmain}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{props.item.HomeworkCount}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                <View style={PAGESTYLE.rewardStar}>
                    <Text numberOfLines={1} style={{ ...PAGESTYLE.pupilgroupName, width: hp(27.5) }}>{props.item.Email}</Text>
                </View>
            </View>
            {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
        </View>
    </TouchableOpacity>
);

const TeacherManagement = (props) => {

    const [isTeacherDetail, setTeacherDetail] = useState(false)
    const [isTeacherAdd, setTeacherAdd] = useState(false)
    const [isTeacherEdit, setTeacherAddEdit] = useState(false)

    const [teacherDetailData, setTeacherDetailData] = useState({})
    const [isHide, action] = useState(true);
    const [isDataLoading, setDataLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [limit,setLimit] = useState('50')
   
    useEffect(() => {
        pageNo = 1
        fetchRecord(pageNo, searchKeyword, filterBy);

        return () => {
            DataArr = [];
        }

    }, [])

    const refresh = () => {
        // textInput.current.clear()
        pageNo = 1;
        setSearchKeyword("")
        fetchRecord(1, "", filterBy);
    }

    const addMorePage = () => {
        if (DataArr.length > (limit - 1)) {
            setDataLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => { fetchRecord(pageNo, searchKeyword, filterBy) }, 1500)
        }
    }

    const fetchRecord = (pNo, searchBy, filterBy) => {
        setDataLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pNo),
            limit: limit
        }
        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {

                if (res.data && pNo == 1) {
                    DataArr = [];
                    DataArr = res.data;
                }
                else if (res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        DataArr.push(res.data[i]);
                    }
                }
                setDataLoading(false)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            
            setDataLoading(false)
            console.log('response of get all lesson error', err)
        })
    }

    const pupilRender = ({ item }) => {
        return (
            <Pupillist item={item} onPress={() => { setTeacherDetailData(item); setTeacherDetail(true) }} />
        );
    };

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
    }
    
    const onEditClick = () => {
        setTeacherAddEdit(true);
        setTeacherDetail(false);
    }
    const onRefress = () => {
        setTeacherAddEdit(false);
        fetchRecord('', '')
    }


    return (
        <View style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.backgroundColorCommon }}>
            <View style={{ width: isHide ? '100%' : '78%' }}>
                {isTeacherDetail ? <TeacherProfileView onNavigation={props.navigation} selectedTeacher={teacherDetailData} navigateToBack={() => setTeacherDetail(false)} onEditTeacherProfile={() => onEditClick()} />
                    :
                    isTeacherAdd ? <TeacherProfileAdd navigateToBack={() => setTeacherAdd(false)} />
                        :
                        isTeacherAdd ? <TeacherProfileAdd navigateToBack={() => { setTeacherAdd(false); onRefress() }} openNotification={() => { openNotification() }} />
                            :
                            isTeacherEdit ? <TeacherProfileEdit navigateToBack={() => onRefress()} selectedTeacher={teacherDetailData} openNotification={() => { openNotification() }} />
                                :
                                <>
                                    <HeaderTM
                                        onAlertPress={() => { openNotification() }}
                                        onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                                        refreshList={() => refresh()}
                                        navigateToAddTeacher={() => setTeacherAdd(true)}

                                        onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                                        onSearch={() => { pageNo = 1; fetchRecord(1, searchKeyword, filterBy) }}
                                        onClearSearch={() => { setSearchKeyword(''); pageNo = 1; fetchRecord(1, '', filterBy) }}
                                        onFilter={(filterBy) => { pageNo = 1; setFilterBy(filterBy); fetchRecord(1, searchKeyword, filterBy) }}

                                    />

                                    <View style={{ ...PAGESTYLE.backgroundTable, flex: 1, }}>
                                        {
                                            DataArr.length > 0 ?
                                                <View>
                                                    <View style={PAGESTYLE.pupilTable}>
                                                        <View style={{ width: '3%' }}>
                                                        </View>
                                                        <View style={{ width: '5%' }}>
                                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Title</Text>
                                                        </View>
                                                        <View style={{ width: '20%', }}>
                                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Name</Text>
                                                        </View>
                                                        <View style={{ width: '13%', }}>
                                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Teaching Year</Text>
                                                        </View>
                                                        <View style={{ width: '25%', alignItems: 'center', marginRight: hp(4), }}>
                                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle,]}>Scheduled Activity</Text>
                                                            <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Lessons</Text>
                                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Homework</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: '25%' }}>
                                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle]}>Contact</Text>
                                                        </View>
                                                    </View>
                                                    <View style={PAGESTYLE.pupilTabledata}>
                                                        <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                            <FlatList
                                                                data={DataArr}
                                                                renderItem={pupilRender}
                                                                style={PAGESTYLE.pupilListing}
                                                                keyExtractor={(item) => item.id}
                                                                extraData={null}
                                                                showsVerticalScrollIndicator={false}
                                                                nestedScrollEnabled
                                                                onEndReachedThreshold={0.5}
                                                                onEndReached={() => addMorePage()}
                                                            />
                                                        </SafeAreaView>
                                                    </View>
                                                </View>
                                                :
                                                <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.noTeacher1} title2={MESSAGE.noTeacher2} />
                                        }
                                    </View>
                                </>
                }
            </View>

            {isDataLoading &&
                <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        style={{ flex: 1, marginTop: 20 }}
                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                        color={COLORS.yellowDark} />
                </View>
            }
        </View >
    );
}
export default TeacherManagement;