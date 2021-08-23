import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import Images from '../../../../../utils/Images';
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
            Addhomework.RecordingArr = arr

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
                Addhomework.RecordingArr = arr
            }

        })
        setAddRecording(false)

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
                    style={{ alignSelf: 'center', width: '100%', bottom: 20 }}
                    renderItem={({ item, index }) => (
                        <View style={PAGESTYLE.checkBoxLabelLine}>
                            <CheckBox
                                style={PAGESTYLE.checkMark}
                                value={item.IsCheck}
                                boxType={'square'}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onCheckColor={COLORS.white}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                onChange={() => onCheckList(index)}

                            />
                            <Text numberOfLines={1} style={[PAGESTYLE.checkBoxLabelText, { width: wp(75) }]}>{item.ItemName}</Text>
                            <TouchableOpacity
                                style={PAGESTYLE.userIcon1Parent}
                                activeOpacity={opacity}
                                onPress={() => { removeCheckListItem(index) }}>
                                <Image
                                    style={PAGESTYLE.userIcon1}
                                    source={Images.PopupCloseIcon} />
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
                                        <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                        <TouchableOpacity onPress={() => showDatePicker()} style={PAGESTYLE.subjectDateTimeHomework}>
                                            <View>
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{selectDate}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
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
                            {/* <TouchableOpacity onPress={() => setAddRecording(true)} style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                            </TouchableOpacity> */}
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
                            <Image source={Images.MobileUpload} style={PAGESTYLE.mobileUploadLink} />
                        </TouchableOpacity>
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            {
                                materialArr.length != 0 ? materialArr.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => {item.uri ? removeObject(index, item) : setLoader(true); Download(item, (res) => {
                                            setLoader(false)
                                        })}} style={PAGESTYLE.fileGrp}>
                                            <Text style={PAGESTYLE.fileName}>{item.name ? item.name : item.originalname}</Text>
                                            {item.uri ?
                                                <View>
                                                    <Image source={Images.PopupCloseIcon} style={PAGESTYLE.downloadIcon} />
                                                </View>
                                                :
                                                <View>
                                                    {isMatLoading ?
                                                        <ActivityIndicator
                                                            style={{ ...PAGESTYLE.downloadIcon }}
                                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                            color={COLORS.blueBorder} />
                                                        :
                                                        <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                                    }
                                                    {/* <Image source={Images.Download} style={PAGESTYLE.downloadIcon} /> */}
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    )
                                }) : null
                            }
                        </View>
                        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={PAGESTYLE.thumbVideo}>
                                <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} />
                            </View>
                        </ScrollView> */}
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
                {/* <Popupaddrecording isVisible={isAddRecording} onClose={() => setAddRecording(false)}
                    onScreeCamera={() => onScreeCamera()}
                    onScreeVoice={() => onScreeVoice()}
                    onCameraOnly={() => onCameraOnly()} /> */}

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