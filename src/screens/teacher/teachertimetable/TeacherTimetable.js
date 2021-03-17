import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderWhite from "../../../component/reusable/header/HeaderWhite";
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Popupaddnewdata from "../../../component/reusable/popup/Popupaddnewdata"
const TeacherLessonEmpty = (props) => {
    const [isHide, action] = useState(true);

    const setData = (dayKey, timneKey) => {
        let flag = false, span = 1, title = '';
        
        timeTableData.forEach(element => {
            
            if (element.day == days[dayKey]) {
                if (time[timneKey] == (element.startTime)) {
                    
                    let startTime = Number(element.startTime.replace(':', ''));
                    let endTime = Number(element.endTime.replace(':', ''));

                    console.log(startTime, endTime);

                    startTime = (startTime >= 100 && startTime < 900) ? (startTime + 1200) : startTime
                    endTime = (endTime >= 100 && endTime < 900) ? (endTime + 1200) : endTime

                    console.log(startTime, endTime);

                    let timeSpan = (endTime - startTime);
                    span = (timeSpan == 100) ? 2 : (timeSpan < 100) ? 1 : (timeSpan > 100) ? 3 : 4;                    

                    title= element.title;
                    flag = true;

                    console.log('span', span, timeSpan, title);
                    return;
                }
            }
        });

        if (flag) {
            return (
                // <View style={{ backgroundColor: COLORS.black, height: 100, width: 10 }}></View>
                <View style={{ ...PAGESTYLE.day, zIndex: 1, width: 200 * span, backgroundColor: COLORS.white }}>
                    <Text style={{ ...PAGESTYLE.lable, width: 200 * span, backgroundColor: COLORS.white }}>{title}</Text>
                </View>
            );
        } else {
            return (
                <View style={{ ...PAGESTYLE.day, zIndex: 1, width: 200, }}>

                </View>
            );
        }
    }

    const days = ['', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THRUSDAY', 'FRIDAY', 'SATURDAY'];
    const time = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00'];

    const timeTableData = [
        {
            title: 'English - Grammer',
            day: 'MONDAY',
            startTime: '09:30',
            endTime: '10:30',
            color: '',
        },
        {
            title: 'Drawing - Grammer',
            day: 'TUESDAY',
            startTime: '01:30',
            endTime: '02:30',
            color: '',
        },
        {
            title: 'Math - Grammer',
            day: 'MONDAY',
            startTime: '10:30',
            endTime: '11:00',
            color: '',
        },
        {
            title: 'Science - Grammer',
            day: 'WEDNESDAY',
            startTime: '09:00',
            endTime: '09:30',
            color: '',
        },
        {
            title: 'English - Grammer',
            day: 'SATURDAY',
            startTime: '10:00',
            endTime: '10:30',
            color: '',
        },
        {
            title: 'English - Grammer',
            day: 'FRIDAY',
            startTime: '09:00',
            endTime: '09:30'
        },
    ]

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhite />

                <View style={PAGESTYLE.mainPage}>
                    <View style={PAGESTYLE.days}>
                        {days.map((data, key) => (
                            <View style={PAGESTYLE.day}>
                                <Text style={PAGESTYLE.lable}>{data}</Text>
                            </View>
                        ))}
                    </View>

                    <ScrollView style={STYLE.padLeftRight}
                        horizontal={true}>
                        {/* <View style={PAGESTYLE.whiteBoard}>
                        <View><Popupaddnewdata /></View>
                        <View style={{top: 20,}}><Popupdatasecond /></View>
                        <View style={{top: 40,}}><Popupdata /></View>
                    </View> */}
                        {time.map((data, timneKey) => (
                            <View style={{ width: 200 }}>
                                <Text style={{ ...PAGESTYLE.lable, height: 100 }}>{data}</Text>

                                <View>
                                    {days.map((data, dayKey) => (
                                        dayKey != 0 ?
                                            setData(dayKey, timneKey)
                                            :
                                            null

                                    ))}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default TeacherLessonEmpty;