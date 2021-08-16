import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from "../../../utils/Images";

const Introduction1 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                <Image source={Images.teacherintroSlideOne} style={styles.SlideImage}></Image>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Do what you do best </Text>
               <Text p style={styles.introContent}>Spend time on interacting with your pupils, not technology. Plan, teach and mark with {"\n"}ease, all in one place</Text>
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
       // width: hp(48),
        resizeMode: 'contain',
        height: hp(60.76),
    },
});

export default Introduction1;