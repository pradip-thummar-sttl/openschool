import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";

const ParentZoneSchoolDetails = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View>
            <HeaderPM
                onAlertPress={() => props.navigation.openDrawer()}
                setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsFormSchool}>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>School details</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>School name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="School name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Moseley Church of England School"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique Link Code</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique Link Code"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Enter Unique Code"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Teacher name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Teacher name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Mrs Rachel Barker"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>School contact tel.</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="School contact tel."
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"01632 960600"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Address Line 1</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Address Line 1"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"23 York Road"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Address Line 2</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Address Line 2"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Moseley"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>City</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="City"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Birmingham"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Postcode</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Postcode"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"B13 1LT"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZoneSchoolDetails;