import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.white,
    },
    left: {
        flex: 0.26,
        borderRightColor: COLORS.dashBoard,
        borderRightWidth: 1,
        paddingTop: 20
    },
    middle: {
        flex: 0.48,
        flexDirection: 'column',
        paddingTop: 20,
    },
    right: {
        flex: 0.26,
        paddingTop: 20,
    },
    pupilParent: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    pupilName: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
    bar: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 1,
        backgroundColor: COLORS.dashBoard
    },
    selectedPupilParent: {
        flexDirection: 'row',
        padding: 10,
        width: '90%',
        borderWidth: 1,
        borderColor: COLORS.dashBoard,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center'
    },
    selectedMediabar: {
        width: 30,
        height: 30,
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    selectedRemove: {
        width: 25,
        height: 25,
        borderRadius: hp(50),
    },
    groupEdit: {
        width: 20,
        borderRadius: hp(50),
        resizeMode: 'contain',
    },
    selectedPupilName: {
        fontSize: 20,
        marginLeft: 10,
        flex: 1,
        paddingVertical: 2,
    },
    mediabarRight: {
        width: 40,
        height: 40,
        borderRadius: hp(50),
        marginLeft: 15,
        backgroundColor: COLORS.lightGrayPupil,
    },
    groupTitle: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    groupParent: {
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.dashBoard,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center'
    },
    groupName: {
        fontSize: 20,
        flex: 1,
    },
    input: {
        borderBottomColor: COLORS.dashBoard,
        borderBottomWidth: 1,
        fontSize: 30,
        paddingBottom: 10,
        marginBottom: 50,
        marginHorizontal: 30
    },
    button: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '800',
        borderRadius: hp(1),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignContent: 'center',
    },
    buttonParent: {
        height: 60,
        width: 200,
        marginVertical: 20,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: COLORS.dashboardGreenButton,
    },
    label: {
        height: 50, 
        fontSize: 25, 
        padding: 10, 
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
    },
    // Mamagement UI starts
    managementBlankImgWrap:{
        textAlign:'center',
        alignItems:'center',
        marginTop:hp(22.13),
        marginBottom:hp(18),
        flex:1,
    },
    blankPageImage:{
        width:hp(35.03),
        height:hp(30.77),
        resizeMode: 'contain',
    },
    blankManageTextBold:{
        fontSize:hp(2.86),
        fontFamily:FONTS.fontBold,
        textAlign:'center',
    },
    blankManageTextNormal:{
        fontSize:hp(1.82),
        fontFamily:FONTS.fontRegular,
        textAlign:'center',
    },
    managementDetail:{
       // flex:1,
    },
    managementBlockTop:{
        flexDirection:'row',
        height:hp(12.5),
    },
    managementopImage:{
        width:'100%',
        height:hp(14.06),
        resizeMode: 'contain',
        position:'relative',
    },
    thumbTopUser:{
        width: hp(12.5),
        height:hp(12.5),
        borderRadius: 96,
        borderColor:COLORS.white,
        borderWidth: 3,
        backgroundColor:'#ECEDF0',
        position:'absolute',
        left:hp(5),
        bottom:hp(-4),
    },
    topBannerBtn:{
        position:'absolute',
        right:hp(5),
        top:hp(2),
        paddingLeft:hp(3),
        paddingRight:hp(3),
        fontFamily:FONTS.fontBold,
        color:COLORS.white,
        fontSize:hp(1.56),
    },
    managementNameSec:{
        flexDirection:'row',
        paddingLeft:hp(26.04),
        paddingTop:hp(8.64),
    },
    userLabel:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.lightGray,
    },
    userName:{
        fontFamily:FONTS.fontBold,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
    },
    nameSmlBlock:{
        marginRight:hp(13),
    },
    dateSmlBlock:{
        marginRight:hp(13),
    },
    paragraphText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.introGreyColor,
        flexWrap:'wrap',
        paddingBottom:hp(2),
    },
    managementParaSec:{
        marginRight:hp(20.05),
        marginTop:hp(5),
        paddingLeft:hp(26.04),
    },
    ratingBlock:{
        width:hp(43.35),
        marginLeft:hp(1.95),
        marginTop: hp(2.5),
        marginRight:hp(3.9),
    },
    achivementBox:{
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        width :hp(43.48),
        alignItems:'center',
        backgroundColor:COLORS.white,
        borderRadius:hp(1.8),
        elevation: 1,
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    starSelectedText:{
        fontFamily: FONTS.fontBold,
        color:COLORS.white,
        fontSize: hp(1.82),
        lineHeight: hp(5.1),
    },
    starSelected:{
        width:hp(4.94),
        height:hp(4.68),
        resizeMode: 'contain',
        alignItems:'center',
        alignSelf: 'center',
        marginBottom:hp(1.5),
    },
    rewardStarMark:{
        justifyContent: 'space-around',
        width:'100%',
        flexDirection: 'row',
        paddingTop:hp(3.05),
        paddingBottom:hp(3.05),
    },
    centerText:{
        alignItems:'center',
    },
    starText:{
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
    },
    ratingTitle:{
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color:COLORS.menuLightFonts,
        paddingBottom:hp(1.5),
    },
    separater:{
        borderLeftWidth:1,
        borderLeftColor:COLORS.dashboardBorder,
        borderRightWidth:1,
        borderRightColor:COLORS.dashboardBorder,
        width:hp(14.32),
    },
    centerStar:{
        alignItems:'center',
    },
    whiteBg: {
        backgroundColor: COLORS.white,
        paddingBottom: hp(2),
        paddingTop: hp(0),
    },
    annotationText:{
        width:hp(72.91),
        marginTop: hp(2.5),
    },
    rateAnnotationBlock:{
        flexDirection:'row',
    },
    annotationBox:{
        borderWidth:1,
        borderColor:COLORS.dashboardBorder,
        borderRadius:hp(1.8),
        padding:hp(1.95),
    },
    anoteTitle:{
        paddingLeft:hp(1.95),
        paddingBottom:hp(1.80),
    },
    graphBlock:{
        flexDirection:'row',
        margin:hp(3),
    },
    graphTitle:{
        fontFamily: FONTS.fontBold,
        color:COLORS.darkGray,
        fontSize: hp(2.08),
        marginTop:hp(5),
        marginLeft:hp(2.3),
    },
    chartBlock:{
        width:hp(28.20),
        alignItems:'flex-start',
    },
    mngmntchartImg:{
        width:hp(25.20),
        height:hp(25.20),
        resizeMode: 'contain',
    },
    generalRow:{
        flexDirection:'row',
    },
    purpleMark:{
        width:10,
        height:10,
        borderRadius:hp(1.8),
    },
    labelMark:{
        fontFamily: FONTS.fontRegular,
        color:COLORS.lightGray,
        fontSize: hp(1.82), 
    },
    normalText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.introGreyColor,
    },
    graphChartText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.introGreyColor,
        marginTop:hp(7),
        marginBottom:hp(4),
    },
    graphBox:{
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        backgroundColor:COLORS.white,
        borderRadius:hp(1.8),
        elevation: 1,        
        shadowColor: COLORS.lightGrayPupil,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        width:'100%',
        padding:hp(3),
    },
    purpleMark:{
        width:hp(1.82),
        height:hp(1.82),
        resizeMode: 'contain',
        marginTop:hp(0.3),
        marginRight:hp(1.5),
    },
    orangeMark:{
        width:hp(1.82),
        height:hp(1.82),
        resizeMode: 'contain',
        marginTop:hp(0.3),
        marginRight:hp(1.5),
    },
    mngmntgraphImg:{
        width:hp(118.16),
        height:hp(37.36),
        resizeMode: 'contain',
    },
    listBottomSpace:{
        marginBottom:hp(1.5),
    }
});