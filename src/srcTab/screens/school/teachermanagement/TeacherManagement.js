import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform, View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import COLORS from "../../../../utils/Colors";
import PAGESTYLE from './Style';
import HeaderTM from "./header/HeaderTM";
import { baseUrl, showMessage, Var } from "../../../../utils/Constant";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import { User } from "../../../../utils/Model";
import ArrowNext from "../../../../svg/teacher/pupilmanagement/ArrowNext";
import NoPupil from "../../../../svg/emptystate/NoPupil";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import TeacherProfileView from "./TeacherProfileView";
import TeacherProfileAdd from "./TeacherProfileAdd";
import MESSAGE from "../../../../utils/Messages";
import { FlatList } from "react-native-gesture-handler";
import FONTS from "../../../../utils/Fonts";

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
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{props.item.TeachingYear}</Text>
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
    const [teacherDetailData, setTeacherDetailData] = useState({})
    const [isHide, action] = useState(true);
    const [teacherData, setTeacherData] = useState([])
    const [isDataLoading, setDataLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setDataLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            setDataLoading(false)
            if (res.code == 200) {
                // console.log('response of get all lesson event:', res)
                setTeacherData(res.data)
                // dispatch(setCalendarEventData(res.data))
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setDataLoading(false)
            console.log('response of get all lesson error', err)
        })


    }

    const refresh = () => {
        fetchRecord('', '')
    }

    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                onPress={() => { setTeacherDetailData(item); setTeacherDetail(true) }}
            />
        );
    };

    return (
        <View style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.backgroundColorCommon }}>
            <View style={{ width: isHide ? '100%' : '78%' }}>
                {isTeacherDetail ?
                    <TeacherProfileView
                        selectedTeacher={teacherDetailData}
                        navigateToBack={() => setTeacherDetail(false)} />
                    :
                    isTeacherAdd ?
                        <TeacherProfileAdd 
                            navigateToBack={() => setTeacherAdd(false)} />
                        :
                        <>
                            <HeaderTM
                                onAlertPress={() => { props.navigation.openDrawer() }}
                                onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                                onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                                onSearch={() => fetchRecord(searchKeyword, filterBy)}
                                onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                                refreshList={() => refresh()}
                                navigateToAddTeacher={() => setTeacherAdd(true)}
                                onFilter={(filterBy) => fetchRecord('', filterBy)} />
                            <View style={{ ...PAGESTYLE.backgroundTable, flex: 1, }}>
                                {isDataLoading ?
                                    <ActivityIndicator
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.blueButton} />
                                    :
                                    teacherData.length > 0 ?
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
                                                <View style={{ width: '25%',alignItems: 'center',marginRight: hp(4), }}>
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
                                                        data={teacherData}
                                                        renderItem={pupilRender}
                                                        style={PAGESTYLE.pupilListing}
                                                        keyExtractor={(item) => item.id}
                                                        extraData={null}
                                                        showsVerticalScrollIndicator={false}
                                                        nestedScrollEnabled
                                                    />
                                                </SafeAreaView>
                                            </View>
                                        </View>
                                        :

                                        // <View>
                                        //     <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                        // </View>
                                        <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.noTeacher1} title2={MESSAGE.noTeacher2} />
                                }
                            </View>
                        </>
                }
            </View>
        </View >
    );
}
export default TeacherManagement;