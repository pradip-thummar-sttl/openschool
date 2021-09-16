import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform, View, TouchableOpacity, Text, Image } from "react-native";
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

const Pupillist = (props, { item }) => (
    <TouchableOpacity onPress={() => { props.onPress() }}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile}>
                <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(20), fontFamily: FONTS.fontSemiBold }]}>{item.FirstName} {item.LastName}</Text>
            </View>
            <View style={PAGESTYLE.groupColumnmain}>
                <View style={PAGESTYLE.groupColumn}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.TeachingYear}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.LessonCount}</Text>
                </View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.HomeworkCount}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                <View style={PAGESTYLE.rewardStar}>
                    <Text numberOfLines={1} style={{ ...PAGESTYLE.pupilgroupName, width: hp(20), }}>{item.Email}</Text>
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
        isDataLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            isDataLoading(false)
            if (res.code == 200) {
                // console.log('response of get all lesson event:', res)
                setTeacherData(res.data)
                // dispatch(setCalendarEventData(res.data))
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            isDataLoading(false)
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
                <HeaderTM
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    navigateToAddLesson={() => setTeacherAdd(true)}
                    refreshList={() => refresh()} />
                {isTeacherAdd ?
                    <TeacherProfileAdd
                        navigateToBack={() => setTeacherDetail(false)} />
                    :
                    isTeacherDetail ?
                        <TeacherProfileView
                            navigateToBack={() => setTeacherDetail(false)} />
                        :
                        <View style={{ ...PAGESTYLE.backgroundTable, flex: 1, }}>
                            {isDataLoading ?
                                <ActivityIndicator
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.blueButton} />
                                :
                                teacherData.length > 0 ?
                                    <View>
                                        <View style={PAGESTYLE.pupilTable}>
                                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Name</Text>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total {teacherData.length} Teachers</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil2]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Teaching Year</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil3]}>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Scheduled Activity</Text>
                                                <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Lessons</Text>
                                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Homework</Text>
                                                </View>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil4]}>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Contact</Text>
                                            </View>
                                        </View>
                                        <View style={[STYLE.hrCommon, PAGESTYLE.pupilhrCustomMargin]}></View>
                                        <View style={PAGESTYLE.pupilTabledata}>
                                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                <FlatList
                                                    data={teacherData}
                                                    renderItem={pupilRender}
                                                    style={PAGESTYLE.pupilListing}
                                                    keyExtractor={(item) => item.id}
                                                    extraData={selectedId}
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
                }
            </View>
        </View >
    );
}
export default TeacherManagement;