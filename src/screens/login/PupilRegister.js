import React, { Component } from 'react';
import { NativeModules, View, StyleSheet, Image,FlatList, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
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
import { Base64 } from 'js-base64';
import { getModel, getSystemVersion, getBrand } from 'react-native-device-info';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
const { LoginModuleIos, LoginModule } = NativeModules;

var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
var months=[1,2,3,4,5,6,7,8,9,10,11,12]
var years=[1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021]

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
            isRemember: false,
            firstName:"",
            lastName:"",
            day:"",
            month:"",
            year:""
        }
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    isFieldsValidated = () => {
        const { userName, password,firstName, lastName, day,month, year, PushToken, Device, OS, AccessedVia, isRemember } = this.state;
        console.log('user type data', this.props);
        if (!userName) {
            showMessage(MESSAGE.email)
            return false;
        } else if (!password) {
            showMessage(MESSAGE.password);
            return false;
        } else if (!firstName) {
             showMessage(MESSAGE.firstName);
            return false;
        } else if (!lastName ) {
            showMessage(MESSAGE.lastName);
            return false;
        } else if (!day) {
            showMessage(MESSAGE.day);
            return false;
        } else if (!month) {
            showMessage(MESSAGE.month);
            return false;
        } else if (!year) {
            showMessage(MESSAGE.year);
            return false;
        }

        this.setLoading(true)
        Service.get(EndPoints.GetAllUserType, (res) => {

            // console.log('user type data', this.props.route);
            if (res.flag) {
                var userData = res.data
                var userType = ""
                userData.map((item) => {
                    if (item.Name === this.props.route.params.userType) {
                        userType = item._id
                    }
                })


                var data = {
                    FirstName:firstName,
                    LastName:lastName,
                    Email: userName,
                    Dob:`${year}-${month}-${day}`,
                    Password: password,
                    UserTypeId: userType
                }

                Service.post(data, EndPoints.PupilRegister, (res) => {
                    console.log('response of register', res);
                    if (res.code == 200) {
                        data.isRemember = isRemember
                        User.user = res.data
                        this.props.navigation.replace('Login', { userType: "Pupil" })
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
            console.log('response usertype error', err)
            this.setLoading(false)
        })
    }
    

    

    

    daysDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Days</Text> */}
                <Menu onSelect={(item) => this.setState({day:item})}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.day ? this.state.day  : 'Day'}</Text>
                        <Image style={styles.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={days}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: 500 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };
    monthsDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Month</Text> */}
                <Menu onSelect={(item) => this.setState({month:item})}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown,{width: hp(12)}]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.month ? this.state.month  : 'Month'}</Text>
                        <Image style={styles.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={months}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: 500 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };
    yearsDropDown = () => {
        return (
            <View style={styles.dropDownFormInput}>
                {/* <Text style={styles.subjectText}>Year</Text> */}
                <Menu onSelect={(item) => this.setState({year:item})}>
                    <MenuTrigger style={[styles.subjectDateTime, styles.dropDown]}>
                        <Text style={styles.dateTimetextdummy}>{this.state.year ? this.state.year  : 'Year'}</Text>
                        <Image style={styles.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={years}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: 500 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

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
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start'}}>
                       <View style={styles.rightRegisterSmlText}>
                        <Text style={styles.registerSmtText}>Already Registered? <TouchableOpacity><Text style={styles.greenText}>Login</Text></TouchableOpacity></Text>
                        </View>
                        <Text h3 style={styles.titleAccountLogin}>Pupil Register</Text>
                        <Text style={[styles.fieldInputLabel, styles.firstNameSpace]}>What is the learners date of birth?</Text>
                        <View style={styles.loginAccountForm}>       
                        {/* {
                            this.daysDropDown(),
                            this.monthsDropDown(),
                            this.yearsDropDown()
                        }                     */}
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
                        <Text style={[styles.fieldInputLabel, styles.firstNameSpace]}>What is the Learners Name</Text>
                        <View style={styles.loginAccountForm}>                           
                            <View style={[styles.field, styles.filedSpace]}>
                                <TextInput
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.t2.focus(); }}
                                    style={STYLE.commonInput}
                                    placeholder="First Name"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    value={this.state.firstName}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    onChangeText={firstName => this.setState({ firstName })} />
                            </View>                            
                            <View style={[styles.field, styles.filedSpace]}>
                                <TextInput
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.t2.focus(); }}
                                    style={STYLE.commonInput}
                                    placeholder="Last Name"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    value={this.state.lastName}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    onChangeText={lastName => this.setState({ lastName })} />
                            </View>
                        </View>
                        <View style={styles.loginForm}>
                            <Text style={styles.fieldInputLabel}>Email</Text>
                            <View style={styles.field}>
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
                                            <Image
                                                source={this.state.isPasswordHide ? Images.ShowPassword : Images.HidePassword} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottomLoginFeild}>
                                <View style={styles.rememberFeild}>
                                    <CheckBox
                                        style={STYLE.checkBoxcommon1}
                                        value={this.state.isRemember}
                                        onCheckColor={COLORS.white}
                                        onTintColor={COLORS.blueButton}
                                        tintColor={COLORS.lightplaceholder}
                                        onFillColor={COLORS.blueButton}
                                        boxType={'square'}
                                        tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
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
                                            style={styles.commonButtonGreen}>Create My Account</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomLoginIntro}>
                            <Text style={STYLE.commonFonts}>Our Terms &amp; Conditions and Privacy Policy</Text>
                            <Text style={STYLE.commonFontsPuple}>By clicking ‘Login to continue’, I agree to <TouchableOpacity><Text style={styles.commonFontsPupleUnderline}>MyEd’s Terms</Text></TouchableOpacity>, and <TouchableOpacity><Text style={styles.commonFontsPupleUnderline}>Privacy Policy</Text></TouchableOpacity></Text>
                        </View>
                    </KeyboardAwareScrollView>
                   
                </View>
            </View>
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
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center"
    },
    lefImage: {
        width: '50%',
    },
    rightContent: {
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    titleLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp('4.8%'),
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
        marginLeft: hp('1.0%'),
        fontFamily: FONTS.fontBold,
    },
    forgotPass: {
        fontSize: hp('1.8%'),
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontRegular,
        color:COLORS.buttonGreen,
        fontWeight:'700',
    },
    loginButtonView: {
        marginTop: hp('3.0%'),
        width:'80%',
    },
    bottomLoginIntro: {
        top: hp('8%'),
        paddingLeft: hp('8.5%'),
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
    fieldInputLabel:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.lightGray,
        paddingBottom:hp(1),
    },
    commonButtonGreen:{
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
        fontSize: hp('1.56'),
        fontWeight: '800',
        borderRadius: hp('1.3'),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2),
        paddingRight: hp(2),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        alignSelf: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {width: 0,height: 50,},
        shadowOpacity: 0.16,
        shadowRadius: 13,
        elevation: 4,
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    getStartText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        color:COLORS.darkGray,
        marginTop:hp(5),
        marginLeft: hp('8.4%'),
    },
    commonFontsPupleUnderline:{
        paddingTop:hp(0.5),
        color: COLORS.lightGray,
        //fontSize: hp(3.81),
        fontWeight: '500',
        lineHeight: hp('2.6%'),
        fontFamily: FONTS.fontRegular,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        fontSize:hp(1.56),
    },
    greenText:{
        color:COLORS.buttonGreen,
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),
        lineHeight:hp(1.5),
    },
    registerSmtText:{
        fontFamily:FONTS.fontRegular,
        fontSize:hp(1.82),        
        color:COLORS.lightGray,
    },
    rightRegisterSmlText:{
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        paddingTop:hp(3.5),
        paddingRight:hp(3.5),
    },
    titleAccountLogin: {
        textAlign: 'left',
        color: COLORS.themeBlue,
        fontSize: hp('4.8%'),
        marginTop: hp(0.5),
        marginBottom: hp('4%'),
        marginLeft: hp('8.4%'),
        fontFamily: FONTS.fontBold,
    },
    loginAccountForm:{
        paddingLeft: hp('9%'),
        paddingRight: hp('9%'),
        flexDirection:'row',
        justifyContent:'space-between',
        width:hp(54.42),
        marginBottom: hp('2.0%'),
    },
    filedSpace:{
        width:hp(22.65),
        marginRight:hp(3),
    },
    firstNameSpace:{
        marginLeft:hp(9),
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.6),
        marginTop:hp(2.5),
    },
    dropWrap:{
        width:hp(10.2),
        marginTop:hp(2.5),
    },
    alignVert:{
        alignItems:'center',
        marginRight:hp(2.5),
    },
    dateTimetextdummy:{
        fontFamily: FONTS.fontBold,
        fontSize:hp(1.82),        
        color:COLORS.lightGray,
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
        alignItems: 'flex-start',
        justifyContent:'space-between',
        width:'100%',
    },
    dropDown: {
        flexDirection: 'row',
        width: hp(10),
        color: COLORS.darkGray,
        fontSize: 18,
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        overflow: 'hidden',
        borderRadius: hp(1.0),
        lineHeight: hp(2.3),
        height: "100%",
        // paddingLeft: hp(2.0),
        // paddingRight: hp(2.0),
        // paddingTop: hp(1.5),
        // paddingBottom: hp(1.5),
        fontFamily: FONTS.fontRegular,
    },
    dateTimetextdummy: {
        fontSize: 18,
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dropDownArrow:{
        width:hp(1.51),
        resizeMode:'contain',
        position:'absolute',
        right:hp(1.4),
        top:hp(2.1),
    },
});