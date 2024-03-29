import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity, showMessage, showMessageWithCallBack } from "../../../../../utils/Constant";
import MESSAGE from "../../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderSave from "./header/HeaderSave";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PopupHomeWorkSave from "../../../../component/reusable/popup/PopupHomeWorkSave";
import { Download } from "../../../../../utils/Download";
import { launchCamera } from "react-native-image-picker";
import RecordScreen from 'react-native-record-screen';

import { PERMISSIONS, requestMultiple, check, request } from 'react-native-permissions';
import Marked from "../../../../../svg/teacher/lessonhwplanner/Marked";
import BronzeFill from "../../../../../svg/teacher/lessonhwplanner/StarBronze_Fill";
import Bronze from "../../../../../svg/teacher/lessonhwplanner/StarBronze";
import SilverFill from "../../../../../svg/teacher/lessonhwplanner/StartSilver_Fill";
import Silver from "../../../../../svg/teacher/lessonhwplanner/StartSilver";
import GoldFill from "../../../../../svg/teacher/lessonhwplanner/StarGold_Fill";
import Gold from "../../../../../svg/teacher/lessonhwplanner/StarGold";
import Doc from "../../../../../svg/common/Doc";

import Modal from 'react-native-modal';
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
var moment = require('moment');

const TLHomeWorkSubmittedDetail = (props) => {

    var data = props.route.params.item
    console.log('data', data);

    const [isHide, action] = useState(true);
    const [feedBack, setFeedback] = useState('')
    const [recordingArr, setRecordingArr] = useState(data.RecordingList)
    const [isAddRecording, setAddRecording] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [isScreenVoiceSelected, setScreenVoiceSelected] = useState(false)
    const [isRecordingStarted, setRecordingStarted] = useState(false)

    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    const [isModalVisible1, setModalVisible1] = useState(false);
    const [recordingName, setRecordingName] = useState('');

    const [currentRecordMode, setCurrentRecordMode] = useState('isScreen');
    const [videoRecordingResponse, setVideoRecordingResponse] = useState([])


    useEffect(() => {
        onStarSelection(data.Rewards)
    }, [])

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }

    const isFieldsValidated = () => {
        if (!feedBack.trim()) {
            showMessage(MESSAGE.feedback)
            return false;
        }

        let formData = new FormData();
        console.log('recordingArr', recordingArr);

        recordingArr.forEach(element => {
            let ext = element.fileName.split('.');

            if (Platform.OS === 'ios') {
                ext = element.uri.split('.');
            }


            formData.append('recording', {
                uri: element.uri,
                name: element.fileName,
                // name: 'MY_RECORDING.mp4',
                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
            });
        })

        formData.append("Feedback", feedBack);
        formData.append("Rewards", isBronze ? '3' : isSilver ? '6' : '9');

        setLoading(true)

        console.log('--------data--------', data);

        Service.postFormData(formData, `${EndPoints.TeacherMarkedHomework}/${data.HomeWorkId}/${data.PupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                setModalVisible(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.homeworkMarked, () => {
                    props.route.params.onGoBack();
                    props.navigation.goBack()
                })
            } else {
                showMessage(res.message)
                setLoading(false)
                setModalVisible(false)
            }
        }, (err) => {
            setLoading(false)
            setModalVisible(false)
            console.log('response of get all lesson error', err)
        })
    }

    const onScreeCamera = () => {
        setAddRecording(false)
    }

    const onScreeVoice = () => {
        setAddRecording(false)
        setScreenVoiceSelected(true)
    }

    const startRecording = async () => {
        // setRecordingStarted(true)
        // RecordScreen.startRecording().catch((error) => setRecordingStarted(false));

        if (Platform.OS === 'android') {
            const res = await check(PERMISSIONS.ANDROID.CAMERA);
            if (res === "granted") {
                setRecordingStarted(true)
                RecordScreen.startRecording().catch((error) => setRecordingStarted(false));
            } else {
                const res2 = await request(PERMISSIONS.ANDROID.CAMERA);
                console.log('hello', res2);

                if (res2 === "granted") {
                    setRecordingStarted(true)
                    RecordScreen.startRecording().catch((error) => setRecordingStarted(false));
                } else {
                    showMessage("We need permission to access  camera")
                }

            }
        } else {
            const res = await check(PERMISSIONS.IOS.CAMERA);
            if (res === "granted") {
                setRecordingStarted(true)
                RecordScreen.startRecording().catch((error) => setRecordingStarted(false));
            } else {
                const res2 = await request(PERMISSIONS.IOS.CAMERA);
                console.log('hello', res2);

                if (res2 === "granted") {
                    setRecordingStarted(true)
                    RecordScreen.startRecording().catch((error) => setRecordingStarted(false));
                } else {
                    showMessage("We need permission to access  camera")
                }

            }
        }
    }

    const stopRecording = async () => {
        if (recordingName.length > 0) {

            var arr = []
            const res = await RecordScreen.stopRecording().catch((error) => {
                setRecordingStarted(false)
                console.warn(error)
            });
            if (res) {
                setRecordingStarted(false)
                const url = res.result.outputURL;
                let ext = url.split('.');
                // let obj = {
                //     uri: Platform.OS == 'android' ? 'file:///' + url : url,
                //     originalname: 'MY_RECORDING.mp4',
                //     fileName: 'MY_RECORDING.mp4',
                //     type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                // }
                let obj = {
                    uri: Platform.OS == 'android' ? 'file:///' + url : url,
                    originalname: `${recordingName}.mp4`,
                    fileName: `${recordingName}.mp4`,
                    type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                }
                arr.push(obj)
                setRecordingArr(arr)
                setScreenVoiceSelected(false)
                setRecordingName("")
                toggleModal()
                console.log('url', url);
            }
        } else {
            // setRecordingStarted(false)
            // toggleModal()
            showMessage('Please provide recording name proper')
        }
    }

    // const stopRecording = async () => {
    //     var arr = []
    //     const res = await RecordScreen.stopRecording().catch((error) => {
    //         setRecordingStarted(false)
    //         console.warn(error)
    //     });
    //     if (res) {
    //         setRecordingStarted(false)
    //         const url = res.result.outputURL;
    //         let ext = url.split('.');
    //         let obj = {
    //             uri: Platform.OS == 'android' ? 'file:///' + url : url,
    //             originalname: 'MY_RECORDING.mp4',
    //             fileName: 'MY_RECORDING.mp4',
    //             type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
    //         }
    //         arr.push(obj)
    //         setRecordingArr(arr)
    //         setScreenVoiceSelected(false)

    //         console.log('url', url);
    //     }
    // }

    // const onCameraOnly = () => {
    //     var arr = [...recordingArr]
    //     launchCamera({ mediaType: 'video', videoQuality: 'low' }, (response) => {
    //         // setResponse(response);
    //         if (response.errorCode) {
    //             showMessage(response.errorCode)
    //         } else if (response.didCancel) {
    //         } else {
    //             console.log('response', response);
    //             arr.push(response)

    //             setRecordingArr(arr)
    //         }

    //     })
    //     setAddRecording(false)

    // }

    const onCameraOnly = () => {

        launchCamera({ mediaType: 'video', videoQuality: 'low' }, (response) => {
            if (response.errorCode) {
                showMessage(response.errorCode)
            } else if (response.didCancel) {
            } else {
                console.log('response', response);

                setVideoRecordingResponse(response)
                setCurrentRecordMode('isCamera')
                toggleModal()
            }

        })
        setAddRecording(false)

    }


    const saveCameraData = () => {

        var arr = [...recordingArr]

        if (recordingName.length > 0) {

            const url = videoRecordingResponse.uri;
            let ext = url.split('.');

            let obj = {
                uri: url,
                originalname: `${recordingName}.mp4`,
                fileName: `${recordingName}.mp4`,
                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
            }
            arr.push(obj)
            setRecordingArr(arr)
            setRecordingName("")
            toggleModal()

        } else {
            showMessage('Please provide recording name proper')
        }

    }


    const onStarSelection = (index) => {
        setBronze(false)
        setSilver(false)
        setGold(false)
        if (index == 3) {
            setBronze(true)
        } else if (index == 6) {
            setSilver(true)
        } else if (index == 9) {
            setGold(true)
        }
    }

    const removeRecording = () => {
        var arr = [...recordingArr]
        arr.splice(0, 1)
        setRecordingArr(arr)
    }
    const toggleModal = () => {
        console.log('!isModalVisible', !isModalVisible1);
        setRecordingStarted(false)
        setModalVisible1(!isModalVisible1);
    };
    const renderRecordingNamePopup = () => {
        return (
            <Modal isVisible={isModalVisible1}>
                <KeyboardAwareScrollView>
                    <View style={PAGESTYLE.popupCard}>
                        <TouchableOpacity style={PAGESTYLE.cancelButton} onPress={toggleModal}>
                            {/* <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} /> */}
                            <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                        <View style={PAGESTYLE.popupContent}>
                            <View style={PAGESTYLE.tabcontent}>
                                <View style={PAGESTYLE.beforeBorder}>
                                    <Text h2 style={PAGESTYLE.titleTab}>Add a recording name</Text>
                                    <View style={[PAGESTYLE.field, { width: wp(80) }]}>
                                        <Text label style={STYLE.labelCommon}>For what recording is?</Text>
                                        <View style={[PAGESTYLE.subjectDateTime, { height: 50, width: '100%' }]}>
                                            <TextInput
                                                multiline={false}
                                                placeholder='Name of event'
                                                value={recordingName}
                                                placeholderStyle={PAGESTYLE.somePlaceholderStyle}
                                                placeholderTextColor={COLORS.popupPlaceHolder}
                                                style={[PAGESTYLE.commonInputTextarea, { height: 50, width: '89%' }]}
                                                onChangeText={eventName => setRecordingName(eventName)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                // onPress={()=>{stopRecording()}}
                                onPress={() => { currentRecordMode === 'isScreen' ? stopRecording() : saveCameraData() }}
                                style={PAGESTYLE.buttonGrp}
                                activeOpacity={opacity}>
                                <Text style={[STYLE.commonButtonGreenDashboardSide,]}>save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        )
    }


    return (
        <View style={PAGESTYLE.mainPage}>


            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderSave
                    isMarked={data.Marked ? true : false}
                    isSubmitted={data.Submited ? true : false}
                    label={`${data.SubjectName} ${data.LessonTopic}`}
                    navigateToBack={() => { props.navigation.goBack() }}
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onSetHomework={() => isFieldsValidated()}
                />

                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.whiteBg}>
                            <View style={PAGESTYLE.containerWrapTop}>
                                <View style={PAGESTYLE.userInfoTop}>
                                    <Text numberOfLines={1} style={[PAGESTYLE.userTopName, { width: wp(45) }]}>{data.PupilName}</Text>
                                    <Text numberOfLines={1} style={[PAGESTYLE.userTopGroup, { width: wp(45) }]}>{data.GroupName}</Text>
                                </View>
                                <View>
                                    <View style={PAGESTYLE.markedLabel}>
                                        {/* <Image source={Images.Marcked} style={PAGESTYLE.markedIcon} /> */}
                                        <Marked style={PAGESTYLE.markedIcon} height={hp(2.13)} width={hp(2.13)} />
                                        <Text style={PAGESTYLE.markedText}>{data.Marked ? 'Marked' : 'Not Marked'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.containerWrapTop}>
                                <View style={PAGESTYLE.userInfoDate}>
                                    <View style={PAGESTYLE.dateNameBlock}>
                                        <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                        <Text style={PAGESTYLE.dateText}>{data.HomeWorkDate ? moment(data.HomeWorkDate).format('DD/MM/yyyy') : '-'}</Text>
                                    </View>
                                    <View style={PAGESTYLE.dateNameBlock}>
                                        <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                        <Text style={PAGESTYLE.dateText}>{data.SubmitedDate ? moment(data.SubmitedDate).format('DD/MM/yyyy') : '-'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.containerWrap}>
                                <View style={PAGESTYLE.teacherDetailLeft}>
                                    <View style={PAGESTYLE.lessonDesc}>
                                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            defaultValue={data.HomeworkDescription}
                                            style={PAGESTYLE.commonInputTextareaNormal}
                                            editable={false} />
                                        {/* <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        defaultValue='Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest its from.'
                                        style={PAGESTYLE.commonInputTextareaNormal}
                                    /> */}
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        {/* <Text style={PAGESTYLE.requireText}>Create Checklist</Text> */}

                                        <FlatList
                                            data={data.CheckList}
                                            renderItem={({ item }) => (
                                                <View style={[PAGESTYLE.checkBoxLabelLine, { paddingVertical: hp(1.6) }]}>
                                                    <CheckBox
                                                        style={[PAGESTYLE.checkMark,]}
                                                        value={item.IsCheck}
                                                        disabled
                                                        tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text numberOfLines={1} style={[PAGESTYLE.checkBoxLabelText, { width: wp(90) }]}>{item.ItemName}</Text>
                                                    </View>
                                                </View>
                                            )}
                                        // style={{ height: 200 }} 
                                        />

                                    </View>
                                </View>
                                <View style={[PAGESTYLE.rightSideBar, PAGESTYLE.borderNone]}>
                                    {/* <View style={PAGESTYLE.uploadBoardBlock}>
                                    <Image source={Images.UploadHomeWorkMobile} style={PAGESTYLE.uploadBoardMobile} />
                                </View> */}
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <Text style={PAGESTYLE.uploaded}>Uploaded Homework</Text>
                                        {console.log('data.HomeworkList', data.HomeworkList)}
                                        <FlatList
                                            data={data.HomeworkList}
                                            style={{ alignSelf: 'center', marginBottom: hp(1) }}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity onPress={() => {
                                                    setLoader(true); setMateIndex(index); Download(item, (res) => {
                                                        setLoader(false)
                                                        setMateIndex(-1)
                                                    })
                                                }} style={PAGESTYLE.downloaBtn}>
                                                    <View style={PAGESTYLE.alignRow}>
                                                        {(isMatLoading && index == mateIndex) ?
                                                            <ActivityIndicator
                                                                style={{ ...PAGESTYLE.markedIcon1 }}
                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                color={COLORS.blueBorder} />
                                                            :
                                                            // <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon1} />
                                                            <Doc style={PAGESTYLE.markedIcon1} />
                                                        }
                                                        {/* <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon1} /> */}
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            numColumns={5}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={STYLE.hrCommon}></View>
                            <View style={PAGESTYLE.containerWrap}>
                                <View style={PAGESTYLE.feedbackBlock}>
                                    <View style={PAGESTYLE.lessonDesc}>
                                        <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder='Leave feedback here'
                                            returnKeyType={"next"}
                                            defaultValue={data.Feedback}
                                            editable={!data.Marked}
                                            autoCapitalize={'sentences'}
                                            style={PAGESTYLE.commonInputTextareaBoldGrey}
                                            onChangeText={feedback => setFeedback(feedback)} />
                                    </View>
                                    {data.Marked ? null :
                                        <Popupaddrecording
                                            recordingArr={recordingArr}
                                            isVisible={isAddRecording}
                                            isRecordingStarted={isRecordingStarted}
                                            isScreenVoiceSelected={isScreenVoiceSelected}
                                            onClose={() => setAddRecording(false)}
                                            onScreeCamera={() => onScreeCamera()}
                                            onScreeVoice={() => onScreeVoice()}
                                            onRemoveRecording={() => removeRecording()}
                                            onStartScrrenRecording={() => startRecording()}
                                            onStopScrrenRecording={() => toggleModal()}
                                            onCameraOnly={() => onCameraOnly()} />
                                    }
                                </View>
                                <View style={PAGESTYLE.ratingBlock}>
                                    <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                    <View style={PAGESTYLE.achivementBox}>
                                        <View style={PAGESTYLE.rewardStarMark}>
                                            <TouchableOpacity onPress={() => !data.Marked ? onStarSelection(3) : null} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    {/* <Image source={isBronze ? Images.BronzeStarFill : Images.BronzeStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {
                                                        isBronze ?
                                                            <BronzeFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            : <Bronze style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                    }
                                                    <Text style={PAGESTYLE.starText}>Bronze star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => !data.Marked ? onStarSelection(6) : null} activeOpacity={opacity}>
                                                <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                                    {/* <Image source={isSilver ? Images.SilverStarFill : Images.SilverStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {
                                                        isSilver ?
                                                            <SilverFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            : <Silver style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                    }
                                                    <Text style={PAGESTYLE.starText}>Silver star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => !data.Marked ? onStarSelection(9) : null} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    {/* <Image source={isGold ? Images.GoldStarFill : Images.GoldStar} style={[PAGESTYLE.starSelected]} /> */}
                                                    {
                                                        isGold ?
                                                            <GoldFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            : <Gold style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                    }
                                                    <Text style={PAGESTYLE.starText}>Gold star</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.submitBtnWrap}>
                                        <PopupHomeWorkSave
                                            isLoading={isLoading}
                                            isModalVisible={isModalVisible}
                                            onSetHomework={() => isFieldsValidated()}
                                            isMarked={data.Marked ? true : false}
                                            isSubmitted={data.Submited ? true : false} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {renderRecordingNamePopup()}
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
export default TLHomeWorkSubmittedDetail;