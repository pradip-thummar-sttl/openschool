import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import PupilLesson from './lesson/PupilLesson';
import PupilLessonDue from './lesson/PupilLessonDue';
import PupilLessonDetailInternal from './lesson/PupilLessonDetail';
import PupilHomeWorkDetail from './homework/PupilHomeWorkDetail';
import PupilHomeWorkSubmitted from './homework/PupilHomeWorkSubmitted';
import PupilHomeWorkMarked from './homework/PupilHomeWorkMarked';



const PupilLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [isLesson, setLesson] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilLessonEmpty')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhite onAlertPress={()=>props.navigation.openDrawer()} />
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity style={PAGESTYLE.tabs} onPress={() => setLesson(true)}>
                                <Text style={[PAGESTYLE.tabsText, { color: isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts }]}>Lesson</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLesson(false)}>
                                <Text style={[PAGESTYLE.tabsText, { color: !isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts }]}>Homework</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.lessonstartButton}>
                            <Text>Dynamic Search Goes Here</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={PAGESTYLE.teacherLessonGrid}>
                    {
                        isLesson ?
                            <PupilLesson
                                navigatePupilLessonDetailInternal={() => { props.navigation.navigate('PupilLessonDetailInternal') }} />
                            :
                            <PupilLessonDue
                                navigatePupilHomeworkesubmited={() => { props.navigation.navigate('PupilHomeWorkMarked') }} />
                    }
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