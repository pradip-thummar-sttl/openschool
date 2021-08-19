import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from "../../../../utils/Images";

const Introduction1 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.imageArea}>
                <Image source={Images.introSlideOne} style={styles.SlideImage}></Image>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Stay connected with your teacher </Text>
               <Text p style={styles.introContent}>Maintain two-way teacher to pupil and teacher to parent interactions and communication through instant chats, live lesson reactions and much more.</Text>
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
        marginTop: hp(11.88),
        marginBottom: hp(9.14),
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