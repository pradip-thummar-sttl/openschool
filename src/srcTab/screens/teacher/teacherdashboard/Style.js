import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
    },
    myDay: {
        backgroundColor: COLORS.orage,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        flexDirection: 'row',
        borderRadius: hp(1),
        justifyContent: 'space-between',
        height: hp(8.5),
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
        fontSize: hp(2.6),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(1.30),
        alignSelf: 'center',
    },
    datePosition: {
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 0,
        right: 25,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: hp(1),
        borderBottomRightRadius: hp(1),
        width: hp(6.51),
        height: hp(7.16),
        shadowColor: COLORS.dateShadow,
        shadowOffset: { width: 0, height: 5, },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    date: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        marginBottom: 0.5,
    },
    ScrollViewFlatlist: {
        height: hp(67.44),
    },
    pupilListing: {
        maxHeight: hp(67.44),
    },
    arrowSelectedTab: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: hp(1.95),
        borderRightWidth: hp(1.95),
        borderBottomWidth: hp(1.95),
        borderLeftWidth: hp(1.95),
        position: 'absolute',
        right: 0,
        // top: hp(3.90),
        // left: hp(-3.90),
        borderTopColor: 'transparent',
        borderRightColor: COLORS.white,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    month: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    moreDashboard: {
        width: hp(0.65),
        height: hp(2.60),
        resizeMode: 'contain',
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.08,
        shadowRadius: 4,
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
        borderRadius: hp(1),
        paddingLeft: hp(2),
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        height: hp(12.76),
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
        resizeMode: 'contain',
        width: hp(1.76),
    },
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
    },
    titleBox: {
        fontSize: hp(2.08),
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
        width: '38%',
        borderRightWidth: 1,
        borderColor: COLORS.commonBorderColor,
    },
    rightTabContent: {
        width: '62%',
    },
    item: {
        flexDirection: 'row',
        paddingLeft: hp(2.21),
        paddingTop: hp(2.60),
        paddingRight: hp(2.21),
        paddingBottom: hp(2.60),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: COLORS.commonBorderColor,
        borderBottomWidth: 1,
    },
    border: {
        height: hp(5.85),
        backgroundColor: COLORS.borderLesoon,
        padding: hp(0.39),
        borderRadius: hp(5),
        marginRight: hp(2.1),
    },
    classSubject: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    subjectName: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
    },
    subject: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    subjecRow: {
        marginLeft: hp(0.8),
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupName: {
        borderWidth: 2,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(0.7),
        color: COLORS.grpColor,
        fontSize: hp(1.4),
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center',
        width: hp(9),
        paddingTop: hp(0.1),
        paddingBottom: hp(0.1),
        marginBottom: hp(0.5),
    },
    timing: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    tabcontent: {
        padding: hp(3.90),
        paddingBottom: hp(2.60),
    },
    titleTab: {
        fontSize: hp(3.125),
        fontFamily: FONTS.fontBold,
        lineHeight: hp(4.55),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    timedateGrp: {
        flexDirection: 'row',
    },
    dateWhiteBoard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(3.25),
    },
    datetimeText: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        marginLeft: hp(0.9),
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
        marginTop: hp(4.81),
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
        marginBottom: hp(1.95),
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonGrp: {
        marginLeft: hp(2.21),
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
        marginBottom: hp(0),
    },
    pupilData: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    pupilProfile: {
        width: hp(35.80),
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupColumnmain: {
        width: hp(17.97),
    },
    groupColumn: {
        // width: hp(5.59),
        alignItems: 'flex-start',
    },
    // pupilgroupName: {
    //     textAlign: 'center',
    // },
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
    },
    rewardStar: {
        width: hp(5.5),
        marginRight: hp(0.91),
        justifyContent: 'flex-end',
    },
    rewardStartIcon: {
        width: hp(2.15),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    pupilDetailLink: {
        width: hp(8.5),
        alignItems: 'flex-end',
        right: 3,
    },
    pupilDetaillinkIcon: {
        width: hp(0.95),
        height: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: 2,
    },
    pupilImage: {
        width: hp(3.64),
        height: hp(3.64),
        borderRadius: hp(5),
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
        width:hp(10),
        textAlign:'center'
    },
    scrollView: {
        height: hp(67.44),
    },
});