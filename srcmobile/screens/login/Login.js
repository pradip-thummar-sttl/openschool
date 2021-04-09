import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../utils/Colors';
import STYLE from '../../utils/Style';
import FONTS from '../../utils/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../../utils/Images';
import { opacity, showMessage, isDesignBuild } from '../../utils/Constant';
import { Service } from '../../service/Service';
import { EndPoints } from '../../service/EndPoints';
import { connect } from 'react-redux';
import { setUserAuthData } from '../../actions/action';
import MESSAGE from '../../utils/Messages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../../utils/Model';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            PushToken: "Test",
            Device: "M",
            OS: Platform.OS,
            AccessedVia: "Mobile",
            isLoading: false,
            isPasswordHide: true,
            isRemember: false
        }
    }

    componentDidMount() {
        const { userName, password, PushToken, Device, OS, AccessedVia, isRemember } = this.state;
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
            } else {
            }
        })
        if (isRemember) {


        }

    }

    isFieldsValidated = () => {
        const { userName, password, PushToken, Device, OS, AccessedVia, isRemember } = this.state;

        if (!userName) {
            showMessage(MESSAGE.email)
            return false;
        } else if (!password) {
            showMessage(MESSAGE.password);
            return false;
        }

        this.setLoading(true)
        // console.log('Base64.encode(password)', Base64.encode(password))
        var data = {
            Email: userName,
            Password: password,
            PushToken: PushToken,
            Device: Device,
            OS: OS,
            AccessedVia: AccessedVia,
        }
        Service.post(data, EndPoints.Login, (res) => {
            console.log('response Login', res)
            if (res.code == 200) {
                this.setLoading(false)
                // showMessage(res.message)
                data.isRemember = isRemember
                console.log('data of login', data, 'OOO' + isRemember)
                AsyncStorage.setItem('user', JSON.stringify(data))
                this.props.setUserAuthData(res.data)
                this.props.navigation.replace('TeacherDashboard')

                User.user = res.data
                // this.props.navigation.replace('LessonandHomeworkPlannerDashboard')
            } else {
                this.setLoading(false)
                showMessage(res.message)
            }
        }, (err) => {
            this.setLoading(false)
            console.log('response Login error', err)
        })

        // return true;
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    setPasswordVisibility = () => {
        this.setState({ isPasswordHide: !this.state.isPasswordHide });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    <ImageBackground source={Images.LoginBack} style={styles.image}>
                    </ImageBackground>
                </View>
                <View style={styles.rightContent}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
                        <Text h3 style={styles.titleLogin}>Teacher & School Login</Text>
                        <View style={styles.loginForm}>
                            <View style={styles.field}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.UserIconLogin} />
                                <TextInput
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.t2.focus(); }}
                                    style={STYLE.commonInput}
                                    placeholder="Enter email or phone"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    value={this.state.userName}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    onChangeText={userName => this.setState({ userName })} />
                            </View>
                            <View style={styles.field}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.Password} />
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
                                            <Image
                                                style={styles.viewIcon} source={this.state.isPasswordHide ? Images.ShowPassword : Images.HidePassword} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottomLoginFeild}>
                                <View style={styles.rememberFeild}>
                                    <CheckBox
                                        style={STYLE.checkBoxcommon}
                                        value={this.state.isRemember}
                                        onCheckColor={COLORS.themeBlue}
                                        onTintColor={COLORS.themeBlue}
                                        tintColor={COLORS.lightplaceholder}
                                        onChange={() => this.setState({ isRemember: !this.state.isRemember })}
                                    />
                                    <Text style={styles.label}>Remember Me</Text>
                                </View>
                                <View style={styles.forgotLink}>
                                    <Text style={styles.forgotPass} onPress={() => Alert.alert('Do you Really want to process?')}>Forgot Password?</Text>
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
                                            style={STYLE.fullWidthPrimaryButton}>Login to Continue</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomLoginIntro}>
                            <Text style={STYLE.commonFonts}>You can’t create an account in the app.</Text>
                            <Text style={STYLE.commonFontsPuple}>Head over to our website to register and come back when you’ve made an account.</Text>
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
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        width: '100%',
        height: hp(28),
        resizeMode: "contain",
        justifyContent: "center"
    },
    lefImage: {
        width: '100%',
    },
    rightContent: {
        width: '100%',
        flex: 1,
    },
    titleLogin: {
        textAlign: 'center',
        color: COLORS.themeBlue,
        fontSize: hp(3),
        marginBottom: hp(2),
        marginTop: hp(5),
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
        top: hp('2.3%'),
        left: hp('3%'),
        resizeMode: 'contain',
        width: hp(1.7),
        height: hp(2)
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
        marginLeft: hp('1.0%'),
        fontFamily: FONTS.fontBold,
    },
    forgotPass: {
        fontSize: hp('1.8%'),
        color: COLORS.linkLightPurple,
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontBold,
    },
    loginButtonView: {
        marginTop: hp('3.0%'),
    },
    bottomLoginIntro: {
        top: hp(15),
        paddingLeft: hp('2%'),
        paddingRight: hp('2%'),
    },
    eye: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20
    },
    eyeParent: {
        justifyContent: 'center'
    }
});