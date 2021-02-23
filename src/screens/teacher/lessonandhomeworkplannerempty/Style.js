import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

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
        position: 'relative',
        flexDirection: 'row',
        borderRadius: hp(1.95),
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
    },
    dayTitle: {
        color: COLORS.white,
        fontSize: hp(2.6),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(1.30),
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
        shadowColor: "#000",
        shadowOffset: {width: 0,height: hp(1.03),},
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
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        marginTop: hp(1.30),
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        height: hp(67.70),
    },
    pupilBoard: {
        marginTop: hp(5),
        backgroundColor: COLORS.dashboardPupilBlue,
    },
});