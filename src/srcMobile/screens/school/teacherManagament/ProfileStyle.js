import { Dimensions, Platform, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    left: {
        flex: 0.26,
        borderRightColor: COLORS.dashBoard,
        borderRightWidth: 1,
        paddingTop: hp(2.46)
    },
    left1: {
        flex: 1,
        paddingTop: hp(2.46)
    },
    middle: {
        flex: 0.48,
        flexDirection: 'column',
        paddingTop: hp(2.46),
    },
    right: {
        paddingTop: 10,
        paddingHorizontal:Platform.OS==='ios'? hp(1.5):hp(0),
        height: '82%',
    },
    pupilParent: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
    },
    pupilParent1: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    pupilName1: {
        fontSize: 18,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
    bar: {
        marginHorizontal: hp(2.46),
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
        width: hp(2.46),
        resizeMode: 'contain',
    },
    groupEdit1: {
        width: hp(2),
        resizeMode: 'contain',
        right: 0,
        top: 5,
        marginTop:7
    },
    selectedPupilName: {
        fontSize: hp(2.46),
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
    groupTitle1: {
        flexDirection: 'row',
        paddingHorizontal: hp(2),
        marginBottom: hp(1),
        alignItems: 'center',
    },
    groupParent: {
        flexDirection: 'column',
        padding: hp(0.5),
        paddingVertical: hp(1.25),
        paddingBottom: hp(1.8),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(0.8),
        marginBottom: hp(0.615),
        marginTop: hp(0.615),
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.04,
        shadowRadius: hp(1),
    },
    groupName: {
        fontSize: hp(2.46),
    },
    input: {
        borderBottomColor: COLORS.videoLinkBorder,
        borderBottomWidth: 1,
        fontSize: hp(1.97),
        paddingBottom: hp(1.5),
        marginHorizontal: hp(2),
        marginBottom: 50,
    },
    input1: {
        borderBottomColor: COLORS.videoLinkBorder,
        borderBottomWidth: 1,
        color: COLORS.darkGrayIntro,
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.97),
        paddingBottom: hp(1),
        marginHorizontal: hp(2),
        marginBottom: hp(1.5),
    },
    button: {
        color: COLORS.white,
        fontSize: hp(2.46),
        fontWeight: '800',
        borderRadius: hp(1),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignContent: 'center',
    },
    button1: {
        color: COLORS.white,
        fontSize: hp(1.60),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignContent: 'center',
    },
    buttonParent: {
        height: 60,
        width: 200,
        marginVertical: hp(2.46),
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: COLORS.dashboardGreenButton,
    },
    buttonParent1: {
        height: hp(5.20),
        marginTop: hp(2.46),
        marginHorizontal: hp(0.5),
        borderRadius: 8,
        width: '50%',
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: COLORS.dashboardGreenButton,
    },
    label: {
        height: hp(5.5),
        fontSize: 25,
        padding: 10,
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
    },
    mainPage: {
        height: '100%',
        paddingHorizontal: hp(2),
        paddingVertical: hp(2),
        backgroundColor: COLORS.backgroundColorCommon,
    },
    mainPage1: {
        height: '85%',
        paddingHorizontal: hp(2),
        paddingVertical: hp(2),
        backgroundColor: COLORS.backgroundColorCommon,
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
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 50
    },
    nodataTitle: {
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
        fontSize: 18,
        textAlign : 'center',
        marginBottom: 10,
    },
    nodataContent: {
        alignSelf: 'center',
        fontSize: 18,
        textAlign : 'center'
    },
    pupilData: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
        paddingBottom: hp(1),
        marginBottom: hp(1),
    },
    pupilProfile: {
        width: Platform.OS == 'android' ? hp(30.5) : hp(26),
    },
    rowProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pupilImage: {
        width: hp(3.7),
        height: hp(3.7),
        borderRadius: hp(3.7/2),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.5),
        top: hp(1.1),
    },
    pupilName: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.6),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    groupPupil: {
        left: hp(5.2),
        bottom: hp(0.6),
    },
    groupName: {
        color: COLORS.darkGray,
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        textAlignVertical: 'center',
        flex: 1
    },
    rewardColumn: {
        flexDirection: 'row',
        right: hp(1),
        alignItems: 'center',
    },
    rewardStar: {
        width: hp(2.60),
        marginRight: hp(1),
    },
    rewardStartIcon: {
        width: hp(2),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: hp(1)
    },
    pupilDetailLink: {
        width: hp(1.95),
        alignItems: 'flex-end',
        right: hp(0.8),
    },
    MainProfile: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    pupilDetaillinkIcon: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    profileImageArea: {
        alignItems: 'center',
        backgroundColor:'#90daff'
    },
    coverImage: {
        width: '100%',
        height: hp(13.8),
        resizeMode: 'contain',
    },
    profileOuter: {
        borderRadius: hp(100),
        borderWidth: 1,
        borderColor: COLORS.white,
        position: 'absolute',
        top: hp(7.38),
        backgroundColor: COLORS.white
    },
    profileImage: {
        width: hp(13),
        height: hp(13),
        borderRadius: hp(13/2),
        backgroundColor: COLORS.lightGrey
        // resizeMode: 'contain',
    },
    mainDetails: {
        marginTop: hp(8.75),
        paddingHorizontal: hp(2),
    },
    mainDetailsForm: {
        marginVertical: hp(10),
        paddingHorizontal: hp(2),
    },
    fieldDetails: {
        marginBottom: hp(4.3),
    },
    fieldDetailsForm: {
        marginBottom: hp(3),
        position: 'relative',
    },
    label: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: 3,
    },
    label1: {
        fontSize: hp(1.2),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: 3,
    },
    achivementBox:{
        width :'100%',
        height: 110,
        alignItems:'center',
        flexDirection: 'row',
        marginTop: 50,
    },
    insightBox: {
        backgroundColor: COLORS.greyInsight,
        borderRadius: 10,
        flex: 1,
        height: 150,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingTop: 40
    },
    insightLabel: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontBold,
    },
    labelForm: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: hp(0.8),
        paddingLeft: hp(1.5),
    },
    data: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    scrollViewCommon: {
        marginBottom: hp(30),
    },
    scrollViewCommonPupilEdit: {
        marginBottom: hp(15),
    },
    rewardSection: {
        paddingHorizontal: hp(2),
        marginTop: hp(2.5),
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '100%',
        flexDirection: 'row',
        paddingVertical: hp(2.5),
        marginTop: hp(2),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.1,
        backgroundColor: COLORS.white,
        shadowRadius: hp(1),
    },
    centerText: {
        alignItems: 'center',
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
        borderColor: COLORS.videoLinkBorder,
        borderRightWidth: 1,
        width: hp(14.32),
        marginHorizontal: hp(-2.5),
        alignItems: 'center',
    },
    starText: {
        fontFamily: FONTS.fontRegular,
        fontSize: Platform.OS == 'android' ? hp(1.2) : hp(1.6),
        color: COLORS.darkGray,
    },
    commonInputTextareaBoldGrey: {
        width: '100%',
        height: wp(41.25),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.3),
        backgroundColor: COLORS.backgroundColorCommon,
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        textAlignVertical: 'top',
        fontFamily: Platform.OS == 'android' ? FONTS.fontRegular : FONTS.fontSemiBold,
    },
    pupilPerfomance: {
        marginTop: hp(2.5),
        paddingLeft: hp(2),
        marginBottom: hp(3)
    },
    pupilPerfomanceEdit: {
        marginTop: hp(2.5),
        paddingHorizontal: hp(2),
    },
    tickLayout: {
        backgroundColor: COLORS.buttonGreen,
        borderRadius: 10,
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    tickLayoutPArent: {
        backgroundColor: COLORS.buttonGreen,
        borderRadius: 10,
        height: 35,
        width: 35,
        // marginBottom:50,        // bottom:hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        alignSelf: 'flex-end',
    },
    titlePerfomance: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(1),
    },
    graph: {
        width: '100%',
        height: hp(95),
        resizeMode: 'cover',
    },
    editProfileMain: {
        position: 'absolute',
        bottom: hp(-1.6),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: hp(4),
        height: hp(4),
        backgroundColor: COLORS.white,
        borderColor: COLORS.editBorder,
        borderWidth: 1,
        borderRadius: hp(100),
        resizeMode: 'contain',
    },
    editProfileMain11: {
        position: 'absolute',
        bottom: hp(-1.6),
        width: hp(4),
        height: hp(4),
        backgroundColor: COLORS.black,
        borderColor: COLORS.editBorder,
        borderWidth: 1,
        borderRadius: hp(100),
    },
    editProfileIcon: {
        width: hp(2),
        height: hp(2),
        resizeMode: 'contain',
    },
    calIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: hp(2.46),
        bottom: 15,
        width: hp(2),
        resizeMode: 'contain',
    },
    pupilEditGraph: {
        width: '100%',
        resizeMode: 'contain',
    },
    newGroup: {
        flexDirection: 'row', borderRadius: hp(0.73),
        borderColor: COLORS.blueBorder,
        borderWidth: 1,
        height: hp(5.91),
        backgroundColor: COLORS.white,
        marginHorizontal: Platform.OS === 'ios'? hp(2):hp(0),
        marginTop: hp(2),
        paddingLeft: hp(2)
    },
    newGroupLbl: {
        marginHorizontal: hp(2),
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignSelf: 'center',
        fontSize: hp(1.6),
        color: COLORS.darkGrayIntro,
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginLeft: hp(2.46),
        marginBottom: hp(2.46),
    },
    checkMark: {
        position :'absolute',
        alignContent: 'flex-end',
        right: 10,
    },
    createIcon: {
        width: hp(2.30),
        height: hp(2.30),
        resizeMode: 'contain',
        alignSelf: 'center',
        left: hp(0.3)
    },
    performancePArent: {
        borderColor: COLORS.commonBorderColor, borderRadius: 10, borderWidth: 1, flexDirection: 'column', width: '100%', marginTop:hp(1)
    },
    colorLeftParent: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: 15
    },
    colorRightParent: {
        flexDirection: 'row', alignItems: 'center', right: 0, position: 'absolute', marginHorizontal: 15
    },
    colorSquare: {
        height: 15, width: 15, backgroundColor: COLORS.purpleDark, borderRadius: 5, marginRight: 10
    },
    colorSquareRight: {
        height: 15, width: 15, backgroundColor: COLORS.yellowDark, borderRadius: 5, marginRight: 10
    },
    introText: {
        color: COLORS.lightGray, fontFamily: FONTS.fontRegular
    },
    bottomText: {
        color: COLORS.darkGray, fontFamily: FONTS.fontRegular, padding: 10 
    },
    rowProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    squreView:{ borderRadius: 10, height: 100, width: 100, backgroundColor: COLORS.greyBack, justifyContent: 'center', padding: 8 },
    fieldInputLabel: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        paddingBottom: hp(1),
    },
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight:hp(1.04),
        alignSelf: 'center',
    },
    dateTimetextdummy: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dropDownArrow:{
        width:hp(1.51),
        resizeMode:'contain',
        position:'absolute',
        right:hp(1.4),
        alignSelf: 'center',
    },
    dropDownFormInput: {
        width: '100%',
        marginBottom:hp(3)
    },
});