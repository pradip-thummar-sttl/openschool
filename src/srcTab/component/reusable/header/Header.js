import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import { opacity } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import Images from "../../../../utils/Images";

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <Text style={styles.mainTitle}>Welcome, {User.user.FirstName} {User.user.LastName}!</Text>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    style={styles.notificationBar}
                    onPress={() => props.onAlertPress()}
                    activeOpacity={opacity}>
                    <Image style={styles.massagesIcon} source={Images.Notification} />
                    <View style={STYLE.redDot}></View>
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
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(4),
        paddingBottom: hp(5),
        backgroundColor: COLORS.transparent,
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    notificationBar: {
        // marginLeft: hp(1.25),
        position: 'relative',
    },
    massagesIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});