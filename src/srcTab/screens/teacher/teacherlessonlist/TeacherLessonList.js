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
var limit = 10;
var DataArr = [];

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

const TeacherLessonList = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isAddSubject, setAddSubject] = useState(false)
    const [isTLDetail, setTLDetail] = useState(false)
    const [data, setItem] = useState([])
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('Date')

    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => { setItem(item), setTLDetail(true) }}
            />
        );
    };

    useEffect(() => {
        fetchRecord(pageNo, searchKeyword, filterBy);
        return () => { DataArr = []; }
    }, [])

    const refresh = () => {
        pageNo = 1;
        setSearchKeyword("")
        fetchRecord(1, "", filterBy);
    }

    const addMorePage = () => {
        if (DataArr.length > limit - 1) {
            setLessonLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => { fetchRecord(pageNo, searchKeyword, filterBy) }, 1500)
        }
    }

    const fetchRecord = (pNo, searchBy, filterBy) => {
        setLessonLoading(true)
        let data = { Searchby: searchBy, Filterby: filterBy, page: String(pNo), limit: limit }

        Service.post(data, `${EndPoints.GetLessionById}/${User.user._id}`, (res) => {
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
                setLessonLoading(false)
            } else {
                setLessonLoading(false)
                showMessage(res.message)
            }
        }, (err) => {
            setLessonLoading(false)
            console.log('response of get all lesson error', err)
        })
    }

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
    }

    const renderList = () => {
        return (
            <View style={{ width: '100%', backgroundColor: COLORS.backgroundColorCommon }}>

                <Header
                    onAlertPress={() => openNotification()}
                    navigateToAddSubject={() => { setAddSubject(true) }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => { pageNo = 1; fetchRecord(1, searchKeyword, filterBy) }}
                    onClearSearch={() => { setSearchKeyword(''); pageNo = 1; fetchRecord(1, '', filterBy) }}
                    onFilter={(filterBy) => { pageNo = 1; setFilterBy(filterBy); fetchRecord(1, searchKeyword, filterBy) }} />

                <View style={PAGESTYLE.whiteBg}>

                    <View style={{ height: '100%', width: '100%' }}>
                        <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                            {
                                DataArr.length > 0 &&
                                    <FlatList
                                        data={DataArr}
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
                            }

                            {
                                DataArr.length == 0 && !isLessonLoading && <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHW1} title2={MESSAGE.noLessonHW2} />
                            }
                            {isLessonLoading &&
                                <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator
                                        size={'large'}
                                        color={COLORS.yellowDark} />
                                </View>
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