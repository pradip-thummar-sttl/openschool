import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        height: '100%',
        paddingHorizontal: hp(2),
        paddingVertical: hp(2),
        backgroundColor: COLORS.backgroundColorCommon,
    },
    feedsMain: {
        marginBottom: hp(55),
    },
    feeds: {
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.1,
        backgroundColor: COLORS.white,
        shadowRadius: hp(1),
        paddingHorizontal: hp(1.84),
        paddingTop: hp(2.46),
        paddingBottom: hp(1.84),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: hp(1),
        marginBottom: hp(1.84),
    },
    dateGrp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(0.9),
    },
    titleMain: {
        marginBottom: hp(1),
    },
    title: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGrayIntro,
    },
    message: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGrayIntro,
    },
    statusSent: {
        width: hp(6),
        borderRadius: hp(0.5),
        overflow: 'hidden',
        backgroundColor: COLORS.sentStatus,
        textAlign: 'center',
        fontSize: hp(1.47),
        color: COLORS.dashboardPupilBlue,
        paddingVertical: hp(0.5),
        textTransform: 'uppercase',
        fontFamily: FONTS.fontSemiBold,
    },
    statusDraft: {
        width: hp(7),
        borderRadius: hp(0.5),
        overflow: 'hidden',
        backgroundColor: COLORS.draftStatus,
        textAlign: 'center',
        fontSize: hp(1.47),
        color: COLORS.draftStatusText,
        paddingVertical: hp(0.5),
        textTransform: 'uppercase',
        fontFamily: FONTS.fontSemiBold,
    },
    dateText: {
        fontSize: hp(1.60),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGrayIntro,
    },
    groupText: {
        fontSize: hp(1.60),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
    },
    arrowIcon: {
        width: hp(1.35),
        resizeMode: 'contain',
        height: hp(1.75),
    },
    MainProfile: {
        height: hp(100),
        backgroundColor: COLORS.white,
    },
    profileImageArea: {
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: hp(13.8),
        resizeMode: 'cover',
    },
    profileOuter: {
        borderRadius: hp(100),
        borderWidth: hp(0.1),
        borderColor: COLORS.white,
        position: 'absolute',
        top: hp(7.38),
    },
    profileImage: {
        width: hp(12.31),
        height: hp(12.31),
        backgroundColor: COLORS.white,
        borderRadius: hp(100),
        resizeMode: 'cover',
        backgroundColor : COLORS.lightGrayPupil
    },
    mainDetails: {
        marginTop: hp(2),
        paddingHorizontal: hp(2),
        marginBottom: hp(10)
    },
    mainDetailsForm: {
        marginTop: hp(10),
        paddingHorizontal: hp(2),
        marginBottom: hp(6)
    },
    mainDetailsFormSchool: {
        paddingHorizontal: hp(2),
        marginBottom: hp(37.5)
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
        color: COLORS.darkGrayIntro,
    },
    scrollViewCommon: {
        marginBottom: hp(5),
    },
    scrollViewCommonPupilEdit: {
        marginBottom: hp(6),
    },
    scrollViewCommonPupilEditSchool: {
        marginBottom: hp(0),
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
        marginTop: hp(1),
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
        marginTop: hp(2),
        marginBottom: hp(1),
    },
    pupilPerfomanceEdit: {
        marginTop: hp(2.5),
        paddingHorizontal: hp(2),
    },
    titlePerfomance: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
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
    editProfileIcon: {
        width: hp(2),
        height: hp(2),
        resizeMode: 'contain',
    },
    calIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        bottom: 15,
        width: hp(2),
        resizeMode: 'contain',
    },
    pupilEditGraph: {
        width: '100%',
        resizeMode: 'contain',
    },
    profileeditButton: {
        width: hp(1.57),
        height: hp(1.57),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    profileEdit: {
        backgroundColor: COLORS.dashboardGreenButton,
        alignSelf: 'flex-end',
        padding: hp(1.5),
        borderRadius: hp(1),
        marginBottom: hp(1.32),
    },
    DropArrow: {
        width: hp(1.41),
        height: hp(0.93),
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        bottom: 24,
    },
    eyeParent: {
        justifyContent: 'center'
    },
    eye: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20
    },
    viewIcon: {
        resizeMode: 'contain',
        width: hp(2.5),
        height: hp(8)
    },
    performancePArent: {
        borderColor: COLORS.commonBorderColor, borderRadius: 10, borderWidth: 1, flexDirection: 'column', width: '100%'
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
    }
});