import React, { useState } from "react";
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity, showMessage } from "../../../../utils/Constant";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderUpdate from "./header/HeaderUpdate";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import moment from 'moment';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useEffect } from "react";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import MESSAGE from "../../../../utils/Messages";


const TLDetailEdit = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isHide, action] = useState(true);
    const [lessonData, setLessonData] = useState(props.route.params.data);
    useEffect(() => {
        if (itemCheckList.length == 0) {
            setItemCheckList(lessonData.CheckList)
            console.log('YES', lessonData.CheckList);
        }
    }, [lessonData])

    const [lessonTopic, setLessonTopic] = useState('');
    const [description, setDescription] = useState('');

    const [newItem, setNewItem] = useState('');
    const [itemCheckList, setItemCheckList] = useState([]);

    const [subjects, setSubjects] = useState([])
    const [participants, setParticipants] = useState([])
    const [pupils, setPupils] = useState([]);

    const [timeSlot, setTimeSlots] = useState(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00'])

    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedFromTime, setSelectedFromTime] = useState('')
    const [selectedToTime, setSelectedToTime] = useState('')
    const [selectedParticipants, setSelectedParticipants] = useState('')
    const [selectedPupils, setSelectedPupils] = useState('')

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
                setPupils(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetPupilByTeacherId', err)
        })


    }, [])

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const pushCheckListItem = () => {
        setItemCheckList([...itemCheckList, newItem])
        this.item.clear()
    }

    const removeCheckListItem = (_index) => {
        const newList = itemCheckList.filter((item, index) => index !== _index);
        setItemCheckList(newList)
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
                            <Text style={{ fontSize: 22, paddingRight: 50 }}>{item.ItemName}</Text>
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
                        placeholder="Add items your pupil need to prepare before class"
                        autoCapitalize={false}
                        maxLength={40}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={text => { setNewItem({ 'ItemName': text }) }} />
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
                    style={{ alignSelf: 'center', width: '100%', bottom: 20 }}
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
                    numColumns={3}
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
                        <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
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
                        <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
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
        console.log('CLICKED', selectedSubject);
        console.log('CLICKED', selectedFromTime);
        console.log('CLICKED', selectedToTime);
        console.log('CLICKED', selectedSubject);
        console.log('CLICKED', selectedParticipants);

        if (isFieldsValidated()) {
            // Call Add Lesson API
        }
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? '93%' : '78%' }}>
                <HeaderUpdate
                    lessonData={lessonData}
                    navigateToBack={() => props.navigation.goBack()}
                    onAlertPress={() => props.navigation.openDrawer()}
                    saveLesson={() => { saveLesson() }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.containerWrap}>
                        <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
                            <View style={STYLE.hrCommon}></View>
                            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class details</Text>
                            <View style={PAGESTYLE.timedateGrp}>

                                {subjectsDropDown()}

                                <View style={[PAGESTYLE.dropDownFormInput, PAGESTYLE.time]}>
                                    <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.textBox]}>
                                        <TextInput
                                            style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                                            placeholder="e.g. Grammar"
                                            defaultValue={lessonData.LessonTopic}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.greyplaceholder}
                                            onChangeText={text => this.setState({ email: text })} />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.timedateGrp}>
                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.dateField]}>
                                    <Text style={PAGESTYLE.subjectText}>Date</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                        <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                        <View style={PAGESTYLE.subjectDateTime}>
                                            <TouchableOpacity>
                                                <Text style={PAGESTYLE.dateTimetextdummy}>{moment(lessonData.Date).format('DD/MM/yyyy')}</Text>
                                            </TouchableOpacity>
                                            <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                                        </View>
                                    </View>
                                </View>

                                {fromTimeDropDown()}

                                {toTimeDropDown()}

                                {participantsDropDown()}
                            </View>

                            <View style={PAGESTYLE.lessonDesc}>
                                <Text style={PAGESTYLE.lessonTitle}>Lesson Description</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    defaultValue={lessonData.LessonDescription}
                                    style={PAGESTYLE.commonInputTextareaNormal}
                                />
                            </View>
                            <View style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                            </View>

                            {itemCheckListView()}

                            {pupilListView()}

                            <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
                                <View style={STYLE.hrCommon}></View>
                                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                                <View style={PAGESTYLE.toggleGrp}>
                                    <Text style={PAGESTYLE.toggleText}>Will this lesson be delivered live</Text>
                                    <ToggleSwitch isOn={lessonData.LiveSession} onToggle={isOn => console.log("changed to : ", isOn)} />
                                </View>
                                <View style={PAGESTYLE.toggleGrp}>
                                    <Text style={PAGESTYLE.toggleText}>Publish lesson before live lesson</Text>
                                    <ToggleSwitch isOn={lessonData.Publish} onToggle={isOn => console.log("changed to : ", isOn)} />
                                </View>
                                <View style={PAGESTYLE.toggleGrp}>
                                    <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                                    <ToggleSwitch isOn={lessonData.IsVotingEnabled} onToggle={isOn => console.log("changed to : ", isOn)} />
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.rightSideBar}>
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
                                <Text style={PAGESTYLE.requireText}>Learning material</Text>
                                <Text style={PAGESTYLE.rightBlockText}>Drop links, videos, or documents here or find relevant materials with our clever AI</Text>
                            </View>
                            <View style={PAGESTYLE.uploadBlock}>
                                <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
                            </View>
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
                                {lessonData.MaterialList.length > 0 ?
                                    <FlatList
                                        data={lessonData.MaterialList}
                                        style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                        renderItem={({ item, index }) => (
                                            <View style={PAGESTYLE.fileGrp}>
                                                <Text style={PAGESTYLE.fileName}>{item.FileName}</Text>
                                                <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                            </View>
                                        )}
                                        numColumns={3}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                    :
                                    null
                                }
                            </View>
                            {lessonData.RecommendedList.length > 0 ?
                                <FlatList
                                    data={lessonData.RecommendedList}
                                    style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                    renderItem={({ item, index }) => (
                                        <View style={PAGESTYLE.thumbVideo}>
                                            <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} />
                                        </View>
                                    )}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                :
                                null
                            }
                            <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                                <TouchableOpacity
                                    style={PAGESTYLE.buttonGrp}
                                    activeOpacity={opacity}
                                    onPress={() => props.navigation.navigate('TLVideoGallery')}>
                                    <Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text>
                                </TouchableOpacity>
                            </View>
                            {lessonData.RecordedLessonName ?
                                <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                                    <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                                    <View style={PAGESTYLE.videoLinkBlock}>
                                        <Image source={Images.PlayIcon} style={PAGESTYLE.videoLinkIcon} />
                                        <Text style={PAGESTYLE.videoLinkText}>{lessonData.RecordedLessonName}</Text>
                                    </View>
                                </View>
                                :
                                null
                            }

                            {lessonData.ChatTranscript ?
                                <View style={PAGESTYLE.fileBoxGrpWrap}>
                                    <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                                    <View style={PAGESTYLE.fileGrp}>
                                        <Text style={PAGESTYLE.fileName}>{lessonData.ChatTranscript}</Text>
                                        <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.Download} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View >

    );
}
export default TLDetailEdit;