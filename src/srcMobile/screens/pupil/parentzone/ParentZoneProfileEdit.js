import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Alert, BackHandler, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPMInnerEdit from "./HeaderPMInnerEdit";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from 'moment';
import { baseUrl, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import { User } from "../../../../utils/Model";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import CalendarTop from "../../../../svg/teacher/timetable/CalendarTop";
import Ic_Calendar from "../../../../svg/pupil/parentzone/Ic_Calendar";
import ShowPassword from "../../../../svg/teacher/login/ShowPassword";
import HidePassword from "../../../../svg/teacher/login/HidePassword";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";

const ParentZoneProfileEdit = (props) => {
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [isPindHide, setPinHide] = useState(true);
    const [isPasswordHide, setPasswordide] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);
    const t4 = useRef(null);
    const t5 = useRef(null);
    const t6 = useRef(null);
    const t7 = useRef(null);
    const t8 = useRef(null);
    const t9 = useRef(null);
    const t10 = useRef(null);
    const t11 = useRef(null);
    const t12 = useRef(null);
    const t13 = useRef(null);
    const t14 = useRef(null);

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

    console.log('ghddgh ', profileData);

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

    useEffect(() => {
        setPupilId(profileData.PupilId)
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
            Dob: moment(dob, 'DD/MM/yyyy').format('yyyy-MM-DD'),
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

        console.log('postData', dob, data);

        Service.post(data, `${EndPoints.UpdateParent}/${pupilId}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                uploadProfile(res.data)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const uploadProfile = (updatedData) => {
        if (!profileUri) {
            showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                User.user.ChildrenList = updatedData
                User.user.FirstName = firstName
                User.user.LastName = lastName
                props.route.params.onGoBack()
            })
            setLoading(false)
            return
        }

        let data = new FormData();
        let ext = profileUri.uri.split('.');

        data.append('file', {
            uri: profileUri.uri,
            name: 'pupilprofile.' + (ext.length > 0 ? ext[ext.length - 1] : 'jpeg'),
            type: 'image/' + (ext.length > 0 ? ext[ext.length - 1] : 'jpeg')
        });

        console.log('data', data._parts, ext, profileUri.uri);

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                    let temp = updatedData
                    temp.forEach(element => {
                        if (pupilId == element.Pupilid) {
                            element.ProfilePicture = res.data.ProfilePicture
                        }
                    });
                    User.user.ChildrenList = updatedData
                    User.user.FirstName = firstName
                    User.user.LastName = lastName
                    User.user.ProfilePicture = res.data.ProfilePicture
                    props.route.params.onGoBack()
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
        setDob(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
    };

    const showActionChooser = () => {
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
                setProfileUri(response)
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
                setProfileUri(response)
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
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image> */}
                            <EditProfileTop_Mobile style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />
                            <View style={PAGESTYLE.profileOuter}>
                                <Image source={{ uri: !profileUri.uri ? baseUrl + profile : profileUri.uri }} style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity
                                    style={PAGESTYLE.editProfileMain}
                                    activeOpacity={opacity}
                                    onPress={() => showActionChooser()}>
                                    <Ic_Edit style={PAGESTYLE.editProfileIcon} width={hp(2)} height={hp(2)} />
                                    {/* <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} ></Image> */}
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
                                ref={t1}
                                onSubmitEditing={() => { t2.current.focus(); }}
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
                                ref={t2}
                                onSubmitEditing={() => { t4.current.focus(); }}
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
                                {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                                <Ic_Calendar style={PAGESTYLE.calIcon} height={hp(2)} width={hp(2)} />
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                ref={t3}
                                onSubmitEditing={() => { t4.current.focus(); }}
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
                                ref={t4}
                                onSubmitEditing={() => { t5.current.focus(); }}
                                multiline={true}
                                value={note}
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
                                ref={t5}
                                onSubmitEditing={() => { t6.current.focus(); }}
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
                                    ref={t6}
                                    onSubmitEditing={() => { t7.current.focus(); }}
                                    style={STYLE.commonInputPassword}
                                    value={code}
                                    maxLength={4}
                                    secureTextEntry={isPindHide}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={pass => setCode(pass)}
                                />
                                <View style={PAGESTYLE.eye}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => setPinVisibility()}>
                                        {
                                            isPindHide ?
                                                <ShowPassword style={PAGESTYLE.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                                : <HidePassword style={PAGESTYLE.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                        }
                                        {/* <Image
                                            style={PAGESTYLE.viewIcon} source={isPindHide ? Images.ShowPassword : Images.HidePassword} /> */}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent/Guardian Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                ref={t7}
                                onSubmitEditing={() => { t10.current.focus(); }}
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
                                ref={t8}
                                onSubmitEditing={() => { t9.current.focus(); }}
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
                                ref={t9}
                                onSubmitEditing={() => { t10.current.focus(); }}
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
                                    ref={t10}
                                    onSubmitEditing={() => { t11.current.focus(); }}
                                    style={STYLE.commonInputPassword}
                                    value={childPass}
                                    maxLength={30}
                                    secureTextEntry={isPasswordHide}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={pass => setChildPass(pass)}
                                />
                                <View style={PAGESTYLE.eye}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => setPasswordVisibility()}>
                                        {/* <Image
                                            style={PAGESTYLE.viewIcon} source={isPasswordHide ? Images.ShowPassword : Images.HidePassword} /> */}

                                        {
                                            isPasswordHide ?
                                                <ShowPassword style={PAGESTYLE.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                                : <HidePassword style={PAGESTYLE.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Address Line 1</Text>
                            <TextInput
                                returnKeyType={"next"}
                                ref={t11}
                                onSubmitEditing={() => { t12.current.focus(); }}
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
                                ref={t12}
                                onSubmitEditing={() => { t13.current.focus(); }}
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
                                ref={t13}
                                onSubmitEditing={() => { t14.current.focus(); }}
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
                                ref={t14}
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
                    maximumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </View>
    );
}

export default ParentZoneProfileEdit;