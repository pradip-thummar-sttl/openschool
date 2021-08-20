import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import PMobileOnboarding2 from "../../../../src/svg/pupil/introductionMobile/PMobileOnboarding2";

const Introduction2 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                <Image source={Images.introSlideTwo} style={styles.SlideImage}></Image>
                {/* <PMobileOnboarding2 style={styles.SlideImage} height={hp(50.58)} width={hp(48.5)} /> */}
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Learn beyond your {'\n'}classroom</Text>
               <Text p style={styles.introContent}>Curious to learn something new outside of your classroom? Access our vast content library with hundreds of unique videos – open to all pupils, whether your school subscribes or not.</Text>
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
        marginTop: hp(7.38),
        marginBottom: hp(4.92),
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
        width: hp(48.5),
        resizeMode: 'contain',
        height: hp(50.58),
    },
});
export default Introduction2;