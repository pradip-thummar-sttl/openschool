import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { opacity } from "../../../../utils/Constant";
import { Download } from "../../../../utils/Download";

const Popupaddrecording = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        console.log('!isModalVisible', !isModalVisible);
        setModalVisible(!isModalVisible);
    };
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onCameraOnly = () => {
        toggleModal();
        setTimeout(() => {
            props.onCameraOnly()
        }, 1000);

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    console.log('props.recordingArr', props.recordingArr);

    return (
        <View>
            {props.isScreenVoiceSelected ?
                <View>
                    {!props.isRecordingStarted ?
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => props.onStartScrrenRecording()}
                            style={{ ...styles.recordLinkBlock2, ...styles.topSpaceRecording, marginRight: 5 }}>
                            <Text style={styles.recordLinkText}>Start Screen + Voice Recording</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => props.onStopScrrenRecording()}
                            style={{ ...styles.recordLinkBlock2, ...styles.topSpaceRecording, marginLeft: 5 }}>
                            <Text style={styles.recordLinkText}>Stop Recording</Text>
                        </TouchableOpacity>
                    }
                </View>
                :
                props.recordingArr.length == 0 ?
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={toggleModal}
                        style={[styles.recordLinkBlock, styles.topSpaceRecording]}>
                        <Image source={Images.RecordIcon} style={styles.recordingLinkIcon} />
                        <Text style={styles.recordLinkText}>Add Recording</Text>
                    </TouchableOpacity>
                    :
                    
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => {console.log(props.recordingArr[0]);Download(props.recordingArr[0],(res)=>{})}}
                        style={[styles.recordLinkBlock, styles.topSpaceRecording]} >
                        {/* <Text style={styles.recordLinkText}>{!props.recordingArr[0].originalname ? props.recordingArr[0].fileName : props.recordingArr[0].originalname}</Text> */}
                        <Text style={styles.recordLinkText}>MY_RECORDING.mp4</Text>
                    </TouchableOpacity>
            }
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupLarge}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
                        <Image style={STYLE.cancelButtonIcon} source={require('../../../assets/images/cancel2.png')} />
                    </TouchableOpacity>
                    <View style={styles.popupContent}>
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={[styles.titleTab, STYLE.centerText]}>Add Recording</Text>
                                <Text P style={[STYLE.popupText, STYLE.centerText]}>Record an instructional video for your pupils.</Text>
                                <View style={styles.entryContentMain}>
                                    {/* <TouchableOpacity onPress={() => { toggleModal(); props.onScreeCamera() }} style={styles.entryData}>
                                        <Image style={styles.entryIcon} source={require('../../../assets/images/screen-camera2.png')} />
                                        <Text style={styles.entryTitle}>Screen + Camera</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => { toggleModal(); props.onScreeVoice() }} style={styles.entryData}>
                                        <Image style={styles.entryIcon} source={require('../../../assets/images/screen-voice2.png')} />
                                        <Text style={styles.entryTitle}>Screen + Voice</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { onCameraOnly() }} style={styles.entryData}>
                                        <Image style={styles.entryIcon} source={require('../../../assets/images/camera-only2.png')} />
                                        <Text style={styles.entryTitle}>Camera only</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Popupaddrecording;

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(1),
    },
    popupLarge: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        // width: hp(94.40),
        paddingHorizontal: 150,
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        paddingBottom: hp(6.5),
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(1),
        marginTop: hp(4.5),
    },
    entryContentMain: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: hp(-4.23),
        // marginRight: hp(-4.23),
    },
    entryData: {
        paddingLeft: hp(4.23),
        paddingRight: hp(4.23),
    },
    entryIcon: {
        width: hp(11.19),
        height: hp(11.19),
        resizeMode: 'contain',
        marginBottom: hp(2.6),
        alignSelf: 'center',
    },
    entryTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    recordLinkBlock: {
        width: 170,
        height: 40,
        padding: hp(1.43),
        paddingTop: hp(0.8),
        paddingBottom: hp(0.8),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
    },
    recordLinkBlock2: {
        width: '100%',
        paddingHorizontal: 5,
        paddingTop: hp(0.8),
        paddingBottom: hp(0.8),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        alignItems: 'center',
    },
    topSpaceRecording: {
        marginTop: hp(1.401),
    },
    recordingLinkIcon: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: 10,
    },
    recordLinkText: {
        fontSize: 12,
        fontFamily: FONTS.fontBold,
        textTransform: 'uppercase',
        color: COLORS.darkGrayIntro,
    },
});