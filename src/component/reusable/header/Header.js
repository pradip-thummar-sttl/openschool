import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from '../sidebar/Sidebar';

const Header = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <Sidebar />
            <View style={styles.rightMain}>
                <View style={styles.headermain}>
                    <Text style={styles.mainTitle}>Page Title</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.massagesIcon}>
                            <Image source={require('../../../assets/images/chat2.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default Header;

const styles = StyleSheet.create({  
    rightMain: {
        flex: 1,
        backgroundColor: COLORS.backgroundColorCommon,
        paddingLeft: hp(5.20),
    },
});