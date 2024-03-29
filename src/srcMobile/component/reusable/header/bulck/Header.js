import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <Text style={styles.mainTitle}>Common Title</Text>
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notificationBar}>
                    {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Header;

const styles = StyleSheet.create({
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    notificationBar: {
        marginLeft: hp(1.25),
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
});