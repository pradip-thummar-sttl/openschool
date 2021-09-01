import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler, Platform, ToastAndroid } from "react-native";
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderTT from "./header/HeaderTT";
import { cellWidth, opacity, Var } from "../../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata";
import Popup from "../../../component/reusable/popup/Popup";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import { useDispatch } from "react-redux";
import { setCalendarEventData } from "../../../../actions/action";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { User } from "../../../../utils/Model";
import { Lesson } from "../../../../utils/Constant";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import Images from "../../../../utils/Images";
import MESSAGE from "../../../../utils/Messages";


const TeacherTimeTable = (props) => {
    const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const time = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];
    const dispatch = useDispatch()

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
                    span = (timeSpan == 100) ? 2 : (timeSpan < 100) ? 1 : (timeSpan > 100 && timeSpan < 200) ? 3 : 4;

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
                <Popupdata span={span} title={lblTitle} time={lblTime} data={data} isPupil={false}
                    navigateToDetail={() => props.navigation.navigate('TeacherLessonDetail', { onGoBack: () => refresh(), 'data': data })} 
                    isLesson={data.Type == Lesson} />
            );
        } else {
            return (
                <View style={{ ...PAGESTYLE.day, width: cellWidth, height: 66, marginBottom: 15, borderColor: COLORS.videoLinkBorder, borderTopWidth: 1, borderBottomWidth: 1, }} />
            );
        }
    }

    // useEffect(() => {
    //     fetchRecord('', '')
    // }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setTimeTableLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        console.log(`${EndPoints.GetTimeTable}/${User.user._id}`);
        Service.post(data, `${EndPoints.GetTimeTable}/${User.user._id}`, (res) => {
            setTimeTableLoading(false)
            if (res.code == 200) {
                setTimeTableData(res.data)
                // dispatch(setCalendarEventData(res.data))
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
        Service.get(`${EndPoints.AllEventHomworklesson}/${User.user._id}`, (res) => {
            setTimeTableLoading(false)
            if (res.code == 200) {
                dispatch(setCalendarEventData(res.data))
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        console.log('Refreshed');
        fetchRecord('', '')
    }
    let currentCount = 0
    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);

      const handleBackButtonClick=()=> {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
          }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App',ToastAndroid.SHORT)
          }
          setTimeout(() => {
            currentCount = 0;
          }, 2000);
        
        return true;
      }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={1}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ width: isHide ? '100%' : '100%', backgroundColor: COLORS.white }}>
                <HeaderTT
                    onAlertPress={() => props.navigation.openDrawer()}
                    onCalenderPress={() => { props.navigation.navigate('Calendars') }}
                    navigateToCreateNewEvent={() => props.navigation.navigate('CreateNewEvent', { onGoBack: () => refresh() })}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => fetchRecord('', '')}
                    navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    refreshList={() => refresh()} />
                <View style={{ ...PAGESTYLE.backgroundTable }}>
                    {isTimeTableLoading ?
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        timeTableData.length > 0 ?
                            <View style={{ ...PAGESTYLE.mainPage, marginTop: -30 }}>
                                <View style={PAGESTYLE.days}>
                                    {days.map((data, index) => (
                                        <View style={{ ...PAGESTYLE.dayLeft, backgroundColor: days[new Date().getDay()] == data ? COLORS.daySelect : null, borderRightWidth: index == 0 ? 0 : 1, borderColor: COLORS.videoLinkBorder, height: 66, }}>
                                            <Text style={PAGESTYLE.lableDay}>{data}</Text>
                                        </View>
                                    ))}
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false} style={{...STYLE.padLeftRight, paddingLeft:0,}}
                                    horizontal={true}>

                                    {time.map((data, timneKey) => (
                                        <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth, }}>
                                            <Text style={{ ...PAGESTYLE.lable}}>{data}</Text>

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
                            // <View style={{ height: 100, justifyContent: 'center' }}>
                            //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            // </View>
                            <ScrollView>
                                <EmptyStatePlaceHohder holderType={3} image={Images.noCalender} title1={MESSAGE.noTimetable1} title2={MESSAGE.noTimetable2} />
                            </ScrollView>
                    }
                </View>
            </View>
        </View>
    );
}
export default TeacherTimeTable;