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
import { opacity, showMessage, isDesignBuild, isRunningFromVirtualDevice } from '../../../utils/Constant';
import { Service } from '../../../service/Service';
import { EndPoints } from '../../../service/EndPoints';
import { connect } from 'react-redux';
import { setUserAuthData } from '../../../actions/action';
import MESSAGE from '../../../utils/Messages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../../../utils/Model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getModel, getSystemVersion, getBrand } from 'react-native-device-info';

const { LoginModuleIos, LoginModule } = NativeModules;

class PupilVerify extends Component {
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
                    {/* <Image source={Images.loginMainBack} style={styles.image}></Image> */}
                </View>
                <View style={styles.rightContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                            <Text h3 style={styles.titleLogin}>Verify your email address</Text>
                            <Text style={styles.commonFontsPuple}>An email has been sent to the following email address:</Text>
                            <Text style={styles.commonFonts}>email@emailaddress.com</Text>
                            <Text style={styles.commonFontsPuple}>Please check your emails and click verify to get started with MyEd Open School.</Text>
                            <View style={styles.sendButton}>
                                <TouchableOpacity activeOpacity={opacity}
                                    onPress={() => this.props.navigation.replace('PupilConnect')}>
                                    <Text style={styles.fullWidthPrimaryButton}>Resend verification email</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.commonFontsGray}>Once you confirm your email address you will automatically go to the next step.</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(PupilVerify)
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
    commonFontsPuple: {
        color: COLORS.darkGray,
        fontSize: hp(1.72),
        lineHeight: hp('2.6%'),
        paddingHorizontal: hp(2),
        fontFamily: FONTS.fontRegular,
    },
    commonFonts: {
        color: COLORS.lightGray,
        fontSize: hp(1.72),
        paddingHorizontal: hp(2),
        marginVertical: hp(3.70),
        fontFamily: FONTS.fontBold,
    },
    commonFontsGray: {
        color: COLORS.lightGray,
        fontSize: hp(1.72),
        lineHeight: hp('2.6%'),
        paddingHorizontal: hp(2),
        fontFamily: FONTS.fontRegular,
        marginTop: hp(8),
        marginBottom: hp(2)
    },
    sendButton: {
        marginTop: hp(19),
        paddingHorizontal: hp(2),
    },
    fullWidthPrimaryButton: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden',
        borderRadius: hp(1),
        fontSize: hp(1.7),
        height: hp(5.41),
        textAlignVertical: 'center',
        lineHeight: Platform.OS == 'android' ? hp(2.5) : hp(5.41),
        paddingLeft: hp(5),
        paddingRight: hp(5),
        fontFamily: FONTS.fontBold,
    },
});