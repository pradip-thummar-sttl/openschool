import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { opacity } from "../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";
import BackArrow from "../../../../svg/common/BackArrow";
import Notification from "../../../../svg/teacher/dashboard/Notification";
const HeaderPMInner = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(props.tabSelected);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        // props.onFilter(filterBy)
    }, [filterBy])

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.titleRow}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => props.navigateToBack()}>
                        {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                        <BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.mainTitle}>{props.pupilName}</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => props.onNotification()}
                        style={styles.notificationBar}
                        activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={styles.lessonPlanTab}>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(0), props.tabIndex(0) }}>
                                <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>Teacher profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(1), props.tabIndex(1) }}>
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(2), props.tabIndex(2) }}>
                                <Text style={[styles.tabsText, tabIndex == 2 ? styles.tabsTextSelected : null]}>Lesson {'&'} Homework</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default HeaderPMInner;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1, borderColor: COLORS.dashBoard,
        paddingLeft: hp(3.90),
        paddingRight: hp(2.0),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(2),
        paddingBottom: hp(2),
    },
    headerMain: {
        backgroundColor: COLORS.white,
        width: '100%',
    },
    mainTitle: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
        top: 2,
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(2),
        top: 2,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
        top : Platform.OS === 'android' ? 5 : 10
    },
    whiteBg: {
        paddingLeft: hp(3.90),
        paddingRight: hp(2.0),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(2),
        paddingBottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessonPlanTop: {
        flexDirection: 'row',
    },
    lessonPlanTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabs: {
        paddingRight: hp(2.5),
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.6),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
});