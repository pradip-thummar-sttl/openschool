import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Alert, Dimensions } from 'react-native';
import ViewSlider from 'react-native-view-slider'
import COLORS from '../../utils/Colors';
import Introduction1 from '../reusable/introduction/Inroduction1';
import Introduction2 from '../reusable/Inroduction2';
import Introduction3 from '../reusable/Inroduction3';

export default class IntroductionActivity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewSlider
                    renderSlides={
                        <>
                            <Introduction1/>
                            <Introduction2/>
                            <Introduction3/>
                        </>
                    }
                    style={styles.slider}
                    slideCount={3}
                    dots={true}
                    dotActiveColor='red'
                    dotInactiveColor='gray'
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
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15
    },
});