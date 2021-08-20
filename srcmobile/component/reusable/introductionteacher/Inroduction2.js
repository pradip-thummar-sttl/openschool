import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import TMobileOnboarding2 from "../../../../src/svg/teacher/introductionMobile/TMobileOnboarding2";

const Introduction2 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.teacherintroSlideTwo} style={styles.SlideImage}></Image> */}
                <TMobileOnboarding2 style={styles.SlideImage} height={hp(49)} width={hp(46)} />
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Your classroom, online</Text>
               <Text p style={styles.introContent}>Teach, answer questions, give feedback and reward your pupils in real-time – just like you would in your own classroom.</Text>
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
        width: hp(46),
        resizeMode: 'contain',
        height: hp(49),
    },
});
export default Introduction2;