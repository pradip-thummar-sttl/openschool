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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from 'moment';

const ParentZoneProfileEdit = (props) => {
    const [isHide, action] = useState(true);

    const [profileData, setProfileData] = useState(props.data);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [note, setNote] = useState('');
    const [relation, setRelation] = useState('');
    const [code, setCode] = useState('');
    const [parentName, setParentName] = useState('');
    const [mobile, setMobile] = useState('');
    const [childEmail, setChildEmail] = useState('');
    const [childPass, setChildPass] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDob(moment(profileData.Dob).format('DD/MM/yyyy'))
        setUniqueCode(profileData.UniqueNumber)
        setNote(profileData.Note)
        setRelation(profileData.Relationship)
        setCode(profileData.PinPassword)
        setParentName(profileData.ParentFirstName + ' ' + profileData.ParentLastName)
        setMobile(profileData.MobileNumber)
        setChildEmail(profileData.Email)
        setAdd1(profileData.AddressLine1)
        setAdd2(profileData.AddressLine2)
        setCity(profileData.City)
        setZip(profileData.PostCode)
    }, [profileData])

    return (
        <View>
            <HeaderPMInnerEdit
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <KeyboardAwareScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
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
                                    ref={(input) => { this.t1 = input; }}
                                    onSubmitEditing={() => { this.t2.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={firstName}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={firstName => setFirstName(firstName)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Last Name</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t2 = input; }}
                                    onSubmitEditing={() => { this.t3.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={lastName}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={lastName => setLastName(lastName)}
                                />
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
                                    ref={(input) => { this.t3 = input; }}
                                    onSubmitEditing={() => { this.t4.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={uniqueCode}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={lastName => setUniqueCode(uniqueCode)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetails}>
                                <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t4 = input; }}
                                    onSubmitEditing={() => { this.t5.focus(); }}
                                    multiline={true}
                                    autoCapitalize={'sentences'}
                                    numberOfLines={4}
                                    placeholder='Write something about your pupil here…'
                                    style={PAGESTYLE.commonInputTextareaBoldGrey}
                                    onChangeText={note => setNote(note)} />
                            </View>
                            <View style={PAGESTYLE.pupilPerfomance}>
                                <Text H2 style={PAGESTYLE.titlePerfomance}>Parent/Guardian</Text>
                                <View HR style={STYLE.hrCommon}></View>
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Relationship to pupil</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t5 = input; }}
                                    onSubmitEditing={() => { this.t6.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={relation}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={relation => setRelation(relation)}
                                />
                                {/* <Image style={PAGESTYLE.DropArrow} source={Images.DropArrow} /> */}
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Set 4 digit passcode</Text>

                                <View style={PAGESTYLE.eyeParent}>
                                    <TextInput
                                        placeholder="Password"
                                        autoCapitalize={'none'}
                                        ref={(input) => { this.t6 = input; }}
                                        onSubmitEditing={() => { this.t7.focus(); }}
                                        style={STYLE.commonInputPassword}
                                        value={childPass}
                                        maxLength={30}
                                        placeholderTextColor={COLORS.menuLightFonts}
                                        onChangeText={pass => setChildPass(pass)}
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
                                <Text LABLE style={PAGESTYLE.labelForm}>Parent/Guardian Name</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t7 = input; }}
                                    onSubmitEditing={() => { this.t8.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={parentName}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={pName => setParentName(pName)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Contact tel.</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t8 = input; }}
                                    onSubmitEditing={() => { this.t9.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={mobile}
                                    keyboardType={'phone-pad'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={mobile => setMobile(mobile)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Associated email for child’s acc.</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t9 = input; }}
                                    onSubmitEditing={() => { this.t10.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={childEmail}
                                    autoCapitalize={false}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={email => setChildEmail(email)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Password</Text>

                                <View style={PAGESTYLE.eyeParent}>
                                    <TextInput
                                        placeholder="Password"
                                        autoCapitalize={'none'}
                                        ref={(input) => { this.t10 = input; }}
                                        onSubmitEditing={() => { this.t11.focus(); }}
                                        style={STYLE.commonInputPassword}
                                        value={childPass}
                                        maxLength={30}
                                        placeholderTextColor={COLORS.menuLightFonts}
                                        onChangeText={pass => setChildPass(pass)}
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
                                    ref={(input) => { this.t11 = input; }}
                                    onSubmitEditing={() => { this.t12.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={add1}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={add1 => setAdd1(add1)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Address Line 2</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t12 = input; }}
                                    onSubmitEditing={() => { this.t13.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={add2}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={add2 => setAdd2(add2)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>City</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t13 = input; }}
                                    onSubmitEditing={() => { this.t14.focus(); }}
                                    style={STYLE.commonInputGrayBack}
                                    value={city}
                                    autoCapitalize={'words'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={city => setCity(city)}
                                />
                            </View>
                            <View style={PAGESTYLE.fieldDetailsForm}>
                                <Text LABLE style={PAGESTYLE.labelForm}>Postcode</Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.t14 = input; }}
                                    style={STYLE.commonInputGrayBack}
                                    value={zip}
                                    keyboardType={'phone-pad'}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={zip => setZip(zip)}
                                />
                            </View>
                        </View>
                                        </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

export default ParentZoneProfileEdit;