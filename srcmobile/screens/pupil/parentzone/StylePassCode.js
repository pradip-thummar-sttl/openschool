import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');
import FONTS from '../../../utils/Fonts';
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    EnterCodeText: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(3),
        marginBottom: 10
    },
    numberView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    roundButton: {
        height: hp(7),
        width: hp(7),
        borderRadius: hp(12 / 2),
        backgroundColor: COLORS.greyBack,
        margin: hp(4),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.5),
        // backgroundColor: COLORS.blueBorder,
        
        
    },
    codeView: {
        flexDirection: 'row',
    },
    input: {
        height: wp(10),
        width: hp(8),
        borderBottomWidth: 1,
        margin: wp(2),


    },
    text: {
        textAlign: 'center',
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(3),
    },
    withoutRoundButton: {
        height: hp(11),
        width: hp(11),
        margin: hp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    withoutnumberText: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(2),
        color: COLORS.dashboardGreenButton,
        textAlign: 'center'
    },
})
