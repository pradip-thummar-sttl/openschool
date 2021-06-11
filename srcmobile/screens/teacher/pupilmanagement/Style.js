import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        backgroundColor: COLORS.white,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: hp(6.15),
    },
    noDataImage: {
        width: hp(30),
        resizeMode: 'contain',
        height: hp(25),
        marginBottom: hp(6.15),
        marginTop: hp(7.38)
    },
    nodataTitle: {
        fontSize: hp(2.21),
        color:COLORS.darkGrayIntro,
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center',
        marginBottom: hp(1.5),
    },
    nodataContent: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
});