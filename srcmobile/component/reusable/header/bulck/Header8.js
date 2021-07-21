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
const HeaderWhite = (props) => {
    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <View style={styles.headerMainInner}>
                    <TouchableOpacity style={styles.widthBackArrow} onPress={() => props.goBack()}><Image style={styles.arrow} source={Images.backArrow} /></TouchableOpacity>
                    <View style={styles.titles}>
                        <Text numberOfLines={2} style={[styles.mainTitle,{width:wp(60)}]}>{props.subjectName} {"\n"}{props.topicName}</Text>
                    </View>
                </View>
                <View style={styles.submittedLogo}>
                    <Image source={Images.Marcked} style={styles.submittedLogoImage} />
                    <Text style={styles.submittedText}>Marked</Text>
                </View>
            </View>
        </View>
    );
}
export default HeaderWhite;

const styles = StyleSheet.create({
    submittedLogo: {
        alignItems: 'center',
        right: hp(0),
        position: 'absolute',
    },
    headerMainInner: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    submittedText: {
        fontSize: hp(1.72),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    submittedLogoImage: {
        width: hp(2),
        height: hp(2.2),
        resizeMode: 'contain'
    },
    headerBarMainWhite: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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