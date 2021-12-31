import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
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
import RBSheet from "react-native-raw-bottom-sheet";
import { Download } from "../../../../utils/Download";
import Recording from "../../../../svg/teacher/lessonhwplanner/Recording";
import ScreenVoice from "../../../../svg/teacher/lessonhwplanner/ScreenVoice";
import CameraOnly from "../../../../svg/teacher/lessonhwplanner/CameraOnly";
import PlayBlue from "../../../../svg/pupil/lessonhwplanner/Play_Blue";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const Popupaddrecording = (props) => {
    const refRBSheet = useRef();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)


    const onCameraOnly = () => {
        refRBSheet.current.close();
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
                            style={{ ...styles.recordLinkBlock2, ...styles.topSpaceRecording }}>
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
                        onPress={() => refRBSheet.current.open()}
                        style={[styles.recordLinkBlock, styles.topSpaceRecording]} >
                        <Recording style={[styles.recordingLinkIcon]} height={hp(2.34)} width={hp(2.34)} />
                        <Text style={styles.recordLinkText}>Add Recording</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { setLoader(true); Download(props.recordingArr[0], (res) => { setLoader(false) }) }}
                        activeOpacity={opacity}
                        style={[styles.recordLinkBlock1, styles.topSpaceRecording]}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                isMatLoading ?
                                    <ActivityIndicator
                                        style={{ ...styles.recordingLinkIcon }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.blueBorder} />
                                    :
                                    <PlayBlue style={styles.recordingLinkIcon} height={hp(2.34)} width={hp(2.34)} />
                            }
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.recordLinkText}>{props.recordingArr[0].originalname}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { props.onRemoveRecording() }}
                            style={[styles.cancelButton, { width: hp(3) }]}>
                            <CloseBlack style={[STYLE.cancelButtonIcon1]} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                    </TouchableOpacity>
            }
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={[wp(130.5)]}
                style={{ position: 'relative', }}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: COLORS.bottomSlideUpBack
                    },
                    draggableIcon: {
                        backgroundColor: COLORS.darkGray
                    }
                }}
            >
                <View style={styles.popupLarge}>
                    <View style={styles.popupContent}>
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={[styles.titleTab, STYLE.centerText]}>Add Recording</Text>
                                <Text P style={[STYLE.popupText, STYLE.centerText]}>Record an instructional video for your pupils.</Text>
                                <View style={styles.entryContentMain}>

                                    <TouchableOpacity style={styles.entryData} onPress={() => { refRBSheet.current.close(); props.onScreeVoice() }}>
                                        <ScreenVoice style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                                        <Text style={styles.entryTitle}>Screen + Voice</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.entryData}
                                        onPress={() => { onCameraOnly() }}>
                                        <CameraOnly style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                                        <Text style={styles.entryTitle}>Camera only</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </RBSheet>

        </View>
    );
}
export default Popupaddrecording;

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute',
        right: hp(1),
        zIndex: 9,
        // paddingHorizontal  :5,
        // backgroundColor : 'red'
        // top: hp(1),
    },
    popupLarge: {
        backgroundColor: COLORS.white,
        //borderRadius: hp(2),
        width: wp(100),
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
        flexDirection: 'column',
        alignItems: 'center',
    },
    entryData: {
        paddingTop: hp(1.5),
        paddingBottom: hp(3),
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
        width: Platform.OS == 'android' ? 185 : hp(23.5),
        paddingHorizontal: 10,
        paddingTop: hp(0.8),
        paddingBottom: hp(0.8),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
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
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        // alignItems: 'center',

    },
    recordLinkBlock1: {
        padding: hp(1.43),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(1),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topSpaceRecording: {
        marginTop: hp(1.401),
    },
    recordingLinkIcon: {
        width: hp(2.34),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    recordLinkText: {
        fontSize: Platform.OS == 'android' ? 14 : hp(1.85),
        fontFamily: FONTS.fontSemiBold,
        top: Platform.OS == 'android' ? hp(0.2) : hp(0),
        color: COLORS.darkGray,
        marginLeft: hp(1.3),
        // backgroundColor : 'red',
        width: hp(35),
        textTransform: 'uppercase',
    },
});