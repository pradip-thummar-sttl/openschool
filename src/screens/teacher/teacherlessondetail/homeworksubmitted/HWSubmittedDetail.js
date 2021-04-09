import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
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
import { showMessage } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderSave from "./header/HeaderSave";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
var moment = require('moment');

const TLHomeWorkSubmittedDetail = (props) => {
    var data = props.route.params.item
    var pupilData = data.PupilList[props.route.params.selectedIndex]

    const [isHide, action] = useState(true);
    const [feedBack, setFeedback] = useState('')

    const isFieldsValidated = () => {
        if (!feedback) {
            showMessage(MESSAGE.feedback)
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

            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderSave
                    navigateToBack={() => props.navigation.goBack()}
                    onAlertPress={() => { props.navigation.openDrawer() }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.containerWrapTop}>
                            <View style={PAGESTYLE.userLeft}>
                                <View style={PAGESTYLE.userThumb}></View>
                                <View>
                                    <Text style={PAGESTYLE.userTopName}>{pupilData.PupilName}</Text>
                                    <Text style={PAGESTYLE.userTopGroup}>{pupilData.GroupName}</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.userRight}>
                                <View style={PAGESTYLE.markedLabel}>
                                    <Image source={Images.Marcked} style={PAGESTYLE.markedIcon} />
                                    <Text style={PAGESTYLE.markedText}>{pupilData.Marked ? 'Marked' : 'Not Marked'}</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                    <Text style={PAGESTYLE.dateText}>{data.HomeWorkDate ? moment(data.HomeWorkDate).format('YYYY-MM-DD') : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                    <Text style={PAGESTYLE.dateText}>{pupilData.SubmitedDate ? moment(pupilData.SubmitedDate).format('YYYY-MM-DD') : '-'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={PAGESTYLE.teacherDetailLeft}>
                                <View style={PAGESTYLE.lessonDesc}>
                                    <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        defaultValue={pupilData.HomeworkDescription}
                                        style={PAGESTYLE.commonInputTextareaNormal}
                                    />
                                </View>
                                <View style={PAGESTYLE.requirementofClass}>
                                    <Text style={PAGESTYLE.requireText}>Create Checklist</Text>
                                    <View style={PAGESTYLE.checkBoxGroup}>
                                        <FlatList
                                            data={data.CheckList}
                                            renderItem={({ item }) => (
                                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={item.IsCheck}
                                                        disabled
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                </View>
                                            )}
                                            style={{ height: 200 }} />
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.rightSideBar, PAGESTYLE.borderNone]}>
                                <View style={PAGESTYLE.uploadBoardBlock}>
                                    <Image source={Images.UploadHomeWork} style={PAGESTYLE.uploadBoard} />
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={PAGESTYLE.feedbackBlock}>
                                <View style={PAGESTYLE.lessonDesc}>
                                    <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        defaultValue='Leave feedback here'
                                        style={PAGESTYLE.commonInputTextarea}
                                        onChangeText={feedback => setFeedback(feedback)} />
                                </View>
                                <View style={PAGESTYLE.videoRecording}>
                                    <View style={PAGESTYLE.recordLinkBlock}>
                                        <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                        <Popupaddrecording />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.ratingBlock}>
                                <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                <View style={PAGESTYLE.achivementBox}>
                                    <View style={PAGESTYLE.rewardStarMark}>
                                        <View style={PAGESTYLE.centerText}>
                                            <Image source={Images.BronzeStar} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                        </View>
                                        <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                            <Image source={Images.SilverStar} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerText}>
                                            <Image source={Images.GoldStar} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default TLHomeWorkSubmittedDetail;