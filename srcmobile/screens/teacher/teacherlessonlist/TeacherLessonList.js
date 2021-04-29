import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "./Header";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { isDesignBuild, opacity, showMessage } from "../../../utils/Constant";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { User } from "../../../utils/Model";

const TeacherLessonList = (props) => {
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
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
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);

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
        <View style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text style={PAGESTYLE.subjectName}>{item.SubjectName}</Text>
                        <Text style={PAGESTYLE.subject}>{item.LessonTopic}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
                <TouchableOpacity
                    style={[PAGESTYLE.pupilDetailLink, PAGESTYLE.topListingArrow]}
                    activeOpacity={opacity}
                    onPress={() => navigateToDetail()}>
                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                </TouchableOpacity>
            </View>
            <View style={PAGESTYLE.row}>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={item.LiveSession ? Images.CheckIcon : Images.CheckIconGrey} />
                    <Text style={PAGESTYLE.tickText}>Live Lesson</Text>
                </View>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={item.Publish ? Images.CheckIcon : Images.CheckIconGrey} />
                    <Text style={PAGESTYLE.tickText}>Published</Text>
                </View>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={item.HomeWork == 'Yes' ? Images.CheckIcon : Images.CheckIconGrey} />
                    <Text style={PAGESTYLE.tickText}>Homework</Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <Header
                    onAlertPress={() => props.navigation.openDrawer()}
                    navigateToAddSubject={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.padLeftRight}>
                    <View>
                        {isLessonLoading ?
                            <ActivityIndicator
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.yellowDark} />
                            :
                            lessonData.length > 0 ?
                                <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                    <FlatList
                                        style={PAGESTYLE.ScrollViewFlatlist}
                                        data={lessonData}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedId}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </SafeAreaView>
                                :
                                <View style={{ height: 100, justifyContent: 'center' }}>
                                    <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                </View>
                        }
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}
export default TeacherLessonList;