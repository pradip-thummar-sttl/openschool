import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from "../../../../utils/Images";
import PMobileOnboarding1 from "../../../../svg//school/introductionMobile/PMobileOnboarding1";

const Introduction1 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideOne} style={styles.SlideImage}></Image> */}
                <PMobileOnboarding1 style={styles.SlideImage} height={hp(45.37)} width={'100%'} />
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Always there for pupils</Text>
               <Text p style={styles.introContent}>Identify and support any pupil that may need extra attention with insights into their attendance, participation and achievements.</Text>
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
        marginBottom: hp(12.76),
        height: hp(58.46),
        width: '100%',
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
        width: hp(41.99),
        resizeMode: 'contain',
        height: hp(42.36),
    },
});

export default Introduction1;