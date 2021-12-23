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
import { baseUrl, emailValidate, opacity, showMessage } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
const { CallModule } = NativeModules;

const SPupilProfileEdit = (props) => {
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const [isHide, action] = useState(true);
    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDate, setSelectedDate] = useState('')
    const [assignedTeacher, setAssignedTeacher] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [parentFirstName, setParentFirstName] = useState('');
    const [parentLastName, setParentLastName] = useState('');
    const [profileUri, setProfileUri] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);
    const t4 = useRef(null);
    const t5 = useRef(null);
    const t6 = useRef(null);

    useEffect(() => {
        loadTeacher()

        getUserType()
    }, [])

    const loadTeacher = () => {
        const data = {
            Searchby: "",
            Filterby: ""
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            console.log('response of GetSubjectBySchoolId response', res)
            if (res.code == 200) {
                setTeachers(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })
    }

    const teacherDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Assigned Teacher</Text>
                <Menu onSelect={(item) => setSelectedTeacher([...selectedTeacher, item])}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length - 1].FirstName || selectedTeacher[selectedTeacher.length - 1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length - 1].LastName || selectedTeacher[selectedTeacher.length - 1].TeacherLastName) : 'Select a Teacher'}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                  
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={teachers}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.FirstName + ' ' + item.LastName}></MenuOption>
                            )}
                            style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

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

    const validateFields = () => {
        if (!firstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!selectedDate.trim()) {
            showMessage(MESSAGE.selectDOB)
            return false
        } else if (!parentFirstName.trim()) {
            showMessage(MESSAGE.parentFirstName)
            return false
        } else if (!parentLastName.trim()) {
            showMessage(MESSAGE.parentLastName)
            return false
        } else if (!email.trim() || !emailValidate(email)) {
            showMessage(MESSAGE.email)
            return false
        } 
        // else if (!mobile.trim()) {
        //     showMessage(MESSAGE.phone)
        //     return false
        // }

        saveProfile()
    }

    const saveProfile = () => {
        // setLoading(true)

        let data = {
            SchoolId: User.user.UserDetialId,
            TeacherId: selectedTeacher[selectedTeacher.length - 1].TeacherId,
            ParentFirstName: parentFirstName,
            ParentLastName: parentLastName,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            MobileNumber: mobile,
            CreatedBy: User.user.UserDetialId,
            UserTypeId: userType,
            IsInvited: 'false',
            Dob: moment(selectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD')
        }

        console.log('data', data);

        Service.post(data, `${EndPoints.Pupil}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                uploadProfile(res.data._id)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const uploadProfile = (pupilId) => {
        if (!profileUri) {
            setLoading(false)
            showMessage(MESSAGE.inviteSent)
            return
        }

        let data = new FormData();
        let ext = profileUri.uri.split('.');

        data.append('file', {
            uri: profileUri.uri,
            name: profileUri.uri.split('/'),
            type: 'image/' + (ext.length > 0 ? ext[1] : 'jpeg')
        });

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                showMessage(MESSAGE.inviteSent)
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

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
        setSelectedDate(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
    };
    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }
    return (
        <View>
            <HeaderPMInnerEdit
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
                OnSaveEdit={() => validateFields()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            <TopBackImg style={PAGESTYLE.coverImage} width={'100%'} height={hp(13.5)}  />

                            <View style={PAGESTYLE.profileOuter}>
                                <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                                    <Image style={PAGESTYLE.profileImage}  source={{ uri: !profileUri || !profileUri.uri ? baseUrl : profileUri.uri }} />
                                    <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(2.30)} height={hp(2.30)} />
                                </TouchableOpacity>
                               
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
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
                                style={[STYLE.commonInputGrayBack, {paddingVertical  : 3}]}
                                placeholder="Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={lastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setLastName(firstName)}
                            />
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

                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[STYLE.commonInputGrayBack, { flexDirection: 'row' }]}>
                                    <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                    <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>
                            {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                        </View>
                        
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={"RP170712"}
                                placeholderTextColor={COLORS.menuLightFonts}
                                editable={false}
                            // onChangeText={firstName => set(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Assigned Teacher</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
                                placeholder="Assigned Teacher"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={assignedTeacher}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setAssignedTeacher(firstName)}
                            />
                        </View>
                        <View HR style={STYLE.hrCommon}></View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent's First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
                                placeholder="Parent's First Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={parentFirstName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setParentFirstName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent's Last Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
                                placeholder="parent's Last Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={parentLastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setParentLastName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Email</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={[STYLE.commonInputGrayBack,{paddingVertical  : 3}]}
                                placeholder="Email"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={email}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setEmail(firstName)}
                            />
                        </View>
                        {/* <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <TextInput
                                returnKeyType={"next"}
                                multiline={true}
                                autoCapitalize={'sentences'}
                                numberOfLines={4}
                                placeholder='Write something about your pupil here…'
                                style={PAGESTYLE.commonInputTextareaBoldGrey} />
                        </View> */}
                    </View>
                    <View HR style={STYLE.hrCommon}></View>
                    {/* <View style={PAGESTYLE.rewardSection}>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Instant rewards for homework</Text>
                            <View style={PAGESTYLE.rewardStarMark}>
                                <View style={PAGESTYLE.centerText}> */}
                    {/* <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                    {/* <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerStar}> */}
                    {/* <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                    {/* <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                </View>
                                <View style={PAGESTYLE.centerText}> */}
                    {/* <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                    {/* <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                </View>
                            </View>
                        </View> */}
                    {/* <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>What is the reward for?</Text>
                            <TextInput
                                returnKeyType={"next"}
                                multiline={true}
                                autoCapitalize={'sentences'}
                                numberOfLines={4}
                                placeholder='Leave feedback here'
                                style={PAGESTYLE.commonInputTextareaBoldGrey} />
                        </View> */}
                    {/* </View> */}
                    {/* <View HR style={STYLE.hrCommon}></View> */}
                    <View style={PAGESTYLE.pupilPerfomanceEdit}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                        {/* <Image style={PAGESTYLE.pupilEditGraph} source={Images.pupilEditGrpahImage}></Image> */}
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

export default SPupilProfileEdit;