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
const Headerseven = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <TouchableOpacity style={styles.widthBackArrow} onPress={()=>props.goBack()}><Image style={styles.arrow} source={Images.backArrow} /></TouchableOpacity>
                <View style={styles.titles}>
                    <Text style={styles.mainTitle}>English Grammar Homework{"\n"}Homework</Text>
                </View>
            </View>            
        </View>
    );
}
export default Headerseven;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        backgroundColor: COLORS.white,
        marginTop: hp(3),
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(3),
        marginBottom: hp(2.46),
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