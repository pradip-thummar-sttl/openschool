import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Introduction3 = (props) => {
    console.log(props);
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                <Image source={Images.teacherintroSlideThree} style={styles.SlideImage}></Image>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Tailored content recommendations</Text>
               <Text p style={styles.introContent}>Save hours of research with access to hundreds of curated curriculum-aligned learning resources – recommended to you as you plan your lessons.</Text>
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
        marginTop: hp(8.37),
        marginBottom: hp(2),
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
        fontSize: hp(1.8),
        color: COLORS.darkGray,
        lineHeight:hp(2.5),
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
    },
    SlideImage: {
        width: hp(43),
        resizeMode: 'contain',
        height: hp(51),
    },
    buttonGreenStartMain: {
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: hp(2),
        bottom: Platform.OS == 'android' ? hp(0) :  hp(-0.5),
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