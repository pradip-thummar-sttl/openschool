import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');
import FONTS from '../../../utils/Fonts';
import COLORS from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default StyleSheet.create({
    mainView:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: COLORS.white
    },
    EnterCodeText:{
        fontFamily:FONTS.fontBold,
        fontSize:hp(3)
    },
    numberView:{
        flexDirection:'row',
        flexWrap:'wrap', 
        width:hp(50)
    },
    roundButton:{
        height:hp(12),
        width:hp(12),
        borderRadius:hp(12/2),
        backgroundColor:COLORS.greyBack,
         margin:hp(2),
        borderWidth:1,
        borderColor:COLORS.videoLinkBorder,
         alignItems:'center',
         justifyContent:'center'
    },
    numberText:{
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(4),
        color: COLORS.darkGrayIntro,
    },
    codeView:{
        flexDirection:'row'
    },
    input:{
        height:wp(5),
        width:hp(10),
        borderBottomWidth:1,
        margin:wp(2),
    },
    text:{
        textAlign:'center',
        fontFamily:FONTS.fontSemiBold,
        fontSize:hp(4),
    },
    withoutRoundButton:{
        height:hp(12),
        width:hp(12),
        margin:hp(2),
        alignItems:'center',
        justifyContent:'center'
    },
    withoutnumberText:{
        fontFamily:FONTS.fontBold,
        fontSize:hp(2),
         color:COLORS.dashboardGreenButton,
          textAlign:'center'
    },
    backSpaceArrow: {
        width: hp(3.38),
        height: hp(2.58),
        resizeMode: 'contain',
    },
})
