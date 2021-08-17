import React, { Component } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FONTS from '../../../../utils/Fonts';
import COLORS from '../../../../utils/Colors';
import HeaderSixteen from "../../../component/reusable/header/bulck/Header16";
import PAGESTYLE from './Style';
import Images from '../../../../utils/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RNCamera, FaceDetector } from 'react-native-camera';

export default class ScreenAndCameraRecording extends Component {
    state = {
        isRecording: false,
        isPause: false,
    }
    takeVideo = async () => {
        const { isRecording } = this.state;
        if (this.camera && !isRecording) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const data = await promise;
                    console.warn('takeVideo', data);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    stopVideo = async () => {
        await this.camera.stopRecording();
        this.setState({ isRecording: false });
    };
    render() {
        const { isRecording } = this.state;
        return (
            <RNCamera
                style={PAGESTYLE.container}
                ref={ref => {
                    this.camera = ref;
                }}>
                {/* <View style={PAGESTYLE.container}> */}
                {/* <ImageBackground source={Images.ScreenAndCameraRecordingBack} style={PAGESTYLE.image}></ImageBackground> */}
                <HeaderSixteen isSaveRecord={!isRecording} onSave={()=>this.props.navigation.goBack()} />
                <View style={PAGESTYLE.bottomCallerbarMain}>

                    <View style={PAGESTYLE.recordingTimer}>
                        {
                            isRecording ?
                                <>
                                    <Image source={Images.recordingTimerIcon} style={PAGESTYLE.recorderTimerIcon} />
                                    <Text style={PAGESTYLE.timer}>04:48</Text>
                                </>
                                : null
                        }
                    </View>

                    <View style={PAGESTYLE.callControlsmain}>
                        <TouchableOpacity style={PAGESTYLE.callControl}><Image source={Images.moreHorizontal} style={PAGESTYLE.callControlsIcon} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => isRecording ? this.stopVideo() : this.takeVideo()} style={PAGESTYLE.callControl}>

                            {
                                isRecording ?
                                    <Image source={Images.recordButton} style={PAGESTYLE.callControlsIcon} />
                                    : <Image source={Images.recordingTimerIcon} style={PAGESTYLE.callrecordIcon} />

                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => isRecording ? this.stopVideo() : this.takeVideo()} style={PAGESTYLE.callControl}>
                            {
                                isRecording ?
                                    <Image source={Images.pauseButton} style={PAGESTYLE.callControlsIcon} />
                                    : <Image source={Images.Play3Icon} style={PAGESTYLE.callControlsIcon} />

                            }

                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.userVideoMain}>
                        <Image source={Images.userVideo} style={PAGESTYLE.userVideo} />
                    </View>
                </View>
                {/* </View> */}
            </RNCamera>
        );
    }
}