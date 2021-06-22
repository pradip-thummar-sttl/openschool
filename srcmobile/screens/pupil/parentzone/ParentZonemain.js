import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    return (
        <View>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.mainPage}>
                    <View style={PAGESTYLE.feedsMain}>
                        <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                            <View style={PAGESTYLE.leftContent}>
                                <View style={PAGESTYLE.test}></View>
                            </View>
                            <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZonemain;