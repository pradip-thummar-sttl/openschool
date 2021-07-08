import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Alert, BackHandler, Platform } from "react-native";
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
import { baseUrl, showMessage, showMessageWithCallBack } from "../../../utils/Constant";
import MESSAGE from "../../../utils/Messages";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';

const ParentZoneProfileEdit = (props) => {
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [isPindHide, setPinHide] = useState(false);
    const [isPasswordHide, setPasswordide] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [profileData, setProfileData] = useState(props.route.params.data);
    const [pupilId, setPupilId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [profile, setProfile] = useState('')
    const [profileUri, setProfileUri] = useState('')
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
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.navigation.goBack()
        return true;
      }

    useEffect(() => {
        setPupilId(profileData.UserId)
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDob(moment(profileData.Dob).format('DD/MM/yyyy'))
        setProfile(profileData.ProfilePicture)
        setUniqueCode(profileData.UniqueNumber)
        setNote(profileData.Note)
        setRelation(profileData.Relationship)
        setCode(profileData.PinPassword + '')
        setParentName(profileData.ParentFirstName + ' ' + profileData.ParentLastName)
        setMobile(profileData.MobileNumber + '')
        setChildEmail(profileData.Email)
        setAdd1(profileData.AddressLine1)
        setAdd2(profileData.AddressLine2)
        setCity(profileData.City)
        setZip(profileData.PostCode)
    }, [profileData])

    const validateFields = () => {
        if (!firstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!dob.trim()) {
            showMessage(MESSAGE.selectDOB)
            return false
        } else if (!relation.trim()) {
            showMessage(MESSAGE.relation)
            return false
        } else if (!code.trim()) {
            showMessage(MESSAGE.passCode)
            return false
        } else if (!parentName.trim()) {
            showMessage(MESSAGE.parentNAme)
            return false
        } else if (!childPass.trim()) {
            showMessage(MESSAGE.childPassword)
            return false
        }

        saveProfile()
    }

    const saveProfile = () => {
        setLoading(true)

        let data = {
            FirstName: firstName,
            LastName: lastName,
            ParentFirstName: parentName,
            ParentLastName: '',
            Dob: moment(dob, 'yyyy-MM-DD').format('yyyy-MM-DD'),
            Note: note,
            Relationship: relation,
            AddressLine1: add1,
            AddressLine2: add2,
            City: city,
            PostCode: zip,
            MobileNumber: mobile,
            PinPassword: code,
            Password: childPass,
            UpdatedBy: pupilId
        }

        console.log('postData', data);

        Service.post(data, `${EndPoints.UpdateParent}/${pupilId}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                uploadProfile()
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const uploadProfile = () => {
        if (!profileUri) {
            showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                props.navigation.goBack()
            })
            setLoading(false)
            return
        }

        let data = new FormData();
        let ext = profileUri.uri.split('.');

            data.append('materiallist', {
                uri: profileUri.uri,
                name: profileUri.uri.split('/'),
                type: 'image/' + (ext.length > 0 ? ext[1] : 'jpeg')
            });

        console.log('data', data._parts, lessionId);

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.lessonAdded, () => {
                    props.navigation.goBack()
                })
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })

    }

    const setPinVisibility = () => {
        setPinHide(!isPindHide)
    }

    const setPasswordVisibility = () => {
        setPasswordide(!isPasswordHide)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
        setDob(moment(date).format('yyyy-MM-DD'))
        hideDatePicker();
    };

    showActionChooser = () => {
        Alert.alert(
            '',
            'Browse a profile picture',
            [{
                text: 'TAKE PHOTO',
                onPress: () => captureImage(),
            },
            {
                text: 'CHOOSE PHOTO',
                onPress: () => chooseImage(),
            },
            ],
            { cancelable: true }
        )
    }

    const captureImage = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                console.log('response', response);
                setProfileUri(response.uri)
            },
        )
    }

    const chooseImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                console.log('response', response);
                setProfileUri(response.uri)
            }
        );
    }

    return (
        <View>
            <HeaderPMInnerEdit
                isLoading={isLoading}
                saveProfile={() => validateFields()}
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <KeyboardAwareScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image>
                            <View style={PAGESTYLE.profileOuter}>
                                <Image source={{ uri: !profileUri ? baseUrl + profile : profileUri }} style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity
                                    style={PAGESTYLE.editProfileMain}
                                    activeOpacity={opacity}
                                    onPress={() => showActionChooser()}>
                                    <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} ></Image>
                                </TouchableOpacity>
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
                                onSubmitEditing={() => { this.t4.focus(); }}
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
                            <TouchableOpacity activeOpacity={opacity}
                                onPress={() => showDatePicker()}>
                                <TextInput
                                    returnKeyType={"next"}
                                    style={STYLE.commonInputGrayBack}
                                    placeholder="Date of Birth"
                                    autoCapitalize={'none'}
                                    editable={false}
                                    maxLength={40}
                                    value={dob}
                                    placeholderTextColor={COLORS.menuLightFonts} />
                                <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                ref={(input) => { this.t3 = input; }}
                                onSubmitEditing={() => { this.t4.focus(); }}
                                style={STYLE.commonInputGrayBack}
                                editable={false}
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
                                    value={code}
                                    maxLength={4}
                                    secureTextEntry={isPindHide}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={pass => setCode(pass)}
                                />
                                <View style={PAGESTYLE.eye}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => setPinVisibility()}>
                                        <Image
                                            style={PAGESTYLE.viewIcon} source={isPindHide ? Images.ShowPassword : Images.HidePassword} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent/Guardian Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                ref={(input) => { this.t7 = input; }}
                                onSubmitEditing={() => { this.t10.focus(); }}
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
                                editable={false}
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
                                editable={false}
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
                                    secureTextEntry={isPasswordHide}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={pass => setChildPass(pass)}
                                />
                                <View style={PAGESTYLE.eye}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => setPasswordVisibility()}>
                                        <Image
                                            style={PAGESTYLE.viewIcon} source={isPasswordHide ? Images.ShowPassword : Images.HidePassword} />
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
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </View>
    );
}

export default ParentZoneProfileEdit;