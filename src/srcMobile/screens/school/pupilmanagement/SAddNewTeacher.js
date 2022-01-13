import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";

// import Images from '../../../../utils/Images';
import PAGESTYLE from '../teacherManagament/ProfileStyle';
import FONTS from '../../../../utils/Fonts';
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
// import HeaderPTInnerEdit from "./HeaderPTInnerEdit";
import ActivityRings from "react-native-activity-rings";
import AddNewTeacherHeader from "./AddNewTeacherHeader";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
// import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import MESSAGE from "../../../../utils/Messages";
import { baseUrl, emailValidate, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/login/ArrowDown";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Styles from "../../../../srcTab/screens/teacher/GlobalMessage/Styles";

// import { EndPoints } from "../../../../service/EndPoints";
// import { Service } from "../../../../service/Service";
// import moment from 'moment';

const { CallModule } = NativeModules;

const SAddNewTeacher = (props) => {
    console.log(']]]]]]]]]]]0000000',props);
    const item = props.route.params.item;

    const [isHide, action] = useState(true);
    const [chartData, setChartData] = useState([])
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
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [teachers, setTeachers] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const myref = useRef(null);
    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);
    const t4 = useRef(null);
    const t5 = useRef(null);
    const t6 = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    useEffect(() => {
        loadTeacher();
        getUserType()
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    /////
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
    const validateFields = () => {
        if (!firstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false;
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!selectedDate.trim()) {
            showMessage(MESSAGE.selectDOB)
            return false;
        } 
        else if (!selectedTeacher.length) {
            showMessage(MESSAGE.selectTeacher)
            return false;
            
        }else if (!parentFirstName.trim()) {
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
                // setTeachers(res.data)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }
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

    const uploadProfile = (pupilId) => {
        if (!profileUri) {
            setLoading(false)
            //return
            showMessageWithCallBack(MESSAGE.inviteSent, () => {
                props.navigation.goBack()
            });
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
                // props.navigation.goBack()
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

    const teacherDropDown = () => {
        return (
            <View style={[PAGESTYLE.dropDownFormInput, { marginBottom: hp(2) }]}>
                <Text style={[PAGESTYLE.fieldInputLabel,{ paddingLeft: hp(1.5),}]}>Assigned Teacher</Text>
                <Menu onSelect={(item) => setSelectedTeacher([...selectedTeacher, item])}>
                    <MenuTrigger style={[STYLE.commonInputGrayBack, STYLE.common]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length - 1].FirstName || selectedTeacher[selectedTeacher.length - 1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length - 1].LastName || selectedTeacher[selectedTeacher.length - 1].TeacherLastName) : 'Select a Teacher'}</Text>
                        {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
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

    return (
        <View>
            <AddNewTeacherHeader
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
                OnSaveEdit={() => {validateFields()}}

            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                            <TopBackImg style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={PAGESTYLE.profileOuter}>
                                {/* <Image style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity style={PAGESTYLE.editProfileMain}> */}
                                {/* <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} /> */}
                                {/* </TouchableOpacity> */}

                                <Image style={PAGESTYLE.profileImage}
                                    source={{ uri: !profileUri || !profileUri.uri ? baseUrl : profileUri.uri }} />
                                <TouchableOpacity activeOpacity={opacity}
                                    onPress={() => showActionChooser()}
                                    style={PAGESTYLE.editProfileMain}>
                                    <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(2.30)} height={hp(2.30)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                ref={t1}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t2.current.focus(); }}
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
                                ref={t2}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t3.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
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
                            {/* <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}> */}
                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[styles.commonInputGrayBack, { flexDirection: 'row' }]}>
                                    <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                    <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            {teacherDropDown()}
                        </View>
                       

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Parent's First Name</Text>
                            <TextInput
                                ref={t3}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t4.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
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
                                ref={t4}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t5.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Parent's Last Name"
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
                                ref={t5}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t6.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
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
                                ref={t6}
                                returnKeyType={"done"}
                                style={STYLE.commonInputGrayBack}
                                autoCapitalize={false}
                                keyboardType={'phone-pad'}
                                maxLength={40}
                                value={mobile}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={number => setMobile(number)}
                            />
                        </View>
                      
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

const styles = StyleSheet.create({
    commonInputGrayBack: {
        color: COLORS.darkGray,
        fontSize: hp('1.8%'),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp(6),
        textAlignVertical: 'center',
        paddingLeft: hp(2),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontRegular,



    },
})

export default SAddNewTeacher;