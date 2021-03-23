import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../utils/Model';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(0.3)
    }

    componentDidMount() {
        this.runAnimation()

        setTimeout(() => {
            AsyncStorage.getItem('user').then((user) => {
                if (user) {
                    User.user = user
                    this.props.navigation.replace('TeacherDashboard')
                } else {
                    this.launchNextScreen()
                }
            })
        }, 3000);
    }

    runAnimation() {
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 2.5,
            }
        ).start()
    }

    launchNextScreen() {
        this.props.navigation.replace('Users')
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/teacher_intro_screen_bg2.png')} style={styles.image}>
                    <Animated.Image
                        style={[styles.logo, { transform: [{ scale: this.springValue }] }]}
                        source={require('../../assets/images/logo2.png')} />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    logo: {
        width: hp('40.0%'),
        resizeMode: "contain",
        alignSelf: 'center',
    }
});