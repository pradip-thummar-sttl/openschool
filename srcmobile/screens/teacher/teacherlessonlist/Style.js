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
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
        height: hp(65),
    },
    pupilDetaillinkIcon: {
        width: hp(1),
        resizeMode: 'contain',
    },
    item: {
        flexDirection: 'column',
        paddingLeft: hp(1.95),
        paddingTop: hp(2.60),
        paddingRight: hp(1.95),
        paddingBottom: hp(2.60),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: COLORS.commonBorderColor,
        borderWidth: 1,
        borderRadius:hp(1.5),
        marginTop:hp(1.5),
        width:'100%',
        flex: 1,
    },
    border: {
        height: hp(5.85),
        backgroundColor: COLORS.borderLesoon,
        padding: hp(0.3),
        borderRadius: hp(5),
        marginRight: hp(1.95),        
    },
    classSubject: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom:hp(1.5),
        paddingBottom:hp(1.5),
        borderBottomColor:COLORS.dashBoard,
        borderBottomWidth:1,
    },
    subjectName: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        width:wp(45),
    },
    subjectMain: {
        right: hp(0.5),
    },
    subject: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    subjecRow: {
        marginLeft: hp(0),
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupName: {
        borderWidth: hp(0.26),
        borderColor: COLORS.borderGrp,
        borderRadius: hp(0.7),
        color: COLORS.grpColor,
        fontSize: hp(1.4),
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center',
        width: hp(9),
        paddingTop: hp(0.1),
        paddingBottom: hp(0.1),
        marginBottom: hp(0.5),
    },
    timing: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    padLeftRight: {
        paddingLeft:hp(1.5),
        paddingRight:hp(1.5),
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
    },
    tickIcon:{
        width: hp(1.40),
        resizeMode: 'contain',
        marginRight:hp(1),
    },
    checkMarkedText:{
        flexDirection:'row',
    },
    tickText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.60),
        color:COLORS.lightGray,
    },
    topListingArrow:{
        top:hp(3.2),
    }
});