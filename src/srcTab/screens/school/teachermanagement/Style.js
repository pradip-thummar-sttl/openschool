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
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(1.6),
        paddingRight: hp(1.6),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(0.8),
        marginBottom: hp(1.04),
    },
    pupilTableHeadingMain: {
        width: hp(15.90),
    },
    tabpupil2: {
        width: hp(15.97),
    },
    tabpupil22: {
        width: hp(13.97),
    },
    tabpupil3: {
        width: hp(20.18),
        marginRight: hp(9.50),
    },
    tabpupil4: {
        width: hp(18.22),
    },
    pupilTableHeadingMainTitle: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    pupilTableHeadingMainsubTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginRight: hp(2.60),
    },
    pupilTableHeadingMainsubTitlestar: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        textTransform: 'uppercase',
        lineHeight: hp(2.08),
        marginRight: hp(0.91),
    },
    pupilTableHeadingsubMain: {
        flexDirection: 'row',
    },
    pupilhrCustomMargin: {
        marginTop: hp(1.95),
        marginBottom: hp(1.30),
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: hp(1.5),
        paddingTop: hp(2),
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
    },
    noDataImage: {
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 50
    },
    nodataTitle: {
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
        fontSize: 18,
        textAlign : 'center',
        marginBottom: 10,
    },
    nodataContent: {
        alignSelf: 'center',
        fontSize: 18,
        textAlign : 'center'
    },
    pupilTable: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft:hp(4.5),
        marginBottom: 10,
        // backgroundColor: COLORS.white
    },
    pupilData: {
        height:wp(6),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:10,
        backgroundColor:'white',
        marginBottom:wp(1),
        paddingHorizontal:hp(2)
        //  marginLeft:hp(4.5)
    },
    pupilProfile: {
        width: hp(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupColumnmain: {
        width: hp(17.97),
        backgroundColor:'blue'
        
    },
    groupColumn: {
        width: hp(10.59),
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:hp(-2)
    },
    groupColumn1: {
        width: hp(10.59),
        alignItems: 'center',
    },
    groupColumn11: {
        width: hp(10.59),
        alignItems: 'flex-start',
        marginLeft:hp(5)
    },
    pupilgroupName: {
        textAlign: 'center',
    },
    perfomanceColumn: {
        flexDirection: 'row',
        width: hp(20.18),
        marginLeft:hp(4),
        marginRight: hp(9.50),
    },
    pupilImage: {
        width: hp(3.7),
        height: hp(3.7),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1),
    },
    pupilName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    pupilgroupName1: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginLeft:22,
        width:100,
        textAlign:'center'
    },
    pupilgroupName10: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        width:100,
        textAlign:'center'
    },
    rewardColumn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pupilDetaillinkIcon: {
        width: hp(1),
        resizeMode: 'contain',
        right: 20,
        position: 'absolute',
    },
});