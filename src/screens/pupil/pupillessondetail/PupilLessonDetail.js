import React, { useEffect, useState } from "react";
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

const PupilLessonDetail = (props) => {
    const [isHide, action] = useState(true);
    const [isLesson, setLesson] = useState(true);
    const [lessonData, setLessonData] = useState([]);
    const [DueHomeWork, setDueHomeWork] = useState([]);
    const [SubmitHomeWork, setSubmitHomeWork] = useState([]);
    const [MarkedHomeWork, setMarkedHomeWork] = useState([]);

    useEffect(() => {
        Service.get(`${EndPoints.GetAllHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
            console.log('response of all pupil homework list', res)
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
                console.log('tripple array', marked, due, submit)
                setDueHomeWork(due)
                setSubmitHomeWork(submit)
                setMarkedHomeWork(marked)
            } else {

            }
        }, (err) => {

        })
    }, [])

    const searchHeader = () => {
        return (
            <View style={PAGESTYLE.filterbarMain}>
                <View style={PAGESTYLE.field}>
                    <Image
                        style={PAGESTYLE.userIcon}
                        source={Images.SearchIcon} />
                    <TextInput
                        style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                    />
                </View>
                <TouchableOpacity style={PAGESTYLE.buttonGroup}>
                    <Menu style={PAGESTYLE.filterGroup}>
                        <MenuTrigger><Text style={PAGESTYLE.commonButtonBorderedheader}>by subject</Text></MenuTrigger>
                        <MenuOptions style={PAGESTYLE.filterListWrap}>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <View style={PAGESTYLE.filterList}>
                                    <Text style={PAGESTYLE.filterListText}>Subject</Text>
                                    <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                </View>
                            </MenuOption>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <View style={PAGESTYLE.filterList}>
                                    <Text style={PAGESTYLE.filterListText}>Date</Text>
                                </View>
                            </MenuOption>
                            <MenuOption style={PAGESTYLE.borderList}>
                                <View style={PAGESTYLE.filterList}>
                                    <Text style={PAGESTYLE.filterListText}>Name</Text>
                                </View>
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
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
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
                                data={lessonData}
                                navigatePupilLessonDetailInternal={() => { props.navigation.navigate('PupilLessonDetailInternal') }} />
                            :
                            <PupilLessonDue
                                DueHomeWork={DueHomeWork}
                                SubmitHomeWork={SubmitHomeWork}
                                MarkedHomeWork={MarkedHomeWork}
                                navigatePupilHomeworkesubmited={(item) => { props.navigation.navigate('PupilHomeWorkSubmitted',{item:item}) }}
                                navigatePupilHomeworkemarked={(item) => { props.navigation.navigate('PupilHomeWorkMarked',{item:item}) }} />
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
