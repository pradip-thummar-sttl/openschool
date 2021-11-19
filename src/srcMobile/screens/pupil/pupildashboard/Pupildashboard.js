import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, NativeEventEmitter, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, SafeAreaView, FlatList, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header from "../../../component/reusable/header/Header";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useImperativeHandle } from "react/cjs/react.development";
import { baseUrl, isRunningFromVirtualDevice, opacity, showMessage, showMessageWithCallBack, Var } from "../../../../utils/Constant";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import MESSAGE from "../../../../utils/Messages";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import { initApp } from "../../../component/reusable/onetoonecall/CallConfiguration";
import QB from "quickblox-react-native-sdk";
import { Download } from "../../../../utils/Download";
import ArrowNext from "../../../../svg/teacher/pupilmanagement/ArrowNext";
import MyHomeworkIllus from "../../../../svg/pupil/dashboard/MyHomeworkIllus";
import MyClassIllus from "../../../../svg/pupil/dashboard/MyClassIllus";
import MyDayCalendar from "../../../../svg/pupil/dashboard/MyDayCalendar";
import MoreWhite from "../../../../svg/teacher/dashboard/MoreWhite";
import CalenderIconSmall from "../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import Group from "../../../../svg/teacher/dashboard/Participants";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";
import TickmarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import MyhomeworkBook from "../../../../svg/pupil/dashboard/MyhomeworkBook";
import DueIcon from "../../../../svg/pupil/dashboard/HWDue_Orange";
import SubjectIcon from "../../../../svg/pupil/dashboard/Subject";
import CheckedBlue from "../../../../svg/pupil/dashboard/Checked_Blue";
import RewardStarback from "../../../../svg/pupil/dashboard/RewardStarback";
import RobotAvtar from "../../../../svg/pupil/dashboard/RobotAvtar";
import BronzeStar from "../../../../svg/pupil/dashboard/BronzeStar";
import SilverStar from "../../../../svg/pupil/dashboard/SilverStar";
import GoldStar from "../../../../svg/pupil/dashboard/GoldStar";
const { CallModule, CallModuleIos } = NativeModules

const PupuilDashboard = (props) => {
    const refRBSheet = useRef();
    const refRBSheetTwo = useRef();
    const [isHide, action] = useState(true);
    // const [selectedId, setSelectedId] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [dashData, setdashData] = useState([])

    const [dataOfSubView, setDataOfSubView] = useState([])
    const [dataOfHWSubView, setDataOfHomeworkSubView] = useState([])
    const [myClass, setMyClass] = useState([])
    const [HomeworkList, setPupilHomeworkList] = useState([])
    const [isMyDayLoading, setMyDayLoading] = useState(true)
    const [isHomeworkLoading, setHomeworkLoading] = useState(true)

    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    const [isLoading, setLoading] = useState(false);
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    let currentCount = 0
    useEffect(() => {
        initApp(callBack => {
            console.log('Pupil callBack', callBack);
            handleIncommingCall()
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

    const handleIncommingCall = () => {
        const emitter = new NativeEventEmitter(QB.webrtc)
        Object.keys(QB.webrtc.EVENT_TYPE).forEach(key => {
            emitter.addListener(QB.webrtc.EVENT_TYPE[key], eventHandler)
        })
    }

    const eventHandler = (event) => {
        const {
            type, // type of the event (i.e. `@QB/CALL` or `@QB/REJECT`)
            payload
        } = event
        const {
            userId, // id of QuickBlox user who initiated this event (if any)
            session, // current or new session
            userInfo
        } = payload
        // console.log('Event Received', event, payload);
        switch (type) {
            case QB.webrtc.EVENT_TYPE.CALL:
                props.navigation.navigate('Call', { userType: 'Pupil', sessionId: session.id, userInfo: userInfo, initiatorId: userId })
                break;
            case QB.webrtc.EVENT_TYPE.HANG_UP:
                // props.navigation.goBack()
                break;
            case QB.webrtc.EVENT_TYPE.RECEIVED_VIDEO_TRACK:
                console.log('RECEIVED_VIDEO_TRACK', payload);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        Service.get(`${EndPoints.GetListOfPupilMyDay}/${User.user.UserDetialId}`, (res) => {
            console.log('response of my day', res)
            if (res.flag === true) {
                setMyClass(res.data)
                setDataOfSubView(res.data[0])
                setMyDayLoading(false)
            } else {
                showMessage(res.message)
                setMyDayLoading(false)
            }
        }, (err) => {
        })

        Service.get(`${EndPoints.GetHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
            console.log('response of pupil homework list', res)
            if (res.flag === true) {
                setPupilHomeworkList(res.data)
                setDataOfHomeworkSubView(res.data[0])
                setHomeworkLoading(false)
            } else {
                showMessage(res.message)
                setHomeworkLoading(false)
            }
        }, (err) => {
        })

        Service.get(`${EndPoints.GetPupilRewards}/${User.user.UserDetialId}`, (res) => {
            console.log('response of my day', res)
            if (res.flag) {
                res.data.forEach(element => {
                    switch (element._id) {
                        case '3':
                            setBronze(element.count)
                            break;
                        case '6':
                            setSilver(element.count)
                            break;
                        case '9':
                            setGold(element.count)
                            break;
                        default:
                            break;
                    }
                });
            } else {
                showMessage(res.message)
                setMyDayLoading(false)
            }
        }, (err) => {
        })
    }

    const launchLiveClass = () => {
        console.log('data of sub view', dataOfSubView)
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
                let data = { "Absent": false }
                Service.post(data, `${EndPoints.LessonCheck}/${dataOfSubView._id}/${User.user.UserDetialId}`, (res) => {
                    setLoading(false)
                    if (res.flag) {
                        startLiveClassAndroid()
                    } else {
                        showMessage(MESSAGE.teacherNotStarted)
                    }
                }, (err) => {
                    setLoading(false)

                })
            } else {
                showMessage(MESSAGE.scheduledTime)
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
            });

            channels.push(dataOfSubView.TeacherID + "_" + User.user.UserDetialId)   //For instant reaction
            channels.push(dataOfSubView.TeacherID + "_" + dataOfSubView._id)        //For polling
            let dialogID = dataOfSubView.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName
            let teacherQBUserID = dataOfSubView.TeacherQBUserID
            let title = dataOfSubView.LessonTopic

            console.log('KDKD: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names, channels);

            if (Platform.OS == 'android') {
                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, false, teacherQBUserID, title, channels, (error, ID) => {
                    console.log('Class Started');
                });
            } else {
                console.log('PTPT: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, false, teacherQBUserID, true, title, channels, (id) => {
                    console.log('hi id:---------', id)
                })
            }
        } catch (e) {
            console.error(e);
        }
    };

    const startLiveClassIOS = () => {
    }

    const markAsAbsent = () => {
        let data = { "Absent": true }
        Service.post(data, `${EndPoints.LessonCheck}/${dataOfSubView._id}/${User.user.UserDetialId}`, (res) => {
            showMessage(MESSAGE.markAbsent)
        }, (err) => {
            console.log('error of absent check', err);
        })
    }

    const getHomeWork = () => {
        setHomeworkLoading(true)
        Service.get(`${EndPoints.GetPupilHomework}/${dataOfHWSubView.LessonId}/${User.user.UserDetialId}`, (res) => {
            setHomeworkLoading(false)
            if (res.code == 200) {
                console.log('response of get all homework', res)
                if (res.data._id) {
                    if (res.data.Submited) {
                        props.navigation.navigate('PupilHomeWorkSubmitted', { item: res.data })
                    } else if (res.data.Marked) {
                        props.navigation.navigate('PupilHomeWorkMarked', { item: res.data })
                    } else {
                        props.navigation.navigate('PupilHomeWorkDetail', { item: res.data, })
                    }
                } else {
                    showMessage(MESSAGE.noHomework)
                }
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setHomeworkLoading(false)
            console.log('response of get all lesson error', err)
        })
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

    const renderItemHomework = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <HomeWorkItem
                item={item}
                onPress={() => setDataHomework(index)}
                style={{ backgroundColor }}
            />
        );
    };
    const setDataHomework = (index) => {
        setSelectedId(index)
        setDataOfHomeworkSubView(HomeworkList[index])
    }
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(myClass[index])
    }
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', {
            onGoBack: () => {
                console.log('avu')
                refresh()
            }
        })
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={() => { onPress(); refRBSheet.current.open() }} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: wp(40) }]}>{item.SubjectName}</Text>
                        <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: wp(40) }]}>{item.LessonTopic ? item.LessonTopic : ""}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text numberOfLines={1} style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
            </View>
            <TouchableOpacity style={PAGESTYLE.topListingArrow}>
                <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} width={hp(0.95)} height={hp(1.51)} />
                {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            </TouchableOpacity>

        </TouchableOpacity>
    );
    const HomeWorkItem = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={() => { onPress(); refRBSheetTwo.current.open() }} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: wp(40) }]}>{item.SubjectName}</Text>
                        <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: wp(37) }]}>{item.LessonTopic}</Text>
                    </View>
                </View>
                <View style={[PAGESTYLE.timingMain, { width: wp(28) }]}>
                    <Text numberOfLines={1} style={[PAGESTYLE.groupName,]}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
            </View>
            <TouchableOpacity style={PAGESTYLE.topListingArrow}>
                <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} width={hp(0.95)} height={hp(1.51)} />
                {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            </TouchableOpacity>

        </TouchableOpacity>
    );


    return (
        <View style={PAGESTYLE.mainPage} >
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={0}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <Header isOpen={BadgeIcon.isBadge} onNotification={() => openNotification()} onAlertPress={() => { props.navigation.openDrawer() }} STYLE={STYLE.pupilHeader} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={STYLE.padLeftRight}>
                        <View style={PAGESTYLE.dashboardOrangeBox}>
                            <View style={PAGESTYLE.orangeBoxTop}>
                                <View style={PAGESTYLE.myDay}>
                                    <View>
                                        <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                                    </View>
                                    <View style={[PAGESTYLE.rightContent]}>
                                        <MyClassIllus width={hp(40)} height={hp(10)} style={PAGESTYLE.pupilGridTopBg} />
                                        {/* <Image source={Images.PupilDashTopBg} style={PAGESTYLE.pupilGridTopBg} /> */}
                                        {/* <ImageBackground source={Images.CalenderBg} style={[PAGESTYLE.datePositionBg]}></ImageBackground> */}
                                        <View style={[PAGESTYLE.datePositionBg]}>
                                            <MyDayCalendar width={hp(12.95)} height={hp(10.22)} style={[PAGESTYLE.datePositionBgIcon]} />
                                            <Text style={PAGESTYLE.date}>Today</Text>
                                            <Text style={PAGESTYLE.month}>{moment().format('D')} {moment().format('MMM')}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity>
                                                <MoreWhite width={hp(0.7)} height={hp(2.5)} style={PAGESTYLE.moreDashboard} />
                                                {/* <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.orangeBoxBottom}>
                                <View style={PAGESTYLE.whiteBoard}>
                                    {isMyDayLoading ?
                                        <ActivityIndicator
                                            style={{ margin: 20 }}
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.yellowDark} />
                                        :
                                        <View>
                                            {
                                                myClass.length > 0 ?
                                                    <>
                                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                                data={myClass}
                                                                renderItem={renderItem}
                                                                keyExtractor={(item) => item.id}
                                                                extraData={selectedId}
                                                                nestedScrollEnabled
                                                            />
                                                        </SafeAreaView>
                                                        <RBSheet
                                                            ref={refRBSheet}
                                                            closeOnDragDown={true}
                                                            height={[hp(85)]}
                                                            style={{ position: 'relative', }}
                                                            closeOnPressMask={true}
                                                            customStyles={{
                                                                wrapper: {
                                                                    backgroundColor: COLORS.bottomSlideUpBack
                                                                },
                                                                draggableIcon: {
                                                                    backgroundColor: COLORS.darkGray
                                                                }
                                                            }}
                                                        >
                                                            <ScrollView>
                                                                <TouchableOpacity activeOpacity={1}>

                                                                    <View style={PAGESTYLE.rightTabContent}>
                                                                        {/* <View style={PAGESTYLE.arrowSelectedTab}></View> */}
                                                                        <View style={PAGESTYLE.tabcontent}>
                                                                            <Text h2 style={PAGESTYLE.titleTab}>{dataOfSubView.SubjectName}</Text>
                                                                            <Text h3 style={PAGESTYLE.subTitleTab}>{dataOfSubView.LessonTopic}</Text>
                                                                            <View style={PAGESTYLE.yellowHrTag}></View>
                                                                            <View style={PAGESTYLE.timedateGrp}>
                                                                                <View style={PAGESTYLE.dateWhiteBoard}>
                                                                                    <CalenderIconSmall width={hp(1.69)} height={hp(1.69)} style={PAGESTYLE.calIcon} />
                                                                                    {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                                                                                    <Text style={PAGESTYLE.datetimeText}>{moment(dataOfSubView.Date).format('DD/MM/yyyy')}</Text>
                                                                                </View>
                                                                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                                                                    <Clock width={hp(1.6)} height={hp(1.6)} style={PAGESTYLE.timeIcon} />
                                                                                    {/* <Image style={PAGESTYLE.timeIcon} source={Images.Clock} /> */}
                                                                                    <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.StartTime} - {dataOfSubView.EndTime}</Text>
                                                                                </View>
                                                                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                                    <Group width={hp(1.79)} height={hp(1.67)} style={PAGESTYLE.calIcon} />
                                                                                    {/* <Image style={PAGESTYLE.calIcon} source={Images.Group} /> */}
                                                                                    <Text numberOfLines={1} style={[PAGESTYLE.datetimeText, PAGESTYLE.grpElipsis]}>{dataOfSubView.GroupName}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={STYLE.hrCommon}></View>
                                                                            <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                                                                                <View style={PAGESTYLE.mediaMain}>
                                                                                    <FlatList
                                                                                        data={dataOfSubView.Allpupillist}
                                                                                        style={{ width: '100%' }}
                                                                                        renderItem={({ item, index }) => (
                                                                                            <TouchableOpacity style={PAGESTYLE.mediabarTouch}>
                                                                                                <Image style={PAGESTYLE.mediabar} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                                                                                            </TouchableOpacity>
                                                                                        )}
                                                                                        horizontal
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                    />
                                                                                </View>
                                                                                <Text style={PAGESTYLE.lessondesciption}>{dataOfSubView.LessonDescription}</Text>
                                                                                <View style={PAGESTYLE.attchmentSectionwithLink}>
                                                                                    {/* <TouchableOpacity style={PAGESTYLE.attachment}>
                                                                                        <Image style={PAGESTYLE.attachmentIcon} source={Images.AttachmentIcon} />
                                                                                        <Text style={PAGESTYLE.attachmentText}>{dataOfSubView.MaterialList.length} Attachment(s)</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity>
                                                                                        <Text style={PAGESTYLE.linkText}>see more</Text>
                                                                                    </TouchableOpacity> */}
                                                                                    {dataOfSubView.MaterialList && dataOfSubView.MaterialList.length > 0 ?
                                                                                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                                                                                            <Text style={{ ...PAGESTYLE.requireText, marginBottom: 20, }}>Attachment(s)</Text>
                                                                                            <FlatList
                                                                                                data={dataOfSubView.MaterialList}
                                                                                                style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                                                                                renderItem={({ item, index }) => (
                                                                                                    <TouchableOpacity onPress={() => {
                                                                                                        setLoader(true); setMateIndex(index); Download(item, (res) => {
                                                                                                            setLoader(false)
                                                                                                            setMateIndex(-1);
                                                                                                        })
                                                                                                    }} style={PAGESTYLE.downloaBtn}>
                                                                                                        <View style={PAGESTYLE.fileGrp}>
                                                                                                            <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: wp(70) }]}>{item.originalname}</Text>
                                                                                                            {(isMatLoading && mateIndex == index) ?
                                                                                                                <ActivityIndicator
                                                                                                                    style={{ ...PAGESTYLE.downloadIcon }}
                                                                                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                                                    color={COLORS.blueBorder} />
                                                                                                                :
                                                                                                                <DownloadSVG width={hp(2.01)} height={hp(2.01)} style={PAGESTYLE.downloadIcon} />
                                                                                                                // <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
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
                                                                                    <Text style={PAGESTYLE.requireText}>What you will need</Text>
                                                                                    <FlatList
                                                                                        data={dataOfSubView.CheckList}
                                                                                        style={{ width: '100%' }}
                                                                                        renderItem={({ item, index }) => (
                                                                                            <View style={PAGESTYLE.lessonPoints}>
                                                                                                <TickmarkBlue style={PAGESTYLE.checkIcon} width={hp(1.40)} height={hp(1.24)} />
                                                                                                {/* <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} /> */}
                                                                                                <Text numberOfLines={1} style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                            </View>
                                                                                        )}
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                    />
                                                                                </View>
                                                                            </ScrollView>
                                                                            <View style={PAGESTYLE.lessonstartButton}>
                                                                                <View style={{ width: '48%', }}>
                                                                                    <TouchableOpacity onPress={() => { markAsAbsent() }} style={{ ...STYLE.commonButtonBordered, width: '100%' }}>
                                                                                        <Text style={{ textTransform: 'uppercase', fontFamily: FONTS.fontBold, color: COLORS.dashboardGreenButton }}>Mark As Absent</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <View style={{ width: '48%', }}>
                                                                                    <TouchableOpacity
                                                                                        style={{ ...STYLE.commonButtonBordered, backgroundColor: COLORS.dashboardGreenButton, width: '100%', }}
                                                                                        onPress={() => { launchLiveClass() }}>
                                                                                        {
                                                                                            isLoading ?
                                                                                                <ActivityIndicator
                                                                                                    style={{ ...PAGESTYLE.buttonGrp }}
                                                                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                                    color={COLORS.white} /> :
                                                                                                <Text style={{ textTransform: 'uppercase', fontFamily: FONTS.fontBold, color: COLORS.white, }}>Join Class</Text>
                                                                                        }

                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </ScrollView>
                                                        </RBSheet>
                                                    </>
                                                    :
                                                    // <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                                    //     <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                    // </View>
                                                    <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLesson1} title2={MESSAGE.noLesson2} />
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={PAGESTYLE.dashboardPurpleBox}>
                            <View STYLE={PAGESTYLE.pupilHomeWorkGridTopBgHold}>
                                <MyHomeworkIllus style={PAGESTYLE.pupilHomeWorkGridTopBg} width={hp(40)} height={hp(10)} />
                                {/* <Image source={Images.PupilHomeworkTableTopBg} style={PAGESTYLE.pupilHomeWorkGridTopBg} /> */}
                            </View>
                            <View style={PAGESTYLE.purpleBoxTop}>
                                <View style={PAGESTYLE.myDayPurple}>
                                    <View>
                                        <Text H3 style={PAGESTYLE.dayTitle}>My Homework</Text>
                                    </View>
                                    <View style={[PAGESTYLE.rightContent]}>
                                        <MyhomeworkBook style={[PAGESTYLE.bookPositionBg]} width={hp(13.41)} height={hp(11.84)} />
                                        {/* <Image source={Images.HomeworkBook} style={[PAGESTYLE.bookPositionBg]} /> */}
                                        <View>
                                            <TouchableOpacity>
                                                <MoreWhite width={hp(0.7)} height={hp(2.5)} style={PAGESTYLE.moreDashboard} />
                                                {/* <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.orangeBoxBottom}>
                                <View style={PAGESTYLE.whiteBoard}>
                                    {isHomeworkLoading ?
                                        <ActivityIndicator
                                            style={{ margin: 20 }}
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.yellowDark} />
                                        :
                                        <View>
                                            {
                                                HomeworkList.length > 0 ?
                                                    <>
                                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                                data={HomeworkList}
                                                                renderItem={renderItemHomework}
                                                                keyExtractor={(item) => item.id}
                                                                extraData={selectedId}
                                                                nestedScrollEnabled
                                                            />
                                                        </SafeAreaView>
                                                        <RBSheet
                                                            ref={refRBSheetTwo}
                                                            closeOnDragDown={true}
                                                            height={[hp(85)]}
                                                            style={{ position: 'relative', }}
                                                            closeOnPressMask={true}
                                                            customStyles={{
                                                                wrapper: {
                                                                    backgroundColor: COLORS.bottomSlideUpBack
                                                                },
                                                                draggableIcon: {
                                                                    backgroundColor: COLORS.darkGray
                                                                }
                                                            }}
                                                        >
                                                            <ScrollView>
                                                                <TouchableOpacity activeOpacity={1}>
                                                                    <View style={PAGESTYLE.rightTabContent}>
                                                                        <View style={PAGESTYLE.arrowSelectedTab}></View>
                                                                        <View style={PAGESTYLE.tabcontent}>
                                                                            <Text h2 style={[PAGESTYLE.titleTab, PAGESTYLE.titleTabSecond]}>{dataOfHWSubView.LessonTopic}</Text>
                                                                            <View style={PAGESTYLE.timedateGrp}>
                                                                                <View style={PAGESTYLE.dateWhiteBoard}>
                                                                                    <DueIcon width={hp(1.9)} height={hp(2)} style={PAGESTYLE.calIcon} />
                                                                                    {/* <Image style={PAGESTYLE.calIcon} source={Images.DueToday} /> */}
                                                                                    <Text style={PAGESTYLE.datetimeText}>{moment(dataOfHWSubView.HomeWorkDate).format('DD/MM/yyyy')}</Text>
                                                                                </View>
                                                                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                                    <SubjectIcon width={hp(1.59)} height={hp(1.65)} style={PAGESTYLE.calIcon} />
                                                                                    {/* <Image style={PAGESTYLE.calIcon} source={Images.SubIcon} /> */}
                                                                                    <Text style={PAGESTYLE.datetimeText}>{dataOfHWSubView.SubjectName}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={STYLE.hrCommon}></View>
                                                                            <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                                                                                <Text style={[PAGESTYLE.lessondesciption, PAGESTYLE.lessondesciptionSecond]}>{dataOfHWSubView.HomeworkDescription}</Text>
                                                                                <View style={STYLE.hrCommon}></View>
                                                                                <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.requirementofClassSecond]}>
                                                                                    <TouchableOpacity><Text style={PAGESTYLE.requireText}>Make sure you:</Text></TouchableOpacity>
                                                                                    <FlatList
                                                                                        data={dataOfHWSubView.CheckList}
                                                                                        style={{ width: '100%' }}
                                                                                        renderItem={({ item, index }) => (
                                                                                            <View style={[PAGESTYLE.lessonPoints, PAGESTYLE.lessonPointsBorder]}>
                                                                                                <CheckedBlue style={PAGESTYLE.checkIconSquare} width={hp(1.84)} height={hp(1.84)} />
                                                                                                {/* <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} /> */}
                                                                                                <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                            </View>
                                                                                        )}
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                    />
                                                                                </View>
                                                                            </ScrollView>
                                                                            <View style={PAGESTYLE.lessonstartButton}>
                                                                                {/* <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonBordered, PAGESTYLE.pupilSecondButton]}>tertiary cta</Text></TouchableOpacity> */}
                                                                                <TouchableOpacity style={PAGESTYLE.buttonGrp}
                                                                                    activeOpacity={opacity}
                                                                                    onPress={() => getHomeWork()}>
                                                                                    <Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.pupilSecondButton]}>See Homework</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </ScrollView>
                                                        </RBSheet>
                                                    </> :
                                                    // <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                                    //     <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                    // </View>
                                                    <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHWPupil1} title2={MESSAGE.noLessonHWPupil2} />
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.achivementWrap}>
                            <View style={PAGESTYLE.achivementBox}>
                                <RewardStarback width={Platform.OS == 'android' ? hp(41.13) : '100%'} height={Platform.OS == 'android' ? hp(9.35) : hp(8.9)} style={PAGESTYLE.rewardStar} />
                                {/* <Image source={Images.RewardStar} style={PAGESTYLE.rewardStar} /> */}
                                <Text style={PAGESTYLE.starCovert}>Your stars convert to</Text>
                                <Text style={PAGESTYLE.starCovertPoints}>{bronze + silver + gold}</Text>
                                <View style={PAGESTYLE.paddingDiv}>
                                    <View style={PAGESTYLE.rewardStarMark}>
                                        <View style={PAGESTYLE.centerText}>
                                            <BronzeStar width={hp(4.94)} height={hp(4.68)} style={[PAGESTYLE.starSelected]} />
                                            {/* <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                                            <Text style={PAGESTYLE.starSelectedText}>{bronze}</Text>
                                            <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerStar}>
                                            <SilverStar width={hp(4.94)} height={hp(4.68)} style={[PAGESTYLE.starSelected]} />
                                            {/* <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                                            <Text style={PAGESTYLE.starSelectedText}>{silver}</Text>
                                            <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerText}>
                                            <GoldStar width={hp(4.94)} height={hp(4.68)} style={[PAGESTYLE.starSelected]} />
                                            {/* <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}></ImageBackground> */}
                                            <Text style={PAGESTYLE.starSelectedText}>{gold}</Text>
                                            <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.lessonstartButtonBottom}>
                                    <TouchableOpacity
                                        style={PAGESTYLE.buttonGrp}
                                        onPress={() => { props.navigation.replace('Avatar'); }}>
                                        <Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.pupilSecondBottomButton]}>View avatar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={PAGESTYLE.achivementRobot}>
                                <RobotAvtar style={PAGESTYLE.cartoon} height={hp(35.71)} width={hp(41.25)} />
                                {/* <Image source={Images.Robot} style={PAGESTYLE.cartoon} /> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupuilDashboard;