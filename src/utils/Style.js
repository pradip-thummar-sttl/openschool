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
        borderRadius: hp('1.0%'),
        lineHeight:hp('1.9%'),
        height: hp('8%'),
        paddingLeft: hp('7.0%'),
        paddingRight: hp('2.0%'),
        fontWeight: 'bold',
    },
    commonInputPassword: {
        color:'#03014C',
        fontSize:hp('1.8%'),
        borderWidth: 2,
        borderColor: '#B2B2C9',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight:hp('1.9%'),
        height: hp('7.0%'),
        paddingLeft: hp('7.0%'),
        paddingRight: hp('6.0%'),
        fontWeight: 'bold',
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.blueButton,
        color: COLORS.white,
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        fontSize: hp('2.2%'),
        height: hp('7.0%'),
        lineHeight: hp('7.0%'),
        fontWeight: 'bold',
    },
    commonFonts: {
        color: COLORS.themeBlue,
        fontSize: hp('2.15%'),
        fontWeight: '500',
        marginBottom: hp('0.4%'),
    },
    commonFontsPuple: {
        color: COLORS.thmePurple,
        fontSize: hp('2.15%'),
        fontWeight: '500',
        lineHeight: hp('2.6%'),
    },
});