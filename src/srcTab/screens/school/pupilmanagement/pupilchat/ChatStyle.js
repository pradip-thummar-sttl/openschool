import { Dimensions, Platform, StyleSheet } from 'react-native'
import COLORS from '../../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../../utils/Fonts';
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
        paddingLeft: wp(3.90)
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.50),
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
        backgroundColor: COLORS.white,
    },
    leftView: {
        marginLeft: hp(2),
        marginTop: hp(2),
        width: hp(40),
        height: wp(55),
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
        paddingHorizontal: hp(2),
        marginTop: hp(2),
        height: hp(80),
        width: '100%'
    },
    mesagesView: {
        width: '100%',
        height: '100%',
    },
    textView: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        backgroundColor: COLORS.greyBack,
        position:'absolute',
        bottom: 10
        // bottom:18,
    },
    messageCell: {
        flexDirection: 'row',
        paddingVertical: wp(1)
    },
    messageSubCell: {
        // marginLeft: wp(1)
        paddingHorizontal : hp(5)
    },
    roundImage: {
        width: hp(4),
        height: hp(4),
        borderRadius: hp(4 / 2),
        backgroundColor: COLORS.lightGray
    },
    userNameText: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.5),
    },
    messageText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.4),
        marginTop: wp(0.2)
    },
    input: {
        width: '90%',
        // height: '100%',
        fontSize:hp(1.8),
        fontFamily:FONTS.fontSemiBold,
        marginHorizontal:wp(1.5),
        // marginVertical:hp(1), 


    },
    buttonView:{
        position:'absolute',
        right:hp(1),
        flex : 1,
        // bottom:wp(2),
        alignItems: 'center',
        height: '100%',
        justifyContent : 'center',
    },
    btn:{
        // backgroundColor:'yellow',
        width:hp(2.5),
        height:hp(2.5),
        marginHorizontal:wp(2.5)
    },
    timeText:{
        color:COLORS.menuLightFonts,
        marginTop:wp(1),
        fontSize:hp(1.2)
    },
    userIconPupil: {
        width: hp(2.5),
        height: hp(2.5),
        resizeMode: 'contain',
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    checkBoxLabelNone: {
        flexDirection: 'row',
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',

    },
    teachers: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.6),
        marginTop: wp(0.2),
        padding: 10
    },
})