import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, BackHandler, Platform, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import Video from "react-native-video";
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
import { baseUrl, opacity } from "../../../../utils/Constant";
var moment = require('moment');

const PupilHomeWorkMarked = (props) => {
    const { item } = props.route.params;
    const [isPaused, setPause] = useState(true)
    const [isMatLoading, setLoader] = useState(false)

    console.log('item', item.RecordingList[0].filename);

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }
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
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.DueDate ? moment(item.DueDate).format('DD/MM/yyyy') : '-'}</Text>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Submitted On</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.SubmitedDate ? moment(item.SubmitedDate).format('DD/MM/yyyy') : '-'}</Text>
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
                                                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                                                onFillColor={COLORS.dashboardPupilBlue}
                                                                onTintColor={COLORS.dashboardPupilBlue}
                                                                tintColor={COLORS.dashboardPupilBlue}
                                                            />
                                                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                        </View>
                                                    </View>
                                                )}
                                            // style={{ height: 200 }} 
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rightSideBar}>
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <Text style={PAGESTYLE.uploaded}>Uploaded Homework</Text>
                                        <FlatList
                                            data={item.HomeworkList}
                                            style={{ alignSelf: 'center', }}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity onPress={() =>setLoader(true), Download(item, (res) => {
                                                   setLoader(false)
                                                })} style={PAGESTYLE.downloaBtn}>
                                                    <View style={PAGESTYLE.alignRow1}>
                                                        {isMatLoading ?
                                                            <ActivityIndicator
                                                                style={{ ...PAGESTYLE.markedIcon }}
                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                color={COLORS.blueBorder} />
                                                            :
                                                            <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                        }
                                                        {/* <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} /> */}
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            numColumns={5}
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
                                    <View>
                                        <Text style={[PAGESTYLE.lessonFeedDesc]}>Feedback for {item.SubjectName} </Text>
                                        <Text style={PAGESTYLE.techerName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                    </View>
                                    {item.RecordingList.length == 0 ?
                                        null
                                        :
                                        <View style={PAGESTYLE.largeVideoBlock}>
                                            <View style={{ height: '100%', justifyContent: 'center' }}>
                                                <Video source={{ uri: baseUrl + item.RecordingList[0].filename }}
                                                    resizeMode={'contain'}
                                                    style={PAGESTYLE.largeVideo1}
                                                    controls={true}
                                                    paused={isPaused} />
                                                {isPaused ?
                                                    <TouchableOpacity
                                                        activeOpacity={opacity}
                                                        onPress={() => setPause(!isPaused)}>
                                                        <Image source={Images.PlayIcon} style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} />
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                }
                                            </View>
                                        </View>
                                    }
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