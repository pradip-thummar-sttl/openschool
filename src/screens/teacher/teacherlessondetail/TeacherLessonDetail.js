import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhitewithoutsearch from "../../../component/reusable/header/HeaderWhitewithoutsearch";
import TLDetailAdd from './lessonplan/TeacherLessonDetailAdd';
import TLDetail from './lessonplan/TeacherLessonDetail';


const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('LessonandHomeworkPlannerDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('LessonandHomeworkPlanner')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhitewithoutsearch />
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity style={PAGESTYLE.tabs}>
                                <Text style={[PAGESTYLE.tabsText, PAGESTYLE.tabsTextSelected]}>lesson plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={PAGESTYLE.tabs}>
                                <Text style={PAGESTYLE.tabsText}>lesson homework</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={PAGESTYLE.tabsText}>homework submitted</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.lessonstartButton}>
                            <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Edit Lesson</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView style={PAGESTYLE.teacherLessonGrid}>
                    <TLDetail />
                    {/* <TLDetailEdit /> */}
                    {/* <TLDetailAdd /> */}
                    {/* <TLHomeWork /> */}
                    {/* <TLVideoGallery /> */}
                    {/* <TLHomeWorkInstructionalVideoAdded /> */}
                    {/* <TLHomeWorkSubmitted /> */}
                    {/* <TLHomeWorkSubmittedDetail /> */}
                    {/* <TLHomeWorkSubmittedDetailConfirmation /> */}
                </ScrollView>

            </View>
        </View>
    );
}
export default TeacherLessonDetail;