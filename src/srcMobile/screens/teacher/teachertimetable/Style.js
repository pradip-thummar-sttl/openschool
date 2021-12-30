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
        position: 'absolute',
        top: 0,
        left:0,
        height: 66,
    },
    lable: {
        width: hp(7),
        height: 66,
        fontFamily:FONTS.fontRegular,
        color:COLORS.lightGray,
        marginBottom: 15,       //hp ma na mukta koi
        paddingTop: 40,
    },
    dayRightmain: {
        height: 66,
        paddingLeft: hp(1.48),
        paddingTop: hp(1.48),
        marginBottom: 15,
    },
    labledataTitle: {
        fontSize: hp(1.7),
        marginBottom: Platform.OS == 'android' ? hp(0) : hp(0.2),
        marginTop: Platform.OS == 'android' ? hp(0) : hp(-0.4),
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
        marginLeft: hp(1.95),
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
        width:hp(1.6),
        resizeMode:'contain',
        marginRight:hp(0.6),
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

    uploadVideoStl:{ width: '100%', height: '100%', 
    position: 'absolute', justifyContent: 'center', alignItems:'center' },
    uploadVideoInnerStl:{width: '80%',borderRadius: hp(1),backgroundColor:COLORS.white, padding:10, borderColor:COLORS.darkGray, borderWidth:hp(0.1)},
    uploadVideoTextStl:{ textAlign: 'center', color: COLORS.darkGray, fontSize: 16, fontWeight: 'bold', marginBottom:hp(2) },
});