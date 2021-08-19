import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');
import FONTS from '../../../../utils/Fonts';
import COLORS from '../../../../utils/Colors';
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
        fontSize: hp(2.46),
        marginBottom: hp(6),
        color: COLORS.darkGray,
    },
    numberView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        marginTop: hp(10),
    },
    roundButtonMain: {
        width: '28%',
        alignItems: 'center',
    },
    roundButton: {
        height: hp(8.86),
        width: hp(8.86),
        borderRadius: hp(100),
        backgroundColor: COLORS.greyBack,
        margin: hp(1.72),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.21),
        color: COLORS.darkGray,
    },
    codeView: {
        flexDirection: 'row',
    },
    input: {
        height: hp(4.56),
        width: hp(5.97),
        borderBottomWidth: 1,
        borderColor: COLORS.darkGray,
        marginHorizontal: hp(2.15),
    },
    text: {
        textAlign: 'center',
        fontFamily: FONTS.fontBold,
        fontSize: hp(2.46),
        color: COLORS.darkGray,
    },
    withoutRoundButton: {
        height: hp(8.86),
        width: hp(8.86),
        marginHorizontal: hp(1.72),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center',
    },
    withoutnumberText: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.47),
        color: COLORS.dashboardGreenButton,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    backSpaceArrow: {
        width: hp(3.38),
        height: hp(2.58),
        resizeMode: 'contain',
    },
})