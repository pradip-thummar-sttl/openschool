import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { TouchableOpacity } from "react-native-gesture-handler";
import PTabletOnboarding3 from "../../../../svg/pupil/introductionTablet/PTabletOnboarding3";

const Introduction3 = (props) => {
    console.log(props);
    return (
        <View style={{...STYLE.viewBox, backgroundColor: COLORS.white}}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideThree} style={styles.SlideImage}></Image> */}
                <PTabletOnboarding3 style={styles.SlideImage} height={hp(50)} width={hp(100)}/>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Show off your progress</Text>
               <Text p style={styles.introContent}>Power up your mini avatar with cool accessories and superpowers using rewards you {"\n"}earn by participating in class, submitting your homework and more.</Text>
           </View>
           <View style={styles.buttonGreenStartMain}>
               <TouchableOpacity onPress={() => props.navigateToLogin()}><Text style={styles.buttonGreenStart}>Get Started</Text></TouchableOpacity>
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
        height: hp(61.85),
        marginBottom: hp(5.85),
        justifyContent: 'flex-end',
    },
    lefContent:{
        width: '100%',
        paddingHorizontal: hp(4),
        paddingBottom: hp(1.5),
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
        resizeMode: 'contain',
        height: hp(50.38),
    },
    buttonGreenStartMain: {
        alignSelf: 'center',
        width: '20%',
        paddingHorizontal: hp(2),
        bottom: hp(-0.5),
        paddingLeft:hp(3),
        paddingRight:hp(3),
    },
    buttonGreenStart: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',  
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.7),
        textTransform: 'uppercase',
        paddingVertical: hp(1.6),
        borderRadius: hp(0.8),
        overflow: 'hidden',
        fontFamily: FONTS.fontBold
    },
});

export default Introduction3;