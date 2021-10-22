import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import PopupUser from '../../../component/reusable/popup/Popupuser';
import { ScrollView } from "react-native-gesture-handler";
import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";
import { Calendar } from 'react-native-calendars';
import { opacity, Var } from '../../../../utils/Constant';
// import Images from "../../../../utils/Images";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { useSelector } from "react-redux";
import moment from "moment";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import BackArrow from "../../../../svg/common/BackArrow";

const markdate = ["2021-03-19", "2021-03-20", "2021-03-21", "2021-03-22"]
const periodDate = ["2021-03-08", "2021-03-09", "2021-03-10", "2021-03-11", "2021-03-12"]
const NotificationDrawer = (props) => {
    const calEventData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.calEventData
    })
    console.log('cal event data', calEventData);

    const [liveClassNotifications, setLiveClassNotifications] = useState([])
    const [homeworkNotifications, setHomeworkNotifications] = useState([])
    const [personalNotifications, setPersonalNotifications] = useState([])

    useEffect(() => {
       getAllNotification()
    }, [])
    getAllNotification = () => {

        let data = {
            userid: "6047645b9a6ac02f68642c72",
            page: "1",
            limit: "5"
        }

        Service.post(data, `${EndPoints.getAllNotifications}`, (res) => {
            console.log('succss', res);
            if (res.flag) {
                let allNotifications = res.data
                let liveClass = []
                let homework = []
                let personal = []
                allNotifications.map((item) => {
                    if (item.NotificationType === 'LIVE CLASSES') {
                        liveClass.push(item)
                    } else if (item.NotificationType === 'HOMEWORK') {
                        homework.push(item)
                    } else if (item.NotificationType === 'PERSONAL') {
                        personal.push(item)
                    }
                })

                setLiveClassNotifications(liveClass)
                setHomeworkNotifications(homework)
                setPersonalNotifications(personal)
            }


        }, (err) => {
            console.log('errr', errrr)
        })

    }

    deleteNotification = (id) => {
        Service.get(`${EndPoints.deleteNotification}/${id}`, (res) => {
            console.log('res-delete', res)
            if (res.flag) {
                getAllNotification()
            }
        }, (err) => {
            console.log('Error of calandar event', err);
        })
    }
    return (
        <View style={styles.drawerMain}>
            {Var.isCalender ?
                <View>
                    {Var.isCalender = false}
                    <View style={styles.drawerTitleMainDate}>
                        <TouchableOpacity style={styles.closeNotificationbarMain}
                            activeOpacity={opacity}
                            onPress={() => props.navigation.goBack()}
                        >
                            <BackArrow style={styles.closeIcon} height={hp(2.4)} width={hp(2.4)} />
                            {/* <Image source={Images.backArrow} style={styles.closeIcon} /> */}
                        </TouchableOpacity>
                    </View>
                    <Calendar
                        style={styles.datepickerDrwaer}
                        minDate={new Date()}
                        firstDay={1}
                        dayComponent={({ date, state, marking }) => {
                            return (
                                <View>
                                    {
                                        periodDate.includes(date.dateString) ?
                                            date.dateString == periodDate[0] || date.dateString == periodDate[periodDate.length - 1] ?
                                                date.dateString == periodDate[0] ?
                                                    <View style={styles.datemainView1}>
                                                        < View style={styles.dateSubVIew1}>
                                                            <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View style={styles.dateMainView2}>
                                                        < View style={styles.dateSubVIew1}>
                                                            <Text style={{ fontSize: hp(1.82),textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                                        </View>
                                                    </View>
                                                :
                                                <View style={styles.dateMAinView3}>
                                                    < View style={styles.dateSubView2}>
                                                        <Text style={{ fontSize: hp(1.82),textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                                    </View>
                                                </View>
                                            :
                                            <View style={styles.datemainView4}>
                                                < View style={styles.dateSubView3}>
                                                    <Text style={{ fontSize: hp(1.82),textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                                </View>
                                            </View>
                                    }
                                    {
                                        calEventData.map((item) => {
                                            return (
                                                moment(item.EventDate).format('DD/MM/yyyy') === date.dateString ?
                                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                        {/* <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: 'purple', marginRight: 2 }} /> */}
                                                        <View style={{ position: 'absolute', top: hp(0.1), left:hp(-0.26), height: hp(0.77), width: hp(0.77), borderRadius: hp(0.77), backgroundColor: item.EventColor, }} />
                                                    </View> : null
                                            )
                                        })

                                    }

                                </View>
                            )
                        }}  
                    />

                    <View style={{ paddingLeft: hp(1.97), marginTop: hp(6.0) }}>
                        <View style={styles.colorView}>
                            <View style={[styles.colorBox, { backgroundColor: COLORS.blueButton }]} />
                            <Text style={styles.labelColor}>Class</Text>
                        </View>

                        <View style={styles.colorView}>
                            <View style={[styles.colorBox, { backgroundColor: COLORS.yellowDark }]} />
                            <Text style={styles.labelColor}>Homework</Text>
                        </View>

                        <View style={styles.colorView}>
                            <View style={[styles.colorBox, { backgroundColor: COLORS.purpleDark }]} />
                            <Text style={styles.labelColor}>Personal</Text>
                        </View>
                    </View>
                </View>
                :
                <View>
                    <View style={styles.drawerTitleMain}>
                        <TouchableOpacity style={styles.closeNotificationbarMain}
                            activeOpacity={opacity}
                            onPress={() => props.navigation.goBack()}
                        >
                            <BackArrow style={styles.closeIcon} height={hp(2.4)} width={hp(2.4)} />

                            {/* <Image source={Images.backArrow} style={styles.closeIcon} /> */}
                        </TouchableOpacity>
                        <Text style={styles.drawerTitle} >My Notifications</Text>
                    </View>
                    <ScrollView style={styles.notificationmain} showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.notificationsText}>Live Classes</Text>
                            <View style={styles.classDetail}>
                                <TouchableOpacity style={styles.closeNotificationbar}>
                                    {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                    <CloseBlack style={styles.closeIconSmall}/>
                                 </TouchableOpacity>
                                <Text style={styles.classsummary}>Your English Grammar class - Group 1A is schedule to start in 5m</Text>
                                <View style={styles.timingJoinClass}>
                                    <View style={styles.timing}>
                                        <Clock width={hp(1.67)} height={hp(1.67)} style={styles.timingClass}/>
                                        {/* <Image source={require('../../../../assets/images/clock2.png')} style={styles.timingClass} /> */}
                                        <Text style={styles.timingText}>09:00 - 09:30</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={STYLE.openClassLink}>{[<PopupUser />]}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.notificationsText}>Homework</Text>
                            <View style={styles.classDetail}>
                                <TouchableOpacity style={styles.closeNotificationbar}>
                                    {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                    <CloseBlack style={styles.closeIconSmall}/>
                                    </TouchableOpacity>
                                <Text style={styles.classsummary}>Your English Grammar class - Group 1A is schedule to start in 5m</Text>
                                <View style={styles.timingJoinClass}>
                                    <View style={styles.timing}>
                                        <Text style={styles.timingText}>6 submitted</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={STYLE.openClassLink}>Check</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.notificationsText}>Personal</Text>
                            <View style={styles.classDetail}>
                                <TouchableOpacity style={styles.closeNotificationbar}>
                                    {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                    <CloseBlack style={styles.closeIconSmall}/>

                                    </TouchableOpacity>
                                <Text style={styles.classsummary}>You have a new message from</Text>
                                <View style={styles.timingJoinClass}>
                                    <View style={styles.timing}>
                                        <Text style={styles.timingText}>Mrs Ann Le-Paradesi</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={STYLE.openClassLink}>Read</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.classDetail}>
                                <TouchableOpacity style={styles.closeNotificationbar}>
                                    {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                    <CloseBlack style={styles.closeIconSmall}/>

                                    </TouchableOpacity>
                                <Text style={styles.classsummary}>You have a new message from</Text>
                                <View style={styles.timingJoinClass}>
                                    <View style={styles.timing}>
                                        <Text style={styles.timingText}>Mr Harminder Singh</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={STYLE.openClassLink}>Read</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomButton}>
                        <TouchableOpacity style={styles.buttonTrash}>
                            {/* <Image source={Images.trashIcon} style={styles.trashIcon} /> */}
                            <Text style={styles.clearText}>Clear all notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View >

    );
}
export default NotificationDrawer;

const styles = StyleSheet.create({
    drawerMain: {
        flex: 1,
    },
    drawerTitleMainDate:{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.commonBorderColor,
        paddingLeft: hp(2.6),
        paddingTop: hp(4.55),
        paddingBottom: hp(1.6),
        paddingRight: hp(1.6),
    },
    drawerTitleMain: {
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        paddingLeft: hp(1.95),
        paddingTop: hp(5.2),
        paddingBottom: hp(1.6),
        paddingRight: hp(1.95),
        position: 'relative',
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerTitle: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
    },
    datepickerDrwaer:{
        paddingTop: hp(1),
        paddingLeft: hp(1.6),
        paddingRight: hp(1.6),
    },
    closeNotificationbarMain: {
        position: 'relative',
        zIndex: 9,
        marginRight: hp(2),
    },
    closeIcon: {
        width: hp(2.4),
        resizeMode: 'contain',
    },
    classDetail: {
        padding: hp(1.95),
        marginBottom: -1,
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        position: 'relative',
    },
    notificationsText: {
        padding: hp(1.95),
        paddingBottom: hp(1),
        paddingTop: hp(1),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        color: COLORS.menuLightFonts,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        textTransform: 'uppercase',
    },
    closeNotificationbar: {
        position: 'absolute',
        top: hp(0.7),
        right: hp(1.95),
    },
    closeIconSmall: {
        width: hp(2.8),
        resizeMode: 'contain',
        opacity: 0.4,
    },
    classsummary: {
        paddingRight: hp(5.1),
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.6),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    timingJoinClass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timingClass: {
        width: hp(1.69),
        resizeMode: 'contain',
        marginRight: hp(0.7),
    },
    timingText: {
        fontSize: hp(1.56),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
    datemainView1: { borderTopLeftRadius: hp(50), borderBottomLeftRadius: hp(50), marginVertical: hp(0.30), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.periodColor, justifyContent: 'center', alignItems: 'center' },
    dateMainView2: { borderTopRightRadius: hp(50), borderBottomRightRadius: hp(50), marginVertical: hp(0.30), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.periodColor, justifyContent: 'center', alignItems: 'center' },
    dateMAinView3: { marginVertical: hp(0.30), height: hp(4.55), width: hp(7.9), backgroundColor: COLORS.periodColor, justifyContent: 'center', alignItems: 'center', },
    datemainView4: { marginVertical: hp(0.30), height: hp(4.55), width: hp(7.9), justifyContent: 'center', alignItems: 'center', },
    dateSubVIew1: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.dashboardGreenButton, justifyContent: 'center', alignItems: 'center', },
    dateSubView2: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), justifyContent: 'center', alignItems: 'center', },
    dateSubView3: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.lightGrayPupil, justifyContent: 'center', alignItems: 'center', },
    labelColor:{color:COLORS.menuLightFonts,fontSize: hp(1.56),},
    colorBox: { height: hp(2.60), width: hp(2.60), borderRadius: hp(0.65), marginRight: hp(1.30) },
    colorView: { flexDirection: 'row', marginBottom: hp(2.62),alignItems: 'center' },
    bottomButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        left: 0,
        bottom: 0,
        width: '100%',        
    },
    notificationmain: {
        height: '90%',
    },
    buttonTrash: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingTop: hp(1.82),
        paddingBottom: hp(4.2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.2,
        shadowRadius: hp(3.125),
        elevation: 10,
        backgroundColor: COLORS.white,
    },
    trashIcon: {
        width: hp(2),
        resizeMode: 'contain',
        height: hp(2.25),
        marginRight: hp(0.65),
    },
    clearText: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
    },
});