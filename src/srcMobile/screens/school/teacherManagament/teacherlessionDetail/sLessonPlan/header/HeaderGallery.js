import React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../../../utils/Colors";
// import STYLE from '../../../../../../utils/Style';
// import Images from '../../../../../../utils/Images';
import FONTS from '../../../../../../../utils/Fonts';
import { opacity } from "../../../../../../../utils/Constant";
const HeaderGallery = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <View style={styles.arrowTouch}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => props.navigateToBack()}>
                        {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                    </TouchableOpacity>
                    <Text style={styles.mainTitle}>Recommended Content</Text>
                </View>
                <View style={styles.headerRight}>
                    {/* <TouchableOpacity
                        style={styles.notificationBar}
                        onPress={() => props.onAlertPress()}
                        activeOpacity={opacity}>
                        <Image style={styles.massagesIcon} source={Images.Notification} />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.notificationBar}
                        onPress={() => null}
                        activeOpacity={opacity}>
                        {/* <Image style={styles.infoIcon} source={Images.InfoIcon} /> */}
                    </TouchableOpacity> 
                </View>
            </View>
            <View style={styles.filterbarMain}>
                {/* <View style={styles.lessonPlanTop}>
                    <View style={styles.lessonPlanTab}>
                        <Text style={styles.commonText}>Our AI has shortlisted the following content to help you to deliver your lesson</Text>
                    </View>
                </View> */}
                <View style={styles.flexEnd}>
                    <View style={styles.field}>
                        {/* <Image
                            style={styles.userIcon}
                            source={Images.SearchIcon} /> */}
                        <TextInput
                            style={[styles.searchHeader]}
                            placeholder="Search subject, class, etc"
                            maxLength={50}
                            placeholderTextColor={COLORS.menuLightFonts}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
export default HeaderGallery;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5),
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:hp(2),
    },
    mainTitle: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: Platform.OS == 'android' ? hp(1.8) : hp(2),
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
        paddingBottom: hp(1.5),
    },
    field: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchHeader: {
        height: Platform.OS == 'android'? 'auto' : hp(5.20),
        width: '100%',
        paddingLeft: hp(4.6),
        fontSize: Platform.OS == 'android' ? hp(1.7) : hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color:COLORS.themeBlue,
        borderWidth: 1,
        borderRadius: hp('1.0%'),
        borderColor: COLORS.InoutBorder,
        lineHeight:hp(2.3),
        paddingRight: hp('2.0%'),
    },
    userIcon: {
        position: 'absolute',
        width: hp(1.9),
        resizeMode: 'contain',
        left: hp(1.43),
        alignSelf: 'center',
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
        resizeMode: 'contain',
        marginRight: hp(1),
    },
    arrowTouch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commonText: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    infoIcon:{
        width: wp(6.18),
        resizeMode: 'contain',
    },
});