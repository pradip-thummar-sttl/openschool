import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderTT from "./header/HeaderTT";
import { cellWidth, opacity, Var } from "../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata";
import Popup from "../../../component/reusable/popup/Popup";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
const TeacherTimeTable = (props) => {
    const days = ['', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THRUSDAY', 'FRIDAY', 'SATURDAY'];
    const time = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00'];

    const timeTableData__ = [
        {
            Title: 'English - Grammer',
            StartTime: '09:30',
            EndTime: '10:30',
            color: '',
            Date: '2021-03-23T00:00:00.000Z'
        },
        {
            Title: 'Drawing - Grammer',
            StartTime: '01:30',
            EndTime: '02:30',
            color: '',
            Date: '2021-03-23T00:00:00.000Z'
        },
        {
            Title: 'Math - Grammer',
            StartTime: '10:30',
            EndTime: '11:00',
            color: '',
            Date: '2021-03-23T00:00:00.000Z'
        },
        {
            Title: 'Science - Grammer',
            StartTime: '09:00',
            EndTime: '09:30',
            color: '',
            Date: '2021-03-23T00:00:00.000Z'
        },
        {
            Title: 'English - Grammer',
            StartTime: '10:00',
            EndTime: '10:30',
            color: '',
            Date: '2021-03-24T00:00:00.000Z'
        },
        {
            Title: 'English - Grammer',
            StartTime: '09:00',
            EndTime: '09:30',
            Date: '2021-03-23T00:00:00.000Z'
        },
    ]

    const [isHide, action] = useState(true);
    const [timeTableData, setTimeTableData] = useState([])
    const [isTimeTableLoading, setTimeTableLoading] = useState(true)

    const setData = (dayKey, timneKey) => {
        let flag = false, span = 1, lblTitle = '', lblTime = '', data = null;

        timeTableData.forEach(element => {

            const day = new Date(element.Date).getDay();
            const dayOfWeek = isNaN(day) ? null : days[day];

            if (dayOfWeek == days[dayKey]) {
                if (time[timneKey] == (element.StartTime)) {

                    let startTime = Number(element.StartTime.replace(':', ''));
                    let endTime = Number(element.EndTime.replace(':', ''));

                    startTime = (startTime >= 100 && startTime < 900) ? (startTime + 1200) : startTime
                    endTime = (endTime >= 100 && endTime < 900) ? (endTime + 1200) : endTime

                    let timeSpan = (endTime - startTime);
                    span = (timeSpan == 100) ? 2 : (timeSpan < 100) ? 1 : (timeSpan > 100) ? 3 : 4;

                    lblTitle = `${element.SubjectName} - ${element.LessonTopic}`;
                    lblTime = `${element.StartTime} - ${element.EndTime}`;
                    data = element;
                    flag = true;
                    return;
                }
            }
        });

        if (flag) {
            return (
                <Popupdata span={span} title={lblTitle} time={lblTime} data={data} />
            );
        } else {
            return (
                <View style={{ ...PAGESTYLE.day, zIndex: 1, width: cellWidth, }} />
            );
        }
    }

    useEffect(() => {
        Service.get(`${EndPoints.GetTimeTable}/6041cf525ff1ce52e5d4d398`, (res) => {
            setTimeTableLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setTimeTableData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }, [])

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderTT
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }} />

                <View style={{ flex: 1 }}>
                    {isTimeTableLoading ?
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        timeTableData.length > 0 ?
                            <View style={{ ...PAGESTYLE.mainPage }}>
                                <View style={PAGESTYLE.days}>
                                    {days.map((data) => (
                                        <View style={PAGESTYLE.dayLeft}>
                                            <Text style={PAGESTYLE.lableDay}>{data}</Text>
                                        </View>
                                    ))}
                                </View>

                                <ScrollView style={STYLE.padLeftRight}
                                    horizontal={true}>

                                    {time.map((data, timneKey) => (
                                        <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth }}>
                                            <Text style={{ ...PAGESTYLE.lable }}>{data}</Text>

                                            <View style={PAGESTYLE.timeLabel}>
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
                            :
                            <View style={{ height: 100, justifyContent: 'center' }}>
                                <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            </View>
                    }
                </View>
            </View>
        </View>
    );
}
export default TeacherTimeTable;