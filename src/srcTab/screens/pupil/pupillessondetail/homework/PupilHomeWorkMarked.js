import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import Header15 from '../../../../component/reusable/header/bulck/Header15'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import Images from "../../../../../utils/Images";
import { Download } from "../../../../../utils/Download";
import { baseUrl, opacity } from "../../../../../utils/Constant";
import Video from "react-native-video";
var moment = require('moment');
import HwMarkedBook from '../../../../../svg/pupil/lessonhwplanner/HwMarkedBook'
import Marked from '../../../../../svg/teacher/lessonhwplanner/Marked'
import PlayBlue from '../../../../../svg/pupil/lessonhwplanner/Play_Blue'

const PupilHomeWorkMarked = (props) => {
    const { item } = props;
    const [isPaused, setPause] = useState(true)
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={PAGESTYLE.wrapper}>
                <View style={PAGESTYLE.commonBg}>
                    <Header15
                        onAlertPress={() => props.onAlertPress()}
                        goBack={() => props.goBack()}
                        title={item.SubjectName + ' ' + item.LessonTopic} />

                    <View style={PAGESTYLE.containerWrap}>
                        <View style={PAGESTYLE.containerWrapTopPurple}>
                            <View style={[PAGESTYLE.userLeft, PAGESTYLE.markedPurpleStrip]}>
                                {/* <Image source={require('../../../../../assets/images/bookpurplestrip2.png')} style={PAGESTYLE.bookPurpleStip} /> */}
                                <HwMarkedBook style={PAGESTYLE.bookPurpleStip} height={hp(11.5)} width={hp(11.5)} />
                                <Text style={PAGESTYLE.blueStripText}>Homework has been marked!</Text>
                            </View>
                            <View style={PAGESTYLE.userRight}>
                                <View style={[PAGESTYLE.markedLabel, PAGESTYLE.markSubmittedSpaceLeft]}>
                                    {/* <Image source={require('../../../../../assets/images/marked2.png')} style={PAGESTYLE.markedIcon} /> */}
                                    <Marked style={PAGESTYLE.markedIcon} height={hp(5.2)} width={hp(5.2)} />
                                    <Text style={PAGESTYLE.markedText}>Marked</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                    <Text style={PAGESTYLE.dateText}>{item.DueDate ? moment(item.DueDate).format('DD/MM/yyyy') : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                    <Text style={PAGESTYLE.dateText}>{item.SubmitedDate ? moment(item.SubmitedDate).format('DD/MM/yyyy') : '-'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: '80%', paddingHorizontal: 30 }}>
                        <ScrollView style={{ width: '70%', paddingTop: 30, }}>
                            <View style={PAGESTYLE.lessonDesc}>
                                <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                <Text style={PAGESTYLE.descriptionText}>{item.HomeworkDescription} Homework Description</Text>
                            </View>
                            <FlatList
                                style={{ marginTop: 30 }}
                                data={item.CheckList}
                                renderItem={({ item }) => (
                                    <View style={PAGESTYLE.checkBoxLabelLine}>
                                        <View style={PAGESTYLE.alignRow}>
                                            <CheckBox
                                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
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
                                )} />
                            <View style={PAGESTYLE.commonBg}>
                                <View style={PAGESTYLE.containerWrap1}>
                                    <View style={PAGESTYLE.feedbackBlock}>
                                        <View style={PAGESTYLE.lessonDesc}>
                                            <Text style={PAGESTYLE.lessonTitleBold}>{item.TeacherFirstName} {item.TeacherLastName}'s Feedback</Text>
                                            <Text style={PAGESTYLE.descriptionText}>{item.Feedback}</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.feedbackVideoBlock}>
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
                                                            {/* <Image source={Images.PlayIcon} style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} /> */}
                                                            <PlayBlue style={{ resizeMode: 'cover', alignSelf: 'center' }} height={hp(4)} width={hp(4)} />
                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={PAGESTYLE.rightSideBar}>
                            <View style={PAGESTYLE.uploadBoardBlock}>
                                <Text style={PAGESTYLE.uploaded}>Uploaded Homework</Text>
                                <FlatList
                                    data={item.HomeworkList}
                                    style={{ alignSelf: 'center', }}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => {
                                            setLoader(true);setMateIndex(index); Download(item, (res) => {
                                                setLoader(false)
                                                setMateIndex(-1)
                                            })
                                        }} style={PAGESTYLE.downloaBtn}>
                                            <View style={PAGESTYLE.alignRow1}>
                                                {(isMatLoading && index==mateIndex) ?
                                                    <ActivityIndicator
                                                        style={{ ...PAGESTYLE.pdfIcon }}
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.blueBorder} />
                                                    :

                                                    <Image source={Images.pdfIcon} style={PAGESTYLE.pdfIcon} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilHomeWorkMarked;