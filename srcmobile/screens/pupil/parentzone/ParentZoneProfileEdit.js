import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPMInnerEdit from "./HeaderPMInnerEdit";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";

const ParentZoneProfileEdit = (props) => {
    const [isHide, action] = useState(true);
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
                            <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image>
                            <View style={PAGESTYLE.profileOuter}>
                                <Image source={Images.profileImage} style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity style={PAGESTYLE.editProfileMain}><Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} ></Image></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Student details</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
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
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Date of Birth"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"17/07/2012"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                            <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
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
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Parent/Guardian</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Relationship to pupil</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Relationship to pupil"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Mother"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                            <Image style={PAGESTYLE.DropArrow} source={Images.DropArrow} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent/Guardian Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Parent/Guardian Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"Ann Le-Pardesi"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Contact tel.</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Contact tel."
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"01632 960600"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Associated email for child’s acc.</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Associated email for child’s acc."
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"ann@gmail.com"}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Password</Text>

                            <View style={PAGESTYLE.eyeParent}>
                                <TextInput
                                    placeholder="Password"
                                    autoCapitalize={'none'}
                                    maxLength={30}
                                    style={STYLE.commonInputPassword}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    secureTextEntry={true}
                                />
                                <View style={PAGESTYLE.eye}>
                                    <TouchableOpacity activeOpacity={opacity}>
                                        <Image
                                            style={PAGESTYLE.viewIcon} source={Images.ShowPassword} />
                                    </TouchableOpacity>
                                </View>
                            </View>
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

export default ParentZoneProfileEdit;