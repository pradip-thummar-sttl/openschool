import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { back } from 'react-native/Libraries/Animated/src/Easing';

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
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        height: hp(65),
    },
    toggleBoxGrpWrap:{
        // marginTop: hp(3),        
    },
    commonWidth: {
        alignSelf: 'flex-end',
        width: '80%'
    },
    whiteBg: {
        backgroundColor: COLORS.white,
        // paddingLeft: hp(3.5),
        // paddingRight: hp(3.5),
        paddingBottom: hp(2),
        paddingTop: hp(0),
        borderBottomColor: COLORS.borderGrp,
        borderBottomWidth: 1,
    },
    lessonPlanTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:hp(4.42),
        paddingRight:hp(2.99),
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
    timedateGrp: {
        flexDirection: 'row',
        marginBottom: hp(3.90),
    },
    dateWhiteBoard: {
        marginRight: 10,
flex: 1,
    },
    subjectDateTime: {
        alignItems: 'flex-start',
        width:'100%',
    },
    subjectDateTimeHomework: {
        alignSelf: 'center',
        width: '100%'
    },
    datetimeText: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        marginLeft: hp(0.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginLeft: hp(1.56),
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
        marginRight:hp(1.04),
        alignSelf: 'center',
    },
    calIconHomeWork: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight:hp(1.04),
        top: hp(1.5),
    },
    calIconNoInput: {
        resizeMode: 'contain',
        width: hp(1.76),
    },
    timeIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight:hp(1.04),
        alignSelf: 'center',
    },
    timeIconNoInput: {
        resizeMode: 'contain',
        width: hp(1.76),
    },
    subjectText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(0.8),
    },
    lessonTitle: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginLeft: hp(1.56),
    },
    lessonTitleWithoutTextArea: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(1.56),
    },
    lessonText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp(1.8),
    },
    teacherDetailLeft: {
        width: hp(83.72),
        // borderRightWidth: 1,
        // borderColor: COLORS.borderGrp,
         paddingRight: hp(3.90),
         paddingTop: hp(2.5),
         paddingLeft:hp(4.42),
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(2.6),
    },
    TitleClass: {
        marginBottom: hp(0),
    },
    lessonPoints: {
        flexDirection: 'row',
        marginBottom: hp(1.04),
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
        marginTop: hp(4.68),
    },
    videoLinkBlock: {
        width: hp(38),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        paddingRight: hp(2),
        paddingLeft: hp(2),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    videoLinkBlockRight: {
        width: hp(31.51),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        paddingRight: hp(2),
        paddingLeft: hp(2),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    videoLinkBlockSmall: {
        width: hp(24.84),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: hp(2),
    },
    videoLinkBlockSpaceTop: {
        marginTop: hp(2),
    },
    videoLinkBlockSpaceBottom: {
        marginBottom: hp(3),
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
        padding: hp(1.43),
        paddingRight: hp(2.5),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        marginRight: hp(1.04),
        marginBottom: hp(1.04),
        position: 'relative',
        alignItems: 'center',
    },
    checkBoxLabelNone: {
        flexDirection: 'row',
        paddingLeft: hp(0.8),
        paddingRight: hp(0.8),
        paddingTop: hp(1.2),
        paddingBottom: hp(1.2),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        marginRight: hp(1.04),
        marginBottom: hp(1.04),
        position: 'relative',
        alignItems: 'center',
    },
    checkBoxLabelLine: {
        flexDirection: 'row',
        width: 'auto',
        paddingBottom: hp(2.2),
        marginBottom: hp(1.1),
        marginTop: hp(1.1),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.videoLinkBorder,
    },
    checkBoxLabelText: {
        lineHeight: hp(2.82),
        fontSize: hp(1.85),
        fontFamily: FONTS.fontRegular,
        paddingRight: hp(1),
        marginLeft: hp(2.5),
    },
    checkBoxLabelTextNone: {
        lineHeight: hp(2.82),
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        paddingLeft: hp(1),
    },
    checkBoxcommon: {
        position: 'absolute',
        top: hp(-0.7),
        backgroundColor: COLORS.borderGrp
    },
    userIconPupil: {
        width: hp(2.5),
        height: hp(2.5),
        resizeMode: 'contain',
        backgroundColor: COLORS.greyplaceholder,
        borderRadius: 20,
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
        width:hp(40.10),
        justifyContent: 'flex-start',
        paddingLeft: hp(3.125),
        paddingRight: hp(5.33),
        //borderLeftWidth: 1,
        //borderColor: COLORS.borderGrp,
        paddingTop: hp(2.5),
    },
    borderNone: {
        borderLeftWidth:0,
    },
    uploadBoardBlock: {
        backgroundColor: COLORS.greyBack,
        width:hp(33.07),
        height:hp(45.05),
        borderRadius: 10,
        borderColor: COLORS.blueBorder,
        borderWidth: 1,
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(1.8),
        paddingRight: hp(1.0),
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        marginBottom: hp(0.5),
    },
    downloadIcon: {
        width: hp(2),
        resizeMode: 'contain',
    },
    fileName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.85),
        lineHeight: hp(3.60),
    },
    containerWrap: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    grpThumbVideo: {
        width: hp(31.90),
        height:wp(13),
        marginVertical:wp(2),
        resizeMode: 'stretch',
    },
    subLineTitle: {
        marginTop: hp(-4.8),
        zIndex: 9,
        paddingRight:hp(1.5),
    },
    closeIconSmall: {
        width: hp(2.8),
        resizeMode: 'contain',
        opacity: 0.4,
    },
    addIcon: {
        width: hp(1.56),
        resizeMode: 'contain',
        marginLeft:hp(1.56),
    },
    addItem: {
        flexDirection: 'row',
        marginBottom: hp(2.6),
        alignItems: 'center',
        marginTop: hp(1),
    },
    addItemText: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.56),
        color: COLORS.darkGray,
        textTransform: 'uppercase',
        paddingLeft: hp(1.3),
    },
    commonInput: {
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.6),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingBottom: hp(1.5),
        paddingTop: hp(1.5),
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
        marginLeft: hp(1.56),
        textTransform: 'uppercase',
    },
    recordLinkBlock: {
        width: hp(23.5),
        padding: hp(1.43),
        paddingTop: hp(0.8),
        paddingBottom: hp(0.8),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        alignItems: 'center',
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
        fontSize: 18,
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        overflow: 'hidden',
        borderRadius: hp(1.0),
        lineHeight: hp(2.3),
        height: hp(6),
        paddingLeft: hp(2.0),
        paddingRight: hp(2.0),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        fontFamily: FONTS.fontRegular,
    },
    dropDownSmall: {
        flexDirection: 'row',
        width: '100%',
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        // borderWidth: 1,
        // borderColor:COLORS.commonBorderColor,
        // overflow: 'hidden',
        // borderRadius: hp('1.0%'),
        // lineHeight:hp(2.3),
        height: hp('6%'),
        paddingLeft: hp(2.0),
        paddingRight: hp(2.0),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        fontFamily: FONTS.fontRegular,
    },
    dropDownSmallWrap: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp('6%'),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        alignSelf: 'center',
    },
    textBox: {
        flexDirection: 'row',
        width: '100%',
    },
    textBox1: {
        width: '100%',
    },
    placeholderStyle: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    rightBlockText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        lineHeight: hp(2.8),
    },
    commonInputTextarea: {
        width: '100%',
        height: hp(14.84),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.3),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontSemiBold,
    },
    commonInputTextareaBoldGrey: {
        width: '100%',
        height: hp(14.84),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
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
        height: hp(14.84),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
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
        backgroundColor: COLORS.transparent,
    },
    dateTimetextdummy: {
        fontSize: 18,
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dateTimetextdummy1: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        justifyContent: 'center',
        height: '100%',
        
    },
    dateTimetextdummy2: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    dateField: {
        flex: 0.30
    },
    timeField: {
        flex: 0.20
    },
    participantsField: {
        flex: 0.30
    },
    blockSpaceBottom: {
        marginBottom: hp(2.6),
        marginTop: hp(2),
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
        marginTop:hp(3.5),
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
        shadowOpacity: 0.1,
        borderRadius: hp(1.95),
        height: hp(8.85),
        borderRadius: hp(0.6),
        marginBottom:hp(0.78),
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
        right: 10
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
        width: hp(18.55),
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
        paddingLeft:hp(4.0),
    },
    uploadBoard:{
        width:hp(33.07),
        height:hp(45.05),
        resizeMode:'contain',
    },
    containerWrapTop: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth:1,
        alignItems: 'center',
        borderColor:COLORS.lightGrayPupil,
        borderRadius:hp(0.9),
        marginBottom:hp(2),
        padding:hp(1),
        top: hp(2),
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        marginLeft:hp(3.25),
        marginRight:hp(3.25),
    },
    userThumb:{
        width:hp(6.25), 
        height:hp(6.25), 
        backgroundColor: COLORS.lightGrayPupil,  
        borderRadius: hp(5), 
        marginRight:hp(1.30),
    },
    userLeft:{
       width:hp(64.19),
       flexDirection: 'row',
    },
    userRight:{
        width:hp(53.12),
        flexDirection: 'row',
        right: 0,
        position: 'absolute',
    },
    userTopName:{
        flexDirection: 'row',
        fontFamily: FONTS.fontSemiBold,
        fontSize:hp(2.08),
        color:COLORS.darkGray,
    },
    userTopGroup:{
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
    },
    dateTitle:{
        flexDirection: 'row',
        fontFamily: FONTS.fontSemiBold,
        fontSize:hp(1.56),
        color:COLORS.menuLightFonts,
        textTransform:'uppercase',
    },
    dateText:{
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
    },
    markedIcon:{
        width: 60,
        height: 60,
        resizeMode:'contain',
    },
    markedIcon1:{
        width: 30,
        height: 30,
        resizeMode:'contain',
        marginRight: 10,
    },
    uploaded: {
        alignSelf: 'center', 
        marginVertical: 8, 
        color: COLORS.greyplaceholder
    },
    markedLabel:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight:hp(9.63),
        alignItems: 'center',
    },
    markedText:{
        fontFamily: FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
        lineHeight:hp(3.2),
    },
    dateNameBlock:{
        marginRight:hp(2.21),
    },
    feedbackBlock:{
        width:hp(70.31),
        marginTop: hp(2.5),
        marginLeft:hp(4.03),
    },
    ratingBlock:{
        width:hp(43.35),
        marginLeft:hp(1.95),
        marginTop: hp(2.5),
        marginRight:hp(3.9),
    },
    lessonTitleBold:{
        fontFamily: FONTS.fontSemiBold,
        fontSize:hp(2.08),
        color:COLORS.darkGray,
    },
    achivementBox:{
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        width :hp(43.48),
        alignItems:'center',
        backgroundColor:COLORS.white,
        borderRadius:hp(1.8),
        elevation: 1,
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    starSelectedText:{
        fontFamily: FONTS.fontBold,
        color:COLORS.white,
        fontSize: hp(1.82),
        lineHeight: hp(5.1),
    },
    starSelected:{
        width:hp(4.94),
        height:hp(4.68),
        resizeMode: 'contain',
        alignItems:'center',
        alignSelf: 'center',
        marginBottom:hp(1.5),
    },
    rewardStarMark:{
        justifyContent: 'space-around',
        width:'100%',
        flexDirection: 'row',
        paddingTop:hp(3.05),
        paddingBottom:hp(3.05),
    },
    centerText:{
        alignItems:'center',
    },
    starText:{
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    ratingTitle:{
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color:COLORS.menuLightFonts,
        paddingBottom:hp(1.5),
    },
    separater:{
        borderLeftWidth:1,
        borderLeftColor:COLORS.dashboardBorder,
        borderRightWidth:1,
        borderRightColor:COLORS.dashboardBorder,
        width:hp(14.32),
    },
    centerStar:{
        alignItems:'center',
    },
    videoTitle:{
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(2.08),
        color: COLORS.darkGray,
        marginTop: hp(2),
    },
    videoWrap:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    },  
    videoThumb:{
        position:'relative',
        flexDirection:'row',
        marginRight:hp(1.56),
    },
    videoThumbnail:{        
        width:hp(26.17),
        height:hp(17.83),
        resizeMode:'contain',
    },
    videoPlay:{
        width:hp(5.20),
        resizeMode:'contain',
        position:'absolute',
        top:hp(5.5),
        left:hp(11.32),
    },
    videoSelected:{
        width:hp(2.9),
        resizeMode:'contain',
        position:'absolute',
        bottom:hp(0.2),
        right:hp(1),
    },
    videoSubTitle:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.9),
        color: COLORS.darkGray,
        flexDirection:'row',
        lineHeight:hp(2.6),
        paddingTop:hp(1.5),
        paddingBottom:hp(1.5),
        width:hp(26.17),
        flexWrap:'wrap',
        marginBottom: hp(2),
    },
    spaceTop:{
        marginTop:hp(3.5),
    },
    rightSpaceNone:{
        marginRight:hp(0),
    },
    alignRow:{
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: hp(1),
        marginTop: hp(0.5),
    },
    closeNotificationbar:{
        width: hp(1),
        height: hp(1),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(2),
        top: hp(0.8),
    },    
    borderRight:{
        borderRightWidth:1,
        borderRightColor:COLORS.bottomProfileLightBorder,
    },
    dropHolderImg:{
        width: wp(26.68),
        resizeMode: 'contain',
        alignItems: 'center',
    },
    thumbVideo:{
        // marginTop:hp(6.38),
        // marginBottom:hp(2.99),
    },
    topSpaceRecording:{
        marginTop:hp(1.401),
    },
    dropDownArrow:{
        width:hp(1.51),
        resizeMode:'contain',
        position:'absolute',
        right:hp(1.4),
        top:hp(2.1),
    },
    dropDownArrowdatetime:{
        width:hp(1.51),
        resizeMode:'contain',
        position:'absolute',
        right:hp(1.6),
        alignSelf: 'center',
    },
    dropDownArrowdatetimehomeWork:{
        width:hp(1.51),
        resizeMode:'contain',
        position:'absolute',
        right:hp(1.6),
        top:hp(2),
    },
    plainBg:{
        paddingLeft: hp(3.5),
        paddingRight: hp(3.5),
        paddingBottom: hp(2),
        paddingTop: hp(0),
        backgroundColor: COLORS.backgroundColorCommon,
    },
    commonInputFull:{
        width:'100%',
    },
    lessonDesc:{
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontRegular,
    },
    timeSpace:{
        marginLeft:hp(12.83),
    },
    leftSpace:{
        paddingLeft:hp(3.5),
    },
    userIcon1Parent: {
        position: 'absolute',
        right: hp(1.60),
        top: hp(0.5),
    },
    userIcon1: {
        position: 'absolute',
        width: hp(2),
        height: hp(2),
        resizeMode: 'contain',
        alignSelf: 'center',
        top: 10,
        right: 5
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: hp(1.30)
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
        flex: 1,
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    },
    uploadBlock: {
        alignItems: 'center',
    },
    hrCommon: {
        borderBottomWidth: 1,
        borderColor: COLORS.commonBorderColor,
        width: '100%',
        marginTop: hp(0),
        marginBottom: hp(2),
    },
    hrCommon2: {
        borderBottomWidth: 1,
        borderColor: COLORS.commonBorderColor,
        width: '100%',
        marginTop: hp(1),
        marginBottom: hp(1),
    },
    filterbarMain: {
        flexDirection: 'row',
        marginBottom: hp(2.60),
    },
    field: {
        position: 'relative',
        width: hp(30),
        justifyContent: 'center',
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: 50,
        paddingLeft: 15,
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
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
        flex: 1,
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: hp(5.5),
        width: hp(20.98),
        borderRadius: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
    },
    checkMark: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        left: hp(0.4),
        top: hp(0.28)
    },
    checkMarkTool: {
        marginLeft:hp(0.2),
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
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
    downloaBtn:{
        alignItems:'center',
        justifyContent: 'center',
        width:hp(5),
        height:'100%',
    },
    checkBoxGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});