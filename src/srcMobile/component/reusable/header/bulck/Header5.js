import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';
import Popuphomework from '../../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../../reusable/popup/Popupsubmithomework';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Notification from "../../../../../svg/teacher/dashboard/Notification";
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import AddWhite from "../../../../../svg/teacher/timetable/Add_White";
import Ic_BlueCheck from "../../../../../svg/teacher/timetable/ic_blueCheck";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";
import { BadgeIcon } from "../../../../../utils/Model";
const HeaderWhite = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <Text style={styles.mainTitle}>Common Title</Text>
                <View style={styles.headerRight}>
                    {/* <TouchableOpacity style={styles.notificationBar}>
                        <Image style={styles.calnderDashHeaderIcon} source={Images.calnderDashHeaderIcon} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={()=>props.onNotification()} style={styles.notificationBar}>
                        {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                        {
                        BadgeIcon.isBadge ?
                            <View style={STYLE.redDot}></View> : null
                    }
                        {/* <View style={STYLE.redDot}></View> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filterbarMain}>
                <View style={styles.field}>
                    {/* <Image
                        style={styles.userIcon}
                        source={Images.SearchIcon} /> */}
                        <SearchBlue style={styles.userIcon} height={hp(1.9)} width={hp(1.9)} />
                    <TextInput
                        style={[STYLE.commonInput, styles.searchHeader]}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                    />
                </View>
                <TouchableOpacity style={styles.buttonGroup}>
                    <Menu style={styles.filterGroup}>
                        <MenuTrigger><Text style={styles.commonButtonBorderedheader}>By subject</Text></MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Subject</Text>
                                    <Ic_BlueCheck style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />

                                    {/* <Image source={Images.CheckIcon} style={styles.checkMark} /> */}
                                </View>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Date</Text>
                                </View>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Name</Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    {/* <Image style={styles.filterIcon} source={Images.FilterIcon} /> */}
                    <FilterBlack style={styles.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGroup}>
                    {/* <Image style={styles.addIcon} source={Images.AddIconWhite} /> */}
                    <AddWhite style={styles.addIcon} height={hp(1.55)} width={hp(1.55)} />

                    <Text style={styles.commonButtonGreenheader}>Add Lesson</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default HeaderWhite;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        backgroundColor: COLORS.white,
       // marginBottom: hp(5.85),
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    date: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontRegular,
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    filterbarMain: {
        flexDirection: 'row',
        marginBottom: hp(2.60),
    },
    field: {
        position: 'relative',
        width: hp(81.11),
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
        paddingTop: hp(1.2),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'capitalize',
        fontFamily: FONTS.fontRegular,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.82),
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
        position: 'absolute',
        top: hp(1.29),
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
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
});