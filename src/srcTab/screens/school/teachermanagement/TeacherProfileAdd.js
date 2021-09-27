import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, PixelRatio, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
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

const TeacherProfileAdd = (props) => {
    const [isHide, action] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [teachingYear, setTeachingYear] = useState('');
    const [email, setEmail] = useState('');
    const [profileUri, setProfileUri] = useState('')
    const [isLoading, setLoading] = useState(false)

    const t1 = useRef(null);
    const t2 = useRef(null);
    const t3 = useRef(null);
    const t4 = useRef(null);

    useEffect(()=> {
        let w = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width)
        let h = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height)
        let d = Math.sqrt(w*w + h*h)
        let density = PixelRatio.get()
        let ppi = 160 * density
        let inches = d / ppi
        console.log('inchs', inches, d, ppi, Math.ceil(d), w, h);
    }, [])

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
        }

        saveProfile()
    }

    const saveProfile = () => {
        // setLoading(true)

        let data = {
            FirstName: firstName,
            LastName: lastName,
            TeachingYear: '',
            Email: '',
        }

        Service.post(data, `${EndPoints.UpdateParent}/${pupilId}`, (res) => {
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
    }

    const uploadProfile = (updatedData) => {
        if (!profileUri) {
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

        Service.postFormData(data, `${EndPoints.PupilUploadProfile}/${pupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
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
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInnerAdd
                navigateToBack={() => props.navigateToBack()}
                tabIndex={(index) => { setTabSelected(index) }} />

            <View style={{ width: isHide ? '100%' : '100%', }}>
                <View style={PAGESTYLE.whiteBg}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                {/* <ImageBackground style={PAGESTYLE.managementopImage} > */}
                                <TopBackImg style={PAGESTYLE.managementopImage} width={'100%'} />
                                <View style={PAGESTYLE.thumbTopUser}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => showActionChooser()}>
                                        <Image style={{ height: '100%', width: '100%', borderRadius: 100 }}
                                            source={{ uri: !profileUri.uri ? baseUrl : profileUri.uri }} />
                                        <Ic_Edit style={PAGESTYLE.pzEditIcon} width={hp(2.30)} height={hp(2.30)} />
                                    </TouchableOpacity>
                                </View>
                                <View style={PAGESTYLE.topBannerParent}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { validateFields() }}>
                                        <Text style={PAGESTYLE.topBannerBtn1}>Send Invite</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <TouchableOpacity>
                                                <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>Edit Profile</Text>
                                            </TouchableOpacity> */}
                                {/* </ImageBackground> */}
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, { marginTop: 50 }]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Teaching Year</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            value={teachingYear}
                                            placeholderTextColor={COLORS.darkGray}
                                        />
                                    </View>
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
                                            maxLength={40}
                                            value={email}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={email => setEmail(email)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Unique ID (auto-generated)</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            ref={t4}
                                            returnKeyType={"done"}
                                            style={PAGESTYLE.commonInput}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
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