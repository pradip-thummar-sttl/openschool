import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import HeaderPMInner from "./HeaderPMInner";
import moment from 'moment';
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import Chat from "../../Chat/Chat";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import ActivityRings from "react-native-activity-rings";
import MESSAGE from "../../../../utils/Messages";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";
import { useFocusEffect } from "@react-navigation/native";

const { CallModule } = NativeModules;

const SPupilProfileView = (props) => {
    const item = props.route.params.item;
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);


    const [joinedLesson, setJoinedLesson] = useState(0)
    const [submittedHomework, setSubmittedHomework] = useState(0)
    const [missedLesson, setMissedLesson] = useState(0)
    const [isLessonDetail, setLessonDetail] = useState(false);

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [feedBack, setFeedback] = useState('')

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }

    const [chartData, setChartData] = useState([])

    const myref = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    const handleOnClick = (index) => {
        setTabSelected(index)
        if (myref.current) {
            myref.current.refresh();
        }
    }

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
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
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
        <View style={{ height: '100%', }}>
            <HeaderPMInner
                name={item.FirstName + ' ' + item.LastName}
                navigateToBack={() => props.navigation.goBack()}
                navigateToPupilProfileEdit={() => props.navigation.replace('SPupilProfileEdit', { item: item,navigateToBack: () => props.navigation.goBack() })}
                onAlertPress={() => props.navigation.openDrawer()}
                tabIndex={(index) => { handleOnClick(index) }}
            />
            <View style={{flex: 1}}>
            {
                tabSelected === 0 ?
                    <View style={PAGESTYLE.MainProfile}>
                        <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
                            
                            <View style={PAGESTYLE.mainContainerProfile}>
                                <View style={[PAGESTYLE.profileImageArea]}>
                                    <EditProfileTop_Mobile style={PAGESTYLE.coverImage} width={'100%'} height={hp(13.8)} />
                                    <View style={PAGESTYLE.profileOuter}>
                                        <Image style={PAGESTYLE.profileImage} source={{ uri: baseUrl + item.ProfilePicture }} />
                                    </View>
                                </View>
                            </View>
                            
                            <View style={PAGESTYLE.mainDetails}>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Pupil name</Text>
                                    <Text P style={PAGESTYLE.data}>{item.FirstName} {item.LastName}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                                    <Text P style={PAGESTYLE.data}>{moment(item.Dob).format('DD/MM/yyyy')}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                                    <Text P style={PAGESTYLE.data}>{item.UniqueNumber}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Parents Name</Text>
                                    <Text P style={PAGESTYLE.data}>{item.ParentFirstName} {item.ParentLastName}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Parents Email</Text>
                                    <Text P style={PAGESTYLE.data}>{item.Email ? item.Email : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Parents Tel.</Text>
                                    <Text P style={PAGESTYLE.data}>{item.MobileNumber ? item.MobileNumber : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Assign to</Text>
                                    <Text P style={PAGESTYLE.data}>{item.Note ? item.Note : '-'}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Status</Text>
                                    <Text P style={PAGESTYLE.data}>{item.IsActive ? 'Active' : 'Deactive'}</Text>
                                </View>
                            </View>
                            
                            <View HR style={STYLE.hrCommon}></View>

                            <View style={{ flexDirection: 'row', }}>
                                <View style={PAGESTYLE.squreView}>
                                    <Text style={PAGESTYLE.data}>{joinedLesson}</Text>
                                    <Text style={PAGESTYLE.label1}>Attended lessons</Text>
                                </View>
                                <View style={PAGESTYLE.squreView}>
                                    <Text style={PAGESTYLE.data}>{submittedHomework}</Text>
                                    <Text style={PAGESTYLE.label1}>Homework Submitted</Text>
                                </View>
                                <View style={PAGESTYLE.squreView}>
                                    <Text style={PAGESTYLE.data}>{missedLesson}</Text>
                                    <Text style={PAGESTYLE.label1}>Missed lessons</Text>
                                </View>
                            </View>

                            <View style={PAGESTYLE.pupilPerfomance}>
                                <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>

                                <View style={PAGESTYLE.performancePArent}>
                                    <ActivityRings
                                        data={chartData}
                                        config={activityConfig} />

                                    <View style={{ flexDirection: 'row', height: 50 }}>
                                        <View style={PAGESTYLE.colorLeftParent}>
                                            <View style={PAGESTYLE.colorSquare} />
                                            <Text style={PAGESTYLE.introText}>{`Engagement over${'\n'}last month`}</Text>
                                        </View>
                                        <View style={PAGESTYLE.colorRightParent}>
                                            <View style={PAGESTYLE.colorSquareRight} />
                                            <Text style={PAGESTYLE.introText}>{`Effort over last${'\n'}month`}</Text>
                                        </View>
                                    </View>
                                    <View HR style={STYLE.hrCommon}></View>
                                    <Text style={PAGESTYLE.bottomText}>Based on {item.FirstName + ' ' + item.LastName}'s engagement and effort, he is doing well and is excelling. He is also very eager to learn and perticularly interested in Mathematics and Science subjects.</Text>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                    :
                    <Chat tabs={tabSelected} data={item} />
            }
            </View>

        </View>
    );
}

export default SPupilProfileView;