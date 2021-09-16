import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderTT from "./header/HeaderTT";
import { cellWidth, opacity, showMessage, Var } from "../../../../utils/Constant";
import Popupdata from "../../../component/reusable/popup/Popupdata";
import Popup from "../../../component/reusable/popup/Popup";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import { useDispatch } from "react-redux";
import { setCalendarEventData } from "../../../../actions/action";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { User } from "../../../../utils/Model";
import { Lesson } from "../../../../utils/Constant";
import TLDetail from "../teacherlessondetail/lessonplan/TeacherLessonDetail";
import TLDetailEdit from "../teacherlessondetail/lessonplan/TeacherLessonDetailEdit";
import TLDetailAdd from "../teacherlessondetail/lessonplan/TeacherLessonDetailAdd";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
// import Images from "../../../../utils/Images";
import MESSAGE from "../../../../utils/Messages";

const TeacherManagement = (props) => {
    const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const time = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];
    const dispatch = useDispatch()
    
    const [isTeacherLessonDetail, setTeacherLessonDetail] = useState(false)
    const [isTeacherLessonAdd, setTeacherLessonAdd] = useState(false)
    const [teacherDetailData, setTeacherDetailData] = useState({})
    const [isHide, action] = useState(true);
    const [timeTableData, setTimeTableData] = useState([])
    const [isTimeTableLoading, setTimeTableLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        fetchRecord('', '')
    }, [])

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
                // console.log('response of get all lesson event:', res)
                setTimeTableData(res.data)
                // dispatch(setCalendarEventData(res.data))
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
        <View style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.backgroundColorCommon }}>
            {/* <Sidebar
                moduleIndex={1}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            {
                isTeacherLessonDetail ?
                    <TLDetailEdit
                        goBack={() => setTeacherLessonDetail(false)}
                        onRefresh={() => refresh()}
                        data={teacherDetailData} />
                    :
                    isTeacherLessonAdd ?
                        <TLDetailAdd
                            goBack={() => setTeacherLessonAdd(false)}
                            onRefresh={() => refresh()} />
                        :
                        <View style={{ width: isHide ? '100%' : '78%' }}>
                            {/* <HeaderTT
                                onAlertPress={() => { props.navigation.openDrawer() }}
                                onCalenderPress={() => { Var.isCalender = true; props.navigation.openDrawer() }}
                                onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                                onSearch={() => fetchRecord(searchKeyword, filterBy)}
                                onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                                navigateToAddLesson={() => setTeacherLessonAdd(true)}
                                refreshList={() => refresh()} /> */}

                            <View style={{ ...PAGESTYLE.backgroundTable, flex: 1, }}>
                                {isTimeTableLoading ?
                                    <ActivityIndicator
                                        style={{ flex: 1 }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.yellowDark} />
                                    :
                                    timeTableData.length > 0 ?
                                        <View style={{ ...PAGESTYLE.mainPage1 }}>
                                            <View style={PAGESTYLE.days}>
                                                {days.map((data, index) => (
                                                    <View style={{ ...PAGESTYLE.dayLeft, backgroundColor: days[new Date().getDay()] == data ? COLORS.daySelect : null, borderRightWidth: index == 0 ? 0 : 1, borderColor: COLORS.videoLinkBorder, }}>
                                                        <Text style={PAGESTYLE.lableDay}>{data}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            <ScrollView showsVerticalScrollIndicator={false} style={{ ...STYLE.padLeftRight, paddingLeft: 0, }}
                                                horizontal={true}>

                                                {time.map((data, timneKey) => (
                                                    <View style={{ ...PAGESTYLE.spaceTop, width: cellWidth, }}>
                                                        <Text style={{ ...PAGESTYLE.lable, }}>{data}</Text>

                                                        <View style={{ ...PAGESTYLE.timeLabel }}>
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
                                        // <View style={{ height: hp(13), justifyContent: 'center' }}>
                                        //     <Text style={{ alignItems: 'center', fontSize: hp(2.60), padding: hp(1.30), textAlign: 'center' }}>No data found!</Text>
                                        // </View>
                                        <ScrollView>
                                            <EmptyStatePlaceHohder holderType={3}  title1={MESSAGE.noTimetable1} title2={MESSAGE.noTimetable2} />
                                        </ScrollView>
                                }
                            </View>
                        </View>
            }
        </View >
    );
}
export default TeacherManagement;