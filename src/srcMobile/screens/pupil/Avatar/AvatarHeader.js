import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { opacity } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import HamburgerMenu from "../../../../svg/common/HamburgerMenu";
import Notification from "../../../../svg/teacher/dashboard/Notification";

const AvatarHeader = (props) => {
    return (
        <View style={styles.headerMain}>
            <View style={styles.menuIconWithTitle}>
                <TouchableOpacity onPress={() => props.onAlertPress()}>
                    {/* <Image source={Images.menuIconTop} style={styles.menuIcon}/> */}
                    <HamburgerMenu width={hp(2.60)} height={hp(1.84)} style={styles.menuIcon} />
                </TouchableOpacity>
                <Text style={styles.mainTitle} numberOfLines={1} >My Avatar</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.notificationBar}
                    onPress={() => props.onAlertPress()}
                    activeOpacity={opacity}>
                    {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                    <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />

                    <View style={STYLE.redDot}></View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default AvatarHeader;

const styles = StyleSheet.create({
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp(2),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
    },
    mainTitle: {
        fontSize: hp(2),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    menuIconWithTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: hp(2.60),
        resizeMode: 'contain',
        marginRight: hp(1.56),
    },
});