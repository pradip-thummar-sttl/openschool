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
    mainPage1: {
        flexDirection: 'row',
        flex: 1,
        marginTop: hp(-7.35)
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    days: {
        flexDirection: 'column'
    },
    // day: {
    //     width: 200,
    //     height: 100
    // },
    lable: {
        fontFamily:FONTS.fontRegular,
        color:COLORS.lightGray,
        fontSize: hp(1.82),
        // marginBottom: 20,
        //DP
        marginBottom: 15,
        height: hp(10.41),
        paddingTop: hp(8)
    },
    dayRightmain: {
        width: hp(16),
        height: hp(8.59),
        paddingLeft: hp(1.56),
        paddingTop: hp(1.7),
    },
    labledataTitle: {
        fontSize: hp(1.82),
        marginBottom: hp(0.3),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    dayLeft: {
        width: hp(10.41),
        height: hp(10.41),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginLeft: 35,
    },
    lableDay: {
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
    },
    labelTime: {
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
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
        overflow: 'hidden',
        height: hp(65),
        padding: hp(5),
        marginTop: hp(4),
    },
    backOpacity:{
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left:0,
        width: hp(16),
        height: hp(8.59),
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
        fontSize:hp(1.82),
        color:COLORS.darkGray,
        // top:hp(5.5),
    },
    spaceTop:{
        // marginTop:hp(3.25),
    },
    backgroundTable:{
        backgroundColor:COLORS.white,
        flex: 1,
        marginTop: 35,
    },
});