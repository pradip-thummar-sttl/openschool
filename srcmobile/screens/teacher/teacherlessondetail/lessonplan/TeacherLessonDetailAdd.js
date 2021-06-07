import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TextInput, Textarea, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import { showMessage, msgTopic, msgDescription, opacity, showMessageWithCallBack, isRunningFromVirtualDevice } from "../../../../utils/Constant";
import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";
import MESSAGE from "../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderAddNew from "./header/HeaderAddNew";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import DocumentPicker from 'react-native-document-picker';
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import RecordScreen from 'react-native-record-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { launchCamera } from "react-native-image-picker";
const { DialogModule, Dialog } = NativeModules;

const TLDetailAdd = (props) => {
    const t2 = useRef(null);
    const item = useRef(null);
    const [materialArr, setMaterialArr] = useState([])
    const [recordingArr, setRecordingArr] = useState([])
    const [isAddRecording, setAddRecording] = useState(false)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [lessonTopic, setLessonTopic] = useState('');
    const [description, setDescription] = useState('');

    const [newItem, setNewItem] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('')

    const [subjects, setSubjects] = useState([])
    const [participants, setParticipants] = useState([])
    const [itemCheckList, setItemCheckList] = useState([]);
    const [pupils, setPupils] = useState([]);

    const [timeSlot, setTimeSlots] = useState(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00'])

    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedFromTime, setSelectedFromTime] = useState('')
    const [selectedToTime, setSelectedToTime] = useState('')
    const [selectedParticipants, setSelectedParticipants] = useState('')
    const [selectedPupils, setSelectedPupils] = useState('')

    const [IsDeliveredLive, setDeliveredLive] = useState(false);
    const [IsPublishBeforeSesson, setPublishBeforeSesson] = useState(false);
    const [IsVotingEnabled, setVotingEnabled] = useState(false);

    useEffect(() => {
        Service.get(`${EndPoints.GetSubjectBySchoolId}${User.user.SchoolId}`, (res) => {
            console.log('response of GetSubjectBySchoolId response', res)
            if (res.code == 200) {
                setSubjects(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })

        Service.get(`${EndPoints.GetParticipants}${User.user._id}`, (res) => {
            console.log('response of GetParticipants response', res)
            if (res.code == 200) {
                setParticipants(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetParticipants', err)
        })

        Service.get(`${EndPoints.GetPupilByTeacherId}${User.user._id}`, (res) => {
            console.log('response of GetPupilByTeacherId response', res)
            if (res.code == 200) {
                let newData = []
                res.data.forEach(element => {
                    element.PupilId = element._id
                    newData.push(element)
                });
                setPupils(newData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetPupilByTeacherId', err)
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
        setSelectedDate(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
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
                console.log('results', results);
                for (const res of results) {
                    console.log('KDKDKD',
                        res.uri,
                        res.type, // mime type
                        res.name,
                        res.size
                    );
                    arr.push(res)

                }
                console.log('hello response arr', arr)
                setMaterialArr(arr)
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
        console.log('hello material', array)
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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

        let temp = {
            ItemName: newItem
        }
        setItemCheckList([...itemCheckList, temp])
        item.current.clear()
        setNewItem('')
    }

    const removeCheckListItem = (_index) => {
        const newList = itemCheckList.filter((item, index) => index !== _index);
        setItemCheckList(newList)
    }

    const pushPupilItem = (isSelected, _index) => {
        console.log('isSelected', isSelected, _index);
        if (!isSelected) {
            const newList = selectedPupils.filter((item, index) => item._id !== pupils[_index]._id);
            setSelectedPupils(newList)
        } else {
            setSelectedPupils([...selectedPupils, pupils[_index]])
        }
    }

    const isPupilChecked = (_index) => {
        if (selectedPupils.length > 0) {
            if (selectedPupils.some(ele => ele._id == pupils[_index]._id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const onScreeCamera = () => {
        // RecordScreen.startRecording().catch((error) => console.error(error));
        // setTimeout(() => {

        //     RecordScreen.stopRecording().then((res) => {
        //         if (res) {
        //             console.log('response of recording', res)
        //             const url = res.result.outputURL;
        //         }
        //     }).catch((error) =>
        //         console.warn(error)
        //     );

        // }, 4000);
        setAddRecording(false)
        props.navigation.navigate('ScreenAndCameraRecording')
    }
    const onScreeVoice = () => {
        setAddRecording(false)

    }
    const onCameraOnly = () => {
        var arr = [...recordingArr]
        launchCamera({ mediaType: 'video', videoQuality: 'low' }, (response) => {
            // setResponse(response);
            if (response.errorCode) {
                showMessage(response.errorCode)
            } else {
                console.log('response', response);
                arr.push(response)

                setRecordingArr(arr)
            }

        })
        setAddRecording(false)

    }

    const isFieldsValidated = () => {
        if (!lessonTopic.trim()) {
            showMessage(MESSAGE.topic)
            return false;
        } else if (!description.trim()) {
            showMessage(MESSAGE.description);
            return false;
        }
        return true;
    }

    const itemCheckListView = () => {
        return (
            <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.blockSpaceBottom]}>
                <View style={STYLE.hrCommon}></View>
                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Items your class may need</Text>
                <FlatList
                    data={itemCheckList}
                    style={{ alignSelf: 'center', width: '100%', bottom: hp(1), }}
                    renderItem={({ item, index }) => (
                        <View style={{ margin: hp(0.5), paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: COLORS.dashboardBorder, }}>
                            <Text style={{ fontSize: Platform.OS == 'android' ? hp(1.7) : hp(1.85) }}>{item.ItemName}</Text>
                            <TouchableOpacity
                                style={PAGESTYLE.userIcon1Parent}
                                activeOpacity={opacity}
                                onPress={() => { removeCheckListItem(index) }}>
                                <Image
                                    style={PAGESTYLE.userIcon1}
                                    source={Images.PopupCloseIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ ...PAGESTYLE.subjectDateTime, ...PAGESTYLE.textBox1, justifyContent: 'center' }}>
                    <TextInput
                        ref={item}
                        returnKeyType={"done"}
                        style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                        placeholder="Add items pupil may need"
                        autoCapitalize={'sentences'}
                        maxLength={40}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={text => { setNewItem(text) }} />
                    <TouchableOpacity
                        style={{ alignSelf: 'center', position: 'absolute', right: hp(1) }}
                        opacity={opacity}
                        onPress={() => pushCheckListItem()}>
                        <Text style={{ fontSize: hp(1.6), right: hp(0.5) }}>ADD ITEM</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                </TouchableOpacity> */}
            </View>
        );
    };

    const pupilListView = () => {
        return (
            <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
                <View style={STYLE.hrCommon}></View>
                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                </TouchableOpacity> */}
                <FlatList
                    data={pupils}
                    style={{ alignSelf: 'center', width: '100%', bottom: 20, paddingStart: 5 }}
                    renderItem={({ item, index }) => (
                        <View style={PAGESTYLE.alignRow}>
                            <CheckBox
                                style={PAGESTYLE.checkMark}
                                boxType={'square'}
                                onCheckColor={COLORS.white}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                value={isPupilChecked(index)}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onValueChange={(newValue) => { console.log('newValue', newValue); pushPupilItem(newValue, index) }}
                            />
                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.FirstName} {item.LastName}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    const subjectsDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.subjectText}>Subject</Text>
                <Menu onSelect={(item) => setSelectedSubject(item)}>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedSubject ? selectedSubject.SubjectName : 'Select Subject'}</Text>
                        <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(2), } }}>
                        <FlatList
                            data={subjects}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: hp(1.2) }} value={item} text={item.SubjectName}></MenuOption>
                            )}
                            style={{ height: hp(20) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const participantsDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.participantsField]}>
                <Text style={PAGESTYLE.subjectText}>Participants</Text>
                <Menu onSelect={(item) => setSelectedParticipants(item)}>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedParticipants ? selectedParticipants.GroupName : 'Select'}</Text>
                        <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0), } }}>
                        <FlatList
                            data={participants}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item.GroupName}></MenuOption>
                            )}
                            style={{ height: hp(20) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const fromTimeDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                <Text style={PAGESTYLE.subjectText}>Time</Text>
                <Menu onSelect={(item) => setSelectedFromTime(item)}>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedFromTime ? selectedFromTime : 'From'}</Text>
                        <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0), } }}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <MenuOption style={{ fpadding: hp(1) }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: hp(20) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const toTimeDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                <Text style={PAGESTYLE.subjectText}> </Text>
                <Menu onSelect={(item) => setSelectedToTime(item)}>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedToTime ? selectedToTime : 'To'}</Text>
                        <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0), } }}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <MenuOption style={{ fpadding: hp(1) }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: hp(20) }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const getDataFromQuickBloxAndroid = () => {
        if (!selectedSubject) {
            showMessage(MESSAGE.subject)
            return false;
        } else if (!lessonTopic.trim()) {
            showMessage(MESSAGE.topic)
            return false;
        } else if (!selectedDate) {
            showMessage(MESSAGE.date)
            return false;
        } else if (!selectedFromTime) {
            showMessage(MESSAGE.fromTime)
            return false;
        } else if (!selectedToTime) {
            showMessage(MESSAGE.toTime)
            return false;
        } else if (timeSlot.indexOf(selectedToTime) <= timeSlot.indexOf(selectedFromTime)) {
            showMessage(MESSAGE.invalidTo)
            return false
        } else if (timeSlot.indexOf(selectedToTime) - timeSlot.indexOf(selectedFromTime) > 4) {
            showMessage(MESSAGE.invalidFrom)
            return false
        } else if (!selectedParticipants) {
            showMessage(MESSAGE.participants)
            return false;
        } else if (!description.trim()) {
            showMessage(MESSAGE.description);
            return false;
        } else if (recordingArr.length == 0) {
            showMessage(MESSAGE.recording);
            return false;
        } else if (selectedPupils.length == 0) {
            showMessage(MESSAGE.selectPupil);
            return false;
        }

        setLoading(true)

        createQBDialog()
    };

    const createQBDialog = () => {
        if (isRunningFromVirtualDevice) {
            saveLesson('RUNNING_FROM_VIRTUAL_DEVICE')
        } else {
            let userIDs = [], userNames = [], names = [];
            selectedPupils.forEach(pupil => {
                userIDs.push(pupil.QBUserID)
                userNames.push(pupil.Email)
                names.push(pupil.FirstName + " " + pupil.LastName)
            });
            try {
                if (Platform.OS == 'android') {
                    DialogModule.qbCreateDialog(userIDs, userNames, names, (error, ID) => {
                        console.log('error:eventId', error, ID);
                        if (ID && ID != '' && ID != null && ID != undefined) {
                            saveLesson(ID)
                        } else {
                            setLoading(false)
                            showMessage('Sorry, we are unable to add lesson!')
                        }
                    });
                } else {
                    Dialog.qbCreateDialogtags(userIDs, userNames, names, (ID) => {
                        console.log('eventId--------------------', ID);
                        if (ID && ID != '' && ID != null && ID != undefined) {
                            saveLesson(ID)
                        } else {
                            setLoading(false)
                            showMessage('Sorry, we are unable to add lesson!')
                        }
                    }, (error) => {
                        console.log('event error--------------------', error);
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }

    };

    const saveLesson = (ID) => {

        let data = {
            SubjectId: selectedSubject._id,
            LessonTopic: lessonTopic,
            LessonDate: moment(selectedDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            LessonEndTime: selectedToTime,
            LessonStartTime: selectedFromTime,
            PupilGroupId: selectedParticipants._id,
            LessonDescription: description,
            RecordingName: '',
            RecordedLessonName: '',
            ChatTranscript: '',
            IsDeliveredLive: IsDeliveredLive,
            IsPublishBeforeSesson: IsPublishBeforeSesson,
            IsVotingEnabled: IsVotingEnabled,
            CreatedBy: User.user._id,
            PupilList: selectedPupils,
            CheckList: itemCheckList,
            QBDilogID: ID
        }

        console.log('postData', data);
        Service.post(data, `${EndPoints.Lesson}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                uploadMatirial(res.data._id)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const uploadMatirial = (lessionId) => {
        let data = new FormData();

        materialArr.forEach(element => {
            data.append('materiallist', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        });

        recordingArr.forEach(element => {
            let ext = element.fileName.split('.');

            data.append('recording', {
                uri: element.uri,
                name: element.fileName,
                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
            });
        })

        if (materialArr.length == 0 && recordingArr.length == 0 && lessionId) {
            showMessageWithCallBack(MESSAGE.lessonAdded, () => {
                props.route.params.onGoBack();
                props.navigation.goBack()
            })
            setLoading(false)
            return
        }

        console.log('data', data._parts, lessionId);

        Service.postFormData(data, `${EndPoints.LessonMaterialUpload}${lessionId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.lessonAdded, () => {
                    props.route.params.onGoBack();
                    props.navigation.goBack()
                })
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })

    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? '100%' : '100%' }}>
                <HeaderAddNew
                    isLoading={isLoading}
                    navigateToBack={() => {
                        props.route.params.onGoBack();
                        props.navigation.goBack()
                    }}
                    saveLesson={() => { getDataFromQuickBloxAndroid() }} />
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={PAGESTYLE.teacherDetailLeft}>
                                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class details</Text>
                                <View style={PAGESTYLE.timedateGrp}>

                                    {subjectsDropDown()}

                                    <View style={[PAGESTYLE.dropDownFormInput]}>
                                        <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                                        <View style={[PAGESTYLE.subjectDateTime]}>
                                            <TextInput
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => { t2.current.focus(); }}
                                                style={{ ...PAGESTYLE.commonInput, width: '100%', }}
                                                placeholder="e.g. Grammar, Fractions, etc"
                                                autoCapitalize={'sentences'}
                                                maxLength={40}
                                                placeholderTextColor={COLORS.menuLightFonts}
                                                onChangeText={text => setLessonTopic(text)} />
                                        </View>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow]}>
                                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                                        <Text style={PAGESTYLE.subjectText}>Date</Text>
                                        <TouchableOpacity onPress={() => showDatePicker()}>
                                            <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                                <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                                <View style={PAGESTYLE.subjectDateTimePicker}>
                                                    <Text style={PAGESTYLE.dateTimetextdummy}>{selectedDate ? selectedDate : 'Select'}</Text>
                                                    <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    {participantsDropDown()}

                                </View>
                                <View style={[PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow]}>
                                    {fromTimeDropDown()}

                                    {toTimeDropDown()}
                                </View>
                                <View style={PAGESTYLE.lessonDesc}>
                                    <Text style={PAGESTYLE.lessonTitle}>Lesson Description</Text>
                                    <TextInput
                                        ref={t2}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { item.current.focus(); }}
                                        multiline={true}
                                        autoCapitalize={'sentences'}
                                        numberOfLines={4}
                                        placeholder='Briefly explain what the lesson is about'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey}
                                        onChangeText={text => setDescription(text)} />
                                </View>
                                <Popupaddrecording
                                    recordingArr={recordingArr}
                                    isVisible={isAddRecording}
                                    onClose={() => setAddRecording(false)}
                                    onScreeCamera={() => onScreeCamera()}
                                    onScreeVoice={() => onScreeVoice()}
                                    onCameraOnly={() => onCameraOnly()} />

                                {itemCheckListView()}

                                {pupilListView()}

                                <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
                                    <View style={STYLE.hrCommon}></View>
                                    <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Will this lesson be delivered live</Text>
                                        <ToggleSwitch isOn={IsDeliveredLive} onToggle={isOn => setDeliveredLive(isOn)} />
                                    </View>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Publish lesson before live lesson</Text>
                                        <ToggleSwitch isOn={IsPublishBeforeSesson} onToggle={isOn => setPublishBeforeSesson(isOn)} />
                                    </View>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                                        <ToggleSwitch isOn={IsVotingEnabled} onToggle={isOn => setVotingEnabled(isOn)} />
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

                                {
                                    materialArr.length != 0 ? materialArr.map((item, index) => {
                                        return (
                                            <View style={PAGESTYLE.fileGrp}>
                                                <Text style={PAGESTYLE.fileName}>{item.name}</Text>
                                                <TouchableOpacity onPress={() => removeObject(index, item)}>
                                                    <Image source={Images.PopupCloseIcon} style={PAGESTYLE.downloadIcon} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }) : null
                                }
                                <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                                    <TouchableOpacity
                                        style={PAGESTYLE.buttonGrp}
                                        activeOpacity={opacity}
                                        onPress={() => props.navigation.navigate('TLVideoGallery', { goBack: () => props.navigation.goBack() })}>
                                        <Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        minimumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </KeyboardAwareScrollView>
            </View>
        </View>

    );
}
export default TLDetailAdd;