import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import PupilLesson from './lesson/PupilLesson';
import PupilLessonDue from './lesson/PupilLessonDue';
import PupilLessonDetailInternal from './lesson/PupilLessonDetail';
import PupilHomeWorkDetail from './homework/PupilHomeWorkDetail';
import PupilHomeWorkSubmitted from './homework/PupilHomeWorkSubmitted';
import PupilHomeWorkMarked from './homework/PupilHomeWorkMarked';



const PupilLessonDetail = (props) => {
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
                                <Text style={[PAGESTYLE.tabsText, PAGESTYLE.tabsTextSelected]}>Lesson</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={PAGESTYLE.tabsText}>Homework</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.lessonstartButton}>
                            <Text>Dynamic Search Goes Here</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={PAGESTYLE.teacherLessonGrid}>
                    <PupilLesson />
                    {/* <PupilLessonDue /> */}
                    {/* <PupilLessonDetailInternal /> */}
                    {/* <PupilHomeWorkDetail /> */}
                    {/* <PupilHomeWorkSubmitted /> */}
                    {/* <PupilHomeWorkMarked /> */}
                </ScrollView>

            </View>
        </View>
    );
}
export default PupilLessonDetail;