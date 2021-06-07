import React, { Component } from 'react';
import { NativeModules, View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../utils/Colors';
import STYLE from '../../utils/Style';
import FONTS from '../../utils/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../../utils/Images';
import { opacity, showMessage, isDesignBuild, isRunningFromVirtualDevice } from '../../utils/Constant';
import { Service } from '../../service/Service';
import { EndPoints } from '../../service/EndPoints';
import { connect } from 'react-redux';
import { setUserAuthData } from '../../actions/action';
import MESSAGE from '../../utils/Messages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../../utils/Model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getModel, getSystemVersion, getBrand } from 'react-native-device-info';

const { LoginModuleIos, LoginModule } = NativeModules;

class PupilRegister extends Component {
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
    state = {
        isDayFocused: false,
        isMonthFocused: false,
        isYearFocused: false,
        isFirstNameFocused: false,
        isLastNameFocused: false,
        isPasswordFocus: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    <Image source={Images.loginMainBack} style={styles.image}></Image>
                </View>
                <View style={styles.rightContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                            <Text h3 style={styles.titleLogin}>Pupil Account</Text>
                            <View style={styles.loginForm}>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>What is the learners date of birth?</Text>
                                    <View style={styles.birthRow}>
                                        <View style={[styles.day, styles.commonInputRegister]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isDayFocused: true })}
                                                onBlur={() => this.setState({ isDayFocused: false })}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isDayFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="Day"
                                                autoCapitalize={'none'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.darkGray}
                                            />
                                            <Image source={Images.DropArrow} style={styles.arrowIcon}></Image>
                                        </View>
                                        <View style={[styles.month, styles.commonInputRegister]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isMonthFocused: true })}
                                                onBlur={() => this.setState({ isMonthFocused: false })}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isMonthFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="Month"
                                                autoCapitalize={'none'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.darkGray}
                                            />
                                            <Image source={Images.DropArrow} style={styles.arrowIcon}></Image>
                                        </View>
                                        <View style={[styles.year, styles.commonInputRegister]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isYearFocused: true })}
                                                onBlur={() => this.setState({ isYearFocused: false })}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isYearFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="Year"
                                                autoCapitalize={'none'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.darkGray}
                                            />
                                            <Image source={Images.DropArrow} style={styles.arrowIcon}></Image>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>What is the learners name?</Text>
                                    <View style={styles.lernersRow}>
                                        <View style={[styles.firstName, styles.lernersName]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isFirstNameFocused: true })}
                                                onBlur={() => this.setState({ isFirstNameFocused: false })}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isFirstNameFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="First Name"
                                                autoCapitalize={'none'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.lightGray}
                                            />
                                        </View>
                                        <View style={[styles.lastName, styles.lernersName]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isLastNameFocused: true })}
                                                onBlur={() => this.setState({ isLastNameFocused: false })}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isLastNameFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="Last Name"
                                                autoCapitalize={'none'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.lightGray}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>Email</Text>
                                    <TextInput
                                        onFocus={() => this.setState({ isEmailFocused: true })}
                                        onBlur={() => this.setState({ isEmailFocused: false })}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={{ ...STYLE.commonInput, borderColor: (this.state.isEmailFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                        placeholder="Enter email or phone"
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
                                            placeholderTextColor={COLORS.lightGray}
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
                                                style={STYLE.fullWidthPrimaryButton}>Create my account</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.getStarted}>
                                    <Text style={styles.getStartedText}> Already Registered?</Text>
                                    <TouchableOpacity activeOpacity={opacity}>
                                        <Text style={styles.getStartedLink}> Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.bottomLoginIntro}>
                                <Text style={STYLE.commonFontsPuple}>By clicking ‘Create My Account’, I agree to MyEd’s Terms, and Privacy Policy</Text>
                            </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(PupilRegister)
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
        resizeMode: 'contain',
        width: '100%',
        height: hp(41.3),
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
        fontSize: hp('1.8%'),
        color: COLORS.dashboardGreenButton,
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontBold,
    },
    bottomLoginIntro: {
        marginVertical: hp(6.15),
        paddingLeft: hp(2),
        paddingRight: hp(2),
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
    birthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: hp(-0.6),
    },
    commonInputRegister: {
        width: '33.33%',
        paddingHorizontal: hp(0.6),
        position: 'relative',
        justifyContent: 'center',
    },
    arrowIcon: {
        width: hp(1.43),
        height: hp(0.90),
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: hp(1.8),
    },
    lernersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: hp(-0.6),
    },
    lernersName: {
        width: '50%',
        paddingHorizontal: hp(0.6),
        position: 'relative',
        justifyContent: 'center',
    },
});