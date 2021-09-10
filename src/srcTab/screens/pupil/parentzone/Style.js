import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.white,
    },
    left: {
        flex: 0.26,
        borderRightColor: COLORS.dashBoard,
        borderRightWidth: 1,
        paddingTop: 20
    },
    middle: {
        flex: 0.48,
        flexDirection: 'column',
        paddingTop: 20,
    },
    right: {
        flex: 0.26,
        paddingTop: 20,
    },
    pupilParent: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    userStampName: {
        fontSize: 14,
        paddingRight: 40,
        paddingLeft: 20,
    },
    pupilName: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGrayIntro,
    },
    message: {
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    bar: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 1,
        backgroundColor: COLORS.dashBoard
    },
    selectedPupilParent: {
        flexDirection: 'row',
        padding: 10,
        width: '90%',
        borderWidth: 1,
        borderColor: COLORS.dashBoard,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center'
    },
    selectedMediabar: {
        width: 30,
        height: 30,
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    selectedRemove: {
        width: 25,
        height: 25,
        borderRadius: hp(50),
    },
    groupEdit: {
        width: 20,
        borderRadius: hp(50),
        resizeMode: 'contain',
    },
    selectedPupilName: {
        fontSize: 20,
        marginLeft: 10,
        flex: 1,
        paddingVertical: 2,
    },
    mediabarRight: {
        width: 40,
        height: 40,
        borderRadius: hp(50),
        marginLeft: 15,
        backgroundColor: COLORS.lightGrayPupil,
    },
    groupTitle: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    groupParent: {
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.dashBoard,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center'
    },
    groupName: {
        fontSize: 20,
        flex: 1,
    },
    input: {
        borderBottomColor: COLORS.dashBoard,
        borderBottomWidth: 1,
        fontSize: 30,
        paddingBottom: 10,
        marginBottom: 50,
        marginHorizontal: 30
    },
    button: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '800',
        borderRadius: hp(1),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignContent: 'center',
    },
    buttonParent: {
        height: 60,
        width: 200,
        marginVertical: 20,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: COLORS.dashboardGreenButton,
    },
    label: {
        height: 50,
        fontSize: 25,
        padding: 10,
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
    },
    // Mamagement UI starts
    managementBlankImgWrap: {
        textAlign: 'center',
        alignItems: 'center',
        marginTop: hp(22.13),
        marginBottom: hp(18),
        flex: 1,
    },
    blankPageImage: {
        width: hp(35.03),
        height: hp(30.77),
        resizeMode: 'contain',
    },
    blankManageTextBold: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontBold,
        textAlign: 'center',
    },
    blankManageTextNormal: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        textAlign: 'center',
    },
    managementBlockTop: {
        height: hp(14.06),
        width: '100%',
        position: 'relative',
    },
    managementopImage: {
        width: '100%',
        height: hp(14.06),
        resizeMode: 'cover',
    },
    thumbTopUser: {
        position: 'absolute',
        left: 78,
        top: 32,
    },
    thumbTopUser1: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: COLORS.white,
        borderWidth: 4,
    },
    topBannerBtn: {
        position: 'absolute',
        paddingHorizontal: hp(3),
        paddingVertical: hp(3),
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: hp(1.56),
    },
    topBannerBtn1: {
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: 12,
        lineHeight: 37.5,
        textTransform: 'uppercase',
        borderRadius: 8,
        borderWidth: 1,
        width: 128,
        height: 40,
        textAlign: 'center',
        overflow: 'hidden',
        borderColor: COLORS.buttonGreen,
        backgroundColor: COLORS.buttonGreen,
    },
    topBannerParent: {
        paddingHorizontal: 10,
        position: 'absolute',
        right: 32,
        top: 17,
    },
    managementNameSec: {
        flexDirection: 'row',
        paddingLeft: hp(26.04),
        paddingTop: hp(8.64),
    },
    userLabel: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
    },
    userName: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    nameSmlBlock: {
        marginRight: hp(2),
        width: 215,
    },
    mailSmlBlock: {
        marginRight: hp(2),
        width: 330,
    },
    passSmlBlock: {
        marginRight: hp(2),
        width: 200,
    },    
    addSmlBlock: {
        marginRight: hp(2),
        width: 625,
    },    
    dateSmlBlock: {
        marginRight: hp(2),
        width: 200,
    },
    UniqueNumberClass: {
        marginRight: hp(2),
        width: 215,
    },
    paragraphText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.introGreyColor,
        flexWrap: 'wrap',
        paddingBottom: hp(2),
    },
    managementParaSec: {
        marginRight: hp(20.05),
        marginTop: hp(1.5),
        paddingLeft: hp(26.04),
    },
    ratingBlock: {
        width: hp(43.35),
        marginLeft: hp(1.95),
        marginTop: hp(2.5),
        marginRight: hp(3.9),
    },
    achivementBox: {
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        width: hp(43.48),
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: hp(1.8),
        elevation: 1,
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
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
        marginBottom: hp(1.5),
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '100%',
        flexDirection: 'row',
        paddingTop: hp(3.05),
        paddingBottom: hp(3.05),
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
    whiteBg: {
        backgroundColor: COLORS.backgroundColorCommon,
        paddingBottom: hp(2),
        paddingTop: hp(0),
        flex: 1,
    },
    annotationText: {
        width: hp(72.91),
        marginTop: hp(2.5),
    },
    rateAnnotationBlock: {
        flexDirection: 'row',
    },
    annotationBox: {
        borderWidth: 1,
        borderColor: COLORS.dashboardBorder,
        borderRadius: hp(1.8),
        padding: hp(1.95),
    },
    anoteTitle: {
        paddingLeft: hp(1.95),
        paddingBottom: hp(1.80),
    },
    graphBlock: {
        flexDirection: 'row',
    },
    graphTitle: {
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        fontSize: hp(2.08),
        marginTop: hp(5),
        marginLeft: hp(2.3),
    },
    chartBlock: {
        width: hp(28.20),
        alignItems: 'flex-start',
    },
    mngmntchartImg: {
        width: hp(25.20),
        height: hp(25.20),
        resizeMode: 'contain',
    },
    generalRow: {
        flexDirection: 'row',
    },
    purpleMark: {
        width: 10,
        height: 10,
        borderRadius: hp(1.8),
        backgroundColor:'purple'
    },
    labelMark: {
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.82),
    },
    normalText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.introGreyColor,
    },
    graphChartText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.introGreyColor,
        marginTop: hp(7),
        marginBottom: hp(4),
    },
    graphBox: {
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        backgroundColor: COLORS.white,
        borderRadius: hp(1.8),
        elevation: 1,
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        width: '100%',
        padding: hp(3),
    },
    purpleMark: {
        width: hp(1.82),
        height: hp(1.82),
        resizeMode: 'contain',
        marginTop: hp(0.3),
        marginRight: hp(1.5),
        backgroundColor:'#BE8CFF',
        borderRadius:5
    },
    orangeMark: {
        width: hp(1.82),
        height: hp(1.82),
        resizeMode: 'contain',
        marginTop: hp(0.3),
        marginRight: hp(1.5),
        backgroundColor:'orange',
        borderRadius:5
    },
    mngmntgraphImg: {
        width: hp(118.16),
        height: hp(37.36),
        resizeMode: 'contain',
    },
    listBottomSpace: {
        marginBottom: hp(1.5),
    },
    pzEditIcon: {
        width: hp(3.38),
        height: hp(3.38),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(4.8),
        bottom: hp(-1.6),
        backgroundColor: COLORS.white
    },
    editProfileIcon: {
        width: hp(3.38),
        height: hp(3.38),
        resizeMode: 'contain',
    },
    titleLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp('4.8%'),
        marginTop: hp('18.22%'),
        marginBottom: hp('4%'),
        marginLeft: hp('8.4%'),
        fontFamily: FONTS.fontBold,
    },
    loginForm: {
        paddingLeft: hp('9%'),
        paddingRight: hp('9%'),
    },
    field: {
        position: 'relative',
        marginBottom: hp('2.0%'),
    },
    userIcon: {
        position: 'absolute',
        top: hp('2.3%'),
        left: hp('3%'),
        resizeMode: 'contain',
        width: hp(1.7),
        height: hp(2)
    },
    viewIcon: {
        position: 'absolute',
        top: hp(0),
        resizeMode: 'contain',
        width: hp(2.5),
        height: hp(8)
    },
    viewIconParent: {
        position: 'absolute',
        top: hp(0),
        right: hp('3%'),
        resizeMode: 'contain',
        width: hp(2.5),
        height: hp(8)
    },
    bottomLoginFeild: {
        flexDirection: 'row',
    },
    rememberFeild: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    },
    forgotLink: {
        width: '50%',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: hp('1.8%'),
        color: COLORS.linkLightPurple,
        lineHeight: hp('3.0%'),
        marginLeft: hp('1.0%'),
        fontFamily: FONTS.fontBold,
    },
    forgotPass: {
        fontSize: hp('1.8%'),
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontRegular,
        color: COLORS.buttonGreen,
        fontWeight: '700',
    },
    loginButtonView: {
        marginTop: hp('3.0%'),
        width: '80%',
    },
    bottomLoginIntro: {
        top: hp('8%'),
        paddingLeft: hp('8.5%'),
        paddingRight: hp('7%'),
    },
    eye: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20
    },
    eyeParent: {
        justifyContent: 'center'
    },
    fieldInputLabel: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        paddingBottom: hp(1),
    },
    commonButtonGreen: {
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
        fontSize: hp('1.56'),
        fontWeight: '800',
        borderRadius: hp('1.3'),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2),
        paddingRight: hp(2),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        alignSelf: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 50, },
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    getStartText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        marginTop: hp(5),
        marginLeft: hp('8.4%'),
    },
    commonFontsPupleUnderline: {
        paddingTop: hp(0.5),
        color: COLORS.lightGray,
        //fontSize: hp(3.81),
        fontWeight: '500',
        lineHeight: hp('2.6%'),
        fontFamily: FONTS.fontRegular,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        fontSize: hp(1.56),
    },
    greenText: {
        color: COLORS.buttonGreen,
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        lineHeight: hp(1.5),
    },
    registerSmtText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
    },
    rightRegisterSmlText: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingTop: hp(3.5),
        paddingRight: hp(3.5),
    },
    titleAccountLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp('4.8%'),
        marginTop: hp(0.5),
        marginBottom: hp('4%'),
        marginLeft: hp('8.4%'),
        fontFamily: FONTS.fontBold,
    },
    loginAccountForm: {

        flexDirection: 'row',
        justifyContent: 'space-between',

        marginBottom: hp('2.0%'),
    },
    filedSpace: {
        width: hp(38.4),
        marginRight: hp(2.5),
    },
    firstNameSpace: {
        marginLeft: hp(9),
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.6),
        marginTop: hp(2.5),
    },
    dropWrap: {
        width: hp(10.2),
        marginTop: hp(2.5),
    },
    alignVert: {
        alignItems: 'center',
        marginRight: hp(2.5),
    },
    dateTimetextdummy: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
    },

    dropDownFormInput: {
        width: '100%',
    },
    subjectText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(0.8),
    },
    subjectDateTime: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    dropDown: {
        flexDirection: 'row',
        width: hp(10),
        color: COLORS.darkGray,
        fontSize: 18,
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        overflow: 'hidden',
        borderRadius: hp(1.0),
        lineHeight: hp(2.3),
        height: "100%",
        fontFamily: FONTS.fontRegular,
    },
    dateTimetextdummy: {
        fontSize: 18,
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dropDownArrow: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.4),
        top: hp(2.1),
    },
    formSpace: {
        marginLeft: 172,
        marginRight: 250,
    },
    formTopSpace: {
        marginTop: 75,
    },
    bottomSpace: {
        marginBottom: 90,
    },
    dateField: {
        paddingRight: hp(5),
        paddingLeft: hp(5),
    },
    dateIconSml: {
        position: 'absolute',
        width: hp(1.76),
        height: hp(1.76),
        resizeMode: 'contain',
        left: 15,
        top: 12,
    },
    dropArrow: {
        // position:'absolute',
        width: hp(1.51),
        height: hp(0.95),
        resizeMode: 'contain',
        // right:hp(1.5),
        top: hp(1.5),
        marginLeft: hp(1.5),
    },
    dropArrow1: {
        position:'absolute',
        width: hp(1.51),
        height: hp(0.95),
        resizeMode: 'contain',
        right: 12,
        top: 16,
        marginLeft: hp(1.5),
    },
    textArea: {
        height: hp(15),
        width: hp(79.5),
        paddingTop: hp(1.5),
    },
    tabLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        //paddingLeft:hp(13.67),
    },
    tabLinkGrey: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        color: COLORS.lightGray,
        marginRight: hp(4.16),
        textTransform: 'uppercase',
    },
    tabLinkSelected: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
    },
    profileFormTopSpace: {
        marginTop: hp(2),
    },
    profile: {
        paddingHorizontal: 35,
    },
    titleInner: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
    },
    titleInnerRow: {
        flexDirection: 'row',
        marginTop: hp(5),
        paddingLeft: hp(20),
    },
    managementProfileSec: {
        flexDirection: 'row',
        paddingLeft: hp(26.04),
        marginBottom: hp(4),
    },
    profileTitleRow: {
        flexDirection: 'row',
        width: hp(75),
        marginTop: hp(5),
        paddingBottom: hp(1),
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bottomProfileLightBorder,
        marginLeft: hp(26.04),
    },
    userNameNormal: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    addressText: {
        width: hp(20),
        flexWrap: 'wrap',
    },
    fullInput: {
        width: hp(79.5),
        paddingTop: hp(1.5),
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: hp(1.95),
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    filterbarMain: {
        //flexDirection: 'row',
        marginBottom: hp(2.60),
        width: hp(35),
        marginRight: hp(0.8),
    },
    field: {
        position: 'relative',
        // marginRight: hp(1.69),
    },
    searchParent: {
        width: hp(41.92), flexDirection: 'row', alignItems: 'center', height: hp(5.20), backgroundColor: COLORS.white,
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: hp(4.6),
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
        left: hp(1.43),
    },
    commonButtonBorderedheader: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(1.5),
        paddingRight: hp(4),
        paddingTop: hp(1.2),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
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
        zIndex: 9,
        marginRight: hp(2.2),
        marginLeft: hp(1.2)
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
        paddingTop: hp(1),
        paddingBottom: hp(1),
        textAlign: 'left',
        alignItems: 'center',
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: hp(5.20),
        width: hp(30.98),
        borderRadius: hp(1),
        left: hp(2),
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 5, },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    checkMark: {
        width: hp(1.48),
        height: hp(1.48),
        resizeMode: 'contain',
        position: 'absolute',
        right: 2,
        top: hp(1.5),
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    },
    filterListTextAddUser: {
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        textTransform: 'uppercase',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBarMainWhite: {
        paddingLeft: hp(13.67),
        paddingRight: hp(2.99),
        backgroundColor: COLORS.white,
        zIndex: 9,
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    smlFilterThumb: {
        width: hp(3.64),
        height: hp(3.64),
        resizeMode: 'contain',
        backgroundColor: COLORS.borderGrp,
        borderRadius: hp(3.64),
        marginRight: hp(1.5),
    },
    filterGroup: {
        flexDirection: 'row',
    },
    selectDropList: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.82),
        width: hp(14),
        color: COLORS.darkGray,
        top: hp(0.5),
    },
    filterAlign: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp(5.20),
        marginTop: 20,
        paddingBottom: hp(3),
    },
    plainBg: {
        paddingLeft: hp(8.46),
        paddingRight: hp(7.16),
        paddingBottom: hp(2),
        paddingTop: hp(0),
        backgroundColor: COLORS.backgroundColorCommon,
    },
    commonInputFull: {
        width: '100%',
    },
    commonInput: {
        color:COLORS.darkGrayIntro,
        fontSize: 14,
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: 6,
        lineHeight: 20,
        height: 40,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        fontFamily: FONTS.fontRegular,
    },
    commonInputPassword: {
        color:COLORS.darkGrayIntro,
        fontSize: 14,
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: 6,
        lineHeight: 20,
        height: 40,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        fontFamily: FONTS.fontRegular,
    },
    lessonDesc: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontRegular,
    },
    timeSpace: {
        marginLeft: hp(12.83),
    },
    leftSpace: {
        paddingLeft: hp(3.5),
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
    pupilData: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        height: hp(8.85),
        borderRadius: 6,
        marginBottom: hp(0.78),
        paddingHorizontal: 25,
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.12,
        shadowRadius: 2,
    },
    pupilProfile: {
        width: hp(15.80),
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
    // Grid Table
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingHorizontal: 20,
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
        fontSize: hp(1.56),
        lineHeight: hp(2.08),
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        textTransform: 'uppercase',
        paddingLeft: 15,
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
    firstColumn: {
        width: hp(55),
    },
    sentBlueText: {
        fontSize: hp(1.82),
        color: COLORS.dashboardPupilBlue,
        fontFamily: FONTS.fontRegular,
    },
    draftOrangeText: {
        fontSize: hp(1.82),
        color: COLORS.yellowDark,
        fontFamily: FONTS.fontRegular,
    },
    filterListWrapNew: {
        paddingVertical: 5,
        paddingLeft: 8,
        paddingRight: 15,
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        borderWidth: 1,
        width: hp(25),
        borderColor: COLORS.borderGrp,
        marginRight: 10,
    },
    filterListTextBold: {
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        textTransform: 'uppercase',
    },
    flexDiv: {
        height: '100%',
    },
    managementDetail: {
        paddingBottom: hp(15),
        paddingTop: hp(5.20),
    },
    MainProfile: {
        paddingLeft: hp(7.81),
        paddingRight: hp(9.75),
        marginTop: 20,
    },
    proffileLogo: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: hp(100),
        position: 'absolute',
        left: 78,
        borderColor: COLORS.white,
        borderWidth: 4,
        backgroundColor: COLORS.greyBack,
        top: 32,
    },
});