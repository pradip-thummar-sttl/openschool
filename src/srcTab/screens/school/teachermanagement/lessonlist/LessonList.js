import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import { opacity, showMessage, Var } from "../../../../../utils/Constant";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../../utils/Model";
import TeacherLessonDetail from "../lessondetail/LessonDetail";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import ArrowNext from "../../../../../svg/teacher/lessonhwplanner/ArrowNext";
var moment = require('moment');

const Pupillist = (props, { }) => (
    <TouchableOpacity activeOpacity={opacity} onPress={() => props.navigateToDetail()}>
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
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props?.item?.LiveSession === true ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{props?.item?.LiveSession === true ? 'Yes' : 'No' }</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text style={[PAGESTYLE.pupilName, PAGESTYLE.yesText, { marginLeft: hp(0.8), color: props?.item?.Publish === true ? COLORS.dashboardPupilBlue : COLORS.yellowDark }]}>{props?.item?.Publish === true ? 'Yes' : 'No' }</Text>
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
    const [isHide] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [] = useState(false)
    const [isTLDetail, setTLDetail] = useState(false)
    const [data, setItem] = useState([])

    const pupilRender = ({ item }) => {
        return (
            <Pupillist item={item} navigateToDetail={() => { setItem(item), setTLDetail(true), props.setLessonDetail(true) }}
            />
        );
    };

    const [lessonData, setLessonData] = useState([])
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [] = useState('')
    const [] = useState('')



    useEffect(() => {
        fetchRecord(props.search, props.filter)
    }, [props])

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLessonLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            limit : '50',
            pageNo:'1'
        }
        Service.post(data, `${EndPoints.GetLessionById}/${props.data.TeacherId}`, (res) => {
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
                                        <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHW1} title2={MESSAGE.noLessonHW2} />
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.onNotification(); 
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isTLDetail ?
                        <TeacherLessonDetail
                            data={data}
                            goBack={() => { refresh(), setTLDetail(false), props.setLessonDetail(false) }}
                            onAlertPress={() => openNotification()} />
                        :
                        renderList()
            }
        </View>
    );
}
export default LessonList;