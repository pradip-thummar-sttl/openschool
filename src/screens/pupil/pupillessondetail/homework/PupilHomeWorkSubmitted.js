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
import Header13 from '../../../../component/reusable/header/bulck/Header13'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import Images from "../../../../utils/Images";
var moment = require('moment');

const PupilHomeWorkSubmitted = (props) => {
    const { item } = props
    const [materialArr, setMaterialArr] = useState(item.HomeworkList)
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={PAGESTYLE.whiteBg}>
                <Header13 
                    goBack={() => props.goBack()}
                    title={item.SubjectName + ' ' + item.LessonTopic} />
                <View style={PAGESTYLE.containerWrap}>
                    <View style={PAGESTYLE.containerWrapTop}>
                        <View style={[PAGESTYLE.userLeft, PAGESTYLE.submittedBlueStrip]}>
                            <Image source={require('../../../../assets/images/booklightblue2.png')} style={PAGESTYLE.bookLightBlue} />
                            <Text style={PAGESTYLE.blueStripText}>Homework submitted on time!</Text>
                        </View>
                        <View style={PAGESTYLE.userRight}>
                            <View style={PAGESTYLE.markedLabel}>
                                <Image source={require('../../../../assets/images/submitted2.png')} style={PAGESTYLE.submittedIcon} />
                                <Text style={PAGESTYLE.markedText}>Submitted</Text>
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
                            <Text style={PAGESTYLE.HomeText}>Uploaded Homework</Text>
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
        </View>
    );
}
export default PupilHomeWorkSubmitted;