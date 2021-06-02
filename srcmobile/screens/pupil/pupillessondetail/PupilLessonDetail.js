import React, { useEffect, useRef, useState, } from "react";
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
import Header4_LH from "../../../component/reusable/header/bulck/Header4_LH";


const PupilLessonDetail = (props) => {
    const textInput = useRef(null);
    const [isHide, action] = useState(true);
    const [isLesson, setLesson] = useState(true);
    const [lessonData, setLessonData] = useState([]);
    const [DueHomeWork, setDueHomeWork] = useState([]);
    const [SubmitHomeWork, setSubmitHomeWork] = useState([]);
    const [MarkedHomeWork, setMarkedHomeWork] = useState([]);
    const [currentWeekLesson, setCurrentWeekLesson] = useState([]);
    const [lastWeekLesson, setLastWeekLesson] = useState([]);

    const initialRender = useRef(true);

    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        console.log('keyword', keyword);
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
                textInput.current.clear()
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

        const unsubscribe = props.navigation.addListener('focus', () => {
            getHomeworkData('', '')
            getLessonData('', '')
        });
        return () => {
            unsubscribe;
        }
    }, [props.navigation])

    const getHomeworkData = (searchBy, filterBy) => {
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        console.log('data', data);
        Service.post(data, `${EndPoints.GetAllHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
            if (res.flag) {
                var due = []
                var submit = []
                var marked = []
                res.data.map((item) => {
                    if (item.Marked && item.Submited) {
                        marked.push(item)
                    } else if (!item.Marked && !item.Submited) {
                        due.push(item)
                    } else {
                        submit.push(item)
                    }
                })
                console.log('due', due.length, "submit", submit.length, "marked", marked.length);
                setDueHomeWork(due)
                setSubmitHomeWork(submit)
                setMarkedHomeWork(marked)
            } else {

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
            console.log('current', current.length, "last", last.length);
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
                        ref={textInput}
                        style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                        placeholder="Search subject, topic name etc"
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
                        <MenuTrigger><Image style={PAGESTYLE.filterIcon} source={Images.mobileFilter} /></MenuTrigger>
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
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonGroup}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
                    <Text style={styles.commonButtonGreenheader}>Add Subject</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View>
                <Header4_LH onAlertPress={() => props.navigation.openDrawer()} />
                {searchHeader()}
                <View style={PAGESTYLE.whiteBg}>
                    <View style={PAGESTYLE.lessonPlanTop}>
                        <View style={PAGESTYLE.lessonPlanTab}>
                            <TouchableOpacity style={PAGESTYLE.tabs} onPress={() => { setSearchActive(false); setLesson(true); getLessonData('', ''); }}>
                                <Text style={[PAGESTYLE.tabsText, { color: isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts, fontFamily: isLesson ? FONTS.fontSemiBold : FONTS.fontRegular }]}>Lesson</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSearchActive(false); setLesson(false); getHomeworkData('', '') }}>
                                <Text style={[PAGESTYLE.tabsText, { color: !isLesson ? COLORS.buttonGreen : COLORS.menuLightFonts, fontFamily: !isLesson ? FONTS.fontSemiBold : FONTS.fontRegular }]}>Homework</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    {
                        isLesson ?
                            currentWeekLesson.length > 0 || lastWeekLesson.length > 0 ?
                                <PupilLesson
                                    currentWeekLesson={currentWeekLesson}
                                    lastWeekLesson={lastWeekLesson}
                                    navigatePupilLessonDetailInternal={(item) => { props.navigation.navigate('PupilLessonDetailInternal', { item: item }) }} />
                                :
                                <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                    <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                </View>
                            :
                            DueHomeWork.length > 0 || SubmitHomeWork.length > 0 || MarkedHomeWork.length > 0 ?
                                <PupilLessonDue
                                    DueHomeWork={DueHomeWork}
                                    SubmitHomeWork={SubmitHomeWork}
                                    MarkedHomeWork={MarkedHomeWork}
                                    navigatePupilHomeWorkDetail={(item) => props.navigation.navigate('PupilHomeWorkDetail', { item: item, })}
                                    navigatePupilHomeworkesubmited={(item) => { props.navigation.navigate('PupilHomeWorkSubmitted', { item: item }) }}
                                    navigatePupilHomeworkemarked={(item) => { props.navigation.navigate('PupilHomeWorkMarked', { item: item }) }} />
                                :
                                <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                    <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                </View>
                    }
                    {/* <HeaderBulk /> */}
                    {/* <PupilLessonDetailInternal /> */}
                    {/* <PupilHomeWorkDetail /> */}
                    {/* <PupilHomeWorkSubmitted /> */}
                    {/* <PupilHomeWorkMarked /> */}
                </ScrollView>

            </View>
        </View>
    );
}
export default PupilLessonDetail;