import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import { cellWidth, Lesson, opacity, Var } from "../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header3 from '../../../component/reusable/header/bulck/Header3'
import { useDispatch } from "react-redux";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import COLORS from "../../../utils/Colors";
import { setCalendarEventData } from "../../../actions/action";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const PupilTimetable = (props) => {
    const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
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
    const dispatch = useDispatch()

    useEffect(() => {
        Service.get(`${EndPoints.AllEventHomworklessonpupil}/${User.user.UserDetialId}`, (res) => {
            console.log('response of calender event is:', res)
            if (res.code == 200) {
                dispatch(setCalendarEventData(res.data))
            }
        }, (err) => {
            console.log('response of calender event eror is:', err)
        })
    }, [])

    const [timeTableData, setTimeTableData] = useState([])
    const [isTimeTableLoading, setTimeTableLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')

    const setData = (dayKey, timneKey) => {
        let flag = false, span = 1, lblTitle = '', lblTime = '', data = null;

        timeTableData.forEach(element => {

            const day = new Date(element.Type == Lesson ? element.Date : element.EventDate).getDay();
            const dayOfWeek = isNaN(day) ? null : days[day];


            if (dayOfWeek == days[dayKey]) {
                let startTime = element.Type == Lesson ? element.StartTime : element.EventStartTime
                let endTime = element.Type == Lesson ? element.EndTime : element.EventEndTime
                let subName = element.Type == Lesson ? element.SubjectName : element.EventType
                let lessonTopic = element.Type == Lesson ? element.LessonTopic : element.EventLocation

                if (time[timneKey].includes(startTime)) {

                    let st = Number(startTime.replace(':', ''));
                    let et = Number(endTime.replace(':', ''));

                    st = (st >= 100 && st < 900) ? (st + 1200) : st
                    et = (et >= 100 && et < 900) ? (et + 1200) : et

                    let timeSpan = (et - st);
                    span = (timeSpan == 100) ? 2 : (timeSpan < 100) ? 1 : (timeSpan > 100) ? 3 : 4;

                    lblTitle = `${subName} - ${lessonTopic}`;
                    lblTime = `${startTime} - ${endTime}`;
                    data = element;
                    flag = true;
                    return;
                }
            }
        });

        if (flag) {
            return (
                <Popupdata span={span} title={lblTitle} time={lblTime} data={data} isPupil={true} isLesson={data.Type == Lesson} />
            );
        } else {
            return (
                <View style={{ ...PAGESTYLE.day, zIndex: 1, width: cellWidth, height: hp(8.59) }} />
            );
        }
    }

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        console.log('data', EndPoints.GetTimeTablePupil + '/' + User.user.UserDetialId);

        Service.post(data, `${EndPoints.GetTimeTablePupil}/${User.user.UserDetialId}`, (res) => {
            setTimeTableLoading(false)
            console.log('response ', res)

            if (res.code == 200) {
                console.log('response ', res.data)
                setTimeTableData(res.data)
                dispatch(setCalendarEventData(res.data))
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        fetchRecord('', '')
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={1}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <Header3
                    onAlertPress={() => { props.navigation.openDrawer() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    refreshList={() => refresh()} />

                <View style={{ ...PAGESTYLE.backgroundTable,}}>
                    {isTimeTableLoading ?
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        timeTableData.length > 0 ?
                            <View style={PAGESTYLE.mainPage}>
                                <View>
                                    {days.map((data) => (
                                        <View style={{ ...PAGESTYLE.dayLeft, backgroundColor: days[new Date().getDay()] == data ? COLORS.daySelect : null }}>
                                            <Text style={PAGESTYLE.lableDay}>{data}</Text>
                                        </View>
                                    ))}
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false} style={{...STYLE.padLeftRight, }}
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
                            <View style={{ height: hp(13), justifyContent: 'center' }}>
                                <Text style={{ alignItems: 'center', fontSize: hp(2.60), padding: hp(1.30), textAlign: 'center' }}>No data found!</Text>
                            </View>
                    }
                </View>
            </View>
        </View>
    );
}
export default PupilTimetable;