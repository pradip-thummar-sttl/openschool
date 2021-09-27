import React, { useState, useEffect } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { baseUrl, isDesignBuild, isRunningFromVirtualDevice, opacity, showMessage } from "../../../../utils/Constant";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { appSettings, User } from "../../../../utils/Model";
import TeacherTimeTable from "../teachertimetable/TeacherTimetable";
import TeacherLessonList from "../teacherlessonlist/TeacherLessonList";
import TLDetailEdit from "../teacherlessondetail/lessonplan/TeacherLessonDetailEdit";
import TLDetailAdd from "../teacherlessondetail/lessonplan/TeacherLessonDetailAdd";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PupilManagement from "../pupilmanagement/PupilManagement";
import Message from "../GlobalMessage/Message";
import PupilProfileView from "../pupilmanagement/PupilProfileView";
import MESSAGE from "../../../../utils/Messages";
import QB from "quickblox-react-native-sdk";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import { Download } from "../../../../utils/Download";
import StartNewCall from "../../../../svg/teacher/dashboard/StartNewCall";
import NewLesson from "../../../../svg/teacher/dashboard/NewLesson";
import NewCalendar from "../../../../svg/teacher/dashboard/NewCalendar";
import NewPupil from "../../../../svg/teacher/dashboard/NewPupil";
import MyDay from "../../../../svg/teacher/dashboard/MyDay";
import More from "../../../../svg/teacher/dashboard/More";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import Participants from "../../../../svg/teacher/dashboard/Participants";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import MyPupils from "../../../../svg/teacher/dashboard/MyPupils";
import Engagement from "../../../../svg/teacher/dashboard/Engagement";
import Efforts from "../../../../svg/teacher/dashboard/Efforts";
import OrangeStar from "../../../../svg/teacher/dashboard/OrangeStar";
import GreyStar from "../../../../svg/teacher/dashboard/GreyStar";
import YellowStar from "../../../../svg/teacher/dashboard/YellowStar";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";
import ArrowNext from "../../../../svg/teacher/lessonhwplanner/ArrowNext";
import MoreWhite from "../../../../svg/teacher/dashboard/MoreWhite";
import Bronze from "../../../../svg/teacher/lessonhwplanner/StarBronze";
import Silver from "../../../../svg/teacher/lessonhwplanner/StartSilver";
import Gold from "../../../../svg/teacher/pupilmanagement/StarGold";

const { CallModule, CallModuleIos } = NativeModules;

const Item = ({ onPress, style, item }) => (
    <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>

        <View style={PAGESTYLE.classSubject}>
            <View style={PAGESTYLE.subjecRow}>
                <View style={PAGESTYLE.border}></View>
                <View>
                    <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: 120 }]}>{item.SubjectName}</Text>
                    <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: 100 }]}>{item.LessonTopic}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.timingMain}>
                <Text style={PAGESTYLE.groupName} numberOfLines={1}>{item.GroupName}</Text>
                <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
            </View>
        </View>
        {/* <View style={PAGESTYLE.arrowSelectedTab}></View> */}

    </TouchableOpacity>
    // <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>
    //     <View style={PAGESTYLE.classSubject}>
    //         <View style={PAGESTYLE.subjecRow}>
    //             <View style={PAGESTYLE.border}></View>
    //             <View>
    //                 <Text style={PAGESTYLE.subjectName}>English</Text>
    //                 <Text style={PAGESTYLE.subject}>Grammar</Text>
    //             </View>
    //         </View>
    //         <View style={PAGESTYLE.timingMain}>
    //             <Text style={PAGESTYLE.groupName}>Grouap A1</Text>
    //             <Text style={PAGESTYLE.timing}>09:00 - 09:30</Text>
    //         </View>
    //     </View>
    // </TouchableOpacity>
);

const Pupillist = ({ item, onPress }) => (


    <TouchableOpacity onPress={() => { onPress() }}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile}>
                <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(20), fontFamily: FONTS.fontSemiBold }]}>{item.FirstName} {item.LastName}</Text>
            </View>
            <View style={PAGESTYLE.groupColumnmain}>
                <View style={PAGESTYLE.groupColumn}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.GroupName ? item.GroupName : '-'}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}><Engagement height={hp(1.04)} width={hp(1.04)} /></View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}><Efforts height={hp(1.04)} width={hp(1.04)} /></View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                {item.RewardsList.map((item, index) => {
                    return (
                        item._id == '3' ?
                            <View style={PAGESTYLE.rewardStar}>
                                {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                <Bronze style={PAGESTYLE.rewardStartIcon} height={hp(2.02)} width={hp(2.11)} />
                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                            </View>
                            :
                            item._id == '6' ?
                                <View style={PAGESTYLE.rewardStar}>
                                    {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                    <Silver style={PAGESTYLE.rewardStartIcon} height={hp(2.02)} width={hp(2.11)} />
                                    <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                </View>
                                :
                                item._id == '9' ?
                                    <View style={PAGESTYLE.rewardStar}>
                                        {/* <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                        <Gold style={PAGESTYLE.rewardStartIcon} height={hp(2.02)} width={hp(2.11)} />
                                        <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                    </View>
                                    :
                                    null
                    )
                })}
            </View>
            {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
        </View>
    </TouchableOpacity>
);
// const Pupillist = ({ style }) => (
//     <View style={[PAGESTYLE.pupilData]}>
//         <View style={PAGESTYLE.pupilProfile}>
//             <View style={PAGESTYLE.pupilImage}></View>
//             <Text style={PAGESTYLE.pupilName}>Janice Williamson</Text>
//         </View>
//         <View style={PAGESTYLE.groupColumnmain}>
//             <View style={PAGESTYLE.groupColumn}>
//                 <Text style={PAGESTYLE.pupilgroupName}>1A</Text>
//             </View>
//         </View>
//         <View style={PAGESTYLE.perfomanceColumn}>
//             <View style={PAGESTYLE.perfomanceDotmain}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.purpleDot]}></View></View>
//             <View style={PAGESTYLE.perfomanceDotmainTwo}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.yellowDot]}></View></View>
//         </View>
//         <View style={PAGESTYLE.rewardColumn}>
//             <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
//             <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
//             <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
//         </View>
//         <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
//             <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
//         </TouchableOpacity>
//     </View>
// );
const LessonandHomeworkPlannerDashboard = (props) => {
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    const [dashData, setdashData] = useState([])
    const [pupilData, setPupilData] = useState([])
    const [isDashDataLoading, setDashDataLoading] = useState(true)
    const [isPupilDataLoading, setPupilDataLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isTeacherLessonDetail, setTeacherLessonDetail] = useState(false)
    const [isAddSubject, setAddSubject] = useState(false)
    const [isAddEvent, setAddEvent] = useState(false)
    const [isPupilManagement, setPupilManagement] = useState(false)
    const [pupilManagementselectedTab, setPupilManagementselectedTab] = useState(0)
    const [isPupilDetail, setPupilDetail] = useState(false)
    const [selectedPupil, setSelectedPupil] = useState({})


    const [isLoading, setLoading] = useState(false);
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    let currentCount = 0
    useEffect(() => {
        QB.webrtc
            .init(appSettings)
            .then(function () {
                // SDK initialized successfully
            })
            .catch(function (e) {
                // Some error occurred, look at the exception message for more details
            });
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const handleBackButtonClick = () => {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
        }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App', ToastAndroid.SHORT)
        }
        setTimeout(() => {
            currentCount = 0;
        }, 2000);

        return true;
    }

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        // if(isDesignBuild)
        //     return true

        Service.get(`${EndPoints.GetMyDayByTeacherId}/${User.user._id}`, (res) => {
            setDashDataLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setdashData(res.data)
                setDataOfSubView(res.data[0])
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })

        Service.get(`${EndPoints.PupilByTeacherId}/${User.user._id}`, (res) => {
            setPupilDataLoading(false)
            if (res.code == 200) {
                console.log('response of get all pupil data', res)
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all pupil error', err)
        })
        return () => {
        }
    }

    const launchLiveClass = () => {
        if (isRunningFromVirtualDevice) {
            // Do Nothing
        } else {
            // if (Platform.OS == 'android') {
            // startLiveClassAndroid()
            // } else {
            //     startLiveClassIOS()
            // }
            setLoading(true)
            let currentTime = moment(Date()).format('HH:mm')
            if (currentTime >= dataOfSubView.StartTime && currentTime <= dataOfSubView.EndTime) {
                // showMessage('time to start')
                let data = {
                    LessonStart: true,
                    LessonEnd: false
                }
                Service.post(data, `${EndPoints.LessionStartEnd}/${dataOfSubView._id}`, (res) => {
                    setLoading(false)
                    if (res.flag) {
                        startLiveClassAndroid()
                    }
                }, (err) => {
                    setLoading(false)
                })
            } else {
                showMessage(MESSAGE.scheduledTimeStart)
                setLoading(false)
            }
        }
    }

    const startLiveClassAndroid = () => {
        try {
            let qBUserIDs = [], userNames = [], names = [], channels = []
            // let qBUserIDs = ['128367057'], userNames = ['ffffffff-c9b2-d023-ffff-ffffef05ac4a'], names = ['Test Device'];
            dataOfSubView.Allpupillist.forEach(pupil => {
                qBUserIDs.push(pupil.QBUserID)
                userNames.push(pupil.PupilEmail)
                names.push(pupil.PupilName)
                channels.push(dataOfSubView.TeacherID + "_" + pupil.PupilId)
            });

            let dialogID = dataOfSubView.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName
            let title = dataOfSubView.LessonTopic


            if (Platform.OS == 'android') {
                console.log('KDKD: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, title, channels, (error, ID) => {
                    console.log('Class Started');
                    let data = {
                        LessonStart: false,
                        LessonEnd: true
                    }
                    Service.post(data, `${EndPoints.LessionStartEnd}/${dataOfSubView._id}`, (res) => {
                    }, (err) => {
                    })
                });
            } else {
                console.log('PTPT: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, false, title, channels, (id) => {
                    console.log('hi id:---------', id)
                    let data = {
                        LessonStart: false,
                        LessonEnd: true
                    }
                    Service.post(data, `${EndPoints.LessionStartEnd}/${dataOfSubView._id}`, (res) => {
                    }, (err) => {
                    })
                })
            }

        } catch (event) {
            console.error(event);
        }
    };

    const startLiveClassIOS = () => {

    }

    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);
    const [dataOfSubView, setDataOfSubView] = useState([])
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                onPress={() => { setSelectedPupil(item); setPupilDetail(true) }}
            />
        );
    };
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(dashData[index])
    }
    const navigatePupilGroup = () => {
        setPupilManagementselectedTab(1)
        setTeacherLessonDetail(false);
        setAddSubject(false);
        setSelectedIndex(3)
    }
    const renderItem = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <Item
                item={item}
                onPress={() => setData(index)}
                style={{ backgroundColor }}
            />
        );
    };

    const initOneToOneCall = (pupilData) => {
        props.navigation.navigate('Call', { userType: 'Teacher', pupilData: pupilData })
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                moduleIndex={selectedIndex}
                hide={() => action(!isHide)}
                navigateToDashboard={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(0); refresh() }}
                navigateToTimetable={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(1) }}
                navigateToLessonAndHomework={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(2) }}
                navigateToPupilManagement={() => { setPupilManagementselectedTab(0); setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(3) }}
                navigateToParents={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(4) }}
                navigateUser={() => { setTeacherLessonDetail(false); setAddSubject(false); props.navigation.replace('Users'); setSelectedIndex(4) }} />

            {
                isPupilDetail ?
                    <PupilProfileView
                        selectedPupil={selectedPupil}
                        navigateToBack={() => { setPupilDetail(false) }} />

                    :
                    isTeacherLessonDetail ?
                        <TLDetailEdit
                            goBack={() => setTeacherLessonDetail(false)}
                            onAlertPress={() => props.navigation.openDrawer()}
                            onRefresh={() => refresh()}
                            data={dataOfSubView} />
                        :
                        isAddSubject ?
                            <TLDetailAdd
                                goBack={() => { setAddSubject(false) }}
                                onAlertPress={() => props.navigation.openDrawer()} />
                            :
                            selectedIndex == 0 ?
                                <View style={{ width: isHide ? '93%' : '78%', backgroundColor: COLORS.backgroundColorCommon, }}>
                                    <Header onAlertPress={() => props.navigation.openDrawer()} />
                                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                        <ScrollView style={STYLE.padLeftRight}>
                                            <View style={PAGESTYLE.dashBoardBoxes}>
                                                <TouchableOpacity style={PAGESTYLE.boxDash} onPress={() => initOneToOneCall(pupilData)}>
                                                    <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.greenBox]}>
                                                        <Text H3 style={PAGESTYLE.titleBox}>Start a new {"\n"}call</Text>
                                                        {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.DashboardCallIcon}></ImageBackground> */}
                                                        <StartNewCall style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={PAGESTYLE.boxDash}
                                                    activeOpacity={opacity}
                                                    onPress={() => setAddSubject(true)}>
                                                    <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.yellowBox]}>
                                                        <Text H3 style={PAGESTYLE.titleBox}>New lesson</Text>
                                                        {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.LessonIcon}></ImageBackground> */}
                                                        <NewLesson style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={PAGESTYLE.boxDash}
                                                    activeOpacity={opacity}
                                                    onPress={() => setAddEvent(true)}>
                                                    <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.purpleBox]}>
                                                        <Text H3 style={PAGESTYLE.titleBox}>New calendar {"\n"}entry</Text>
                                                        {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.ImageIcon}></ImageBackground> */}
                                                        <NewCalendar style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { navigatePupilGroup() }} style={PAGESTYLE.boxDash}>
                                                    <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.blueBox]}>
                                                        <Text H3 style={PAGESTYLE.titleBox}>Add new pupil {"\n"}group</Text>
                                                        {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.PupilGrpIcon}></ImageBackground> */}
                                                        <NewPupil style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={PAGESTYLE.myDay}>
                                                <View style={[STYLE.viewRow]}>
                                                    {/* <Image style={PAGESTYLE.dayIcon} source={Images.Myday} /> */}
                                                    <MyDay style={PAGESTYLE.dayIcon} height={hp(4)} width={hp(4)} />
                                                    <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                                                </View>
                                                <View style={[PAGESTYLE.rightContent]}>
                                                    <View style={[PAGESTYLE.datePosition]}>
                                                        <Text style={PAGESTYLE.date}>{moment().format('D')}</Text>
                                                        <Text style={PAGESTYLE.month}>{moment().format('MMM')}</Text>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity>
                                                            {/* <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} /> */}
                                                            <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.60)} width={hp(0.65)} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={PAGESTYLE.whiteBoard}>
                                                {isDashDataLoading ?
                                                    <ActivityIndicator
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.yellowDark} />
                                                    :
                                                    dashData.length > 0 && dataOfSubView ?
                                                        <View style={STYLE.viewRow}>
                                                            <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                                <FlatList
                                                                    style={PAGESTYLE.ScrollViewFlatlist}
                                                                    data={dashData}
                                                                    renderItem={renderItem}
                                                                    keyExtractor={(item) => item.id}
                                                                    extraData={selectedId}
                                                                    showsVerticalScrollIndicator={false}
                                                                    nestedScrollEnabled
                                                                />
                                                            </SafeAreaView>
                                                            <View style={PAGESTYLE.rightTabContent}>
                                                                {/* {
                                            console.log('hello222222222', dashData.indexOf(dataOfSubView), selectedId),
                                            dashData.indexOf(dataOfSubView) == selectedId ?
                                                <View style={PAGESTYLE.arrowSelectedTab}></View>
                                                : null
                                        } */}
                                                                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.scrollView}>
                                                                    <View style={PAGESTYLE.tabcontent}>
                                                                        <Text h2 style={PAGESTYLE.titleTab}>{dataOfSubView.LessonTopic}</Text>
                                                                        <View style={PAGESTYLE.timedateGrp}>
                                                                            <View style={PAGESTYLE.dateWhiteBoard}>
                                                                                {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                                                                                <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                <Text style={PAGESTYLE.datetimeText}>{moment(dataOfSubView.Date).format('DD/MM/yyyy')}</Text>
                                                                            </View>
                                                                            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                                                                {/* <Image style={PAGESTYLE.timeIcon} source={Images.Clock} /> */}
                                                                                <Clock style={PAGESTYLE.timeIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.StartTime} - {dataOfSubView.EndTime}</Text>
                                                                            </View>
                                                                            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                                {/* <Image style={PAGESTYLE.calIcon} source={Images.Group} /> */}
                                                                                <Participants style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.GroupName}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={STYLE.hrCommon}></View>
                                                                        <View style={PAGESTYLE.mediaMain}>
                                                                            {dataOfSubView.Allpupillist ?
                                                                                dataOfSubView.Allpupillist.map((data, index) => (
                                                                                    <TouchableOpacity
                                                                                        style={PAGESTYLE.mediabarTouch}
                                                                                        activeOpacity={opacity}>
                                                                                        <Image style={PAGESTYLE.mediabar} source={{ uri: baseUrl + data.ProfilePicture }}></Image>
                                                                                    </TouchableOpacity>
                                                                                ))
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                        <Text style={PAGESTYLE.lessondesciption}>{dataOfSubView.LessonDescription}</Text>
                                                                        <View style={PAGESTYLE.attchmentSectionwithLink}>
                                                                            {/* <TouchableOpacity style={PAGESTYLE.attachment}>
                                                                            <Image style={PAGESTYLE.attachmentIcon} source={Images.AttachmentIcon} />
                                                                            <Text style={PAGESTYLE.attachmentText}>{dataOfSubView.MaterialList ? dataOfSubView.MaterialList.length : 0} Attachment(s)</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity>
                                                                            <Text style={PAGESTYLE.linkText}>see more</Text>
                                                                        </TouchableOpacity> */}
                                                                            {dataOfSubView.MaterialList && dataOfSubView.MaterialList.length > 0 ?
                                                                                <View style={PAGESTYLE.fileBoxGrpWrap}>
                                                                                    <Text style={PAGESTYLE.requireText}>Attachment(s)</Text>
                                                                                    <FlatList
                                                                                        data={dataOfSubView.MaterialList}
                                                                                        style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                                                                        renderItem={({ item, index }) => (
                                                                                            <TouchableOpacity onPress={() => {
                                                                                                setLoader(true); setMateIndex(index); Download(item, (res) => {
                                                                                                    setLoader(false)
                                                                                                    setMateIndex(-1)
                                                                                                })
                                                                                            }} style={PAGESTYLE.downloaBtn}>
                                                                                                <View style={PAGESTYLE.fileGrp}>
                                                                                                    <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: '80%' }]}>{item.originalname}</Text>
                                                                                                    {(isMatLoading && index == mateIndex) ?
                                                                                                        <ActivityIndicator
                                                                                                            style={{ ...PAGESTYLE.downloadIcon }}
                                                                                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                                            color={COLORS.blueBorder} />
                                                                                                        :
                                                                                                        // <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                                                                                        <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                                                                                                    }
                                                                                                    {/* <Image source={Images.Download} style={PAGESTYLE.downloadIcon} /> */}
                                                                                                </View>
                                                                                            </TouchableOpacity>
                                                                                        )}
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                    />
                                                                                </View>
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                        <View style={PAGESTYLE.requirementofClass}>
                                                                            <Text style={PAGESTYLE.requireText}>Items that your class will need</Text>

                                                                            {dataOfSubView.CheckList ?
                                                                                dataOfSubView.CheckList.map((data, index) => (
                                                                                    <View style={PAGESTYLE.lessonPoints}>
                                                                                        {/* <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} /> */}
                                                                                        <TickMarkBlue style={PAGESTYLE.checkIcon} height={hp(1.7)} width={hp(1.7)} />
                                                                                        <Text style={PAGESTYLE.lessonPointText}>{data.ItemName}</Text>
                                                                                    </View>
                                                                                ))
                                                                                :
                                                                                null
                                                                            }
                                                                        </View>
                                                                        <View style={PAGESTYLE.lessonstartButton}>
                                                                            <TouchableOpacity style={PAGESTYLE.buttonGrp}
                                                                                opacity={opacity}
                                                                                onPress={() => setTeacherLessonDetail(true)}>
                                                                                <Text style={STYLE.commonButtonBordered}>Edit Lesson</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={PAGESTYLE.buttonGrp}
                                                                                onPress={() => { launchLiveClass() }}>
                                                                                {
                                                                                    isLoading ?
                                                                                        <ActivityIndicator
                                                                                            style={{ ...PAGESTYLE.buttonGrp, right: 30 }}
                                                                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                            color={COLORS.buttonGreen} /> :
                                                                                        <Text style={STYLE.commonButtonGreenDashboardSide}>Start Class</Text>
                                                                                }

                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                </ScrollView>
                                                                {/* <View style={PAGESTYLE.tabcontent}>
                                    <Text h2 style={PAGESTYLE.titleTab}>Cartoon Drawings</Text>
                                    <View style={PAGESTYLE.timedateGrp}>
                                        <View style={PAGESTYLE.dateWhiteBoard}>
                                            <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                            <Text style={PAGESTYLE.datetimeText}>14/09/2020</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                            <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                                            <Text style={PAGESTYLE.datetimeText}>09:00 - 09:30</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                            <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                                            <Text style={PAGESTYLE.datetimeText}>Group 2A</Text>
                                        </View>
                                    </View>
                                    <View style={STYLE.hrCommon}></View>
                                    <View style={PAGESTYLE.mediaMain}>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.moreMedia}><Text style={PAGESTYLE.moreMediaText}>2+</Text></View></TouchableOpacity>
                                    </View>
                                    <Text style={PAGESTYLE.lessondesciption}>This fun lesson will be focused on drawing a cartoon character. We will work together to sharpen your drawing skills, encourage creative thinking and have fun with colours.</Text>
                                    <View style={PAGESTYLE.attchmentSectionwithLink}>
                                        <TouchableOpacity style={PAGESTYLE.attachment}>
                                            <Image style={PAGESTYLE.attachmentIcon} source={Images.AttachmentIcon} />
                                            <Text style={PAGESTYLE.attachmentText}>1 Attachment</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={PAGESTYLE.linkText}>see more</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <Text style={PAGESTYLE.requireText}>Items that your class will need</Text>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                            <Text style={PAGESTYLE.lessonPointText}>Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens.</Text>
                                        </View>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                            <Text style={PAGESTYLE.lessonPointText}>Drawing work sheet.</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.lessonstartButton}>
                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBordered}>Edit Lesson</Text></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Start Class</Text></TouchableOpacity>
                                    </View>
                                </View> */}
                                                            </View>
                                                        </View>
                                                        :
                                                        // <View style={{ height: 100, justifyContent: 'center' }}>
                                                        //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                        // </View>
                                                        <EmptyStatePlaceHohder holderType={5} title1={MESSAGE.noLesson1} title2={MESSAGE.noLesson2} />
                                                }
                                            </View>
                                            <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                                                <View style={[STYLE.viewRow]}>
                                                    {/* <Image style={PAGESTYLE.dayIcon} source={Images.PupilDashIcon} /> */}
                                                    <MyPupils style={PAGESTYLE.dayIcon} height={hp(4)} width={hp(4)} />
                                                    <Text H3 style={PAGESTYLE.dayTitle}>My Pupils</Text>
                                                </View>
                                                <View style={[PAGESTYLE.rightContent]}>
                                                    <View>
                                                        <TouchableOpacity>
                                                            {/* <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} /> */}
                                                            <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.60)} width={hp(0.65)} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[PAGESTYLE.whiteBoard, PAGESTYLE.pupilDashboard]}>
                                                {isPupilDataLoading ?
                                                    <ActivityIndicator
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.blueButton} />
                                                    :
                                                    pupilData.length > 0 ?
                                                        <View>
                                                            <View style={PAGESTYLE.pupilTable}>
                                                                <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Name</Text>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text>
                                                                </View>
                                                                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil2]}>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Group</Text>
                                                                </View>
                                                                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil3]}>
                                                                    <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Performance</Text>
                                                                    <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                                        <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Enagagement</Text>
                                                                        <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Effort</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil4]}>
                                                                    <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Quick Reward</Text>
                                                                    <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                                        <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Bronze</Text>
                                                                        <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Silver</Text>
                                                                        <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Gold</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={[STYLE.hrCommon, PAGESTYLE.pupilhrCustomMargin]}></View>
                                                            <View style={PAGESTYLE.pupilTabledata}>
                                                                <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                                    {/* <FlatList
                                                                        data={pupilData}
                                                                        renderItem={pupilRender}
                                                                        style={PAGESTYLE.pupilListing}
                                                                        keyExtractor={(item) => item.id}
                                                                        extraData={selectedId}
                                                                        showsVerticalScrollIndicator={false}
                                                                    /> */}
                                                                    <View style={PAGESTYLE.pupilListing}>
                                                                        {pupilData.map((data) => {
                                                                            return (
                                                                                <Pupillist
                                                                                    item={data}
                                                                                    onPress={() => { setSelectedPupil(item); setPupilDetail(true) }}
                                                                                />
                                                                            )
                                                                        })}
                                                                    </View>

                                                                </SafeAreaView>
                                                            </View>
                                                        </View>
                                                        :

                                                        // <View>
                                                        //     <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                        // </View>
                                                        <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noPupil1} title2={MESSAGE.noPupil2} />
                                                }
                                            </View>
                                        </ScrollView>
                                    </KeyboardAwareScrollView>
                                </View>
                                :
                                selectedIndex == 1 ?
                                    <TeacherTimeTable navigation={props.navigation} />
                                    :
                                    selectedIndex == 2 ?
                                        <TeacherLessonList navigation={props.navigation} />
                                        :
                                        selectedIndex == 3 ?
                                            <PupilManagement navigation={props.navigation} tabs={pupilManagementselectedTab} />
                                            :
                                            <Message navigation={props.navigation} />

            }
            {isAddEvent ?
                <PopupdataSecond
                    isFromDashboard={true}
                    goBack={() => { setAddEvent(false) }} />
                :
                null
            }
        </View>

    );
}

export default LessonandHomeworkPlannerDashboard;