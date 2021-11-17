import { Dimensions, Platform, StyleSheet } from 'react-native'
import COLORS from './Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from './Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    viewBox: {
        width: width,
        alignItems: 'flex-start',
        height: height,
        fontFamily: FONTS.fontRegular,
        backgroundColor: COLORS.white
    },
    viewRow: {
        flexDirection: 'row',
    },
    padLeftRight: {
        flex: 1,
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        width: '100%'
    },
    commonInput: {
        color:COLORS.themeBlue,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp('6.8%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontSemiBold,
    },
    commonInput1: {
        color:COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 2,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp('6.8%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontSemiBold,
    },
    commonInputPassword: {
        color:COLORS.themeBlue,
        fontSize:hp('1.8%'),
        borderWidth: 2,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp('7.0%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('6.0%'),
        fontWeight: 'bold',
        fontFamily: FONTS.fontRegular,
    },
    checkBoxcommon: {
        width: hp(1.6),
        height: hp(1.6),
        top: 0,
    },
    checkBoxcommon1: {
        width: 20,
        height: 20,
        top: 0,
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        fontSize: hp('2.2%'),
        height: hp('7.0%'),
        lineHeight: hp('7.0%'),
        fontWeight: 'bold',
        paddingLeft: hp(5),
        paddingRight: hp(5),
        fontFamily: FONTS.fontRegular,
    },
    commonButtonGreen: {
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
        fontSize: hp('2.4%'),
        fontWeight: '800',
        borderRadius: hp('1.3%'),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(10),
        paddingRight: hp(10),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    commonButtonGreenDashboardSide: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(3.125),
        paddingRight: hp(3.125),
        paddingTop: hp(1.21),
        paddingBottom: hp(1.21),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.dashboardGreenButton,
    },
    commonButtonBordered: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: hp(1.21),
        paddingBottom: hp(1.21),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
    },
    commonFonts: {
        color: COLORS.darkGray,
        fontSize: hp(1.81),
        marginBottom: Platform.OS == 'android' ? hp(0) : hp('0.4%'),
        fontFamily: FONTS.fontRegular,
    },
    commonFontsPuple: {
        color: COLORS.lightGray,
        fontSize: hp(1.81),
        lineHeight: hp('2.6%'),
        fontFamily: FONTS.fontRegular,
    },
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.3),
        width: hp(69.40),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
    popupBack: {
        width: '100%',
        height: hp(10.41),
        resizeMode: "contain",
    },
    cancelButton: {
        position: 'absolute',
        right: hp(1.21),
        zIndex: 9,
    },
    cancelButtonIcon: {
        width: hp(2.94),
        top: 10,
        resizeMode: 'contain',
    },
    cancelButtonIcon1: {
        width: hp(1.94),
        alignSelf:'center',
        // top: 10,
        resizeMode: 'contain',
    },
    popupContentMain: {
        paddingLeft: hp(1.5),
        paddingRight: hp(1.5),
        paddingTop: hp(6),
        paddingBottom: hp(4.5),
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        marginBottom: hp(1),
        //textTransform: 'uppercase',
    },
    popupText: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginBottom: hp(3.5),
    },
    userProfile: {
        position: 'absolute',
        top: hp(1),
    },
    userProfileimage: {
        width: hp(7),
        resizeMode: 'contain',
    },
    hrCommon: {
        borderBottomWidth: 1,
        borderColor: COLORS.commonBorderColor,
        width: '100%',
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    centerText: {
        textAlign: 'center',
    },
    drawerWidth: {
        width: hp(44.27),
    },
    openClassLink: {
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        zIndex: 10,
    },
    commonButtonBorderedGreen: {
        backgroundColor: COLORS.transparent,
        color: COLORS.buttonGreen,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(3.125),
        paddingRight: hp(3.125),
        paddingTop: hp(1.21),
        paddingBottom: hp(1.21),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.buttonGreen,
    },
    labelCommon: {
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontRegular,
        paddingLeft: hp(1.3),
        width: '100%',
    },
    labelCommon1: {
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontRegular,
        paddingLeft: Platform.OS === 'android'?0: hp(1.3),
        width: '100%',
    },
    recordLinkText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        lineHeight: hp(3.60),
        marginLeft: hp(1.56),
        textTransform: 'uppercase',
    },
    redDot: {
        width: hp(1.35),
        height: hp(1.35),
        backgroundColor: COLORS.redNotification,
        borderRadius: hp(100),
        position: 'absolute',
        right: -3,
        top: -3,
    },
    commonInputGrayBack: {
        color:COLORS.darkGray,
        fontSize: hp('1.8%'),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp(6),
        backgroundColor: COLORS.backgroundColorCommon,
        textAlignVertical: 'center',
        paddingLeft: hp(2),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontRegular,
        
    },
    common:{
        flexDirection:'row',
        alignItems:'center',
    }
});