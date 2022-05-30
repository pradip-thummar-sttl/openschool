import React, { useState, useEffect, useFocus, createRef, RefObject } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import PopupUser from '../../../component/reusable/popup/Popupuser';
import { ScrollView } from "react-native-gesture-handler";
import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";
import { Calendar } from 'react-native-calendars';
import { opacity, showMessage, Var } from '../../../../utils/Constant';
// import Images from "../../../../utils/Images";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { selectedDate, User } from "../../../../utils/Model";
import CloseBlack from "../../../../svg/teacher/pupilmanagement/Close_Black";
import { useIsDrawerOpen } from '@react-navigation/drawer'
import Clock from "../../../../svg/teacher/dashboard/Clock";
import { setCalendarEventData, setTimeTableWeekEventData } from "../../../../actions/action";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

var month = moment().format('MM');;
var date = moment().format('DD');
var year = moment().format('YYYY');

const markdate = ["2021-03-26", "2021-03-27"]
const periodDate = ["2021-03-22", "2021-03-23", "2021-03-24", "2021-03-25", "2021-03-26", "2021-03-27", "2021-03-28"]
const NotificationDrawer = (props) => {
    const calEventData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.calEventData
    })
    const today = moment();
    // const begginingOfCurrentWeek = today.startOf('week');
    // const endOfWeek = today.endOf('week');
    var startDate = moment().startOf('isoWeek');
    var endDate = moment().endOf('isoWeek');
    // console.log('date of week', moment(today).format('YYYY-MM-DD'), moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
    // const [calEventData, setcalEventData] = useState(calEventDat)
    const myRef = createRef()
    const isOpen = useIsDrawerOpen()

    const [liveClassNotifications, setLiveClassNotifications] = useState([])
    const [homeworkNotifications, setHomeworkNotifications] = useState([])
    const [personalNotifications, setPersonalNotifications] = useState([])
    const [st, setsta] = useState(0)
    const [isLoading, setLoading] = useState(false)


    const [notifications, setNotifications] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {

        // month = moment().format('MM');
        // date = moment().format('DD');
        // year = moment().format('YYYY');
        // var m = check.format('M');
        console.log('month calandar event', month, date, year);
        if (Var.isCalender) {


            // setcalEventData(res.date)
            // Service.get(`${EndPoints.CalenderEvent}/${User.user._id}`, (res) => {
            //     console.log('response of calandar event 2', res);
            //     if (res.flag) {
            //         setcalEventData(res.date)
            //     } else {
            //         showMessage(res.message)
            //     }
            // }, (err) => {
            //     console.log('Error of calandar event', err);
            // })
        }

        if (isOpen) {
            // getAllNotification()
            getAllNotification()
        }

    }, [isOpen])


    const getAllNotification = () => {
        console.log('user dtaaaa===>', User.user)
        let data = {
            userid: User.user.UserType == "Teacher" ? User.user._id : User.user.UserDetialId,//"6047645b9a6ac02f68642c72",
            page: "1",
            limit: "50"
        }
        setLoading(true)
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

                setNotifications(res.data)
                setLoading(false)
                // setLiveClassNotifications(liveClass)
                // setHomeworkNotifications(homework)
                // setPersonalNotifications(personal)
            }


        }, (err) => {
            console.log('errr', errrr)
            setLoading(false)
        })

    }

    const deleteNotification = (id) => {
        Service.get(`${EndPoints.deleteNotification}/${id}`, (res) => {
            console.log('res-delete', res)
            if (res.flag) {
                getAllNotification()
            }
        }, (err) => {
            console.log('Error of calandar event', err);
        })
    }


    const onOpenClass = () => {
        if (User.user.UserType == "Teacher") {
            props.navigation.replace('TeacherDashboard', { index: 1, })
        } else {
            props.navigation.replace('PupuilDashboard', { index: 1, })
        }
    }
    const onOpenhomework = (tabIndex = 1) => {
        if (User.user.UserType == "Teacher") {
            props.navigation.replace('TeacherDashboard', { index: 2 })
        } else {
            props.navigation.replace('PupuilDashboard', { index: 2, tabIndex })
        }
    }

    const onMonthChangeFunction = (month) => {
        // const date = moment().format('YYYY-MM-DD')
        // // const m = month
        // const d = moment().format('D');
        // var y = moment().format('YYYY');
        // console.log('hello index', index, month, year, date);
        // if (index === 1) {
        //     console.log('hello 1');
        //     if (month === 1) {
        //         console.log('hello 2');
        //         month = 12
        //         year = year - 1
        //     } else {
        //         console.log('hello 3');
        //         month = month - 1
        //     }

        // } else {
        //     console.log('hello else 1');
        //     if (month === 12) {
        //         console.log('hello else 1');
        //         month = 1
        //         year = year + 1
        //     } else {
        //         console.log('hello else 1');
        //         month = month + 1
        //     }
        // }
        // console.log("log of current date and time===================>", year, month, date);

        // let datestrings = `${year}-${month}-${date}`

        let data = {
            CurrentDate: moment(month.timestamp).format('YYYY-MM-DD')
        }
        // console.log('data of current date',data, datestrings);
        if (User.user.UserType === "Teacher") {
            Service.post(data, `${EndPoints.AllEventHomworklesson}/${User.user._id}`, (res) => {
                // console.log('previousMonthDateSet ------- response of calender event is:', res)
                if (res.code == 200) {
                    // setsta(1)
                    // setcalEventData(res.data)
                    dispatch(setCalendarEventData(res.data))

                    // myRef.current.onPressArrowLeft()

                }
            }, (err) => {
                console.log('response of calender event eror is:', err)
            })
        } else {
            Service.post(data, `${EndPoints.AllEventHomworklessonpupil}/${User.user.UserDetialId}`, (res) => {
                console.log('previousMonthDateSet ------- response of calender event is:', res)
                if (res.code == 200) {
                    // setsta(1)
                    // setcalEventData(res.data)
                    dispatch(setCalendarEventData(res.data))
                    // myRef.current.updateMonth(moment(date.CurrentDate).format('YYYY-MM-DD'), true)
                }
            }, (err) => {
                console.log('response of calender event eror is:', err)
                setLoading(false)
            })
        }

    }
    const onDatePress = (date) => {
        selectedDate.date = date.dateString
        dispatch(setTimeTableWeekEventData(date.dateString))
    }
    // console.log('event data', calEventData);
    return (
        <View style={styles.drawerMain}>
            {
                Var.isCalender ?
                    <View style={styles.datepickerDrwaer}>
                        {/* {Var.isCalender = false} */}
                        <Calendar
                            theme={{
                                arrowColor: 'grey',
                                textDayFontFamily: FONTS.fontRegular,
                                textMonthFontFamily: FONTS.fontRegular,
                                textDayHeaderFontFamily: FONTS.fontRegular,
                                textMonthFontWeight: 'bold',
                                textMonthFontSize: 16,
                            }}
                            ref={myRef}
                            minDate={new Date()}
                            firstDay={1}
                            // onMonthChange={(month) => onMonthChangeFunction(month)}
                            // onDayPress={(day) => { console.log('day press', day); }}
                            // onPressArrowLeft={(subtractMonth) => { subtractMonth(); onMonthChangeFunction(1) }}
                            // onPressArrowRight={(addMonth) => { addMonth(); onMonthChangeFunction(2) }}
                            dayComponent={({ date, state, marking }) => {
                                return (
                                    <TouchableOpacity onPress={() => onDatePress(date)}>
                                        {
                                            moment(startDate).format('YYYY-MM-DD') <= date.dateString && moment(endDate).format('YYYY-MM-DD') >= date.dateString ?
                                                date.dateString == moment(startDate).format('YYYY-MM-DD') || date.dateString == moment(endDate).format('YYYY-MM-DD') ?
                                                    date.dateString == moment(startDate).format('YYYY-MM-DD') ?
                                                        <View style={styles.datemainView1}>
                                                            < View style={styles.dateSubVIew1}>
                                                                <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={styles.dateMainView2}>
                                                            < View style={styles.dateSubVIew1}>
                                                                <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                                            </View>
                                                        </View>
                                                    :
                                                    <View style={styles.dateMAinView3}>
                                                        < View style={styles.dateSubView2}>
                                                            <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                                        </View>
                                                    </View>
                                                :
                                                <View style={styles.datemainView4}>
                                                    < View style={styles.dateSubView3}>
                                                        <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                                    </View>
                                                </View>


                                            // begginingOfCurrentWeek >= date.dateString && endOfWeek <= date.dateString ?
                                            //     // date.dateString == periodDate[0] || date.dateString == periodDate[periodDate.length - 1] ?
                                            //         date.dateString == begginingOfCurrentWeek ?
                                            // <View style={styles.datemainView1}>
                                            //     < View style={styles.dateSubVIew1}>
                                            //         <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                            //     </View>
                                            // </View>
                                            //             :
                                            // <View style={styles.dateMainView2}>
                                            //     < View style={styles.dateSubVIew1}>
                                            //         <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white' }}>{date.day}</Text>
                                            //     </View>
                                            // </View>
                                            //         :
                                            // <View style={styles.dateMAinView3}>
                                            //     < View style={styles.dateSubView2}>
                                            //         <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                            //     </View>
                                            // </View>
                                            //     :
                                            // <View style={styles.datemainView4}>
                                            //     < View style={styles.dateSubView3}>
                                            //         <Text style={{ fontSize: hp(1.82), textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                                            //     </View>
                                            // </View>
                                        }
                                        {
                                            Object.keys(calEventData).map((item) => {
                                                // console.log('date strung', item);
                                                return (
                                                    moment(item).format('YYYY-MM-DD') === date.dateString ?
                                                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                            {
                                                                calEventData[`${item}`].map((obj) => {
                                                                    // console.log('uitem 2', calEventData[`${item}`])
                                                                    return (
                                                                        <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: obj.EventColor, }} />
                                                                    )
                                                                })
                                                            }
                                                        </View> : null
                                                )
                                            })
                                            // markdate.includes(date.dateString) ?
                                            //     <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                            //         <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: 'purple', marginRight: 2 }} />
                                            //         <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: '#FF0022', }} />
                                            //     </View> : null

                                        }

                                    </TouchableOpacity>
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
                            <Text style={styles.drawerTitle} >My Notifications</Text>
                            <TouchableOpacity style={styles.closeNotificationbarMain}
                                activeOpacity={opacity}
                                onPress={() => props.navigation.goBack()}
                            >
                                {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIcon} /> */}
                                <CloseBlack style={[styles.closeIcon]} height={23} width={23} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.notificationmain} showsVerticalScrollIndicator={false}>
                            {
                                isLoading ? <ActivityIndicator
                                    size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.lightOrangeLogin}
                                    style={{ paddingTop: 20 }}
                                /> :
                                    <>
                                        {
                                            notifications.length ?
                                                notifications.map((item, index) => {

                                                    const date = new Date(item.CreatedDate);
                                                    let time1 = moment(date).format('HH:mm')
                                                    const timeSplit = time1.split(':')
                                                    const time = `${timeSplit[0]}:${timeSplit[1]}`
                                                    
                                                    return (

                                                        item.NotificationType === 'LIVE CLASSES' ?
                                                            <View style={{ borderBottomWidth: 1, borderColor: COLORS.commonBorderColor, backgroundColor: item.IsSeen ? COLORS.white : COLORS.lightSkyBlueDue }}>
                                                                <Text style={{ ...styles.notificationsText, paddingTop: hp(1), }}>Live Classes</Text>
                                                                <View style={styles.classDetail}>

                                                                    <>
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Text style={[styles.classsummary, { width: '80%' }]}>{item.Description}</Text>
                                                                            <TouchableOpacity onPress={() => deleteNotification(item._id)} style={styles.closeNotificationbar}>
                                                                                {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                                                                {/* <CloseBlack style={styles.closeIconSmall} height={hp(2.94)} width={hp(2.94)} /> */}
                                                                                <CloseBlack style={styles.closeIconSmall} height={hp(2.94)} width={hp(2.94)} />
                                                                                {/* <Text style={[STYLE.openClassLink, { color: 'red' }]}>DELETE</Text> */}
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={styles.timingJoinClass}>
                                                                            <View style={styles.timing}>
                                                                                <Clock style={styles.closeIconSmall1} height={hp(1.5)} width={hp(1.5)} />
                                                                                <Text style={styles.timingText}>{item.SubDesc}</Text>
                                                                            </View>
                                                                            <TouchableOpacity onPress={() => { onOpenClass() }} >
                                                                                {/* <Text style={{ ...STYLE.openClassLink, marginBottom: 0, }}>{[<PopupUser />]}</Text> */}
                                                                                <Text style={STYLE.openClassLink}>Open Class</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </>



                                                                </View>
                                                            </View> : item.NotificationType === 'HOMEWORK' ?
                                                                <View style={{ borderBottomWidth: 1, borderColor: COLORS.commonBorderColor, backgroundColor: item.IsSeen ? COLORS.white : COLORS.lightSkyBlueDue }}>
                                                                    <Text style={styles.notificationsText}>Homework</Text>
                                                                    <View style={styles.classDetail}>
                                                                        <TouchableOpacity style={styles.closeNotificationbar}>
                                                                            {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                                                        </TouchableOpacity>

                                                                        <>
                                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                                                                <Text style={[styles.classsummary, { width: '80%' }]}>{item.Description}</Text>
                                                                                <TouchableOpacity onPress={() => deleteNotification(item._id)}>
                                                                                    <CloseBlack style={styles.closeIconSmall} height={hp(2.94)} width={hp(2.94)} />
                                                                                    {/* <Text style={[STYLE.openClassLink, { color: 'red' }]}>DELETE</Text> */}
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View style={styles.timingJoinClass}>
                                                                                <View style={[styles.timing, styles.timingOne]}>
                                                                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.timingText}>{time}</Text>
                                                                                </View>
                                                                                <TouchableOpacity onPress={() => { onOpenhomework(2) }} >
                                                                                    <Text style={STYLE.openClassLink}>Check</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </>


                                                                    </View>
                                                                </View>
                                                                :
                                                                item.NotificationType === 'LESSON' ?
                                                                    <View style={{ borderBottomWidth: 1, borderColor: COLORS.commonBorderColor, backgroundColor: item.IsSeen ? COLORS.white : COLORS.lightSkyBlueDue }}>
                                                                        <Text style={{ ...styles.notificationsText, paddingTop: hp(1), }}>LESSON</Text>
                                                                        <View style={styles.classDetail}>

                                                                            <>
                                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                    <Text style={[styles.classsummary, { width: '80%' }]}>{item.Description}</Text>
                                                                                    <TouchableOpacity onPress={() => deleteNotification(item._id)} style={styles.closeNotificationbar}>
                                                                                        {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                                                                        <CloseBlack style={styles.closeIconSmall} height={hp(2.94)} width={hp(2.94)} />
                                                                                        {/* <Text style={[STYLE.openClassLink, { color: 'red' }]}>DELETE</Text> */}
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <View style={[styles.timingJoinClass]}>
                                                                                    <View style={[styles.timing, styles.timingOne]}>
                                                                                        <Clock style={[styles.closeIconSmall1, { marginRight: 5 }]} height={hp(1.5)} width={hp(1.5)} />
                                                                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.timingText}>{time}</Text>
                                                                                    </View>
                                                                                    <TouchableOpacity onPress={() => { onOpenhomework(1) }} >
                                                                                        {/* <Text style={{ ...STYLE.openClassLink, marginBottom: 0, }}>{[<PopupUser />]}</Text> */}
                                                                                        <Text style={STYLE.openClassLink}>VIEW</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </>



                                                                        </View>
                                                                    </View> :
                                                                    <View style={{ borderBottomWidth: 1, borderColor: COLORS.commonBorderColor, backgroundColor: item.IsSeen ? COLORS.white : COLORS.lightSkyBlueDue }}>
                                                                        <Text style={styles.notificationsText}>Personal</Text>

                                                                        <View style={styles.classDetail}>
                                                                            <View tyle={styles.timingJoinClass}>
                                                                                <Text style={[styles.classsummary, { width: '80%' }]}>{item.Title}</Text>
                                                                                <TouchableOpacity onPress={() => deleteNotification(item._id)} style={styles.closeNotificationbar}>
                                                                                    {/* <Image source={require('../../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /> */}
                                                                                    <CloseBlack style={styles.closeIconSmall} height={hp(2.94)} width={hp(2.94)} />
                                                                                    {/* <Text style={[STYLE.openClassLink, { color: 'red' }]}>DELETE</Text> */}
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View style={styles.timingJoinClass}>
                                                                                <View style={[styles.timing, styles.timingOne]}>
                                                                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.timingText}>{item.Description}</Text>
                                                                                </View>
                                                                                <TouchableOpacity onPress={() => { props.navigation.navigate('Passcode') }}>
                                                                                    <Text style={STYLE.openClassLink}>Read</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                    )
                                                })
                                                :
                                                <View style={{ height: 100, justifyContent: 'center' }}>
                                                    <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center', fontFamily: FONTS.fontRegular }}>No new notifications!</Text>
                                                </View>

                                        }

                                        {/* ≥ */}
                                    </>
                            }

                        </ScrollView>
                        {/* <View style={styles.bottomButton}>
                            <TouchableOpacity style={styles.buttonTrash}>
                                <Image source={Images.trashIcon} style={styles.trashIcon} />
                                <Text style={styles.clearText}>Clear all notifications</Text>
                            </TouchableOpacity>
                        </View> */}
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
    drawerTitleMain: {
        paddingLeft: hp(1.95),
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: hp(1.95),
        position: 'relative',
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderBottomWidth: 1,
    },
    timingOne: {
        width: '85%'
    },
    drawerTitle: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
    },
    datepickerDrwaer: {
        paddingTop: hp(4.55),
        paddingLeft: hp(2.60),
        paddingRight: hp(2.60),
    },
    closeNotificationbarMain: {
        position: 'absolute',
        top: hp(2.7),
        zIndex: 9,
        right: hp(1.95),
        zIndex: 9,
    },
    closeIcon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
    },
    classDetail: {
        padding: hp(1.95),
        borderWidth: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        position: 'relative',
    },
    classDetailLast: {
        padding: hp(1.95),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bottomProfileLightBorder,
        position: 'relative',
    },
    notificationsText: {
        padding: hp(1.95),
        paddingBottom: hp(1),
        paddingTop: hp(4.55),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bottomProfileLightBorder,
        color: COLORS.menuLightFonts,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        textTransform: 'uppercase',
    },
    closeNotificationbar: {
        position: 'absolute',
        top: -10,
        right: 0,
    },
    closeIconSmall: {
        width: hp(2.94),
        resizeMode: 'contain',
        opacity: 0.6,
        // alignSelf:'flex-end'
    },
    closeIconSmall1: {
        width: hp(2.5),
        resizeMode: 'contain',
    },
    classsummary: {
        paddingRight: hp(5.1),
        fontSize: 14,
        fontFamily: FONTS.fontRegular,
        lineHeight: 20,
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    timingJoinClass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    dateMAinView3: { marginVertical: hp(0.30), height: hp(4.55), width: hp(6.51), backgroundColor: COLORS.periodColor, justifyContent: 'center', alignItems: 'center', },
    datemainView4: { marginVertical: hp(0.30), height: hp(4.55), width: hp(6.51), justifyContent: 'center', alignItems: 'center', },
    dateSubVIew1: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.dashboardGreenButton, justifyContent: 'center', alignItems: 'center', },
    dateSubView2: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), justifyContent: 'center', alignItems: 'center', },
    dateSubView3: { marginVertical: hp(0.30), borderRadius: hp(50), height: hp(4.55), width: hp(4.55), backgroundColor: COLORS.lightGrayPupil, justifyContent: 'center', alignItems: 'center', },
    labelColor: { color: COLORS.menuLightFonts, fontSize: hp(1.56), },
    colorBox: { height: hp(2.60), width: hp(2.60), borderRadius: hp(0.65), marginRight: hp(1.30) },
    colorView: { flexDirection: 'row', marginBottom: hp(1.95), alignItems: 'center' },
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
        paddingBottom: hp(1.82),
        shadowColor: '#13171F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
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