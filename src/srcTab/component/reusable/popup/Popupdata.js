import React, { useState } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, Platform, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
import { baseUrl, cellWidth, isRunningFromVirtualDevice, Lesson, opacity, showMessage } from "../../../../utils/Constant";
import PAGESTYLE from '../../../screens/teacher/teachertimetable/Style';
import moment from 'moment';
import { User } from "../../../../utils/Model";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import MESSAGE from "../../../../utils/Messages";
import { Download } from "../../../../utils/Download";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import Attachment from "../../../../svg/teacher/timetable/Attachment";
import Participants from "../../../../svg/teacher/dashboard/Participants";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import DownloadSVG from "../../../../svg/teacher/lessonhwplanner/Download";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import CalendarUpload from "../../../../svg/teacher/timetable/CalendarUpload";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";

const { CallModule, CallModuleIos } = NativeModules;

const Popupdata = (props) => {
    const [isUploading, setUploading] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const launchLiveClassForPupil = () => {
        if (isRunningFromVirtualDevice) {

        } else {
            setLoading(true)
            let currentTime = moment(Date()).format('HH:mm')
            if (currentTime >= props.data.StartTime && currentTime <= props.data.EndTime) {
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
        } else {
            setLoading(true)
            let currentTime = moment(Date()).format('HH:mm')
            if (currentTime >= props.data.StartTime && currentTime <= props.data.EndTime) {
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
            props.data.Allpupillist.forEach(pupil => {
                qBUserIDs.push(pupil.QBUserID)
                userNames.push(pupil.PupilEmail)
                names.push(pupil.PupilName)
                if (!props.isPupil) {
                    channels.push(props.data.TeacherID + "_" + pupil.PupilId)       //For instant reaction
                }
            });

            if (props.isPupil) {
                channels.push(props.data.TeacherID + "_" + User.user.UserDetialId) //For instant reaction
                channels.push(props.data.TeacherID + "_" + props.data._id)        //For polling
            } else {
                channels.push(props.data.TeacherID + "_" + props.data._id)        //For polling
            }
            let dialogID = props.data.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName
            let teacherQBUserID = props.data.TeacherQBUserID
            let title = props.data.LessonTopic


            if (Platform.OS === 'android') {
                console.log('KDKD: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, props.isPupil ? false : true, props.isPupil ? teacherQBUserID : QBUserId, title, channels, (error, id) => {

                    if (!props.isPupil) {
                        let data = {
                            LessonStart: false,
                            LessonEnd: true
                        }
                        Service.post(data, `${EndPoints.LessionStartEnd}/${props.data._id}`, (res) => {
                        }, (err) => {
                        })

                        if (id && id != null && id != "") {
                            let formData = new FormData();
                            let ext = id.split('.');
                            let names = id.split('/');
                            let name = names[names.length - 1];
                            formData.append('file', {
                                uri: id,
                                name: name,
                                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                            });
                            setUploading(true);
                            Service.postFormData(formData, `${EndPoints.SaveLessionRecord}/${props.data._id}`, (res) => {
                                setUploading(false);
                                console.log('response of save recording', res)
                            }, (err) => {
                                setUploading(false);
                                console.log('error of save recording', err)
                            })

                        }
                    }
                });
            } else {
                console.log('PTPT: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, props.isPupil ? false : true, props.isPupil ? teacherQBUserID : QBUserId, true, title, channels, (id) => {

                    if (!props.isPupil) {
                        let data = {
                            LessonStart: false,
                            LessonEnd: true
                        }
                        Service.post(data, `${EndPoints.LessionStartEnd}/${props.data._id}`, (res) => {
                        }, (err) => {
                        })
                        if (id != "") {
                            let formData = new FormData();

                            let ext = id.split('.');
                            let names = id.split('/');
                            let name = names[names.length - 1];


                            formData.append('file', {
                                uri: id,
                                name: name,
                                type: 'video/' + (ext.length > 0 ? ext[1] : 'mp4')
                            });

                            setUploading(true);
                            Service.postFormData(formData, `${EndPoints.SaveLessionRecord}/${props.data._id}`, (res) => {
                                setUploading(false);
                                console.log('response of save recording', res)
                            }, (err) => {
                                setUploading(false);
                                console.log('error of save recording', err)
                            })

                        }
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
                onPress={toggleModal}>
                <View style={{ ...PAGESTYLE.dayRightmain, width: cellWidth * props.span, borderStartColor: props.data.Type == Lesson ? props.data.Color : props.data.EventColor, borderStartWidth: 3, }}>
                    <View style={{ ...PAGESTYLE.backOpacity, width: cellWidth * props.span, borderTopColor: COLORS.timeTableBorder, borderBottomColor: COLORS.timeTableBorder, borderTopWidth: 1, borderBottomWidth: 1, borderRightColor: COLORS.timeTableBorder, borderRightWidth: 1, }}></View>
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

            <Modal isVisible={isModalVisible} style={{ height: wp(55)}}>
                <ScrollView >

                    <View style={styles.popupCard}>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                        <View style={styles.popupContent}>
                            {props.isLesson ?
                                <View style={styles.tabcontent}>
                                    <View style={styles.beforeBorder}>
                                        <Text h2 style={styles.titleTab}>{props.data.SubjectName}</Text>
                                        <Text h3 style={styles.subTitleTab}>{props.data.LessonTopic}</Text>
                                        <View style={styles.yellowHrTag}></View>
                                        <View style={styles.timedateGrp}>
                                            <View style={styles.dateWhiteBoard}>
                                                <Calender style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                <Text numberOfLines={1} style={styles.datetimeText}>{moment(props.data.Date).format('DD/MM/yyyy')}</Text>
                                            </View>
                                            <View style={[styles.dateWhiteBoard, styles.time]}>
                                                <Clock style={styles.timeIcon} height={hp(1.8)} width={hp(1.8)} />
                                                <Text numberOfLines={1} style={styles.datetimeText}>{props.data.StartTime} - {props.data.EndTime}</Text>
                                            </View>
                                            <View style={[styles.dateWhiteBoard, styles.grp]}>
                                                <Participants style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                                <Text numberOfLines={1} style={styles.datetimeText}>{props.data.GroupName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={STYLE.hrCommon}></View>
                                    <View style={styles.afterBorder}>
                                        <View style={styles.mediaMain}>
                                            {props.data.Allpupillist &&
                                                props.data.Allpupillist.map((data, index) => (
                                                    <TouchableOpacity
                                                        style={styles.mediabarTouch}
                                                        activeOpacity={opacity}>
                                                        <Image style={styles.mediabar} source={{ uri: baseUrl + data.ProfilePicture }}></Image>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                        <Text style={styles.lessondesciption}>{props.data.LessonDescription}</Text>
                                        <View style={styles.attchmentSectionwithLink}>
                                           
                                            {props.data.MaterialList && props.data.MaterialList.length > 0 ?
                                                <View style={styles.fileBoxGrpWrap}>
                                                    <Text style={styles.requireText}>Attachment(s)</Text>
                                                    <FlatList
                                                        data={props.data.MaterialList}
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
                                                                            style={{ ...styles.downloadIcon }}
                                                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                            color={COLORS.blueBorder} />
                                                                        :
                                                                        <DownloadSVG style={styles.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
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
                                        <View style={styles.requirementofClass}>
                                            <Text style={styles.requireText}>Items that your class will need</Text>
                                            {props.data.CheckList &&
                                                props.data.CheckList.map((data, index) => (
                                                    <View style={styles.lessonPoints}>
                                                        {/* <Image source={Images.CheckIcon} style={styles.checkIcon} /> */}
                                                        <TickMarkBlue style={styles.checkIcon} height={hp(1.7)} width={hp(1.7)} />
                                                        <Text style={styles.lessonPointText}>{data.ItemName}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                        <View style={styles.uploadCalendar}>
                                            <TouchableOpacity>
                                                <CalendarUpload style={styles.uploadCalIcon} height={hp(5.20)} width={hp(5.20)} />
                                            </TouchableOpacity>
                                         
                                            <View style={styles.lessonstartButton}>
                                                {!props.isPupil && props.data.Type == Lesson ?
                                                    <TouchableOpacity
                                                        style={styles.buttonGrp1}
                                                        activeOpacity={opacity}
                                                        onPress={() => { toggleModal(); props.navigateToDetail() }}>
                                                        <Text style={[styles.commonButtonBordered]}>Edit Lesson</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <View style={{ width: hp(20) }}></View>
                                                }
                                                <TouchableOpacity
                                                    style={styles.buttonGrp}
                                                    activeOpacity={opacity}
                                                    onPress={() => { props.isPupil ? launchLiveClassForPupil() : launchLiveClassForTeacher() }}>
                                                    {
                                                        isLoading ?
                                                            <ActivityIndicator
                                                                style={{ ...styles.buttonGrp, paddingVertical: 13 }}
                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                color={COLORS.white} /> :
                                                            <Text style={STYLE.commonButtonGreenDashboardSide}>{props.isPupil ? 'Join Class' : 'Start Class'}</Text>

                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
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
                        </View>
                    </View>
                </ScrollView>

                <Modal transparent={true} visible={isUploading}>
                <View style={styles.uploadVideoStl}>
                    <View style={styles.uploadVideoInnerStl}>
                        <ActivityIndicator style={{ margin: 20 }} size={'large'} color={COLORS.yellowDark} />
                        <Text style={styles.uploadVideoTextStl}>{"Just a minute \n We are uploading a recorded video..."}</Text>
                    </View>
                </View>
            </Modal>

            </Modal>
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
        borderRadius: hp(2),
        width: hp(61),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        borderWidth: hp(0.26),
        borderColor: COLORS.yellowBorder,
    },
    popupContent: {
        width: '100%',
    },
    beforeBorder: {
        padding: hp(2.60),
        paddingBottom: hp(0.5),
    },
    afterBorder: {
        padding: hp(2.60),
        paddingTop: hp(0.5),
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
        height: hp(1.43),
        backgroundColor: COLORS.yellowBorder,
        marginBottom: hp(2.34),
    },
    timedateGrp: {
        flexDirection: 'row',
    },
    dateWhiteBoard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(3.25),
    },
    datetimeText: {
        width:hp(13),
        fontSize: hp(1.82),
        lineHeight: hp(2.60),
        marginLeft: hp(0.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
    mediaMain: {
        flexDirection: 'row',
        marginLeft: hp(-0.39),
        marginRight: hp(-0.39),
        marginBottom: hp(5),
    },
    mediabarTouch: {
        paddingLeft: hp(0.39),
        paddingRight: hp(0.39),
    },
    mediabar: {
        width: hp(4.16),
        height: hp(4.16),
        borderRadius: hp(4.16 / 2),
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
    arrowSelectedTab: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: hp(1.95),
        borderRightWidth: hp(1.95),
        borderBottomWidth: hp(1.95),
        borderLeftWidth: hp(1.95),
        position: 'absolute',
        top: hp(5.85),
        left: hp(-3.90),
        borderTopColor: 'transparent',
        borderRightColor: COLORS.white,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    requirementofClass: {
        marginTop: hp(2.81),
        marginBottom: hp(1.81),
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonGrp: {
        width:hp(18),
        marginLeft: hp(1),
    },
    buttonGrp1: {
        width:hp(32),
        marginLeft: hp(1),
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
    uploadCalendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    commonButtonBordered: {
        width:hp(32),
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        fontSize: hp(1.56),
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: hp(1.21),
        paddingBottom: hp(1.21),
        
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
    },
    uploadVideoStl:{ width: '50%', height: '100%',alignSelf:'center', 
    position: 'absolute', justifyContent: 'center', alignItems:'center' },
    uploadVideoInnerStl:{width: '80%',borderRadius: hp(1),backgroundColor:COLORS.white, padding:10, borderColor:COLORS.darkGray, borderWidth:hp(0.1)},
    uploadVideoTextStl:{ textAlign: 'center', color: COLORS.darkGray, fontSize: 16, fontWeight: 'bold', marginBottom:hp(2) },

});