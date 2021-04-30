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
import { opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderSave from "./header/HeaderSave";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var moment = require('moment');

const TLHomeWorkSubmittedDetail = (props) => {
    var data = props.item
    console.log('data', data);

    const [isHide, action] = useState(true);
    const [feedBack, setFeedback] = useState('')
    const [recordingArr, setRecordingArr] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isAddRecording, setAddRecording] = useState(false)

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);

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
                showMessageWithCallBack(MESSAGE.homeworkMarked, () => {
                    props.route.params.onGoBack();
                    props.navigation.goBack()
                })
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

            <View style={{ width: isHide ? '100%' : '78%' }}>
                <HeaderSave
                    isMarked={data.Marked ? true : false}
                    label={`${data.SubjectName} ${data.LessonTopic}`}
                    navigateToBack={() => { props.navigation.goBack() }}
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onSetHomework={() => isFieldsValidated()} />
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.whiteBg}>
                            <View style={PAGESTYLE.containerWrapTop}>
                                <View style={PAGESTYLE.userLeft}>
                                    <View style={PAGESTYLE.userThumb}></View>
                                    <View>
                                        <Text style={PAGESTYLE.userTopName}>{data.PupilName}</Text>
                                        <Text style={PAGESTYLE.userTopGroup}>{data.GroupName}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.userRight}>
                                    <View style={PAGESTYLE.markedLabel}>
                                        <Image source={Images.Marcked} style={PAGESTYLE.markedIcon} />
                                        <Text style={PAGESTYLE.markedText}>{data.Marked ? 'Marked' : 'Not Marked'}</Text>
                                    </View>
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
                                        <Text style={PAGESTYLE.uploaded}>Uploded Homework</Text>
                                        <FlatList
                                            data={data.HomeworkList}
                                            style={{ alignSelf: 'center', width: '100%', top: 10 }}
                                            renderItem={({ item, index }) => (
                                                <View style={PAGESTYLE.alignRow}>
                                                    <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                </View>
                                            )}
                                            numColumns={4}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
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
                                            placeholder='Leave feedback here'
                                            style={PAGESTYLE.commonInputTextarea}
                                            returnKeyType={"next"}
                                            defaultValue={data.Feedback}
                                            editable={!data.Marked}
                                            onChangeText={feedback => setFeedback(feedback)} />
                                    </View>
                                    <View style={PAGESTYLE.videoRecording}>
                                        <View style={PAGESTYLE.recordLinkBlock}>
                                            <TouchableOpacity onPress={() => setAddRecording(true)} style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                                                <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                                                <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.ratingBlock}>
                                    <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                    <View style={PAGESTYLE.achivementBox}>
                                        <View style={PAGESTYLE.rewardStarMark}>
                                            <TouchableOpacity onPress={() => setBronze(!isBronze)} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    <Image source={isBronze ? Images.BronzeStarFill : Images.BronzeStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setSilver(!isSilver)} activeOpacity={opacity}>
                                                <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                                    <Image source={isSilver ? Images.SilverStarFill : Images.SilverStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setGold(!isGold)} activeOpacity={opacity}>
                                                <View style={PAGESTYLE.centerText}>
                                                    <Image source={isGold ? Images.GoldStarFill : Images.GoldStar} style={[PAGESTYLE.starSelected]} />
                                                    <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
export default TLHomeWorkSubmittedDetail;