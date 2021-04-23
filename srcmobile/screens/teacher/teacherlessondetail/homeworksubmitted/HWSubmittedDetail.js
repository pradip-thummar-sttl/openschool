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
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PopupHomeWorkSave from "../../../../component/reusable/popup/PopupHomeWorkSave";
var moment = require('moment');

const TLHomeWorkSubmittedDetail = (props) => {

    var data = props.route.params.item
    console.log('data', data);

    const [isHide, action] = useState(true);
    const [feedBack, setFeedback] = useState('')
    const [recordingArr, setRecordingArr] = useState([])
    const [isLoading, setLoading] = useState(false);

    const isFieldsValidated = () => {
        if (!feedBack) {
            showMessage(MESSAGE.feedback)
            return false;
        }

        let formData = new FormData();

        recordingArr.forEach(element => {
            formData.append('recording', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        })

        formData.append("Feedback", feedBack);
        formData.append("Rewards", '1');

        Service.postFormData(formData, `${EndPoints.TeacherMarkedHomework}/${data.HomeWorkId}/${data.PupilId}`, (res) => {
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save lesson', res)
                // setDefaults()
                showMessage(MESSAGE.homeworkMarked)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })
    }


    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}

            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderSave
                    isMarked={data.Marked ? true : false}
                    label={`${data.SubjectName} ${data.LessonTopic}`}
                    navigateToBack={() => { props.navigation.goBack() }}
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onSetHomework={() => isFieldsValidated()} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.containerWrapTop}>
                            <View style={PAGESTYLE.userInfoTop}>
                                <Text style={PAGESTYLE.userTopName}>{data.PupilName}</Text>
                                <Text style={PAGESTYLE.userTopGroup}>{data.GroupName}</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.markedLabel}>
                                    <Image source={Images.Marcked} style={PAGESTYLE.markedIcon} />
                                    <Text style={PAGESTYLE.markedText}>{data.Marked ? 'Marked' : 'Not Marked'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.containerWrapTop}>
                            <View style={PAGESTYLE.userInfoDate}>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                    <Text style={PAGESTYLE.dateText}>{data.HomeWorkDate ? moment(data.HomeWorkDate).format('YYYY-MM-DD') : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                    <Text style={PAGESTYLE.dateText}>{data.SubmitedDate ? moment(data.SubmitedDate).format('YYYY-MM-DD') : '-'}</Text>
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
                                        defaultValue={data.HomeworkDescription}
                                        style={PAGESTYLE.commonInputTextareaNormal}
                                    />
                                    {/* <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        defaultValue='Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest its from.'
                                        style={PAGESTYLE.commonInputTextareaNormal}
                                    /> */}
                                </View>
                                <View style={PAGESTYLE.requirementofClass}>
                                    {/* <Text style={PAGESTYLE.requireText}>Create Checklist</Text> */}
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
                                {/* <View style={PAGESTYLE.uploadBoardBlock}>
                                    <Image source={Images.UploadHomeWorkMobile} style={PAGESTYLE.uploadBoardMobile} />
                                </View> */}
                                <View style={PAGESTYLE.uploadBoardBlock}>
                                    <Text style={PAGESTYLE.uploaded}>Uploded Homework</Text>
                                    <FlatList
                                        data={data.HomeworkList}
                                        style={{ alignSelf: 'center', width: '100%', top: 10 }}
                                        renderItem={({ item, index }) => (
                                            <View style={PAGESTYLE.alignRow}>
                                                <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon1} />
                                            </View>
                                        )}
                                        numColumns={4}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.containerWrap}>
                            <View style={PAGESTYLE.feedbackBlock}>
                                <View style={PAGESTYLE.lessonDesc}>
                                    <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        defaultValue='Leave feedback here'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey}
                                        onChangeText={feedback => setFeedback(feedback)} />
                                </View>
                                <Popupaddrecording />
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
                                <View style={PAGESTYLE.submitBtnWrap}>
                                    <PopupHomeWorkSave
                                        onSetHomework={() => isFieldsValidated()}
                                        isMarked={props.isMarked} />
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