import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        overflow: 'hidden',
        height: hp(65),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    whiteBg: {
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.borderGrp,
        borderBottomWidth: 1,
        paddingBottom: hp(1),
    },
    commonBg: {
        backgroundColor: COLORS.backgroundColorCommon,
        paddingBottom: hp(2),
        borderBottomColor: COLORS.borderGrp,
        borderBottomWidth: 1,
    },
    lessonPlanTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        alignItems: 'center',
    },
    lessonPlanTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 0,
        marginTop: 0,
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
    teacherLessonGrid: {
        width: '100%',
        height: hp(72)
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
    timedateGrp: {
        flexDirection: 'row',
        marginBottom: hp(4.94),
    },
    dateWhiteBoard: {
        marginRight: hp(8.7),
    },
    subjectDateTime: {
        alignItems: 'center',
        width: '100%',
    },
    datetimeText: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        marginLeft: hp(0.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    labelTextMain: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
    },
    timeIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
    },
    subjectText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.menuLightFonts,
        fontSize: hp(1.8),
    },
    lessonTitle: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.menuLightFonts,
        fontSize: hp(1.82),
        marginBottom: hp(1.5),
    },
    lessonText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp(1.8),
    },
    teacherDetailLeft: {
        // borderRightWidth: 1,
        // borderColor: COLORS.borderGrp,
        paddingRight: hp(3.90),
        paddingLeft: hp(3.90),
        paddingTop: hp(2.5),
        width: '68.5%'
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    lessonPoints: {
        flexDirection: 'row',
        paddingBottom: hp(1.5),
        marginBottom: hp(1),
    },
    lessonPointsBorder: {
        flexDirection: 'row',
        paddingBottom: hp(1.5),
        borderBottomColor: COLORS.borderGrp,
        borderBottomWidth: 1,
        marginBottom: hp(1),
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
    requirementofClass: {
        marginTop: hp(4.81),
    },
    videoLinkBlock: {
        width: hp(36.84),
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.5),
        flexDirection: 'row',
    },
    videoLinkBlockSmall: {
        width: hp(24.84),
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.5),
        flexDirection: 'row',
    },
    videoLinkBlockSpaceTop: {
        marginTop: hp(4.81),
    },
    videoLinkBlockSpaceBottom: {
        marginBottom: hp(4.81),
    },
    videoLinkIcon: {
        width: hp(2.38),
        resizeMode: 'contain',
    },
    videoLinkText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        lineHeight: hp(3.60),
        marginLeft: hp(1.56),
    },
    checkBoxGrp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkBoxLabel: {
        flexDirection: 'row',
        width: 'auto',
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.5),
        marginRight: hp(1.04),
        marginBottom: hp(1.04),
        position: 'relative',
    },
    checkBoxLabelLine: {
        flexDirection: 'row',
        width: 'auto',
        paddingBottom: hp(2.2),
        marginBottom: hp(2.2),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.videoLinkBorder,
    },
    checkBoxLabelBox: {
        flexDirection: 'row',
        width: 'auto',
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.5),
        paddingLeft: hp(1.30),
        paddingRight: hp(2.21),
        paddingTop: hp(2.60),
        paddingBottom: hp(2.60),
        marginBottom: hp(1.04),
        justifyContent: 'space-between',
    },
    checkBoxLabelText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontRegular,
        paddingLeft: hp(1.2),
    },
    checkMark: {
        width: hp(1.8),
        height: hp(1.8),
        fontFamily: FONTS.fontBold,
        resizeMode: 'contain',
    },
    toggleGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.videoLinkBorder,
        borderBottomWidth: 1,
        marginBottom: hp(1.8),
        paddingBottom: hp(1.8),
    },
    toggleGrpBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: COLORS.videoLinkBorder,
        borderWidth: 1,
        marginBottom: hp(1.8),
        padding: hp(1.1),
        borderRadius: hp(1.5),
    },
    toggleText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.85),
        lineHeight: hp(3.60),
    },
    rightSideBar: {
        width: '30%',
        right: 0,
        justifyContent: 'flex-start',
        paddingLeft: hp(3.125),
        paddingRight: hp(5.33),
        paddingTop: hp(2.5),
    },
    rightSideBarLesson: {
        right: 0,
        justifyContent: 'flex-start',
        paddingLeft: hp(3.125),
        paddingRight: hp(5.33),
        paddingTop: hp(2.5),
        width: '31.5%'
    },
    largeVideo1: {
        backgroundColor: COLORS.black,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    uploadBoardBlock: {
        backgroundColor: COLORS.greyBack,
        width: hp(33.07),
        height: hp(45.05),
        borderRadius: 10,
        borderColor: COLORS.blueBorder,
        borderWidth: 1,
    },
    uploaded: {
        alignSelf: 'center',
        marginVertical: 8,
        color: COLORS.greyplaceholder
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: hp(1.6),
        paddingRight: hp(1.6),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        marginBottom: hp(1.04),
        height: hp(5),
    },
    downloadIcon: {
        width: hp(2.01),
        resizeMode: 'contain',
        top: hp(-0.5),
    },
    fileName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.85),
        lineHeight: hp(2.60),
    },
    containerWrap: {
        flexDirection: 'row',
    },
    containerWrap1: {
        flexDirection: 'column',
    },
    grpThumbVideo: {
        width: hp(31.90),
        resizeMode: 'contain',
        alignItems: 'center',
    },
    subLineTitle: {
        marginTop: hp(-3.5),
        zIndex: 9,
    },
    closeIconSmall: {
        width: hp(2.8),
        resizeMode: 'contain',
        opacity: 0.4,
    },
    addIcon: {
        width: hp(1.56),
        resizeMode: 'contain',
    },
    addItem: {
        flexDirection: 'row',
        marginBottom: hp(2.6),
    },
    addItemText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        color: COLORS.darkGray,
        textTransform: 'uppercase',
        paddingLeft: hp(1.3),
    },
    commonInput: {
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontRegular,
    },
    recordingLinkIcon: {
        width: hp(2.34),
        resizeMode: 'contain',
    },
    recordLinkText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        lineHeight: hp(3.60),
        marginLeft: hp(1.56),
        textTransform: 'uppercase',
    },
    recordLinkBlock: {
        width: hp(23.5),
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.5),
        flexDirection: 'row',
    },
    recordinNormalSpaceTop: {
        marginTop: hp(1.82),
    },
    dropDownFormInput: {
        width: '50%',
    },
    duedateBox: {
        width: '47.8%',
        marginLeft: hp(1.82),
    },
    dropDown: {
        flexDirection: 'row',
        width: '95%',
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        paddingTop: hp('2.0%'),
        paddingBottom: hp('2.0%'),
        fontFamily: FONTS.fontRegular,
    },
    dropDownSmall: {
        flexDirection: 'row',
        width: '100%',
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        paddingTop: hp('2.0%'),
        paddingBottom: hp('2.0%'),
        fontFamily: FONTS.fontRegular,
    },
    dropDownSmallWrap: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        paddingTop: hp('2.0%'),
        paddingBottom: hp('2.0%'),
    },
    textBox: {
        flexDirection: 'row',
        width: '100%',
    },
    placeholderStyle: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    rightBlockText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.85),
        lineHeight: hp(2.8),
    },
    commonInputTextarea: {
        width: '100%',
        height: hp(10.67),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        borderRadius: hp(1.3),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontSemiBold,
    },
    commonInputTextareaNormal: {
        width: '100%',
        height: hp(10.67),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        borderRadius: hp(1.3),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontRegular,
    },
    dateTime: {
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        width: '100%',
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.3),
    },
    timeField: {
        width: '31.5%',
        marginRight: hp(2.1),
    },
    blockSpaceBottom: {
        marginBottom: hp(2.6),
    },
    uploadBlock: {
        alignItems: 'center',
    },
    checkBoxGroup: {

    },
    dueDateWrap: {
        borderRightWidth: 2,
        borderRightColor: COLORS.commonBorderColor,
        marginRight: hp(1.82),
        paddingRight: hp(1.82),
    },
    dueDateText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        paddingTop: hp(1.7),
        paddingBottom: hp(1.7),
    },
    dueDateTextBold: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.82),
        marginLeft: hp(0.5),
    },
    dropDownSmallWrapNormal: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
    },
    videoRecording: {
        flexDirection: 'row',
        marginTop: hp(1.6),
    },
    videoRecordSpace: {
        marginRight: hp(1.6),
    },
    // Grid Table
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: hp(3.60),
        lineHeight: hp(3.60),
        marginTop:wp(2)
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
        color: COLORS.menuLightFonts,
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
        textTransform: 'uppercase',
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
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1, },
        elevation: 3,
        borderRadius: hp(1.95),
        height: hp(8.85),
        borderRadius: hp(2.0),
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
        alignSelf: 'center',
    },
    pupilDetailLink: {
        width: hp(10),
        alignItems: 'flex-end',
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
        height: hp(5.85),
        backgroundColor: COLORS.borderLesoon,
        padding: 3,
        borderRadius: hp(5),
        marginRight: hp(2.1),
        marginLeft: hp(1.8),
        width: hp(0.5),
        position: 'absolute',
        top: hp(-1.5),
    },
    firstColumn: {
        paddingLeft: hp(4.5),
        width: hp(34.55),
    },
    secoundColumn: {
        width: hp(22.55),
    },
    lastColumn: {
        width: hp(20.55),
        justifyContent: 'space-between',
    },
    yesText: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.dashboardPupilBlue,
        fontSize: hp(1.82),
    },
    noText: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.yellowDark,
        fontSize: hp(1.82),
    },
    markText: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.purpleDark,
        fontSize: hp(1.82),
    },
    userStamp: {
        height: hp(3.64),
        width: hp(3.64),
        backgroundColor: COLORS.lightGrayPupil,
        borderRadius: hp(5),
        marginRight: hp(2.1),
        position: 'absolute',
        top: hp(-0.5),
        left: hp(3.5),
    },
    userStampName: {
        paddingLeft: hp(4.0),
    },
    uploadBoard: {
        width: hp(33.07),
        height: hp(45.05),
        resizeMode: 'contain',
    },
    containerWrapTop: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.blueLightStrip,
        borderRadius: hp(1.5),
        marginLeft: hp(3.25),
        marginRight: hp(2.99),
        marginBottom: hp(1),
        padding: hp(1),
        height: hp(8.46),
    },
    userThumb: {
        width: hp(6.25),
        height: hp(6.25),
        backgroundColor: COLORS.lightGrayPupil,
        borderRadius: hp(5),
        marginRight: hp(1.30),
    },
    userLeft: {
        width: hp(56.77),
    },
    userRight: {
        width: hp(60.41),
        flexDirection: 'row',
        alignItems: 'center',
    },
    userTopName: {
        flexDirection: 'row',
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.darkGray,
    },
    userTopGroup: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
    },
    dateTitle: {
        flexDirection: 'row',
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
    },
    dateText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    markedIcon: {
        width: hp(10),
        marginRight: 10,
        resizeMode: 'contain',
    },
    pdfIcon: {
        width: 60,
        height: 60,
        marginRight: 10,
        resizeMode: 'contain',
    },
    removeIcon: {
        height: 30,
        width: 30,
        right: -5,
        top: -5,
        alignSelf: 'flex-end',
        resizeMode: 'contain',
        position: 'absolute',
    },
    markedLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: hp(6.19),
        marginRight: hp(9.63),
    },
    markedText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(3.2),
    },
    dateNameBlock: {
        marginRight: hp(2.21),
        // marginTop: hp(0.6),
    },
    feedbackBlock: {
    },
    ratingBlock: {
        width: '40%',
        marginLeft: hp(1.95),
    },
    lessonTitleBold: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.darkGray,
        paddingTop: hp(2.5),
        paddingBottom: hp(1.2),
    },
    achivementBox: {
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        width: hp(43.48),
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: hp(1.8),
        overflow: 'hidden',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 5, },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 1,
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
    },
    starSelectedText: {
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: hp(1.82),
        lineHeight: hp(5.1),
    },
    starSelected: {
        width: hp(4.94),
        height: hp(4.68),
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center',
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '100%',
        flexDirection: 'row',
        paddingTop: hp(1.8),
        paddingBottom: hp(1.8),
    },
    centerText: {
        alignItems: 'center',
    },
    starText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    ratingTitle: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
        paddingBottom: hp(1.5),
    },
    separater: {
        borderLeftWidth: 1,
        borderLeftColor: COLORS.dashboardBorder,
        borderRightWidth: 1,
        borderRightColor: COLORS.dashboardBorder,
        width: hp(14.32),
    },
    centerStar: {
        alignItems: 'center',
    },
    videoTitle: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.darkGray,
        marginBottom: hp(2.86),
    },
    videoWrap: {
        flexDirection: 'row',
    },
    videoThumb: {
        position: 'relative',
        flexDirection: 'row',
        marginRight: hp(4.10),
    },
    videoThumbnail: {
        width: hp(28.25),
        height: hp(13.54),
        resizeMode: 'contain',
        borderRadius: hp(0.26),
    },
    videoShadow: {
        width: hp(27.8),
        resizeMode: 'contain',
        position: 'absolute',
        top: hp(-1.8),
        left: hp(0.26),
    },
    videoPlay: {
        width: hp(5.20),
        resizeMode: 'contain',
        position: 'absolute',
        top: hp(5.5),
        left: hp(11.32),
    },
    videoSelected: {
        width: hp(2.17),
        resizeMode: 'contain',
        position: 'absolute',
        bottom: hp(1),
        right: hp(1.24),
    },
    videoSubTitle: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        flexDirection: 'row',
        lineHeight: hp(1.82),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        width: hp(26.17),
        flexWrap: 'wrap',
        marginBottom: hp(1.20),
    },
    spaceTop: {
        marginTop: hp(3.5),
    },
    rightSpaceNone: {
        marginRight: hp(0),
    },
    descriptionText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    dateBlockRow: {
        flexDirection: 'row',
        marginBottom: hp(4.55),
    },
    calander: {
        width: hp(1.76),
        resizeMode: 'contain',
        marginRight: hp(0.5),
    },
    daterow: {
        flexDirection: 'row',
    },
    dateTitleNormal: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
        paddingBottom: hp(0.8),
    },
    thumbSmall: {
        width: hp(3),
        height: hp(3),
        backgroundColor: COLORS.lightGrayPupil,
        borderRadius: hp(5),
        marginRight: hp(0.5),
    },
    alignRow: {
        flexDirection: 'row',
        width: '68.5%',
    },
    alignRow1: {
        flexDirection: 'row',
        marginVertical: 5
    },
    spaceSmallUserName: {
        marginRight: hp(14.32),
    },
    largeVideo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(0),
        top: hp(0),
    },
    largeVideoBlock: {
        position: 'relative',
        height: hp(43.15),
    },
    moreIcon: {
        width: hp(2.41),
        resizeMode: 'contain',
        top: hp(1),
    },
    lightGreyText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
    },
    videoTitleLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(3.77),
    },
    bookMarkOn: {
        width: hp(2.43),
        resizeMode: 'contain',
    },
    bookMark: {
        alignItems: 'center',
        width: hp(6.5),
        marginRight: hp(-1.2),
    },
    videoMainTitle: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.darkGray,
        marginBottom: hp(1),
    },
    videoPublishDate: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
    },
    userNameMain: {
        paddingTop: hp(3),
        paddingBottom: hp(1.5),
        marginBottom: hp(3),
        borderBottomColor: COLORS.dashboardBorder,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    userMainThumb: {
        width: hp(3.6),
        height: hp(3.6),
        backgroundColor: COLORS.lightGrayPupil,
        borderRadius: hp(5),
        marginRight: hp(0.5),
    },
    mainNameText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(3.5),
        paddingLeft: hp(1),
    },
    submittedBlueStrip: {
        backgroundColor: COLORS.blueLightStrip,
        borderTopLeftRadius: hp(1.5),
        borderBottomLeftRadius: hp(1.5),
        marginLeft: hp(-1),
        marginTop: hp(-1),
        marginBottom: hp(-1),
        position: 'relative',
        height: hp(8.46),
    },
    submittedIcon: {
        width: 18,
        resizeMode: 'contain',
        marginRight: hp(1),
    },
    bookLightBlue: {
        width: hp(13.76),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1),
        top: hp(-5.5),
    },
    bookPurpleStip: {
        resizeMode: 'contain',
        position: 'absolute',
        right: -20,
        top: -20,
        height: hp(9.46),
    },
    blueStripText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.white,
        paddingLeft: hp(2.21),
        paddingTop: hp(2.60),
    },
    markedPurpleStrip: {
        backgroundColor: COLORS.dashboardHomeWorkPurple,
        borderTopLeftRadius: hp(1.5),
        borderBottomLeftRadius: hp(1.5),
        height: hp(8.46),
    },
    containerWrapTopPurple: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.dashboardHomeWorkPurple,
        borderRadius: hp(1.5),
        marginLeft: hp(3.25),
        marginRight: hp(2.99),
        marginBottom: hp(1),
        height: hp(8.46),
    },
    markSubmittedSpaceLeft: {
        marginLeft: hp(7.16),
    },
    videoThumbMedium: {
        width: hp(14.71),
        height: hp(10.02),
        resizeMode: 'contain',
        marginRight: hp(1.5),
        position: 'relative',
    },
    videoDate: {
        position: 'absolute',
        top: hp(1.42),
        left: hp(1.82),
        color: COLORS.white,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontRegular,
        zIndex: 10,
    },
    videoDateBlack: {
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontRegular,
        zIndex: 10,
        lineHeight: hp(3.5),
        paddingLeft: hp(1),
        paddingTop: hp(1),
    },
    feedbackVideoBlock: {
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        padding: hp(1.2),
        borderRadius: hp(0.8),
        marginRight: hp(3.90),
        marginTop: hp(2.5),
    },
    lessonDesc: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    lineLength: {
        width: '80%',
    },
    videoCard: {
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 0.5, },
        shadowOpacity: 0.15,
        shadowRadius: hp(0.5),
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        width: hp(28.25),
        borderRadius: hp(1.08),
        marginRight: hp(1.04),
        backgroundColor: COLORS.white,
        marginBottom: hp(1.5),
    },
    videoSubTitleNormal: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        paddingTop: hp(2.73),
        paddingLeft: hp(2.21),
    },
    videoSubTitleBold: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.darkGray,
        paddingLeft: hp(2.21),
    },
    videoUserSpaceLeft: {
        marginTop: hp(4.85),
        marginBottom: hp(1.5),
        paddingLeft: hp(1.5),
    },
    videoUserName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(3.6),
        paddingLeft: hp(0.91),
    },
    bookMarkLabel: {
        width: hp(1.91),
        resizeMode: 'contain',
        position: 'absolute',
        top: hp(1.22),
        right: hp(1.82),
    },
    bookMarkLabelDue: {
        width: hp(1.91),
        resizeMode: 'contain',
        position: 'absolute',
        top: hp(1.3),
        right: hp(1.4),
    },
    videoCardThumb: {
        position: 'relative',
        flexDirection: 'row',
        width: hp(28.25),
    },
    lessonDue: {
        height: hp(17.44),
        marginTop: hp(2.73),
    },
    dueIcon: {
        width: hp(1.89),
        resizeMode: 'contain',
        marginLeft: hp(1.5),
        marginTop: hp(1),
    },
    lightSkyBlueDue: {
        backgroundColor: COLORS.lightSkyBlueDue,
    },
    lightYellowDue: {
        backgroundColor: COLORS.lightYellowDue,
    },
    lightPurpleDue: {
        backgroundColor: COLORS.lightPurpleDue,
    },
    lightOrangeDue: {
        backgroundColor: COLORS.lightOrangeDue,
    },
    lessonThumb: {
        width: hp(3.64),
        width: hp(3.64),
        backgroundColor: COLORS.lightGrayPupil,
        borderRadius: hp(5),
    },
    dueVideoUserSpace: {
        paddingLeft: hp(1.04),
        paddingTop: hp(1.04),
        paddingBottom: hp(1.04),
    },
    saveBookMarkText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: COLORS.bottomProfileLightBorder,
    },
    titleSpace: {
        marginBottom: hp(2.34),
    },
    lessonFeedDesc: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    techerName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        paddingTop: hp(1.7),
    },
    videoSliderSpace: {
        paddingTop: hp(3.51),
        paddingLeft: hp(3.25),
    },
    filterbarMain: {
        flexDirection: 'row',
    },
    field: {
        position: 'relative',
        width: hp(55.11),
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: hp(2.6),
        paddingRight: hp(5),
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
    },
    userIcon: {
        position: 'absolute',
        top: hp(1.8),
        width: hp(1.62),
        height: hp(1.62),
        resizeMode: 'contain',
        right: hp(1.43),
    },
    userIcon1Parent: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: hp(1.43),
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
        textTransform: 'uppercase',
        fontFamily: FONTS.fontSemiBold,
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
        height: hp(1.50),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
        top: hp(1.85),
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
        alignItems: 'center',
        paddingHorizontal: hp(0.5),
        paddingTop: hp(1),
        paddingBottom: hp(1),
    },
    filterListWrap: {
        width: hp(30.98),
        right: 10,
        top: hp(5.5),
        position: 'absolute',
        paddingHorizontal: 5,
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
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
    calnderDashHeaderIcon: {
        width: 40,
        resizeMode: 'contain',
        height: 40,
    },
    homeworkView: {
        width: hp(32.5),
        backgroundColor: COLORS.hwmatColor,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.lightBlue
    },
    HomeText: {
        alignSelf: 'center',
        marginVertical: wp(1),
        color: COLORS.lightGray,
        fontSize: hp(1.50),
        fontFamily: FONTS.fontRegular,
    },
    docView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchParent: {
        flexDirection: 'row', width:hp(60), alignItems: 'center', marginBottom: 10, height: hp(5.20), backgroundColor: COLORS.white,
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchMenu: {
        height: 20, resizeMode: 'contain', right: 0, alignSelf: 'center',
    }
});