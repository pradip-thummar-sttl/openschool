import React, { Component } from 'react';
import { NativeModules, View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform, FlatList } from 'react-native';
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
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from "moment";
import ArrowDown from '../../../svg/teacher/login/ArrowDown';
import ShowPassword from '../../../svg/teacher/login/ShowPassword';
import HidePassword from '../../../svg/teacher/login/HidePassword';
import PupilMobileLoginSideimg from '../../../svg/teacher/login/PupilMobileLoginSideimg';
const { LoginModuleIos, LoginModule } = NativeModules;

var days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
var years = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

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
            iscPasswordHide: true,
            isRemember: false,
            firstName: "",
            lastName: "",
            day: "",
            month: "",
            year: "",
            mobile: "",
            password: "",
            cpassword: "",
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
   
    isFieldsValidated = () => {
        const { userName, password, cpassword, firstName, lastName, day, month, year, PushToken, mobile, Device, OS, AccessedVia, isRemember } = this.state;
        if (!day) {
            showMessage(MESSAGE.day);
            return false;
        } else if (!month) {
            showMessage(MESSAGE.month);
            return false;
        } else if (!year) {
            showMessage(MESSAGE.year);
            return false;
        } else if (!firstName.trim()) {
            showMessage(MESSAGE.firstName);
            return false;
        } else if (!lastName.trim()) {
            showMessage(MESSAGE.lastName);
            return false;
        } else if (mobile.trim().length < 5) {
            showMessage(MESSAGE.phone)
            return false;
        } else if (!userName.trim() || !emailValidate(userName)) {
            showMessage(MESSAGE.email)
            return false;
        } else if (password.trim().length < 5) {
            showMessage(MESSAGE.password);
            return false;
        } else if (!cpassword.trim()) {
            showMessage(MESSAGE.cpassword);
            return false;
        } else if (password != cpassword) {
            showMessage(MESSAGE.notMatched);
            return false;
        }

        this.setLoading(true)
        Service.get(EndPoints.GetAllUserType, (res) => {

            console.log('user type data', res);
            if (res.flag) {
                var userData = res.data
                var userType = ""
                userData.map((item) => {
                    if (item.Name === User.user.UserType) {
                        userType = item._id
                    }
                })

                var data = {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: userName,
                    MobileNumber: mobile,
                    Dob: moment(`${year}-${month}-${day}`, 'yyyy-MMM-DD').format('yyyy-MM-DD'),
                    Password: password,
                    UserTypeId: userType
                }

                console.log('data', data);

                Service.post(data, EndPoints.PupilRegister, (res) => {
                    console.log('response of register', res);
                    this.setLoading(false)
                    if (res.code == 200) {
                        this.props.navigation.replace('PupilConnect', { userType: "Pupil", data: res.data })
                    } else {
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
            console.log('response usertype error', err)
            this.setLoading(false)
        })
    }

    setPasswordVisibility = () => {
        this.setState({ isPasswordHide: !this.state.isPasswordHide });
    }

    setCPasswordVisibility = () => {
        this.setState({ iscPasswordHide: !this.state.iscPasswordHide });
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    daysDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Days</Text> */}
                <Menu onSelect={(item) => this.setState({ day: item })}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.day ? this.state.day : 'Day'}</Text>
                        <ArrowDown style={styles.dropDownArrow} width={hp(1.51)} height={hp(2)} />
                        {/* <Image style={styles.dropDownArrow} source={Images.DropArrow} /> */}
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(1.72), } }}>
                        <FlatList
                            data={days}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: hp(1.84) }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: hp(40) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };
    monthsDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Month</Text> */}
                <Menu onSelect={(item) => this.setState({ month: item })}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.month ? this.state.month : 'Month'}</Text>
                        <ArrowDown style={styles.dropDownArrow} width={hp(1.51)} height={hp(2)} />
                        {/* <Image style={styles.dropDownArrow} source={Images.DropArrow} /> */}
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(1.72), } }}>
                        <FlatList
                            data={months}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: hp(1.84) }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: hp(40) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };
    yearsDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Year</Text> */}
                <Menu onSelect={(item) => this.setState({ year: item })}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.year ? this.state.year : 'Year'}</Text>
                        <ArrowDown style={styles.dropDownArrow} width={hp(1.51)} height={hp(2)} />
                        {/* <Image style={styles.dropDownArrow} source={Images.DropArrow} /> */}
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(1.72), } }}>
                        <FlatList
                            data={years}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: hp(1.84) }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: hp(40) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    render() {
        console.log('props',this.props);
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    {/* <Image source={Images.loginMainBack} style={styles.image}></Image> */}
                    <PupilMobileLoginSideimg style={styles.image} width={wp(100)} height={'100%'} />
                </View>
                <View style={styles.rightContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                            <Text h3 style={styles.titleLogin}>Pupil Account</Text>
                            <View style={styles.loginForm}>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>What is the learners date of birth?</Text>
                                    <View style={styles.birthRow}>
                                        <View style={[STYLE.commonInput, styles.alignVert]}>
                                            {
                                                this.daysDropDown()
                                            }
                                        </View>
                                        <View style={[STYLE.commonInput, styles.alignVert]}>
                                            {
                                                this.monthsDropDown()
                                            }
                                        </View>
                                        <View style={[STYLE.commonInput, styles.alignVert]}>
                                            {
                                                this.yearsDropDown()
                                            }
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
                                                ref={(input) => { this.t1 = input; }}
                                                onSubmitEditing={() => { this.t2.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isFirstNameFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="First Name"
                                                autoCapitalize={'words'}
                                                maxLength={40}
                                                onChangeText={(firstName) => this.setState({ firstName })}
                                                placeholderTextColor={COLORS.lightGray}
                                            />
                                        </View>
                                        <View style={[styles.lastName, styles.lernersName]}>
                                            <TextInput
                                                onFocus={() => this.setState({ isLastNameFocused: true })}
                                                onBlur={() => this.setState({ isLastNameFocused: false })}
                                                returnKeyType={"next"}
                                                ref={(input) => { this.t2 = input; }}
                                                onSubmitEditing={() => { this.t3.focus(); }}
                                                style={{ ...STYLE.commonInput, borderColor: (this.state.isLastNameFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                                placeholder="Last Name"
                                                autoCapitalize={'words'}
                                                maxLength={40}
                                                onChangeText={(lastName) => this.setState({ lastName })}
                                                placeholderTextColor={COLORS.lightGray}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>Parent's phone number</Text>
                                    <TextInput
                                        onFocus={() => this.setState({ isPhoneFocused: true })}
                                        onBlur={() => this.setState({ isPhoneFocused: false })}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.t3 = input; }}
                                        onSubmitEditing={() => { this.t4.focus(); }}
                                        style={{ ...STYLE.commonInput, borderColor: (this.state.isPhoneFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                        placeholder="Phone Number"
                                        autoCapitalize={'none'}
                                        maxLength={40}
                                        value={this.state.mobile}
                                        placeholderTextColor={COLORS.lightGray}
                                        onChangeText={mobile => this.setState({ mobile })} />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>Email</Text>
                                    <TextInput
                                        onFocus={() => this.setState({ isEmailFocused: true })}
                                        onBlur={() => this.setState({ isEmailFocused: false })}
                                        returnKeyType={"next"}
                                        ref={(input) => { this.t4 = input; }}
                                        onSubmitEditing={() => { this.t5.focus(); }}
                                        style={{ ...STYLE.commonInput, borderColor: (this.state.isEmailFocused) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                        placeholder="Email"
                                        autoCapitalize={'none'}
                                        maxLength={40}
                                        value={this.state.userName}
                                        placeholderTextColor={COLORS.lightGray}
                                        onChangeText={userName => this.setState({ userName })} />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>Password</Text>
                                    <View style={styles.eyeParent}>
                                        <TextInput
                                            onFocus={() => this.setState({ isPasswordFocus: true })}
                                            onBlur={() => this.setState({ isPasswordFocus: false })}
                                            ref={(input) => { this.t5 = input; }}
                                            onSubmitEditing={() => { this.t6.focus(); }}
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
                                <View style={styles.field}>
                                    <Text style={styles.labelInput}>Confirm Password</Text>
                                    <View style={styles.eyeParent}>
                                        <TextInput
                                            onFocus={() => this.setState({ isCPasswordFocus: true })}
                                            onBlur={() => this.setState({ isCPasswordFocus: false })}
                                            ref={(input) => { this.t6 = input; }}
                                            placeholder="Confirm Password"
                                            value={this.state.cpassword}
                                            autoCapitalize={'none'}
                                            maxLength={30}
                                            style={{ ...STYLE.commonInputPassword, borderColor: (this.state.isCPasswordFocus) ? COLORS.dashboardPupilBlue : COLORS.videoLinkBorder }}
                                            placeholderTextColor={COLORS.lightGray}
                                            secureTextEntry={this.state.iscPasswordHide}
                                            onChangeText={cpassword => this.setState({ cpassword })} 
                                            onSubmitEditing={() => { this.isFieldsValidated() }}
                                            />

                                        <View style={styles.eye}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => this.setCPasswordVisibility()}>
                                                {
                                                    this.state.iscPasswordHide ?
                                                        <ShowPassword style={styles.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                                        : <HidePassword style={styles.viewIcon} height={hp(1.69)} width={hp(2.47)} />
                                                }
                                                {/* <Image
                                                    style={styles.viewIcon} source={this.state.iscPasswordHide ? Images.ShowPassword : Images.HidePassword} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/* <View style={styles.loginButtonView}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { this.isFieldsValidated() }}>
                                        <Text
                                            style={{ ...STYLE.fullWidthPrimaryButton, textTransform: 'uppercase', }}>Create my account</Text>
                                    </TouchableOpacity>
                                </View> */}

                                <View style={[styles.loginButtonView,{marginTop:20}]}>
                                    <TouchableOpacity style={STYLE.loginButtonView}  activeOpacity={opacity} onPress={() => { this.isFieldsValidated() }}>
                                       
                                    {this.isLoading ?
                                        <ActivityIndicator
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.white} />
                                        :
                                         <Text style={STYLE.loginButtonText}>Create my account</Text>
                                    }
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.getStarted}>
                                    <Text style={styles.getStartedText}> Already Registered?</Text>
                                    <TouchableOpacity activeOpacity={opacity}
                                        onPress={() => this.props.navigation.replace('Login', { userType: 'Pupil' })}>
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
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    lefImage: {
        width: '100%',
        height: hp(28),
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.lightBlueLogin,
    },
    rightContent: {
        width: '100%',
        backgroundColor: COLORS.white,
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
    //
    dropDownFormInput: {
        width: '100%',
    },
    subjectText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(0.8),
    },
    subjectDateTime: {
        // alignItems: '',
        justifyContent: 'space-between',
        width: '100%',
    },
    dropDown: {
        flexDirection: 'row',
        width: wp(16),
        color: COLORS.darkGray,
        fontSize: 18,
        // borderWidth: 1,
        // borderColor: COLORS.bottomProfileLightBorder,
        overflow: 'hidden',
        borderRadius: hp(1.0),
        lineHeight: hp(2.3),
        height: "100%",
        justifyContent: 'space-between',
        // paddingLeft: hp(2.0),
        // paddingRight: hp(2.0),
        // paddingTop: hp(1.5),
        // paddingBottom: hp(1.5),
        fontFamily: FONTS.fontRegular,
        // padding:10
        // margin:hp(1)
    },
    dateTimetextdummy: {
        fontSize: hp(1.72),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dropDownArrow: {
        width: hp(1.51),
        resizeMode: 'contain',
        // position:'absolute',
        alignSelf: 'center'
        // right:hp(1.4),
        // top:hp(2.1),
    },
    alignVert: {
        alignItems: 'center',
        marginRight: hp(2.5),
    },
});