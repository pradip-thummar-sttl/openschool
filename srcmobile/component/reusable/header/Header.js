import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import { opacity } from "../../../utils/Constant";

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <View style={styles.menuIconWithTitle}>
                <TouchableOpacity><Image source={Images.menuIconTop} style={styles.menuIcon}/></TouchableOpacity>
                <Text style={styles.mainTitle}>Dashboard</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    style={styles.notificationBar}
                    onPress={() => props.onAlertPress()}
                    activeOpacity={opacity}>
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
        alignItems: 'center',
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        paddingTop: hp(3),
        paddingBottom: hp(2)
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    notificationBar: {
        marginLeft: hp(1.25),
    },
    massagesIcon: {
        width: wp(6),
        height: hp(6),
        resizeMode: 'contain',
    },
    menuIconWithTitle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: hp(2.60),
        resizeMode: 'contain',
        marginRight: hp(2.60),
    },
});