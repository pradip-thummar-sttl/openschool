import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../utils/Constant";
import Images from "../../../utils/Images";
import { User } from "../../../utils/Model";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { add, not } from "react-native-reanimated";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import MESSAGE from "../../../utils/Messages";

const ParentZoneProfileEdit = (props) => {
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
    const t6 = useRef(null);
    const t7 = useRef(null);
    const t8 = useRef(null);
    const t9 = useRef(null);
    const t10 = useRef(null);
    const t11 = useRef(null);
    const t12 = useRef(null);
    const t13 = useRef(null);
    const t14 = useRef(null);

    const [profileData, setProfileData] = useState(props.data);
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
    const [childPass, setChildPass] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        setPupilId(profileData.Pupilid)
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDob(moment(profileData.Dob).format('DD/MM/yyyy'))
        setProfile(profileData.ProfilePicture)
        setUniqueCode(profileData.UniqueNumber)
        setNote(profileData.Note)
        setRelation(profileData.Relationship)
        setCode(profileData.PinPassword)
        setParentName(profileData.ParentFirstName + ' ' + profileData.ParentLastName)
        setMobile(profileData.MobileNumber + '')
        setChildEmail(profileData.Email)
        setAdd1(profileData.AddressLine1)
        setAdd2(profileData.AddressLine2)
        setCity(profileData.City)
        setZip(profileData.PostCode)

        console.log('baseUrl + profile', baseUrl + profile);
    }, [profileData])

    const validateFields = () => {
        if (!firstName.trim()) {
            showMessage(MESSAGE.firstName)
            return false
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName)
            return false
        } else if (!dob.trim()) {
            showMessage(MESSAGE.selectDOB)
            return false
        } else if (!relation.trim()) {
            showMessage(MESSAGE.relation)
            return false
        } else if (!code.trim()) {
            showMessage(MESSAGE.passCode)
            return false
        } else if (!parentName.trim()) {
            showMessage(MESSAGE.parentNAme)
            return false
        } else if (!childPass.trim()) {
            showMessage(MESSAGE.childPassword)
            return false
        }

        saveProfile()
    }

    const saveProfile = () => {
        setLoading(true)

        let data = {
            FirstName: firstName,
            LastName: lastName,
            ParentFirstName: parentName,
            ParentLastName: '',
            Dob: moment(dob, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            Note: note,
            Relationship: relation,
            AddressLine1: add1,
            AddressLine2: add2,
            City: city,
            PostCode: zip,
            MobileNumber: mobile,
            PinPassword: code,
            Password: childPass,
            UpdatedBy: pupilId
        }

        console.log('postData', data);

        Service.post(data, `${EndPoints.UpdateParent}/${pupilId}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                uploadProfile()
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const uploadProfile = () => {
        if (!profileUri) {
            showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                props.navigateToProfile()
            })
            setLoading(false)
            return
        }

        let data = new FormData();
        let ext = profileUri.uri.split('.');

        data.append('materiallist', {
            uri: profileUri.uri,
            name: profileUri.uri.split('/'),
            type: 'image/' + (ext.length > 0 ? ext[1] : 'jpeg')
        });

        console.log('data', data._parts, lessionId);

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.profileUpdated, () => {
                    props.navigateToProfile()
                })
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })

    }

    const setPinVisibility = () => {
        setPinHide(!isPindHide)
    }

    const setPasswordVisibility = () => {
        setPasswordide(!isPasswordHide)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
        setDob(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
    };

    showActionChooser = () => {
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
                setProfileUri(response.uri)
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
                setProfileUri(response.uri)
            }
        );
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.whiteBg}>
                            <View style={PAGESTYLE.managementDetail}>
                                <View style={PAGESTYLE.managementBlockTop}>
                                    <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                        <View style={PAGESTYLE.thumbTopUser}>
                                            <Image style={PAGESTYLE.thumbTopUser1} source={{ uri: !profileUri.uri ? baseUrl + profile : profileUri.uri }} />
                                            <Image style={PAGESTYLE.pzEditIcon} source={Images.editIcon} />
                                        </View>
                                        <View style={PAGESTYLE.topBannerParent}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => { validateFields() }}>
                                                <Text style={PAGESTYLE.topBannerBtn1}>Save Profile</Text>
                                            </TouchableOpacity>
                                        </View>
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
                                            style={STYLE.commonInput}
                                            value={firstName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
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
                                            style={STYLE.commonInput}
                                            value={lastName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setLastName(lastName)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Date of Birth</Text>
                                    <TouchableOpacity activeOpacity={opacity}
                                        onPress={() => showDatePicker()}>
                                        <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                            <Image source={Images.CalenderIconSmall} style={PAGESTYLE.dateIconSml} />
                                            <TextInput
                                                style={[STYLE.commonInput, PAGESTYLE.dateField]}
                                                placeholder="Select"
                                                editable={false}
                                                autoCapitalize={false}
                                                maxLength={40}
                                                value={dob}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                            />
                                            <Image source={Images.DropArrow} style={PAGESTYLE.dropArrow1} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Unique I.D (auto-generated)</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t3}
                                            onSubmitEditing={() => { t4.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={uniqueCode}
                                            editable={false}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setUniqueCode(uniqueCode)}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Notes</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t4}
                                            onSubmitEditing={() => { t5.current.focus(); }}
                                            style={[STYLE.commonInput, PAGESTYLE.textArea]}
                                            placeholder="You can leave notes here for the teacher such as special needs, behaviour, performance, things to discuss with teachers etc."
                                            value={note}
                                            autoCapitalize={'sentences'}
                                            multiline
                                            numberOfLines={4}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={note => setNote(note)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Relationship to pupil</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t5}
                                            onSubmitEditing={() => { t6.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={relation}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={relation => setRelation(relation)}
                                        />
                                        {/* <Image source={Images.DropArrow} style={PAGESTYLE.dropArrow} /> */}
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Set 4 digit passcode</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <View style={PAGESTYLE.eyeParent}>
                                            <TextInput
                                                placeholder="Password"
                                                autoCapitalize={'none'}
                                                ref={t6}
                                                onSubmitEditing={() => { t7.current.focus(); }}
                                                style={STYLE.commonInputPassword}
                                                value={code}
                                                maxLength={30}
                                                secureTextEntry={isPindHide}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={code => setCode(code)}
                                            />

                                            <View style={PAGESTYLE.eye}>
                                                <TouchableOpacity activeOpacity={opacity} onPress={() => setPinVisibility()}>
                                                    <Image
                                                        source={isPindHide ? Images.ShowPassword : Images.HidePassword} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Parent/Guardian Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t7}
                                            onSubmitEditing={() => { t10.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={parentName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={pName => setParentName(pName)}
                                        />

                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Contact tel.</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t8}
                                            onSubmitEditing={() => { t9.current.focus(); }}
                                            style={STYLE.commonInput}
                                            editable={false}
                                            value={mobile}
                                            keyboardType={'phone-pad'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={mobile => setMobile(mobile)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Associated email for child’s acc.</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t9}
                                            onSubmitEditing={() => { t10.current.focus(); }}
                                            style={STYLE.commonInput}
                                            editable={false}
                                            value={childEmail}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={email => setChildEmail(email)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Password</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <View style={PAGESTYLE.eyeParent}>
                                            <TextInput
                                                placeholder="Password"
                                                autoCapitalize={'none'}
                                                ref={t10}
                                                onSubmitEditing={() => { t11.current.focus(); }}
                                                style={STYLE.commonInputPassword}
                                                value={childPass}
                                                maxLength={30}
                                                secureTextEntry={isPasswordHide}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={pass => setChildPass(pass)}
                                            />

                                            <View style={PAGESTYLE.eye}>
                                                <TouchableOpacity activeOpacity={opacity} onPress={() => setPasswordVisibility()}>
                                                    <Image
                                                        source={isPasswordHide ? Images.ShowPassword : Images.HidePassword} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Address Line 1</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t11}
                                            onSubmitEditing={() => { t12.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={add1}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={add1 => setAdd1(add1)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Address Line 2</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t12}
                                            onSubmitEditing={() => { t13.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={add2}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={add2 => setAdd2(add2)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>City</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t13}
                                            onSubmitEditing={() => { t14.current.focus(); }}
                                            style={STYLE.commonInput}
                                            value={city}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={city => setCity(city)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Postcode</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={t14}
                                            style={STYLE.commonInput}
                                            value={zip}
                                            keyboardType={'phone-pad'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={zip => setZip(zip)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </View>
    );
}
export default ParentZoneProfileEdit;