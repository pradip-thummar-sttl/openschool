import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, opacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, Alert } from "react-native";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import Ic_Calendar from "../../../../svg/pupil/parentzone/Ic_Calendar";
import { baseUrl, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import moment from 'moment';
import MESSAGE from "../../../../utils/Messages";
import { Service } from '../../../../service/Service';
import { EndPoints } from '../../../../service/EndPoints';
import { User } from "../../../../utils/Model";

import CheckBox from '@react-native-community/checkbox';

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


    const pupilProfileData = props.route.params.item

    const [isLoading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(pupilProfileData.FirstName);
    const [lastName, setLastName] = useState(pupilProfileData.LastName);
    const [note, setNote] = useState(pupilProfileData.Note);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [profileUri, setProfileUri] = useState('')
    const [dob, setDob] = useState(moment(pupilProfileData.Dob).format('DD/MM/yyyy'));
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [removeTeacher, setRemovedTeacher] = useState([])
    const [addedTeacher, setAddedTeacher] = useState([]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
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
        }

        saveProfile()
    }


    const saveProfile = () => {
        setLoading(true)

        Service.get(EndPoints.GetAllUserType, (res) => {

            if (res.flag) {
                var userData = res.data
                var userType = ""
                console.log('userData', userData);

                setLoading(false)

                userData.map((item) => {
                    if (item.Name === 'Pupil') {
                        userType = item._id
                    }
                })
                var selectArr = [];
                var removeArr = [];
                selectedTeacher.forEach((element) => {
                    if (!addedTeacher.includes(element)) {
                      selectArr.push({ TeacherId: element });
                    }
                  });
                  removeTeacher.forEach((element) => {
                    if (addedTeacher.includes(element)) {
                      removeArr.push({ TeacherId: element });
                    }
                  });

                let data = {
                    FirstName: firstName,
                    LastName: lastName,
                    Dob: moment(dob, 'DD/MM/yyyy').format('yyyy-MM-DD'),
                    Note: note,
                    ParentFirstName: pupilProfileData.ParentFirstName,
                    ParentLastName: pupilProfileData.ParentLastName,
                    UserTypeId: userType,
                    IsInvited: false,
                    Email: pupilProfileData.Email,
                    MobileNumber: pupilProfileData.MobileNumber,
                    UpdatedBy: User.user._id,
                    AddTeacherList: selectArr,
                    RemoveTeacherList: removeArr
                }


                Service.post(data, `${EndPoints.PupilUpdate}/${pupilProfileData.PupilId}`, (res) => {
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

            } else {
                setLoading(false)
                showMessage(res.message)
            }

        }, (err) => {
            console.log('error ', err)
            setLoading(false)

        })

    }

    const uploadProfile = (updatedData) => {

        if (!profileUri) {
            showMessageWithCallBack(MESSAGE.profileUpdated, () => {
            })
            props.route.params.onGoBack()
            props.navigation.goBack()
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

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilProfileData.PupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                })
                props.route.params.onGoBack()
                props.navigation.goBack()
                console.log('response of save lesson', res)

            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })

    }

    const selectTeacher = (item, index, isCheck) => {
        var selectTech = [...selectedTeacher];
        var removeTech = [...removeTeacher];
        if (selectTech.includes(item.TeacherId)) {
            let idx = selectTech.indexOf(item.TeacherId)
            selectTech.splice(idx, 1)
            removeTech.push(item.TeacherId)
        } else {
            selectTech.push(item.TeacherId)
            if (removeTech.includes(item.TeacherId)) {
                let idx = removeTech.indexOf(item.TeacherId)
                removeTech.splice(idx, 1)
            }
        }
        setSelectedTeacher(selectTech);
        setRemovedTeacher(removeTech);

        console.log('hello dude select and remove array is', selectTech, removeTech);
    }

    const teacherDropDown = () => {
        return (
            <View style={[PAGESTYLE.commonInputGrayBack, { marginBottom: hp(2) }]}>
                <Text style={[PAGESTYLE.labelForm, { paddingLeft: hp(1.5), }]}>Assigned Teacher</Text>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={addedTeacher}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <View style={PAGESTYLE.alignRow}>
                            <CheckBox
                                style={[PAGESTYLE.checkMark1]}
                                value={selectedTeacher.includes(item.TeacherId) ? true : false}
                                boxType={'square'}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onCheckColor={COLORS.white}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                onValueChange={(check) => selectTeacher(item, index, check)}
                            />
                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.FirstName + ' ' + item.LastName}</Text>
                        </View>
                    )}
                />

            </View>
        );
    };

    return (
        <View>
            <HeaderPMInnerEdit
                isLoading={isLoading}
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
                onPressSave={() => validateFields()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                            {/* <TopBackImg style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} /> */}
                            <EditProfileTop_Mobile style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={PAGESTYLE.profileOuter}>
                                {/* <Image source={{ uri: baseUrl + pupilProfileData.ProfilePicture }} style={PAGESTYLE.profileImage}></Image> */}
                                <Image source={{ uri: !profileUri.uri ? baseUrl + pupilProfileData.ProfilePicture : profileUri.uri }} style={PAGESTYLE.profileImage}></Image>

                                <TouchableOpacity
                                    style={PAGESTYLE.editProfileMain}
                                    onPress={() => showActionChooser()}>
                                    <Ic_Edit style={PAGESTYLE.editProfileIcon} width={hp(2)} height={hp(2)} />
                                </TouchableOpacity>
                            </View>

                            {/* <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity style={PAGESTYLE.editProfileMain}>
                                    <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} />
                                </TouchableOpacity>
                            </View> */}
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
                                value={firstName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setFirstName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Last Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={lastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={lastName => setLastName(lastName)}
                            />
                        </View>
                        {/* <View style={PAGESTYLE.fieldDetailsForm}>
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
                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[PAGESTYLE.commonInput, { flexDirection: 'row' }]}>
                                    <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{'Select Date'}</Text>
                                    <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>
                        </View> */}

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
                        {/* <View >
                            {teacherDropDown()}
                        </View> */}

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={pupilProfileData.UniqueNumber}
                                editable={false}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <TextInput
                                returnKeyType={"next"}
                                multiline={true}
                                autoCapitalize={'sentences'}
                                numberOfLines={4}
                                value={note}
                                placeholder='Write something about your pupil here…'
                                style={PAGESTYLE.commonInputTextareaBoldGrey}
                                onChangeText={text => setNote(text)}
                            />
                        </View>
                    </View>
                    {/* <View HR style={STYLE.hrCommon}></View>
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
                    <View style={PAGESTYLE.pupilPerfomanceEdit}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                        <Image style={PAGESTYLE.pupilEditGraph} source={Images.pupilEditGrpahImage}></Image>
                    </View> */}
                </ScrollView>

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

export default PupilProfileEdit;