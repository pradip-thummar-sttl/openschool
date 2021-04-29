import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import Header8 from '../../../../component/reusable/header/bulck/Header8'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import Images from "../../../../utils/Images";
import { Download } from "../../../../utils/Download";
var moment = require('moment');

const PupilHomeWorkMarked = (props) => {
    const { item } = props.route.params;
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.wrapper}>
                <View style={PAGESTYLE.whiteBg}>
                    <Header8
                        goBack={() => props.navigation.goBack()}
                        subjectName={item.SubjectName}
                        topicName={item.LessonTopic} />
                    <View style={PAGESTYLE.containerWrapSubmit}>
                        <View style={PAGESTYLE.containerWrapTopSubmit}>
                            <View style={PAGESTYLE.dateBlockRowSubmitted}>
                                <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Homework Date</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.DueDate ? moment(item.DueDate).format('YYYY-MM-DD') : '-'}</Text>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Submitted On</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.SubmitedDate ? moment(item.SubmitedDate).format('YYYY-MM-DD') : '-'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.userLeft, PAGESTYLE.markedPurpleStrip]}>
                                <Image source={require('../../../../assets/images/bookpurplestrip2.png')} style={PAGESTYLE.bookLightBlue} />
                                <Text style={PAGESTYLE.blueStripText}>Homework has been marked!</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: '65%' }}>
                        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.containerWrap}>
                                <View style={PAGESTYLE.teacherDetailLeft}>
                                    <View style={PAGESTYLE.lessonDesc}>
                                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                        <Text style={PAGESTYLE.descriptionText}>{item.HomeworkDescription}</Text>
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <View style={PAGESTYLE.checkBoxGroup}>
                                            <FlatList
                                                data={item.CheckList}
                                                renderItem={({ item }) => (
                                                    <View style={PAGESTYLE.checkBoxLabelLine}>
                                                        <View style={PAGESTYLE.alignRow}>
                                                            <CheckBox
                                                                style={PAGESTYLE.checkMark}
                                                                value={item.IsCheck}
                                                                boxType={'square'}
                                                                onCheckColor={COLORS.white}
                                                                onFillColor={COLORS.dashboardPupilBlue}
                                                                onTintColor={COLORS.dashboardPupilBlue}
                                                                tintColor={COLORS.dashboardPupilBlue}
                                                            />
                                                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                        </View>
                                                    </View>
                                                )}
                                                style={{ height: 200 }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rightSideBar}>
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <Text style={PAGESTYLE.uploaded}>Uploded Homework</Text>
                                        <FlatList
                                            data={item.HomeworkList}
                                            style={{ width: '100%', height: '100%' }}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity onPress={() => Download(item)} style={PAGESTYLE.downloaBtn}>
                                                    <View style={PAGESTYLE.alignRow1}>
                                                        <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            numColumns={4}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.containerWrapMarked}>
                                <View style={PAGESTYLE.feedbackBlock}>
                                    <View style={PAGESTYLE.lessonDescmarked}>
                                        <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                        <Text style={PAGESTYLE.descriptionText}>{item.Feedback}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.feedbackVideoBlock}>
                                    <Image source={require('../../../../assets/images/videoThumb2.png')} style={PAGESTYLE.videoThumbMedium} />
                                    <View>
                                        <Text style={[PAGESTYLE.lessonFeedDesc]}>Feedback for {item.SubjectName} </Text>
                                        <Text style={PAGESTYLE.techerName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilHomeWorkMarked;