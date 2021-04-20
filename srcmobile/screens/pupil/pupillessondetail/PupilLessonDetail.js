import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import HeaderWhitepupil from "../../../component/reusable/header/HeaderWhitepupil";
import HeaderWhitewithoutsearch from "../../../component/reusable/header/HeaderWhitewithoutsearch";
import PupilLesson from './lesson/PupilLesson';
import PupilLessonDue from './lesson/PupilLessonDue';
import PupilLessonDetailInternal from './lesson/PupilLessonDetail';
import PupilHomeWorkDetail from './homework/PupilHomeWorkDetail';
import PupilHomeWorkSubmitted from './homework/PupilHomeWorkSubmitted';
import PupilHomeWorkMarked from './homework/PupilHomeWorkMarked';
import Header4 from '../../../component/reusable/header/bulck/Header4'


const PupilLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [isLesson, setLesson] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View>
                <Header4 onAlertPress={() => props.navigation.openDrawer()} />
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity style={PAGESTYLE.tabs} onPress={() => setLesson(true)}>
                                <Text style={[PAGESTYLE.tabsText, { color: isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts, fontFamily: isLesson ? FONTS.fontSemiBold : FONTS.fontRegular }]}>Lesson</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLesson(false)}>
                                <Text style={[PAGESTYLE.tabsText, { color: !isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts, fontFamily: !isLesson ? FONTS.fontSemiBold : FONTS.fontRegular }]}>Homework</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={PAGESTYLE.lessonstartButton}>
                            <Text>Dynamic Search Goes Here</Text>
                        </View> */}
                    </View>
                </View>
                <ScrollView  showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    {
                        isLesson ?
                            <PupilLesson
                                navigatePupilLessonDetailInternal={() => { props.navigation.navigate('PupilLessonDetailInternal') }} />
                            :
                            <PupilLessonDue
                                navigatePupilHomeWorkDetail={() => { props.navigation.navigate('PupilHomeWorkDetail') }}
                                navigatePupilHomeWorkSubmitted={() => { props.navigation.navigate('PupilHomeWorkSubmitted') }}
                                navigatePupilHomeWorkMarked={() => { props.navigation.navigate('PupilHomeWorkMarked') }}
                            />
                    }
                    {/* <HeaderBulk /> */}
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