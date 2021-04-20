import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";

import { opacity, showMessage } from "../../../utils/Constant";
import TLDetail from "./lessonplan/TeacherLessonDetail";
import TLHomeWork from '../teacherlessondetail/lessonhomework/LessonHW';
import TLHomeWorkSubmitted from '../teacherlessondetail/homeworksubmitted/HWSubmitted';
import HeaderLP from "./header/HeaderLP";
import HeaderHW from "./header/HeaderHW";
import HeaderHWS from "./header/HeaderHWS";
import { Service } from "../../../service/Service";
import { Addhomework, User } from "../../../utils/Model";
import { EndPoints } from "../../../service/EndPoints";
import { TextInput } from "react-native-gesture-handler";
import Images from '../../../utils/Images';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import COLORS from "../../../utils/Colors";

const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [tabIndex, setSelectedTab] = useState(0);
    const [lessonData, setLessonData] = useState(props.route.params.data);
    const [isVisiblePopup, setVisiblePopup] = useState(false)
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)
    const [updateFlag, setUpdate] = useState(false)

    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [searchKeyword, setSearchKeyword] = useState('')

    useEffect(() => {
        if (!isSearchActive && tabIndex == 2 && !this.textInput) {
            this.textInput.clear()
        }
    }, [isSearchActive])

    const onAddHomework = () => {
        setHomeworkLoading(true)
        console.log('add homework', Addhomework.CheckList)
        const data = {
            LessonId: props.route.params.data._id,
            IsIncluded: Addhomework.IsIncluded,
            DueDate: Addhomework.DueDate,
            HomeworkDescription: Addhomework.HomeworkDescription,
            CreatedBy: User.user._id,
            CheckList: Addhomework.CheckList,
        }
        if (Addhomework.IsUpdate) {
            Service.post(data, `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`, (res) => {
                console.log('response of update homework', res)
                if (res.flag) {
                    setHomeworkLoading(false)
                    setVisiblePopup(false)
                    showMessage('Homework update successfully')
                } else {
                    setHomeworkLoading(false)
                    setVisiblePopup(false)
                    showMessage(res.message)

                }

            }, (err) => {
                console.log('response of update homework err', err)
                setHomeworkLoading(false)
                setVisiblePopup(false)

            })
        } else {
            Service.post(data, EndPoints.Homework, (res) => {
                console.log('response of add homework', res)
                Addhomework.IsUpdate = true
                setHomeworkLoading(false)
                setVisiblePopup(false)
                showMessage('Homework added successfully')

            }, (err) => {
                console.log('response of add homework err', err)
                setHomeworkLoading(false)
                setVisiblePopup(false)

            })
        }
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ width: isHide ? '100%' : '100%' }}>
                {tabIndex == 0 ?
                    <HeaderLP
                        lessonData={lessonData}
                        navigateToBack={() => props.navigation.goBack()}
                        onAlertPress={() => props.navigation.openDrawer()}
                        navigateToEdit={() => props.navigation.navigate('TLDetailEdit', { onGoBack: () => { props.route.params.onGoBack(); props.navigation.goBack() }, 'data': lessonData })} />
                    : tabIndex == 1 ?
                        <HeaderHW
                            hwBtnName={Addhomework.IsUpdate ? 'Update Homework' : 'Set Homework'}
                            SubjectName={lessonData.SubjectName}
                            setHomework={() => onAddHomework()}
                            navigateToBack={() => props.navigation.goBack()}
                            onAlertPress={() => props.navigation.openDrawer()}
                            onClose={() => setVisiblePopup(false)}
                            isVisible={isVisiblePopup}
                            onOpenPopup={() => setVisiblePopup(true)}
                            isHomeworkLoading={isHomeworkLoading}
                        />
                        :
                        <HeaderHWS
                            subjectName={lessonData.SubjectName}
                            navigateToBack={() => props.navigation.goBack()}
                            onAlertPress={() => props.navigation.openDrawer()} />
                }
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <View style={PAGESTYLE.lessonPlanTab}>
                                <TouchableOpacity
                                    style={PAGESTYLE.tabs}
                                    activeOpacity={opacity}
                                    onPress={() => setSelectedTab(0)}>
                                    <Text style={[PAGESTYLE.tabsText, tabIndex == 0 ? PAGESTYLE.tabsTextSelected : null]}>lesson plan</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={PAGESTYLE.tabs}
                                    activeOpacity={opacity}
                                    onPress={() => setSelectedTab(1)}>
                                    <Text style={[PAGESTYLE.tabsText, tabIndex == 1 ? PAGESTYLE.tabsTextSelected : null]}>lesson homework</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={PAGESTYLE.tabs}
                                    activeOpacity={opacity}
                                    onPress={() => setSelectedTab(2)}>
                                    <Text style={[PAGESTYLE.tabsText, tabIndex == 2 ? PAGESTYLE.tabsTextSelected : null]}>homework submitted</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    {tabIndex == 0 ?
                        <TLDetail lessonData={lessonData} />
                        : tabIndex == 1 ?
                            <TLHomeWork
                                id={props.route.params.data._id}
                                updateBtnName={(flag) => setUpdate(flag)}
                                navigateScreeCamera={() => props.navigation.navigate('ScreenAndCameraRecording')}
                                navigateToVideoGallery={() => props.navigation.navigate('TLVideoGallery')} />
                            :
                            <TLHomeWorkSubmitted
                                lessonId={lessonData._id}
                                searchKeyword={searchKeyword}
                                filterBy={filterBy}
                                searchActive={isSearchActive}
                                navigateToDetail={(data) => props.navigation.navigate('TLHomeWorkSubmittedDetail', { 'item': data })} />
                    }
                    {/* <TLDetailEdit /> */}
                    {/* <TLDetailAdd /> */}
                    {/* <TLVideoGallery /> */}
                    {/* <TLHomeWorkInstructionalVideoWithRecording /> */}
                    {/* <TLHomeWorkInstructionalVideoAdded /> */}
                    {/* <TLHomeWorkSubmittedDetail /> */}
                    {/* <TLHomeWorkSubmittedDetailConfirmation /> */}
                </ScrollView>

            </View>
        </View>
    );
}
export default TeacherLessonDetail;