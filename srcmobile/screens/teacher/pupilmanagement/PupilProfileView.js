import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPMInner from "./HeaderPMInner";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";

const { CallModule } = NativeModules;

const PupilProfileView = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View>
            <HeaderPMInner
                navigateToBack={() => props.navigation.goBack()}
                navigateToPupilProfileEdit={() => props.navigation.replace('PupilProfileEdit')}
                onAlertPress={() => props.navigation.openDrawer()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
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
                            <View style={PAGESTYLE.rewardStarMark}>
                                <View style={PAGESTYLE.centerText}>
                                    <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground>
                                    <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerStar}>
                                    <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground>
                                    <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerText}>
                                    <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground>
                                    <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>What is the reward for?</Text>
                            <TextInput
                                returnKeyType={"next"}
                                multiline={true}
                                autoCapitalize={'sentences'}
                                numberOfLines={4}
                                placeholder='Leave feedback here'
                                style={PAGESTYLE.commonInputTextareaBoldGrey} />
                        </View>
                    </View>
                    <View HR style={STYLE.hrCommon}></View>
                    <View style={PAGESTYLE.pupilPerfomance}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                        <Image style={PAGESTYLE.graph} source={Images.graphImagePupilPerfomance}></Image>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilProfileView;