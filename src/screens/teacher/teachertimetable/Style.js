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
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    backOpacity:{
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left:0,
        width: hp(16),
        height: hp(8.59),
    },
    lable: {
        width: hp(16),
        height: hp(8.59),
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
        width: hp(16),
        height: hp(8.59),
        alignItems: 'center',
        paddingLeft: hp(1),
        paddingRight: hp(1),
        paddingTop: hp(1),
    },
    lableDay: {
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
        textAlign: 'center',
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
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.lightGray,
    },
    spaceTop:{
        marginTop:hp(3.25),
    },
    backgroundTable:{
        backgroundColor:COLORS.backgroundColorCommon,
    },
});