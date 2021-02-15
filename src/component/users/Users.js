import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/teacher_intro_screen_bg2.png')} style={styles.image}>
                    <View>
                        <Text style={styles.titleText}>Select the type of user you are</Text>
                        <View style={styles.userMain}>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/userIcon.png')} />
                                <Text style={styles.text}>School</Text>
                            </View>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/userIcon.png')} />
                                <Text style={styles.text}>Teacher</Text>
                            </View>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/userIcon.png')} />
                                <Text style={styles.text}>Pupil</Text>
                            </View>
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
    },
    text: {
        color: COLORS.white,
        fontSize: hp(3.8),
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
    },
    titleText: {
        color: COLORS.white,
        fontSize: hp(3.8),
        fontFamily: FONTS.fontBold,
        alignSelf: 'center',
        marginBottom: hp(6.0),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    user: {
        width: '27%',
        justifyContent: "center",
        textAlign: 'center',

    },
    userIcon: {
        width: hp(25.0),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(2.5),
    },
});