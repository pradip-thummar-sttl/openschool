import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import { cellWidth, Lesson, opacity, Var } from "../../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Popupdatasecond from "../../../component/reusable/popup/PopupdataSecond"
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header3 from '../../../component/reusable/header/bulck/Header3'
import { useDispatch } from "react-redux";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import COLORS from "../../../../utils/Colors";
import { setCalendarEventData } from "../../../../actions/action";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
// import Images from "../../../../utils/Images";
import MESSAGE from "../../../../utils/Messages";
import moment from "moment";

const PupilTimetable = (props) => {
    const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const time = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];

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
    const [scrollIndex, setScrollIndex] = useState(0);
    const scrollViewRef = useRef(null);
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
                <Popupdata span={span} title={lblTitle} time={lblTime} data={data} isPupil={true} isLesson={data.Type == Lesson} />
            );
        } else {
            return (
                <View style={{ ...PAGESTYLE.day, width: cellWidth, height: hp(10.41), marginBottom: 15, borderColor: COLORS.videoLinkBorder, borderTopWidth: 1, borderBottomWidth: 1, }} />
            );
        }
    }

    useEffect(() => {
        let time1 = moment().format('HH:mm')
        const timeSplit = time1.split(':')
        console.log('times of ============>', timeSplit);
        const h = timeSplit[0]  //09:30
        const m = timeSplit[1]  //09:30
        
        var index
        if (m >= 30) {
            index = ((h - 6) * 2) + 1
        } else {
            index = (h - 6) * 2
        }
        
        // scrollViewRef.current.scrollTo({
        //     x: scrollViewRef.nativeEvent.contentOffset.x/scrollIndex,
        //     animated: true,
        // });

       setScrollIndex(index)
       console.log('scrollviewref=====>', time[index]);

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
    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }
    console.log('index of ============>', scrollIndex);
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={1}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.white }}>
                <Header3
                    onAlertPress={() => { openNotification() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy)}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    refreshList={() => refresh()} />

                <View style={{ ...PAGESTYLE.backgroundTable, }}>
                    {isTimeTableLoading ?
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        timeTableData.length > 0 ?
                            <View style={PAGESTYLE.mainPage1}>
                                <View>
                                    {days.map((data, index) => (
                                        <View style={{ ...PAGESTYLE.dayLeft, backgroundColor: days[new Date().getDay()] == data ? COLORS.daySelect : null, borderRightWidth: index == 0 ? 0 : 1, borderColor: COLORS.videoLinkBorder, }}>
                                            <Text style={PAGESTYLE.lableDay}>{data}</Text>
                                        </View>
                                    ))}
                                </View>

                                <FlatList 
                                style={{ ...STYLE.padLeftRight, paddingLeft: 0, }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                initialScrollIndex={scrollIndex}
                                onScrollToIndexFailed={0}
                                data={time}
                                renderItem={({item, index})=>(
                                    <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth }}>
                                            <Text style={{ ...PAGESTYLE.lable, }}>{item}</Text>

                                            <View style={PAGESTYLE.timeLabel}>
                                                {days.map((data, dayKey) => (
                                                    dayKey != 0 ?
                                                        setData(dayKey, index)
                                                        :
                                                        null

                                                ))}
                                            </View>
                                        </View>
                                )}
                                />


                                {/* <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} style={{ ...STYLE.padLeftRight, paddingLeft: 0, }}
                                    horizontal={true} 
                                    // onScroll={(event)=>{
                                    //     console.log('event of scroll=====>', event);
                                    //     scrollViewRef.current.scrollTo({
                                    //         x: event.nativeEvent.contentOffset.x/scrollIndex,
                                    //         animated: true,
                                    //     });
                                    // }}
                                    > */}

                                    {/* {time.map((data, timneKey) => (
                                        <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth }}>
                                            <Text style={{ ...PAGESTYLE.lable, }}>{data}</Text>

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
                                </ScrollView> */}
                            </View>
                            :
                            // <View style={{ height: hp(13), justifyContent: 'center' }}>
                            //     <Text style={{ alignItems: 'center', fontSize: hp(2.60), padding: hp(1.30), textAlign: 'center' }}>No data found!</Text>
                            // </View>
                            <ScrollView>
                                <EmptyStatePlaceHohder holderType={3} title1={MESSAGE.noTimetable1} title2={MESSAGE.noTimetable2} />
                            </ScrollView>
                    }
                </View>
            </View>
        </View>
    );
}
export default PupilTimetable;