import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';
import Popuphomework from '../../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../../reusable/popup/Popupsubmithomework';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
const HeaderWhite = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <Text style={styles.mainTitle}><TouchableOpacity onPress={()=>props.goBack()}><Image style={styles.arrow} source={Images.backArrow} /></TouchableOpacity> Common Title</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationBar}>
                        <Image style={styles.massagesIcon} source={Images.Notification} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filterbarMain}>
                <View style={styles.lessonPlanTop}>
                    <View style={styles.lessonPlanTab}>
                        <TouchableOpacity style={styles.tabs}>
                            <Text style={[styles.tabsText, styles.tabsTextSelected]}>Lesson</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.tabsText}>Homework</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flexEnd}>
                    <View style={styles.field}>
                        <Image
                            style={styles.userIcon}
                            source={Images.SearchIcon} />
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
                                        <Image source={Images.CheckIcon} style={styles.checkMark} />
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
                        <Image style={styles.filterIcon} source={Images.FilterIcon} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={styles.buttonGroup}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
                    <Text style={styles.commonButtonGreenheader}>Add Subject</Text>
                </TouchableOpacity> */}
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
        paddingTop: hp(1.2),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'capitalize',
        fontFamily: FONTS.fontRegular,
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
        flexDirection:'row',
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(1),
    },
});