import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';

import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header3 from '../../../component/reusable/header/bulck/Header3'
import { Var } from "../../../utils/Constant";

const PupilTimetable = (props) => {
    const [isHide, action] = useState(true);

    const setData = (dayKey, timneKey) => {
        let flag = false, span = 1, title = '';

        timeTableData.forEach(element => {

            if (element.day == days[dayKey]) {
                if (time[timneKey] == (element.startTime)) {

                    let startTime = Number(element.startTime.replace(':', ''));
                    let endTime = Number(element.endTime.replace(':', ''));

                    startTime = (startTime >= 100 && startTime < 900) ? (startTime + 1200) : startTime
                    endTime = (endTime >= 100 && endTime < 900) ? (endTime + 1200) : endTime

                    let timeSpan = (endTime - startTime);
                    span = (timeSpan == 100) ? 2 : (timeSpan < 100) ? 1 : (timeSpan > 100) ? 3 : 4;

                    title = element.title;
                    flag = true;
                    return;
                }
            }
        });

        if (flag) {
            return (
                // <View style={{ backgroundColor: COLORS.black, height: 100, width: 10 }}></View>
                <Popupdata span={span} title={title} />
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
            <Sidebarpupil hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <Header3
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }} />

                <View style={PAGESTYLE.mainPage}>
                    <View style={PAGESTYLE.days}>
                        {days.map((data) => (
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
export default PupilTimetable;