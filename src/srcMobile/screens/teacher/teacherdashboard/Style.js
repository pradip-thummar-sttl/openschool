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
    padLeftRight: {
        flex: 1,
    },
    paddMainDash: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
    },
    yellowHrTag: {
        width: '100%',
        height: hp(0.61),
        backgroundColor: COLORS.yellowBorder,
        marginBottom: hp(1.5),
    },
    subTitleTab: {
        fontSize: hp(1.7),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(3.3),
        color: COLORS.darkGray,
        marginBottom: hp(1.5),
    },
    myDay: {
        backgroundColor: COLORS.orage,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        flexDirection: 'row',
        borderRadius: hp(1),
        justifyContent: 'space-between',
        height: hp(7),
    },
    rowProfile: {
        flexDirection: 'row',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayIcon: {
        width: hp(4),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    dayTitle: {
        color: COLORS.white,
        fontSize: hp(2.03),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(1.30),
        alignSelf: 'center'
    },
    datePosition: {
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 0,
        right: hp(3),
        textAlign: 'center',
        borderBottomLeftRadius: hp(1.04),
        borderBottomRightRadius: hp(1.04),
        paddingBottom: hp(2.04),
        paddingLeft: hp(1.04),
        paddingRight: hp(1.04),
        paddingTop: hp(0.65),
        width: hp(6.5),
        height: hp(6.25),
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(1.03),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    timingMain: {
        right: Platform.OS == 'android' ? hp(3) : hp(4),
        textAlign: 'left',
        position: 'absolute',
    },
    groupPupil: {
        left: hp(5.2),
        bottom: hp(0.6),
        
    },
    date: {
        fontSize: Platform.OS == 'android' ? hp(1.7) : hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    ScrollViewFlatlist:{
        flex: 1
    },
    month: {
        fontSize: Platform.OS == 'android' ? hp(1.5) : hp(1.56),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        textAlign: 'center',
        bottom: Platform.OS == 'android' ? hp(0.75) : hp(0),
    },
    moreDashboard: {
        width: hp(0.7),
        resizeMode: 'contain',
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
    },
    pupilBoard: {
        marginTop: hp(5),
        backgroundColor: COLORS.dashboardPupilBlue,
    },
    whiteBg: {
        backgroundColor: COLORS.backgroundColorCommon,
        // paddingLeft: hp(3.5),
        // paddingRight: hp(3.5),
        paddingBottom: hp(2),
        paddingTop: hp(0),
        borderBottomColor: COLORS.borderGrp,
        borderBottomWidth: 1,
    },
    dashBoardBoxes: {
        flexDirection: 'row',
        marginBottom: hp(3.90),
        marginLeft: hp(-0.97),
        marginRight: hp(-0.97),
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
    },
    boxDash: {
        paddingLeft: hp(0.97),
        paddingRight: hp(0.97),
        width: '25%',
    },
    boxInnerMain: {
        borderRadius: hp(1),
        paddingLeft: hp(2),
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        height: hp(12),
        width: hp(27.86),
    },
    greenBox: {
        backgroundColor: COLORS.lightGreen,
    },
    yellowBox: {
        backgroundColor: COLORS.lightYellow,
    },
    purpleBox: {
        backgroundColor: COLORS.lightPurple,
    },
    blueBox: {
        backgroundColor: COLORS.lightBlue,
    },
    timeIcon: {
        resizeMode:'contain',
        width: hp(1.76),
    },
    calIcon: {
        resizeMode:'contain',
        width: hp(1.7),
    },
    titleBox: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        position: 'relative',
        zIndex: 9,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
    },
    imageIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: hp(12.94),
        resizeMode: 'contain',
        height: hp(11.86),
    },
    leftTabbing: {
        width: '100%',
        borderRightWidth:1,
        borderColor: COLORS.commonBorderColor,
    },
    rightTabContent: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        paddingLeft: hp(1.95),
        paddingTop: hp(2.60),
        paddingRight: hp(1.95),
        paddingBottom: hp(2.60),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: COLORS.commonBorderColor,
        borderBottomWidth: 1,
    },
    border: {
        height: hp(5.85),
        backgroundColor: COLORS.borderLesoon,
        padding: hp(0.3),
        borderRadius: hp(5),
        marginRight: hp(1.95),        
    },
    classSubject: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    subjectName: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        width:wp(40.5),
    },
    subjectMain: {
        right: hp(0.5),
    },
    subject: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    subjecRow: {
        marginLeft: hp(0),
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    groupName: {
        borderWidth: hp(0.24),
        borderColor: COLORS.borderGrp,
        borderRadius: hp(0.7),
        color: COLORS.grpColor,
        fontSize: hp(1.4),
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: hp(0.05),
        paddingBottom: hp(0.0),
        width: Platform.OS == 'android' ? hp(10) : hp(7.5),
        marginBottom: hp(0.5),
    },
    timing: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    tabcontent: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        paddingBottom: hp(2.60),
        paddingTop: hp(3),
        // position:'relative',
        // height: '100%',
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(0.1),
    },
    timedateGrp: {
        flexDirection: 'row',
    },
    dateWhiteBoard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(1.69),
    },
    datetimeText: {
        fontSize: hp(1.72),
        marginLeft: hp(0.6),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    mediaMain: {
        flexDirection: 'row',
        marginLeft: hp(-0.39),
        marginRight: hp(-0.39),
        marginBottom: hp(5),
    },
    mediabarTouch: {
        paddingLeft: hp(0.39),
        paddingRight: hp(0.39),
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
    },
    moreMedia: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(200),
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGrayPupil,
        borderWidth: 1,
        justifyContent: 'center',
    },
    moreMediaText: {
        fontSize: hp(1.6),
        fontFamily: FONTS.fontRegular,
        textAlign: 'center',
    },
    lessondesciption: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    attchmentSectionwithLink: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    attachment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachmentText: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        marginLeft: hp(0.9),
    },
    attachmentIcon: {
        width: hp(1.5),
        resizeMode: 'contain',
    },
    linkText: {
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
    },
    requirementofClass: {
        marginTop: hp(4.81),
        marginBottom: hp(13),
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(1.4),
    },
    lessonPoints: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.95),
    },
    downloadIcon: {
        width: hp(2.01),
        resizeMode: 'contain',
        top: hp(0.2),
        right: hp(1),
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(1.6),
        paddingRight: hp(1.6),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(0.8),
        marginBottom: hp(1.04),
    },
    fileBoxGrpWrap: {
        // marginRight: hp(-1.5)
    },
    checkIcon: {
        width: hp(1.7),
        resizeMode: 'contain',
        top: hp(0.2),
    },
    lessonPointText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        marginLeft: hp(1),
    },
    lessonstartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderColor: COLORS.borderGrp,
        paddingTop: hp(2),
        paddingBottom: hp(5),
        position: 'absolute',
        bottom: hp(1.5),
        width: '100%',
        left: hp(1.95),
    },
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    pupilDashboard: {
        paddingLeft: hp(1.3),
        paddingRight: hp(1.3),
    },
    pupilTableHeadingMain: {
        width: hp(35.80),
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
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
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
        paddingBottom:hp(2),
        justifyContent: 'space-between',
        paddingTop:hp(2),
        width: '100%',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
    },
    pupilProfile: {
        width: Platform.OS == 'android' ? hp(39.5) : hp(26),
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
        alignItems: 'center',
        position: 'absolute',
        right: hp(2),
    },
    rewardStar: {
        width: hp(2.60),
        marginRight: hp(1),
    },
    rewardStartIcon: {
        width: hp(2),
        resizeMode: 'contain',
        alignSelf:'center',
        marginBottom:hp(1)
    },
    pupilDetailLink: {
        width: hp(1.95),
        alignItems: 'flex-end',
        position: 'absolute',
        right: hp(0.5),
    },
    pupilDetaillinkIcon: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    topListingArrow: {
        alignItems: 'center',
        alignSelf: 'center',
        right: 0,
        position: 'absolute'
    },
    pupilImage: {
        width: hp(3.64),
        height: hp(3.64),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.5),
        top: hp(1.1),
    },
    pupilName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    uploadVideoStl:{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3);', position: 'absolute', justifyContent: 'center', alignItems:'center' },
    uploadVideoInnerStl:{width: '80%',borderRadius: hp(1),backgroundColor:COLORS.white, padding:10},
    uploadVideoTextStl:{ textAlign: 'center', color: COLORS.darkGray, fontSize: 16, fontWeight: 'bold', marginBottom:hp(2) },

});