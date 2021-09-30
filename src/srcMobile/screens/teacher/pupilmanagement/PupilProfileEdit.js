import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPMInnerEdit from "./HeaderPMInnerEdit";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";

const { CallModule } = NativeModules;

const PupilProfileEdit = (props) => {
    const [isHide, action] = useState(true);
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }
    return (
        <View>
            <HeaderPMInnerEdit
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                            <TopBackImg style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity style={PAGESTYLE.editProfileMain}>
                                    {/* <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="First Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Reuel"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Last Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Pardesi"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Date of Birth</Text>
                            {/* <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Date of Birth"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"17/07/2012"}
                                placeholderTextColor={COLORS.menuLightFonts} /> */}
                            {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[PAGESTYLE.commonInput, { flexDirection: 'row' }]}>
                                    <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                    <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"RP170712"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <TextInput
                                returnKeyType={"next"}
                                multiline={true}
                                autoCapitalize={'sentences'}
                                numberOfLines={4}
                                placeholder='Write something about your pupil here…'
                                style={PAGESTYLE.commonInputTextareaBoldGrey} />
                        </View>
                    </View>
                    <View HR style={STYLE.hrCommon}></View>
                    <View style={PAGESTYLE.rewardSection}>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Instant rewards for homework</Text>
                            <View style={PAGESTYLE.rewardStarMark}>
                                <View style={PAGESTYLE.centerText}>
                                    {/* <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                                    <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerStar}>
                                    {/* <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                                    <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerText}>
                                    {/* <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
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
                    <View style={PAGESTYLE.pupilPerfomanceEdit}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                        {/* <Image style={PAGESTYLE.pupilEditGraph} source={Images.pupilEditGrpahImage}></Image> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilProfileEdit;