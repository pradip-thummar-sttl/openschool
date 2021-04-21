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
import Header15 from '../../../../component/reusable/header/bulck/Header15'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import Images from "../../../../utils/Images";
var moment = require('moment');

const PupilHomeWorkMarked = (props) => {
    const { item } = props.route.params.item;
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={PAGESTYLE.wrapper}>
                <View style={PAGESTYLE.commonBg}>
                    <Header15
                        onAlertPress={() => props.navigation.openDrawer()}
                        goBack={() => props.navigation.goBack()}
                        title={item.SubjectName + ' ' + item.LessonTopic} />
                    <View style={PAGESTYLE.containerWrap}>
                        <View style={PAGESTYLE.containerWrapTopPurple}>
                            <View style={[PAGESTYLE.userLeft, PAGESTYLE.markedPurpleStrip]}>
                                <Image source={require('../../../../assets/images/bookpurplestrip2.png')} style={PAGESTYLE.bookPurpleStip} />
                                <Text style={PAGESTYLE.blueStripText}>Homework has been marked!</Text>
                            </View>
                            <View style={PAGESTYLE.userRight}>
                                <View style={[PAGESTYLE.markedLabel, PAGESTYLE.markSubmittedSpaceLeft]}>
                                    <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.markedIcon} />
                                    <Text style={PAGESTYLE.markedText}>Marked</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                    <Text style={PAGESTYLE.dateText}>{item.DueDate ? moment(item.DueDate).format('YYYY-MM-DD') : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                    <Text style={PAGESTYLE.dateText}>{item.SubmitedDate ? moment(item.SubmitedDate).format('YYYY-MM-DD') : '-'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
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
                                    style={{ alignSelf: 'center', width: '100%', top: 10 }}
                                    renderItem={({ item, index }) => (
                                        <View style={PAGESTYLE.alignRow1}>
                                            <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                        </View>
                                    )}
                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={PAGESTYLE.commonBg}>
                    <View style={PAGESTYLE.containerWrap}>
                        <View style={PAGESTYLE.feedbackBlock}>
                            <View style={PAGESTYLE.lessonDesc}>
                                <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                <Text style={PAGESTYLE.descriptionText}>{item.Feedback}</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.feedbackVideoBlock}>
                            <Image source={require('../../../../assets/images/videoThumb2.png')} style={PAGESTYLE.videoThumbMedium} />
                            <View>
                                <Text style={[PAGESTYLE.lessonFeedDesc, PAGESTYLE.lineLength]}>Reuel Pardesi - Feedback for English </Text>
                                <Text style={PAGESTYLE.techerName}>Miss Barker</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilHomeWorkMarked;