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
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Popupaddnewdata from "../../../component/reusable/popup/Popupaddnewdata"
const TeacherLessonEmpty = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{width: isHide? '93%' : '78%'}}>
                <HeaderWhite />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={styles.whiteBoard}>
                        <View><Popupaddnewdata /></View>
                        <View style={{top: 20,}}><Popupdatasecond /></View>
                        <View style={{top: 40,}}><Popupdata /></View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default TeacherLessonEmpty;

const styles = StyleSheet.create({
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        height: hp(65),
        padding: hp(5),
        marginTop: hp(4),
    },
});