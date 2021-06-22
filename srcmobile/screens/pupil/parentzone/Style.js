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
    feeds: {
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.1,
        backgroundColor: COLORS.white,
        shadowRadius: hp(1),
        paddingHorizontal: hp(1.84),
        paddingTop: hp(2.46),
        paddingBottom: hp(1.23),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: hp(1),
    },
});