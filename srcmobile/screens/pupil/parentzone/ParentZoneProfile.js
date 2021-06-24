import React, { useState, useEffect, useRef } from "react";
import { opacity, NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, TextInput, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler } from "react-native-gesture-handler";

const PupilProfileView = (props) => {
    // const item = props.route.params.item;
    const [isHide, action] = useState(true);
    
    return (
        <View>
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image>
                            <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage} source={Images.profileImage} />
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetails}>
                        <View style={PAGESTYLE.editProfileButtonMain}>
                            <TouchableOpacity onPress={() => props.navigateToDetail()} style={PAGESTYLE.profileEdit}>
                                <Image source={Images.EditGreen} style={PAGESTYLE.profileeditButton} />
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Student details</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Name</Text>
                            <Text P style={PAGESTYLE.data}>Reuel Pardesi</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                            <Text P style={PAGESTYLE.data}>17/7/2012</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                            <Text P style={PAGESTYLE.data}>RP170712</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <Text P style={PAGESTYLE.data}>Reuel has peanut and dairy allergies. I will make sure he carries medication with him.</Text>
                        </View>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Parent/Guardian</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Relationship to pupil</Text>
                            <Text P style={PAGESTYLE.data}>Mother</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Parent/Guardian Name</Text>
                            <Text P style={PAGESTYLE.data}>Ann Le-Pardesi</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Contact tel.</Text>
                            <Text P style={PAGESTYLE.data}>01632 960600</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Associated email for child’s acc.</Text>
                            <Text P style={PAGESTYLE.data}>ann@gmail.com</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Password</Text>
                            <Text P style={PAGESTYLE.data}>*****************</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Address</Text>
                            <Text P style={PAGESTYLE.data}>23 York Road,{'\n'}Moseley, Birmingham,{'\n'}B13 1LT</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilProfileView;