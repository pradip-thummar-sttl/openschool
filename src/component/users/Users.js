import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../utils/Colors';
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
                                    source={require('../../assets/images/teacher_intro_screen_school_bg.png')} />
                                <Text style={styles.text}>School</Text>
                            </View>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/teacher_intro_screen_school_bg.png')} />
                                <Text style={styles.text}>Teacher</Text>
                            </View>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={require('../../assets/images/teacher_intro_screen_school_bg.png')} />
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
        fontSize: 42,
        fontWeight: '600',
        alignSelf: 'center',
    },
    titleText: {
        color: COLORS.white,
        fontSize: 42,
        fontWeight: '600',
        alignSelf: 'center',
        marginBottom: 70,
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
        width: 230,
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: 40,
    },
});