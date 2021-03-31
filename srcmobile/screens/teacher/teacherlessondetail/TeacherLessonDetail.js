import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";

import { opacity } from "../../../utils/Constant";
import TLDetail from "./lessonplan/TeacherLessonDetail";
import TLHomeWork from '../teacherlessondetail/lessonhomework/LessonHW';
import TLHomeWorkSubmitted from '../teacherlessondetail/homeworksubmitted/HWSubmitted';
import HeaderLP from "./header/HeaderLP";
import HeaderHW from "./header/HeaderHW";
import HeaderHWS from "./header/HeaderHWS";

const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [tabIndex, setSelectedTab] = useState(0);

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                {tabIndex == 0 ?
                    <HeaderLP
                        navigateToBack={() => props.navigation.goBack()}
                        onAlertPress={() => props.navigation.openDrawer()} />
                    : tabIndex == 1 ?
                        <HeaderHW
                            navigateToBack={() => props.navigation.goBack()}
                            onAlertPress={() => props.navigation.openDrawer()} />
                        :
                        <HeaderHWS
                            navigateToBack={() => props.navigation.goBack()}
                            onAlertPress={() => props.navigation.openDrawer()} />
                }
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity
                                style={PAGESTYLE.tabs}
                                activeOpacity={opacity}
                                onPress={() => setSelectedTab(0)}>
                                <Text style={[PAGESTYLE.tabsText, tabIndex == 0 ? PAGESTYLE.tabsTextSelected : null]}>lesson plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PAGESTYLE.tabs}
                                activeOpacity={opacity}
                                onPress={() => setSelectedTab(1)}>
                                <Text style={[PAGESTYLE.tabsText, tabIndex == 1 ? PAGESTYLE.tabsTextSelected : null]}>lesson homework</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PAGESTYLE.tabs}
                                activeOpacity={opacity}
                                onPress={() => setSelectedTab(2)}>
                                <Text style={[PAGESTYLE.tabsText, tabIndex == 2 ? PAGESTYLE.tabsTextSelected : null]}>homework submitted</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.lessonstartButton}>
                            <TouchableOpacity
                                style={PAGESTYLE.buttonGrp}
                                activeOpacity={opacity}
                                onPress={() => props.navigation.navigate('TLDetailEdit')}>
                                <Text style={STYLE.commonButtonGreenDashboardSide}>Edit Lesson</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    {tabIndex == 0 ?
                        <TLDetail />
                        : tabIndex == 1 ?
                            <TLHomeWork navigateToVideoGallery={() => props.navigation.navigate('TLVideoGallery')} />
                            :
                            <TLHomeWorkSubmitted navigateToDetail={() => props.navigation.navigate('TLHomeWorkSubmittedDetail')} />
                    }
                    {/* <TLDetailEdit /> */}
                    {/* <TLDetailAdd /> */}
                    {/* <TLVideoGallery /> */}
                    {/* <TLHomeWorkInstructionalVideoWithRecording /> */}
                    {/* <TLHomeWorkInstructionalVideoAdded /> */}
                    {/* <TLHomeWorkSubmittedDetail /> */}
                    {/* <TLHomeWorkSubmittedDetailConfirmation /> */}
                </ScrollView>

            </View>
        </View>
    );
}
export default TeacherLessonDetail;