import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './StyleProfile';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderPMInner from './HeaderPMInner';
import moment from 'moment';
import Chat from "../../Chat/Chat";
import ActivityRings from "react-native-activity-rings";
import MESSAGE from "../../../../utils/Messages";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import BronzeFill from "../../../../svg/teacher/pupilmanagement/StarBronze_Fill";
import Bronze from "../../../../svg/teacher/pupilmanagement/StarBronze";
import SilverFill from "../../../../svg/teacher/pupilmanagement/StartSilver_Fill";
import Silver from "../../../../svg/teacher/pupilmanagement/StartSilver";
import GoldFill from "../../../../svg/teacher/pupilmanagement/StarGold_Fill";
import Gold from "../../../../svg/teacher/pupilmanagement/StarGold";
import Ic_CheckWhite from "../../../../svg/pupil/parentzone/Ic_CheckWhite";
import LessonList from "./lessonlist/LessonList";
import TeacherChat from "./teacherchat/TeacherChat";

const TeacherProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);

    const item = props.selectedTeacher;
    const [chartData, setChartData] = useState([])
    const [isLessonDetail, setLessonDetail] = useState(false);
    const [teacherCountData, setTeacherCountData] = useState([])

    const activityConfig = {
        width: 300,
        height: 300
    };

    useEffect(() => {
        console.log(`${EndPoints.TeacherDetails}/${item.TeacherId}`);
        Service.get(`${EndPoints.TeacherDetails}/${item.TeacherId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setTeacherCountData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }, [])

    return (
        <View style={PAGESTYLE.mainPage1}>
            {!isLessonDetail ?
                <HeaderPMInner
                    navigateToBack={() => props.navigateToBack()} 
                    tabIndex={(index) => { setTabSelected(index) }}
                    tabSelected={tabSelected}
                    pupilName={item.FirstName + ' ' + item.LastName} />
                :
                null
            }
            {
                tabSelected === 0 ?
                    <View style={{ width: isHide ? '100%' : '100%', }}>
                        <View style={PAGESTYLE.whiteBg}>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                                <View style={PAGESTYLE.managementDetail}>
                                    <View style={PAGESTYLE.managementBlockTop}>
                                        {/* <ImageBackground style={PAGESTYLE.managementopImage} > */}
                                        <View style={{height: hp(14.6), overflow: 'hidden', width: '100%', position: 'absolute', top: 0,}}>
                                            <TopBackImg style={PAGESTYLE.managementopImage} height={'100%'} width={'100%'} />
                                        </View>
                                        <View style={PAGESTYLE.thumbTopUser}>
                                            <Image style={{ height: '100%', width: '100%', borderRadius: 100 }}
                                                source={{ uri: baseUrl + item.ProfilePicture }} />
                                        </View>
                                        {/* <TouchableOpacity>
                                                <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>Edit Profile</Text>
                                            </TouchableOpacity> 
                                        </ImageBackground> */}
                                    </View>
                                    <View style={PAGESTYLE.managementNameSec}>
                                        <View style={PAGESTYLE.nameSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Teacher name</Text>
                                            <Text style={PAGESTYLE.userName}>{item.FirstName} {item.LastName}</Text>
                                        </View>
                                        <View style={PAGESTYLE.dateSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Teaching Year</Text>
                                            <Text style={PAGESTYLE.userName}>{item.TeachingYear}</Text>
                                        </View>
                                        <View>
                                            <Text numberOfLines={1} style={[PAGESTYLE.userLabel,]}>Unique I.D (auto-generated)</Text>
                                            <Text style={PAGESTYLE.userName}>{item.UniqueNumber}</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.managementNameSec}>
                                        <View style={PAGESTYLE.nameSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Email</Text>
                                            <Text style={PAGESTYLE.userName}>{item.Email}</Text>
                                        </View>
                                        <View style={PAGESTYLE.dateSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Status</Text>
                                            <Text style={PAGESTYLE.userName}>{item.Active ? 'Active' : 'Inactive'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rateAnnotationBlock}>
                                    <View style={PAGESTYLE.ratingBlock}>
                                        <Text style={PAGESTYLE.ratingTitle}>Teacher Insights</Text>
                                        <View style={PAGESTYLE.achivementBox}>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.ScheduledLesson}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Scheduled Lessons</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.HomeworkSet}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Homework Set</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.ActivePupile}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Active Pupils</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.PreviousLesson}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Previous Lessons</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.HomeworkSubmited}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Homework Submitted</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>{teacherCountData.InActivePupile}</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Inactive Pupils</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={PAGESTYLE.graphBlock}>
                                    <View style={PAGESTYLE.graphBox}>
                                        <View style={PAGESTYLE.generalRow}>
                                            <View style={PAGESTYLE.chartBlock}>
                                                <ActivityRings
                                                    data={chartData}
                                                    config={activityConfig} />
                                            </View>
                                            <View>
                                                <Text style={PAGESTYLE.graphChartText}>Pupils are engaged and using the app and submitting home work on time. </Text>
                                                <View style={[PAGESTYLE.generalRow, PAGESTYLE.listBottomSpace]}>
                                                    <Image style={PAGESTYLE.purpleMark} />
                                                    <Text style={PAGESTYLE.labelMark}>Pupil engagement over last month</Text>
                                                </View>
                                                <View style={PAGESTYLE.generalRow}>
                                                    <Image style={PAGESTYLE.orangeMark} />
                                                    <Text style={PAGESTYLE.labelMark}>Pupil effort over last month</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View>

                                    </View>
                                </View> */}
                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                    :
                    tabSelected === 1 ?
                        <View style={{ width: isHide ? '100%' : '100%', }}>

                            <TeacherChat tabs={tabSelected} data={item} />
                        </View>
                        :
                        <LessonList
                            data={item}
                            setLessonDetail={(flag) => setLessonDetail(flag)} />
            }

        </View>
    );
}
export default TeacherProfileView;