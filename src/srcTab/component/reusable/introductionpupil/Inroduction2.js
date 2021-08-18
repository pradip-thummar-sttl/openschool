import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';

const Introduction2 = (props) => {
    return (
        <View style={{...STYLE.viewBox, backgroundColor: COLORS.white}}>
            <View style={styles.imageArea}>
                <Image source={Images.introSlideTwo} style={styles.SlideImage}></Image>
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
        color: COLORS.introGreyColor,
        lineHeight:hp(2.5),
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
        paddingLeft:hp(31.77),
        paddingRight:hp(31.77),
    },
    SlideImage: {
        width: hp(92.05),
        resizeMode: 'contain',
        height: hp(44.79),
    },
});
export default Introduction2;