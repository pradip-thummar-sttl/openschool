import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
    },
    mainPage1: {
        flexDirection: 'row',
        flex: 1,
        marginTop: hp(-6)
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    backOpacity:{
        position: 'absolute',
        top: 0,
        left:0,
        height: hp(10.41),
    },
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
        height: hp(10.41),
        paddingLeft: hp(1.56),
        paddingTop: 4,
        justifyContent: 'center',
        marginBottom: 15,
    },
    labledataTitle: {
        fontSize: hp(1.82),
        marginBottom: hp(0.3),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
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
        fontSize:hp(1.82),
        color:COLORS.darkGray,
    },
    backgroundTable:{
        backgroundColor:COLORS.white,
    },
    days: {
        // marginTop: 45,
    },
    attachmentTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    attachmentIcon: {
        width: hp(1.03),
        height: hp(1.95),
        resizeMode: 'contain',
        marginRight: 13,
    },
});