import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';

const Introduction2 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                <Image source={Images.teacherintroSlideTwo} style={styles.SlideImage}></Image>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Your classroom, online</Text>
               <Text p style={styles.introContent}>Teach, answer questions, give feedback and reward your pupils in real-time – just like{"\n"} you would in your own classroom.</Text>
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
        marginTop: hp(10.34),
        marginBottom: hp(8.62),
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
       // width: hp(46),
        resizeMode: 'contain',
        height: hp(49),
    },
});
export default Introduction2;