import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

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
        marginBottom: hp(2),
    },
    title: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontSemiBold,
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
});