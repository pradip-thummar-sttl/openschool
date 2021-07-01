import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView:{
        // flex:1,
        height:wp(67),
        padding:hp(2),
        backgroundColor:'red',
        flexDirection:'row',
    },
    leftView:{

    },
    rightView:{

    },
    starView:{
        width:hp(30),
        height:wp(20),
        borderRadius:10,
    }
})