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
                <TouchableOpacity onPress={() => props.onAlertPress()}><Image source={Images.menuIconTop} style={styles.menuIcon}/></TouchableOpacity>
                <Text style={styles.mainTitle}>Title</Text>
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
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        paddingTop: hp(5),
        paddingBottom: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.01,
        shadowRadius: 5,
        elevation: 1,
        marginBottom: hp(1.95),
        backgroundColor: COLORS.white,
    },
    mainTitle: {
        fontSize: hp(2.34),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    notificationBar: {
        marginLeft: hp(1.25),
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'cover',
    },
    menuIconWithTitle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: hp(2.60),
        resizeMode: 'contain',
        marginRight: hp(1.56),
    },
});