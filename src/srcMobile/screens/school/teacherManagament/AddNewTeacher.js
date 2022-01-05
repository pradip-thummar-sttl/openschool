import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform,TextInput, Alert  } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Alert, Image, Text, View } from "react-native";
// import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, emailValidate, opacity, showMessage } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './ProfileStyle';
import HeaderPTInnerEdit from "./HeaderPTInnerEdit";
import ActivityRings from "react-native-activity-rings";
// import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
// import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
// import MESSAGE from "../../../../utils/Messages";
import AddNewTeacherHeader from "./AddNewTeacherHeader";
import MESSAGE from "../../../../utils/Messages";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";

// import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const AddNewTeacher = (props) => {

    const [chartData, setChartData] = useState([])

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

    const activityConfig = {
        width: 200,
        height: 200
    };
    useEffect(() => {
        loadTeachingYear()

        loadTitle()

        getUserType()
    }, [])

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
        }, () => {
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
        setLoading(true)

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
                <Text style={PAGESTYLE.labelForm}>Teaching Year</Text>
                <Menu onSelect={(item) => setSelectedYear([...selectedYear, item])}>
                    <MenuTrigger style={{ ...STYLE.commonInputGrayBack, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedYear.length > 0 ? selectedYear[selectedYear.length - 1].Title : 'Select a Year'}</Text>
                        {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
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
                <Text style={PAGESTYLE.labelForm}>Title</Text>
                <Menu onSelect={(item) => setSelectedTitle([...selectedTitle, item])}>
                    <MenuTrigger style={{ ...STYLE.commonInputGrayBack, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTitle.length > 0 ? selectedTitle[selectedTitle.length - 1].Title : 'Select a Title'}</Text>
                        {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
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
        <View>
            <AddNewTeacherHeader
                navigateToBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
                onSavePressed={() => validateFields()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <KeyboardAwareScrollView
                    style={PAGESTYLE.scrollViewCommonPupilEdit}
                    showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                            <EditProfileTop_Mobile style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage}
                                    source={{ uri: !profileUri.uri ? baseUrl : profileUri.uri }} />
                                <View style={PAGESTYLE.editProfileMain}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => showActionChooser()}>
                                        {/* <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} /> */}
                                        <Ic_Edit style={PAGESTYLE.editProfileIcon} width={hp(2)} height={hp(2)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            {yearDropDown()}
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            {titleDropDown()}
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                ref={t1}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t2.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
                                autoCapitalize={false}
                                maxLength={40}
                                value={firstName}
                                placeholderTextColor={COLORS.darkGray}
                                onChangeText={firstName => setFirstName(firstName)} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Last Name</Text>
                            <TextInput
                                ref={t2}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t3.current.focus(); }}
                                style={STYLE.commonInputGrayBack}
                                autoCapitalize={false}
                                maxLength={40}
                                value={lastName}
                                placeholderTextColor={COLORS.lightplaceholder}
                                onChangeText={lastName => setLastName(lastName)} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Email</Text>
                            <TextInput
                                ref={t3}
                                returnKeyType={"done"}
                                style={STYLE.commonInputGrayBack}
                                autoCapitalize={false}
                                keyboardType={'email-address'}
                                maxLength={40}
                                value={email}
                                placeholderTextColor={COLORS.lightplaceholder}
                                onChangeText={email => setEmail(email)} />
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
                    {/* <View HR style={STYLE.hrCommon}></View> */}

                    <View HR style={STYLE.hrCommon}></View>
                    {/* <View style={PAGESTYLE.pupilPerfomanceEdit}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Teacher Insights</Text>
                        <Image style={PAGESTYLE.pupilEditGraph} source={Images.pupilEditGrpahImage}></Image>
                        <View style={PAGESTYLE.performancePArent}>
                            <ActivityRings
                                data={chartData}
                                config={activityConfig} />

                            <View style={{ flexDirection: 'row', height: 50 }}>
                                <View style={PAGESTYLE.colorLeftParent}>
                                    <View style={PAGESTYLE.colorSquare} />
                                    <Text style={PAGESTYLE.introText}>{`Engagement over${'\n'}last month`}</Text>
                                </View>
                                <View style={PAGESTYLE.colorRightParent}>
                                    <View style={PAGESTYLE.colorSquareRight} />
                                    <Text style={PAGESTYLE.introText}>{`Effort over last${'\n'}month`}</Text>
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <Text style={PAGESTYLE.bottomText}>Based on { }'s engagement and effort, he is doing well and is excelling. He is also very eager to learn and perticularly interested in Mathematics and Science subjects.</Text>
                        </View>
                    </View> */}
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

export default AddNewTeacher;