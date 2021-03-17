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



const PupilLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                {/* <HeaderWhitepupil /> */}
                <HeaderWhitewithoutsearch />
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