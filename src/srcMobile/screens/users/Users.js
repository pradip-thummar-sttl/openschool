import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../../utils/Colors';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { opacity } from '../../../utils/Constant';
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
                <Image source={Images.loginTop} style={styles.image}></Image>
                <View>
                    <Text style={styles.titleText}>Select the type of user you are</Text>
                    <View style={styles.userMain}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => null}>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.school} />
                                <Text style={styles.text}>School</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.navigateIntroductionScreen('Teacher')}>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.teacher} />
                                <Text style={styles.text}>Teacher</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.navigateIntroductionScreen('Pupil')}>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.pupil} />
                                <Text style={styles.text}>Pupil</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        fontSize: hp(1.8),
        alignSelf: 'center',
        fontFamily: FONTS.fontRegular,
    },
    titleText: {
        color: COLORS.darkGray,
        fontSize: hp(2.46),
        fontFamily: FONTS.fontBold,
        alignSelf: 'center',
        marginTop: hp(7.3),
    },
    image: {
        resizeMode: "cover",
        width: '100%',
        height: hp(15),
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: hp(4.5),
    },
    user: {
        justifyContent: "center",
        textAlign: 'center',
        marginBottom: hp(4),
    },
    userIcon: {
        width: hp(13.5),
        height: hp(13.5),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(1.5),
        borderRadius: hp(50),
    },
});