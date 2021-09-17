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

const TeacherProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [tabSelected, setTabSelected] = useState(0);

    const item = props.selectedPupil;
    const [chartData, setChartData] = useState([])

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [feedBack, setFeedback] = useState('')

    const activityConfig = {
        width: 300,
        height: 300
    };

    useEffect(() => {
        console.log('chartData', chartData);
    }, [chartData])

    const getLessonData = () => {
        console.log('`${EndPoints.GetCountLession}/${item.PupilId}`', `${EndPoints.GetCountLession}/${item.PupilId}`);
        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.purpleDark,
                    backgroundColor: COLORS.lightPurple
                }]
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
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                lessonData.push(data)
                setChartData(lessonData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const setInstantRewards = () => {
        if (!isBronze && !isSilver && !isGold) {
            showMessage(MESSAGE.selectReward)
            return
        }

        let data = {
            TeacherID: User.user._id,
            PupilID: item.PupilId,
            Reward: isBronze ? '3' : isSilver ? '6' : '9',
            Feedback: feedBack,
            CreatedBy: User.user._id
        }

        Service.post(data, `${EndPoints.AddInstantReward}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setBronze(false)
                setSilver(false)
                setGold(false)
                setFeedback('')
                showMessage(MESSAGE.rewarded)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const onStarSelection = (index) => {
        setBronze(false)
        setSilver(false)
        setGold(false)
        if (index == 3) {
            setBronze(true)
        } else if (index == 6) {
            setSilver(true)
        } else if (index == 9) {
            setGold(true)
        }
    }

    return (
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInner
                navigateToBack={() => props.navigateToBack()} tabIndex={(index) => { setTabSelected(index) }}
                pupilName={props.selectedPupil.FirstName + ' ' + props.selectedPupil.LastName} />
            {
                tabSelected === 0 ?
                    <View style={{ width: isHide ? '100%' : '100%', }}>
                        <View style={PAGESTYLE.whiteBg}>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                                <View style={PAGESTYLE.managementDetail}>
                                    <View style={PAGESTYLE.managementBlockTop}>
                                        {/* <ImageBackground style={PAGESTYLE.managementopImage} > */}
                                        <TopBackImg style={PAGESTYLE.managementopImage} width={'100%'} />
                                        <View style={PAGESTYLE.thumbTopUser}>
                                            <Image style={{ height: '100%', width: '100%', borderRadius: 100 }}
                                                source={{ uri: baseUrl + props.selectedPupil.ProfilePicture }} />
                                        </View>
                                        {/* <TouchableOpacity>
                                                <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>Edit Profile</Text>
                                            </TouchableOpacity> */}
                                        {/* </ImageBackground> */}
                                    </View>
                                    <View style={PAGESTYLE.managementNameSec}>
                                        <View style={PAGESTYLE.nameSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Teacher name</Text>
                                            <Text style={PAGESTYLE.userName}>{props.selectedPupil.FirstName} {props.selectedPupil.LastName}</Text>
                                        </View>
                                        <View style={PAGESTYLE.dateSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Teaching Year</Text>
                                            <Text style={PAGESTYLE.userName}>{moment(props.selectedPupil.Dob).format('DD/MM/yyyy')}</Text>
                                        </View>
                                        <View>
                                            <Text numberOfLines={1} style={[PAGESTYLE.userLabel,]}>Unique I.D (auto-generated)</Text>
                                            <Text style={PAGESTYLE.userName}>{props.selectedPupil.UniqueNumber}</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.managementNameSec}>
                                        <View style={PAGESTYLE.nameSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Email</Text>
                                            <Text style={PAGESTYLE.userName}>{props.selectedPupil.Note ? props.selectedPupil.Note : '-'}</Text>
                                        </View>
                                        <View style={PAGESTYLE.dateSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Status</Text>
                                            <Text style={PAGESTYLE.userName}>{props.selectedPupil.Note ? props.selectedPupil.Note : '-'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rateAnnotationBlock}>
                                    <View style={PAGESTYLE.ratingBlock}>
                                        <Text style={PAGESTYLE.ratingTitle}>Teacher Insights</Text>
                                        <View style={PAGESTYLE.achivementBox}>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Scheduled Lessons</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Homework Set</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Active Pupils</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Previous Lessons</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Homework Submitted</Text>
                                            </View>
                                            <View style={PAGESTYLE.insightBox}>
                                                <Text style={PAGESTYLE.insightMain}>25</Text>
                                                <Text style={PAGESTYLE.insightLabel}>Inactive Pupils</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.graphBlock}>
                                    <View style={PAGESTYLE.graphBox}>
                                        <View style={PAGESTYLE.generalRow}>
                                            <View style={PAGESTYLE.chartBlock}>
                                                {/* <Image source={Images.chartImg} style={PAGESTYLE.mngmntchartImg} /> */}
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
                                        {/* <Image source={Images.graphImg} style={PAGESTYLE.mngmntgraphImg} /> */}
                                    </View>
                                    <View>

                                    </View>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                    :
                    tabSelected === 1 ?
                        <View style={{ width: isHide ? '100%' : '100%', }}>

                            <Chat tabs={tabSelected} data={props.selectedPupil} />
                        </View>
                        :
                        <LessonList data={props.selectedPupil} />
            }

        </View>
    );
}
export default TeacherProfileView;