import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Textarea, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';


const TLDetailAdd = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (

        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>
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
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dropDownFormInput, PAGESTYLE.time]}>
                            <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                            <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.textBox]}>
                                <TextInput
                                    style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                                    placeholder="Grammar"
                                    autoCapitalize={false}
                                    maxLength={40}
                                    placeholderTextColor={COLORS.greyplaceholder}
                                    onChangeText={text => this.setState({ email: text })} />
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.timedateGrp}>
                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                            <Text style={PAGESTYLE.subjectText}>Date</Text>
                            <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                <Image style={PAGESTYLE.calIcon} source={require('../../../../assets/images/calendar-small-icon2.png')} />
                                <View style={PAGESTYLE.subjectDateTime}>
                                    <DateTimePicker
                                        style={PAGESTYLE.dateTime}
                                        value={date}
                                        mode="date"
                                        textColor={{ color: COLORS.darkGray }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                            <Text style={PAGESTYLE.subjectText}>Time</Text>
                            <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}>
                                <Image style={PAGESTYLE.timeIcon} source={require('../../../../assets/images/clock2.png')} />
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
                                <Image style={PAGESTYLE.calIcon} source={require('../../../../assets/images/group2.png')} />
                                <View style={[PAGESTYLE.subjectDateTime]}>
                                    <RNPickerSelect style={PAGESTYLE.dropDownSmall}
                                        onValueChange={(value) => console.log(value)}
                                        items={[
                                            { label: 'English', value: 'English' },
                                            { label: 'Geography', value: 'Geography' },
                                            { label: 'History', value: 'History' },
                                            { label: 'Science', value: 'Science' },
                                            { label: 'Math', value: 'Math' },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitle}>Lesson Description</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            defaultValue='Briefly explain what the lesson is about'
                            style={PAGESTYLE.commonInputTextarea}
                        />
                    </View>
                    <View style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.videoLinkBlockSpaceTop]}>
                        <Image source={require('../../../../assets/images/recording-icon2.png')} style={PAGESTYLE.recordingLinkIcon} />
                        <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                    </View>
                    <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.blockSpaceBottom]}>
                        <Text style={PAGESTYLE.requireText}>Items your class may need</Text>
                        <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={require('../../../../assets/images/add2.png')} style={PAGESTYLE.addIcon} />
                            <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                        <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={require('../../../../assets/images/add2.png')} style={PAGESTYLE.addIcon} />
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
                        <Image source={require('../../../../assets/images/dropHolder2.png')} style={PAGESTYLE.grpThumbVideo} />
                    </View>
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text></TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </View>

    );
}
export default TLDetailAdd;