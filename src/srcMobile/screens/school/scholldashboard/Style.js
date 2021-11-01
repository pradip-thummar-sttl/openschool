import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        // flexDirection: 'row',
        flex: 1,
    },
    padLeftRight: {
        // flex: 1,
        width:'100%',
    },
    viewRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.purpleDark,
        height: hp(6.5),
        borderRadius: hp(1),
        marginHorizontal:wp(3.20),
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:wp(2.60)
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        marginTop: hp(1.30),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        marginHorizontal:wp(3.20)
    },
    iconView:{
        flexDirection:'row',
        marginLeft:wp(1),
    },
    moreDashboard: {
        width: hp(0.65),
        height: hp(2.60),
        resizeMode: 'contain',
        right: 5,
    },
    leftTabbing: {
        width: '100%',
        borderRightWidth:1,
        borderColor: COLORS.commonBorderColor,
    },
    ScrollViewFlatlist:{
        flex: 1
    },
    myDay: {
        backgroundColor: COLORS.orage,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        flexDirection: 'row',
        borderRadius: hp(1),
        justifyContent: 'space-between',
        height: hp(8.5),
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayIcon: {
        width: hp(4),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    dayTitle: {
        color: COLORS.white,
        fontSize: hp(1.97),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(1.30),
        alignSelf: 'center',
    },
    //
    pupilProfile: {
        width: Platform.OS == 'android' ? hp(39.5) : hp(26),
        flexDirection:'row',
    },
    groupColumnmain: {
        width: hp(17.97),
    },
    groupColumn: {
        width: hp(5.59),
        alignItems: 'center',
    },
    pupilgroupName: {
        textAlign: 'center',
    },
    pupilData: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:hp(2),
        justifyContent: 'space-between',
        paddingTop:hp(2),
        width: '90%',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
        alignSelf:'center',
    },
    rowProfile: {
        flexDirection: 'row',
    },
    pupilImage: {
        width: hp(3.64),
        height: hp(3.64),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.5),
        // top: hp(1.1),
        alignSelf:'center',
    },
    pupilName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
})