import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainPage: {
        flexDirection: 'row',
        flex: 1,
    },
    myDay: {
        backgroundColor: COLORS.orage,
        paddingRight: hp(2.60),
        paddingLeft: hp(1.60),
        position: 'relative',
        flexDirection: 'row',
        borderRadius: hp(1.3),
        justifyContent: 'space-between',
        height: hp(8.5),
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayIcon: {
        width: hp(4),
        resizeMode: 'contain',
    },
    dayTitle: {
        color: COLORS.white,
        fontSize: hp(2.6),
        fontFamily: FONTS.fontBold,
        paddingLeft: hp(1.30),
    },
    datePosition: {
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 0,
        right: hp(5.20),
        textAlign: 'center',
        borderBottomLeftRadius: hp(1.04),
        borderBottomRightRadius: hp(1.04),
        paddingBottom: hp(2.04),
        paddingLeft: hp(1.04),
        paddingRight: hp(1.04),
        paddingTop: hp(1.1),
        width: hp(6.9),
        height: hp(7.3),
        shadowColor: "#000",
        shadowOffset: {width: 0,height: hp(1.03),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
    },
    date: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        marginBottom: hp(0.3),
    },
    month: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    moreDashboard: {
        width: hp(0.9),
        resizeMode: 'contain',
    },
    whiteBoard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.95),
        marginTop: hp(1.30),
        borderColor: COLORS.dashboardBorder,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: hp(0.2),},
        shadowOpacity: 0.16,
        shadowRadius: hp(1.95),
        overflow: 'hidden',
    },
    pupilBoard: {
        marginTop: hp(5),
        backgroundColor: COLORS.dashboardPupilBlue,
    },
    dashBoardBoxes: {
        flexDirection: 'row',
        marginBottom: hp(5.85),
        marginLeft: hp(-0.97),
        marginRight: hp(-0.97),
    },
    boxDash: {
        paddingLeft: hp(0.97),
        paddingRight: hp(0.97),
        width: '25%',
    },
    boxInnerMain: {
        borderRadius: hp(1.3),
        paddingLeft: hp(2),
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        height: hp(12),
    },
    greenBox: {
        backgroundColor: COLORS.lightGreen,
    },
    yellowBox: {
        backgroundColor: COLORS.lightYellow,
    },
    purpleBox: {
        backgroundColor: COLORS.lightPurple,
    },
    blueBox: {
        backgroundColor: COLORS.lightBlue,
    },
    titleBox: {
        fontSize: hp(1.9),
        fontFamily: FONTS.fontSemiBold,
        position: 'relative',
        zIndex: 9,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
    },
    imageIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: hp(10),
        resizeMode: 'contain',
        height: hp(10),
    },
    leftTabbing: {
        width: hp(45.57),
    },
    rightTabContent: {
        width: hp(72.26),
    },
    item: {
        flexDirection: 'row',
        paddingLeft: hp(2.21),
        paddingTop: hp(2.60),
        paddingRight: hp(2.21),
        paddingBottom: hp(2.60),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    border: {
        height: hp(5.85),
        backgroundColor: '#71C4E4',
        padding: 3,
        borderRadius: hp(5),
    },
    classSubject: {
        flexDirection: 'row',
    },
    subjectName: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
    },
    subject: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    subjecRow: {
        marginLeft: hp(2.34),
    },
    groupName: {
        borderWidth: 2,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(0.7),
        color: COLORS.grpColor,
        fontSize: hp(1.4),
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center',
        width: hp(9),
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
        marginBottom: hp(0.8),
    },
    timing: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    tabcontent: {
        padding: hp(3.90),
        paddingBottom: hp(2.60),
    },
    titleTab: {
        fontSize: hp(3.125),
        fontFamily: FONTS.fontBold,
        lineHeight: hp(4.55),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
});