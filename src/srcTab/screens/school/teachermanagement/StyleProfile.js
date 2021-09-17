import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%',
        flexDirection: 'row'
    },
    mainPage1: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%',
    },
    left: {
        width: '25%',
        borderRightColor: COLORS.dashBoard,
        borderRightWidth: 1,
        paddingTop: 10,
    },
    middle: {
        width: '50%',
        paddingTop: 25,
        paddingHorizontal: 25,
    },
    right: {
        width: '25%',
        paddingTop: 25,
        paddingRight: 25,
    },
    pupilParent: {
        flexDirection: 'row',
        paddingVertical: 13,
        paddingHorizontal: 15,
    },
    mediabar: {
        width: 28,
        height: 28,
        resizeMode: 'cover',
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
    },
    pupilName: {
        fontSize: 14,
        alignSelf: 'center',
        paddingHorizontal: 7.5,
        paddingRight: 30,
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    bar: {
        marginHorizontal: 15,
        height: 1,
        backgroundColor: COLORS.bottomProfileLightBorder
    },
    bar2: {
        marginHorizontal: 0,
        height: 1,
        backgroundColor: COLORS.bottomProfileLightBorder
    },
    selectedPupilParent: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        width: 145,
        height: 37,
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedMediabar: {
        width: 20,
        height: 20,
        borderRadius: hp(50),
        backgroundColor: COLORS.lightGrayPupil,
    },
    selectedRemove: {
        width: 13,
        height: 13,
        resizeMode: 'contain',
        right: 10,
    },
    groupEdit: {
        width: 15,
        resizeMode: 'contain',
    },
    selectedPupilName: {
        fontSize: 14,
        marginLeft: 7,
        paddingRight: 10,
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGrayIntro,
        width: 100,
    },
    mediabarRight: {
        width: 25,
        height: 25,
        borderRadius: hp(100),
        marginRight: 10,
        backgroundColor: COLORS.lightGrayPupil,
    },
    groupTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    groupParent: {
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: 6,
        justifyContent: 'center',
        marginBottom: 5,
    },
    groupName: {
        fontSize: 14,
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        width: '85%',
    },
    input: {
        borderBottomColor: COLORS.videoLinkBorder,
        borderBottomWidth: 1,
        fontSize: 16,
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGrayIntro,
        paddingBottom: 10,
        marginBottom: 30,
    },
    button: {
        color: COLORS.white,
        fontSize: 12,
        borderRadius: hp(1),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        alignContent: 'center',
    },
    buttonParent: {
        height: 41,
        width: 144,
        marginVertical: 15,
        borderRadius: 6,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: COLORS.dashboardGreenButton,
    },
    label: {
        fontSize: 14, 
        textAlign: 'center',
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
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
        width: '25%',
    },
    dateSmlBlock:{
        width: '25%',
    },
    paragraphText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.introGreyColor,
        flexWrap:'wrap',
        paddingBottom:hp(2), 
    },
    paragraphText1:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.introGreyColor,
        flexWrap:'wrap',
        paddingBottom:hp(2), 
        height: hp(15)
    },
    tickLayout: {
        backgroundColor: COLORS.buttonGreen,
        borderRadius: 10,
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    tickLayoutPArent: {
        backgroundColor: COLORS.buttonGreen,
        borderRadius: 10,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        alignSelf: 'flex-end',
        marginBottom:wp(1)
    },
    managementParaSec:{
        marginRight:hp(20.05),
        marginTop:hp(5),
        paddingLeft:hp(26.04),
    },
    ratingBlock:{
        width:'100%',
        marginTop: hp(2.5),
    },
    achivementBox:{
        width :'100%',
        height: 150,
        alignItems:'center',
        paddingHorizontal: 10,
        flexDirection: 'row'
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
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.82),
        color:COLORS.darkGray,
        paddingBottom:hp(1.5),
        marginBottom:wp(1.2),
        marginLeft: hp(1.95),
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
        height: 200
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
        // width:hp(28.20),
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
        backgroundColor:'purple'
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
        backgroundColor:'#BE8CFF',
        borderRadius: 5,
    },
    orangeMark:{
        width:hp(1.82),
        height:hp(1.82),
        resizeMode: 'contain',
        marginTop:hp(0.3),
        marginRight:hp(1.5),
        borderRadius:5,
        backgroundColor:'orange'
    },
    mngmntgraphImg:{
        width:hp(118.16),
        height:hp(37.36),
        resizeMode: 'contain',
    },
    listBottomSpace:{
        marginBottom:hp(1.5),
    },
    createGrpBlock: {
        width: '100%',
        height: 235,
        backgroundColor: COLORS.backgroundColorCommon,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        borderColor: COLORS.blueBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    createGrpImage: {
        width: 52.91,
        height: 43.57,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    insightBox: {
        backgroundColor: COLORS.greyInsight,
        borderRadius: 10,
        flex: 1,
        height: 150,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    insightLabel: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontBold,
    },
    insightMain: {
        fontSize: 20,
        fontFamily: FONTS.fontBold,
    }

});