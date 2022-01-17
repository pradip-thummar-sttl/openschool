import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import { opacity, showMessage, Var } from "../../../../utils/Constant";
import Header from "./Header";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import TLDetailAdd from "../teacherlessondetail/lessonplan/TeacherLessonDetailAdd";
import TeacherLessonDetail from "../teacherlessondetail/TeacherLessonDetail";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../utils/Messages";
import ArrowNext from "../../../../svg/teacher/lessonhwplanner/ArrowNext";
var moment = require('moment');

var pageNo = 1;

const Pupillist = (props, { style }) => (
    <TouchableOpacity
        activeOpacity={opacity}
        onPress={() => props.navigateToDetail()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
                <View style={PAGESTYLE.border}></View>
                <Text numberOfLines={1} style={PAGESTYLE.pupilName}>{props.item.SubjectName}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn,]}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(15) }]}>{props.item.LessonTopic}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.date]}>
                <Text numberOfLines={1} style={PAGESTYLE.pupilName}>{moment(props.item.Date).format('DD/MM/yyyy')}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(12) }]}>{props.item.GroupName}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props?.item?.LiveSession ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{(props.item.LiveSession).toString()}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props?.item?.LiveSession ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{(props.item.Publish).toString()}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.lastColumn]}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.noText, { marginLeft: hp(0.8), color: props.item.HomeWork == 'Yes' ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{props.item.HomeWork}</Text>
            </View>
            <View style={PAGESTYLE.pupilDetailLink}>
                {/* <Image style={[PAGESTYLE.pupilDetaillinkIcon,]} source={Images.DashboardRightArrow} /> */}
                <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon,]} height={hp(1.51)} width={hp(0.95)} />
            </View>
        </View>
    </TouchableOpacity>
);
// (props?.item?.LiveSession ? (props.item.LiveSession).toString() : ''

const TeacherLessonList = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isAddSubject, setAddSubject] = useState(false)
    const [isTLDetail, setTLDetail] = useState(false)
    const [data, setItem] = useState([])

    const [pagination, setPaginationData] = useState([])
    const [allNewAndOldData, setAllNewAndOldData] = useState([])

    const [limit, setLimit] = useState('25')



    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? COLORS.selectedDashboard : COLORS.white;
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => { setItem(item), setTLDetail(true) }}
            />
        );
    };

    const [lessonData, setLessonData] = useState([])
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')




    useEffect(() => {
        pageNo = 1;
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLessonLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pageNo),
            limit: limit
        }

        console.log('this is filters data', data)

        Service.post(data, `${EndPoints.GetLessionById}/${User.user._id}`, (res) => {
            if (res.code == 200) {
                console.log('response of get all lesson', res.data.length, '---', allNewAndOldData)
                // setLessonData(res.data)
                setPaginationData(res.pagination)
                if (allNewAndOldData.length > 0) {
                    if (res.data) {
                        let newData = []
                        newData = res.data
                        let newArray = [...allNewAndOldData, ...newData]
                        setLessonData(newArray)
                        setAllNewAndOldData(newArray)
                        setLessonLoading(false)
                    }
                    else {
                        setLessonData(allNewAndOldData)
                        setLessonLoading(false)
                    }
                }
                else {
                    setLessonData(res.data)
                    setAllNewAndOldData(res.data)
                    setLessonLoading(false)
                }

            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const addMorePage = () => {
        console.log('-----lesson data length---', lessonData.length)
        if (lessonData.length != pagination.TotalCount) {
            pageNo = pageNo + 1
            setTimeout(() => {
                fetchRecord('', '')
            }, 1000)
        }
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }


    const renderList = () => {
        return (
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <Header
                    onAlertPress={() => openNotification()}
                    navigateToAddSubject={() => { setAddSubject(true) }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)} />

                {/* <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}> */}
                <View style={PAGESTYLE.whiteBg}>
                    {/* <View style={PAGESTYLE.pupilTable}>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Subject</Text>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Lesson Topic</Text>
                            </View>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Date</Text>
                            </View>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Group</Text>
                            </View>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Live Lesson</Text>
                            </View>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Published</Text>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Homework</Text>
                            </View>
                        </View> */}
                    <View style={{ height: '100%', width: '100%' }}>
                        <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                            {isLessonLoading ?
                                <ActivityIndicator
                                    style={{ flex: 1 }}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.yellowDark} />
                                :
                                lessonData.length > 0 ?
                                    <FlatList
                                        data={lessonData}
                                        renderItem={pupilRender}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedId}
                                        showsVerticalScrollIndicator={false}
                                        style={{ paddingHorizontal: hp(1.22), marginBottom: hp(1.47) }}
                                        contentContainerStyle={{ paddingBottom: wp(12) }}
                                        onEndReachedThreshold={0.5}
                                        onEndReached={() => addMorePage()}
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={PAGESTYLE.pupilTable}>
                                                    <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Subject</Text>
                                                    </View>
                                                    <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Lesson Topic</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Date</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Group</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Live Lesson</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Published</Text>
                                                    </View>
                                                    <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                                                        <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Homework</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    // <View style={{ height: 100, justifyContent: 'center' }}>
                                    //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                    // </View>
                                    <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHW1} title2={MESSAGE.noLessonHW2} />
                            }
                        </SafeAreaView>
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
        )
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isAddSubject ?
                    <TLDetailAdd
                        goBack={() => { refresh(), setAddSubject(false) }}
                        onAlertPress={() => openNotification()} />
                    : isTLDetail ?
                        <TeacherLessonDetail
                            data={data}
                            goBack={() => { refresh(), setTLDetail(false) }}
                            onAlertPress={() => openNotification()} />
                        :
                        renderList()
            }
        </View>
    );
}
export default TeacherLessonList;