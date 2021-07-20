import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../utils/Colors';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    profile: {
        width: hp(12),
        height: hp(12),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
    },
    profileTitle: {
        fontSize: hp(2.0),
        marginBottom: hp(0.1),
        color: COLORS.greyplaceholder,
        fontFamily: FONTS.fontRegular,
        marginTop: 30
    },
    actionParent: {
        width: '100%',
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        width: hp(9),
        height: hp(9),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
    },
});