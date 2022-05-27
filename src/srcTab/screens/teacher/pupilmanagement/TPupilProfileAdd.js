import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, PixelRatio, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, emailValidate, opacity, showMessage } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import PAGESTYLE from '../../school/pupilmanagement/StyleProfile';
import moment from 'moment';
import MESSAGE from "../../../../utils/Messages";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HeaderPMInnerAdd from "../../school/pupilmanagement/HeaderPMInnerAdd";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import { showMessageWithCallBack } from "../../../../utils/Constant";
import FONTS from "../../../../utils/Fonts";
import WhiteCheck from "../../../../svg/pupil/timetable/WhiteCheck";

const TPupilProfileAdd = (props) => {
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

        // Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
        Service.get(`${EndPoints.Teacherdownbyschoolid}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                setTeachers(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })
    }

    const onSelectTeacher = (item) => {

        if (isCheckedTeacherAreAvailable(item))
            setSelectedTeacher(selectedTeacher.filter(value => value.TeacherId !== item.TeacherId));
        else
            setSelectedTeacher(oldArray => [...oldArray, item]);
    }

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
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Assigned Teacher</Text>

                <Menu onSelect={(item) => onSelectTeacher(item)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length - 1].FirstName || selectedTeacher[selectedTeacher.length - 1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length - 1].LastName || selectedTeacher[selectedTeacher.length - 1].TeacherLastName) : 'Select a Teacher'}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }} style={{ height: hp(40) }}>
                        <FlatList
                            data={teachers}
                            renderItem={({ item }) => (
                                <View style={PAGESTYLE.teacherListView}>
                                    {
                                        isCheckedTeacherAreAvailable(item) ?
                                            <WhiteCheck height={hp(1.55)} width={hp(1.55)} fill={"#000"} />
                                            :
                                            <View style={{ width: hp(1.55), height: hp(1.55) }} />
                                    }
                                    <MenuOption style={{ padding: 10, fontFamily: FONTS.fontRegular }} value={item} text={item.FirstName + ' ' + item.LastName} />
                                </View>
                                // 
                            )}
                            style={{ height: 130 }} />
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
        } 
        // else if (!selectedTeacher.length) {
        //     showMessage(MESSAGE.selectTeacher)
        //     return false
        // }
        else if (!parentFirstName.trim()) {
            showMessage(MESSAGE.parentFirstName)
            return false
        } else if (!parentLastName.trim()) {
            showMessage(MESSAGE.parentLastName)
            return false
        } else if (!email.trim() || !emailValidate(email)) {
            showMessage(MESSAGE.email)
            return false
        } else if (!mobile.trim() && mobile.length < 5 && mobile.length > 16) {
            showMessage(MESSAGE.phone)
            return false
        }

        saveProfile()
    }

    const saveProfile = () => {
        setLoading(true)

        let data = {
            SchoolId: User.user.UserDetialId,
            ParentFirstName: parentFirstName,
            ParentLastName: parentLastName,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            MobileNumber: mobile,
            UserTypeId: userType,
            Dob: moment(selectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            CreatedBy: User.user.UserDetialId,
            IsInvited: 'false',
            TeacherList:selectedTeacher,
            ProfilePicture:"sdvds",
        }
       
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
            resetFeilds()
            // showMessage(MESSAGE.inviteSent)
            // return
            showMessageWithCallBack(MESSAGE.inviteSent, () => {
                props.navigateToBack()

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
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
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

    const onDataPicker = () => {
        return (
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        )
    }
    return (
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInnerAdd
                openNotification={() => props.openNotification()}
                navigateToBack={() => props.navigateToBack()}
                tabIndex={(index) => { setTabSelected(index) }} />

            <View style={{ width: isHide ? '100%' : '100%', }}>
                <View style={PAGESTYLE.whiteBg}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={[PAGESTYLE.managementBlockTop]}>
                                <TopBackImg style={PAGESTYLE.managementopImage} height={hp(20)} width={'100%'} />
                                <View style={PAGESTYLE.TeacherProfileMainView}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                                        <Image style={{ height: '100%', backgroundColor: COLORS.lightGrey, width: '100%', borderRadius: 100 }}
                                            source={{ uri: !profileUri.uri ? baseUrl : profileUri.uri }} />
                                        <View style={PAGESTYLE.editprofileStyl}>
                                            <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={PAGESTYLE.btnSendView}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { validateFields() }}>

                                        {isLoading ?
                                            <ActivityIndicator
                                                style={PAGESTYLE.commonButtonGreen}
                                                size={Platform.OS == 'ios' ? 'small' : 'small'}
                                                color={COLORS.white} />
                                            :
                                            <Text style={PAGESTYLE.btnSendTextView}>Send Invite</Text>

                                        }
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, { marginTop: hp(10) }]}>
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
                                            <View style={[PAGESTYLE.commonInput, { flexDirection: 'row', height: hp(6), }]}>
                                                <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select Date'}</Text>
                                                <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* <View>
                                    {teacherDropDown()}
                                </View> */}
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
                        {onDataPicker()}
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </View>
    );
}
export default TPupilProfileAdd;