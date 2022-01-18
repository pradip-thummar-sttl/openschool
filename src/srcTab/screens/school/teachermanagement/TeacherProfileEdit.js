import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, PixelRatio, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MESSAGE from "../../../../utils/Messages";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import PAGESTYLE from './StyleEditProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import Header from "./HeaderPMInnerEdit";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import FONTS from "../../../../utils/Fonts";

const TeacherProfileEdit = (props) => {
    const [isFirstName, setFirstName] = useState('');
    const [isLastName, setLastName] = useState('');
    const [isProfileUri, setProfileUri] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [isListOfYear, setListOfYear] = useState([])
    const [isYearTitle, setYearTitle] = useState('')

    const [isListOfTitle, setListOfTitle] = useState([])
    const [isTitle, setTitle] = useState('')

    const [isUserTypeid, setUserType] = useState('')

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);

    useEffect(() => {
        setYearTitle(props?.selectedTeacher?.TeachingYear);
        setTitle(props?.selectedTeacher?.TitleName);
        setFirstName(props?.selectedTeacher?.FirstName);
        setLastName(props?.selectedTeacher?.LastName);
    }, [props.selectedTeacher])

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

    const validateFields = () => {
       if (!isFirstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!isLastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } 
        saveProfile()
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

    const saveProfile = () => {
        let data = {
            SchoolId: User.user.UserDetialId,
            Title: getSelectTitle(),
            FirstName: isFirstName,
            LastName: isLastName,
            Email: props?.selectedTeacher?.Email,
            UserTypeId: isUserTypeid,
            ProfilePicture: '',
            UniqueNumber: props?.selectedTeacher?.UniqueNumber,
            TeachingYear: getSelectYeasr(),
            IsInvited: 'true',
            CreatedBy: User.user.UserDetialId,
        }

        Service.post(data, `${EndPoints.TeacherUpdate}/${props?.selectedTeacher?.TeacherId}`, (res) => {
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
            resetFeilds()
            showMessageWithCallBack(MESSAGE.updateTeacherProfile, ()=>{
                props.navigateToBack();
            });
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
                resetFeilds()
                showMessageWithCallBack(MESSAGE.updateTeacherProfile, ()=>{
                    props.navigateToBack();
                });
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

    const resetFeilds = () => {

    }

    const yearDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Teaching Year</Text>

                <Menu onSelect={(item) => setYearTitle(item.Title)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{isYearTitle}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>

                    <MenuOptions customStyles={{ optionText: { fontSize: 14 } }}>
                        <FlatList
                            data={isListOfYear}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 , fontFamily: FONTS.fontRegular,}} value={item} text={item.Title}></MenuOption>
                            )} style={{ height: 130 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const onTitleDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.fieldInputLabel}>Title</Text>
                <Menu onSelect={(item) => setTitle(item.Title)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{isTitle}</Text>
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize:14, } }}>
                        <FlatList
                            data={isListOfTitle}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 , fontFamily: FONTS.fontRegular}} value={item} text={item.Title}></MenuOption>
                            )}
                            style={{ height: 130 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    }

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
                                            source={{ uri: !isProfileUri.uri ? baseUrl + props?.selectedTeacher?.ProfilePicture : isProfileUri.uri }} />
                                        <View style={PAGESTYLE.editprofileStyl}>
                                            <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                 <View style={PAGESTYLE.btnSendView}>
                                    <TouchableOpacity style={PAGESTYLE.btnInnerSendView} activeOpacity={opacity} onPress={() => { validateFields() }}>
                                        <Text style={PAGESTYLE.btnSendTextView}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={PAGESTYLE.innerView}>
                                <View>
                                    {onTitleDropDown()}

                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                ref={t1}
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
                                                ref={t2}
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
                                        {yearDropDown()}
                                    </View>
                                </View>

                                <View>
                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>Uniquw I.D (Auto-generated)</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                ref={t1}
                                                onSubmitEditing={() => { t2.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                editable={false}
                                                value={props?.selectedTeacher?.UniqueNumber}
                                                placeholderTextColor={COLORS.darkGray}
                                                onChangeText={firstName => setFirstName(firstName)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp(2) }}>
                                        <Text style={PAGESTYLE.fieldInputLabel}>Email</Text>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <TextInput
                                                ref={t1}
                                                onSubmitEditing={() => { t2.current.focus(); }}
                                                style={PAGESTYLE.commonInput}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                editable={false}
                                                value={props?.selectedTeacher?.Email}
                                                placeholderTextColor={COLORS.darkGray}
                                                onChangeText={firstName => setFirstName(firstName)}
                                            />
                                        </View>
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
export default TeacherProfileEdit;