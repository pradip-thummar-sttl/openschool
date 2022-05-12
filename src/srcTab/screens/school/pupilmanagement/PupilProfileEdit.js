import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, PixelRatio, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import moment, { isDate } from 'moment';
import PAGESTYLE from './StyleEditProfile';
import MESSAGE from "../../../../utils/Messages";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import Header from "./HeaderPMInnerEdit";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";

import CheckBox from '@react-native-community/checkbox';


const PupilProfileEdit = (props) => {
    const [isFirstName, setFirstName] = useState('');
    const [isLastName, setLastName] = useState('');
    const [isPFirstName, setPFirstName] = useState('');
    const [isPLastName, setPLastName] = useState('');
    const [isMobile, setMobile] = useState('');
    const [isProfileUri, setProfileUri] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isSelectedDate, setSelectedDate] = useState('')
    const [isUserType, setUserType] = useState('')
    const [isLoading, setLoading] = useState(false);

    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [removeTeacher, setRemovedTeacher] = useState([])
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        setFirstName(props?.selectedPupil?.FirstName);
        setLastName(props?.selectedPupil?.LastName);
        setPFirstName(props?.selectedPupil?.ParentFirstName);
        setPLastName(props?.selectedPupil?.ParentLastName);
        setSelectedDate(moment(props?.selectedPupil?.Dob).format('DD/MM/yyyy'))
        setMobile(props?.selectedPupil?.MobileNumber + '');
        getUserType();
        var SelTeacher = []
        props?.selectedPupil?.TeacherList.forEach(element => {
            SelTeacher.push(element.TeacherId)
        });
        setSelectedTeacher(SelTeacher);

        console.log("props ----> props.selectedPupil", props.selectedPupil);
        loadTeacher()

    }, [props.selectedPupil])

    const loadTeacher = () => {

        Service.get(`${EndPoints.Teacherdownbyschoolid}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                console.log("item ---->", res.data);

                setTeachers(res.data);
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
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

        var selectArr = [];
        var removeArr = [];
        selectedTeacher.forEach(element => {
            selectArr.push({ TeacherId: element })
        });
        removeTeacher.forEach(element => {
            removeArr.push({ TeacherId: element })
        });
        let data = {
            ParentFirstName: isPFirstName,
            ParentLastName: isPLastName,
            FirstName: isFirstName,
            LastName: isLastName,
            Email: props?.selectedPupil?.Email,
            UserTypeId: isUserType,
            Dob: moment(isSelectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            IsInvited: true,
            MobileNumber: isMobile,
            CreatedBy: User.user.UserDetialId,
            AddTeacherList: selectArr,
            RemoveTeacherList: removeArr
        }
        console.log('THIS IS URL `${EndPoints.PupilUpdate}/${props?.selectedPupil?.PupilId}`', `${EndPoints.PupilUpdate}/${props?.selectedPupil?.PupilId}`)
        console.log('data in tab profile edoit', data)

        Service.post(data, `${EndPoints.PupilUpdate}/${props?.selectedPupil?.PupilId}`, (res) => {
            console.log('THIS IS RESPONSE --------> res', res);
            if (res.code == 200) {
                uploadProfile(res.data.UserDetialId)
            } else {
                showMessage(res.message)
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
                props.navigateToBack();
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
                    props.navigateToBack();
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
    const selectTeacher = (item, index, isCheck) => {
        console.log('hello check check index of check flag', index, isCheck);
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
            <View style={[PAGESTYLE.commonInputGrayBack, { marginBottom: hp(2), width:'100%' }]}>
                <Text style={[PAGESTYLE.fieldInputLabel, ]}>Assigned Teacher</Text>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={teachers}
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
        <View style={PAGESTYLE.mainPage1}>
            <Header
                openNotification={() => props.openNotification()}
                navigateToBack={() => props.navigateToBack()}
                tabIndex={(index) => { setTabSelected(index) }} />

            <View style={{ width: '100%', }}>
                <View style={PAGESTYLE.whiteBg}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={[PAGESTYLE.managementBlockTop]}>
                                <TopBackImg style={PAGESTYLE.managementopImage} height={hp(20)} width={'100%'} />
                                <View style={[PAGESTYLE.TeacherProfileMainView, { zIndex: 1, backgroundColor: 'red' }]}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                                        <Image style={{ height: '100%', backgroundColor: COLORS.lightGrey, width: '100%', borderRadius: 100 }}
                                            source={{ uri: !isProfileUri.uri ? baseUrl + props?.selectedPupil?.ProfilePicture : isProfileUri.uri }} />
                                        <View style={PAGESTYLE.editprofileStyl}>
                                            <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={PAGESTYLE.btnSendView}>
                                    <TouchableOpacity style={[PAGESTYLE.btnInnerSendView, { justifyContent: 'center', alignItems: 'center' }]}
                                        activeOpacity={opacity} onPress={() => { validateFields() }}>
                                        {isLoading ?
                                            <ActivityIndicator
                                                size={Platform.OS == 'ios' ? 'small' : 'small'}
                                                color={COLORS.white} />
                                            :
                                            <Text style={PAGESTYLE.btnSendTextView}>Save</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={PAGESTYLE.innerView}>
                                <View>
                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t2.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={isFirstName}
                                                placeholderTextColor={COLORS.darkGray}
                                                onChangeText={firstName => setFirstName(firstName)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp(2) }} >
                                        <Text style={PAGESTYLE.fieldInputLabel}>Last Name</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t3.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={isLastName}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={lastName => setLastName(lastName)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>Parent's First Name</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t2.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={isPFirstName}
                                                placeholderTextColor={COLORS.darkGray}
                                                onChangeText={firstName => setPFirstName(firstName)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp(2) }} >
                                        <Text style={PAGESTYLE.fieldInputLabel}>Parent's Last Name</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t3.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={isPLastName}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={lastName => setPLastName(lastName)}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={{width:hp(70),}}>
                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>Date of Birth</Text>
                                        <TouchableOpacity style={[PAGESTYLE.field, PAGESTYLE.filedSpace]} onPress={() => showDatePicker()}>
                                            <View style={PAGESTYLE.SelectDateView}>
                                                <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{isSelectedDate ? isSelectedDate : 'Select Date'}</Text>
                                                <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginTop: hp(2),}} >
                                        <Text style={PAGESTYLE.fieldInputLabel}>Mobile Number</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t3.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={isMobile}
                                                keyboardType="numeric"
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={lastName => setMobile(lastName)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp(2) }} >
                                        <Text style={PAGESTYLE.fieldInputLabel}>Email</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                editable={false}
                                                onSubmitEditing={() => { t3.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={props?.selectedPupil?.Email}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ marginTop: hp(2) }}>
                                        {teacherDropDown()}
                                    </View>

                                </View>


                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
            {onDataPicker()}
        </View>
    );
}
export default PupilProfileEdit;