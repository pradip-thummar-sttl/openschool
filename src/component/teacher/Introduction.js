import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, ScrollView, Alert, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ViewSlider from 'react-native-view-slider'
import COLORS from '../../utils/Colors';
import STYLE from '../../utils/Style';
import Introduction1 from '../reusable/introduction/Inroduction1';
import Introduction2 from '../reusable/introduction/Inroduction2';
import Introduction3 from '../reusable/introduction/Inroduction3';

export default class Introduction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/teacher_intro_screen_bg2.png')} style={styles.image}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logo2.png')} />
                </ImageBackground>
                <ViewSlider
                    renderSlides={
                        <>
                            <Introduction1 />
                            <Introduction2 />
                            <Introduction3 />
                        </>
                    }
                    style={styles.slider}
                    slideCount={3}
                    dots={true}
                    dotActiveColor='#12aefb'
                    dotInactiveColor={COLORS.white}
                    dotsContainerStyle={styles.dotContainer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    dotContainer: {
        backgroundColor: COLORS.transparent,
        bottom: hp('12.0%'),
        left: hp('7.0%'),
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    logo: {
        width: hp('35.0%'),
        resizeMode: "contain",
        left: hp('7.0%'),
        top: hp('10.0%'),
        alignSelf: 'flex-start',
    }
});