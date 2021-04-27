import React, { useState } from "react";
import { View } from "react-native";
import COLORS from "../../../utils/Colors";
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import LessonandHomeworkPlannerDashboard from "../teacherdashboard/TeacherDashboard";
import TeacherTimeTable from "../teachertimetable/TeacherTimetable";
import TeacherLessonList from "../teacherlessonlist/TeacherLessonList";

const TeacherMaster = (props) => {
    const [tabIndex, setSelectedTab] = useState(0);

    return (
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: COLORS.backgroundColorCommon }}>
            <Sidebar
                moduleIndex={tabIndex}
                navigateToDashboard={() => setSelectedTab(0)}
                navigateToTimetable={() => setSelectedTab(1)}
                navigateToLessonAndHomework={() => setSelectedTab(2)} />
            <View style={{ width: '100%' }}>
                {tabIndex == 0 ?
                    <LessonandHomeworkPlannerDashboard />
                    :
                    tabIndex == 1 ?
                        <TeacherTimeTable />
                        :
                        tabIndex == 2 ?
                            <TeacherLessonList />
                            :
                            null
                }
            </View>
        </View>
    );
}
export default TeacherMaster;