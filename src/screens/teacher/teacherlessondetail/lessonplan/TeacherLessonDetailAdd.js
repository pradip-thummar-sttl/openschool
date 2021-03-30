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
import { showMessage, msgTopic, msgDescription, opacity } from "../../../../utils/Constant";
import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";
import MESSAGE from "../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderAddNew from "./header/HeaderAddNew";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AutoTags from 'react-native-tag-autocomplete';

const TLDetailAdd = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isHide, action] = useState(true);

    const [lessonTopic, setLessonTopic] = useState('');
    const [description, setDescription] = useState('');

    const [newItem, setNewItem] = useState('');
    const [itemCheckList, setItemCheckList] = useState([]);

    const [suggestions, setSuggestions] = useState([{ name: 'Dhruv' }, { name: 'Hiyaan' }, { name: 'Gopal' }, { name: 'Pradip' },]);
    const [tagsSelected, setTagsSelected] = useState([])

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

    const handleDelete = index => {
        let _tagsSelected = tagsSelected;
        _tagsSelected.splice(index, 1);
        setTagsSelected(_tagsSelected)
    }

    const handleAddition = suggestion => {
        setTagsSelected(tagsSelected.concat([suggestion]))
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
                                    <View style={PAGESTYLE.dropDownFormInput}>
                                        <Text style={PAGESTYLE.subjectText}>Subject</Text>
                                        <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                                            <TouchableOpacity>
                                                <Text style={PAGESTYLE.dateTimetextdummy}>English</Text>
                                            </TouchableOpacity>
                                            <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                                        </View>
                                    </View>
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
                                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
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
                                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                                        <Text style={PAGESTYLE.subjectText}>Time</Text>
                                        <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                            <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                                            <View style={[PAGESTYLE.subjectDateTime]}>
                                                <TouchableOpacity>
                                                    <Text style={PAGESTYLE.dateTimetextdummy}>Select</Text>
                                                </TouchableOpacity>
                                                <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                                        <Text style={PAGESTYLE.subjectText}>Participants</Text>
                                        <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                            <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                                            <View style={[PAGESTYLE.subjectDateTime]}>
                                                <TouchableOpacity>
                                                    <Text style={PAGESTYLE.dateTimetextdummy}>Select</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                                        </View>
                                    </View>
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
                                <TouchableOpacity style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                    <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                    <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                                </TouchableOpacity>
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
                                            <Text>ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={PAGESTYLE.addItem}>
                                        <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                                        <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
                                    <View style={STYLE.hrCommon}></View>
                                    <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                                    {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                                        <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                                        <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                                    </TouchableOpacity> */}
                                    <View style={PAGESTYLE.autocompleteContainer}>
                                        <AutoTags
                                            suggestions={suggestions}
                                            tagsSelected={tagsSelected}
                                            handleAddition={handleAddition}
                                            handleDelete={handleDelete}
                                            autoFocus={false}
                                            placeholder="Add a contact.." />
                                    </View>
                                </View>
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
                                <View style={PAGESTYLE.uploadBlock}>
                                    <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
                                </View>
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
                </KeyboardAwareScrollView>
            </View>
        </View>

    );
}
export default TLDetailAdd;