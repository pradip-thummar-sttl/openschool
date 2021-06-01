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
import Header7 from '../../../../component/reusable/header/bulck/Header7'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import Images from "../../../../utils/Images";
import { Download } from "../../../../utils/Download";
var moment = require('moment');

const PupilHomeWorkSubmitted = (props) => {
    const { item } = props.route.params
    const [materialArr, setMaterialArr] = useState(item.HomeworkList)
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.whiteBg}>
                <Header7
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
                        <View style={[PAGESTYLE.userLeft, PAGESTYLE.submittedBlueStrip]}>
                            <Image source={require('../../../../assets/images/booklightblue2.png')} style={PAGESTYLE.bookLightBlue} />
                            <Text style={PAGESTYLE.blueStripText}>Homework submitted on time!</Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                                        tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
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
                                {/* <Image source={Images.UploadHomeWorkMobile} style={PAGESTYLE.uploadBoardsubmit} /> */}
                                <Text style={PAGESTYLE.HomeText}>Uploaded Homework</Text>
                                <FlatList
                                    data={item.HomeworkList}
                                    style={{ alignSelf: 'center', width: '100%', top: 10 }}
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
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilHomeWorkSubmitted;