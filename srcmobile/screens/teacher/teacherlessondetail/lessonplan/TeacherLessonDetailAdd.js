import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Textarea, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import { showMessage, msgTopic, msgDescription, opacity } from "../../../../utils/Constant";
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

const TLDetailAdd = (props) => {
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
        setSelectedDate(moment(date).format('yyyy-MM-DD'))
        hideDatePicker();
    };

    const addMaterial = () => {
        console.log('hihihihihihi')
        var arr = [...materialArr]
        try {
            DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
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
        
        let temp = {
            ItemName: newItem
        }
        setItemCheckList([...itemCheckList, temp])
        this.item.clear()
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

    onScreeCamera = () => {
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
    onScreeVoice = () => {
        setAddRecording(false)

    }
    onCameraOnly = () => {
        setAddRecording(false)

    }

    const isFieldsValidated = () => {
        if (!lessonTopic) {
            showMessage(MESSAGE.topic)
            return false;
        } else if (!description) {
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
                    style={{ alignSelf: 'center', width: '100%', bottom: 20 }}
                    renderItem={({ item, index }) => (
                        <View style={{ margin: 8, }}>
                            <Text style={{ fontSize: hp(2.08) }}>{item.ItemName}</Text>
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
                        ref={input => { this.item = input }}
                        style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                        placeholder="Add items pupil may need"
                        autoCapitalize={false}
                        maxLength={40}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={text => { setNewItem(text) }} />
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end', position: 'absolute', right: 10 }}
                        opacity={opacity}
                        onPress={() => pushCheckListItem()}>
                        <Text>ADD ITEM</Text>
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
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                onValueChange={(newValue) => pushPupilItem(newValue, index)}
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
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={subjects}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item.SubjectName}></MenuOption>
                            )}
                            style={{ height: 200 }} />
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
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={participants}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 15 }} value={item} text={item.GroupName}></MenuOption>
                            )}
                            style={{ height: 200 }} />
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
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: 200 }} />
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
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item}></MenuOption>
                            )}
                            style={{ height: 200 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const saveLesson = () => {
        if (!selectedSubject) {
            showMessage(MESSAGE.subject)
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
        } else if (!selectedParticipants) {
            showMessage(MESSAGE.participants)
            return false;
        } else if (!lessonTopic) {
            showMessage(MESSAGE.topic)
            return false;
        } else if (!description) {
            showMessage(MESSAGE.description);
            return false;
        } else if (selectedPupils.length == 0) {
            showMessage(MESSAGE.selectPupil);
            return false;
        }

        setLoading(true)

        let data = {
            SubjectId: selectedSubject._id,
            LessonTopic: lessonTopic,
            LessonDate: selectedDate,
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
            CheckList: itemCheckList
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
            data.append('recording', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        })

        if (materialArr.length == 0 && recordingArr.length == 0 && lessionId) {
            showMessage(MESSAGE.lessonAdded)
            setLoading(null)
            return
        }

        console.log('data', data._parts, lessionId);

        Service.postFormData(data, `${EndPoints.LessonMaterialUpload}${lessionId}`, (res) => {
            if (res.code == 200) {
                setLoading(null)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessage(MESSAGE.lessonAdded)
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
                    saveLesson={() => { saveLesson() }} />
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={PAGESTYLE.teacherDetailLeft}>
                                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class details</Text>
                                <View style={PAGESTYLE.timedateGrp}>

                                    {subjectsDropDown()}

                                    <View style={[PAGESTYLE.dropDownFormInput, PAGESTYLE.time]}>
                                        <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                                        <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.textBox]}>
                                            <TextInput
                                                style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                                                placeholder="e.g. Grammar, Fractions, etc"
                                                autoCapitalize={false}
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
                                                <View style={PAGESTYLE.subjectDateTime}>
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
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder='Briefly explain what the lesson is about'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey}
                                        onChangeText={text => setDescription(text)} />
                                </View>
                                <TouchableOpacity style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                    <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                    <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                                </TouchableOpacity>

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
                                        onPress={() => props.navigation.navigate('TLVideoGallery')}>
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