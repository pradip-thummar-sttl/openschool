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
        console.log('add homework data',data)
        if (Addhomework.IsUpdate) {
            Service.post(data, `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`, (res) => {
                console.log('response of update homework', res)
                if (res.flag) {
                    setHomeworkLoading(false)
                    setVisiblePopup(false)
                    showMessage('Homework update successfully')
                }else{
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
            <Sidebar
                moduleIndex={2}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                {tabIndex == 0 ?
                    <HeaderLP
                        lessonData={lessonData}
                        navigateToBack={() => props.navigation.goBack()}
                        onAlertPress={() => props.navigation.openDrawer()} />
                    : tabIndex == 1 ?
                        <HeaderHW
                            hwBtnName={updateFlag ? 'Update Homework' : 'Set Homework'}
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
                                    onPress={() => props.navigation.navigate('TLDetailEdit', { onGoBack: () => { props.route.params.onGoBack(); props.navigation.goBack() }, 'data': lessonData })}>
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
                                            isSearchActive ?
                                                setSearchActive(false)
                                                :
                                                setSearchActive(true)
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