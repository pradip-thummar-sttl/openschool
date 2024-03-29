import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%',
        flexDirection: 'row'
    },
    whiteBg: {
        backgroundColor: COLORS.white,
        paddingBottom: hp(2),
        paddingTop: hp(0),
    },
    managementBlankImgWrap: {
        textAlign: 'center',
        alignItems: 'center',
        padding: 20,
        marginVertical: 30
    },
    blankPageImage: {
        height: 150,
        resizeMode: 'contain',
    },
    blankManageTextBold: {
        fontSize: 16,
        fontFamily: FONTS.fontBold,
        textAlign: 'center',
        marginTop: 50,
        lineHeight:hp(3)
    },
    nodataContent: {
        alignSelf: 'center',
        textAlign : 'center',
         lineHeight:hp(3)
    },
});