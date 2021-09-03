import React, { useState, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Image, ImageBackground, Platform, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
import { baseUrl, cellWidth, isRunningFromVirtualDevice, Lesson, opacity, showMessage } from "../../../../utils/Constant";
import PAGESTYLE from '../../../screens/teacher/teachertimetable/Style';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment';
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import MESSAGE from "../../../../utils/Messages";
import { Download } from "../../../../utils/Download";
import { User } from "../../../../utils/Model";
import Attachment from "../../../../svg/teacher/timetable/Attachment";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import Participants from "../../../../svg/teacher/dashboard/Participants";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import CalendarUpload from "../../../../svg/teacher/timetable/CalendarUpload";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";

const { CallModule, CallModuleIos } = NativeModules;

const Popupdata = (props) => {
    const refRBSheet = useRef();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const launchLiveClassForPupil = () => {
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
            if (currentTime >= props.data.StartTime && currentTime <= props.data.EndTime) {
                // showMessage('time to start')
                let data = { "Absent": false }
                Service.post(data, `${EndPoints.LessonCheck}/${props.data._id}/${User.user.UserDetialId}`, (res) => {
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

    const launchLiveClassForTeacher = () => {
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
            if (currentTime >= props.data.StartTime && currentTime <= props.data.EndTime) {
                // showMessage('time to start')
                let data = {
                    LessonStart: true,
                    LessonEnd: false
                }
                Service.post(data, `${EndPoints.LessionStartEnd}/${props.data._id}`, (res) => {
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
            props.data.Allpupillist.forEach(pupil => {
                qBUserIDs.push(pupil.QBUserID)
                userNames.push(pupil.PupilEmail)
                names.push(pupil.PupilName)
                if (!props.isPupil) {
                    channels.push(props.data.TeacherID + "_" + pupil.PupilId)
                }
            });

            if (props.isPupil) {
                channels.push(props.data.TeacherID + "_" + User.user.UserDetialId)
            }
            let dialogID = props.data.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName
            let teacherQBUserID = props.data.TeacherQBUserID
            let title = props.data.LessonTopic

            console.log('KDKD: ', dialogID, User.user.QBUserId, currentName, qBUserIDs, userNames, names, channels);

            if (Platform.OS == 'android') {
                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, props.isPupil ? false : true, props.isPupil ? teacherQBUserID : QBUserId, title, channels, (error, ID) => {
                    console.log('Class Started');

                    if (!props.isPupil) {
                        let data = {
                            LessonStart: false,
                            LessonEnd: true
                        }
                        Service.post(data, `${EndPoints.LessionStartEnd}/${props.data._id}`, (res) => {
                        }, (err) => {
                        })
                    }
                });
            } else {
                console.log('PTPT: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, props.isPupil ? false : true, props.isPupil ? teacherQBUserID : QBUserId, true, title, channels, (id) => {
                    console.log('hi id:---------', id)

                    if (!props.isPupil) {
                        let data = {
                            LessonStart: false,
                            LessonEnd: true
                        }
                        Service.post(data, `${EndPoints.LessionStartEnd}/${props.data._id}`, (res) => {
                        }, (err) => {
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

    return (
        <View>
            {/* <TouchableOpacity><Text style={STYLE.openClassLink} onPress={toggleModal}>Event Calendar Details</Text></TouchableOpacity> */}
            <TouchableOpacity
                style={STYLE.openClassLink}
                activeOpacity={opacity}
                onPress={() => refRBSheet.current.open()}>
                <View style={{ ...PAGESTYLE.dayRightmain, width: cellWidth * props.span, borderStartColor: props.data.Type == Lesson ? props.data.Color : props.data.EventColor, borderStartWidth: 3, }}>
                    <View style={{ ...PAGESTYLE.backOpacity, width: cellWidth * props.span,borderTopColor: COLORS.videoLinkBorder, borderBottomColor: COLORS.videoLinkBorder, borderTopWidth: 1, borderBottomWidth: 1, borderRightColor: COLORS.videoLinkBorder, borderRightWidth: 1, }}></View>
                    <View style={PAGESTYLE.attachmentTitle}>
                    <Text numberOfLines={1} style={{ ...PAGESTYLE.labledataTitle, width: cellWidth * props.span - 75 }}>{props.title}</Text>
                    {props.data.MaterialList && props.data.MaterialList.length > 0 ?
                        // <Image source={Images.attachmentTimeTable} style={PAGESTYLE.attachmentIcon} />
                        <Attachment style={PAGESTYLE.attachmentIcon} height={hp(1.95)} width={hp(1.03)} />
                        :
                        null
                    }
                    </View>
                    <View style={PAGESTYLE.row}>
                        {/* <Image source={Images.timeTableClock} style={PAGESTYLE.timeIcon} /> */}
                        <Clock style={PAGESTYLE.timeIcon} height={hp(1.8)} width={hp(1.8)} />
                        <Text style={{ ...PAGESTYLE.labelTime, width: cellWidth * props.span }}>{props.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={[hp(87)]}
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
                {props.isLesson ?
                    <ScrollView>
                        <TouchableOpacity activeOpacity={1} style={{ paddingBottom: 80, }}>
                            <View style={styles.tabcontent}>
                                <View style={styles.beforeBorder}>
                                    <Text h2 style={styles.titleTab}>{props.data.SubjectName}</Text>
                                    <Text h3 style={styles.subTitleTab}>{props.data.LessonTopic}</Text>
                                    <View style={styles.yellowHrTag}></View>
                                    <View style={styles.timedateGrp}>
                                        <View style={styles.dateWhiteBoard}>
                                            {/* <Image style={styles.calIcon} source={Images.CalenderIconSmall} /> */}
                                            <Calender style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                            <Text style={styles.datetimeText}>{moment(props.data.Date).format('DD/MM/yyyy')}</Text>
                                        </View>
                                        <View style={[styles.dateWhiteBoard, styles.time]}>
                                            {/* <Image style={styles.timeIcon} source={Images.Clock} /> */}
                                            <Clock style={styles.timeIcon} height={hp(1.8)} width={hp(1.8)} />
                                            <Text style={styles.datetimeText}>{props.data.StartTime} - {props.data.EndTime}</Text>
                                        </View>
                                        <View style={[styles.dateWhiteBoard, styles.grp]}>
                                            {/* <Image style={styles.calIcon} source={Images.Group} /> */}
                                            <Participants style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                            <Text numberOfLines={1} style={[styles.datetimeText, { width: wp(18) }]}>{props.data.GroupName}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={STYLE.hrCommon}></View>
                                <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                                    <View style={styles.afterBorder}>
                                        <View style={styles.mediaMain}>
                                            {props.data.Allpupillist ?
                                                props.data.Allpupillist.map((data, index) => (
                                                    <TouchableOpacity
                                                        style={styles.mediabarTouch}
                                                        activeOpacity={opacity}>
                                                        <Image style={styles.mediabar} source={{ uri: baseUrl + data.ProfilePicture }}></Image>
                                                    </TouchableOpacity>
                                                ))
                                                :
                                                null
                                            }
                                        </View>
                                        <Text style={styles.lessondesciption}>{props.data.LessonDescription}</Text>
                                        <View style={styles.attchmentSectionwithLink}>
                                            {/* <TouchableOpacity style={styles.attachment}>
                                        <Image style={styles.attachmentIcon} source={Images.AttachmentIcon} />
                                        <Text style={styles.attachmentText}>{props.data.MaterialList ? props.data.MaterialList.length : 0} Attachment(s)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.linkText}>see more</Text>
                                    </TouchableOpacity> */}
                                            {props.data.MaterialList && props.data.MaterialList.length > 0 ?
                                                <View style={styles.fileBoxGrpWrap}>
                                                    <Text style={styles.requireText}>Attachment(s)</Text>
                                                    <FlatList
                                                        data={props.data.MaterialList}
                                                        style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                                        renderItem={({ item, index }) => (
                                                            <TouchableOpacity onPress={() =>{setLoader(true); setMateIndex(index); Download(item, (res) => {
                                                                setLoader(false)
                                                                setMateIndex(-1)
                                                            })}} style={styles.downloaBtn}>
                                                                <View style={styles.fileGrp}>
                                                                    <Text numberOfLines={1} style={[styles.fileName, { width: wp(70) }]}>{item.originalname}</Text>

                                                                    {(isMatLoading && index==mateIndex) ?
                                                                        <ActivityIndicator
                                                                            style={{ ...styles.downloadIcon }}
                                                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                            color={COLORS.blueBorder} />
                                                                        :
                                                                        // <Image source={Images.Download} style={styles.downloadIcon} />
                                                                        <DownloadSVG style={styles.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                                                                    }
                                                                    {/* <Image source={Images.Download} style={styles.downloadIcon} /> */}
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
                                        <View style={styles.requirementofClass}>
                                            <Text style={styles.requireText}>Items that your class will need</Text>
                                            {props.data.CheckList ?
                                                props.data.CheckList.map((data, index) => (
                                                    <View style={styles.lessonPoints}>
                                                        {/* <Image source={Images.CheckIcon} style={styles.checkIcon} /> */}
                                                        <TickMarkBlue style={styles.checkIcon} height={hp(1.7)} width={hp(1.7)} />
                                                        <Text style={styles.lessonPointText}>{data.ItemName}</Text>
                                                    </View>
                                                ))
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.uploadCalendar}>
                                        <TouchableOpacity>
                                            {/* <Image style={styles.uploadCalIcon} source={Images.UploadCalender} /> */}
                                            <CalendarUpload style={styles.uploadCalIcon} height={hp(5.20)} width={hp(5.20)} />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <View style={styles.lessonstartButton}>
                                    {/* {!props.isPupil && props.data.Type == Lesson?
                            <TouchableOpacity
                                style={styles.buttonGrp}
                                activeOpacity={opacity}
                                onPress={() => { refRBSheet.current.close(); props.navigateToDetail() }}>
                                <Text style={[STYLE.commonButtonBordered]}>Edit Lesson</Text>
                            </TouchableOpacity>
                            :
                            <View style={{ width: hp(20) }}></View>
                        } */}
                                    {!props.isPupil && props.data.Type == Lesson ?
                                        <View style={{ ...STYLE.commonButtonBordered, marginRight: 10 }}>
                                            <TouchableOpacity
                                                style={styles.buttonGrp}
                                                activeOpacity={opacity}
                                                onPress={() => { refRBSheet.current.close(); props.navigateToDetail() }}>
                                                <Text style={{ textTransform: 'uppercase', fontFamily: FONTS.fontBold, }}>Edit Lesson</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={STYLE.commonButtonBordered1}></View>
                                    }
                                    <View style={{ ...STYLE.commonButtonBordered, marginLeft: 10, backgroundColor: COLORS.dashboardGreenButton, }}>
                                        <TouchableOpacity
                                            style={styles.buttonGrp}
                                            activeOpacity={opacity}
                                            onPress={() => { props.isPupil ? launchLiveClassForPupil() : launchLiveClassForTeacher() }}>
                                            {
                                                isLoading ?
                                                    <ActivityIndicator
                                                        style={{ ...styles.buttonGrp, }}
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.white} /> :
                                                    <Text style={[styles.bottomDrwerButtonGreen]}>{props.isPupil ? 'Join Class' : 'Start Class'}</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                    :
                    <View style={styles.tabcontent}>
                        <View style={styles.beforeBorder}>
                            <Text h2 style={styles.titleTab}>{props.data.EventName}</Text>
                            <Text h3 style={styles.subTitleTab}>{props.data.EventType}</Text>
                            <View style={styles.yellowHrTag}></View>
                            <View style={styles.timedateGrp}>
                                <View style={styles.dateWhiteBoard}>
                                    {/* <Image style={styles.calIcon} source={Images.CalenderIconSmall} /> */}
                                    <Calender style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={styles.datetimeText}>{moment(props.data.EventDate).format('DD/MM/yyyy')}</Text>
                                </View>
                                <View style={[styles.dateWhiteBoard, styles.time]}>
                                    {/* <Image style={styles.timeIcon} source={Images.Clock} /> */}
                                    <Clock style={styles.timeIcon} height={hp(1.8)} width={hp(1.8)} />
                                    <Text style={styles.datetimeText}>{props.data.EventStartTime} - {props.data.EventEndTime}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={STYLE.hrCommon}></View>
                        <View style={styles.afterBorder}>
                            <Text style={styles.lessondesciption}>Location: {props.data.EventLocation}</Text>
                            <View style={styles.requirementofClass}>
                                <Text style={styles.requireText1}>Notes: {props.data.EventDescription}</Text>
                            </View>
                        </View>
                    </View>

                }
            </RBSheet>
        </View>
    );
}
export default Popupdata;

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(1),
    },
    popupCard: {
        backgroundColor: COLORS.white,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
    popupContent: {
        width: '100%',
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(4.55),
        color: COLORS.darkGray,
        marginBottom: hp(0.2),
    },
    subTitleTab: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        marginBottom: hp(2.34),
    },
    yellowHrTag: {
        width: '100%',
        height: hp(0.61),
        backgroundColor: COLORS.yellowBorder,
        marginBottom: hp(2.34),
    },
    timedateGrp: {
        flexDirection: 'row',
    },
    dateWhiteBoard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(2.8),
    },
    datetimeText: {
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.72),
        lineHeight: hp(2.46),
        marginLeft: hp(0.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    mediaMain: {
        flexDirection: 'row',
        marginLeft: hp(-0.39),
        marginRight: hp(-0.39),
        marginBottom: hp(4),
    },
    mediabarTouch: {
        paddingLeft: hp(0.39),
        paddingRight: hp(0.39),
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(200),
        backgroundColor: COLORS.lightGrayPupil,
    },
    moreMedia: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(200),
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGrayPupil,
        borderWidth: 1,
        justifyContent: 'center',
    },
    moreMediaText: {
        fontSize: hp(1.6),
        fontFamily: FONTS.fontRegular,
        textAlign: 'center',
    },
    lessondesciption: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    attchmentSectionwithLink: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    attachment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachmentText: {
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        marginLeft: hp(0.9),
    },
    attachmentIcon: {
        width: hp(1.5),
        resizeMode: 'contain',
    },
    linkText: {
        color: COLORS.buttonGreen,
        textTransform: 'uppercase',
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
    },
    requirementofClass: {
        marginTop: hp(4.81),
        marginBottom: hp(1),
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    requireText1: {
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    lessonPoints: {
        flexDirection: 'row',
        marginBottom: hp(1.95),
    },
    checkIcon: {
        width: hp(1.7),
        resizeMode: 'contain',
        top: hp(0.2),
    },
    lessonPointText: {
        fontSize: hp(1.85),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        marginLeft: hp(1),
    },
    lessonstartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderColor: COLORS.borderGrp,
        paddingTop: hp(2),
        paddingBottom: hp(2),
        position: 'absolute',
        bottom: hp(-8),
        width: '100%',
        left: hp(1.95),
    },
    bottomDrwerButtonGreenbordered: {
        backgroundColor: COLORS.transparent,
        borderColor: COLORS.dashboardGreenButton,
        borderWidth: 1,
        color: COLORS.dashboardGreenButton,
        fontSize: hp(1.56),
        fontWeight: '800',
        borderRadius: hp(0.9),
        overflow: 'hidden',
        textAlign: 'center',
        paddingTop: Platform.OS == 'android' ? hp(1.3) : hp(1.21),
        paddingLeft: Platform.OS == 'android' ? hp(2.5) : hp(3),
        paddingRight: Platform.OS == 'android' ? hp(2.5) : hp(3),
        paddingBottom: Platform.OS == 'android' ? hp(0.7) : hp(1.21),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    bottomDrwerButtonGreen: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        fontWeight: '800',
        borderRadius: hp(0.9),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: Platform.OS == 'android' ? hp(4.5) : hp(3.94),
        paddingRight: Platform.OS == 'android' ? hp(4.5) : hp(3.94),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    rightTabContent: {
        width: '100%',
    },
    tabcontent: {
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        paddingBottom: hp(2.60),
        paddingTop: hp(3),
        position: 'relative',
        height: '100%',
    },
    calIcon: {
        width: hp(1.8),
        resizeMode: 'contain',
    },
    timeIcon: {
        width: hp(1.8),
        resizeMode: 'contain',
    },
    greenBordered: {
        borderColor: COLORS.dashboardGreenButton,
        color: COLORS.dashboardGreenButton,
    },
    uploadCalIcon: {
        width: hp(5.20),
        resizeMode: 'contain',
    },
    downloadIcon: {
        width: hp(2.01),
        resizeMode: 'contain',
        top: hp(0.2),
        right: hp(1),
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(1.6),
        paddingRight: hp(1.6),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        borderRadius: hp(0.8),
        marginBottom: hp(1.04),
    },
    fileBoxGrpWrap: {
        // marginRight: hp(-1.5)
    },
});