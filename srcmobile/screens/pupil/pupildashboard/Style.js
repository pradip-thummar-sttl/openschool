import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.backgroundColorCommon,
    },
    myDay: {
        backgroundColor: COLORS.orage,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        position: 'relative',
        flexDirection: 'row',
        borderRadius: hp(1),
        justifyContent: 'space-between',
        height: hp(8.5),
    },
    yellowHrTag: {
        width: '100%',
        height: hp(0.61),
        backgroundColor: COLORS.yellowBorder,
        marginBottom: hp(2.34),
    },
    subTitleTab: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        marginBottom: hp(2.34),
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ScrollViewFlatlist: {
        height: hp(60),
    },
    dayIcon: {
        width: hp(4),
        resizeMode: 'contain',
    },
    dayTitle: {
        color: COLORS.white,
        fontSize: hp(2.08),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(0.4),
        paddingTop: hp(1),
    },
    datePositionBg: {
        position: 'absolute',
        top: hp(-4.5),
        right: hp(1.90),
        justifyContent: 'center',
        alignItems: 'center',
        width: hp(12.95),
        height: hp(10.22),
    },
    date: {
        fontSize: Platform.OS == 'android' ? hp(1.5) : hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        height: hp(59.89),
        width: '100%',
    },
    pupilBoardPurple: {
        marginTop: hp(5),
        backgroundColor: COLORS.dashboardHomeWorkPurple,
    },
    pupilGridTopBg: {
        position: 'absolute',
        resizeMode: 'contain',
        width: hp(40),
        height: hp(10),
        top: hp(-11),
        right: hp(-3),
    },

    date: {
        fontSize: Platform.OS == 'android' ? hp(1.5) : hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    month: {
        fontSize: Platform.OS == 'android' ? hp(1.56) : hp(1.56),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        textAlign: 'center',
        //bottom: Platform.OS == 'android' ? hp(0.75) : hp(0),
        //textAlignVertical: 'center',
    },
    moreDashboard: {
        width: hp(0.7),
        resizeMode: 'contain',
        marginTop: hp(-3),
        right: hp(-1)
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
    },
    timeIcon: {
        resizeMode: 'contain',
        width: hp(1.66),
    },
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.66),
    },
    pupilBoard: {
        marginTop: hp(5),
        backgroundColor: COLORS.dashboardPupilBlue,
    },
    dashBoardBoxes: {
        flexDirection: 'row',
        marginBottom: hp(5.85),
        marginLeft: hp(-0.97),
        marginRight: hp(-0.97),
    },
    boxDash: {
        paddingLeft: hp(0.97),
        paddingRight: hp(0.97),
        width: '25%',
    },
    boxInnerMain: {
        borderRadius: hp(1.3),
        paddingLeft: hp(2),
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        height: hp(12),
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
    titleBox: {
        fontSize: hp(1.9),
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
        borderRightWidth: 1,
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
    subjectMain: {
        right: hp(0.5),
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
        fontSize: hp(1.6),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    subject: {
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    timingMain: {
        position: 'absolute',
        right: hp(2),
    },
    subjecRow: {
        marginLeft: hp(0),
        flexDirection: 'row',
        alignItems: 'center',
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
        width: Platform.OS == 'android' ? hp(8.8) : hp(7.5),
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
        position: 'relative',
        height: '100%',
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(0.1),
    },
    titleTabSecond: {
        marginBottom: hp(1.5),
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
    grpElipsis: {
        width: '50%',
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
        marginBottom: hp(3.7),
    },
    lessondesciptionSecond: {
        marginBottom: hp(2),
    },
    attchmentSectionwithLink: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
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
        marginTop: hp(5),
        marginBottom: hp(13),
    },
    requirementofClassSecond: {
        marginTop: hp(0),
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(1.2),
    },
    lessonPoints: {
        flexDirection: 'row',
        paddingBottom: hp(1.2),
        paddingTop: hp(0.5),
    },
    lessonPointsBorder: {
        borderBottomColor: COLORS.commonBorderColor,
        borderBottomWidth: 1,
    },
    checkIcon: {
        width: hp(1.7),
        resizeMode: 'contain',
        top: hp(0.2),
    },
    lessonPointText: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        marginLeft: hp(1),
        width: '90%',
    },
    lessonstartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderColor: COLORS.borderGrp,
        paddingTop: hp(2),
        paddingBottom: hp(3),
        position: 'absolute',
        bottom: hp(0),
        width: '100%',
        left: hp(1.95),
    },
    lessonstartButtonBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonGrp: {
        paddingLeft: hp(1),
        paddingRight: hp(1),
    },
    pupilSecondButton: {
        paddingLeft: Platform.OS == 'android' ? hp(3.2) : hp(3.77),
        paddingRight: Platform.OS == 'android' ? hp(3.2) : hp(3.77),
    },
    pupilSecondBottomButton: {
        paddingLeft: Platform.OS == 'android' ? hp(2.8) : hp(3.4),
        paddingRight: Platform.OS == 'android' ? hp(2.8) : hp(3.4),
    },
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    pupilDashboard: {
        paddingLeft: hp(3.125),
        paddingTop: hp(2.21),
        paddingRight: hp(2.21),
        paddingBottom: hp(3.51),
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
    dashboardOrangeBox: {
        backgroundColor: COLORS.orage,
        padding: hp(1),
        borderRadius: hp(1),
        position: 'relative',
        top: hp(10),
    },
    orangeBoxTop: {
        justifyContent: 'flex-end'
    },
    orangeBoxBottom: {
        flexDirection: 'column',
        flex: 1,
        marginTop: hp(-3),
    },
    pupilHeader: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    dashboardPurpleBox: {
        backgroundColor: COLORS.dashboardHomeWorkPurple,
        padding: hp(1),
        borderRadius: hp(1),
        position: 'relative',
        marginTop: hp(22.30),
    },
    purpleBoxTop: {
        justifyContent: 'flex-end'
    },
    myDayPurple: {
        backgroundColor: COLORS.dashboardHomeWorkPurple,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        position: 'relative',
        flexDirection: 'row',
        borderRadius: hp(1),
        justifyContent: 'space-between',
        height: hp(8.5),
    },
    pupilHomeWorkGridTopBg: {
        position: 'absolute',
        resizeMode: 'contain',
        width: hp(40),
        height: hp(10),
        top: hp(-9.8),
        right: hp(-1),
    },
    bookPositionBg: {
        position: 'absolute',
        top: hp(-5.30),
        right: hp(2.20),
        textAlign: 'center',
        width: hp(13.41),
        height: hp(11.84),
    },
    pupilHomeWorkGridTopBgHold: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
    },
    checkIconSquare: {
        width: hp(1.95),
        resizeMode: 'contain',
        top: hp(-0.5),
    },
    achivementWrap: {
        flexDirection: 'column',
        marginTop: hp(7.5),
        marginBottom: hp(0),
        width: '100%',
        alignItems: 'center',
    },
    achivementRobot: {
        width: '100%',
        marginTop: hp(6),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    achivementBox: {
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: hp(0.8),
        overflow: 'hidden',
        paddingBottom: hp(3.8),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 6, },
        shadowOpacity: 0.8,
        shadowRadius: hp(5),
    },
    starCovertPoints: {
        fontSize: hp(3.125),
        fontFamily: FONTS.fontBold,
        marginBottom: hp(1.8),
    },
    starCovert: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.8),
        paddingTop: hp(1.8),
    },
    rewardStar:{
        width : Platform.OS == 'android' ? hp(55.5) : '100%',
        height:Platform.OS == 'android' ? hp(12.5): 85,
    },
    paddingDiv: {
        paddingHorizontal: hp(1.84),
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: hp(3),
        flexDirection: 'row',
        paddingTop: hp(1.8),
        paddingBottom: hp(1.8),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderTopWidth: 1,
        borderTopColor: COLORS.bottomProfileLightBorder,
    },
    starSelected: {
        width: hp(4.94),
        height: hp(4.68),
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: hp(1.30),
    },
    starSelectedText: {
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: Platform.OS == 'android' ? hp(1.3) : hp(1.82),
        lineHeight: Platform.OS == 'android' ? hp(4.5) : hp(5.1),
    },
    centerStar: {
        borderLeftWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        borderRightWidth: 1,
        width: hp(14.32),
        alignItems: 'center',
    },
    cartoon: {
        resizeMode: 'contain',
        alignItems: 'center',
        width: hp(41.25),
        height: hp(35.71),
    },
    starText: {
        fontFamily: FONTS.fontRegular,
        fontSize: Platform.OS == 'android' ? hp(1.5) : hp(1.82),
        color: COLORS.darkGray,
    },
    centerText: {
        alignItems: 'center',
    },
    pupilDetaillinkIcon: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    topListingArrow: {
        alignItems: 'center',
        alignSelf: 'center',
    },
});