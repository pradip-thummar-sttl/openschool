import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    backOpacity:{
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left:0,
        height: 66,
    },
    lable: {
        width: hp(7),
        height: 50,
        fontFamily:FONTS.fontRegular,
        color:COLORS.lightGray,
    },
    dayRightmain: {
        height: 66,
        paddingLeft: hp(1.48),
        paddingTop: hp(1.48),
        marginBottom: 15,
    },
    labledataTitle: {
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.8),
        marginBottom: Platform.OS == 'android' ? hp(0) : hp(0.5),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
    },
    dayLeft: {
        width: hp(7),
        alignItems: 'center',
        paddingLeft: hp(1),
        paddingRight: hp(1),
        paddingTop: hp(1),
        marginBottom: 15,
    },
    lableDay: {
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(1.6),
        color:COLORS.darkGray,
    },
    labelTime: {
        fontFamily:FONTS.fontRegular,
        fontSize:Platform.OS == 'android' ? hp(1.4) : hp(1.6),
        color:COLORS.darkGray,
        marginTop: Platform.OS == 'android' ? hp(0.4) : hp(0),
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        padding: hp(5),
        marginTop: hp(4),
    },
    timeIcon:{
        width:hp(1.8),
        resizeMode:'contain',
        marginRight:hp(1),
    },
    row:{
        flexDirection:'row',
        alignItems: 'center',
    },
    timeLabel:{
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(1.6),
        color:COLORS.darkGray,
        // top:hp(5.5),
    },
    spaceTop:{
        // marginTop:hp(3.25),
    },
    backgroundTable:{
        backgroundColor:COLORS.white,
        flex: 1, 
    },
});