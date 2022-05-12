import { Dimensions, Platform, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        flex:1,
        height: wp(67),
        padding: hp(2),
        flexDirection: 'row',
        width : '100%'
    },
    leftView: {
        paddingHorizontal: hp(1.5)
    },
    rightView: {
        paddingHorizontal: hp(1.5),
        paddingVertical: hp(1.5)
    },
    starView: {
        width: '100%',
        height: wp(20),
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.borderGrp
    },
    yellowView: {
        width: '100%',
        height: '50%',
        backgroundColor: 'orange',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subText: {
        fontSize: hp(2.2),
        fontFamily: FONTS.fontRegular
    },
    headText: {
        fontSize: hp(3.5),
        fontFamily: FONTS.fontBold
    },
    rewardStarMark: {
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: hp(3),
        flexDirection: 'row',
        paddingTop: hp(1.8),
        paddingBottom: hp(1.8),
        // borderBottomWidth:1,
        // borderBottomColor:COLORS.bottomProfileLightBorder,
        // borderTopWidth:1,
        // borderTopColor:COLORS.bottomProfileLightBorder,
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
        fontSize: hp(1.60),
        top: hp(2.5),
        position: 'absolute',
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
        marginTop: 10
    },

    // Right View
    borderView: {
        width:"100%",
        height: wp(50),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.borderGrp,
        alignItems: 'center'
    },
    tabView: {
        flexDirection: 'row'
    },
    tabBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: hp(1),
        marginVertical: hp(2)
    },
    tabText: {
        padding: hp(2.5),
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.lightGray
    },
    itemBtn: {
        width: wp(15),
        height: wp(15),
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerStar: { alignItems: 'center', justifyContent: 'center', }
})