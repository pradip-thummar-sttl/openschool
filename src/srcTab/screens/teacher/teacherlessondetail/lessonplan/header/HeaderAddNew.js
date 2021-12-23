import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../../utils/Colors";
// import Images from '../../../../../../utils/Images';
import FONTS from '../../../../../../utils/Fonts';
import { opacity } from "../../../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import TickMarkWhite from "../../../../../../svg/teacher/lessonhwplanner/TickMark_White";
import BackArrow from "../../../../../../svg/teacher/lessonhwplanner/ArrowBack";
import Notification from "../../../../../../svg/teacher/dashboard/Notification";
import { BadgeIcon } from "../../../../../../utils/Model";
import STYLE from "../../../../../../utils/Style";

const HeaderAddNew = (props) => {
    console.log('props', props);
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                {/* <Text style={styles.mainTitle}>
                    <TouchableOpacity activeOpacity={opacity} onPress={() => props.navigateToBack()}>
                        <BackArrow style={styles.arrow} height={hp(2.57)} width={hp(2.23)} />
                    </TouchableOpacity> Add New Lesson
                </Text> */}
                 <View style={{flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
            <TouchableOpacity  activeOpacity={opacity} onPress={() => props.navigateToBack()}>
                        <BackArrow style={styles.arrow} height={hp(2.57)} width={hp(2.23)} />
                    </TouchableOpacity>
                <Text style={styles.mainTitle}>Add New Lesson</Text>
                  
            </View>
                <View style={styles.headerRight}>
                    {
                    props.isLoading ?
                        <ActivityIndicator style={styles.commonButtonGreenheaderwithouticon} size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.white} />
                        :
                        <TouchableOpacity style={styles.buttonGroup} activeOpacity={opacity} onPress={() => props.saveLesson()}>
                            <TickMarkWhite style={styles.addIcon} height={hp(1.55)} width={hp(1.55)} />
                            <Text style={styles.commonButtonGreenheaderwithicon}>Save Lesson</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.notificationBar} onPress={() => props.onAlertPress()} activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                        {
                        BadgeIcon.isBadge && <View style={STYLE.redDot}></View>
                    }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default HeaderAddNew;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(3.90),
        paddingRight: hp(2.0),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(4),
        paddingBottom: hp(2),
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderBottomWidth: 1,
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        alignItems: 'center',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    filterbarMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp,
        paddingBottom: hp(1.5),
    },
    field: {
        position: 'relative',
        width: hp(53.25),
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: hp(4.6),
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
    },
    userIcon: {
        position: 'absolute',
        top: hp(1.1),
        width: hp(1.9),
        resizeMode: 'contain',
        left: hp(1.43),
    },
    commonButtonBorderedheader: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2.2),
        paddingRight: hp(4),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        // textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.5),
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(1.69),
    },
    filterIcon: {
        width: hp(1.74),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
        top: hp(1.19),
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(3.125),
        paddingRight: hp(3.125),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        height: hp(5.20),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        marginLeft: hp(2),
    },
    commonButtonGreenheaderwithicon: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    commonButtonGreenheaderwithouticon: {
        backgroundColor: COLORS.dashboardGreenButton,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        padding: hp(1.4),
        height: hp(5.20),
        width: hp(20.20),
        alignSelf: 'center',
    },
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
        position: 'absolute',
        top: hp(1.5),
        left: hp(1.8),
        zIndex: 9,
    },
    iconTop: {
        top: hp(4.2),
    },
    borderList: {
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderBottomWidth: hp(0.26),
    },
    filterList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp(1),
        paddingBottom: hp(1),
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: hp(5.5),
        right: 0,
        width: hp(30.98),
        borderRadius: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
    },
    checkMark: {
        width: hp(1.48),
        resizeMode: 'contain',
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessonPlanTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lessonPlanTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp(1.90),
    },
    tabs: {
        paddingRight: hp(3.90),
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
    flexEnd: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    arrow: {
        width: hp(2.34),
        // top: -3,
        resizeMode: 'contain',
        marginRight: hp(1),
    },
});