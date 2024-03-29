import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
// import FONTS from '../../../../../utils/Fonts';
// import Sidebar from "../../../component/reusable/sidebar/Sidebar";
// import Header from "./Header";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { isDesignBuild, opacity, showMessage } from "../../../../../utils/Constant";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { User } from "../../../../../utils/Model";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import ArrowNext from "../../../../../svg/teacher/lessonhwplanner/ArrowNext";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import TickMarkGrey from "../../../../../svg/teacher/lessonhwplanner/TickMark_Grey";
import SchoolHeader from "./SchoolHeader";

const STLessonList = (props) => {
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    const [lessonData, setLessonData] = useState([])
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')
    let currentCount = 0
    useEffect(() => {
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
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLessonLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.post(data, `${EndPoints.GetLessionById}/${props.id}`, (res) => {
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
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);

    const renderItem = ({ item, index }) => {
        return (
            <Item
                item={item}
                navigateToDetail={() => props.navigateDetails(item)}
                style={{ backgroundColor: COLORS.white }}
            />
        );
    };
    const Item = ({ navigateToDetail, style, item }) => (
        <TouchableOpacity
            style={[PAGESTYLE.pupilDetailLink, PAGESTYLE.topListingArrow]}
            activeOpacity={opacity}
            onPress={() => props.navigateDetails(item)}>
            <View style={[PAGESTYLE.item]}>
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
                    <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon,]} height={hp(1.51)} width={hp(0.95)} />
                </View>
                <View style={PAGESTYLE.row}>
                    <View style={PAGESTYLE.checkMarkedText}>
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
    
    return (
        <View style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.backgroundColorCommon,flex : 1}}>
            <View style={{ width: isHide ? '100%' : '100%', flexDirection: 'column', }}>
                <View style={{ backgroundColor: 'white', width: '100%', }}>
                    <SchoolHeader
                        onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                        onSearch={() => fetchRecord(searchKeyword, filterBy)}
                        onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                        onFilter={(filterBy) => fetchRecord('', filterBy)} />
                </View>

                <View style={{flex : 1}}>
                    {isLessonLoading ?
                        <ActivityIndicator
                            style={{ margin: 20 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        lessonData.length > 0 ?
                            <FlatList
                                style={{ paddingHorizontal: hp(1.84), marginBottom: hp(1.47)}}
                                data={lessonData}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLesson1} title2={MESSAGE.noLessonHW2} />
                    }
                </View>

            </View>
        </View>
    );
}
export default STLessonList;