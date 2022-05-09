import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";

const { CallModule } = NativeModules;

const PupilManagement = (props) => {
    const [isHide, action] = useState(true);
    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer',{ onGoBack: () => refresh() })
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM onAlertPress={() => props.navigation.openDrawer()} onNotification={() => openNotification()}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainer}>
                        <Text H2 style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                        <Text P style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilManagement;