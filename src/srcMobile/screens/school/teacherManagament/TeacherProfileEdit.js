import React, { useState, useEffect, useRef } from "react";
import {  View, Text, TouchableOpacity, ScrollView, Image, FlatList, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import MESSAGE from '../../../../utils/Messages';
import PAGESTYLE from './ProfileStyle';
import { TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import HeaderPTInnerEdit from "./HeaderPTInnerEdit";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import { MenuOption, Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";

const TeacherProfileEdit = (props) => {
    const item = props.route.params.item;
    const [isFirstName, setFirstName] = useState();
    const [isLastName, setLastName] = useState();
    const [isProfileUri, setProfileUri] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isListOfYear, setListOfYear] = useState([])
    const [isYearTitle, setYearTitle] = useState('')
    const [status, setStatus] = useState('')
    const [teacherCountData, setTeacherCountData] = useState([])
    const [isListOfTitle, setListOfTitle] = useState([])
    const [isTitle, setTitle] = useState('')
    const [isUserTypeid, setUserType] = useState('')

    useEffect(() => {
        setYearTitle(item?.TeachingYear);
        setTitle(item?.TitleName);
        setFirstName(item?.FirstName);
        setLastName(item?.LastName);

    }, [])

    useEffect(() => {
        loadTeachingYear();
        loadTitle();
        getUserType();
    }, []);



    const loadTeachingYear = () => {
        Service.get(`${EndPoints.TeachingYear}`, (res) => {
            if (res.code == 200) {
                setListOfYear(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
        })
    }

    const loadTitle = () => {
        Service.get(`${EndPoints.Title}`, (res) => {
            if (res.code == 200) {
                setListOfTitle(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
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

    const getSelectYeasr = () => {
        let id = '';
        isListOfYear.forEach(element => {
            if (element.Title == isYearTitle) {
                id = element._id;
            }
        });
        return id;
    }

    const getSelectTitle = () => {
        let id = '';
        isListOfTitle.forEach(element => {
            if (element.Title == isTitle) {
                id = element._id;
            }
        });
        return id;
    }

    const validateFields = () => {
        if (!isFirstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!isLastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        }
        saveProfile();
    }

    const saveProfile = () => {
        let data = {
            SchoolId: User.user.UserDetialId,
            Title: getSelectTitle(),
            FirstName: isFirstName,
            LastName: isLastName,
            Email: item?.Email,
            UserTypeId: isUserTypeid,
            ProfilePicture: '',
            UniqueNumber: item?.UniqueNumber,
            TeachingYear: getSelectYeasr(),
            IsInvited: 'true',
            CreatedBy: User.user.UserDetialId,
        }

        Service.post(data, `${EndPoints.TeacherProfileEdit}/${item?.TeacherId}`, (res) => {
            if (res.code == 200) {
                uploadProfile(res.data._id)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
        })
    }

    const uploadProfile = (teacherId) => {
        if (!isProfileUri) {
            setLoading(false)
           
            showMessageWithCallBack(MESSAGE.updateTeacherProfile, ()=>{
                props.navigation.goBack();
            })
            return
        }

        let data = new FormData();
        data.append('file', {
            uri: isProfileUri.uri,
            name: isProfileUri.fileName,
            type: isProfileUri.type
        });

        Service.postFormData(data, `${EndPoints.TeacherUploadProfile}/${teacherId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                showMessageWithCallBack(MESSAGE.updateTeacherProfile, ()=>{
                    props.navigation.goBack();
                })
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
                setProfileUri(response)
            }
        );
    }

    const yearDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.labelForm}>Teaching Year</Text>

                <Menu onSelect={(item) => setYearTitle(item.Title)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown1]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{isYearTitle}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>

                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={isListOfYear}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.Title}></MenuOption>
                            )} style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const onTitleDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.labelForm}>Title</Text>
                <Menu onSelect={(item) => setTitle(item.Title)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown1]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{isTitle}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={isListOfTitle}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.Title}></MenuOption>
                            )}
                            style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    }

    return (
        <View>
            <HeaderPTInnerEdit
                navigateToBack={() => props.navigation.goBack()}
                onSavePressed={() => validateFields()}
                openNotification={() => props.openNotification()}
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>

                    <View style={PAGESTYLE.profileImageArea}>
                        <View style={PAGESTYLE.coverImage}>
                            <TopBackImg  height={hp(13.8)} width={'100%'} />
                        </View>
                        <View style={PAGESTYLE.profileOuter} >
                            <Image style={PAGESTYLE.profileImage}
                                source={{ uri: !isProfileUri.uri ? baseUrl + item?.ProfilePicture : isProfileUri.uri }} />
                            <TouchableOpacity style={PAGESTYLE.editprofileStyl} activeOpacity={opacity} onPress={() => showActionChooser()}>
                                <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={PAGESTYLE.mainDetailsForm}>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            {onTitleDropDown()}
                        </View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>First Name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="First Name"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={isFirstName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={isFirstName => setFirstName(isFirstName)}
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
                                value={isLastName}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={lastName => setLastName(lastName)}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            {yearDropDown()}
                        </View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={item?.UniqueNumber}
                                editable={false}
                                placeholderTextColor={COLORS.menuLightFonts}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Email</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Email"
                                autoCapitalize={'none'}
                                maxLength={40}
                                editable={false}
                                value={item?.Email}
                                placeholderTextColor={COLORS.menuLightFonts}
                            />
                        </View>
                    </View>
                    <View HR style={STYLE.hrCommon}></View>
                </ScrollView>
            </View>
        </View>
    );
}

export default TeacherProfileEdit;