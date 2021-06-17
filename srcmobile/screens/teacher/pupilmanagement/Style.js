import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        height: '100%',
        paddingHorizontal: hp(2),
        paddingVertical: hp(2),
        backgroundColor: COLORS.backgroundColorCommon,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: hp(1.5),
        paddingTop: hp(2),
        backgroundColor: COLORS.white,
        borderRadius: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
    },
    pupilData: {        
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
        paddingBottom: hp(1),
        marginBottom: hp(1),
    },
    pupilProfile: {
        width: Platform.OS == 'android' ? hp(39.5) : hp(26),
    },
    rowProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pupilImage: {
        width: hp(3.7),
        height: hp(3.7),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.5),
        top: hp(1.1),
    },
    pupilName: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    pupilgroupName: {
        fontSize: hp(1.6),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    groupPupil: {
        left: hp(5.2),
        bottom: hp(0.6),
    },
    groupName: {
        color: COLORS.darkGray,
        fontSize: hp(1.6),
        fontFamily: FONTS.fontRegular,
        textAlignVertical: 'center',
    },
    rewardColumn: {
        flexDirection: 'row',
        right: hp(1),
        alignItems: 'center',
    },
    rewardStar: {
        width: hp(2.60),
        marginRight: hp(1),
    },
    rewardStartIcon: {
        width: hp(2),
        resizeMode: 'contain',
        alignSelf:'center',
    },
    pupilDetailLink: {
        width: hp(1.95),
        alignItems: 'flex-end',
        right: hp(1),
    },
    MainProfile: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    pupilDetaillinkIcon: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    profileImageArea: {
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: hp(13.8),
        resizeMode: 'contain',
    },
    profileOuter: {
        borderRadius: hp(100),
        borderWidth: hp(1.3),
        borderColor: COLORS.white,
        position: 'absolute',
        top: hp(7.38),
    },
    profileImage: {
        width: hp(13),
        height: hp(13),
        borderRadius: hp(100),
        resizeMode: 'contain',
        backgroundColor: COLORS.lightGrayPupil,
    },
    mainDetails: {
        marginTop: hp(8.75),
        paddingHorizontal: hp(2),
    },
    mainDetailsForm: {
        marginTop: hp(10),
        paddingHorizontal: hp(2),
    },
    fieldDetails: {
        marginBottom: hp(4.3),
    },
    fieldDetailsForm: {
        marginBottom: hp(3),
        position: 'relative',
    },
    label: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: 3,
    },
    labelForm: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: hp(0.8),
        paddingLeft: hp(1.5),
    },
    data: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    scrollViewCommon: {
        marginBottom: hp(38),
    },
    scrollViewCommonPupilEdit: {
        marginBottom: hp(15),
    },
    rewardSection: {
        paddingHorizontal: hp(2),
        marginTop: hp(2.5),
    },
    rewardStarMark:{
        justifyContent: 'space-around',
        width:'100%',
        flexDirection: 'row',
        paddingVertical:hp(2.5),
        marginTop: hp(1),
        borderWidth:1,
        borderColor:COLORS.videoLinkBorder,
        borderRadius: hp(1),
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.1,
        backgroundColor: COLORS.white,
        shadowRadius: hp(1),
    },
    centerText:{
        alignItems:'center',
    },
    starSelected:{
        width:hp(4.94),
        height:hp(4.68),
        resizeMode: 'contain',
        alignItems:'center',
        alignSelf: 'center',
        marginBottom: hp(1.30),
    },
    starSelectedText:{
        fontFamily: FONTS.fontBold,
        color:COLORS.white,
        fontSize: Platform.OS == 'android' ? hp(1.3) : hp(1.82),
        lineHeight: Platform.OS == 'android' ? hp(4.5) : hp(5.1),
    },
    centerStar:{
        borderLeftWidth:1,
        borderColor: COLORS.videoLinkBorder,
        borderRightWidth:1,
        width: hp(14.32),
        marginHorizontal: hp(-2.5),
        alignItems: 'center',
    },
    starText:{
        fontFamily: FONTS.fontRegular,
        fontSize: Platform.OS == 'android' ? hp(1.2) : hp(1.6),
        color: COLORS.darkGray,
    },
    commonInputTextareaBoldGrey: {
        width: '100%',
        height: wp(41.25),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1.3),
        backgroundColor: COLORS.backgroundColorCommon,
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        textAlignVertical: 'top',
        fontFamily: Platform.OS == 'android' ? FONTS.fontRegular : FONTS.fontSemiBold,
    },
    pupilPerfomance: {
        marginTop: hp(2.5),
        paddingLeft: hp(2),
        marginBottom: hp(3)
    },
    pupilPerfomanceEdit: {
        marginTop: hp(2.5),
        paddingHorizontal: hp(2),
    },
    titlePerfomance: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(1),
    },
    graph: {
        width: '100%',
        height: hp(95),
        resizeMode: 'cover',
    },
    editProfileMain: {
        position: 'absolute',
        bottom: hp(-1.6),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: hp(4),
        height: hp(4),
        backgroundColor: COLORS.white,
        borderColor: COLORS.editBorder,
        borderWidth: 1,
        borderRadius: hp(100),
        resizeMode: 'contain',
    },
    editProfileIcon: {
        width: hp(2),
        height: hp(2),
        resizeMode: 'contain',
    },
    calIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        bottom: 15,
        width: hp(2),
        resizeMode: 'contain',
    },
    pupilEditGraph: {
        width: '100%',
        resizeMode: 'contain',
    },
});