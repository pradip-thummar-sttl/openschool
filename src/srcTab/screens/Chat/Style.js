import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    lessonPlanTab: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingTop: hp(1.90),
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp,
        backgroundColor: COLORS.white
    },
    tabs: {
        // paddingRight: hp(3.90),
        paddingLeft: hp(3.90)
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.99),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },

    field: {
        position: 'relative',
        width: hp(40),
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: hp(4.6),
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        // width:hp(70),
    },
    userIcon: {
        position: 'absolute',
        top: hp(1.1),
        width: hp(1.9),
        resizeMode: 'contain',
        left: hp(1.43),
    },

    //
    views: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: COLORS.borderGrp

    },
    leftView: {
        marginLeft: hp(2),
        marginTop: hp(2),
        width: hp(40),
        height: wp(60),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        backgroundColor: COLORS.white
    },
    firstView: {
        height: wp(8),
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: COLORS.greyBack,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconParent: {
        width: hp(6.5),
        height: wp(4.5),
        resizeMode: 'stretch'
    },
    availabeText: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.greyplaceholder,
        marginLeft: hp(2)
    },
    secondView: {
        paddingHorizontal: hp(2.5),
        paddingTop: wp(2)
    },
    headText: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.lightGray,
        fontSize: hp(2.2)
    },
    subText: {
        fontFamily: FONTS.fontRegular,
        color: COLORS.black,
        fontSize: hp(2.2)
    },
    rightView: {
        // backgroundColor:'red',
        marginLeft: hp(2),
        width: hp(76),
        height: '100%'
    },
    mesagesView: {
        width: '105%',
        height: '100%',
        paddingBottom: 120

    },
    textView: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        position: 'absolute',
        bottom: 20,

    },
    messageCell: {
        flexDirection: 'row',
        paddingVertical: wp(1)

    },
    messageSubCell: {
        marginLeft: wp(1)
    },
    roundImage: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(5 / 2),
        backgroundColor: COLORS.lightGray
    },
    userNameText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.2),
    },
    messageText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(2.2),
        marginTop: wp(0.2)
    },
    input: {
        width: '85%',
        height: '100%',
        fontSize: hp(2.2),
        fontFamily: FONTS.fontSemiBold,
        marginHorizontal: wp(1.5),
    },
    buttonView: {
        position: 'absolute',
        right: hp(2),
        bottom: wp(2),
        flexDirection: 'row'
    },
    btn: {
        // backgroundColor:'yellow',
        width: hp(3),
        height: hp(3),
        marginHorizontal: wp(1.5)
    },
    timeText: {
        color: COLORS.menuLightFonts,
        marginTop: wp(1),
        fontSize: hp(2)
    }
})