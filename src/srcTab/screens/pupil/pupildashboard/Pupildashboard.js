import React, { useState, useEffect } from "react";
import { NativeModules, View, Image, Text, TouchableOpacity, H3, ScrollView, ImageBackground, SafeAreaView, FlatList, ActivityIndicator, Platform, BackHandler, ToastAndroid, NativeEventEmitter } from "react-native";
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
import { baseUrl, isRunningFromVirtualDevice, opacity, showMessage, Var } from "../../../../utils/Constant";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import moment from "moment";
import PupilTimetable from "../pupiltimetable/PupilTimetable";
import PupilLessonDetail from "../pupillessondetail/PupilLessonDetail";
import ParentZoneSwitch from "../parentzone/ParentZoneSwitch";
import Setting from "../../Setting/Setting";
import Chat from "../../Chat/Chat";
import MESSAGE from "../../../../utils/Messages";
import PupilHomeWorkSubmitted from "../../pupil/pupillessondetail/homework/PupilHomeWorkSubmitted";
import PupilHomeWorkMarked from "../../pupil/pupillessondetail/homework/PupilHomeWorkMarked";
import PupilHomeWorkDetail from "../../pupil/pupillessondetail/homework/PupilHomeWorkDetail";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import QB from "quickblox-react-native-sdk";
import { initApp } from "../../../component/reusable/onetoonecall/CallConfiguration";
import { Download } from "../../../../utils/Download";
import PupilCalendar from "../../../../svg/teacher/dashboard/PupilCalendar";
import More from "../../../../svg/teacher/dashboard/MoreWhite";
import HomeworkBook from "../../../../svg/teacher/dashboard/HomeworkBook";
import HWDueOrange from "../../../../svg/pupil/dashboard/HWDue_Orange";
import Subject from "../../../../svg/pupil/dashboard/Subject";
import BronzeStar from "../../../../svg/pupil/dashboard/BronzeStar";
import SilverStar from "../../../../svg/pupil/dashboard/SilverStar";
import GoldStar from "../../../../svg/pupil/dashboard/GoldStar";
import RobotAvtar from "../../../../svg/pupil/dashboard/RobotAvtar";
import MyClassIllus from "../../../../svg/pupil/dashboard/MyClassIllus";
import MyHomeworkIllus from "../../../../svg/pupil/dashboard/MyHomeworkIllus";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import Participants from "../../../../svg/teacher/dashboard/Participants";
import CheckedBlue from "../../../../svg/pupil/dashboard/Checked_Blue";
import RewardStarback from "../../../../svg/pupil/dashboard/RewardStarback";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";
import Avatar from "../Avatar/Avatar";
import AvtarBg from "../../../../svg/pupil/dashboard/AvtarBg";
import { GetImage } from "../../../../utils/ImageUtils";

const { CallModule, CallModuleIos } = NativeModules

const PupuilDashboard = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [dataOfSubView, setDataOfSubView] = useState([])
    const [dataOfHWSubView, setDataOfHomeworkSubView] = useState([])
    const [myDay, setMyDay] = useState([])
    const [HomeworkList, setPupilHomeworkList] = useState([])
    const [isMyDayLoading, setMyDayLoading] = useState(true)
    const [isHomeworkLoading, setHomeworkLoading] = useState(true)
    const [isPupilLessonDetail, setPupilLessonDetail] = useState(false)
    const [hwData, setHWData] = useState({})

    const [isLoading, setLoading] = useState(false);
    const [isHWDetail, setHWDetail] = useState(false)
    const [isHWSubmitted, setHWSubmitted] = useState(false)
    const [isHWMarked, setHWMArked] = useState(false)
    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)


    const [pupilAvatarList, setPupilAvatarList] = useState([])
    const [avatarListIndex, setAvtarIndex] = useState([])

    let currentCount = 0
    useEffect(() => {
        getPupilAvtarList()

        if (props.route.params && props.route.params.index == 2) {
            setSelectedIndex(2)
        }
        initApp(callBack => {
            handleIncommingCall()
        });

        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    useEffect(() => {
        onRefreshData();
    }, [props])

    const onRefreshData = () => {
        setMyDayLoading(true);
        const dataOfMyday = {CurrentDate:moment(Date()).format('YYYY-MM-DD')}
        Service.post(dataOfMyday,`${EndPoints.GetListOfPupilMyDay}/${User.user.UserDetialId}`, (res) => {
            if (res.flag === true) {
                setMyDay(res.data)
                setDataOfSubView(res.data[0])
                setMyDayLoading(false)
            } else {
                showMessage(res.message)
                setMyDayLoading(false)
            }
        }, (err) => {
        })

        setHomeworkLoading(true)
        Service.get(`${EndPoints.GetHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
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

    const getPupilAvtarList = () => {

        let allAvatrData = []

        Service.get(EndPoints.GetAllAvtar, (res) => {

            if (res.flag === true) {
                res.data.map((item) => {
                    if (item.Type === "hair") {
                        allAvatrData = item.imglist
                    }
                })
            }

            Service.get(`${EndPoints.PupilGetAvatar}/${User.user.UserDetialId}`, (res) => {
                if (res.flag === true) {
                    allAvatrData.map((data, index) => {
                        if (data._id === res.data[1]._id) {
                            setAvtarIndex(index)
                        }
                    })
                    setPupilAvatarList(res.data)
                }
            }, (err) => {
                console.log('------errrrrrr---------', res)
            })
        }, (err) => {
            console.log('------errrrrrr outer ---------', res)
        })
    }

    const launchLiveClass = () => {
        if (isRunningFromVirtualDevice) {
            // Do Nothing
        } else {

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
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, false, teacherQBUserID, false, title, channels, (id) => {
                    console.log('hi id:---------', id)
                })
            }
        } catch (e) {
            console.error(e);
        }
    };

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
                    setHWData(res.data)
                    if (res.data.Submited) {
                        setHWSubmitted(true)
                    } else if (res.data.Marked) {
                        setHWMArked(true)
                    } else {
                        setHWDetail(true)
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
            <Item
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
        setDataOfSubView(myDay[index])
    }
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View>
                        <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: hp(20) }]}>{item.SubjectName}</Text>
                        <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: hp(20) }]}>{item.LessonTopic ? item.LessonTopic : ""}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
            </View>
            {/* <View style={PAGESTYLE.arrowSelectedTab}></View> */}

        </TouchableOpacity>
    );

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }

    return (
        <View style={PAGESTYLE.mainPage} >

            {selectedIndex != 5 &&
                <Sidebarpupil hide={() => action(!isHide)}
                    moduleIndex={selectedIndex}
                    navigateToDashboard={() => { setPupilLessonDetail(false); setSelectedIndex(0); getPupilAvtarList(); onRefreshData(); }}
                    navigateToTimetable={() => { setPupilLessonDetail(false); setSelectedIndex(1) }}
                    onLessonAndHomework={() => { setPupilLessonDetail(false); setSelectedIndex(2); }}
                    onSetting={() => { setPupilLessonDetail(false); setSelectedIndex(3) }}
                    onAvatar={() => { setPupilLessonDetail(false); setSelectedIndex(4) }}
                    onParentZone={() => { setPupilLessonDetail(false); setSelectedIndex(5) }}
                    navigateUser={() => { setPupilLessonDetail(false); props.navigation.replace('Users'); setSelectedIndex(5) }}
                />
            }
            {
                isPupilLessonDetail ?
                    <PupilLessonDetail goBack={() => setPupilLessonDetail(false)} onRefresh={() => null} data={dataOfHWSubView} />
                    :
                    isHWSubmitted ?
                        <PupilHomeWorkSubmitted goBack={() => setHWSubmitted(false)} item={hwData} onAlertPress={openNotification} />
                        :
                        isHWMarked ?
                            <PupilHomeWorkMarked goBack={() => setHWMArked(false)} item={hwData} onAlertPress={() => props.onAlertPress()} />
                            :
                            isHWDetail ?
                                <PupilHomeWorkDetail goBack={() => setHWDetail(false)} item={hwData} onAlertPress={() => props.onAlertPress()} />
                                :
                                selectedIndex == 0 ?
                                    <View style={{ width: isHide ? '94%' : '78%' }}>
                                        <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
                                            <Header onAlertPress={() => { openNotification() }} onNotification={() => openNotification()} />
                                            <View style={STYLE.padLeftRight}>
                                                <MyClassIllus style={PAGESTYLE.pupilGridTopBg} width={hp(40.49)} height={hp(10.67)} />
                                                <View style={PAGESTYLE.dashboardOrangeBox}>
                                                    <View style={PAGESTYLE.orangeBoxTop}>
                                                        <View style={PAGESTYLE.myDay}>
                                                            <View>
                                                                <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.rightContent]}>
                                                                <PupilCalendar style={[PAGESTYLE.datePositionBg]} height={81} width={102} />
                                                                <View style={[PAGESTYLE.datePositionBg]}>
                                                                    <Text style={PAGESTYLE.today}>Today</Text>
                                                                    <Text style={PAGESTYLE.datemonth}>{moment().format('D')} {moment().format('MMM')}</Text>
                                                                </View>

                                                                <View>
                                                                    <TouchableOpacity>
                                                                        <More style={PAGESTYLE.moreDashboard} height={28} width={5} />
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
                                                                <View style={STYLE.viewRow}>
                                                                    {
                                                                        myDay.length > 0 ?
                                                                            <>
                                                                                <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                                                    <FlatList
                                                                                        showsVerticalScrollIndicator={false}
                                                                                        style={PAGESTYLE.ScrollViewFlatlist}
                                                                                        data={myDay}
                                                                                        renderItem={renderItem}
                                                                                        keyExtractor={(item) => item.id}
                                                                                        extraData={selectedId}
                                                                                    />
                                                                                </SafeAreaView>
                                                                                <View style={PAGESTYLE.rightTabContent}>
                                                                                    <View style={PAGESTYLE.tabcontent}>
                                                                                        <Text numberOfLines={1} h2 style={PAGESTYLE.titleTab}>{dataOfSubView.LessonTopic}</Text>
                                                                                        <View style={PAGESTYLE.timedateGrp}>
                                                                                            <View style={PAGESTYLE.dateWhiteBoard}>
                                                                                                <Calender style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                                <Text style={PAGESTYLE.datetimeText}>{moment(dataOfSubView.Date).format('DD/MM/yyyy')}</Text>
                                                                                            </View>
                                                                                            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                                                                                <Clock style={PAGESTYLE.timeIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                                <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.StartTime} - {dataOfSubView.EndTime}</Text>
                                                                                            </View>
                                                                                            <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                                                <Participants style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                                <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.GroupName}</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                        <View style={STYLE.hrCommon}></View>
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
                                                                                                                        <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                                                                                                                    }
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
                                                                                            {dataOfSubView.CheckList && dataOfSubView.CheckList.length ?
                                                                                                <Text style={PAGESTYLE.requireText}>What you will need</Text> : null}
                                                                                            <FlatList
                                                                                                data={dataOfSubView.CheckList}
                                                                                                style={{ width: '100%' }}
                                                                                                renderItem={({ item, index }) => (
                                                                                                    <View style={PAGESTYLE.lessonPoints}>
                                                                                                        <CheckedBlue style={PAGESTYLE.checkIcon} width={hp(1.7)} height={hp(1.7)} />
                                                                                                        <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                                    </View>
                                                                                                )}
                                                                                                numColumns={1}
                                                                                                keyExtractor={(item, index) => index.toString()}
                                                                                            />
                                                                                        </View>
                                                                                        <View style={PAGESTYLE.btnModifiesPupil}>
                                                                                            <TouchableOpacity onPress={() => markAsAbsent()} style={PAGESTYLE.markAbsentBtn}>
                                                                                                <Text style={STYLE.markAbsentText}>Mark As Absent</Text>
                                                                                            </TouchableOpacity>

                                                                                            <TouchableOpacity style={PAGESTYLE.joinPupil} onPress={() => { launchLiveClass() }}>
                                                                                                {
                                                                                                    isLoading ?
                                                                                                        <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.white} />
                                                                                                        :
                                                                                                        <Text style={PAGESTYLE.txtJointClass}>Join Class</Text>
                                                                                                }

                                                                                            </TouchableOpacity>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </>
                                                                            :
                                                                            <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLesson1} title2={MESSAGE.noLesson2} />
                                                                    }
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={PAGESTYLE.dashboardPurpleBox}>
                                                    <MyHomeworkIllus style={PAGESTYLE.pupilHomeWorkGridTopBg} width={hp(46.87)} height={hp(14.41)} />
                                                    <View style={PAGESTYLE.purpleBoxTop}>
                                                        <View style={PAGESTYLE.myDayPurple}>
                                                            <View>
                                                                <Text H3 style={PAGESTYLE.dayTitle}>My Homework</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.rightContent]}>
                                                                <HomeworkBook style={[PAGESTYLE.bookPositionBg]} height={hp(14.84)} width={hp(17.123)} />
                                                                <View>
                                                                    <TouchableOpacity>
                                                                        <More style={PAGESTYLE.moreDashboard} height={28} width={5} />
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
                                                                <View style={STYLE.viewRow}>
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
                                                                                    />
                                                                                </SafeAreaView>
                                                                                <View style={PAGESTYLE.rightTabContent}>
                                                                                    <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.tabcontent}>
                                                                                        <View>
                                                                                            <Text numberOfLines={1} h2 style={[PAGESTYLE.titleTab]}>{dataOfHWSubView.LessonTopic}</Text>
                                                                                            <View style={PAGESTYLE.timedateGrp}>
                                                                                                <View style={PAGESTYLE.dateWhiteBoard}>
                                                                                                    <HWDueOrange style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                                    <Text style={PAGESTYLE.datetimeText}>{moment(dataOfHWSubView.HomeWorkDate).format('DD/MM/yyyy')}</Text>
                                                                                                </View>
                                                                                                <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                                                    <Subject style={PAGESTYLE.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                                                                    <Text style={PAGESTYLE.datetimeText}>{dataOfHWSubView.SubjectName}</Text>
                                                                                                </View>
                                                                                            </View>
                                                                                            <View style={STYLE.hrCommon}></View>
                                                                                            <Text style={PAGESTYLE.lessondesciption}>{dataOfHWSubView.HomeworkDescription}</Text>
                                                                                            <View style={PAGESTYLE.requirementofClass}>
                                                                                                <Text style={PAGESTYLE.requireText}>Make sure you:</Text>
                                                                                                <FlatList
                                                                                                    data={dataOfHWSubView.CheckList}
                                                                                                    style={{ width: '100%' }}
                                                                                                    renderItem={({ item, index }) => (
                                                                                                        <View style={[PAGESTYLE.lessonPoints, PAGESTYLE.lessonPointsBorder]}>
                                                                                                            <CheckedBlue style={PAGESTYLE.checkIconSquare} width={15} height={15} />

                                                                                                            <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                                        </View>
                                                                                                    )}
                                                                                                    keyExtractor={(item, index) => index.toString()}
                                                                                                />
                                                                                            </View>
                                                                                            <View style={PAGESTYLE.lessonstartButton}>
                                                                                                <TouchableOpacity style={PAGESTYLE.buttonGrp}
                                                                                                    activeOpacity={opacity}
                                                                                                    onPress={() => { setSelectedIndex(2); getHomeWork() }}>
                                                                                                    <Text style={STYLE.commonButtonGreenDashboardSide}>See Homework</Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                        </View>
                                                                                    </ScrollView>
                                                                                </View>
                                                                            </> :
                                                                            <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHWPupil1} title2={MESSAGE.noLessonHWPupil2} />
                                                                    }

                                                                </View>
                                                            }
                                                        </View>

                                                    </View>
                                                </View>

                                                <View style={PAGESTYLE.achivementWrap}>
                                                    <View style={[PAGESTYLE.achivementBox, { height: '100%', overflow: 'hidden' }]}>
                                                        <Image style={{ width: '100%', height: hp(13), top: '-9%' }} source={GetImage.ImageReward} />

                                                        <Text style={PAGESTYLE.starCovert}>Your stars convert to</Text>
                                                        <Text style={PAGESTYLE.starCovertPoints}>{bronze + silver + gold}</Text>
                                                        <View style={[PAGESTYLE.rewardStarMark,{ paddingLeft: hp(1.95),paddingRight: hp(1.95),}]}>
                                                            <View style={PAGESTYLE.centerText}>
                                                                <BronzeStar style={[PAGESTYLE.starSelected]} height={hp(4.94)} width={hp(4.94)} />
                                                                <View style={[PAGESTYLE.starSelected, { position: 'absolute' }]}>
                                                                    <Text style={PAGESTYLE.starSelectedText}>{bronze}</Text>
                                                                </View>
                                                                <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                                            </View>
                                                            <View style={PAGESTYLE.centerStar}>
                                                                <SilverStar style={[PAGESTYLE.starSelected]} height={hp(4.94)} width={hp(4.94)} />

                                                                <View style={[PAGESTYLE.starSelected, { position: 'absolute' }]}>
                                                                    <Text style={PAGESTYLE.starSelectedText}>{silver}</Text>
                                                                </View>
                                                                <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                                            </View>
                                                            <View style={PAGESTYLE.centerText}>
                                                                <GoldStar style={[PAGESTYLE.starSelected]} height={hp(4.94)} width={hp(4.94)} />

                                                                <View style={[PAGESTYLE.starSelected, { position: 'absolute' }]}>
                                                                    <Text style={PAGESTYLE.starSelectedText}>{gold}</Text>
                                                                </View>
                                                                <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                                            </View>
                                                        </View>
                                                        <View style={PAGESTYLE.lessonstartButtonTroffy}>
                                                            <TouchableOpacity style={PAGESTYLE.buttonGrp}>
                                                                <Text style={STYLE.commonButtonGreenDashboardSide}>edit avatar</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    {pupilAvatarList.length ?
                                                        <View style={[PAGESTYLE.achivementRobot, { height: Platform.OS == "ios" ? hp(52) : hp(55), overflow: 'hidden' }]}>

                                                            <AvtarBg width={"100%"} height={hp(55)} position={"absolute"} style={{ bottom: 0 }} />

                                                            <View style={{ width: "100%", height: '100%', alignItems: 'center', bottom: Platform.OS == "ios" ? '-15%' : '-18%' }}>
                                                                {avatarListIndex == 0 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(15), height: Platform.OS === 'android' ? hp(21) : hp(15), resizeMode: 'contain', position: 'absolute', top: Platform.OS === 'android' ? hp(-2.9) : 0, zIndex: 10, alignSelf: 'center', left: Platform.OS === 'android' ? wp(22.5) : "35.5%" }} ></Image>}
                                                                {avatarListIndex == 1 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(20), height: hp(20), resizeMode: 'contain', position: 'absolute', top: "-9%", zIndex: 10 }} />}
                                                                {avatarListIndex == 2 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(18), height: hp(18), resizeMode: 'contain', position: 'absolute', top: '-2.4%', zIndex: 10, right: Platform.OS === 'android' ?  wp(22.2) : "38%" }} />}
                                                                {avatarListIndex == 3 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(-3), zIndex: 10, }} />}
                                                                {avatarListIndex == 4 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(-3), zIndex: 10, }} />}
                                                                {avatarListIndex == 5 && <Image source={{ uri: baseUrl + pupilAvatarList[1].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(-10), zIndex: 10, }} />}

                                                                <Image source={{ uri: baseUrl + pupilAvatarList[0].Images }} style={{ width: hp(25), height: hp(50), resizeMode: 'contain' }} />
                                                                <Image source={{ uri: baseUrl + pupilAvatarList[2].Images }} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(9), zIndex: 20 }} />
                                                                <Image source={{ uri: baseUrl + pupilAvatarList[3].Images }} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(16), zIndex: 20 }} />
                                                           
                                                            </View>
                                                        </View> : null
                                                    }
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>

                                    : selectedIndex == 1 ?
                                        <PupilTimetable navigation={props.navigation} />
                                        : selectedIndex == 2 ?
                                            <PupilLessonDetail navigation={props.navigation} tabIndex={props?.route?.params?.tabIndex}/>
                                            : selectedIndex == 3 ?
                                                <Setting navigation={props.navigation} />
                                                : selectedIndex == 4 ?
                                                    <Avatar navigation={props.navigation} />
                                                    :
                                                    <ParentZoneSwitch navigation={props.navigation} />

                // <Setting navigation={props.navigation} />
            }

        </View>
    );
}
export default PupuilDashboard;