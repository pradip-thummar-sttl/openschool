import React, { Component } from 'react';
import { NativeModules, View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
// import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';
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

class PupilConnect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolCode: '',
        }
    }

    componentDidMount() {
    }

    setLoading(flag) {
        this.setState({ isLoading: flag });
    }

    verifySchool() {
        const { schoolCode, } = this.state;

        if (!schoolCode.trim()) {
            showMessage(MESSAGE.schoolCode)
            return false
        }

        let data = {
            pupilId: this.props.route.params.UserDetialId,
            SchoolCode: schoolCode
        }

        Service.post(data, EndPoints.PupilSchoolCode, (res) => {
            if (res.code == 200) {
                this.props.navigation.replace('Login', { userType: "Pupil" })
            } else {
                this.setLoading(false)
                showMessage(res.message)
            }
        }, (err) => {
            this.setLoading(false)
            console.log('response Login error', err)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    <ImageBackground source={Images.LoginBack} style={styles.image}>
                    </ImageBackground>
                </View>
                <View style={styles.rightContent}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start' }}>

                        <Text h3 style={styles.titleLogin}>Connect to your school</Text>
                        <View style={styles.loginForm}>
                            <Text style={[styles.fieldInputLabel, styles.lineSpaceVerify]}>To access classes at your school enter the unique code provided by your school</Text>

                            <View style={styles.field, styles.spaceBottom}>
                                <TextInput
                                    returnKeyType={"next"}
                                    style={STYLE.commonInput}
                                    placeholder="Enter Code"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    value={this.state.schoolCode}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    onChangeText={schoolCode => this.setState({ schoolCode })} />

                            </View>
                            <View style={styles.loginButtonView, styles.alignBtn}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => {
                                        isDesignBuild ?
                                            null
                                            :
                                            this.verifySchool()

                                    }}>
                                    {this.state.isLoading ?
                                        <ActivityIndicator
                                            style={STYLE.fullWidthPrimaryButton}
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.white} />
                                        :
                                        <Text
                                            style={styles.commonButtonGreen}>Submit my code</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text style={styles.resetBtn}>Skip this step</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(PupilConnect)
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
        top: hp('15%'),
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
        backgroundColor: COLORS.buttonGreen,
        color: COLORS.white,
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
        color: COLORS.thmePurple,
        //fontSize: hp(3.81),
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
    }
});