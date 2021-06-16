import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPMInner from "./HeaderPMInner";
import { PanGestureHandler } from "react-native-gesture-handler";

const { CallModule } = NativeModules;

const PupilProfileView = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View>
            <HeaderPMInner
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image>
                            <View style={PAGESTYLE.profileOuter}><Image style={PAGESTYLE.profileImage} source={Images.profileImage}></Image></View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetails}>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Pupil name</Text>
                            <Text P style={PAGESTYLE.data}>Reuel Pardesi</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                            <Text P style={PAGESTYLE.data}>17/07/2012</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                            <Text P style={PAGESTYLE.data}>RP170712</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <Text P style={PAGESTYLE.data}>Reuel is a bright boy that is always helpful to all those around him. He is eager to learn and is particularly interesting Mathematics and Science.{"\n"}{"\n"}Reminder: Mention to parent that he is nominated to participate in Science Wiz quiz. Need parent signature and confirmation.</Text>
                        </View>
                    </View>
                    <View HR style={STYLE.hrCommon}></View>
                    <View style={PAGESTYLE.rewardSection}>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Instant rewards for homework</Text>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilProfileView;