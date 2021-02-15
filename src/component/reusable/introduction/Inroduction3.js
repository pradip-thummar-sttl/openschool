import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';

const Introduction3 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Anywhere, anytime</Text>
               <Text p style={styles.introContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{"\n"}{"\n"}Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,{"\n"}{"\n"} when an unknown printer took a galley of type and scrambled it to make a type specimen book. {"\n"}{"\n"}It has survived not only five centuries.
               </Text>
           </View>
           <Text style={styles.commonButtonGreen} onPress={() => Alert.alert('Welcome to Open School')} >Get Started</Text>
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
    introTitle: {
        color:COLORS.white,
        fontSize: hp('5.0%'),
        marginBottom:hp('3.0%'),
        fontWeight: '600',
        fontFamily: FONTS.fontBold,
    },
    introContent: {
        fontSize: hp('2.5%'),
        color: COLORS.white,
        lineHeight:hp('3.0%'),
        fontFamily: FONTS.fontRegular,
    },
    commonButtonGreen: {
        backgroundColor: '#00A36B',
        color: COLORS.white,
        fontSize: hp('2.4%'),
        fontWeight: '800',
        borderRadius: hp('1.3%'),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp('3.5%'),
        paddingRight: hp('3.5%'),
        paddingTop: hp('1.5%'),
        paddingBottom: hp('1.5%'),
        alignSelf: 'center',
        bottom: hp('12%'),
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 50,},
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
});

export default Introduction3;