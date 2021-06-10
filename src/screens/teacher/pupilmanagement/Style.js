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
        resizeMode: 'contain'
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
    }
});