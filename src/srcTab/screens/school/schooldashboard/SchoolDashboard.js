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
import { baseUrl, isDesignBuild, isRunningFromVirtualDevice, opacity, showMessage, Var } from "../../../../utils/Constant";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { appSettings, BadgeIcon, User } from "../../../../utils/Model";
import TeacherTimeTable from "../../teacher/teachertimetable/TeacherTimetable";
import TeacherLessonList from "../../teacher/teacherlessonlist/TeacherLessonList";
import TLDetailEdit from "../../teacher/teacherlessondetail/lessonplan/TeacherLessonDetailEdit";
import TLDetailAdd from "../../teacher/teacherlessondetail/lessonplan/TeacherLessonDetailAdd";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PupilManagement from "../../school/pupilmanagement/PupilManagement";
import Message from "../../teacher/GlobalMessage/Message";
import PupilProfileView from "../../teacher/pupilmanagement/PupilProfileView";
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
import Insights from "../../../../svg/school/dashboard/Insights";
import SidebarSchool from "../../../component/reusable/sidebar/SidebarSchool";
import SchoolMessage from "../globalmessage/SchoolMessage";
import TeacherManagement from "../teachermanagement/TeacherManagement";
import SchoolSetting from "../setting/SchoolSetting";
import TeacherProfileView from "../teachermanagement/TeacherProfileView";

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
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.TeachingYear}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.LessonCount}</Text>
                </View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}>
                    <Text numberOfLines={1} style={PAGESTYLE.pupilgroupName}>{item.HomeworkCount}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                <View style={PAGESTYLE.rewardStar}>
                    <Text numberOfLines={1} style={{...PAGESTYLE.pupilgroupName, width:hp(25),textAlign: 'left',}}>{item.Email}</Text>
                </View>
            </View>
            {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
        </View>
    </TouchableOpacity>
);
const SchoolDashboard = (props) => {
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    const [dashData, setdashData] = useState([])
    const [schoolData, setSchoolData] = useState([])
    const [isDashDataLoading, setDashDataLoading] = useState(false)
    const [isSchoolDataLoading, setSchoolDataLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isTeacherLessonDetail, setTeacherLessonDetail] = useState(false)
    const [isAddSubject, setAddSubject] = useState(false)
    const [isAddEvent, setAddEvent] = useState(false)
    const [isPupilManagement, setPupilManagement] = useState(false)
    const [messagingTab, setMessagingTab] = useState(0)
    const [isTeacherDetail, setTeacherDetail] = useState(false)
    const [teacherDetailData, setTeacherDetailData] = useState({})


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

        let data = {
            Searchby: '',
            Filterby: ''
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            setSchoolDataLoading(false)
            if (res.code == 200) {
                console.log('response of get all pupil data', res.data)
                setSchoolData(res.data)
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

        } catch (e) {
            console.error(e);
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
                onPress={() => { setTeacherDetailData(item); setTeacherDetail(true) }}
            />
        );
    };
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(dashData[index])
    }
    const navigatePupilGroup = () => {
        setMessagingTab(1)
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

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer() 
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            <SidebarSchool
                moduleIndex={selectedIndex}
                hide={() => action(!isHide)}
                navigateToDashboard={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(0); refresh() }}
                navigateToTeachers={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(1) }}
                navigateToPupils={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(2) }}
                navigateToMessaging={() => { setMessagingTab(0); setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(3) }}
                navigateToParents={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(4) }}
                navigateUser={() => { setTeacherLessonDetail(false); setAddSubject(false); props.navigation.replace('Users'); setSelectedIndex(4) }}
                navigateToSettings={() => { setTeacherLessonDetail(false); setAddSubject(false); setSelectedIndex(7) }} />

            {
                isTeacherDetail ?
                    <TeacherProfileView
                        selectedTeacher={teacherDetailData}
                        navigateToBack={() => setTeacherDetail(false)} />

                    :
                    isTeacherLessonDetail ?
                        <TLDetailEdit
                            goBack={() => setTeacherLessonDetail(false)}
                            onAlertPress={() => openNotification()}
                            onRefresh={() => refresh()}
                            data={dataOfSubView} />
                        :
                        isAddSubject ?
                            <TLDetailAdd
                                goBack={() => { setAddSubject(false) }}
                                onAlertPress={() => openNotification()} />
                            :
                            selectedIndex == 0 ?
                                <View style={{ flex: 1,backgroundColor: COLORS.backgroundColorCommon, }}>
                                    <Header onAlertPress={() => openNotification()} />
                                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                        <ScrollView style={STYLE.padLeftRight}>
                                            <View style={PAGESTYLE.myDay}>
                                                <View style={{...STYLE.viewRow, alignItems: 'center',position: 'relative',}}>
                                                    {/* <Image style={PAGESTYLE.dayIcon} source={Images.Myday} /> */}
                                                    <Insights style={{...PAGESTYLE.dayIcon, top:Platform.OS === 'android' ? -1 : 0}} height={hp(3.25)} width={hp(4.33)} />
                                                    <Text H3 style={PAGESTYLE.dayTitle}>Insights</Text>
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
                                                            </View>
                                                        </View>
                                                        :
                                                        <EmptyStatePlaceHohder holderType={7} title1={MESSAGE.noInsights1} title2={MESSAGE.noInsights2} />
                                                }
                                            </View>
                                            <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                                                <View style={{...STYLE.viewRow,alignItems: 'center',position: 'relative',}}>
                                                    {/* <Image style={PAGESTYLE.dayIcon} source={Images.PupilDashIcon} /> */}
                                                    <MyPupils style={{...PAGESTYLE.dayIcon, top: 0,}} height={hp(3.25)} width={hp(3.25)} />
                                                    <Text H3 style={PAGESTYLE.dayTitle}>My Teachers</Text>
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
                                                {isSchoolDataLoading ?
                                                    <ActivityIndicator
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.blueButton} />
                                                    :
                                                    schoolData.length > 0 ?
                                                        <View>
                                                            <View style={PAGESTYLE.pupilTable}>
                                                                <View style={{...PAGESTYLE.pupilTableHeadingMain, width: '25%',}}>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Name</Text>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total {schoolData.length} Teachers</Text>
                                                                </View>
                                                                <View style={{...PAGESTYLE.pupilTableHeadingMain, width: '16%',}}>
                                                                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Teaching Year</Text>
                                                                </View>
                                                                <View style={{...PAGESTYLE.pupilTableHeadingMain, width: '20%',}}>
                                                                    <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Scheduled Activity</Text>
                                                                    <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                                        <Text style={{...PAGESTYLE.pupilTableHeadingMainsubTitle,width: '40%',textAlign: 'center',}}>Lessons</Text>
                                                                        <Text style={{...PAGESTYLE.pupilTableHeadingMainsubTitle,width: '57%',textAlign: 'center',}}>Homework</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{...PAGESTYLE.pupilTableHeadingMain, width: '35%',textAlign: 'center'}}>
                                                                    <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Contact</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{...STYLE.hrCommon, marginBottom:6,}}></View>
                                                            <View style={PAGESTYLE.pupilTabledata}>
                                                                <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                                    <FlatList
                                                                        data={schoolData}
                                                                        renderItem={pupilRender}
                                                                        style={PAGESTYLE.pupilListing}
                                                                        keyExtractor={(item) => item.id}
                                                                        extraData={selectedId}
                                                                        showsVerticalScrollIndicator={false}
                                                                        nestedScrollEnabled
                                                                    />
                                                                </SafeAreaView>
                                                            </View>
                                                        </View>
                                                        :

                                                        // <View>
                                                        //     <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                        // </View>
                                                        <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.noTeacher1} title2={MESSAGE.noTeacher2} />
                                                }
                                            </View>
                                        </ScrollView>
                                    </KeyboardAwareScrollView>
                                </View>
                                :
                                selectedIndex == 1 ?
                                    <TeacherManagement navigation={props.navigation} />
                                    :
                                    selectedIndex == 2 ?
                                        <PupilManagement navigation={props.navigation} />
                                        :
                                        selectedIndex == 3 ?
                                            <SchoolMessage navigation={props.navigation} tabs={messagingTab} />
                                            :
                                            selectedIndex == 4 ?
                                                <Message navigation={props.navigation} />
                                                :
                                                <SchoolSetting navigation={props.navigation} />

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

export default SchoolDashboard;