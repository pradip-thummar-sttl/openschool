import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../../utils/Colors';
import FONTS from '../../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    mainPage: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    profile: {
        width: hp(12),
        height: hp(12),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
    },
    profileTitle: {
        fontSize: hp(2.0),
        marginBottom: hp(0.1),
        color: COLORS.greyplaceholder,
        fontFamily: FONTS.fontRegular,
        marginTop: 30
    },
    actionParent: {
        width: '100%',
        position: 'absolute',
        bottom: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    actionParentBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 70,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        width: hp(9),
        height: hp(9),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
        alignSelf: 'center',
    },
    actionButtonBottom: {
        width: hp(5),
        height: hp(5),
        borderRadius: hp(200),
        borderWidth: 0.5,
        borderColor: COLORS.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrayPupil,
    },
    pupilData: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:hp(2),
        justifyContent: 'space-between',
        paddingTop:hp(2),
        width: '100%',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
    },
    pupilProfile: {
        width: Platform.OS == 'android' ? hp(39.5) : hp(26),
    },
    rowProfile: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    pupilImage: {
        width: hp(3.64),
        height: hp(3.64),
        borderRadius: hp(100),
        backgroundColor: COLORS.lightGrayPupil,
        marginRight: hp(1.5),
    },
    pupilName: {
        fontSize: hp(1.9),
        color: COLORS.darkGray,
    },
    pupilDetaillinkIcon: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    listHeaderPArent: {
        flexDirection: 'row',
        fontSize: hp(1.95),
        color: COLORS.darkGray,
        marginVertical: 10,
        fontFamily: FONTS.fontSemiBold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listHeader: {
        fontSize: hp(1.95),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
        paddingVertical: 5,
        marginLeft: 10
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});