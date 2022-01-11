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
import HeaderPMInnerAdd from "./HeaderPMInnerAdd";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";

const TeacherProfileAdd = (props) => {
    const [isHide, action] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profileUri, setProfileUri] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [userType, setUserType] = useState('');
    const [titles, setTitile] = useState([])
    const [selectedTitle, setSelectedTitle] = useState([])
    const [teachingYear, setTeachingYear] = useState([])
    const [selectedYear, setSelectedYear] = useState([])

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);

    useEffect(() => {
        loadTeachingYear()
        loadTitle()
        getUserType()
    }, [])

    // const openNotification = () => {
    //     Var.isCalender = false
    //     BadgeIcon.isBadge = false
    //     props.navigation.openDrawer() 
    // }
    const loadTeachingYear = () => {
        Service.get(`${EndPoints.TeachingYear}`, (res) => {
            console.log('response of GetSubjectBySchoolId response', res)
            if (res.code == 200) {
                setTeachingYear(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })
    }

    const loadTitle = () => {
        Service.get(`${EndPoints.Title}`, (res) => {
            console.log('response of GetSubjectBySchoolId response', res)
            if (res.code == 200) {
                setTitile(res.data)
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
                    if (item.Name === 'Teacher') {
                        setUserType(item._id)
                    }
                })
            } else {
            }
        }, (err) => {
        })
    }

    const validateFields = () => {
        if (!selectedYear.length > 0) {
            showMessage(MESSAGE.selectYear)
            return false
        } else if (!selectedTitle.length > 0) {
            showMessage(MESSAGE.selectTitle)
            return false
        } else if (!firstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!email.trim() || !emailValidate(email)) {
            showMessage(MESSAGE.email)
            return false
        }

        saveProfile()
    }

    const saveProfile = () => {
        // setLoading(true)

        let data = {
            SchoolId: User.user.UserDetialId,
            FirstName: firstName,
            LastName: lastName,
            TeachingYear: selectedYear[selectedYear.length - 1]._id,
            Email: email,
            CreatedBy: User.user.UserDetialId,
            UserTypeId: userType,
            IsInvited: 'false',
            Title: selectedTitle[selectedTitle.length - 1]._id
        }

        console.log('data', data);

        Service.post(data, `${EndPoints.Teacher}`, (res) => {
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

    const uploadProfile = (teacherId) => {
        if (!profileUri) {
            setLoading(false)
            resetFeilds()
            showMessage(MESSAGE.inviteSent)
            return
        }

        let data = new FormData();

        data.append('file', {
            uri: profileUri.uri,
            name: profileUri.fileName,
            type: profileUri.type
        });

        Service.postFormData(data, `${EndPoints.TeacherUploadProfile}/${teacherId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                resetFeilds()
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

    const resetFeilds = () => {
        setSelectedYear([])
        setSelectedTitle([])
        setFirstName('')
        setLastName('')
        setEmail('')
    }

    const yearDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Teaching Year</Text>
                <Menu onSelect={(item) => setSelectedYear([...selectedYear, item])}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedYear.length > 0 ? selectedYear[selectedYear.length - 1].Title : 'Select a Year'}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={teachingYear}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.Title}></MenuOption>
                            )}
                            style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const titleDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Title</Text>
                <Menu onSelect={(item) => setSelectedTitle([...selectedTitle, item])}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTitle.length > 0 ? selectedTitle[selectedTitle.length - 1].Title : 'Select a Title'}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={titles}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.Title}></MenuOption>
                            )}
                            style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

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
                            <View style={[PAGESTYLE.managementBlockTop]}>
                                <TopBackImg style={PAGESTYLE.managementopImage} height={hp(20)} width={'100%'} />
                                <View style={PAGESTYLE.TeacherProfileMainView}>
                                    <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                                        <Image style={{ height: '100%', backgroundColor: COLORS.lightGrey ,width: '100%', borderRadius: 100 }}
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
                                        <Text style={PAGESTYLE.btnSendTextView}>Send Invite</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, { marginTop: hp(10) }]}>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    {yearDropDown()}
                                </View>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    {titleDropDown()}
                                </View>

                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
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
                                    <Text style={PAGESTYLE.fieldInputLabel}>Email</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            ref={t3}
                                            returnKeyType={"done"}
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
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </View>
    );
}
export default TeacherProfileAdd;