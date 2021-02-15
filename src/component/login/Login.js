import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../utils/Colors';
import STYLE from '../../utils/Style';
import FONTS from '../../utils/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lefImage}>
                    <ImageBackground source={require('../../assets/images/sign_in_screen_bg2.png')} style={styles.image}>
                    </ImageBackground>
                </View>
                <View style={styles.rightContent}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Text h3 style={styles.titleLogin}>Teacher & School Login</Text>
                        <View style={styles.loginForm}>
                            <View style={styles.field}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/icouser2.png')} />
                                <TextInput
                                    style={STYLE.commonInput}
                                    placeholder="Enter email or phone"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    onChangeText={text => this.setState({ email: text })} />
                            </View>
                            <View style={styles.field}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/icopassword2.png')} />
                                <TextInput
                                    style={STYLE.commonInputPassword}
                                    placeholder="Password"
                                    maxLength={30}
                                    placeholderTextColor={COLORS.lightplaceholder}
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ password: text })} />
                                <Image
                                    style={styles.viewIcon}
                                    source={require('../../assets/images/icoview2.png')} />
                            </View>
                            <View style={styles.bottomLoginFeild}>
                                <View style={styles.rememberFeild}>
                                    <CheckBox
                                        style={STYLE.checkBoxcommon}
                                        value={false}
                                        onCheckColor={'#03014C'}
                                        onTintColor={'#03014C'}
                                        tintColor={'#676693'}
                                    />
                                    <Text style={styles.label}>Remember Me</Text>
                                </View>
                                <View style={styles.forgotLink}>
                                    <Text style={styles.forgotPass} onPress={() => Alert.alert('Do you Really want to process?')}>Forgot Password?</Text>
                                </View>
                            </View>
                            <View style={styles.loginButtonView}><Text onPress={() => Alert.alert('Login Success')} style={STYLE.fullWidthPrimaryButton}>Login to Continue</Text></View>
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
        textAlign: 'center',
        color: '#03014C',
        fontSize: hp('4.8%'),
        marginBottom: hp('8.0%'),
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
        left: hp('2.6%'),
    },
    viewIcon: {
        position: 'absolute',
        top: hp('2.5%'),
        right: hp('2.6%'),
    },
    bottomLoginFeild: {
        flexDirection: 'row',
    },
    rememberFeild: {
        flexDirection: 'row',
        width: '50%',
    },
    forgotLink: {
        width: '50%',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: hp('1.8%'),
        color: '#676794',
        lineHeight: hp('3.0%'),
        marginLeft: hp('1.0%'),
        fontFamily: FONTS.fontBold,
    },
    forgotPass: {
        fontSize: hp('1.8%'),
        color: '#676794',
        lineHeight: hp('3.0%'),
        fontFamily: FONTS.fontBold,
    },
    loginButtonView: {
        marginTop: hp('3.0%'),
    },
    bottomLoginIntro: {
        top: hp('15%'),
        paddingLeft: hp('7%'),
        paddingRight: hp('7%'),
    },
});