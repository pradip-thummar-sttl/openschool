import React, { useEffect, useState, } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
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
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import moment from "moment";
import { opacity } from "../../../utils/Constant";

const PupilLessonDetail = (props) => {
    console.log('props of homework', props.navigation)
    const [isHide, action] = useState(true);

    const [isLesson, setLesson] = useState(true);
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


    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        if (!isSearchActive) {
            setKeyword('')
            if (isLesson) {
                getLessonData('', '')
            } else {
                getHomeworkData('', '')
            }
            textInput.clear()
        } else {
            if (isLesson) {
                getLessonData(keyword, '')
            } else {
                getHomeworkData(keyword, '')
            }
        }
    }, [isSearchActive])

    useEffect(() => {
        if (isLesson) {
            getLessonData(keyword, filterBy)
        } else {
            getHomeworkData(keyword, filterBy)
        }
    }, [filterBy])

    useEffect(() => {
        // const unsubscribe = props.navigation.addListener('focus', () => {
            getLessonData('', '')
            getHomeworkData('', '')
        // });
        // return () => {
        //     unsubscribe;
        // }
    }, [])

    const getHomeworkData = (searchBy, filterBy) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        console.log('data', data);
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
               
                console.log('tripple array', marked, due, submit)
                setDueHomeWork(due)
                setSubmitHomeWork(submit)
                setMarkedHomeWork(marked)
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

        console.log('data', data, User.user.UserDetialId);
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
        }, (err) => {

        })
    }

    const searchHeader = () => {
        return (
            <View style={PAGESTYLE.filterbarMain}>
                <View style={PAGESTYLE.field}>
                    <TextInput
                        ref={input => { textInput = input }}
                        style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                        placeholder="Search subject, topic name, teacher name, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => { setKeyword(keyword) }}
                    />
                    <TouchableOpacity
                        style={PAGESTYLE.userIcon1Parent}
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
                        <Image
                            style={PAGESTYLE.userIcon}
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
                                    onPress={() => { setFilterBy('Subject'); setSelectedIndex(0) }}>
                                    <View style={PAGESTYLE.filterList}>
                                        <Text style={PAGESTYLE.filterListText}>Subject</Text>
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
                {/* <TouchableOpacity style={styles.buttonGroup}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
                    <Text style={styles.commonButtonGreenheader}>Add Subject</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    const lessonRender = () => {
        return (
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <Header4 onAlertPress={() => props.navigation.openDrawer()} />
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
                        {/* <View style={PAGESTYLE.lessonstartButton}>
                        <Text>Dynamic Search Goes Here</Text>
                    </View> */}
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    {
                        isLesson ?
                            <PupilLesson
                                currentWeekLesson={currentWeekLesson}
                                lastWeekLesson={lastWeekLesson}
                                navigatePupilLessonDetailInternal={(item) => { setItem(item), setLessonDetail(true) }} />
                            :
                            <PupilLessonDue
                                DueHomeWork={DueHomeWork}
                                SubmitHomeWork={SubmitHomeWork}
                                MarkedHomeWork={MarkedHomeWork}
                                navigatePupilHomeWorkDetail={(item) => { setItem(item), setHomeworkDetail(true) }}
                                navigatePupilHomeworkesubmited={(item) => { setItem(item), setHomeWorkSubmitted(true) }}
                                navigatePupilHomeworkemarked={(item) => { setItem(item), setHomeWorkMarked(true) }} />
                    }
                    {/* <HeaderBulk /> */}
                    {/* <PupilLessonDetailInternal /> */}
                    {/* <PupilHomeWorkDetail /> */}
                    {/* <PupilHomeWorkSubmitted /> */}
                    {/* <PupilHomeWorkMarked /> */}
                </ScrollView>

            </View>
        )
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isLessonDetail ?
                    <PupilLessonDetailInternal item={item} goBack={() => setLessonDetail(false)} />
                    : isHomeworkDetail ?
                        <PupilHomeWorkDetail item={item} goBack={() => setHomeworkDetail(false)} />
                        :
                        isHomeWorkSubmitted ?
                            <PupilHomeWorkSubmitted item={item} goBack={() => setHomeWorkSubmitted(false)} />
                            : isHomeWorkMarked ?
                                <PupilHomeWorkMarked item={item} goBack={() => setHomeWorkMarked(false)} />
                                :
                                lessonRender()
            }


        </View>
    );
}
export default PupilLessonDetail;
