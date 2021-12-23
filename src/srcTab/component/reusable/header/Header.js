import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import { opacity } from "../../../../utils/Constant";
import { BadgeIcon, User } from "../../../../utils/Model";
// import Images from "../../../../utils/Images";
import Notification from "../../../../svg/teacher/dashboard/Notification";

const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <Text style={styles.mainTitle}>Welcome, {User.user.FirstName} {User.user.LastName}!</Text>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    style={styles.notificationBar}
                    onPress={() => props.onAlertPress()}
                    activeOpacity={opacity}>
                    {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                    <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                    {
                        BadgeIcon.isBadge ?
                            <View style={STYLE.redDot}></View> : null
                    }

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
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(3),
        paddingBottom: Platform.OS == 'android' ? hp(2) : hp(2),
        // paddingBottom: hp(5),
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
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
});