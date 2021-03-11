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


const TLDetailEdit = (props) => {
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
                            defaultValue='Rainforests are one of the oldest ecosystems on Earth and are fundamental to all life on the planet. You will learn all about different forms of physical geography, including different world ecosystems. You will also learn about everyday items that come from the Amazon Rainforest.'
                            style={PAGESTYLE.commonInputTextarea}
                        />
                    </View>
                    <View style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.videoLinkBlockSpaceTop]}>
                        <Image source={require('../../../../assets/images/recording-icon2.png')} style={PAGESTYLE.recordingLinkIcon} />
                        <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                    </View>
                    <View style={PAGESTYLE.requirementofClass}>
                        <Text style={PAGESTYLE.requireText}>Items that your class will need</Text>
                        <View style={PAGESTYLE.lessonPoints}>
                            <TextInput
                                style={PAGESTYLE.commonInput}
                                placeholder="Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens."
                                autoCapitalize={false}
                                maxLength={40}
                                placeholderTextColor={COLORS.greyplaceholder}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <View style={PAGESTYLE.lessonPoints}>
                            <TextInput
                                style={PAGESTYLE.commonInput}
                                placeholder="Drawing work sheet"
                                autoCapitalize={false}
                                maxLength={40}
                                placeholderTextColor={COLORS.greyplaceholder}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={require('../../../../assets/images/add2.png')} style={PAGESTYLE.addIcon} />
                            <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.checkBoxGrpWrap}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                        <View style={PAGESTYLE.checkBoxGrp}>

                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Reuel Pardesi</Text>
                                <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/cancel2.png')} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Gene Aw</Text>
                                <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/cancel2.png')} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                            </View>
                        </View>
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
                            <ToggleSwitch isOn={true} onToggle={isOn => console.log("changed to : ", isOn)} />
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
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/cancel2.png')} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/cancel2.png')} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={PAGESTYLE.thumbVideo}>
                        <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />
                    </View>
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text></TouchableOpacity>
                    </View>
                    <View style={[PAGESTYLE.thumbVideo, PAGESTYLE.videoLinkBlockSpaceBottom]}>
                        <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                        <View style={PAGESTYLE.videoLinkBlock}>
                            <Image source={require('../../../../assets/images/playIcon2.png')} style={PAGESTYLE.videoLinkIcon} />
                            <Text style={PAGESTYLE.videoLinkText}>Lesson Recording</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}
export default TLDetailEdit;