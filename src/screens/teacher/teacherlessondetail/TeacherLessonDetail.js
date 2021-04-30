import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
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
import Images from '../../../utils/Images';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import COLORS from "../../../utils/Colors";
import MESSAGE from "../../../utils/Messages";
import TLHomeWorkSubmittedDetail from "./homeworksubmitted/HWSubmittedDetail";
import TLDetailEdit from "./lessonplan/TeacherLessonDetailEdit";
import ScreenAndCameraRecording from "../screenandcamera/ScreenandCamera";
import TLVideoGallery from "./lessonplan/TeacherLessonVideoGallery";

const TeacherLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [tabIndex, setSelectedTab] = useState(0);
    const [lessonData, setLessonData] = useState(props.data);
    const [isVisiblePopup, setVisiblePopup] = useState(false)
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)
    const [updateFlag, setUpdate] = useState(false)
    const [isTLHomeWorkSubmittedDetail, setTLHomeWorkSubmittedDetail] = useState(false)
    const [isTLDetailEdit, setTLDetailEdit] = useState(false)
    const [isScreenAndCameraRecording, setScreenAndCameraRecording] = useState(false)
    const [isTLVideoGallery, setTLVideoGallery] = useState(false)
    const [data, setItem] = useState([]);

    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isHSDataChanged, setHSDataChanged] = useState(false)

    useEffect(() => {
        if (!isSearchActive && tabIndex == 2) {
            this.textInput.clear()
            setSearchKeyword('');
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
            DueDate: Addhomework.DueDate,
            HomeworkDescription: Addhomework.HomeworkDescription,
            CreatedBy: User.user._id,
            CheckList: Addhomework.CheckList,
        }
        console.log('add homework data', data)
        if (Addhomework.IsUpdate) {
            Service.post(data, `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`, (res) => {
                console.log('response of update homework', res)
                if (res.flag) {
                    // setHomeworkLoading(false)
                    setVisiblePopup(false)
                    // showMessage('Homework updated successfully')
                    
                    uploadMatirial(res.data.LessonId)
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
                // setHomeworkLoading(false)
                setVisiblePopup(false)
                // showMessage('Homework added successfully')
                uploadMatirial(res.data.LessonId)
            }, (err) => {
                console.log('response of add homework err', err)
                setHomeworkLoading(false)
                setVisiblePopup(false)

            })
        }
    }

    const uploadMatirial = (lessionId) => {
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

        if (Addhomework.MaterialArr.length == 0 && Addhomework.RecordingArr.length == 0 && lessionId) {
            if (Addhomework.IsUpdate) {
                showMessage(MESSAGE.lessonUpdated)
            } else {
                showMessage(MESSAGE.lessonAdded)
            }
            setHomeworkLoading(false)
            return
        }

        console.log('data', data._parts, lessionId);

        Service.postFormData(data, `${EndPoints.LessonMaterialUpload}${lessionId}`, (res) => {
            console.log('res.code', res.code);
            if (res.code == 200) {
                setHomeworkLoading(false)
                console.log('response of save lesson', res)
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

    // useEffect(() => {
    //     if (!isSearchActive) {
    //         props.onClearSearch()
    //         this.textInput.clear()
    //     } else {
    //         props.onSearch()
    //     }
    // }, [isSearchActive])

    // useEffect(() => {
    //     props.onFilter(filterBy)
    // }, [filterBy])

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            {
                isTLHomeWorkSubmittedDetail ?
                    <TLHomeWorkSubmittedDetail
                        item={data}
                        goBack={() => { setTLHomeWorkSubmittedDetail(false) }} />
                    : isTLDetailEdit ?
                        <TLDetailEdit
                            goBack={() => { props.goBack(); setTLDetailEdit(false) }}
                            data={lessonData}
                            onRefresh={() => null} />
                        : isScreenAndCameraRecording ?
                            <ScreenAndCameraRecording
                                goBack={() => { setScreenAndCameraRecording(false) }} />
                            : isTLVideoGallery ?
                                <TLVideoGallery goBack={() => { setTLVideoGallery(false) }} />
                                :
                                <View style={{ width: isHide ? '100%' : '78%' }}>
                                    {tabIndex == 0 ?
                                        <HeaderLP
                                            lessonData={lessonData}
                                            navigateToBack={() => props.goBack()}
                                            onAlertPress={() => props.navigation.openDrawer()} />
                                        : tabIndex == 1 ?
                                            <HeaderHW
                                                hwBtnName={updateFlag ? 'Update Homework' : 'Set Homework'}
                                                SubjectName={lessonData.SubjectName}
                                                setHomework={() => onAddHomework()}
                                                navigateToBack={() => props.goBack()}
                                                onAlertPress={() => props.navigation.openDrawer()}
                                                onClose={() => setVisiblePopup(false)}
                                                isVisible={isVisiblePopup}
                                                onOpenPopup={() => isFiedlsValidated()}
                                                isHomeworkLoading={isHomeworkLoading}
                                            />

                                            :
                                            <HeaderHWS
                                                subjectName={lessonData.SubjectName}
                                                navigateToBack={() => props.goBack()}
                                                onAlertPress={() => props.navigation.openDrawer()} />
                                    }
                                    <View style={PAGESTYLE.whiteBg}>
                                        <View style={PAGESTYLE.lessonPlanTop}>
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
                                            {tabIndex == 0 ?
                                                <View style={PAGESTYLE.lessonstartButton}>
                                                    <TouchableOpacity
                                                        style={PAGESTYLE.buttonGrp}
                                                        activeOpacity={opacity}
                                                        // props.navigation.navigate('TLDetailEdit', { onGoBack: () => { props.route.params.onGoBack(); props.navigation.goBack() }, 'data': lessonData })
                                                        onPress={() => { setTLDetailEdit(true) }}>
                                                        <Text style={STYLE.commonButtonGreenDashboardSide}>Edit Lesson</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                            }
                                            {tabIndex == 2 ?
                                                <View style={PAGESTYLE.filterbarMain}>
                                                    <View style={PAGESTYLE.field}>
                                                        <TextInput
                                                            ref={input => { this.textInput = input }}
                                                            style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                                                            placeholder="Search pupil"
                                                            maxLength={50}
                                                            placeholderTextColor={COLORS.menuLightFonts}
                                                            onChangeText={keyword => {
                                                                setSearchKeyword(keyword);
                                                            }} />
                                                        <TouchableOpacity
                                                            style={PAGESTYLE.userIcon1Parent}
                                                            activeOpacity={opacity}
                                                            onPress={() => {
                                                                searchKeyword ?
                                                                    isSearchActive ?
                                                                        setSearchActive(false)
                                                                        :
                                                                        setSearchActive(true)
                                                                    :
                                                                    null
                                                            }}>
                                                            <Image
                                                                style={PAGESTYLE.userIcon1}
                                                                source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={PAGESTYLE.buttonGroup}>
                                                        <Menu style={PAGESTYLE.filterGroup}>
                                                            <MenuTrigger><Text style={PAGESTYLE.commonButtonBorderedheader}>by {filterBy}</Text></MenuTrigger>
                                                            <MenuOptions style={PAGESTYLE.filterListWrap}>
                                                                <MenuOption style={PAGESTYLE.borderList}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={opacity}
                                                                        onPress={() => { setFilterBy('Pupil Name'); setSelectedIndex(0) }}>
                                                                        <View style={PAGESTYLE.filterList}>
                                                                            <Text style={PAGESTYLE.filterListText}>Pupil Name</Text>
                                                                            {selectedIndex == 0 ?
                                                                                <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </MenuOption>
                                                                <MenuOption style={PAGESTYLE.borderList}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={opacity}
                                                                        onPress={() => { setFilterBy('Date'); setSelectedIndex(1) }}>
                                                                        <View style={PAGESTYLE.filterList}>
                                                                            <Text style={PAGESTYLE.filterListText}>Date</Text>
                                                                            {selectedIndex == 1 ?
                                                                                <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </MenuOption>
                                                            </MenuOptions>
                                                        </Menu>
                                                        <Image style={PAGESTYLE.filterIcon} source={Images.FilterIcon} />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                    <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                                        {tabIndex == 0 ?
                                            <TLDetail lessonData={lessonData} />
                                            : tabIndex == 1 ?
                                                <TLHomeWork
                                                    id={lessonData._id}
                                                    updateBtnName={(flag) => setUpdate(flag)}
                                                    navigateScreeCamera={() => { setScreenAndCameraRecording(true) }}
                                                    navigateToVideoGallery={() => { setTLVideoGallery(true) }} />
                                                :
                                                <TLHomeWorkSubmitted
                                                    lessonId={lessonData._id}
                                                    searchKeyword={searchKeyword}
                                                    filterBy={filterBy}
                                                    searchActive={isSearchActive}
                                                    navigateToDetail={(data) => { setItem(data), setTLHomeWorkSubmittedDetail(true) }}
                                                    onGoBack={() => setHSDataChanged(true)}
                                                    dataChanged={isHSDataChanged} />

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
            }
        </View>
    );
}
export default TeacherLessonDetail;