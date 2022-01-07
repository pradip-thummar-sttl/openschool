import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, PixelRatio, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, emailValidate, opacity, showMessage } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './StyleProfile';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderPMInner from './HeaderPMInner';
import moment from 'moment';
import Chat from "../../Chat/Chat";
import ActivityRings from "react-native-activity-rings";
import MESSAGE from "../../../../utils/Messages";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import BronzeFill from "../../../../svg/teacher/pupilmanagement/StarBronze_Fill";
import Bronze from "../../../../svg/teacher/pupilmanagement/StarBronze";
import SilverFill from "../../../../svg/teacher/pupilmanagement/StartSilver_Fill";
import Silver from "../../../../svg/teacher/pupilmanagement/StartSilver";
import GoldFill from "../../../../svg/teacher/pupilmanagement/StarGold_Fill";
import Gold from "../../../../svg/teacher/pupilmanagement/StarGold";
import Ic_CheckWhite from "../../../../svg/pupil/parentzone/Ic_CheckWhite";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HeaderPMInnerAdd from "./HeaderPMInnerAdd";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Calender from "../../../../svg/teacher/dashboard/Calender";

const PupilProfileAdd = (props) => {
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
        } else if (!mobile.trim()) {
            showMessage(MESSAGE.phone)
            return false
        }

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

    const resetFeilds = () => {
        setFirstName('')
        setLastName('')
        setSelectedDate('')
        setSelectedTeacher([])
        setParentFirstName('')
        setParentLastName('')
        setEmail('')
        setMobile('')
    }
    console.log('555555',props);
    return (
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInnerAdd
                openNotification = {() => props.openNotification()}
                navigateToBack={() => props.navigateToBack()}
                tabIndex={(index) => { setTabSelected(index) }} />

            <View style={{ width: isHide ? '100%' : '100%', }}>
                <View style={PAGESTYLE.whiteBg}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                <TopBackImg style={PAGESTYLE.managementopImage} width={'100%'} />
                                <View style={PAGESTYLE.thumbTopUser}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                                        <Image style={{ height: '100%', width: '100%', borderRadius: 100,  backgroundColor: COLORS.lightGrey }}
                                            source={{ uri: !profileUri || !profileUri.uri ? baseUrl : profileUri.uri }} />
                                        <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(2.90)} height={hp(2.90)}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={PAGESTYLE.topBannerParent}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { validateFields() }}>
                                        <Text style={PAGESTYLE.topBannerBtn1}>Send Invite</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <TouchableOpacity>
                                                <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>Edit Profile</Text>
                                            </TouchableOpacity> */}
                                {/* </ImageBackground> */}
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, { marginTop: 50 }]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            ref={t1}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => { t2.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            value={firstName}
                                            placeholderTextColor={COLORS.darkGray}
                                            onChangeText={firstName => setFirstName(firstName)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Last Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            ref={t2}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => { t3.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            value={lastName}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setLastName(lastName)}
                                        />

                                    </View>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Date of Birth</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TouchableOpacity onPress={() => showDatePicker()}>
                                            <View style={[PAGESTYLE.commonInput, { flexDirection: 'row' }]}>
                                                <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                                <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    {teacherDropDown()}
                                </View>
                            </View>
                            <View style={PAGESTYLE.hrLine} />
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, { marginTop: 25 }]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Parent's First Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            ref={t3}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => { t4.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            value={parentFirstName}
                                            placeholderTextColor={COLORS.darkGray}
                                            onChangeText={firstName => setParentFirstName(firstName)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Parent's Last Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            ref={t4}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => { t5.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            value={parentLastName}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setParentLastName(lastName)}
                                        />

                                    </View>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Email</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            ref={t5}
                                            onSubmitEditing={() => { t6.current.focus(); }}
                                            returnKeyType={"next"}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            keyboardType={'email-address'}
                                            maxLength={40}
                                            value={email}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={email => setEmail(email)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Mobile Number</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            ref={t6}
                                            returnKeyType={"done"}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            keyboardType={'phone-pad'}
                                            maxLength={40}
                                            value={mobile}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={number => setMobile(number)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            maximumDate={new Date()}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </View>
    );
}
export default PupilProfileAdd;