import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
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
import { baseUrl, emailValidate, opacity } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/login/ArrowDown";

const { CallModule } = NativeModules;

const SAddNewTeacher = (props) => {
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

    const myref = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
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

    const teacherDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Assigned Teacher</Text>
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
                OnSaveEdit={() => validateFields()}

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
                                onChangeText={firstName => setLastName(firstName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Date of Birth</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Email"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={selectedDate}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={firstName => setSelectedDate(firstName)}
                            />
                            {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                        </View>
                        <View>
                                    {teacherDropDown()}
                                </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={""}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Assigned Teacher</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
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
                                style={STYLE.commonInputGrayBack}
                                placeholder="First Name"
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
                                style={STYLE.commonInputGrayBack}
                                placeholder="Last Name"
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
                                style={STYLE.commonInputGrayBack}
                                placeholder="Last Name"
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
                    {/* <View HR style={STYLE.hrCommon}></View> */}

                    <View HR style={STYLE.hrCommon}></View>
                    <View style={PAGESTYLE.pupilPerfomanceEdit}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Teacher Insights</Text>
                        {/* <Image style={PAGESTYLE.pupilEditGraph} source={Images.pupilEditGrpahImage}></Image> */}
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
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default SAddNewTeacher;