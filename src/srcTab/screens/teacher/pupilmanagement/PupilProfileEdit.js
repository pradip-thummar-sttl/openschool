import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './ProfileEditStyle';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { add, not } from "react-native-reanimated";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import MESSAGE from "../../../../utils/Messages";
import EditProfileTop_Tablet from "../../../../svg/pupil/parentzone/EditProfileTopBg_Tablet";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderPMInnerEdit from './HeaderPMInnerEdit'
import Ic_Calendar from "../../../../svg/pupil/parentzone/Ic_Calendar";


const PupilProfileEdit = (props) => {
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [isPindHide, setPinHide] = useState(true);
    const [isPasswordHide, setPasswordide] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);
    const t4 = useRef(null);
    const t5 = useRef(null);


    const [profileData, setProfileData] = useState(props.route.params.item);
    const [pupilId, setPupilId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profile, setProfile] = useState('')
    const [profileUri, setProfileUri] = useState('')
    const [dob, setDob] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [note, setNote] = useState('');
    const [relation, setRelation] = useState('');
    const [code, setCode] = useState('');
    const [parentName, setParentName] = useState('');
    const [mobile, setMobile] = useState('');
    const [childEmail, setChildEmail] = useState('');



    useEffect(() => {

        console.log('----item-----', props.route.params.item)
        console.log('-----profileUri-------', profileUri)

        setPupilId(profileData.Pupilid)
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDob(moment(profileData.Dob).format('DD/MM/yyyy'))
        // setProfile(profileData.ProfilePicture)
        setUniqueCode(profileData.UniqueNumber)
        setNote(profileData.Note)
        setMobile(profileData.MobileNumber + '')
        setChildEmail(profileData.Email)

    }, [profileData])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
        console.log('call')
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDob(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
    };

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


    const saveProfile = () => {
        setLoading(true)

        Service.get(EndPoints.GetAllUserType, (res) => {

            if (res.flag) {
                var userData = res.data
                var userType = ""
                console.log('userData', userData);

                setLoading(false)

                userData.map((item) => {
                    if (item.Name === 'Pupil') {
                        userType = item._id
                    }
                })

                let data = {
                    FirstName: firstName,
                    LastName: lastName,
                    Dob: moment(dob, 'DD/MM/yyyy').format('yyyy-MM-DD'),
                    Note: note,
                    ParentFirstName: profileData.ParentFirstName,
                    ParentLastName: profileData.ParentLastName,
                    UserTypeId: userType,
                    IsInvited: false,
                    Email: profileData.Email,
                    MobileNumber: profileData.MobileNumber,
                    UpdatedBy: User.user._id,
                }

                console.log('postData', User.user.UserDetialId, data);

                Service.post(data, `${EndPoints.PupilUpdate}/${profileData.PupilId}`, (res) => {
                    if (res.code == 200) {
                        console.log('response of save lesson', res)
                        uploadProfile(res.data)
                    } else {
                        showMessage(res.message)
                        setLoading(false)
                    }
                }, (err) => {
                    console.log('response of get all lesson error', err)
                    setLoading(false)
                })

            } else {
                setLoading(false)
                showMessage(res.message)
            }

        }, (err) => {
            console.log('error ', err)
            setLoading(false)

        })

    }

    const uploadProfile = (updatedData) => {

        if (!profileUri) {
            showMessageWithCallBack(MESSAGE.profileUpdated, () => {
            })
            props.route.params.onGoBack()
            props.navigation.goBack()
            setLoading(false)
            return
        }

        let data = new FormData();
        let ext = profileUri.uri.split('.');

        data.append('file', {
            uri: profileUri.uri,
            name: 'pupilprofile.' + (ext.length > 0 ? ext[ext.length - 1] : 'jpeg'),
            type: 'image/' + (ext.length > 0 ? ext[ext.length - 1] : 'jpeg')
        });

        console.log('data', data._parts, ext, profileUri.uri);

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${profileData.PupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                })
                props.route.params.onGoBack()
                props.navigation.goBack()
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

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <HeaderPMInnerEdit
                    onGoBack={() => props.navigation.goBack()}
                    onPressSave={() => saveProfile()}
                />
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <View style={PAGESTYLE.profile}>
                                <View style={PAGESTYLE.managementBlockTop}>
                                    <ImageBackground style={PAGESTYLE.managementopImage}>
                                        <EditProfileTop_Tablet style={{ position: 'absolute' }} height={'100%'} width={'100%'} />
                                        <View style={[PAGESTYLE.thumbTopUser]}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                style={{ alignItems: 'center'}}
                                                onPress={() => showActionChooser()}>
                                                <Image style={PAGESTYLE.thumbTopUser1} source={{ uri: !profileUri.uri ? baseUrl + profileData.ProfilePicture : profileUri.uri }} />
                                                {/* <Image style={PAGESTYLE.pzEditIcon} source={Images.editIcon} /> */}
                                                <View style={PAGESTYLE.pzEditIcon}><Ic_Edit style={PAGESTYLE.pzEditIconIcon} width={hp(2.25)} height={hp(2.25)} /></View>
                                            </TouchableOpacity>
                                        </View>
                                        {/* <View style={PAGESTYLE.topBannerParent}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => { validateFields() }}>
                                                <Text style={PAGESTYLE.topBannerBtn1}>Save Profile</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, PAGESTYLE.formTopSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t1}
                                            onSubmitEditing={() => { t2.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            value={firstName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.menuLightFonts}
                                            onChangeText={firstName => setFirstName(firstName)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Last Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t2}
                                            onSubmitEditing={() => { t4.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            value={lastName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.menuLightFonts}
                                            onChangeText={lastName => setLastName(lastName)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View style={{
                                    marginBottom: hp(3),
                                    position: 'relative',
                                }}>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Date of Birth</Text>
                                    <TouchableOpacity
                                        style={{ width: '100%' }}
                                        onPress={() => showDatePicker()}>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <View style={[STYLE.commonInputGrayBack, { justifyContent: 'center' }]}>
                                                <Text>{dob}</Text>
                                            </View>
                                            <Ic_Calendar style={PAGESTYLE.calIcon} height={hp(2)} width={hp(2)} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* 
                                <View style={{
                                    marginBottom: hp(3),
                                    position: 'relative',
                                }}>
                                    <Text LABLE style={PAGESTYLE.labelForm}>Date of Birth</Text>
                                    <TouchableOpacity activeOpacity={opacity}
                                        onPress={() => showDatePicker()}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            style={[PAGESTYLE.commonInput, PAGESTYLE.dateField]}
                                            placeholder="Date of Birth"
                                            autoCapitalize={'none'}
                                            editable={false}
                                            maxLength={40}
                                            value={dob}
                                            placeholderTextColor={COLORS.menuLightFonts} />
                                        <Ic_Calendar style={PAGESTYLE.calIcon} height={hp(2)} width={hp(2)} />
                                    </TouchableOpacity>
                                </View> */}

                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Unique I.D (auto-generated)</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t3}
                                            onSubmitEditing={() => { t4.current.focus(); }}
                                            style={PAGESTYLE.commonInput}
                                            value={uniqueCode}
                                            editable={false}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            editable={false}
                                            placeholderTextColor={COLORS.menuLightFonts}
                                            onChangeText={lastName => setUniqueCode(uniqueCode)}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, PAGESTYLE.bottomSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Notes</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t4}
                                            onSubmitEditing={() => { t5.current.focus(); }}
                                            style={[PAGESTYLE.commonInput, PAGESTYLE.textArea]}
                                            placeholder="You can leave notes here for the teacher such as special needs, behaviour, performance, things to discuss with teachers etc."
                                            value={note}
                                            autoCapitalize={'sentences'}
                                            multiline
                                            numberOfLines={4}
                                            placeholderTextColor={COLORS.menuLightFonts}
                                            onChangeText={note => setNote(note)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}
export default PupilProfileEdit;