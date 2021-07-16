import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderSave from "./header/HeaderSave";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Download } from "../../../../utils/Download";
import { launchCamera } from "react-native-image-picker";
import RecordScreen from 'react-native-record-screen';
import { PERMISSIONS, requestMultiple, check, request } from 'react-native-permissions';


var moment = require('moment');

const TLHomeWorkSubmittedDetail = (props) => {
    var data = props.item
    console.log('data', data);

    const [isHide, action] = useState(true);
    const [feedBack, setFeedback] = useState('')
    const [recordingArr, setRecordingArr] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddRecording, setAddRecording] = useState(false)

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [isScreenVoiceSelected, setScreenVoiceSelected] = useState(false)
    const [isRecordingStarted, setRecordingStarted] = useState(false)
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }


    useEffect(() => {
        onStarSelection(data.Rewards)
    }, [])

    const isFieldsValidated = () => {
        if (!feedBack.trim()) {
            showMessage(MESSAGE.feedback)
            return false;
        }

        let formData = new FormData();

        recordingArr.forEach(element => {
            let ext = element.fileName.split('.');

            formData.append('recording', {
                uri: element.uri,
                name: element.fileName,
                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
            });
        })

        formData.append("Feedback", feedBack);
        formData.append("Rewards", isBronze ? '3' : isSilver ? '6' : '9');

        setLoading(true)

        Service.postFormData(formData, `${EndPoints.TeacherMarkedHomework}/${data.HomeWorkId}/${data.PupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                setModalVisible(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.homeworkMarked, () => {
                    props.onGoBack();
                    props.goBack()
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
        var arr = []
        const res = await RecordScreen.stopRecording().catch((error) => {
            setRecordingStarted(false)
            console.warn(error)
        });
        if (res) {
            setRecordingStarted(false)
            const url = res.result.outputURL;
            let ext = url.split('.');
            let obj = {
                uri: Platform.OS == 'android' ? 'file:///' + url : url,
                originalname: 'MY_RECORDING.mp4',
                fileName: 'MY_RECORDING.mp4',
                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
            }
            arr.push(obj)
            setRecordingArr(arr)
            setScreenVoiceSelected(false)

            console.log('url', url);
        }
    }

    const onCameraOnly = () => {
        var arr = [...recordingArr]
        launchCamera({ mediaType: 'video', videoQuality: 'low' }, (response) => {
            // setResponse(response);
            if (response.errorCode) {
                showMessage(response.errorCode)
            } else if (response.didCancel) {
            } else {
                console.log('response', response);
                arr.push(response)

                setRecordingArr(arr)
            }

        })
        setAddRecording(false)

    }
    const onStarSelection = (index) => {
        setBronze(false)
        setSilver(false)
        setGold(false)
        if (index == 3) {
            setBronze(true)
        } else if (index == 6) {
            setSilver(true)
        } else {
            setGold(true)

        }
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}

            <View style={{ width: isHide ? '100%' : '78%' }}>
                <HeaderSave
                    isLoading={isLoading}
                    isModalVisible={isModalVisible}
                    isMarked={data.Marked ? true : false}
                    isSubmitted={data.Submited ? true : false}
                    label={`${data.SubjectName} ${data.LessonTopic}`}
                    navigateToBack={() => { props.goBack() }}
                    onAlertPress={() => { props.onAlertPress() }}
                    onSetHomework={() => isFieldsValidated()} />
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.whiteBg}>
                            <View style={PAGESTYLE.containerWrapTop}>
                                <View style={PAGESTYLE.userLeft}>
                                    <Image source={{ uri: baseUrl + data.ProfilePicture }} style={PAGESTYLE.userThumb} />
                                    <View>
                                        <Text style={PAGESTYLE.userTopName}>{data.PupilName}</Text>
                                        <Text style={PAGESTYLE.userTopGroup}>{data.GroupName}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.userRight}>
                                    <View style={PAGESTYLE.markedLabel}>
                                        <Image source={Images.Marcked} style={PAGESTYLE.markedIcon1} />
                                        <Text style={PAGESTYLE.markedText}>{data.Marked ? 'Marked' : 'Not Marked'}</Text>
                                    </View>
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
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <Text style={PAGESTYLE.requireText}>Create Checklist</Text>
                                        <View style={PAGESTYLE.checkBoxGroup}>
                                            <FlatList
                                                data={data.CheckList}
                                                renderItem={({ item }) => (
                                                    <View style={PAGESTYLE.checkBoxLabelLine}>
                                                        <CheckBox
                                                            style={PAGESTYLE.checkMark}
                                                            value={item.IsCheck}
                                                            disabled
                                                            tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                                            boxType={'square'}
                                                            onCheckColor={COLORS.white}
                                                            onFillColor={COLORS.dashboardPupilBlue}
                                                            onTintColor={COLORS.dashboardPupilBlue}
                                                            tintColor={COLORS.dashboardPupilBlue}
                                                        />
                                                        <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                    </View>
                                                )}
                                                style={{ height: 200 }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.rightSideBar, PAGESTYLE.borderNone]}>
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <Text style={PAGESTYLE.uploaded}>Uploaded Homework</Text>
                                        <FlatList
                                            data={data.HomeworkList}
                                            style={{ alignSelf: 'center', width: '100%', top: 10 }}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity onPress={() => Download(item)} style={PAGESTYLE.downloaBtn}>
                                                    <View style={PAGESTYLE.alignRow}>
                                                        <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            numColumns={5}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.containerWrap}>
                                <View style={PAGESTYLE.feedbackBlock}>
                                    <View style={PAGESTYLE.lessonDesc}>
                                        <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            placeholder='Leave feedback here'
                                            style={PAGESTYLE.commonInputTextarea}
                                            returnKeyType={"next"}
                                            defaultValue={data.Feedback}
                                            editable={!data.Marked}
                                            autoCapitalize={'sentences'}
                                            onChangeText={feedback => setFeedback(feedback)} />
                                    </View>
                                    {/* <View style={PAGESTYLE.videoRecording}>
                                        <View style={PAGESTYLE.recordLinkBlock}>
                                            <TouchableOpacity onPress={() => setAddRecording(true)} style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                                <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                                <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
                                    <Popupaddrecording
                                        recordingArr={recordingArr}
                                        isVisible={isAddRecording}
                                        isRecordingStarted={isRecordingStarted}
                                        isScreenVoiceSelected={isScreenVoiceSelected}
                                        onClose={() => setAddRecording(false)}
                                        onScreeCamera={() => onScreeCamera()}
                                        onScreeVoice={() => onScreeVoice()}
                                        onStartScrrenRecording={() => startRecording()}
                                        onStopScrrenRecording={() => stopRecording()}
                                        onCameraOnly={() => onCameraOnly()} />
                                </View>
                                <View style={PAGESTYLE.ratingBlock}>
                                    <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                    <View style={PAGESTYLE.achivementBox}>
                                        <View style={PAGESTYLE.rewardStarMark}>
                                            <TouchableOpacity onPress={() => { !data.Marked ? onStarSelection(3) : null }} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    <Image source={isBronze ? Images.BronzeStarFill : Images.BronzeStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Bronze star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { !data.Marked ? onStarSelection(6) : null }} activeOpacity={opacity}>
                                                <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                                    <Image source={isSilver ? Images.SilverStarFill : Images.SilverStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Silver star</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { !data.Marked ? onStarSelection(9) : null }} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    <Image source={isGold ? Images.GoldStarFill : Images.GoldStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Gold star</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
export default TLHomeWorkSubmittedDetail;