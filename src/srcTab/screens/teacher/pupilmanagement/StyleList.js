import { Dimensions, Platform, StyleSheet } from 'react-native'
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
        right: hp(5.20),
        textAlign: 'center',
        borderBottomLeftRadius: hp(1.04),
        borderBottomRightRadius: hp(1.04),
        paddingBottom: hp(2.04),
        paddingLeft: hp(1.04),
        paddingRight: hp(1.04),
        paddingTop: hp(1.1),
        width: hp(6.9),
        height: hp(7.3),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1.03), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    date: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        marginBottom: hp(0.3),
    },
    ScrollViewFlatlist: {
        height: hp(60),
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
        width: hp(0.9),
        resizeMode: 'contain',
    },
    whiteBoard: {
        // backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        overflow: 'hidden',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginLeft: hp(4.5),
        marginBottom: 10,
        // backgroundColor: COLORS.white
    },
    pupilDashboard: {
        paddingLeft: hp(3.125),
        paddingTop: hp(2.21),
        paddingRight: hp(2.21),
        paddingBottom: hp(3.51),
    },
    pupilTableHeadingMain: {
        width: Platform.OS === 'android' ? hp(18) : hp(15),
        // width: hp(15),
        // backgroundColor: 'red',
        marginRight: Platform.OS === 'android' ? 18 : 0
    },
    tabpupil2: {
        width: Platform.OS === 'android' ? hp(18) : hp(15.97)
    },
    tabpupil22: {
        width: Platform.OS === 'android' ? hp(18) : hp(13.97),
    },
    tabpupil3: {
        width: Platform.OS === 'android' ? hp(23) : hp(20.18),
        marginRight: Platform.OS === 'android' ? hp(5.50) : hp(9.50),
        // marginRight: hp(9.50),
        marginStart: Platform.OS === 'android' ? 5 : 0,
        // backgroundColor: 'pink'
    },
    tabpupil4: {
        width: Platform.OS === 'android' ? hp(32) : hp(18.22),
    },
    pupilTableHeadingMainTitle: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        textAlign : Platform.OS === 'android' ? 'center' : 'auto'
        
        // backgroundColor: 'green'
    },
    pupilTableHeadingMainsubTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginRight: Platform.OS === 'android' ? 0 : hp(2.60),
        marginLeft:  Platform.OS === 'android' ? hp(2.60) : 0
    },
    pupilTableHeadingMainsubTitlestar: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginLeft :  Platform.OS === 'android' ? 10.5 : 0,
        // marginRight: hp(0.91),
        marginRight : Platform.OS === 'android' ? 0 :  hp(0.91)
    },
    pupilTableHeadingsubMain: {
        flexDirection: 'row',
    },
    pupilhrCustomMargin: {
        marginTop: hp(1.95),
        marginBottom: hp(1.30),
    },
    pupilData: {
        height: wp(6),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: wp(1),
        paddingHorizontal: hp(2)
        //  marginLeft:hp(4.5)
    },
    pupilProfile: {
        width:  Platform.OS === 'android' ?  hp(18) : hp(15),
        flexDirection: 'row',
        alignItems: 'center',



    },
    groupColumnmain: {
        width: hp(17.97),
        backgroundColor: 'blue'

    },
    groupColumn: {
        // width: hp(10.59),
        width: Platform.OS === 'android' ? hp(20) : hp(10.59),
        // alignItems: 'center',
        // justifyContent:'center',
        // width: hp(22),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft :  Platform.OS === 'android' ? 0  :hp(-2)
        // backgroundColor: 'pink'
    },
    groupColumn1: {
        width: hp(10.59),
        alignItems: 'center',
    },
    groupColumn11: {
        width: Platform.OS === 'android' ? hp(20) : hp(10.59),
        alignItems: Platform.OS === 'android' ? 'center' : 'flex-start',
        // alignItems: 'flex-start',
        marginLeft: Platform.OS === 'android' ? 0: hp(5)
    },
    pupilgroupName: {
        textAlign: 'center',
    },
    perfomanceColumn: {
        flexDirection: 'row',
        width: hp(20.18),
        marginLeft: hp(4),
        marginRight: hp(9.50),
    },
    perfomanceDotmain: {
        width : Platform.OS === 'android' ? hp(8) :hp(10.80) ,
        // width: hp(10.80),
        alignItems: 'center',
        // marginRight: hp(2.60),
        marginRight :  Platform.OS === 'android' ? hp(2) : hp(2.60),
        // backgroundColor : 'red'
    },
    perfomanceDotmainTwo: {
        width :  Platform.OS === 'android' ?  hp(10) : hp(7),
        // width: hp(7),
        // backgroundColor : 'red'
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
        width: Platform.OS === 'android' ? hp(5) : hp(5.5),
        marginStart : 10,
        marginRight: Platform.OS === 'android' ? 0 : hp(0.91),
    },
    rewardStartIcon: {
        width: hp(2.15),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: hp(1)
    },
    pupilDetailLink: {
        width: '100%',
    },
    pupilDetaillinkIcon: {
        width: hp(1),
        resizeMode: 'contain',
        right: 30,
        position: 'absolute',
    },
    pupilImage: {
        width: hp(3.7),
        height: hp(3.7),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1),
        marginStart  : Platform.OS === 'android' ? hp(1) : 0
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
    pupilgroupName1: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        // marginLeft : Platform.OS === 'android' ? 11 : 22,
        width: Platform.OS === 'android' ? hp(20) : 100,
        // width:100,
        textAlign: 'center'
    },
    pupilgroupName10: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        width: Platform.OS === 'android' ? hp(20) : 100,
        textAlign: 'center'
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: hp(1.5),
        paddingTop: hp(2),
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
    },
    noDataImage: {
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 50
    },
    nodataTitle: {
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    nodataContent: {
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    },

})