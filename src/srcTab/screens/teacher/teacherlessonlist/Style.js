import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        height: hp(65),
    },
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: hp(3.60),
        lineHeight: hp(3.60),
    },
    pupilDashboard: {
        paddingLeft: hp(3.125),
        paddingTop: hp(2.21),
        paddingRight: hp(2.21),
        paddingBottom: hp(3.51),
    },
    pupilTableHeadingMain: {
        width: hp(15.80),
        fontFamily: FONTS.fontRegular,
        color:COLORS.menuLightFonts,
    },
    tabpupil2: {
        width: hp(17.97),
    },
    tabpupil3: {
        width: hp(20.18),
        marginRight: hp(9.50),
    },
    tabpupil4: {
        width: hp(18.22),
    },
    pupilTableHeadingMainTitle: {
        fontSize: hp(1.5),
        lineHeight: hp(2.60),
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        textTransform:'uppercase',
    },
    pupilTableHeadingMainsubTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginRight: hp(2.60),
    },
    pupilTableHeadingMainsubTitlestar: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginRight: hp(0.91),
    },
    pupilTableHeadingsubMain: {
        flexDirection: 'row',
    },
    pupilhrCustomMargin: {
        marginTop: hp(1.95),
        marginBottom: hp(1.30),
    },
    pupilData: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:COLORS.white,
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: {width: 0, height: 0,},
        shadowOpacity: 0.12,
        borderRadius: 6,
        height: 80,
        marginBottom: hp(1),
        borderRadius:hp(1),
    },
    pupilProfile: {
        width: hp(15.80),
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupColumnmain: {
        width: hp(17.97),
    },
    groupColumn: {
        width: hp(5.59),
        alignItems: 'center',
    },
    pupilgroupName: {
        textAlign: 'center',
    },
    perfomanceColumn: {
        flexDirection: 'row',
        width: hp(20.18),
        marginRight: hp(9.50),
    },
    perfomanceDotmain: {
        width: hp(10.80),
        alignItems: 'center',
        marginRight: hp(2.60),
    },
    perfomanceDotmainTwo: {
        width: hp(7),
        alignItems: 'center',
    },
    perfomanceDots: {
        width: hp(1.1),
        height: hp(1.1),
        borderRadius: hp(100),
    },
    purpleDot: {
        backgroundColor: COLORS.purpleDark,
    },
    yellowDot: {
        backgroundColor: COLORS.yellowDark,
    },
    rewardColumn: {
        flexDirection: 'row',
    },
    rewardStar: {
        width: hp(5.5),
        marginRight: hp(0.91),
    },
    rewardStartIcon: {
        width: hp(2.15),
        resizeMode: 'contain',
        alignSelf:'center',
    },
    pupilDetailLink: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 20,
    },
    pupilDetaillinkIcon: {
        width: hp(1),
        resizeMode: 'contain',
        
    },
    pupilImage: {
        width: hp(3.7),
        height: hp(3.7),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.69),
    },
    pupilName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    border: {
        height: hp(4.85),
        backgroundColor: COLORS.borderLesoon,
        borderRadius: hp(5),
        marginRight: hp(2.1),
        marginLeft: 12,
        width:hp(0.5),
        position:'absolute',

    },
    firstColumn:{
      paddingLeft: hp(4.5),
      width:hp(25),
      justifyContent: 'center',
    },
    secoundColumn:{
        width:hp(22),
    },
    lastColumn:{
        width:hp(30.55),
    },
    yesText:{
      fontFamily: FONTS.fontSemiBold,
      fontSize:hp(1.82), 
    },
    noText:{
        fontFamily: FONTS.fontSemiBold,
        fontSize:hp(1.82), 
    },
    whiteBg: {
        backgroundColor: COLORS.backgroundColorCommon,
        padding: hp(2),
        paddingTop: 30,
    },
});