import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        position: 'relative',
    },
    bottomCallerbarMain: {
        position: 'absolute',
        zIndex: 9999,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: COLORS.controlBack,
        height: hp(9.375),
    },
    recordingTimerIcon: {
        width: hp(1.30),
        height: hp(1.30),
        resizeMode: 'contain',
    },
    callControlsIcon: {
        width: hp(7.29),
        height: hp(7.29),
        resizeMode: 'contain',
    },
    recordingTimer: {
        flexDirection: 'row',
        paddingLeft: hp(3.90),
        alignItems: 'center',
    },
    timer: {
        fontSize: hp(1.82),
        color: COLORS.white,
        fontFamily: FONTS.fontSemiBold,
        marginLeft: hp(1.30),
    },
    callControlsmain: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        left: '50%',
        bottom: hp(1.6),
        transform: [{ translateX: '-100%' }],
    },
    userVideoMain: {
        right: hp(9.5),
        bottom: hp(7.5),
        width: hp(14.71),
        height: hp(10.15),
        resizeMode: 'contain',
    },
});