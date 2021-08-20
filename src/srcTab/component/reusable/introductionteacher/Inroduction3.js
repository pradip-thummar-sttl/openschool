import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';
import { TouchableOpacity } from "react-native-gesture-handler";
import TTabletOnboarding3 from "../../../../svg/teacher/introductionTablet/TTabletOnboarding3";

const Introduction3 = (props) => {
    console.log(props);
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.teacherintroSlideThree} style={styles.SlideImage}></Image> */}
                <TTabletOnboarding3 style={styles.SlideImage} height={hp(55.59)} width={hp(80)}/>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Tailored content recommendations</Text>
               <Text p style={styles.introContent}>Save hours of research with access to hundreds of curated curriculum-aligned {"\n"}learning resources – recommended to you as you plan your lessons.</Text>
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
        height: hp(65.75),
        justifyContent: 'flex-end',
        marginBottom: hp(1.95),
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
        color:COLORS.darkGrayIntro,
        fontSize: hp(3.12),
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
        // width: hp(43),
        resizeMode: 'contain',
        height: hp(55.59),
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