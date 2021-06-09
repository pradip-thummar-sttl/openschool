import React, { useState } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import Modal from 'react-native-modal';
import { baseUrl, cellWidth, isRunningFromVirtualDevice, Lesson, opacity } from "../../../utils/Constant";
import PAGESTYLE from '../../../screens/teacher/teachertimetable/Style';
import moment from 'moment';
import { User } from "../../../utils/Model";

const { CallModule, CallModuleIos } = NativeModules;

const Popupdata = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const launchLiveClass = () => {
        if (isRunningFromVirtualDevice) {
            // Do Nothing
        } else {
            // if (Platform.OS == 'android') {
            startLiveClassAndroid()
            // } else {
            //     startLiveClassIOS()
            // }
        }
    }

    const startLiveClassAndroid = () => {
        try {
            let qBUserIDs = [], userNames = [], names = []
            // let qBUserIDs = ['128367057'], userNames = ['ffffffff-c9b2-d023-ffff-ffffef05ac4a'], names = ['Test Device'];
            props.data.PupilList.forEach(pupil => {
                qBUserIDs.push(pupil.QBUserID)
                userNames.push(pupil.Email)
                names.push(pupil.FirstName + " " + pupil.LastName)
            });

            let dialogID = props.data.QBDilogID
            let QBUserId = User.user.QBUserId
            let currentName = User.user.FirstName + " " + User.user.LastName


            if (Platform.OS === 'android') {
                console.log('KDKD: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModule.qbLaunchLiveClass(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, (error, ID) => {
                    console.log('Class Started');
                });
            } else {
                console.log('PTPT: ', dialogID, QBUserId, currentName, qBUserIDs, userNames, names);
                CallModuleIos.createCallDialogid(dialogID, QBUserId, currentName, qBUserIDs, userNames, names, true, QBUserId, (id) => {
                    console.log('hi id:---------', id)
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
                <View style={{ ...PAGESTYLE.dayRightmain, zIndex: 1, width: cellWidth * props.span, borderStartColor: props.data.Type == Lesson ? props.data.Color : props.data.EventColor, borderStartWidth: 3, }}>
                    <View style={{ ...PAGESTYLE.backOpacity, backgroundColor: props.data.Type == Lesson ? props.data.Color : props.data.EventColor, width: cellWidth * props.span }}></View>
                    <Text numberOfLines={1} style={{ ...PAGESTYLE.labledataTitle, width: cellWidth * props.span }}>{props.title}</Text>
                    <View style={PAGESTYLE.row}>
                        <Image source={Images.timeTableClock} style={PAGESTYLE.timeIcon} />
                        <Text style={{ ...PAGESTYLE.labelTime, width: cellWidth * props.span }}>{props.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                        <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} />
                    </TouchableOpacity>
                    <View style={styles.popupContent}>
                        {/* <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={styles.titleTab}>Cartoon Drawings</Text>
                                <Text h3 style={styles.subTitleTab}>Art Subject</Text>
                                <View style={styles.yellowHrTag}></View>
                                <View style={styles.timedateGrp}>
                                    <View style={styles.dateWhiteBoard}>
                                        <Image style={styles.calIcon} source={Images.CalenderIconSmall} />
                                        <Text style={styles.datetimeText}>14/09/2020</Text>
                                    </View>
                                    <View style={[styles.dateWhiteBoard, styles.time]}>
                                        <Image style={styles.timeIcon} source={Images.Clock} />
                                        <Text style={styles.datetimeText}>09:00 - 09:30</Text>
                                    </View>
                                    <View style={[styles.dateWhiteBoard, styles.grp]}>
                                        <Image style={styles.calIcon} source={Images.Group} />
                                        <Text style={styles.datetimeText}>Group 2A</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={STYLE.hrCommon}></View>
                            <View style={styles.afterBorder}>
                                <View style={styles.mediaMain}>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.mediabar}></View></TouchableOpacity>
                                    <TouchableOpacity style={styles.mediabarTouch}><View style={styles.moreMedia}><Text style={styles.moreMediaText}>2+</Text></View></TouchableOpacity>
                                </View>
                                <Text style={styles.lessondesciption}>This fun lesson will be focused on drawing a cartoon character. We will work together to sharpen your drawing skills, encourage creative thinking and have fun with…</Text>
                                <View style={styles.attchmentSectionwithLink}>
                                    <TouchableOpacity style={styles.attachment}>
                                        <Image style={styles.attachmentIcon} source={Images.AttachmentIcon} />
                                        <Text style={styles.attachmentText}>1 Attachment</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.linkText}>see more</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.requirementofClass}>
                                    <Text style={styles.requireText}>Items that your class will need</Text>
                                    <View style={styles.lessonPoints}>
                                        <Image source={Images.CheckIcon} style={styles.checkIcon} />
                                        <Text style={styles.lessonPointText}>Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens.</Text>
                                    </View>
                                    <View style={styles.lessonPoints}>
                                        <Image source={Images.CheckIcon} style={styles.checkIcon} />
                                        <Text style={styles.lessonPointText}>Drawing work sheet.</Text>
                                    </View>
                                </View>
                                <View style={styles.uploadCalendar}>
                                    <TouchableOpacity>
                                        <Image style={styles.uploadCalIcon} source={Images.UploadCalender} />
                                    </TouchableOpacity>
                                    <View style={styles.lessonstartButton}>
                                        <TouchableOpacity style={styles.buttonGrp}><Text style={[STYLE.commonButtonBordered]}>Edit Lesson</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Start Class</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View> */}
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={styles.titleTab}>{props.data.SubjectName}</Text>
                                <Text h3 style={styles.subTitleTab}>{props.data.LessonTopic}</Text>
                                <View style={styles.yellowHrTag}></View>
                                <View style={styles.timedateGrp}>
                                    <View style={styles.dateWhiteBoard}>
                                        <Image style={styles.calIcon} source={Images.CalenderIconSmall} />
                                        <Text style={styles.datetimeText}>{moment(props.data.Date).format('DD/MM/yyyy')}</Text>
                                    </View>
                                    <View style={[styles.dateWhiteBoard, styles.time]}>
                                        <Image style={styles.timeIcon} source={Images.Clock} />
                                        <Text style={styles.datetimeText}>{props.data.StartTime} - {props.data.EndTime}</Text>
                                    </View>
                                    <View style={[styles.dateWhiteBoard, styles.grp]}>
                                        <Image style={styles.calIcon} source={Images.Group} />
                                        <Text style={styles.datetimeText}>{props.data.GroupName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={STYLE.hrCommon}></View>
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
                                    <TouchableOpacity style={styles.attachment}>
                                        <Image style={styles.attachmentIcon} source={Images.AttachmentIcon} />
                                        <Text style={styles.attachmentText}>1 Attachment</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.linkText}>see more</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.requirementofClass}>
                                    <Text style={styles.requireText}>Items that your class will need</Text>
                                    {props.data.CheckList ?
                                        props.data.CheckList.map((data, index) => (
                                            <View style={styles.lessonPoints}>
                                                <Image source={Images.CheckIcon} style={styles.checkIcon} />
                                                <Text style={styles.lessonPointText}>{data.ItemName}</Text>
                                            </View>
                                        ))
                                        :
                                        null
                                    }
                                </View>
                                <View style={styles.uploadCalendar}>
                                    <TouchableOpacity>
                                        <Image style={styles.uploadCalIcon} source={Images.UploadCalender} />
                                    </TouchableOpacity>
                                    <View style={styles.lessonstartButton}>
                                        {!props.isPupil && props.data.Type == Lesson ?
                                            <TouchableOpacity
                                                style={styles.buttonGrp}
                                                activeOpacity={opacity}
                                                onPress={() => { toggleModal(); props.navigateToDetail() }}>
                                                <Text style={[STYLE.commonButtonBordered]}>Edit Lesson</Text>
                                            </TouchableOpacity>
                                            :
                                            <View style={{ width: hp(20) }}></View>
                                        }
                                        <TouchableOpacity
                                            style={styles.buttonGrp}
                                            activeOpacity={opacity}
                                            onPress={() => { launchLiveClass() }}>
                                            <Text style={STYLE.commonButtonGreenDashboardSide}>Start Class</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
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
        width: hp(60.54),
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginTop: hp(4.81),
        marginBottom: hp(1.81),
    },
    requireText: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
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
        marginLeft: hp(2.21),
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
});