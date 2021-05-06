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
import MESSAGE from "../../../utils/Messages";
import ScreenAndCameraRecording from "../../../../src/screens/teacher/screenandcamera/ScreenandCamera";
import TLVideoGallery from "../../../../src/screens/teacher/teacherlessondetail/lessonplan/TeacherLessonVideoGallery";
import moment from "moment";

const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [tabIndex, setSelectedTab] = useState(0);
    const [lessonData, setLessonData] = useState(props.route.params.data);
    const [isVisiblePopup, setVisiblePopup] = useState(false)
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)
    const [updateFlag, setUpdate] = useState(false)

    const [isScreenAndCameraRecording, setScreenAndCameraRecording] = useState(false)
    const [isTLVideoGallery, setTLVideoGallery] = useState(false)

    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isHSDataChanged, setHSDataChanged] = useState(false)

    useEffect(() => {
        if (!isSearchActive && tabIndex == 2 && !this.textInput) {
            this.textInput.clear()
        }
    }, [isSearchActive])

    const isFiedlsValidated = () => {
        console.log('Addhomework', Addhomework);
        if (!Addhomework.HomeworkDescription) {
            showMessage(MESSAGE.description)
            return
        } else if (Addhomework.CheckList.length == 0) {
            showMessage(MESSAGE.checkList)
            return
        }

        setVisiblePopup(true)
    }

    const onAddHomework = () => {
        setHomeworkLoading(true)
        const data = {
            LessonId: lessonData._id,
            IsIncluded: Addhomework.IsIncluded,
            DueDate: moment(new Date(Addhomework.DueDate)).format('yyyy-DD-MM'),
            HomeworkDescription: Addhomework.HomeworkDescription,
            CreatedBy: User.user._id,
            CheckList: Addhomework.CheckList,
        }
        console.log('add homework data', data)
        if (Addhomework.IsUpdate) {
            Service.post(data, `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`, (res) => {
                console.log('res', res);
                if (res.flag) {
                    // setHomeworkLoading(false)
                    setVisiblePopup(false)
                    // showMessage('Homework updated successfully')

                    uploadMatirial(res.data._id)
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
                Addhomework.IsUpdate = true
                // setHomeworkLoading(false)
                setVisiblePopup(false)
                // showMessage('Homework added successfully')
                uploadMatirial(res.data._id)
            }, (err) => {
                console.log('response of add homework err', err)
                setHomeworkLoading(false)
                setVisiblePopup(false)

            })
        }
    }

    const uploadMatirial = (homeworkId) => {
        let data = new FormData();

        Addhomework.MaterialArr.forEach(element => {
            data.append('materiallist', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        });

        Addhomework.RecordingArr.forEach(element => {
            data.append('recording', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        })

        if (Addhomework.MaterialArr.length == 0 && Addhomework.RecordingArr.length == 0 && homeworkId) {
            if (Addhomework.IsUpdate) {
                showMessage(MESSAGE.lessonUpdated)
            } else {
                showMessage(MESSAGE.lessonAdded)
            }
            setHomeworkLoading(false)
            return
        }

        console.log('data', data._parts, homeworkId);

        Service.postFormData(data, `${EndPoints.HomeworkMaterialUpload}${homeworkId}`, (res) => {
            console.log('res.code', res.code);
            if (res.code == 200) {
                setHomeworkLoading(false)
                // setDefaults()
                if (Addhomework.IsUpdate) {
                    showMessage(MESSAGE.lessonUpdated)
                } else {
                    showMessage(MESSAGE.lessonAdded)
                }
            } else {
                showMessage(res.message)
                setHomeworkLoading(false)
            }
        }, (err) => {
            setHomeworkLoading(false)
            console.log('response of get all lesson error', err)
        })

    }
    
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
           { 
           isScreenAndCameraRecording?
           <ScreenAndCameraRecording goBack={()=>setScreenAndCameraRecording(false)}/>
           :isTLVideoGallery?
           <TLVideoGallery goBack={()=>setTLVideoGallery(false)}/>
           :
           <View style={{ width: isHide ? '100%' : '100%' }}>
                {tabIndex == 0 ?
                    <HeaderLP
                        lessonData={lessonData}
                        navigateToBack={() => props.navigation.goBack()}
                        onAlertPress={() => props.navigation.openDrawer()}
                        navigateToEdit={() => props.navigation.navigate('TLDetailEdit', { onGoBack: () => { props.route.params.onGoBack(); props.navigation.goBack() }, 'data': lessonData })} />
                    : tabIndex == 1 ?
                        <HeaderHW
                            hwBtnName={updateFlag ? 'Update Homework' : 'Set Homework'}
                            SubjectName={lessonData.SubjectName}
                            setHomework={() => onAddHomework()}
                            navigateToBack={() => props.navigation.goBack()}
                            onAlertPress={() => props.navigation.openDrawer()}
                            onClose={() => setVisiblePopup(false)}
                            isVisible={isVisiblePopup}
                            onOpenPopup={() => isFiedlsValidated()}
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
                                navigateScreeCamera={() => setScreenAndCameraRecording(true)}
                                navigateToVideoGallery={() => setTLVideoGallery(true)} />
                            :
                            <TLHomeWorkSubmitted
                                lessonId={lessonData._id}
                                searchKeyword={searchKeyword}
                                filterBy={filterBy}
                                searchActive={isSearchActive}
                                dataChanged={isHSDataChanged}
                                navigateToDetail={(data) => props.navigation.navigate('TLHomeWorkSubmittedDetail', { onGoBack: () => { console.log('BACK'); setHSDataChanged(true) }, 'item': data })} />
                    }
                    {/* <TLDetailEdit /> */}
                    {/* <TLDetailAdd /> */}
                    {/* <TLVideoGallery /> */}
                    {/* <TLHomeWorkInstructionalVideoWithRecording /> */}
                    {/* <TLHomeWorkInstructionalVideoAdded /> */}
                    {/* <TLHomeWorkSubmittedDetail /> */}
                    {/* <TLHomeWorkSubmittedDetailConfirmation /> */}
                </ScrollView>

            </View>}
        </View>
    );
}
export default TeacherLessonDetail;