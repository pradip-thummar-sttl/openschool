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
import { opacity, showMessage } from "../../../../utils/Constant";
import Header from "./Header";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import TeacherLessonDetail from "../teacherlessondetail/TeacherLessonDetail";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../utils/Messages";
import ArrowNext from "../../../../svg/teacher/lessonhwplanner/ArrowNext";
var moment = require('moment');

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
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props.item.LiveSession ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{(props.item.LiveSession).toString()}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props.item.LiveSession ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{(props.item.Publish).toString()}</Text>
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

const LessonList = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isAddSubject, setAddSubject] = useState(false)
    const [isTLDetail, setTLDetail] = useState(false)
    const [data, setItem] = useState([])
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
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLessonLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.post(data, `${EndPoints.GetLessionById}/${User.user._id}`, (res) => {
            setLessonLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setLessonData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }


    const renderList = () => {
        return (
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    <View style={PAGESTYLE.whiteBg}>
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
                        <View style={PAGESTYLE.pupilTabledata}>
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
                                            style={{ height: wp(53.5) }}
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
                </ScrollView>
            </View>
        )
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isTLDetail ?
                        <TeacherLessonDetail
                            data={data}
                            goBack={() => { refresh(), setTLDetail(false) }}
                            onAlertPress={() => props.navigation.openDrawer()} />
                        :
                        renderList()
            }
        </View>
    );
}
export default LessonList;