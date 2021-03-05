import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';

const Introduction2 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Let our AI help you</Text>
               <Text p style={styles.introContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{"\n"}{"\n"}Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,{"\n"}{"\n"} when an unknown printer took a galley of type and scrambled it to make a type specimen book. {"\n"}{"\n"}It has survived not only five centuries.
               </Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lefContent:{
        width: '40%',
        top: hp('33.0%'),
        left: hp('7.0%'),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    introTitle: {
        color:COLORS.white,
        fontSize: hp('5.0%'),
        marginBottom:hp('3.0%'),
        fontWeight: '600',
        fontFamily: FONTS.fontBold,
    },
    introContent: {
        fontSize: hp('2.2%'),
        color: COLORS.white,
        lineHeight:hp('3.0%'),
        fontFamily: FONTS.fontRegular,
    },
});
export default Introduction2;