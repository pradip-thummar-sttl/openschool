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
import { opacity } from "../../../../utils/Constant";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderUpdate from "./header/HeaderUpdate";


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
            <HeaderUpdate navigateToBack={() => props.navigation.goBack()}/>
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
                                <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
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
                            defaultValue='Rainforests are one of the oldest ecosystems on Earth and are fundamental to all life on the planet. You will learn all about different forms of physical geography, including different world ecosystems. You will also learn about everyday items that come from the Amazon Rainforest.'
                            style={PAGESTYLE.commonInputTextareaNormal}
                        />
                    </View>
                    <View style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                        <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                        <Popupaddrecording />
                    </View>
                    
                    <View style={PAGESTYLE.requirementofClass}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Items that your class may need</Text>
                        <View style={PAGESTYLE.lessonPoints}>
                            <TextInput
                                style={[PAGESTYLE.commonInput, PAGESTYLE.commonInputFull]}
                                placeholder="Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens."
                                autoCapitalize={false}
                                maxLength={40}
                                placeholderTextColor={COLORS.greyplaceholder}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <View style={PAGESTYLE.lessonPoints}>
                            <TextInput
                                style={[PAGESTYLE.commonInput, PAGESTYLE.commonInputFull]}
                                placeholder="Drawing work sheet"
                                autoCapitalize={false}
                                maxLength={40}
                                placeholderTextColor={COLORS.greyplaceholder}
                                onChangeText={text => this.setState({ email: text })} />
                        </View>
                        <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                            <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.checkBoxGrpWrap}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Add pupils</Text>
                        <View style={PAGESTYLE.checkBoxGrp}>

                            <View style={PAGESTYLE.checkBoxLabel}>
                                <Image source={Images.UserProfilePopup} style={PAGESTYLE.userIconPupil} />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Reuel Pardesi</Text>
                                <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <Image source={Images.UserProfilePopup} style={PAGESTYLE.userIconPupil} />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Gene Aw</Text>
                                <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                            </View>
                        </View>
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
                        <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Material</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Material</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={PAGESTYLE.thumbVideo}>
                        <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} />
                    </View>
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                        <TouchableOpacity
                            style={PAGESTYLE.buttonGrp}
                            activeOpacity={opacity}
                            onPress={()=> props.navigation.navigate('TLVideoGallery')}>
                            <Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                        <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                        <View style={PAGESTYLE.videoLinkBlock}>
                            <Image source={Images.PlayIcon} style={PAGESTYLE.videoLinkIcon} />
                            <Text style={PAGESTYLE.videoLinkText}>Lesson Recording</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.Download} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.Download} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.Download} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.Download} style={PAGESTYLE.downloadIcon} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}
export default TLDetailEdit;