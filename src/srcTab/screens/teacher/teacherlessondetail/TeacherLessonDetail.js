import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, BackHandler } from "react-native";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";

import { opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import TLDetail from "./lessonplan/TeacherLessonDetail";
import TLHomeWork from '../teacherlessondetail/lessonhomework/LessonHW';
import TLHomeWorkSubmitted from '../teacherlessondetail/homeworksubmitted/HWSubmitted';
import HeaderLP from "./header/HeaderLP";
import HeaderHW from "./header/HeaderHW";
import HeaderHWS from "./header/HeaderHWS";
import { Service } from "../../../../service/Service";
import { Addhomework, User } from "../../../../utils/Model";
import { EndPoints } from "../../../../service/EndPoints";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import MESSAGE from "../../../../utils/Messages";
import TLHomeWorkSubmittedDetail from "./homeworksubmitted/HWSubmittedDetail";
import TLDetailEdit from "./lessonplan/TeacherLessonDetailEdit";
import ScreenAndCameraRecording from "../screenandcamera/ScreenandCamera";
import TLVideoGallery from "./lessonplan/TeacherLessonVideoGallery";
import moment from 'moment';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";

const TeacherLessonDetail = (props) => {
    const textInput = useRef(null);
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
    const [selectVideo, setSelectVideo] = useState([]);


    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }


    useEffect(() => {
        if (!isSearchActive && tabIndex == 2 && textInput.current) {
            textInput.current.clear()
            setSearchKeyword('');
        }
    }, [isSearchActive])

    const isFiedlsValidated = () => {
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
            DueDate: moment(Addhomework.DueDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            HomeworkDescription: Addhomework.HomeworkDescription,
            CreatedBy: User.user._id,
            CheckList: Addhomework.CheckList,
        }
        if (Addhomework.IsUpdate) {
            Service.post(data, `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`, (res) => {
                if (res.flag) {
                    if (Addhomework.RemoveRecordingArr.length > 0 || Addhomework.RemoveMaterialArr.length > 0)
                        onRemoveUnselectedFile(res.data._id)
                    else
                        uploadMatirial(res.data._id)
                    // uploadMatirial(res.data._id)
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
                uploadMatirial(res.data._id)
            }, (err) => {
                console.log('response of add homework err', err)
                setHomeworkLoading(false)
                setVisiblePopup(false)

            })
        }
    }
    const onRemoveUnselectedFile = (lessionId) => {
        let data = { "deletematerial": Addhomework.RemoveMaterialArr, "deleterecording": Addhomework.RemoveRecordingArr, "type": "H" }

        Service.post(data, `${EndPoints.DeleteRecordingAndMaterial}${Addhomework.HwId}`, (res) => {
            if (res.code == 200) {
                uploadMatirial(lessionId);
            } else {
                showMessage(res.message)
                setHomeworkLoading(false)
            }
        }, (err) => {
            setHomeworkLoading(false)
            console.log('response of get all lesson error', err)
        })

    }

    const uploadMatirial = (homeworkId) => {
        let data = new FormData();

        Addhomework.MaterialArr.forEach(element => {
            if (element.uri) {
                data.append('materiallist', {
                    uri: element.uri,
                    name: element.name,
                    type: element.type
                });
            }
        });

        Addhomework.RecordingArr.forEach(element => {

            if (element.uri) {

                let ext = element.fileName.split('.');

                if (Platform.OS === 'ios') {
                    ext = element.uri.split('.');
                }
                
                data.append('recording', {
                    uri: element.uri,
                    name: element.fileName,
                    type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                });
            }
        })

        if (Addhomework.MaterialArr.length == 0 && Addhomework.RecordingArr.length == 0) {
            let msg
            if (Addhomework.IsUpdate) {
                msg = MESSAGE.homeworkUpdated
            } else {
                msg = MESSAGE.homeworkAdded
            }
            showMessageWithCallBack(msg, () => {
                props.goBack()
            })
            setHomeworkLoading(false)
            setVisiblePopup(false)
            return
        }

        if (data._parts.length == 0) {
            let msg
            if (Addhomework.IsUpdate) {
                msg = MESSAGE.homeworkUpdated
            } else {
                msg = MESSAGE.homeworkAdded
            }
            showMessageWithCallBack(msg, () => {
                props.goBack()
            })
            setHomeworkLoading(false)
            setVisiblePopup(false)
            return
        }

        console.log('data', data._parts, homeworkId);

        Service.postFormData(data, `${EndPoints.HomeworkMaterialUpload}${homeworkId}`, (res) => {
            console.log('res.code', res.code);
            if (res.code == 200) {
                setHomeworkLoading(false)
                setVisiblePopup(false)
                // setDefaults()
                let msg
                if (Addhomework.IsUpdate) {
                    msg = MESSAGE.homeworkUpdated
                } else {
                    msg = MESSAGE.homeworkAdded
                }
                showMessageWithCallBack(msg, () => {
                    props.goBack()
                })
            } else {
                showMessage(res.message)
                setHomeworkLoading(false)
                setVisiblePopup(false)
            }
        }, (err) => {
            setHomeworkLoading(false)
            setVisiblePopup(false)
            console.log('response of get all lesson error', err)
        })

    }

    return (
        <View style={PAGESTYLE.mainPage}>

            {
                isTLHomeWorkSubmittedDetail ?
                    <TLHomeWorkSubmittedDetail
                        item={data}
                        goBack={() => { setTLHomeWorkSubmittedDetail(false) }}
                        onAlertPress={() => { props.onAlertPress() }} />
                    : isTLDetailEdit ?
                        <TLDetailEdit
                            goBack={() => { props.goBack(); setTLDetailEdit(false) }}
                            onAlertPress={() => { props.onAlertPress() }}
                            data={lessonData}
                            onRefresh={() => null} />
                        : isScreenAndCameraRecording ?
                            <ScreenAndCameraRecording
                                goBack={() => { setScreenAndCameraRecording(false) }}
                                onAlertPress={() => { props.onAlertPress() }} />
                            : isTLVideoGallery ?
                                <TLVideoGallery goBack={(selectVideo) => {setSelectVideo(selectVideo); setTLVideoGallery(false) }}
                                    onAlertPress={() => { props.onAlertPress() }} />
                                :
                                <View style={{ width: isHide ? '100%' : '78%' }}>

                                    {
                                        tabIndex == 0 ?
                                            < HeaderLP
                                                lessonData={lessonData}
                                                date={lessonData.Date}
                                                navigateToBack={() => props.goBack()}
                                                onAlertPress={() => { props.onAlertPress() }} />
                                            :
                                            tabIndex == 1 ?
                                                <HeaderHW
                                                    hwBtnName={updateFlag ? 'Update Homework' : 'Set Homework'}
                                                    SubjectName={lessonData.SubjectName}
                                                    date={lessonData.Date}
                                                    setHomework={() => onAddHomework()}
                                                    navigateToBack={() => props.goBack()}
                                                    onAlertPress={() => { props.onAlertPress() }}
                                                    onClose={() => setVisiblePopup(false)}
                                                    isVisible={isVisiblePopup}
                                                    onOpenPopup={() => isFiedlsValidated()}
                                                    isHomeworkLoading={isHomeworkLoading}
                                                    updateFlag={updateFlag}
                                                />
                                                :
                                                <HeaderHWS
                                                    subjectName={lessonData.SubjectName}
                                                    date={lessonData.Date}
                                                    navigateToBack={() => props.goBack()}
                                                    onAlertPress={() => { props.onAlertPress() }} />
                                    }
                                    
                                    <View style={[PAGESTYLE.whiteBg]}>
                                        <View style={[PAGESTYLE.lessonPlanTop]}>
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
                                            {
                                                tabIndex == 0 &&
                                                <View style={[PAGESTYLE.lessonstartButton]}>
                                                    <TouchableOpacity
                                                        style={PAGESTYLE.buttonGrp}
                                                        activeOpacity={opacity}
                                                        // props.navigation.navigate('TLDetailEdit', { onGoBack: () => { props.route.params.onGoBack(); props.navigation.goBack() }, 'data': lessonData })
                                                        onPress={() => { setTLDetailEdit(true) }}>
                                                        <Text style={STYLE.commonButtonGreenDashboardSide}>Edit Lesson</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            }
                                            {
                                                tabIndex == 2 &&
                                                <View style={PAGESTYLE.filterbarMain}>
                                                    <View style={PAGESTYLE.field}>
                                                        <TextInput
                                                            ref={textInput}
                                                            style={[STYLE.commonInput, PAGESTYLE.searchHeader,
                                                            {paddingVertical : Platform.OS === 'android' ? 2 : 0}
                                                            ]}
                                                            placeholder="Search pupil"
                                                            maxLength={50}
                                                            placeholderTextColor={COLORS.menuLightFonts}
                                                            onChangeText={keyword => {
                                                                setSearchKeyword(keyword);
                                                            }}
                                                            onSubmitEditing={() => {
                                                                searchKeyword ?
                                                                    isSearchActive ?
                                                                        setSearchActive(false)
                                                                        :
                                                                        setSearchActive(true)
                                                                    :
                                                                    null
                                                            }}
                                                            />
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
                                                            {/* <Image
                                                                style={PAGESTYLE.userIcon1}
                                                                source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} /> */}
                                                            {isSearchActive ?
                                                                <CloseBlack style={PAGESTYLE.userIcon1} height={20} width={20} />
                                                                :
                                                                <SearchBlue style={PAGESTYLE.userIcon1} height={20} width={20} />
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={PAGESTYLE.buttonGroup}>
                                                        <Menu style={PAGESTYLE.filterGroup}>
                                                            <MenuTrigger style={{justifyContent : 'center'}}><Text style={PAGESTYLE.commonButtonBorderedheader}>By {filterBy}</Text>
                                                                    <FilterBlack style={PAGESTYLE.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                                                                    </MenuTrigger>
                                                            <MenuOptions style={PAGESTYLE.filterListWrap}>
                                                                <MenuOption style={PAGESTYLE.borderList}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={opacity}
                                                                        onPress={() => { setFilterBy('Pupil Name'); setSelectedIndex(0) }}>
                                                                        <View style={PAGESTYLE.filterList}>
                                                                            <Text style={PAGESTYLE.filterListText}>Pupil Name</Text>
                                                                            {selectedIndex == 0 ?
                                                                                // <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                                                <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />
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
                                                                                // <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                                                <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </MenuOption>
                                                            </MenuOptions>
                                                        </Menu>
                                                        {/* <Image style={PAGESTYLE.filterIcon} source={Images.FilterIcon} /> */}
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    </View>

                                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.backgroundColorCommon }}>
                                        <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                                            {tabIndex == 0 ?
                                                <TLDetail lessonData={lessonData} />
                                                : tabIndex == 1 ?
                                                    <TLHomeWork
                                                        id={lessonData._id}
                                                        updateBtnName={(flag) => setUpdate(flag)}
                                                        navigateScreeCamera={() => { setScreenAndCameraRecording(true) }}
                                                        navigateToVideoGallery={() => { setTLVideoGallery(true) }} 
                                                        selectVideo={selectVideo}/>
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

                                        </ScrollView>
                                    </KeyboardAwareScrollView>
                                </View>
            }
        </View>
    );
}
export default TeacherLessonDetail;