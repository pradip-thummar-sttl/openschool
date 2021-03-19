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

const TLDetailAdd = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isHide, action] = useState(true);

    const [lessonTopic, setLessonTopic] = useState('');
    const [description, setDescription] = useState('');

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
                <ScrollView>
                    <View style={PAGESTYLE.containerWrap}>
                        <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
                            <View style={STYLE.hrCommon}></View>
                            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class details</Text>
                            <View style={PAGESTYLE.timedateGrp}>
                                <View style={PAGESTYLE.dropDownFormInput}>
                                    <Text style={PAGESTYLE.subjectText}>Subject</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                                        <RNPickerSelect style={PAGESTYLE.dropDown}
                                            onValueChange={(value) => console.log(value)}
                                            items={[
                                                { label: 'English', value: 'English' },
                                                { label: 'Geography', value: 'Geography' },
                                                { label: 'History', value: 'History' },
                                                { label: 'Science', value: 'Science' },
                                                { label: 'Math', value: 'Math' },
                                            ]}
                                        />
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
                                            <DateTimePicker
                                                style={PAGESTYLE.dateTime}
                                                value={date}
                                                mode="date"
                                                textColor={{ color: COLORS.darkGray }}
                                                placeHolderTextStyle={{ color: COLORS.darkGray }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                                    <Text style={PAGESTYLE.subjectText}>Time</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                        <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                                        <View style={[PAGESTYLE.subjectDateTime]}>
                                            <DateTimePicker
                                                style={PAGESTYLE.dateTime}
                                                value={date}
                                                mode="time"
                                                textColor={{ color: COLORS.darkGray }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                                    <Text style={PAGESTYLE.subjectText}>Participants</Text>
                                    <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                        <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                                        <View style={[PAGESTYLE.subjectDateTime]}>
                                            <RNPickerSelect style={PAGESTYLE.dropDownSmall}
                                                onValueChange={(value) => console.log(value)}
                                                items={[
                                                    { label: 'Group 1A', value: 'Group 1A' },
                                                    { label: 'Group 1B', value: 'Group 1B' },
                                                    { label: 'Group 1C', value: 'Group 1C' },
                                                    { label: 'Group 1D', value: 'Group 1D' },
                                                    { label: 'Group 1E', value: 'Group 1E' },
                                                ]}
                                            />
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
                                <TouchableOpacity style={PAGESTYLE.addItem}>
                                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
                                <View style={STYLE.hrCommon}></View>
                                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                                <TouchableOpacity style={PAGESTYLE.addItem}>
                                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                                </TouchableOpacity>
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
                                    onPress={()=> props.navigation.navigate('TLVideoGallery')}>
                                    <Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
}
export default TLDetailAdd;