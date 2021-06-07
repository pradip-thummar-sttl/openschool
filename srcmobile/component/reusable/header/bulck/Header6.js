import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import Popuphomework from '../../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../../reusable/popup/Popupsubmithomework';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
const Header6 = (props) => {
    console.log('props', props);
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <TouchableOpacity onPress={()=>props.goBack()}><Image style={styles.arrow} source={Images.backArrow} /></TouchableOpacity>
                <View style={styles.titles}>
                    <Text style={styles.mainTitle}>{props.title}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
            </View>            
        </View>
    );
}
export default Header6;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        backgroundColor: COLORS.white,
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
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
    },
});