import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';
import Popuphomework from '../../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../../reusable/popup/Popupsubmithomework';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import BackArrow from "../../../../../svg/common/BackArrow";
const HeaderWhite = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
            {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                <TouchableOpacity style={styles.widthBackArrow} onPress={()=>props.goBack()}><BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} /></TouchableOpacity>
                <View style={styles.titles}>
                    <Text style={styles.mainTitle}>{props.title}</Text>
                </View>
            </View>            
        </View>
    );
}
export default HeaderWhite;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    titles: {
        marginLeft: hp(2),
    },
    mainTitle: {
        fontSize: hp(1.97),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(0.3),
    },
    date: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    arrow: {
        width: hp(2.43),
        height: hp(2.43),
        resizeMode: 'contain',
        marginLeft: hp(0.6),
    },
    widthBackArrow: {
        width: hp(3.39),
    },
});