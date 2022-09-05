import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "./Header";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { isDesignBuild, opacity, showMessage, Var } from "../../../../utils/Constant";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { BadgeIcon, User } from "../../../../utils/Model";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../utils/Messages";
import ArrowNext from "../../../../svg/teacher/lessonhwplanner/ArrowNext";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import TickMarkGrey from "../../../../svg/teacher/lessonhwplanner/TickMark_Grey";


var pageNo = 1;
var limit = 50;
var DataArr = [];

const TeacherLessonList = (props) => {
    const userAuthData = useSelector(state => {
        return state.AuthReducer.userAuthData
    })
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('Date')
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);


    let currentCount = 0

    useEffect(() => {
        pageNo = 1
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const handleBackButtonClick = () => {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
        }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App', ToastAndroid.SHORT)
        }
        setTimeout(() => {
            currentCount = 0;
        }, 2000);

        return true;
    }

    useEffect(() => {
        
        fetchRecord(pageNo, searchKeyword, filterBy);

        return () => {
            DataArr = [];
          }

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

    const renderItem = ({ item, index }) => {
        return (
            <Item
                item={item}
                navigateToDetail={() => props.navigation.navigate('TeacherLessonDetail', { onGoBack: () => refresh(), 'data': item })}
                style={{ backgroundColor: COLORS.white }}
            />
        );
    };

    const Item = ({ navigateToDetail, style, item }) => (
        <TouchableOpacity
            style={[PAGESTYLE.topListingArrow]}
            activeOpacity={opacity}
            onPress={() => navigateToDetail()}>
            <View style={[PAGESTYLE.item, style]}>
                <View style={PAGESTYLE.classSubject}>
                    <View style={PAGESTYLE.subjecRow}>
                        <View style={PAGESTYLE.border}></View>
                        <View style={PAGESTYLE.subjectMain}>
                            <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: 150 }]}>{item.SubjectName}</Text>
                            <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: 150 }]}>{item.LessonTopic}</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.timingMain}>
                        <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                        <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                    </View>
                    {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon,]} height={hp(1.51)} width={hp(0.95)} />
                </View>
                <View style={PAGESTYLE.row}>
                    <View style={PAGESTYLE.checkMarkedText}>
                        {/* <Image style={PAGESTYLE.tickIcon} source={item.LiveSession ? Images.CheckIcon : Images.CheckIconGrey} /> */}
                        {item.LiveSession ?
                            <TickMarkBlue style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                            :
                            <TickMarkGrey style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                        }
                        <Text style={PAGESTYLE.tickText}>Live Lesson</Text>
                    </View>
                    <View style={PAGESTYLE.checkMarkedText}>
                        {/* <Image style={PAGESTYLE.tickIcon} source={item.Publish ? Images.CheckIcon : Images.CheckIconGrey} /> */}
                        {item.Publish ?
                            <TickMarkBlue style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                            :
                            <TickMarkGrey style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                        }
                        <Text style={PAGESTYLE.tickText}>Published</Text>
                    </View>
                    <View style={PAGESTYLE.checkMarkedText}>
                        {/* <Image style={PAGESTYLE.tickIcon} source={item.HomeWork == 'Yes' ? Images.CheckIcon : Images.CheckIconGrey} /> */}
                        {item.HomeWork == 'Yes' ?
                            <TickMarkBlue style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                            :
                            <TickMarkGrey style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                        }
                        <Text style={PAGESTYLE.tickText}>Homework</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => refresh() })
    }

    return (
        <View style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.backgroundColorCommon }}>
            <View style={{ width: isHide ? '100%' : '100%', flexDirection: 'column', }}>
                
                <Header
                    onAlertPress={() => props.navigation.openDrawer()}
                    navigateToAddSubject={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => { pageNo = 1; fetchRecord(1, searchKeyword, filterBy) }}
                    onClearSearch={() => { setSearchKeyword(''); pageNo = 1; fetchRecord(1, '', filterBy) }}
                    onFilter={(filterBy) => { pageNo = 1; setFilterBy(filterBy); fetchRecord(1, searchKeyword, filterBy) }}
                    onNotification={() => openNotification()} />


                {DataArr.length > 0 &&
                    <FlatList
                        style={{ paddingHorizontal: hp(1.84), marginBottom: hp(1.47) }}
                        data={DataArr}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0}
                        onEndReached={() => addMorePage()}
                    />
                }

                {
                    DataArr.length == 0 && !isLessonLoading && <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHW1} title2={MESSAGE.noLessonHW2} />
                }

                {isLessonLoading &&
                    <View style={{ width: '100%', height: '100%', position: 'absolute',alignItems:'center', justifyContent:'center' }}>
                        <ActivityIndicator
                            size={Platform.OS === 'android' ? 'small' : 'large'}
                            color={COLORS.yellowDark} />
                    </View>
                }
            </View>
        </View>
    );
}
export default TeacherLessonList;