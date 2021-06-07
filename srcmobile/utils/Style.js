import { Dimensions, StyleSheet } from 'react-native'
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
        backgroundColor: COLORS.white,
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    padLeftRight: {
        flex: 1,
        paddingLeft: hp(2.5),
        paddingRight: hp(2.5),
    },
    commonInput: {
        color:COLORS.darkGray,
        fontSize: hp('1.8%'),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp(6),
        paddingLeft: hp(2),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontRegular,
    },
    commonInputPassword: {
        color:COLORS.darkGray,
        fontSize:hp('1.8%'),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp(6),
        paddingLeft: hp(2),
        paddingRight: hp('6.0%'),
        fontFamily: FONTS.fontRegular,
    },
    checkBoxcommon: {
        width: 20,
        height: 20,
        top: 0,
    },
    checkBoxcommon1: {
        width: 20,
        height: 20,
        top: 0,
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        fontSize: hp(1.7),
        height: hp(5.41),
        textAlignVertical: 'center',
        lineHeight: Platform.OS == 'android' ? hp(2.5) : hp(5.41),
        paddingLeft: hp(5),
        paddingRight: hp(5),
        fontFamily: FONTS.fontBold,
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
        fontWeight: '800',
        borderRadius: hp(0.9),
        overflow: 'hidden',
        textAlign: 'center',
        paddingTop:  Platform.OS == 'android' ? hp(1.3) : hp(1.21),
        paddingLeft: Platform.OS == 'android' ? hp(4.5) : hp(4.94),
        paddingRight: Platform.OS == 'android' ? hp(4.5) : hp(4.94),
        paddingBottom: Platform.OS == 'android' ? hp(1) : hp(1.21),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    commonButtonBordered: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        borderRadius: hp(0.9),
        overflow: 'hidden',
        textAlign: 'center',
        paddingTop:  Platform.OS == 'android' ? hp(1.6) : hp(1.21),
        paddingLeft: hp(4.94),
        paddingRight: hp(4.94),
        paddingBottom: Platform.OS == 'android' ? hp(0.8) : hp(1.21),
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
        width: '100%',
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
        resizeMode: 'contain',
    },
    popupContentMain: {
        paddingTop: hp(3),
        paddingBottom: hp(3),
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: hp(2),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        marginBottom: hp(1),
        //textTransform: 'uppercase',
    },
    popupText: {
        fontSize: hp(1.5),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginBottom: hp(3),
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
        marginTop: hp(1.5),
        marginBottom: hp(1.5),
    },
    centerText: {
        textAlign: 'center',
    },
    drawerWidth: {
        width: '100%',
    },
    drawerWidthSidebar: {
        width: '85%',
    },
    openClassLink: {
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
    },
    commonButtonBorderedGreen: {
        backgroundColor: COLORS.transparent,
        color: COLORS.dashboardGreenButton,
        fontSize: hp(1.56),
        fontWeight: '800',
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: Platform.OS == 'android' ? hp(2) : hp(3.125),
        paddingRight: Platform.OS == 'android' ? hp(2) : hp(3.125),
        paddingTop: Platform.OS == 'android' ? hp(1.3) : hp(1.21),
        paddingBottom: Platform.OS == 'android' ? hp(0.8) : hp(1.21),
        alignSelf: 'flex-end',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.dashboardGreenButton,
        width:'auto',
    },
    labelCommon: {
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontRegular,
        paddingLeft: hp(1.3),
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
});