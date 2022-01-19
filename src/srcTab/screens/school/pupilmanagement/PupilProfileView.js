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
import PupilChat from "./pupilchat/PupilChat";

const PupilProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);

    const item = props.selectedPupil;

    const [chartData, setChartData] = useState([])
    const [joinedLesson, setJoinedLesson] = useState(0)
    const [submittedHomework, setSubmittedHomework] = useState(0)
    const [missedLesson, setMissedLesson] = useState(0)
    const [isLessonDetail, setLessonDetail] = useState(false);
    const [teacherCountData, setTeacherCountData] = useState([])

    const activityConfig = {
        width: 300,
        height: 300
    };

    useEffect(() => {
        getLessonData()
    }, [])

    const getLessonData = () => {
        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.purpleDark,
                    backgroundColor: COLORS.lightPurple
                }]
                setJoinedLesson(res.data.joinlesson)
                setMissedLesson(res.data.totallesson - res.data.joinlesson)
                getHomeworkData(data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const getHomeworkData = (lessonData) => {
        Service.get(`${EndPoints.GetCountHomework}/${item.PupilId}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage

                let data = {
                    value: per === null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                setSubmittedHomework(res.data.total)
                lessonData.push(data)

                setChartData(lessonData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }
  
    return (
        <View style={PAGESTYLE.mainPage1}>
            {!isLessonDetail &&
                <HeaderPMInner
                    navigateToBack={() => props.navigateToBack()}
                    tabIndex={(index) => { setTabSelected(index) }}
                    tabSelected={tabSelected}
                    pupilName={item.FirstName + ' ' + item.LastName} />
            }
            <View style={{ flex: 1 }}>
                {
                    tabSelected === 0 ?
                        <View style={{ width: isHide ? '100%' : '100%', }}>
                            <View style={PAGESTYLE.whiteBg}>
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                                    <View style={PAGESTYLE.managementDetail}>

                                        <View style={PAGESTYLE.secondHeader}>
                                            <View style={{ height: '100%', overflow: 'hidden', width: '100%', position: 'absolute' }}>
                                                <TopBackImg style={PAGESTYLE.managementopImage} height={hp(21)} width={'100%'} />
                                            </View>
                                            <View style={PAGESTYLE.thumbTopUser}>
                                                <Image style={{ height: '100%', width: '100%', borderRadius: 100 ,backgroundColor : COLORS.borderGrp}}
                                                    source={{ uri: baseUrl + item.ProfilePicture }} />
                                            </View>
                                            <TouchableOpacity style={STYLE.btnEditView} onPress={()=> props.onEditTeacherProfile()}>
                                                <Text style={STYLE.txtEditView}>Edit Profile</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Pupil name</Text>
                                                <Text style={PAGESTYLE.userName}>{item.FirstName} {item.LastName}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Date of Birth</Text>
                                                <Text style={PAGESTYLE.userName}>{moment(item.Dob).format('DD/MM/yyyy')}</Text>
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={[PAGESTYLE.userLabel,]}>Unique I.D (auto-generated)</Text>
                                                <Text style={PAGESTYLE.userName}>{item.UniqueNumber}</Text>
                                            </View>
                                        </View>

                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Parent name</Text>
                                                <Text style={PAGESTYLE.userName}>{item.ParentFirstName} {item.ParentLastName}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Parent Email</Text>
                                                <Text style={{ ...PAGESTYLE.userName, width: '80%' }}>{item.Email}</Text>
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={[PAGESTYLE.userLabel,]}>Parent Tel.</Text>
                                                <Text style={PAGESTYLE.userName}>{item.MobileNumber}</Text>
                                            </View>
                                        </View>

                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Assigned To</Text>
                                                <Text style={PAGESTYLE.userName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Status</Text>
                                                <Text style={PAGESTYLE.userName}>{item.Active ? 'Active' : 'Inactive'}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={PAGESTYLE.rateAnnotationBlock}>
                                        <View style={PAGESTYLE.ratingBlock}>
                                            {/* <Text style={PAGESTYLE.ratingTitle}>Teacher Insights</Text> */}
                                            <View style={PAGESTYLE.achivementBox}>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{joinedLesson}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Attended Lessons</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{submittedHomework}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Homework Submitted</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{missedLesson}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Missed Lessons</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <Text style={PAGESTYLE.ratingTitle}>Pupil's Performance</Text>
                                    <View style={PAGESTYLE.graphBlock}>
                                        <View style={PAGESTYLE.graphBox}>
                                            <View style={PAGESTYLE.generalRow}>
                                                <View style={PAGESTYLE.chartBlock}>
                                                    {console.log("chartData 3------>", chartData)}
                                                    <ActivityRings data={chartData} config={activityConfig} />
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
                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </View>
                        :
                        tabSelected === 1 ?
                            <PupilChat tabs={tabSelected} data={item} />
                            :
                            <LessonList
                                data={item}
                                setLessonDetail={(flag) => setLessonDetail(flag)} />
                }
            </View>
        </View>
    );
}
export default PupilProfileView;