import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { opacity } from "../../../../utils/Constant";
import { Download } from "../../../../utils/Download";
import Recording from "../../../../svg/teacher/lessonhwplanner/Recording";
import CameraOnly from "../../../../svg/teacher/lessonhwplanner/CameraOnly";
import ScreenVoice from "../../../../svg/teacher/lessonhwplanner/ScreenVoice";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";

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


    return (
        <View>
            {props.isScreenVoiceSelected ?
                <View>
                    {!props.isRecordingStarted ?
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => props.onStartScrrenRecording()}
                            style={{ ...styles.recordLinkBlock2, ...styles.topSpaceRecording, width  : hp(35)}}>
                            <Text style={styles.recordLinkText}>Start Screen + Voice Recording</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => props.onStopScrrenRecording()}
                            style={{ ...styles.recordLinkBlock2Stop, ...styles.topSpaceRecording,width : hp(20) }}>
                            <Text style={styles.recordLinkText}>Stop Recording</Text>
                        </TouchableOpacity>
                    }
                </View>
                :
                props.recordingArr.length == 0 ?
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={toggleModal}
                        style={styles.recordingNewButton}>
                        <Recording style={styles.recordingLinkIcon} height={hp(2.34)} width={hp(2.34)} />
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.txtRecordLink}>Add Recording</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  onPress={() => {Download(props.recordingArr[0], (res) => { }) }} activeOpacity={opacity}
                        style={[styles.recordLinkBlock1, styles.topSpaceRecording]} >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.recordLinkText]}>{props.recordingArr[0].originalname}</Text>
                        <TouchableOpacity style={[styles.cancelButton]} onPress={() => { props.onRemoveRecording() }}>
                            <CloseBlack style={[STYLE.cancelButtonIcon1]} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                    </TouchableOpacity>
            }
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupLarge}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={styles.popupContent}>
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text numberOfLines={1} ellipsizeMode='tail' h2 style={[styles.titleTab, STYLE.centerText]}>Add Recording</Text>
                                <Text P style={[STYLE.popupText, STYLE.centerText]}>Record an instructional video for your pupils.</Text>
                                <View style={styles.entryContentMain}>
                                    <TouchableOpacity onPress={() => { toggleModal(); props.onScreeVoice() }} style={styles.entryData}>
                                        <ScreenVoice style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                                        <Text style={styles.entryTitle}>Screen + Voice</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { onCameraOnly() }} style={styles.entryData}>
                                        <CameraOnly style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
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
        right:Platform.OS === 'android' ?  hp(1.5) : hp(1),
        zIndex: 9,
        // top: hp(1),
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
        // width : Platform.OS === 'android' ? hp(50.15) : hp(20.15),

        width: hp(20.15),
        // height : Platform.OS === 'android' ? hp(20.15) : hp(5.20),
        height: hp(5.20),
        padding: hp(1.43),
        // paddingTop: hp(0.8),
        // paddingBottom: hp(0.8),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent : 'center',
        // alignItems : 'center'

    },
    recordLinkBlock1: {
        height: Platform.OS === 'android' ? hp(7.20) : hp(5.20),
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
        paddingEnd:  Platform.OS === 'android' ? 25  :55,
        // width: hp(20.15),
    },
    recordLinkBlock2: {
        width: '32%',
       
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        // alignItems: 'center',
        // paddingStart : 10
        padding: hp(1.43),

    },
    recordLinkBlock2Stop : {
        width: '20%',
       
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        // alignItems: 'center',
        // paddingStart : 10
        padding: hp(1.43),
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
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        textTransform: 'uppercase',
        color: COLORS.darkGrayIntro,
        paddingEnd : 10
    },

    recordingNewButton: {
        width: wp(16),
        height: hp(5.20),
        paddingHorizontal: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: hp(1.401),
    },
    txtRecordLink: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        textTransform: 'uppercase',
        color: COLORS.darkGrayIntro,
        paddingEnd : 10,
    },
});