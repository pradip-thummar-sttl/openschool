import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import MESSAGE from '../../../../utils/Messages';
import { showMessage } from '../../../../utils/Constant';
import PAGESTYLE from './ProfileStyle';
import FONTS from '../../../../utils/Fonts';
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import HeaderPTInnerEdit from "./HeaderPTInnerEdit";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import { MenuOption, Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";


const { CallModule } = NativeModules;

const TeacherProfileEdit = (props) => {
    const item = props.route.params.item;
    console.log(']]]]]]]]]]',item);
    const [isFirstName, setFirstName] = useState();
    
    const [isLastName, setLastName] = useState();
    const [isProfileUri, setProfileUri] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [isListOfYear, setListOfYear] = useState([])
    const [isYearTitle, setYearTitle] = useState('')
    const [status,setStatus] = useState('')
    const [teacherCountData, setTeacherCountData] = useState([])

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

        Service.post(data, `${EndPoints.TeacherProfileEdit}/${props?.selectedTeacher?.TeacherId}`, (res) => {
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
        if (!isProfileUri) {
            setLoading(false)
            resetFeilds()
            showMessage(MESSAGE.updateTeacherProfile)
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
                showMessage(MESSAGE.updateTeacherProfile)
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
                <Text style={PAGESTYLE.fieldInputLabel}>Title</Text>
                <Menu onSelect={(item) => setTitle(item.Title)}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
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
                // onAlertPress={() => props.navigation.openDrawer()}
                onSavePressed={() => validateFields()}

                openNotification={() => props.openNotification()}
                // navigateToBack={() => props.navigateToBack()}
                // tabIndex={(index) => { setTabSelected(index) }} 
            />
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEdit} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image> */}
                            <TopBackImg style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />

                            <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage}></Image>
                                <TouchableOpacity onPress={() => showActionChooser()} style={PAGESTYLE.editProfileMain}>
                                    {/* <Image style={PAGESTYLE.editProfileIcon} source={Images.Edit} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsForm}>
                        {/* {onTitleDropDown()} */}
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
                            {/* <Text LABLE style={PAGESTYLE.labelForm}>Teaching Year</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Teaching Year"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={selectedYear}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={selectedYear => setSelectedYear(selectedYear)} /> */}
                            {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                        </View>

                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique I.D (auto-generated)</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique I.D (auto-generated)"
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={props?.selectedTeacher?.UniqueNumber}
                                editable={false}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={(uniqueNumber) => { setUniqueNumber(uniqueNumber) }}
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
                                value={props?.selectedTeacher?.Email}
                                placeholderTextColor={COLORS.menuLightFonts}
                                // onChangeText={(email) => { setEmail(email) }}
                            />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Status</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                autoCapitalize={'none'}
                                maxLength={40}
                                value={status}
                                editable={false}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={status => setStatus(status)}
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
                    <View HR style={STYLE.hrCommon}></View>
                   

                </ScrollView>
            </View>
        </View>
    );
}

export default TeacherProfileEdit;