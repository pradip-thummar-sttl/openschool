import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    popupLarge: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        width: hp(80.59),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        paddingBottom: hp(6.5),
    },
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(1),
    },
    cancelButtonIcon: {
        width: hp(2.94),
        top: 10,
        resizeMode: 'contain',
    },
    beforeBorder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(4.5),
        marginTop: hp(4.5),
        textAlign: 'center',
    },
    entryContentMain: {
        flexDirection: 'row',
       justifyContent:'space-between'
    },
    btnSelectionView: {
        height: hp(20),
        paddingHorizontal:wp(1),
        alignItems:'center',
       
    },
    entryData: {
        width: hp(15),
        height: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
    },
    entryIcon: {
        resizeMode: 'contain',
        marginBottom: hp(2.6),
    },
    entryTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
   


    popTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
        
    upload: {
        width: '100%',
        height: 200,
        backgroundColor: COLORS.backgroundColorCommon,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        borderColor: COLORS.blueBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    
    labelUpload: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    indicaterStyle:{ width: '70%', height: '50%', alignSelf:'center', borderRadius: hp(2), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute' },
});