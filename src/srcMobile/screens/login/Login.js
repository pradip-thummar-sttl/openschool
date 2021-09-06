import React, { Component } from 'react';
import { NativeModules, View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
// import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../../utils/Colors';
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Images from '../../../utils/Images';
import { opacity, showMessage, isDesignBuild, isRunningFromVirtualDevice, emailValidate } from '../../../utils/Constant';
import { Service } from '../../../service/Service';
import { EndPoints } from '../../../service/EndPoints';
import { connect } from 'react-redux';
import { setUserAuthData } from '../../../actions/action';
import MESSAGE from '../../../utils/Messages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../../../utils/Model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getModel, getSystemVersion, getBrand } from 'react-native-device-info';
import MobileLoginSideimg from '../../../svg/teacher/login/MobileLoginSideimg';
import PupilMobileLoginSideimg from '../../../svg/teacher/login/PupilMobileLoginSideimg';
import TeacherMobileLoginSideimg from '../../../svg/teacher/login/TeacherMobileLoginSideimg';
import ShowPassword from '../../../svg/teacher/login/ShowPassword';
import HidePassword from '../../../svg/teacher/login/HidePassword';

const { LoginModuleIos, LoginModule } = NativeModules;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            PushToken: "Test",
            Device: getBrand() + ', ' + getModel() + ', ' + getSystemVersion(),
            OS: Platform.OS,
            AccessedVia: "Mobile",
            isLoading: false,
            isPasswordHide: true,
            isRemember: false
        }
    }

    componentDidMount() {
        const { userName, password, PushToken, Device, OS, AccessedVia, isRemember } = this.state;
        if (this.props.route.params.userType == 'Pupil') {
            AsyncStorage.getItem('pupil').then((value) => {
                if (value) {
                    var user = JSON.parse(value)
                    if (user.isRemember) {
                        console.log('user of async', user)

                        this.setState({
                            userName: user.Email,
                            password: user.Password,
                            PushToken: user.PushToken,
                            Device: user.Device,
                            OS: user.OS,
                            AccessedVia: user.AccessedVia,
                            isRemember: user.isRemember
                        })
                        this.isFieldsValidated()
                    } else {
                    }
                }

            })
        } else {
            AsyncStorage.getItem('user').then((value) => {
                if (value) {
                    var user = JSON.parse(value)
                    if (user.isRemember) {
                        console.log('user of async', user, value)

                        this.setState({
                            userName: user.Email,
                            password: user.Password,
                            PushToken: user.PushToken,
                            Device: user.Device,
                            OS: user.OS,
                            AccessedVia: user.AccessedVia,
                            isRemember: user.isRemember
                        })
                        this.isFieldsValidated()
                    } else {
                    }
                }

            })
        }
        if (isRemember) {


        }

    }

    isFieldsValidated = () => {
        const { userName, password, PushToken, Device, OS, AccessedVia, isRemember } = this.state;

        if (!userName || !emailValidate(userName)) {
            showMessage(MESSAGE.email)
            return false;
        } else if (!password) {
            showMessage(MESSAGE.password);
            return false;
        }

        this.setLoading(true)
        Service.get(EndPoints.GetAllUserType, (res) => {

            if (res.flag) {
                var userData = res.data
                var userType = ""
                userData.map((item) => {
                    if (item.Name === this.props.route.params.userType) {
                        userType = item._id
                    }
                })

                var data = {
                    Email: userName,
                    Password: password,
                    PushToken: PushToken,
                    Device: Device,
                    OS: OS,
                    AccessedVia: AccessedVia,
                    UserType: userType
                }

                Service.post(data, EndPoints.Login, (res) => {
                    if (res.code == 200) {
                        data.isRemember = isRemember
                        User.user = res.data

                        if (isRunningFromVirtualDevice) {
                            this.updateUserID('RUNNIN_FROM_VIRTUAL_DEVICE', res.data, data)
                        } else {
                            if (Platform.OS == 'android') {
                                this.getDataFromQuickBlox_Android(userName, password, res.data, data)
                            } else if (Platform.OS == 'ios') {
                                this.getDataFromQuickBlox_IOS(userName, password, res.data, data)
                            }
                        }
                    } else {
                        this.setLoading(false)
                        showMessage(res.message)
                    }
                }, (err) => {
                    this.setLoading(false)
                    console.log('response Login error', err)
                })
            } else {
                this.setLoading(false)
                showMessage(res.message)
            }

        }, (err) => {
            console.log('error ', err)
            this.setLoading(false)

        })
    }

    getDataFromQuickBlox_Android = (emailId, password, resData, reqData) => {
        try {
            let roomIDs = []
            if (this.props.route.params.userType == 'Pupil') {
                resData.RoomId.forEach(element => {
                    roomIDs.push(element.RoomId)
                });
            } else {
                roomIDs.push(resData.RoomId)
            }
            console.log('roomIDs', roomIDs, emailId, password);

            LoginModule.qbLogin(emailId, password, roomIDs, (error, ID) => {
                console.log('error:eventId', error, ID);
                this.updateUserID(ID, resData, reqData)
            }
            );
        } catch (e) {
            console.error(e);
        }
    };

    getDataFromQuickBlox_IOS = (emailId, password, resData, reqData) => {
        let roomIDs = []
        if (this.props.route.params.userType == 'Pupil') {
            resData.RoomId.forEach(element => {
                roomIDs.push(element.RoomId)
            });
        } else {
            roomIDs.push(resData.RoomId)
        }
        console.log('roomIDs', roomIDs);

        LoginModuleIos.signUpWithFullName(emailId, roomIDs, password, (ID) => {
            console.log('log for event', ID);
            this.updateUserID(ID, resData, reqData)
        }, (error) => {
            console.log('log for error', error);
        })
    };

    updateUserID(ID, resData, reqData) {
        if (ID && ID != '' && ID != null && ID != undefined) {
            console.log('QBUserId', ID, resData.RoomId);

            if (ID == resData.QBUserId) {
                this.setLoading(false)
                this.launchNextScrren(resData, reqData)
                return
            }

            var data = {
                UserId: resData._id,
                QBUserId: ID
            }

            console.log('data', data);
            Service.post(data, EndPoints.SetQBUserId, (res) => {
                this.setLoading(false)
                console.log('res', res);
                if (res.code == 200) {
                    this.launchNextScrren(resData, reqData)
                }
            }, (err) => {
                this.setLoading(false)
                console.log('response Login error', err)
            })
        } else {
            this.setLoading(false)
            showMessage('Sorry, we are unable to login! Please try again.')
        }
    }

    launchNextScrren(res, data) {
        if (this.props.route.params.userType == 'Pupil') {
            AsyncStorage.setItem('pupil', JSON.stringify(data))
        } else {
            AsyncStorage.setItem('user', JSON.stringify(data))
        }
        this.props.setUserAuthData(res)
        if (res.UserType === "Teacher") {
            this.props.navigation.replace('TeacherDashboard')
        } else if (res.UserType === "Pupil") {
            if (res.SchoolId == undefined || res.SchoolId == null || res.SchoolId == '') {
                this.props.navigation.replace('PupilConnect', { UserDetialId: res.UserDetialId })
            } else {
                this.props.navigation.replace('ParentZoneSwitch')
            }
        } else {
            this.props.navigation.replace('PupuilDashboard')
        }
        // this.props.navigation.replace('LessonandHomeworkPlannerDashboard')
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    setPasswordVisibility = () => {
        this.setState({ isPasswordHide: !this.state.isPasswordHide });
    }
    state = { isEmailFocused: false, isPasswordFocus: false };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    {this.props.route.params.userType == 'Pupil' ?
                        // <Image source={Images.loginMainBack} style={styles.image}></Image>
                        <PupilMobileLoginSideimg style={styles.image} width={wp(100)} height={Platform.OS == "android" ? '107.5%' : '100%'} />
                        :
                        <TeacherMobileLoginSideimg style={styles.image} width={wp(100)} height={Platform.OS == "android" ? '107.5%' : '100%'} />
                        // <Image source={Images.loginMainBackteacher} style={styles.image}></Image>
                    }
                </View>
                <View style={styles.rightContent}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                        <Text h3 style={styles.titleLogin}>{this.props.route.params.userType == 'Teacher' || this.props.route.params.userType == 'School' ? 'Teacher Login' : 'Pupil Login'}</Text>
                        <View style={styles.loginForm}>
                            <View style={styles.field}>
                                <Text style={styles.labelInput}>Email</Text>
                                <TextInput
                                    onFocus={() => this.setState({ isEmailFocused: true })}
                                    onBlur={() => this.setState({ isEmailFocused: false })}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.t2.focus(); }}
                                    style={{ ...STYLE.commonInput, borderColor: (this.state.isEmailFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                    placeholder="Enter email"
                                    autoCapitalize={'none'}
                                    maxLength={40}
                                    value={this.state.userName}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={userName => this.setState({ userName })} />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.labelInput}>Password</Text>
                                <View style={styles.eyeParent}>
                                    <TextInput
                                        onFocus={() => this.setState({ isPasswordFocus: true })}
                                        onBlur={() => this.setState({ isPasswordFocus: false })}
                                        ref={(input) => { this.t2 = input; }}
                                        placeholder="Password"
                                        value={this.state.password}
                                        autoCapitalize={'none'}
                                        maxLength={30}
                                        style={{ ...STYLE.commonInputPassword, borderColor: (this.state.isPasswordFocus) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                        placeholderTextColor={COLORS.menuLightFonts}
                                        secureTextEntry={this.state.isPasswordHide}
                                        onChangeText={password => this.setState({ password })} />

                                    <View style={styles.eye}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => this.setPasswordVisibility()}>
                                            {
                                                this.state.isPasswordHide ?
                                                    <ShowPassword style={styles.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                                    : <HidePassword style={styles.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                            }
                                            {/* <Image
                                                style={styles.viewIcon} source={this.state.isPasswordHide ? Images.ShowPassword : Images.HidePassword} /> */}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottomLoginFeild}>
                                <View style={styles.rememberFeild}>
                                    <CheckBox
                                        tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                        style={STYLE.checkBoxcommon1}
                                        value={this.state.isRemember}
                                        boxType={'square'}
                                        onCheckColor={COLORS.white}
                                        onTintColor={COLORS.checkBlue}
                                        tintColor={COLORS.checkBlue}
                                        onFillColor={COLORS.checkBlue}
                                        onChange={() => this.setState({ isRemember: !this.state.isRemember })}
                                    />
                                    <Text style={styles.label}>Remember Me</Text>
                                </View>
                                <View style={styles.forgotLink}>
                                    <Text style={styles.forgotPass} onPress={() => null}>Forgot Password?</Text>
                                </View>
                            </View>
                            <View style={styles.loginButtonView}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => {
                                        isDesignBuild ?
                                            this.props.navigation.replace('TeacherDashboard')
                                            :
                                            this.isFieldsValidated()

                                    }}>
                                    {this.state.isLoading ?
                                        <ActivityIndicator
                                            style={STYLE.fullWidthPrimaryButton}
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.white} />
                                        :
                                        <Text
                                            style={{ ...STYLE.fullWidthPrimaryButton, textTransform: 'uppercase', }}>Login to Continue</Text>
                                    }
                                </TouchableOpacity>
                                <View style={styles.getStarted}>
                                    {this.props.route.params.userType == 'Pupil' ?
                                        <>
                                            <Text style={styles.getStartedText}>New to MyEd Open School?</Text>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => {
                                                    this.props.navigation.replace('PupilRegister', { userType: "Pupil" })
                                                }}>
                                                <Text style={styles.getStartedLink}> Get Started</Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomLoginIntro}>
                            {this.props.route.params.userType == 'Pupil' ?
                                <>
                                    <Text style={STYLE.commonFonts}>Our Terms & Conditions and Privacy Policy</Text>
                                    <Text style={STYLE.commonFontsPuple}>By clicking ‘Create My Account’, I agree to MyEd’s Terms, and Privacy Policy</Text>
                                </>
                                :
                                <>
                                    <Text style={STYLE.commonFonts}>You can’t create an account in the app.</Text>
                                    <Text style={STYLE.commonFontsPuple}>Head over to our website to register and come back when you’ve made an account.</Text>
                                </>
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUserAuthData: (data) => dispatch(setUserAuthData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
const styles = StyleSheet.create({
    getStarted: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
    },
    getStartedText: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    getStartedLink: {
        color: COLORS.dashboardGreenButton,
        fontSize: hp(1.8),
        fontFamily: FONTS.fontRegular,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    lefImage: {
        width: '100%',
        height: hp(28),
        position: 'relative',
        overflow: 'hidden',
    },
    rightContent: {
        width: '100%',
        flex: 1,
    },
    titleLogin: {
        color: COLORS.darkGray,
        fontSize: hp(2.46),
        marginBottom: hp(2),
        marginTop: hp(4.3),
        paddingLeft: hp(2),
        fontFamily: FONTS.fontBold,
    },
    loginForm: {
        paddingLeft: hp('2%'),
        paddingRight: hp('2%'),
    },
    field: {
        position: 'relative',
        marginBottom: hp('2.0%'),
    },
    userIcon: {
        position: 'absolute',
        top: Platform.OS == 'android' ? hp(2.5) : hp(2),
        left: Platform.OS == 'android' ? hp(2.75) : hp('3%'),
        resizeMode: 'contain',
        width: Platform.OS == 'android' ? hp(2) : hp(1.7),
        height: Platform.OS == 'android' ? hp(2.3) : hp(2),
    },
    viewIcon: {
        resizeMode: 'contain',
        width: hp(2.5),
        height: hp(8)
    },
    viewIconParent: {
        position: 'absolute',
        top: hp(0),
        right: hp('3%'),
        resizeMode: 'contain',
        width: hp(2.5),
        height: hp(8)
    },
    bottomLoginFeild: {
        flexDirection: 'row',
        marginLeft: hp(0.5),
    },
    rememberFeild: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    },
    forgotLink: {
        width: '50%',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: hp('1.8%'),
        color: COLORS.darkGray,
        lineHeight: hp('3.0%'),
        marginLeft: Platform.OS == 'android' ? hp(2.0) : hp('1.0%'),
        fontFamily: FONTS.fontRegular,
        top: Platform.OS == 'android' ? hp(0.35) : hp(0),
    },
    forgotPass: {
        fontSize: hp(1.62),
        color: COLORS.dashboardGreenButton,
        lineHeight: hp('3.0%'),
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    loginButtonView: {
        marginTop: hp(5.7),
    },
    bottomLoginIntro: {
        top: Platform.OS == 'android' ? hp(2) : hp(6.15),
        paddingHorizontal: hp(2),
    },
    eye: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20
    },
    eyeParent: {
        justifyContent: 'center'
    },
    labelInput: {
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(0.8),
    },
});