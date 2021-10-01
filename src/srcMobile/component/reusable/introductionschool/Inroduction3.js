import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PMobileOnboarding3 from "../../../../svg//school/introductionMobile/PMobileOnboarding3";


const Introduction3 = (props) => {
    console.log(props);
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideThree} style={styles.SlideImage}></Image> */}
                <PMobileOnboarding3 style={styles.SlideImage} width={'100%'} height={hp(67.45)} />
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Fast and easy setup</Text>
               <Text p style={styles.introContent}>Easily transfer data using CSV uploads to quickly set up your school, teacher, and pupil accounts in just a few clicks.</Text>
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
        marginBottom: hp(1),
        height: hp(70.18),
        width: '95%',
        justifyContent: 'flex-end',
    },
    lefContent:{
        width: '100%',
        paddingHorizontal: hp(2),
        paddingBottom: hp(1.5),
        textAlign: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    introTitle: {
        color:COLORS.darkGrayIntro,
        fontSize: hp(2.28),
        marginBottom:hp(2.8),
        textAlign: 'center',
        fontFamily: FONTS.fontBold,
    },
    introContent: {
        fontSize: hp(1.72),
        color: COLORS.darkGray,
        lineHeight:hp(2.5),
        textAlign: 'center',
        paddingHorizontal: hp(2),
        fontFamily: FONTS.fontRegular,
    },
    SlideImage: {
        width: hp(41.74),
        resizeMode: 'contain',
        height: hp(50.98),
    },
    buttonGreenStartMain: {
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: hp(2),
        bottom: Platform.OS == 'android' ? hp(0) : hp(-0.5),
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