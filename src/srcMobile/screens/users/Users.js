import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, Platform } from 'react-native';
import COLORS from '../../../utils/Colors';
import FONTS from '../../../utils/Fonts';
// import Images from '../../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { opacity } from '../../../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Top from '../../../svg/userselection/Top';
import TopMobile from '../../../svg/userselection/TopMobile';
import School from '../../../svg/userselection/School';
import Teacher from '../../../svg/userselection/Teacher';
import Pupil from '../../../svg/userselection/Pupil';

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

        } else if (type === 'School') {
            AsyncStorage.getItem('introduceSchool').then((value) => {
                if (value) {
                    this.props.navigation.navigate('Login', { userType: "School" })
                } else {
                    this.props.navigation.navigate('IntroductionSchool')
                }
            })
        } else{
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
                {/* <Image source={Images.loginTop} style={styles.image}></Image> */}
                <TopMobile style={styles.image} height={Platform.OS == 'android' ? hp(17.5) : hp(16)} width={'100%'} />
                <View>
                    <Text style={styles.titleText}>Select the type of user you are</Text>
                    <View style={styles.userMain}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.navigateIntroductionScreen('School')}>
                            <View style={styles.user}>
                                {/* <Image
                                    style={styles.userIcon}
                                    source={Images.school} /> */}
                                    <School style={styles.userIcon} height={hp(13.5)} width={hp(13.5)} />
                                <Text style={styles.text}>School</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.navigateIntroductionScreen('Teacher')}>
                            <View style={styles.user}>
                                {/* <Image
                                    style={styles.userIcon}
                                    source={Images.teacher} /> */}
                                    <Teacher style={styles.userIcon} height={hp(13.5)} width={hp(13.5)} />
                                <Text style={styles.text}>Teacher</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.navigateIntroductionScreen('Pupil')}>
                            <View style={styles.user}>
                                {/* <Image
                                    style={styles.userIcon}
                                    source={Images.pupil} /> */}
                                    <Pupil style={styles.userIcon} height={hp(13.5)} width={hp(13.5)} />
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
        top: -5
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