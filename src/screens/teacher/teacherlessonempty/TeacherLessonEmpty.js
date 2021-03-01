import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";

const TeacherLessonEmpty = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{width: isHide? '93%' : '78%'}}>
                <HeaderWhite />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.whiteBoard}></View>
                </ScrollView>
            </View>
        </View>
    );
}
export default TeacherLessonEmpty;