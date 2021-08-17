import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header3 from '../../../component/reusable/header/bulck/Header3'

const PupilLessonEmpty = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                {/* <HeaderWhite onAlertPress={()=>props.navigation.openDrawer()}/> */}
                <Header3/>
                <ScrollView showsVerticalScrollIndicator={false} style={STYLE.padLeftRight}>
                    <View style={styles.whiteBoard}>
                        <View><Popupdata /></View>
                        <View style={{ top: 20, }}><Popupdatasecond /></View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilLessonEmpty;

const styles = StyleSheet.create({
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        height: hp(65),
        padding: hp(5),
    },
});