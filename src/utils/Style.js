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
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    padLeftRight: {
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        width: '100%',

    },
    commonInput: {
        color:'#03014C',
        fontSize: hp('1.9%'),
        borderWidth: 2,
        borderColor: '#B2B2C9',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp('8%'),
        paddingLeft: hp('7.0%'),
        paddingRight: hp('2.0%'),
        fontWeight: 'bold',
        fontFamily: FONTS.fontRegular,
    },
    commonInputPassword: {
        color:'#03014C',
        fontSize:hp('1.8%'),
        borderWidth: 2,
        borderColor: '#B2B2C9',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp(2.3),
        height: hp('7.0%'),
        paddingLeft: hp('7.0%'),
        paddingRight: hp('6.0%'),
        fontWeight: 'bold',
        fontFamily: FONTS.fontRegular,
    },
    checkBoxcommon: {
        width: hp(1.6),
        height: hp(1.6),
        top: 7,
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.blueButton,
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
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 50,},
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    commonButtonGreenDashboardSide: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        fontWeight: '800',
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(3.125),
        paddingRight: hp(3.125),
        paddingTop: hp(1.21),
        paddingBottom: hp(1.21),
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 50,},
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    commonButtonBordered: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        fontWeight: '800',
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
        borderColor: COLORS.borderGrp,
    },
    commonFonts: {
        color: COLORS.themeBlue,
        fontSize: hp(1.81),
        fontWeight: '500',
        marginBottom: hp('0.4%'),
        fontFamily: FONTS.fontRegular,
    },
    commonFontsPuple: {
        color: COLORS.thmePurple,
        fontSize: hp(1.81),
        fontWeight: '500',
        lineHeight: hp('2.6%'),
        fontFamily: FONTS.fontRegular,
    },
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.3),
        width: hp(85),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
    popupBack: {
        width: '100%',
        height: hp(12),
        resizeMode: "contain",
    },
    cancelButton: {
        position: 'absolute',
        top: hp(2),
        right: hp(2),
        zIndex: 9,
    },
    popupContentMain: {
        paddingLeft: hp(3.5),
        paddingRight: hp(3.5),
        paddingTop: hp(6),
        paddingBottom: hp(4.5),
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: hp(3.2),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        marginBottom: hp(2.5),
        textTransform: 'uppercase',
    },
    popupText: {
        fontSize: hp(2.4),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: hp(3.5),
    },
    userProfile: {
        position: 'absolute',
        top: hp(3),
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
    },
    commonButtonBorderedGreen: {
        backgroundColor: COLORS.transparent,
        color: COLORS.buttonGreen,
        fontSize: hp(1.56),
        fontWeight: '800',
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
});