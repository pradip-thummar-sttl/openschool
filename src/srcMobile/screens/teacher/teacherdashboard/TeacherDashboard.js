import React, { useState, useEffect, useRef } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import { appSettings, BadgeIcon, User } from "../../../../utils/Model";
import MESSAGE from "../../../../utils/Messages";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import QB from "quickblox-react-native-sdk";
import { Download } from "../../../../utils/Download";
// svgs
import Bronze from '../../../../svg/teacher/pupilmanagement/StarBronze';
import Silver from '../../../../svg/teacher/pupilmanagement/StartSilver';
import Gold from '../../../../svg/teacher/pupilmanagement/StarGold';
import ArrowNext from '../../../../svg/teacher/pupilmanagement/ArrowNext';
import MyPupils from '../../../../svg/teacher/dashboard/MyPupils'
import MyDay from '../../../../svg/teacher/dashboard/MyDay'
import StartNewCall from "../../../../svg/teacher/dashboard/StartNewCall";
import NewLesson from "../../../../svg/teacher/dashboard/NewLesson";
import NewCalendar from "../../../../svg/teacher/dashboard/NewCalendar";
import NewPupil from "../../../../svg/teacher/dashboard/NewPupil";
import MoreWhite from "../../../../svg/teacher/dashboard/MoreWhite";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import Participants from "../../../../svg/teacher/dashboard/Participants";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";

const { CallModule, CallModuleIos } = NativeModules;

// const Pupillist = ({ item }) => (
//     <View style={[PAGESTYLE.pupilData]}>
//         <View style={PAGESTYLE.pupilProfile}>
//             <View style={PAGESTYLE.pupilImage}></View>
//             <Text style={PAGESTYLE.pupilName}>{item.FirstName} {item.LastName}</Text>
//         </View>
//         <View style={PAGESTYLE.groupColumnmain}>
//             <View style={PAGESTYLE.groupColumn}>
//                 <Text style={PAGESTYLE.pupilgroupName}>{item.GroupName ? item.GroupName : '1A'}</Text>
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
const Pupillist = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile}>
                <View style={PAGESTYLE.rowProfile}>
                    <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                    <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(40) }]}>{item.FirstName} {item.LastName}</Text>
                </View>
                <View style={PAGESTYLE.groupPupil}>
                    <Text numberOfLines={1} style={PAGESTYLE.groupName}>{item.GroupName ? item.GroupName : '-'}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                {item.RewardsList.map((item, index) => {
                    return (
                        item._id == '3' ?
                            <View style={PAGESTYLE.rewardStar}>
                                {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                <Bronze style={PAGESTYLE.rewardStartIcon} width={hp(2.22)} height={hp(2.12)} />
                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                            </View>
                            :
                            item._id == '6' ?
                                <View style={PAGESTYLE.rewardStar}>
                                    {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                    <Silver style={PAGESTYLE.rewardStartIcon} width={hp(2.22)} height={hp(2.12)} />
                                    <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                </View>
                                :
                                item._id == '9' ?
                                    <View style={PAGESTYLE.rewardStar}>
                                        {/* <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                        <Gold style={PAGESTYLE.rewardStartIcon} width={hp(2.22)} height={hp(2.12)} />
                                        <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                    </View>
                                    :
                                    null
                    )
                })}
                {/* <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View> */}
            </View>
            {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
            <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
        </View>
    </TouchableOpacity>
);
const LessonandHomeworkPlannerDashboard = (props) => {
    const refRBSheet = useRef();
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    const [dashData, setdashData] = useState([])
    const [pupilData, setPupilData] = useState([])
    const [isDashDataLoading, setDashDataLoading] = useState(true)
    const [isPupilDataLoading, setPupilDataLoading] = useState(true)
    const [isLoading, setLoading] = useState(false);
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    let currentCount = 0

    useEffect(() => {
        refresh()

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

    const refresh = () => {
        console.log(`${EndPoints.GetMyDayByTeacherId}/${User.user._id}`);
        Service.get(`${EndPoints.GetMyDayByTeacherId}/${User.user._id}`, (res) => {
            setDashDataLoading(false)
            if (res.code == 200) {
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
                setLoading(false)
                showMessage(MESSAGE.scheduledTimeStart)
            }

            console.log('time of current', currentTime, dataOfSubView.StartTime, dataOfSubView.EndTime)
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
                channels.push(dataOfSubView.TeacherID + "_" + pupil.PupilId)    //For instant reaction
            });

            channels.push(dataOfSubView.TeacherID + "_" + dataOfSubView._id)    //For polling
            let dialogID = dataOfSubView.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName
            let title = dataOfSubView.LessonTopic

            if (Platform.OS === 'android') {
                console.log('KDKD: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names, channels);

                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, title, channels, (error, ID) => {
                    console.log('Class Started', error, ID);

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
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, true, title, channels, (id) => {
                    console.log('hi id:---------', id)
                    let data = {
                        LessonStart: false,
                        LessonEnd: true
                    }
                    Service.post(data, `${EndPoints.LessionStartEnd}/${dataOfSubView._id}`, (res) => {
                    }, (err) => {
                    })
                    if (id != "") {
                        let formData = new FormData();

                        let ext = id.split('.');
                        let names = id.split('/');
                        let name = names[names.length - 1];


                        formData.append('file', {
                            uri: id,
                            // name: element.fileName,
                            name: name,
                            type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                        });

                        Service.postFormData(formData, `${EndPoints.SaveLessionRecord}/${dataOfSubView._id}`, (res) => {
                            console.log('response of save recording', res)
                        }, (err) => {
                            console.log('error of save recording', err)
                        })

                    }
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
                onPress={() => { props.navigation.navigate('PupilProfileView', { item: item }) }}
            />
        );
    };
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(dashData[index])
        refRBSheet.current.open()
    }
    const renderItem = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <Item
                item={item}
                onPress={() => setData(index)}
            />
        );
    };
    const Item = ({ onPress, style, item }) => (
        <TouchableOpacity onPress={() => onPress()} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text numberOfLines={1} style={[PAGESTYLE.subjectName, { width: 160 }]}>{item.SubjectName}</Text>
                        <Text numberOfLines={1} style={[PAGESTYLE.subject, { width: 100 }]}>{item.LessonTopic}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text numberOfLines={1} style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
                <View style={PAGESTYLE.topListingArrow}>
                    {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
                </View>
            </View>
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

    const initOneToOneCall = (pupilData) => {
        props.navigation.navigate('Call', { userType: 'Teacher', pupilData: pupilData })
    }

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer',{ onGoBack: () => refresh() })
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                moduleIndex={0}
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? '100%' : '100%' }}>
                <Header onNotification={()=>openNotification()} onAlertPress={() => props.navigation.openDrawer()} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.padLeftRight}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={PAGESTYLE.dashBoardBoxes}>
                            <TouchableOpacity style={PAGESTYLE.boxDash}
                                onPress={() => initOneToOneCall(pupilData)}>
                                <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.greenBox]}>
                                    <Text H3 style={PAGESTYLE.titleBox}>Start a new call</Text>
                                    {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.DashboardCallIcon}></ImageBackground> */}
                                    <StartNewCall style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PAGESTYLE.boxDash}
                                activeOpacity={opacity}
                                onPress={() => props.navigation.navigate('TLDetailAdd', { onGoBack: () => null })}>
                                <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.yellowBox]}>
                                    <Text H3 style={PAGESTYLE.titleBox}>New lesson</Text>
                                    {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.LessonIcon}></ImageBackground> */}
                                    <NewLesson style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PAGESTYLE.boxDash}
                                activeOpacity={opacity}
                                onPress={() => props.navigation.navigate('CreateNewEvent', { onGoBack: () => null })}>
                                <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.purpleBox]}>
                                    <Text H3 style={PAGESTYLE.titleBox}>New calendar {"\n"}entry</Text>
                                    {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.ImageIcon}></ImageBackground> */}
                                    <NewCalendar style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('PupiloverView', { item: 1 })}
                                style={PAGESTYLE.boxDash}>
                                <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.blueBox]}>
                                    <Text H3 style={PAGESTYLE.titleBox}>Add new pupil {"\n"}group</Text>
                                    {/* <ImageBackground style={PAGESTYLE.imageIcon} source={Images.PupilGrpIcon}></ImageBackground> */}
                                    <NewPupil style={PAGESTYLE.imageIcon} height={hp(11.86)} width={hp(12.94)} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={PAGESTYLE.paddMainDash}>
                        <View style={PAGESTYLE.myDay}>
                            <View style={[STYLE.viewRow]}>
                                {/* <Image style={PAGESTYLE.dayIcon} source={Images.Myday} /> */}
                                <MyDay style={PAGESTYLE.dayIcon} height={hp(2.70)} width={hp(2.70)} />
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
                                    style={{ margin: 20 }}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.yellowDark} />
                                :
                                dashData.length > 0 ?
                                    <View>
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
                                            <RBSheet
                                                ref={refRBSheet}
                                                closeOnDragDown={true}
                                                height={hp(85)}
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
                                                        <View style={PAGESTYLE.tabcontent}>
                                                            <Text numberOfLines={1} h2 style={PAGESTYLE.titleTab}>{dataOfSubView.LessonTopic}</Text>
                                                            <Text style={PAGESTYLE.subTitleTab}>{dataOfSubView.SubjectName} </Text>
                                                            <View style={PAGESTYLE.yellowHrTag}></View>
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
                                                                    <Text numberOfLines={1} style={[PAGESTYLE.datetimeText, { width: wp(25) }]}>{dataOfSubView.GroupName}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={STYLE.hrCommon}></View>
                                                            <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
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
                                                                                        setLoader(true);setMateIndex(index); Download(item, (res) => {
                                                                                            setLoader(false)
                                                                                            setMateIndex(-1)
                                                                                        })
                                                                                    }} style={PAGESTYLE.downloaBtn}>
                                                                                        <View style={PAGESTYLE.fileGrp}>
                                                                                            <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: wp(70) }]}>{item.originalname}</Text>
                                                                                            {(isMatLoading && index==mateIndex) ?
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
                                                            </ScrollView>
                                                            <View style={PAGESTYLE.lessonstartButton}>
                                                                <View style={{ ...STYLE.commonButtonBordered, marginRight: 0 }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => { refRBSheet.current.close(); props.navigation.navigate('TeacherLessonDetail', { onGoBack: () => refresh(), 'data': dataOfSubView }) }}>
                                                                        <Text style={{ textTransform: 'uppercase', fontFamily: FONTS.fontBold, paddingVertical: 2 }}>Edit Class</Text></TouchableOpacity>
                                                                </View>
                                                                <View style={{ ...STYLE.commonButtonBordered, marginLeft: 10, backgroundColor: COLORS.dashboardGreenButton, }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => { launchLiveClass() }}>

                                                                        {
                                                                            isLoading ?
                                                                                <ActivityIndicator
                                                                                    style={{ ...PAGESTYLE.buttonGrp, paddingVertical: Platform.OS == 'ios' ? 13 : 5 }}
                                                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                    color={COLORS.white} />
                                                                                :
                                                                                <Text style={{ textTransform: 'uppercase', fontFamily: FONTS.fontBold, color: COLORS.white, paddingVertical: 2, }}>Start Class</Text>
                                                                        }

                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </ScrollView>
                                            </RBSheet>
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
                                    <EmptyStatePlaceHohder holderType={5}  title1={MESSAGE.noLesson1} title2={MESSAGE.noLesson2} />
                            }
                        </View>
                        <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                            <View style={[STYLE.viewRow]}>
                                {/* <Image style={PAGESTYLE.dayIcon} source={Images.PupilDashIcon} /> */}
                                <MyPupils style={PAGESTYLE.dayIcon} height={hp(2.70)} width={hp(2.70)} />
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
                                    style={{ margin: 20 }}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.blueButton} />
                                :
                                pupilData.length > 0 ?
                                    <View>
                                        <View style={PAGESTYLE.pupilTabledata}>
                                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                <FlatList
                                                    data={pupilData}
                                                    renderItem={pupilRender}
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
                                    <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noPupil1} title2={MESSAGE.noPupil2} />
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default LessonandHomeworkPlannerDashboard;