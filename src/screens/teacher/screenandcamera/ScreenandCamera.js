import React, { Component } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FONTS from '../../../utils/Fonts';
import COLORS from '../../../utils/Colors';
import HeaderSixteen from "../../../component/reusable/header/bulck/Header16";
import PAGESTYLE from './Style';
import Images from '../../../utils/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RNCamera, FaceDetector } from 'react-native-camera';

export default class ScreenAndCameraRecording extends Component {
    render() {
        return (
            <View style={PAGESTYLE.container}>
                <ImageBackground source={Images.ScreenAndCameraRecordingBack} style={PAGESTYLE.image}></ImageBackground>
                <HeaderSixteen />
                <View style={PAGESTYLE.bottomCallerbarMain}>
                    <View style={PAGESTYLE.recordingTimer}>
                        <Image source={Images.recordingTimerIcon} style={PAGESTYLE.recorderTimerIcon} />
                        <Text style={PAGESTYLE.timer}>04:48</Text>
                    </View>
                    <View style={PAGESTYLE.callControlsmain}>
                        <TouchableOpacity style={PAGESTYLE.callControl}><Image source={Images.moreHorizontal} style={PAGESTYLE.callControlsIcon} /></TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.callControl}><Image source={Images.recordButton} style={PAGESTYLE.callControlsIcon} /></TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.callControl}><Image source={Images.pauseButton} style={PAGESTYLE.callControlsIcon} /></TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.userVideoMain}>
                        <Image source={Images.userVideo} style={PAGESTYLE.userVideo} />
                    </View>
                </View>
            </View>
        );
    }
}