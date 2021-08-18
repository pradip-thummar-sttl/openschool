import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView,Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Header1 from '../header/bulck/Header';
import Header2 from '../header/bulck/HeaderWhite';
import Header3 from '../header/bulck/Header3';
import Header4 from '../header/bulck/Header4';
import Header5 from '../header/bulck/Header5';
import Header6 from '../header/bulck/Header6';
import Header7 from '../header/bulck/Header7';
import Header8 from '../header/bulck/Header8';
import Header9 from '../header/bulck/Header9';
import Header10 from '../header/bulck/Header10';
import Header11 from '../header/bulck/Header11';
import Header12 from '../header/bulck/HeaderWhitewithoutsearch';
import Header13 from '../header/bulck/Header13';
import Header14 from '../header/bulck/Header14';

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.borderPadd}><Header1 /></View>
                <View style={styles.borderPadd}><Header2 /></View>
                <View style={styles.borderPadd}><Header3 /></View>
                <View style={styles.borderPadd}><Header4 /></View>
                <View style={styles.borderPadd}><Header5 /></View>
                <View style={styles.borderPadd}><Header6 /></View>
                <View style={styles.borderPadd}><Header7 /></View>
                <View style={styles.borderPadd}><Header8 /></View>
                <View style={styles.borderPadd}><Header9 /></View>
                <View style={styles.borderPadd}><Header10 /></View>
                <View style={styles.borderPadd}><Header11 /></View>
                <View style={styles.borderPadd}><Header12 /></View>
                <View style={styles.borderPadd}><Header13 /></View>
                <View style={styles.borderPadd}><Header14 /></View>
            </ScrollView>
        </View>
    );
}
export default Header;

const styles = StyleSheet.create({
    headerMain: {
        marginBottom: hp(5),
    },
    borderPadd: {
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: COLORS.borderGrp
    },
});