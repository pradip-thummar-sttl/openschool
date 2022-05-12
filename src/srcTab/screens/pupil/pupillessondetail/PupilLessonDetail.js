import React, { useEffect, useRef, useState, } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import HeaderWhitepupil from "../../../component/reusable/header/HeaderWhitepupil";
import HeaderWhitewithoutsearch from "../../../component/reusable/header/HeaderWhitewithoutsearch";
import PupilLesson from './lesson/PupilLesson';
import PupilLessonDue from './lesson/PupilLessonDue';
import PupilLessonDetailInternal from './lesson/PupilLessonDetail';
import PupilHomeWorkDetail from './homework/PupilHomeWorkDetail';
import PupilHomeWorkSubmitted from './homework/PupilHomeWorkSubmitted';
import PupilHomeWorkMarked from './homework/PupilHomeWorkMarked';
import Header4 from '../../../component/reusable/header/bulck/Header4'
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import moment from "moment";
import { opacity, Var } from "../../../../utils/Constant";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";
import CheckedBlue from "../../../../svg/pupil/dashboard/Checked_Blue";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";

const PupilLessonDetail = (props) => {

    const [isHide, action] = useState(true);

    const textInput = useRef(null);
    const tabIndex = props?.tabIndex ?? 1;
    const [isLesson, setLesson] = useState(tabIndex === 1 ? true : false);
    const [isLessonDetail, setLessonDetail] = useState(false);
    const [isHomeworkDetail, setHomeworkDetail] = useState(false);
    const [isHomeWorkSubmitted, setHomeWorkSubmitted] = useState(false);
    const [isHomeWorkMarked, setHomeWorkMarked] = useState(false);

    const [lessonData, setLessonData] = useState([]);
    const [DueHomeWork, setDueHomeWork] = useState([]);
    const [SubmitHomeWork, setSubmitHomeWork] = useState([]);
    const [MarkedHomeWork, setMarkedHomeWork] = useState([]);
    const [currentWeekLesson, setCurrentWeekLesson] = useState([]);
    const [lastWeekLesson, setLastWeekLesson] = useState([]);

    const [item, setItem] = useState([]);
    const initialRender = useRef(true);
    const [isLoading, setLoading] = useState(false)
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)

    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            if (!isSearchActive) {
                setKeyword('')
                if (isLesson) {
                    getLessonData('', '')
                } else {
                    getHomeworkData('', '')
                }
                if (textInput.current) {
                    textInput.current.clear()
                }
            } else {
                if (isLesson) {
                    getLessonData(keyword, '')
                } else {
                    getHomeworkData(keyword, '')
                }
            }
        }
    }, [isSearchActive])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            if (isLesson) {
                getLessonData(keyword, filterBy)
            } else {
                getHomeworkData(keyword, filterBy)
            }
        }
    }, [filterBy])

    useEffect(() => {
        getLessonData('', '')
        getHomeworkData('', '')
    }, [])

   
    const getHomeworkData = (searchBy, filterBy) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        setHomeworkLoading(true)
        Service.post(data, `${EndPoints.GetAllHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
            console.log('response of all pupil homework list', res)
            if (res.flag) {
                var due = []
                var submit = []
                var marked = []
                res.data.forEach(item => {
                    if (item.Marked && item.Submited) {
                        marked.push(item)
                    } else if (!item.Marked && !item.Submited) {
                        due.push(item)
                    } else {
                        submit.push(item)
                    }
                });

                console.log('tripple array1', marked, due, submit)
                setDueHomeWork(due)
                setSubmitHomeWork(submit)
                setMarkedHomeWork(marked)
                setHomeworkLoading(false)
            } else {
                console.log('else part')
            }
        }, (err) => {

        })
    }
    const getLessonData = (searchBy, filterBy) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }
        setLoading(true)
        Service.post(data, `${EndPoints.GetAllPupilLessonList}/${User.user.UserDetialId}`, (res) => {
            console.log('Get All Pupil LessonList response', res)
            var startDate = moment().startOf('week');
            var endDate = moment().endOf('week');
            var current = []
            var last = []
            res.data.map((item) => {
                const date = moment(item.LessonDate).format('DD/MM/YYYY')
                if (startDate.format('DD/MM/YYYY') <= date && endDate.format('DD/MM/YYYY') >= date) {
                    current.push(item)
                } else {
                    last.push(item)
                }
            })

            setCurrentWeekLesson(current)
            setLastWeekLesson(last)
            setLoading(false);
        }, (err) => {

        })
    }
    const searchHeader = () => {
        return (

            <View style={PAGESTYLE.searchParent}>
                <View style={PAGESTYLE.searchInner}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => {
                            keyword ?
                                isSearchActive ?
                                    setSearchActive(false)
                                    :
                                    setSearchActive(true)
                                :
                                null
                        }}>
                        {isSearchActive ?
                            <CloseBlack height={18} width={18} />
                            :
                            <SearchBlue height={18} width={18} />
                        }
                        {/* <Image style={{ height: 18, resizeMode: 'contain' }}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} /> */}
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput}
                        style={{
                            flex: 1, height: '100%', paddingHorizontal: 5, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold,
                            paddingVertical: Platform.OS === 'android' ? 3 : 0
                        }}
                        placeholder="Search subject,topic name, etc"
                        maxLength={50}

                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => { setKeyword(keyword) }} />
                </View>
                <View style={{ flexDirection: 'row', marginLeft: hp(1.8), }}>
                    <Menu style={PAGESTYLE.filterGroup}>
                        <MenuTrigger><Text style={PAGESTYLE.commonButtonBorderedheader}>By {filterBy}</Text>
                            <FilterBlack style={PAGESTYLE.filterIcon} width={hp(1.74)} height={hp(1.50)} />
                        </MenuTrigger>
                        <MenuOptions style={PAGESTYLE.filterListWrap}>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Subject'); setSelectedIndex(0) }}>
                                    <View style={PAGESTYLE.filterList}>
                                        <Text style={PAGESTYLE.filterListText}>Subject</Text>
                                        {selectedIndex == 0 ?
                                            // <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                            <CheckedBlue style={PAGESTYLE.checkMark} width={hp(1.95)} height={hp(1.95)} />
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
                                            <CheckedBlue style={PAGESTYLE.checkMark} width={hp(1.95)} height={hp(1.95)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Live Lesson'); setSelectedIndex(2) }}>
                                    <View style={PAGESTYLE.filterList}>
                                        <Text style={PAGESTYLE.filterListText}>Live Lesson</Text>
                                        {selectedIndex == 2 ?
                                            // <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                            <CheckedBlue style={PAGESTYLE.checkMark} width={hp(1.95)} height={hp(1.95)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Publish Lesson'); setSelectedIndex(3) }}>
                                    <View style={PAGESTYLE.filterList}>
                                        <Text style={PAGESTYLE.filterListText}>Publish Lesson</Text>
                                        {selectedIndex == 3 ?
                                            // <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                            <CheckedBlue style={PAGESTYLE.checkMark} width={hp(1.95)} height={hp(1.95)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    {/* <Image style={PAGESTYLE.filterIcon} source={Images.pupilFilter} /> */}
                </View>
            </View>
        )
    }
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }
    const lessonRender = () => {
        return (
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <Header4 onAlertPress={() => openNotification()} />
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity style={PAGESTYLE.tabs} onPress={() => setLesson(true)}>
                                <Text style={[PAGESTYLE.tabsText, { color: isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts }]}>Lesson</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLesson(false)}>
                                <Text style={[PAGESTYLE.tabsText, { color: !isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts }]}>Homework</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            searchHeader()
                        }
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={[PAGESTYLE.teacherLessonGrid]}>
                    {
                        isLesson ? 
                            <PupilLesson
                                currentWeekLesson={currentWeekLesson}
                                lastWeekLesson={lastWeekLesson}
                                navigatePupilLessonDetailInternal={(item) => { setItem(item), setLessonDetail(true) }}
                                isLoading={isLoading}
                            />
                            :
                            <PupilLessonDue
                                DueHomeWork={DueHomeWork}
                                SubmitHomeWork={SubmitHomeWork}
                                MarkedHomeWork={MarkedHomeWork}
                                navigatePupilHomeWorkDetail={(item) => { setItem(item), setHomeworkDetail(true) }}
                                navigatePupilHomeworkesubmited={(item) => { setItem(item), setHomeWorkSubmitted(true) }}
                                navigatePupilHomeworkemarked={(item) => { setItem(item), setHomeWorkMarked(true) }}
                                isHomeworkLoading={isHomeworkLoading}
                            />
                    }
                </ScrollView>

            </View>
        )
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isLessonDetail ?
                    <PupilLessonDetailInternal
                        item={item}
                        goBack={() => setLessonDetail(false)}
                        onAlertPress={() => openNotification()}
                    />
                    : isHomeworkDetail ?
                        <PupilHomeWorkDetail
                            item={item}
                            goBack={() => setHomeworkDetail(false)}
                            onAlertPress={() => openNotification()} />
                        :
                        isHomeWorkSubmitted ?
                            <PupilHomeWorkSubmitted
                                item={item}
                                goBack={() => setHomeWorkSubmitted(false)}
                                onAlertPress={() => openNotification()} />
                            : isHomeWorkMarked ?
                                <PupilHomeWorkMarked
                                    item={item}
                                    goBack={() => setHomeWorkMarked(false)}
                                    onAlertPress={() => openNotification()} />
                                :
                                lessonRender()
            }


        </View>
    );
}
export default PupilLessonDetail;
