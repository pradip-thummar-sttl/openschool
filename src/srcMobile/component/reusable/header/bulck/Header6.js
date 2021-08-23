import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';
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
                    <Text numberOfLines={1} style={styles.mainTitle}>{props.title}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
            </View>            
        </View>
    );
}
export default Header6;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(2.46),
        paddingRight: hp(2),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingBottom: 15,
    },
    titles: {
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        marginLeft: 6,
    },
    arrow: {
        width: hp(2.43),
        resizeMode: 'contain',
        marginRight: hp(1.8)
    },
});