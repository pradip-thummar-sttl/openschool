import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import TLDetail from './lessonplan/TeacherLessonDetail';
import TLDetailEdit from './lessonplan/TeacherLessonDetailEdit';
import TLDetailAdd from './lessonplan/TeacherLessonDetailAdd';
import TLHomeWork from './lessonhomework/TeacherLessonHomeWork';
import TLHomeWorkInstructionalVideoAdded from './lessonhomework/TeacherLessonHomeWorkInstructionalVideoAdded';
import TLHomeWorkSubmitted from './homeworksubmitted/TeacherLessonHomeWorkSubmitted';


const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhite />
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
                    {/* <TLDetail /> */}
                    {/* <TLDetailEdit /> */}
                    {/* <TLDetailAdd /> */}
                    {/* <TLHomeWork /> */}
                    {/* <TLHomeWorkInstructionalVideoAdded /> */}
                    <TLHomeWorkSubmitted />
                </ScrollView>

            </View>
        </View>
    );
}
export default TeacherLessonDetail;