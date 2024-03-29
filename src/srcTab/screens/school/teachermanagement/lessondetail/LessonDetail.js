import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, BackHandler } from "react-native";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from './Style';

import { opacity, showMessage, showMessageWithCallBack } from "../../../../../utils/Constant";
import TLDetail from "./lessonplan/LessonDetail";
import TLHomeWork from '../lessondetail/lessonhomework/LessonHW';
import TLHomeWorkSubmitted from '../lessondetail/homeworksubmitted/HWSubmitted';
import HeaderLP from "./header/HeaderLP";
import HeaderHW from "./header/HeaderHW";
import HeaderHWS from "./header/HeaderHWS";
import { Service } from "../../../../../service/Service";
import { Addhomework, User } from "../../../../../utils/Model";
import { EndPoints } from "../../../../../service/EndPoints";
// import Images from '../../../../utils/Images';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import MESSAGE from "../../../../../utils/Messages";
import moment from 'moment';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";

const LessonDetail = (props) => {
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
                data.append('recording', {
                    uri: element.uri,
                    name: element.fileName,
                    // name: 'MY_RECORDING.mp4',
                    type: element.type
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

       

        Service.postFormData(data, `${EndPoints.HomeworkMaterialUpload}${homeworkId}`, (res) => {
            
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

            <View style={{ width: isHide ? '100%' : '78%' }}>
                {tabIndex == 0 ?
                    <HeaderLP  lessonData={lessonData} date={lessonData.Date} navigateToBack={() => props.goBack()} onAlertPress={() => { props.onAlertPress() }} />
                    : tabIndex == 1 ?
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
                        />

                        :
                        <HeaderHWS
                            subjectName={lessonData.SubjectName}
                            date={lessonData.Date}
                            navigateToBack={() => props.goBack()}
                            onAlertPress={() => { props.onAlertPress() }} />
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
                        
                        {tabIndex == 2 ?
                            <View style={PAGESTYLE.filterbarMain}>
                                <View style={[PAGESTYLE.field]}>
                                    <TextInput
                                        ref={textInput}
                                        style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                                        placeholder="Search subject,class,etc"
                                        maxLength={50}
                                        placeholderTextColor={COLORS.menuLightFonts}
                                        onChangeText={keyword => {
                                            setSearchKeyword(keyword);
                                        }}
                                        onSubmitEditing={ () => { isSearchActive ? setSearchActive(false):setSearchActive(true) }}
                                        />
                                    <TouchableOpacity
                                        style={[PAGESTYLE.userIcon1Parent,]}
                                        activeOpacity={opacity}
                                        onPress={() => {
                                            isSearchActive ?
                                                setSearchActive(false)
                                                :
                                                setSearchActive(true)
                                        }}>
                                        {isSearchActive ?
                                            <CloseBlack style={PAGESTYLE.userIcon1} height={20} width={20} />
                                            :
                                            <SearchBlue style={[PAGESTYLE.userIcon1]} height={20} width={20} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={[PAGESTYLE.buttonGroup]}>
                                    <Menu style={[PAGESTYLE.filterGroup]}>
                                        <MenuTrigger style={{justifyContent : 'center',alignItems : 'center'}}><Text style={PAGESTYLE.commonButtonBorderedheader}>By {filterBy}</Text>
                                                <FilterBlack style={PAGESTYLE.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                                                </MenuTrigger>
                                        <MenuOptions style={PAGESTYLE.filterListWrap}>
                                            <MenuOption style={PAGESTYLE.borderList}>
                                                <TouchableOpacity
                                                    activeOpacity={opacity}
                                                    onPress={() => { setFilterBy('Pupil Name'); setSelectedIndex(0) }}>
                                                    <View style={PAGESTYLE.filterList}>
                                                        <Text style={PAGESTYLE.filterListText}>Pupil Name</Text>
                                                        {selectedIndex == 0 && <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />}
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
                            :
                            null
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
        </View>
    );
}
export default LessonDetail;