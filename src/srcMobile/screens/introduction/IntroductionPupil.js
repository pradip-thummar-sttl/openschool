import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, ScrollView, Alert, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ViewSlider from 'react-native-view-slider'
import COLORS from '../../../utils/Colors';
import Images from '../../../utils/Images';
import STYLE from '../../../utils/Style';
import Introduction1 from '../../component/reusable/introductionpupil/Inroduction1';
import Introduction2 from '../../component/reusable/introductionpupil/Inroduction2';
import Introduction3 from '../../component/reusable/introductionpupil/Inroduction3';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Introduction extends Component {
    constructor(props) {
        super(props);
    }
    navigateToLogin(){
        AsyncStorage.setItem('introducePupil', "true")
        this.props.navigation.replace('Login', { userType: "Pupil" })
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewSlider
                    renderSlides={
                        <>
                            <Introduction1 />
                            <Introduction2 />
                            <Introduction3 navigateToLogin={() => this.navigateToLogin() } />
                        </>
                    }
                    style={styles.slider}
                    slideCount={3}
                    dots={true}
                    dotActiveColor={COLORS.dotActive}
                    dotInactiveColor={COLORS.transparent}
                    dotsContainerStyle={styles.dotContainer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    slider: {
        flex: 1,
    },
    dotContainer: {
        backgroundColor: COLORS.transparent,
        bottom: hp(6.15),
        position: 'absolute',
        alignSelf: 'center',
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