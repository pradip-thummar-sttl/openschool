import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import { opacity } from "../../../utils/Constant";

const Pupillist = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
            <View style={PAGESTYLE.border}></View>
            <Text style={PAGESTYLE.pupilName}>English</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>Grammar</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName}>14/09/2020</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName}>Group 1A</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, PAGESTYLE.yesText}>Yes</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, PAGESTYLE.yesText}>Yes</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, PAGESTYLE.noText}>No</Text>
            <TouchableOpacity 
            style={PAGESTYLE.pupilDetailLink}
            activeOpacity={opacity}
            onPress={()=>props.navigateToDetail()}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>
        </View>
    </View>
);

const TeacherLessonList = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
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
                navigateToDetail={() => props.navigation.navigate('TeacherLessonDetail')}
            />
        );
    };
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhite />
                <ScrollView style={PAGESTYLE.teacherLessonGrid}>
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
                                <FlatList
                                    data={[1]}
                                    renderItem={pupilRender}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default TeacherLessonList;