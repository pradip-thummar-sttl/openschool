import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <Text style={styles.mainTitle}>Dashboard</Text>
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notificationBar}>
                    <Image style={styles.massagesIcon} source={require('../../../assets/images/notification2.png')} />
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
        width: wp(78),
        height: hp(16.40),
        alignItems: 'center',
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        marginTop: hp(-2.5),
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    massagesIcon: {
        width: hp(9),
        resizeMode: 'contain',
    },
});