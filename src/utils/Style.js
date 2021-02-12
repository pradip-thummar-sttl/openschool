import { Dimensions, StyleSheet } from 'react-native'
import COLORS from './Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    viewBox: {
        width: width,
        alignItems: 'flex-start',
        height: height,
    },
    commonInput: {
        color:'#03014C',
        fontSize: hp('1.9%'),
        borderWidth: 2,
        borderColor: '#B2B2C9',
        overflow: 'hidden',
        borderRadius: 10,
        lineHeight:hp('1.9%'),
        height: hp('8%'),
        paddingLeft: 70,
        paddingRight: 20,
        fontWeight: 'bold',
    },
    commonInputPassword: {
        color:'#03014C',
        fontSize:hp('1.8%'),
        borderWidth: 2,
        borderColor: '#B2B2C9',
        overflow: 'hidden',
        borderRadius: 10,
        lineHeight:hp('1.9%'),
        height: 70,
        paddingLeft: 70,
        paddingRight: 60,
        fontWeight: 'bold',
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.blueButton,
        color: COLORS.white,
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        fontSize: 22,
        height: 70,
        lineHeight: 70,
        fontWeight: 'bold',
    },
    commonFonts: {
        color: COLORS.themeBlue,
        fontSize: hp('2.15%'),
        fontWeight: '500',
        marginBottom: 4,
    },
    commonFontsPuple: {
        color: COLORS.thmePurple,
        fontSize: hp('2.15%'),
        fontWeight: '500',
        lineHeight: 26,
    },
});