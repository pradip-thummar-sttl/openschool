import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import { cellWidth, Lesson, opacity, Var } from "../../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata"
import Header3 from '../../../component/reusable/header/bulck/Header3'
import { useDispatch, useSelector } from "react-redux";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, selectedDate, User } from "../../../../utils/Model";
import COLORS from "../../../../utils/Colors";
import { setCalendarEventData } from "../../../../actions/action";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../utils/Messages";
import moment from "moment";

const PupilTimetable = (props) => {
    const _flatListRefrence = useRef(null);
    const onViewRef = useRef((viewableItems) => {
    })

    const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const time = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];

    const [isHide, action] = useState(true);
    const [scrollIndex, setScrollIndex] = useState(0);
    const dispatch = useDispatch()

    const weekTimeTableDate = useSelector(state => {
        return state.AuthReducer.weekTimeTableData
    })
    useEffect(() => {
        let data = {
            CurrentDate: moment().format('yyyy-MM-DD')
        }
        Service.post(data, `${EndPoints.AllEventHomworklessonpupil}/${User.user.UserDetialId}`, (res) => {
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
        if (weekTimeTableDate != "") {
            fetchRecord("", "", weekTimeTableDate)
        }
    }, [weekTimeTableDate])

    useEffect(() => {
        let time1 = moment().format('HH:mm')
        const timeSplit = time1.split(':')
        const h = timeSplit[0]  //09:30
        const m = timeSplit[1]  //09:30

        var index
        if (m >= 30) {
            index = ((h - 6) * 2) + 1
        } else {
            index = (h - 6) * 2
        }

        setScrollIndex(index)
        fetchRecord('', '', moment().format('YYYY-MM-DD'))
    }, [])

    const fetchRecord = (searchBy, filterBy, currentDate) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            CurrentDate: currentDate
        }
        setTimeTableLoading(true)
        console.log('data', EndPoints.GetTimeTablePupil + '/' + User.user.UserDetialId);

        Service.post(data, `${EndPoints.GetTimeTablePupil}/${User.user.UserDetialId}`, (res) => {
            setTimeTableLoading(false)

            if (res.code == 200) {
                setTimeTableData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    useEffect(() => {
        onListAnimations();
    }, [isTimeTableLoading])

    const onListAnimations = () => {

        setTimeout(() => {
            {
                if (!isTimeTableLoading && _flatListRefrence && _flatListRefrence.current)
                    _flatListRefrence.current.scrollToIndex({ index: scrollIndex, Animation: true })
            }
        }, 1500)
    }

    const refresh = () => {
        fetchRecord('', '', moment().format('YYYY-MM-DD'))
    }
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
    }
    return (
        <View style={PAGESTYLE.mainPage}>

            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.white }}>
                <Header3
                    onAlertPress={() => { openNotification() }}
                    onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, filterBy, moment().format('YYYY-MM-DD'))}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    navigateToAddLesson={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => refresh() })}
                    refreshList={() => refresh()}
                    onFilter={(filter) => fetchRecord(searchKeyword, filter, moment().format('YYYY-MM-DD'))} />

                <ScrollView style={{ ...PAGESTYLE.backgroundTable }}>
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
                                    ref={_flatListRefrence}
                                    style={{ ...STYLE.padLeftRight, paddingLeft: 0 }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={time}
                                    onViewableItemsChanged={onViewRef.current}
                                    renderItem={({ item, index }) => (
                                        <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth }}>
                                            <Text style={{ ...PAGESTYLE.lable, }}>{item}</Text>
                                            <View style={PAGESTYLE.timeLabel}>
                                                {days.map((data, dayKey) => (
                                                    dayKey != 0 && setData(dayKey, index)))}
                                            </View>
                                        </View>
                                    )}
                                />



                            </View>
                            :

                            <ScrollView>
                                <EmptyStatePlaceHohder holderType={3} title1={MESSAGE.noTimetable1} title2={MESSAGE.noTimetable2} />
                            </ScrollView>
                    }
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilTimetable;