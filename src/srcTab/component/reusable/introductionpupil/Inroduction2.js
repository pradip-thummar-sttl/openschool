import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import PTabletOnboarding2 from "../../../../svg/pupil/introductionTablet/PTabletOnboarding2";


const Introduction2 = (props) => {
    return (
        <View style={{...STYLE.viewBox, backgroundColor: COLORS.white}}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideTwo} style={styles.SlideImage}></Image> */}
                <PTabletOnboarding2 style={styles.SlideImage} width={hp(111.17)} height={hp(62.04)} />
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Learn beyond your classroom</Text>
               <Text p style={styles.introContent}>Curious to learn something new outside of your classroom? Access our vast content {"\n"}library with hundreds of unique videos – open to all pupils, whether your school {"\n"}subscribes or not.</Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageArea: {        
        alignSelf: 'center',
        height: hp(66.79),
        marginBottom: hp(1),
        justifyContent: 'flex-end',
    },
    lefContent:{
        width: '100%',
        paddingHorizontal: hp(4),
        textAlign: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    introTitle: {
        color:COLORS.darkGray,
        fontSize: hp(3.125),
        marginBottom:hp(2.8),
        textAlign: 'center',
        fontFamily: FONTS.fontBold,
    },
    introContent: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight:hp(2.60),
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
        paddingLeft:hp(7.81),
        paddingRight:hp(7.81),
    },
    SlideImage: {
        // width: hp(111.17),
        resizeMode: 'contain',
        height: hp(62.04),
    },
});
export default Introduction2;