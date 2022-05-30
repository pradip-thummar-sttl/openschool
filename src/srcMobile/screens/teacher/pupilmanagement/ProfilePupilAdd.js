import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import FONTS from "../../../../utils/Fonts";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import MESSAGE from "../../../../utils/Messages";
// import { baseUrl, emailValidate, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import WhiteCheck from "../../../../svg/pupil/timetable/WhiteCheck";
import { baseUrl, emailValidate, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import STYLE  from './PupilProfileAddStyle'
import AddNewPupilHeader from "../../school/pupilmanagement/AddNewPupilHeader";

const ProfilePupilAdd = (props) => {

    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDate, setSelectedDate] = useState('')
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [parentFirstName, setParentFirstName] = useState('');
    const [parentLastName, setParentLastName] = useState('');
    const [profileUri, setProfileUri] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [teachers, setTeachers] = useState([]);
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
       else if (!parentFirstName.trim()) {
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
        setLoading(true)

        let data = {
            SchoolId: User.user.SchoolId,
            ParentFirstName: parentFirstName,
            ParentLastName: parentLastName,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            MobileNumber: mobile,
            UserTypeId: userType,
            Dob: moment(selectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            CreatedBy: User.user._id,
            IsInvited: 'false',
            TeacherList:[{TeacherId:User.user._id}],
            ProfilePicture:"sdvds",
        }

        
        Service.post(data, `${EndPoints.Pupil}`, (res) => {
            if (res.code == 200) {
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
    const loadTeacher = () => {

        Service.get(`${EndPoints.Teacherdownbyschoolid}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                setTeachers(res.data);
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

    const onSelectTeacher = (item) => {

        if (isCheckedTeacherAreAvailable(item))
            setSelectedTeacher(selectedTeacher.filter(value => value.TeacherId !== item.TeacherId));
        else
            setSelectedTeacher(oldArray => [...oldArray, item]);

    }
    // {() => props.navigation.replace('PupilRegister', { userType: "Pupil" })}
    const isCheckedTeacherAreAvailable = (item) => {
        let isAvailable = false;
        selectedTeacher.forEach(element => {
            if (item.TeacherId === element.TeacherId)
                isAvailable = true;
        });

        return isAvailable;
    }

    const teacherDropDown = () => {
        return (
            <View style={[STYLE.dropDownFormInput, { marginBottom: hp(2) }]}>
                <Text style={[STYLE.fieldInputLabel, { paddingLeft: hp(1.5), }]}>Assigned Teacher</Text>

                <Menu onSelect={(item) => onSelectTeacher(item)}>

                    <MenuTrigger style={[STYLE.commonInputGrayBack, STYLE.common]}>
                        <Text style={STYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length - 1].FirstName || selectedTeacher[selectedTeacher.length - 1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length - 1].LastName || selectedTeacher[selectedTeacher.length - 1].TeacherLastName) : 'Select a Teacher'}</Text>
                        <ArrowDown style={STYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>

                    <MenuOptions customStyles={{ optionText: { fontSize: 13 } }} style={{ height: hp(40) }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={teachers}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={STYLE.teacherListView}>
                                    {
                                    isCheckedTeacherAreAvailable(item) ? 
                                    <WhiteCheck height={hp(1.55)} width={hp(1.55)} fill={"#000"} />
                                    :
                                    <View style={{width:hp(1.55), height:hp(1.55)}}/>
                                    }
                                    <MenuOption style={{ padding: 10, fontFamily: FONTS.fontRegular, }} value={item} text={item.FirstName + ' ' + item.LastName} />
                                    {/* <Text style={STYLE.txtTeacherList}>{item.FirstName + ' ' + item.LastName}</Text> */}
                                </TouchableOpacity>
                            )}
                            style={{ height: 130 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };
// console.log('props of setSelectedTabIndex',props.route.params.setSelectedTabIndex());
    return (
        <View>
            <AddNewPupilHeader
                navigateToBack={() => handleBackButtonClick()}
                onAlertPress={() => props.navigation.openDrawer()}
                OnSaveEdit={() => { validateFields() }}
                isLoading={isLoading}

            />
            <View style={[STYLE.MainProfile, { paddingBottom: hp(5) }]}>
                <ScrollView style={STYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={STYLE.mainContainerProfile}>
                        <View style={STYLE.profileImageArea}>
                            <TopBackImg style={STYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={STYLE.profileOuter}>
                                <Image style={STYLE.profileImage}
                                    source={{ uri: !profileUri || !profileUri.uri ? baseUrl : profileUri.uri }} />
                                <TouchableOpacity activeOpacity={opacity}
                                    onPress={() => showActionChooser()}
                                    style={STYLE.editProfileMain}>
                                    <Ic_Edit style={STYLE.pzEditIcon} width={hp(2.30)} height={hp(2.30)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={STYLE.mainDetailsForm}>
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>First Name</Text>
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
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Last Name</Text>
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
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Date of Birth</Text>
                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <View style={[styles.commonInputGrayBack, { flexDirection: 'row' }]}>
                                    <Calender style={STYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={STYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                    <ArrowDown style={STYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                </View>
                            </TouchableOpacity>

                        </View>
                        {/* <View>
                            {teacherDropDown()}
                        </View> */}


                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Parent's First Name</Text>
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
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Parent's Last Name</Text>
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
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Email</Text>
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
                        <View style={STYLE.fieldDetailsForm}>
                            <Text LABLE style={STYLE.labelForm}>Mobile Number</Text>
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

export default ProfilePupilAdd;