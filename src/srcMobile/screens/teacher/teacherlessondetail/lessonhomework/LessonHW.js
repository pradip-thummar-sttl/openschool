import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, ActivityIndicator } from "react-native";
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
import Popupaddrecording from '../../../../component/reusable/popup/Popupaddrecording';
import { opacity, showMessage } from "../../../../../utils/Constant";
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import moment from "moment";
import { Addhomework } from "../../../../../utils/Model";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MESSAGE from "../../../../../utils/Messages";
import { Download } from "../../../../../utils/Download";
import RecordScreen from 'react-native-record-screen';
import { PERMISSIONS, requestMultiple, check, request } from 'react-native-permissions';
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import ArrowDown from "../../../../../svg/teacher/lessonhwplanner/ArrowDown";
import UploadMaterial from "../../../../../svg/teacher/lessonhwplanner/UploadMaterial";
import DownloadSVG from "../../../../../svg/teacher/lessonhwplanner/Download";
import Modal from 'react-native-modal';
const TLHomeWork = (props) => {
    const textInput = useRef(null);
    const [materialArr, setMaterialArr] = useState([])
    const [isAddRecording, setAddRecording] = useState(false)
    const [description, setDescription] = useState("")
    const [isSwitch, setSwitch] = useState(true)
    const [recordingArr, setRecordingArr] = useState([])
    const [itemCheckList, setItemCheckList] = useState([]);
    const [newItem, setNewItem] = useState('');


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate, setSelectedDate] = useState(moment().format('DD/MM/yyyy'))

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isScreenVoiceSelected, setScreenVoiceSelected] = useState(false)
    const [isRecordingStarted, setRecordingStarted] = useState(false)
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)
    const [isModalVisible, setModalVisible] = useState(false);
    const [recordingName, setRecordingName] = useState('');

    const [currentRecordMode, setCurrentRecordMode] = useState('isScreen');
    const [videoRecordingResponse, setVideoRecordingResponse] = useState([])
    const [checkVal, setcheckVal] = useState('false');

    useEffect(() => {
        console.log('`${EndPoints.Homework}/${props.id}`', `${EndPoints.Homework}/${props.id}`);
        Service.get(`${EndPoints.Homework}/${props.id}`, (res) => {
            console.log('response of homework by lesson id', res)
            if (res.flag) {
                Addhomework.IsIncluded = res.data.IsIncluded
                Addhomework.HomeworkDescription = res.data.HomeworkDescription
                Addhomework.LessonId = res.data.LessonId
                Addhomework.CheckList = res.data.CheckList
                Addhomework.CreatedBy = res.data.CreatedBy
                Addhomework.IsUpdate = true
                Addhomework.DueDate = moment(res.data.DueDate).format('DD/MM/yyyy')
                Addhomework.HwId = res.data._id
                setSelectedDate(moment(res.data.DueDate).format('DD/MM/yyyy'))
                setMaterialArr(res.data.MaterialList)
                setRecordingArr(res.data.RecordingList)
                setDescription(res.data.HomeworkDescription)
                setSwitch(res.data.IsIncluded)
                setItemCheckList(res.data.CheckList)
                props.updateBtnName(true)
            } else {
                Addhomework.IsIncluded = true
                Addhomework.HomeworkDescription = ""
                Addhomework.LessonId = ""
                Addhomework.CheckList = []
                Addhomework.CreatedBy = ""
                Addhomework.HwId = ""
                Addhomework.DueDate = moment().format('DD/MM/yyyy')
                Addhomework.IsUpdate = false
                setSelectedDate(moment().format('DD/MM/yyyy'))
                props.updateBtnName(false)
            }
        }, (err) => {
            console.log('Error of homework by lesson id', err)

        })
    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
        var d = moment(date).format('DD/MM/yyyy')
        setSelectedDate(d)
        hideDatePicker();
        Addhomework.DueDate = d
    };

    const addMaterial = () => {
        console.log('hihihihihihi')
        var arr = [...materialArr]
        try {
            DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf,
                DocumentPicker.types.doc,
                DocumentPicker.types.xls,
                DocumentPicker.types.images,
                DocumentPicker.types.plainText],
            }).then((results) => {
                for (const res of results) {
                    console.log(
                        res.uri,
                        res.type, // mime type
                        res.name,
                        res.size
                    );
                    arr.push(res)

                }
                setMaterialArr(arr)
                Addhomework.MaterialArr = arr
            });

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const removeObject = (index1, item) => {
        var array = [...materialArr];
        array.splice(index1, 1);
        setMaterialArr(array)
    }

    const onCheckList = (index) => {
        itemCheckList[index].IsCheck = !itemCheckList[index].IsCheck
        Addhomework.CheckList = itemCheckList
        setcheckVal(!checkVal);
    }

    const onScreeCamera = () => {
        setAddRecording(false)

        props.navigateScreeCamera()
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
    //         Addhomework.RecordingArr = arr

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
    //             Addhomework.RecordingArr = arr
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

    const switchOnOff = (isOn) => {
        setSwitch(isOn)
        Addhomework.IsIncluded = isOn
    }
    const setDesc = (text) => {
        setDescription(text)
        Addhomework.HomeworkDescription = text
    }
    const removeCheckListItem = (_index) => {
        const newList = itemCheckList.filter((item, index) => index !== _index);
        setItemCheckList(newList)
    }
    const pushCheckListItem = () => {
        if (!newItem.trim()) {
            showMessage(MESSAGE.addItem)
            return
        }

        let flag = false;
        itemCheckList.forEach(element => {
            if (element.ItemName.toLowerCase() == newItem.trim().toLowerCase()) {
                flag = true
                return
            }
        });

        if (flag) {
            showMessage(MESSAGE.duplicateItem)
            return
        }

        let temp = [...itemCheckList, {
            ItemName: newItem,
            IsCheck: false
        }]
        setItemCheckList(temp)
        Addhomework.CheckList = temp
        textInput.current.clear()
        setNewItem('')
    }

    const editNewText = (text, index) => {
        let newArray = [...itemCheckList];
        newArray[index].ItemName = text
        setItemCheckList(newArray)
    }

    const itemCheckListView = () => {
        return (
            <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.blockSpaceBottom]}>
                <View style={PAGESTYLE.hrCommon}></View>
                {
                    itemCheckList.length == 0 ?
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>No item added</Text>
                        : null
                }
                <FlatList
                    data={itemCheckList}
                    extraData={checkVal}
                    style={{ alignSelf: 'center', width: '100%', bottom: 20 }}
                    renderItem={({ item, index }) => (
                        <View style={[PAGESTYLE.checkBoxLabelLine,{alignItems : 'center',paddingVertical : Platform.OS === 'android'  ? 5 : 7}]}>
                            <CheckBox
                                style={[PAGESTYLE.checkMark,{top :  Platform.OS === 'android'  ?  3.5  : 0}]}
                                value={item.IsCheck}
                                boxType={'square'}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onCheckColor={COLORS.white}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                onChange={() => onCheckList(index)}

                            />
                            {/* <Text numberOfLines={1} style={[PAGESTYLE.checkBoxLabelText, { width: wp(75) }]}>{item.ItemName}</Text> */}
                            <TextInput
                                style={PAGESTYLE.checkBoxLabelText}
                                onChangeText={text => { editNewText(text, index) }}
                                value={item.ItemName} />
                            <TouchableOpacity
                                style={PAGESTYLE.userIcon1Parent}
                                activeOpacity={opacity}
                                onPress={() => { removeCheckListItem(index) }}>
                                {/* <Image style={PAGESTYLE.userIcon1} source={Images.PopupCloseIcon} /> */}
                                <CloseBlack style={PAGESTYLE.userIcon1} height={hp(2.5)} width={hp(2.5)} />
                            </TouchableOpacity>
                        </View>
                        // <View style={{ margin: 8, }}>
                        //     <Text style={{ fontSize: 22, paddingRight: 50 }}>{item.ItemName}</Text>
                        //     <TouchableOpacity
                        //         style={PAGESTYLE.userIcon1Parent}
                        //         activeOpacity={opacity}
                        //         onPress={() => { removeCheckListItem(index) }}>
                        //         <Image
                        //             style={PAGESTYLE.userIcon1}
                        //             source={Images.PopupCloseIcon} />
                        //     </TouchableOpacity>
                        // </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ ...PAGESTYLE.subjectDateTime, ...PAGESTYLE.textBox1, justifyContent: 'center' }}>
                    <TextInput
                        ref={textInput}
                        style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                        placeholder="Add items pupil may need"
                        autoCapitalize={'sentences'}
                        maxLength={40}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={text => { setNewItem(text) }} />
                    <TouchableOpacity
                        style={{ alignSelf: 'center', position: 'absolute', right: 10 }}
                        opacity={opacity}
                        onPress={() => pushCheckListItem()}>
                        <Text style={{ paddingVertical: 8, }}>ADD ITEM</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                </TouchableOpacity> */}
            </View>
        );
    };

    const removeRecording = () => {
        var arr = [...recordingArr]
        arr.splice(0, 1)
        setRecordingArr(arr)
    }

    const toggleModal = () => {
        console.log('!isModalVisible', !isModalVisible);
        setRecordingStarted(false)
        setModalVisible(!isModalVisible);
    };
    const renderRecordingNamePopup = () => {
        return (
            <Modal isVisible={isModalVisible}>
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
                                // onPress={() => { stopRecording() }}
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

        <KeyboardAwareScrollView>
            <View style={PAGESTYLE.whiteBg}>
                <View style={PAGESTYLE.containerWrap}>
                    <View style={PAGESTYLE.teacherDetailLeft}>
                        <View style={PAGESTYLE.timedateGrp}>
                            <View style={PAGESTYLE.dropDownFormInput}>
                                <View style={PAGESTYLE.toggleBox}>
                                    <View style={PAGESTYLE.toggleGrpBox}>
                                        <Text style={PAGESTYLE.toggleText}>Include homework</Text>
                                        <ToggleSwitch onColor={COLORS.dashboardGreenButton}
                                            isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.timedateGrp}>
                                <View style={PAGESTYLE.dropDownFormInput}>
                                    <Text style={PAGESTYLE.subjectText}>Due Date</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                                        <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                        <TouchableOpacity onPress={() => showDatePicker()} style={PAGESTYLE.subjectDateTimeHomework}>
                                            <View>
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{selectDate}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                value={description}
                                style={PAGESTYLE.commonInputTextareaNormal}
                                onChangeText={(text) => setDesc(text)}
                            />
                        </View>
                        <View style={PAGESTYLE.videoRecording}>
                            <Popupaddrecording
                                recordingArr={recordingArr}
                                isVisible={isAddRecording}
                                isRecordingStarted={isRecordingStarted}
                                isScreenVoiceSelected={isScreenVoiceSelected}
                                onClose={() => setAddRecording(false)}
                                onScreeCamera={() => onScreeCamera()}
                                onScreeVoice={() => onScreeVoice()}
                                onStartScrrenRecording={() => startRecording()}
                                onRemoveRecording={() => removeRecording()}
                                onStopScrrenRecording={() => toggleModal()}
                                onCameraOnly={() => onCameraOnly()} />
                        </View>

                        <View style={PAGESTYLE.requirementofClass}>
                            <View style={STYLE.hrCommon}></View>
                            <Text style={PAGESTYLE.requireText}>Create Checklist</Text>
                            <View style={PAGESTYLE.checkBoxGroup}>
                                {
                                    itemCheckListView()
                                }
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.rightSideBar}>

                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            <Text style={PAGESTYLE.requireText}>Learning material</Text>
                            <Text style={PAGESTYLE.rightBlockText}>Drop links, videos, or documents here or find relevant materials with our clever AI</Text>
                        </View>

                        <TouchableOpacity onPress={() => addMaterial()} style={[PAGESTYLE.uploadBlock]}>
                            <UploadMaterial style={PAGESTYLE.mobileUploadLink} height={50} width={'100%'} />
                        </TouchableOpacity>

                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            {
                                materialArr.length != 0 && materialArr.map((item, index) => {
                                    return (
                                        <View style={PAGESTYLE.fileRender}>
                                            <Text style={{ ...PAGESTYLE.fileName, width: wp(74) }} numberOfLines={1}>{item.name ? item.name : item.originalname}</Text>
                                            {
                                                item.uri ?
                                                    <TouchableOpacity onPress={() => item.uri && removeObject(index, item)} style={[PAGESTYLE.RenderDownload,{marginLeft:hp(0.4)}]}>
                                                        <CloseBlack style={PAGESTYLE.downloadIcon} height={hp(3)} width={hp(3)} />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => { setMateIndex(index); Download(item, (res) => { setLoader(false); setMateIndex(-1) }) }} style={PAGESTYLE.RenderDownload}>
                                                        {(isMatLoading && index == mateIndex) ?
                                                            <ActivityIndicator style={{ ...PAGESTYLE.downloadIcon }} size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.blueBorder} />
                                                            :
                                                            <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2)} width={hp(2)} />
                                                        }
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>


                        <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                            <TouchableOpacity
                                style={PAGESTYLE.buttonGrp}
                                activeOpacity={opacity}
                                onPress={() => props.navigateToVideoGallery()}>
                                <Text style={[STYLE.commonButtonBorderedGreen, PAGESTYLE.fullWidthButton]}>find me learning material</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {renderRecordingNamePopup()}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}
export default TLHomeWork;