import React, { Component } from 'react';
import { NativeModules, TouchableOpacity, View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
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
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { NotificationToken, User } from '../../../utils/Model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import { getModel, getSystemVersion, getBrand } from 'react-native-device-info';
import TabletLoginSideimg from '../../../svg/teacher/login/TabletLoginSideimg';
import TabletPupilLoginSideimg from '../../../svg/teacher/login/TabletPupilLoginSideimg';
import ShowPassword from '../../../svg/teacher/login/ShowPassword';
import HidePassword from '../../../svg/teacher/login/HidePassword';
import BackArrow from '../../../svg/common/BackArrow';

const { LoginModuleIos, LoginModule } = NativeModules;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            PushToken: NotificationToken.token.token,
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
            })
        } else if (this.props.route.params.userType == 'Teacher') {
            AsyncStorage.getItem('user').then((value) => {
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
            })
        } else {
            AsyncStorage.getItem('school').then((value) => {
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
            })
        }
        if (isRemember) {


        }

    }

    isFieldsValidated = () => {
        const { userName, password, PushToken, Device, OS, AccessedVia, isRemember } = this.state;

        if (!userName.trim() || !emailValidate(userName.trim())) {
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
                    Email: userName.trim(),
                    Password: password,
                    PushToken: PushToken,
                    Device: Device,
                    OS: OS,
                    AccessedVia: AccessedVia,
                    UserType: userType
                }
                console.log('data', data);

                Service.post(data, EndPoints.Login, (res) => {
                    console.log('response Login', res)

                    if (res.code == 200) {
                        data.isRemember = isRemember
                        User.user = res.data

                        if (isRunningFromVirtualDevice) {
                            this.updateUserID('RUNNIN_FROM_VIRTUAL_DEVICE', res.data, data)
                        } else {
                            console.log('call else method', Platform.OS)
                            if (Platform.OS === 'android') {
                                this.getDataFromQuickBlox_Android(userName, password, res.data, data)
                            } else if (Platform.OS === 'ios') {
                                // console.log('call else method')
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
            console.log('roomIDs', roomIDs);

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
        console.log(' call getDataFromQuickBlox_IOS',);
        var roomIDs = []
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
            AsyncStorage.setItem('type', "Pupil")
        } else if (this.props.route.params.userType == 'Teacher') {
            AsyncStorage.setItem('user', JSON.stringify(data))
            AsyncStorage.setItem('type', "Teacher")
        } else {
            AsyncStorage.setItem('school', JSON.stringify(data))
            AsyncStorage.setItem('type', "School")
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
            this.props.navigation.replace('SchoolDashboard')
        }
        // this.props.navigation.replace('LessonandHomeworkPlannerDashboard')
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    setPasswordVisibility = () => {
        this.setState({ isPasswordHide: !this.state.isPasswordHide });
    }

    onChild = () => {
        return (
            <>
                <Text h3 style={styles.titleLogin}>{this.props.route.params.userType == 'Teacher' || this.props.route.params.userType == 'School' ? 'Teacher & School Login' : 'Pupil Login'}</Text>
                <View style={styles.loginForm}>
                    <Text style={styles.fieldInputLabel}>Email</Text>
                    <View style={styles.field}>

                        <TextInput
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.t2.focus(); }}
                            style={STYLE.commonInput}
                            placeholder="Enter email"
                            autoCapitalize={false}
                            maxLength={40}
                            value={this.state.userName}
                            placeholderTextColor={COLORS.lightplaceholder}
                            onChangeText={userName => this.setState({ userName })} />
                    </View>
                    <Text style={styles.fieldInputLabel}>Password</Text>
                    <View style={styles.field}>
                        <View style={styles.eyeParent}>
                            <TextInput
                                ref={(input) => { this.t2 = input; }}
                                style={STYLE.commonInputPassword}
                                placeholder="Password"
                                value={this.state.password}
                                maxLength={30}
                                placeholderTextColor={COLORS.lightplaceholder}
                                secureTextEntry={this.state.isPasswordHide}
                                onChangeText={password => this.setState({ password })} />

                            <View style={styles.eye}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => this.setPasswordVisibility()}>
                                    {
                                        this.state.isPasswordHide ?
                                            <ShowPassword style={styles.password} height={hp(1.69)} width={hp(2.47)} />
                                            :
                                            <HidePassword style={styles.password} height={hp(1.69)} width={hp(2.47)} />
                                    }

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

                            }}
                            style={styles.LoginBtnText}
                            >
                            {this.state.isLoading ?
                                <ActivityIndicator
                                    // style={STYLE.commonButtonGreen}
                                    size={Platform.OS == 'ios' ? 'small' : 'small'}
                                    color={COLORS.white} />
                                :
                                <Text
                                    style={styles.commonButtonGreen}>Login to Continue</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.getStarted}>
                    {this.props.route.params.userType == 'Pupil' &&
                        <>
                            <Text style={styles.getStartedText}> New to MyEd Open School?</Text>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => {
                                    this.props.navigation.replace('PupilRegister', { userType: "Pupil" })
                                }}>
                                <Text style={styles.getStartedLink}> Get Started</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
                <View style={styles.bottomLoginIntro}>
                    <Text style={STYLE.commonFonts}>You can’t create an account in the app.</Text>
                    <Text style={STYLE.commonFontsPuple}>Head over to our website to register and come back when you’ve made an account.</Text>
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>

                    {this.props.route.params.userType == 'Pupil' ?
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Users')}
                                style={{ position: 'absolute', height: 20, width: 40, top: Platform.OS === 'android' ? 15 : 30, zIndex: 9, left: Platform.OS === 'android' ? 15 : 30 }}>
                            <BackArrow height={hp(2.67)} width={hp(2.33)} />
                            </TouchableOpacity>
                            <TabletPupilLoginSideimg style={styles.image} height={hp(102)} width={hp(67.2)} />
                        </View>


                        :
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Users')}
                                style={{ position: 'absolute', height: 20, width: 40, top: Platform.OS === 'android' ? 15 : 30, zIndex: 9, left: Platform.OS === 'android' ? 15 : 30 }}>

                                <BackArrow height={hp(2.67)} width={hp(2.33)} />

                            </TouchableOpacity>
                            <TabletLoginSideimg style={styles.image} height={hp(102)} width={hp(67.2)}
                            />
                        </View>
                    }
                </View>
                <View style={styles.rightContent}>
                    {
                        Platform.OS == "ios" ?
                            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                {this.onChild()}
                            </KeyboardAwareScrollView>
                            :
                            <KeyboardAvoidingView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                {this.onChild()}
                            </KeyboardAvoidingView>
                    }

                </View>
            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUserAuthData: (data) => dispatch(setUserAuthData(data)),
        setPupilAuthData: (data) => dispatch(setPupilAuthData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
const styles = StyleSheet.create({
    getStarted: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        marginLeft: hp('8.4%'),
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
        flexDirection: 'row',
    },
    image: {
        resizeMode: "cover",
        justifyContent: "flex-start",
        marginLeft: -2,
        marginTop: hp(-0.9),
    },
    lefImage: {
        width: '50%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    rightContent: {
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    titleLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp(3.125),
        marginTop: hp('18.22%'),
        marginBottom: hp('4%'),
        marginLeft: hp('8.4%'),
        fontFamily: FONTS.fontBold,
    },
    loginForm: {
        paddingLeft: hp('9%'),
        paddingRight: hp('9%'),
    },
    field: {
        position: 'relative',
        marginBottom: hp('2.0%'),
    },
    userIcon: {
        position: 'absolute',
        top: hp('2.3%'),
        left: hp('3%'),
        resizeMode: 'contain',
        width: hp(1.7),
        height: hp(2)
    },
    viewIcon: {
        position: 'absolute',
        top: hp(0),
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
        color: COLORS.linkLightPurple,
        lineHeight: hp('3.0%'),
        marginLeft: Platform.OS == 'android' ? hp(1.5) : hp('1.0%'),
        fontFamily: FONTS.fontBold,
        top: Platform.OS == 'android' ? 2 : 0,
    },
    forgotPass: {
        fontSize: hp('1.8%'),
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontBold,
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    loginButtonView: {
        marginTop: hp('3.0%'),
        width: '80%',
    },
    bottomLoginIntro: {
        top: Platform.OS === 'android' ? hp('3%') : hp('15%'),
        paddingLeft: hp('7%'),
        paddingRight: hp('7%'),
    },
    eye: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20
    },
    eyeParent: {
        justifyContent: 'center'
    },
    fieldInputLabel: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        paddingBottom: hp(1),
    },
    commonButtonGreen: {
        color: COLORS.white,
        fontSize: hp('1.56%'),
        borderRadius: hp(1),
        fontWeight: '800',
        overflow: 'hidden',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    LoginBtnText : {
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp('1.3%'),
        overflow: 'hidden',
        textAlign: 'center',
        // paddingLeft: hp(4.175),
        // paddingRight: hp(2.50),
        height: hp(5.40),
        width : Platform.OS === 'android' ? 150 : 200,
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        justifyContent : 'center',
        alignItems : 'center',
        alignSelf : 'center'
    },
    getStartText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        marginTop: hp(5),
        marginLeft: hp('8.4%'),
    },
    commonFontsPupleUnderline: {
        paddingTop: hp(0.5),
        color: COLORS.lightGray,
        fontSize: hp(1.82),
        fontWeight: '500',
        lineHeight: hp('2.6%'),
        fontFamily: FONTS.fontRegular,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
    },
    greenText: {
        color: COLORS.buttonGreen,
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        paddingTop: hp(0.5),
    },
    registerSmtText: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
    },
    rightRegisterSmlText: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingTop: hp(3.5),
        paddingRight: hp(3.5),
    },
    titleAccountLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp('4.8%'),
        marginTop: hp('3.5%'),
        marginBottom: hp('4%'),
        marginLeft: hp('8.4%'),
        fontFamily: FONTS.fontBold,
    },
    loginAccountForm: {
        paddingLeft: hp('9%'),
        paddingRight: hp('9%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: hp(54.42),
    },
    filedSpace: {
        width: hp(22.65),
        marginRight: hp(3),
    },
    firstNameSpace: {
        marginLeft: hp(9),
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.6),
        marginTop: hp(2.5),
    },
    dropWrap: {
        width: hp(10.2),
        marginTop: hp(2.5),
    },
    alignVert: {
        alignItems: 'center',
        marginRight: hp(2.5),
    },
    dateTimetextdummy: {
        fontFamily: FONTS.fontBold,
        fontSize: hp(1.82),
        color: COLORS.lightGray,
    },
    lineSpaceVerify: {
        marginBottom: hp(3),
    },
    resetBtn: {
        backgroundColor: COLORS.white,
        color: COLORS.darkGray,
        fontSize: hp('2.4%'),
        fontWeight: '800',
        borderRadius: hp('1.3%'),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2),
        paddingRight: hp(2),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        alignSelf: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 50, },
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        marginLeft: hp(3),
    },
    alignBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    spaceBottom: {
        marginTop: hp(5),
        marginBottom: hp(10),
    },
    password: {
        width: hp(2.47),
        height: hp(1.69),
        resizeMode: 'contain',
    },
});