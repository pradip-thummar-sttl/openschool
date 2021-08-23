import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        flex:1,
        // height: hp(67),
        // padding: hp(2),
    },
    leftView: {
        paddingHorizontal: hp(1.5)
    },
    rightView: {
        paddingHorizontal: hp(1.5)
    },
    starView: {
        width: hp(50),
        height: wp(20),
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.borderGrp
    },
    yellowView: {
        width: '100%',
        height: hp(20),
        paddingLeft:wp(2),
        backgroundColor: 'orange',
    },
    subText: {
        fontSize: hp(2.2),
        fontFamily: FONTS.fontRegular,
        marginTop:hp(3)
    },
    headText: {
        fontSize: hp(3.5),
        fontFamily: FONTS.fontBold
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '90%',
        height:hp(12),
        marginBottom: hp(3),
        flexDirection: 'row',
        paddingTop: hp(1.8),
        paddingBottom: hp(1.8),
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:hp(-6),
         borderRadius:10
    },
    starSelected: {
        width: hp(4.94),
        height: hp(4.68),
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: hp(1.30),
    },
    starSelectedText: {
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: hp(1.82),
        lineHeight: hp(5.1),
    },
    centerStar: {
        borderLeftWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        borderRightWidth: 1,
        width: hp(14.32),
        alignItems: 'center',
    },
    starText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },

    // Right View
    borderView: {
        width: "100%",
        height: hp(60),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        alignItems: 'center',
        justifyContent:'center'
    },
    tabView: {
        flexDirection: 'row',
    },
    tabBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: wp(2),
        marginHorizontal:wp(3),
        marginVertical: hp(1.5),
    },
    tabText: {
        fontSize: hp(1.5),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.lightGray
    },
    itemBtn:{
        width:hp(12),
        height:hp(12),
        margin:10,
        borderRadius:10,
        backgroundColor:'orange'  
      }
})