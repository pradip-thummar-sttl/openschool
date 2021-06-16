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
        borderWidth: hp(1.5),
        borderColor: COLORS.white,
        position: 'absolute',
        top: hp(7.38),
    },
    profileImage: {
        width: hp(13),
        height: hp(13),
        resizeMode: 'contain',
    },
    mainDetails: {
        marginTop: hp(8.75),
        paddingHorizontal: hp(2),
    },
    fieldDetails: {
        marginBottom: hp(4.3),
    },
    label: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: 3,
    },
    data: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    rewardSection: {
        paddingHorizontal: hp(2),
    },
});