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
import DateTimePicker from '@react-native-community/datetimepicker';
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

const TLDetailAdd = (props) => {
    const [materialArr, setMaterialArr] = useState([])
    const [isAddRecording, setAddRecording] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isHide, action] = useState(true);
    const [lessonTopic, setLessonTopic] = useState('');
    const [description, setDescription] = useState('');

    const [newItem, setNewItem] = useState('');
    const [itemCheckList, setItemCheckList] = useState([]);

    const [pupils, setPupils] = useState([{ name: 'Dhruv' }, { name: 'Hiyaan' }, { name: 'Gopal' }, { name: 'Pradip' },]);
    const [selectedPupils, setSelectedPupils] = useState([])

    const [subjects, setSubjects] = useState([])
    const [pupilss, setPupilss] = useState([])
    const [participants, setParticipants] = useState([])
    useEffect(() => {
        Service.get(`${EndPoints.GetSubjectBySchoolId}${User.user._id}`, (res) => {
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
                setPupilss(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetPupilByTeacherId', err)
        })


    }, [])

    const addMaterial = () => {
        console.log('hihihihihihi')
        var arr = [...materialArr]
        try {
            DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
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
        setItemCheckList([...itemCheckList, newItem])
        this.item.clear()
    }

    const removeCheckListItem = (_index) => {
        const newList = itemCheckList.filter((item, index) => index !== _index);
        setItemCheckList(newList)
    }

    const pushPupilItem = (isSelected, _index) => {
        console.log('isSelected', isSelected, _index);
        if (!isSelected) {
            const newList = selectedPupils.filter((item, index) => item.name !== pupils[_index].name);
            setSelectedPupils(newList)
        } else {
            setSelectedPupils([...selectedPupils, pupils[_index]])
        }
    }

    onScreeCamera = () => {
        RecordScreen.startRecording().catch((error) => console.error(error));
        setTimeout(() => {

            RecordScreen.stopRecording().then((res) => {
                if (res) {
                    console.log('response of recording', res)
                    const url = res.result.outputURL;
                }
            }).catch((error) =>
                console.warn(error)
            );

        }, 4000);
    }
    onScreeVoice = () => {

    }
    onCameraOnly = () => {

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
                            <Text style={{ fontSize: 22 }}>{item}</Text>
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
                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.name}</Text>
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
                <Menu>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>Select Subject</Text>
                        <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 30, } }}>
                        <MenuOption style={{ padding: 15 }} text='Science'></MenuOption>
                        <MenuOption style={{ padding: 15 }} text='Math'></MenuOption>
                        <MenuOption style={{ padding: 15 }} text='English'></MenuOption>
                        <MenuOption style={{ padding: 15 }} text='Physics'></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const participantsDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.participantsField]}>
                <Text style={PAGESTYLE.subjectText}>Participants</Text>
                <Menu>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>Select</Text>
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <MenuOption style={{ padding: 10 }} text='Group 1A'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='Group 2A'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='Group 3B'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='Group C5'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='Group 1A'></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const fromTimeDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                <Text style={PAGESTYLE.subjectText}>Time</Text>
                <Menu>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>From</Text>
                        <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const toTimeDropDown = () => {
        return (
            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                <Text style={PAGESTYLE.subjectText}> </Text>
                <Menu>
                    <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                        <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                        <Text style={PAGESTYLE.dateTimetextdummy}>To</Text>
                        <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 20, } }}>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                        <MenuOption style={{ padding: 10 }} text='09:00'></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? '93%' : '78%' }}>
                <HeaderAddNew navigateToBack={() => { props.navigation.goBack() }} />
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
                                <View style={[STYLE.hrCommon, PAGESTYLE.commonWidth]}></View>
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
                                                    <Text style={PAGESTYLE.dateTimetextdummy}>Select</Text>
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
                                        defaultValue='Briefly explain what the lesson is about'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setAddRecording(true)} style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                    <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                    <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                                </TouchableOpacity>

                                {itemCheckListView()}

                                {pupilListView()}

                                <View style={PAGESTYLE.toggleBoxGrpWrap}>
                                    <View style={STYLE.hrCommon}></View>
                                    <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Will this lesson be delivered live</Text>
                                        <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                                    </View>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Publish lesson before live lesson</Text>
                                        <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                                    </View>
                                    <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                                        <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.rightSideBar}>
                                <View style={PAGESTYLE.fileBoxGrpWrap}>
                                    <Text style={PAGESTYLE.requireText}>Learning material</Text>
                                    <Text style={PAGESTYLE.rightBlockText}>Drop links, videos, or documents here or find relevant materials with our clever AI</Text>
                                </View>
                                <TouchableOpacity onPress={() => addMaterial()} style={[PAGESTYLE.uploadBlock]}>
                                    <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
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
                    {

                        // isAddRecording ?
                        //     <View style={{ position: 'absolute' }}>
                        <Popupaddrecording isVisible={isAddRecording} onClose={() => setAddRecording(false)}
                            onScreeCamera={() => onScreeCamera()}
                            onScreeVoice={() => onScreeVoice()}
                            onCameraOnly={() => onCameraOnly()} />
                        // </View>
                        // : null
                    }
                </KeyboardAwareScrollView>
            </View >
        </View>
    );


}
export default TLDetailAdd;