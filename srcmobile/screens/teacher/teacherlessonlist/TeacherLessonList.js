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
import RBSheet from "react-native-raw-bottom-sheet";
const TeacherLessonList = (props) => {
    const refRBSheet = useRef();
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    const [dashData, setdashData] = useState([])
    const [pupilData, setPupilData] = useState([])
    const [isDashDataLoading, setDashDataLoading] = useState(true)
    const [isPupilDataLoading, setPupilDataLoading] = useState(true)
    useEffect(() => {
        // if(isDesignBuild)
        //     return true

        Service.post({}, `${EndPoints.GetLessionById}/604b09139dc64117024690c3`, (res) => {
            setDashDataLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setdashData(res.data)
                setDataOfSubView(res.data[0])
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })

        Service.get(`${EndPoints.PupilByTeacherId}/604b09139dc64117024690c3`, (res) => {
            setPupilDataLoading(false)
            if (res.code == 200) {
                console.log('response of get all pupil data', res)
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all pupil error', err)
        })
        return () => {
        }
    }, [])
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);
    const [dataOfSubView, setDataOfSubView] = useState([])
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(dashData[index])
    }
    const renderItem = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;
        return (
            <Item
                item={item}
                onPress={() => setData(index)}
                style={{ backgroundColor }}
            />
        );
    };
   
    const Item = ({ onPress, style, item }) => (
        <TouchableOpacity style={[PAGESTYLE.item, style]}>

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
                    onPress={() => props.navigation.navigate('TeacherLessonDetail')}>
                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                </TouchableOpacity>
            </View>
            <View style={PAGESTYLE.row}>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={Images.CheckIcon} />
                    <Text style={PAGESTYLE.tickText}>Live Lesson</Text>
                </View>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={Images.CheckIconGrey} />
                    <Text style={PAGESTYLE.tickText}>Published</Text>
                </View>
                <View style={PAGESTYLE.checkMarkedText}>
                    <Image style={PAGESTYLE.tickIcon} source={Images.CheckIcon} />
                    <Text style={PAGESTYLE.tickText}>Homework</Text>
                </View>
            </View>

        </TouchableOpacity>
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
                    navigateToAddSubject={() => props.navigation.navigate('TLDetailAdd')}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => { }}
                    onClearSearch={() => { }}
                    onFilter={(filterBy) => { }} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.padLeftRight}>
                    <View>
                        {isDashDataLoading ?
                            <ActivityIndicator
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.yellowDark} />
                            :
                            dashData.length > 0 ?
                                <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                    <FlatList
                                        style={PAGESTYLE.ScrollViewFlatlist}
                                        data={dashData}
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