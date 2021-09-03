import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground, Platform, BackHandler } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import Popuphomework from '../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../reusable/popup/Popupsubmithomework';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { opacity } from "../../../../utils/Constant";
import BackArrow from "../../../../svg/common/BackArrow";
import More from "../../../../svg/teacher/dashboard/More";
const NewMessageHeader = (props) => {
    const menu = useRef(null)

    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.onGoback() 
        return true;
      }


    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <TouchableOpacity activeOpacity={opacity}
                    onPress={() => props.onGoback()}>
                    {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                    <BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>New Message</Text>
                <View style={styles.headerRight}>
                    {/* <TouchableOpacity style={styles.buttonGrp}>
                        <Text style={STYLE.commonButtonBorderedGreen}>open workspace</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGroup}>
                        <Text style={styles.commonButtonGreenheader}>see homework</Text>
                    </TouchableOpacity>*/}
                    {/* <TouchableOpacity style={styles.moreMenu}>
                        <Image style={styles.moreIcon} source={Images.SidebarMore} />
                    </TouchableOpacity>  */}
                    {props.status == 'Sent' ?
                        null
                        :
                        <View style={styles.buttonGroup}>
                            <Menu ref={menu}>
                                <MenuTrigger>
                                    {/* <TouchableOpacity style={styles.moreMenu}> */}
                                    {/* <Image style={styles.moreIcon} source={Images.SidebarMore} /> */}
                                    <More style={styles.moreIcon} height={hp(4)} width={hp(4)} />
                                    
                                    {/* </TouchableOpacity> */}
                                </MenuTrigger>
                                <MenuOptions>
                                    {props.status == 'Draft' ?
                                        null
                                        :
                                        <MenuOption style={styles.borderList}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => { menu.current.close(); props.onDraft() }}>
                                                <View style={styles.filterList}>
                                                    <Text style={styles.filterListText}>SAVE AS DRAFT</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </MenuOption>
                                    }
                                    <MenuOption style={styles.borderList}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { menu.current.close(); props.onSent() }}>
                                            <View style={styles.filterList}>
                                                <Text style={styles.filterListText}>SEND MESSAGE</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                            {/* <Image style={styles.filterIcon} source={Images.FilterIcon} /> */}
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}
export default NewMessageHeader;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(2.46),
        paddingRight: hp(2),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
        paddingBottom: 15,
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
        alignItems: 'center',
        marginLeft: 15
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    calnderDashHeaderIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
        // height: hp(4.20),
    },
    filterbarMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp,
        // paddingBottom: hp(1.5),
    },
    field: {
        position: 'relative',
        width: hp(53.25),
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: wp(4.6),
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
        paddingLeft: wp(2.2),
        paddingRight: wp(4),
        paddingTop: hp(1.4),
        // paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
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
        marginRight: wp(1.69),
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
        // paddingBottom: hp(1.4),
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
        // paddingBottom: hp(1.4),
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
        // paddingBottom: hp(1),
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        // paddingBottom: hp(1),
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
        color: COLORS.black,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontBold,
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
        resizeMode: 'contain',
    },
    moreIcon: {
        width: hp(4),
        marginVertical:hp(3),
        resizeMode: 'contain',
    },
    moreMenu: {
        // position: 'absolute',
        // right: hp(3)
        // borderWidth:1,
        width: hp(4.20),
        height: hp(4.20),
        // borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor:COLORS.borderGrp

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
        right: 10,
        position: 'absolute',
    },
});