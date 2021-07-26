import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, Platform } from 'react-native';
import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import Images from '../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { opacity } from '../../utils/Constant';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Users extends Component {
    constructor(props) {
        super(props);
    }

    navigateIntroductionScreen(type) {
        if (type === 'Teacher') {
            AsyncStorage.getItem('introduceTeacher').then((value) => {
                if (value) {
                    this.props.navigation.navigate('Login', { userType: "Teacher" })
                } else {
                    this.props.navigation.navigate('IntroductionTeacher')
                }
            })

        } else {
            AsyncStorage.getItem('introducePupil').then((value) => {
                if (value) {
                    this.props.navigation.navigate('Login', { userType: "Pupil" })
                } else {
                    this.props.navigation.navigate('IntroductionPupil')
                }
            })

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image}>
                    <Image style={styles.topBg} source={Images.illuTopBg} />
                    <View>
                        <Text style={styles.titleText}>Select the type of user you are</Text>
                        <View style={styles.userMain}>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => null}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.schoolLoginIcon} />
                                    <Text style={styles.text}>School</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => this.navigateIntroductionScreen('Teacher')}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.teacherLoginIcon} />
                                    <Text style={styles.text}>Teacher</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => this.navigateIntroductionScreen('Pupil')}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.pupilLoginIcon} />
                                    <Text style={styles.text}>Pupil</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    text: {
        color: COLORS.darkGray,
        fontSize: hp(2),
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
    },
    titleText: {
        color: COLORS.darkGray,
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        alignSelf: 'center',
        marginBottom: hp(3),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
        height: '100%',
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    user: {
        width: hp(22.13),
        justifyContent: "center",
        textAlign: 'center',
        marginLeft: hp(5.5),
        marginRight: hp(5.5),
    },
    userIcon: {
        width: hp(20.10),
        height: hp(20.10),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(2),
    },
    topBg: {
        width: '100%',
        height: hp(16.77),
        resizeMode: Platform.OS == 'android' ? 'cover' : 'contain',
        position: 'absolute',
        top: hp(-0.3),
    }
});