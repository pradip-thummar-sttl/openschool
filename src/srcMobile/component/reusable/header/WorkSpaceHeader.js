import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import WhiteCheckIcon from "../../../../svg/teacher/lessonhwplanner/TickMark_White";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import BackArrow from "../../../../svg/common/BackArrow";
const WorkSpaceHeader = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <TouchableOpacity onPress={() => props.goBack()}>
                    {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                    <BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} />
                    
                </TouchableOpacity>
                <Text style={styles.mainTitle}> Leave Workspace</Text>
                <View style={styles.headerRight}>
                    {
                        props.isLoading ?
                            <ActivityIndicator
                                style={{ ...styles.buttonGroup }}
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.white} />
                            :
                            props.isWorkspace ?
                                <TouchableOpacity onPress={() => props.onSaveWorkSpacePress()} style={styles.buttonGroup}>
                                    {/* <Text style={styles.commonButtonGreenheader}>Save Workspace</Text> */}
                                    {/* <Image style={styles.addIcon} source={Images.CheckIconWhite} /> */}
                                    <WhiteCheckIcon style={styles.addIcon} height={hp(1.58)} width={hp(1.80)} />
                                </TouchableOpacity>
                                : null
                    }

                    {/* <TouchableOpacity onPress={() => props.onAlertPress()} style={styles.notificationBar}>
                        <Image style={styles.massagesIcon} source={Images.Notification} />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}
export default WorkSpaceHeader;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingHorizontal: hp(2.5),
        backgroundColor: COLORS.white,
        paddingBottom: 10,
        paddingTop: hp(5.85),
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: hp(1.97),
        fontFamily: FONTS.fontSemiBold,
        marginLeft: 15,
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
        justifyContent: 'center',
        backgroundColor: COLORS.buttonGreen,
        height: 40,
        width: 40,
        borderRadius: 5,
        marginVertical: 4,
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
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
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
        alignItems: 'center',
        right: 0,
        position: 'absolute',
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
        width: 20,
        resizeMode: 'contain',
    },
});