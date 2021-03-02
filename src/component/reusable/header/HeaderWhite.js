import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
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
                <Text style={styles.mainTitle}>Lesson and homework planner</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationBar}>
                        <Image style={styles.massagesIcon} source={require('../../../assets/images/notification2.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filterbarMain}>
                <View style={styles.field}>
                    <Image
                        style={styles.userIcon}
                        source={require('../../../assets/images/search2.png')} />
                    <TextInput
                        style={[STYLE.commonInput, styles.searchHeader]}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                    />
                </View>
                <TouchableOpacity style={styles.buttonGroup}>
                    <Menu>
                        <MenuTrigger style={styles.commonButtonBorderedheader} text='by subject' />
                        <MenuOptions style={styles.filterListWrap}>
                            <MenuOption>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Subject</Text>
                                    <Image source={require('../../../assets/images/check-icon2.png')} style={styles.checkMark} />
                                </View>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Date</Text>
                                </View>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Name</Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Image style={styles.filterIcon} source={require('../../../assets/images/filter2.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGroup}>
                    <Image style={styles.addIcon} source={require('../../../assets/images/addIcon2.png')} />
                    <Text style={styles.commonButtonGreenheader}>Add Subject</Text>
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
        marginBottom: hp(5.85),
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
    massagesIcon: {
        width: wp(5.20),
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
        fontSize: hp(3),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2.2),
        paddingRight: hp(4),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
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
    filterList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderBottomWidth: 1,
        lineHeight: hp(4.94),
        paddingBottom: hp(1),
        marginBottom: hp(1),
        borderRadius: hp(0.78),
    },
    filterListWrap: {
        paddingLeft: hp(1.21),
        paddingRight: hp(1.21),
        paddingTop: hp(0.25),
        paddingBottom: hp(0.25),
    },
    checkMark: {
        width: hp(1.48),
        resizeMode: 'contain',
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    }
});