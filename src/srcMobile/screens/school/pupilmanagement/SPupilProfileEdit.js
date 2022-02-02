import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPMInnerEdit from "./HeaderPMInnerEdit";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import moment from "moment";
import { baseUrl, emailValidate, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
const { CallModule } = NativeModules;
// import { baseUrl } from "../../../../utils/Constant";

const SPupilProfileEdit = (props) => {

    const [isFirstName, setFirstName] = useState('');
    const [isLastName, setLastName] = useState('');
    const [isPFirstName, setPFirstName] = useState('');
    const [isPLastName, setPLastName] = useState('');
    const [isMobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isProfileUri, setProfileUri] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isSelectedDate, setSelectedDate] = useState('')
    const [isUserType, setUserType] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState()
    const item = props.route.params.item;
    const navigateToBack = props.route.params.navigateToBack;
    console.log('xyz----------', props)

    useEffect(() => {
        setFirstName(item.FirstName);
        setLastName(item.LastName);
        setPFirstName(item.ParentFirstName);
        setPLastName(item.ParentLastName);
        setEmail(item.Email);
        setSelectedDate(moment(item.Dob).format('DD/MM/yyyy'))
        setMobile(item.MobileNumber + '');
        getUserType();

        console.log("item ---->", item);

    }, [item])

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
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const onDataPicker = () => {
        return (
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={onHandleConfirm}
                onCancel={onHideDatePicker}
            />
        )
    }
    const onHandleConfirm = (date) => {
        setSelectedDate(moment(date).format('DD/MM/yyyy'))
        onHideDatePicker();
    };
    const onHideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const validateFields = () => {

        if (!isFirstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!isLastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!isSelectedDate.trim()) {
            showMessage(MESSAGE.selectDOB)
            return false
        } else if (!isPFirstName.trim()) {
            showMessage(MESSAGE.parentFirstName)
            return false
        } else if (!isPLastName.trim()) {
            showMessage(MESSAGE.parentLastName)
            return false
        } else if (!isMobile.trim() || isMobile.length < 5 || isMobile.length > 16) {
            showMessage(MESSAGE.phone)
            return false
        }

        saveProfile()
    }
    const saveProfile = () => {
        setLoading(true)
        let data = {
            ParentFirstName: isPFirstName,
            ParentLastName: isPLastName,
            FirstName: isFirstName,
            LastName: isLastName,
            Email: email,
            UserTypeId: isUserType,
            Dob: moment(isSelectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            IsInvited: true,
            MobileNumber: isMobile,
            CreatedBy: User.user.UserDetialId,
        }
        console.log('THIS IS URL PUPLIEDIT MOBILE `${EndPoints.PupilUpdate}/${item?.PupilId}`', `${EndPoints.PupilUpdate}/${item?.PupilId}`)
        console.log('THIS IS DATA', data)
        Service.post(data, `${EndPoints.PupilUpdate}/${item?.PupilId}`, (res) => {
            console.log('THIS IS RES', res)
            if (res.code == 200) {
                uploadProfile(res.data.UserDetialId)
            } else {
                // showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
        })
    }
    const uploadProfile = (pupilId) => {
        if (!isProfileUri) {
            setLoading(false)
            showMessageWithCallBack(MESSAGE.updatePupilProfile, () => {
                navigateToBack();
            })
            return
        }

        let data = new FormData();

        data.append('file', {
            uri: isProfileUri.uri,
            name: isProfileUri.fileName,
            type: isProfileUri.type
        });

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)

                showMessageWithCallBack(MESSAGE.updatePupilProfile, () => {
                    navigateToBack();
                })
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
        })

    }

    const getUserType = () => {
        Service.get(EndPoints.GetAllUserType, (res) => {
            if (res.flag) {
                var userData = res.data
                userData.map((item) => {
                    if (item.Name === 'Pupil') {
                        setUserType(item._id)
                    }
                })
            } else {
            }
        }, (err) => {
        })
    }



    return (
        <View>
            <HeaderPMInnerEdit
                onAlertPress={() => props.navigation.openDrawer()}
                OnSaveEdit={() => { validateFields() }}
                navigateToBack={() => props.navigation.goBack()}
                isLoading={isLoading}
               
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>

                    <View style={[PAGESTYLE.profileImageArea]}>
                        <View style={PAGESTYLE.coverImage}>
                            <TopBackImg height={hp(13.8)} width={'100%'} />
                        </View>
                        <View style={[PAGESTYLE.profileOuter]}>
                            <Image style={PAGESTYLE.profileImage}
                                source={{ uri: !isProfileUri.uri ? baseUrl + props?.selectedPupil?.ProfilePicture : isProfileUri.uri }} />
                            <TouchableOpacity style={PAGESTYLE.editprofileStyl1} activeOpacity={opacity} onPress={() => showActionChooser()}>
                                <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="First Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={isFirstName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setFirstName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Last Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={isLastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setLastName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Date of Birth</Text>


                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[STYLE.commonInputGrayBack, { flexDirection: 'row' }]}>
                                    <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{isSelectedDate ? isSelectedDate : 'Select Date'}</Text>
                                    <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>
                            {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                        </View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"RP170712"}
                                placeholderTextColor={COLORS.menuLightFonts}
                                editable={false}
                            // onChangeText={firstName => set(firstName)}
                            />
                        </View>

                        <View HR style={STYLE.hrCommon}></View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent's First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="Parent's First Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={isPFirstName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setPFirstName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent's Last Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="parent's Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={isPLastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setPLastName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Email</Text>
                            <TextInput
                                // returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}
                                placeholder="Email"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={email}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={email => setEmail(email)}

                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Mobile Number</Text>
                            <TextInput
                                // returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack, { paddingVertical: 3 }]}


                                keyboardType="numeric"
                                autoCapitalize={false}
                                maxLength={40}
                                value={isMobile}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={lastName => setMobile(lastName)}
                            />
                        </View>

                    </View>
                    <View HR style={STYLE.hrCommon}></View>


                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={onHandleConfirm}
                        onCancel={onHideDatePicker}
                    />
                    <View style={{ height: Platform.OS == "ios" ? 130 : 30 }} />
                </ScrollView>
            </View>
        </View>
    );
}

export default SPupilProfileEdit;
