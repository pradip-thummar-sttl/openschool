import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../../utils/Model';
import Video from 'react-native-video';
export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(0.3)
    }

    componentDidMount() {
        this.runAnimation()

        // setTimeout(() => {
        //     // AsyncStorage.getItem('user').then((user) => {
        //     //     if (user) {
        //     //         User.user = user
        //     //         this.props.navigation.replace('TeacherDashboard')
        //     //     } else {
        //     this.launchNextScreen()
        //     // }
        //     // })
        // }, 3000);
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
        // this.props.navigation.replace('Users')
        AsyncStorage.getItem('type').then((value) => {
            console.log('-----value------', value)
            if (value === "Teacher") {
                this.props.navigation.navigate('Login', { userType: "Teacher" })
            } else if (value == "Pupil") {
                this.props.navigation.navigate('Login', { userType: "Pupil" })
            } else if (value == "School") {
                this.props.navigation.navigate('Login', { userType: "School" })
            } else {
                       this.props.navigation.replace('Users')
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <ImageBackground source={require('../../assets/images/teacher_intro_screen_bg2.png')} style={styles.image}>
                    <Animated.Image
                        style={[styles.logo, { transform: [{ scale: this.springValue }] }]}
                        source={require('../../assets/images/logo2.png')} />
                </ImageBackground> */}


                <Video source={require('../../../assets/video/myed_open_school_mobile.mp4')}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}
                    onEnd={() => { this.launchNextScreen() }}
                    resizeMode={'cover'}
                    fullscreen={true}
                    style={styles.backgroundVideo}
                   />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        // resizeMode:'stretch'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(13,178,96)',
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