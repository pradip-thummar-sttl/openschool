import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import { opacity } from "../../../utils/Constant";
import { User } from "../../../utils/Model";
import Images from "../../../utils/Images";
// import Images from "../../../utils/Images";

const AvatarHeader = (props) => {
    return (
        <View style={styles.headerMain}>
            <Text style={styles.mainTitle}>My Avatar</Text>
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
export default AvatarHeader;

const styles = StyleSheet.create({
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(3.25),
        paddingRight: hp(2.0),
        paddingTop: hp(3.38),
        paddingBottom: hp(2),
        borderBottomWidth:1,
        borderColor:COLORS.borderGrp
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    notificationBar: {
        marginLeft: hp(1.25),
        position: 'relative',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
});