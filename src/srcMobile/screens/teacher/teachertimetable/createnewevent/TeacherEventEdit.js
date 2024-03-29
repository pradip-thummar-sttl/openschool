import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator, BackHandler, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import FONTS from '../../../../../utils/Fonts';
// import Images from '../../../../../utils/Images';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { msgEvent, msgLocation, msgNote, opacity, showMessage, showMessageWithCallBack } from "../../../../../utils/Constant";
import MESSAGE from "../../../../../utils/Messages";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { User } from "../../../../../utils/Model";
import Clock from "../../../../../svg/teacher/dashboard/Clock";
import ArrowDown from "../../../../../svg/teacher/lessonhwplanner/ArrowDown";
import BackArrow from "../../../../../svg/teacher/lessonhwplanner/ArrowBack";
import TickMarkWhite from "../../../../../svg/teacher/lessonhwplanner/TickMark_White";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import CalendarUpload from "../../../../../svg/teacher/timetable/CalendarUpload";

const TeacherEventEdit = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [event, setEvent] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState('');
    const [note, setnote] = useState('');
    const [theme, setTheme] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [selectedColor, setSelectColor] = useState(COLORS.yellowBorder)
    const [selectColorId, setSelectColorId] = useState('')
    const [isFromDropOpen, setFromDropOpen] = useState(false)
    const [isToDropOpen, setToDropOpen] = useState(false)
    const [isColorDropOpen, setColorDropOpen] = useState(false)
    const [selectDate, setSelectedDate] = useState(moment().format('DD/MM/yyyy'))
    const [selectTime, setSelectedTime] = useState(moment().format('hh:mm'))

    const [selectedFromTime, setSelectedFromTime] = useState('')
    const [selectedToTime, setSelectedToTime] = useState('')

    const [timeSlot, setTimeSlots] = useState(['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'])
    const [colorArr, setColorArr] = useState([])
    const [eventData, setEventData] = useState(props.route.params.data)

    useEffect(() => {
        setEvent(eventData.EventName)
        setSelectedDate(moment(eventData.EventDate).format('DD/MM/yyyy'))
        setLocation(eventData.EventLocation)
        setnote(eventData.EventDescription)
        setSelectedFromTime(eventData.EventStartTime)
        setSelectedToTime(eventData.EventEndTime)
    }, [eventData])

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }

    const isFieldsValidated = () => {
        if (!event.trim()) {
            showMessage(MESSAGE.event)
            return false;
        } else if (!selectDate) {
            showMessage(MESSAGE.date);
            return false;
        } else if (!selectedFromTime) {
            showMessage(MESSAGE.fromTime);
            return false;
        } else if (!selectedToTime) {
            showMessage(MESSAGE.toTime);
            return false;
        } else if (timeSlot.indexOf(selectedToTime) <= timeSlot.indexOf(selectedFromTime)) {
            showMessage(MESSAGE.invalidTo)
            return false
        } else if (timeSlot.indexOf(selectedToTime) - timeSlot.indexOf(selectedFromTime) > 4) {
            showMessage(MESSAGE.invalidFrom)
            return false
        } else if (!location.trim()) {
            showMessage(MESSAGE.location);
            return false;
        }
        setLoading(true)
        updateEvent()
    }

    useEffect(() => {
        setLoading(true)
        Service.get(`${EndPoints.EventType}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setSelectColorId(res.data[0]._id)
                setSelectColor(res.data[0].EventColor)
                setColorArr(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })
    }, [])

   
    const updateEvent = () => {
        let data = {
            EventName: event,
            EventDate: moment(selectDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            EventStartTime: selectedFromTime,
            EventEndTime: selectedToTime,
            EventLocation: location,
            EventDescription: note,
            EventTypeId: selectColorId,
            CreatedBy: User.user.UserDetialId
        }
        Service.post(data, `${EndPoints.CalenderEventUpdate}/${eventData._id}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of update event', res)
                setDefaults()
                showMessageWithCallBack(MESSAGE.eventUpdate, () => {
                    props.route.params.onGoBack();
                    props.navigation.goBack();
                })
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of update event error', err)
        })
    }

    const selectColor = (item) => {
        setSelectColor(item.EventColor)
        setColorDropOpen(false)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(moment(date).format('DD/MM/yyyy'))
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        setSelectedTime(moment(time).format('hh:mm'))
        hideTimePicker();
    };

    const setDefaults = () => {
        setLocation('')
        setEvent('')
        setnote('')
        setFromDropOpen(false)
        setToDropOpen(false)
        setColorDropOpen(false)
        setSelectedToTime('')
        setSelectedFromTime('')
    };

    const fromTimeDropDown = () => {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={opacity}
                    style={[styles.subjectDateTime, styles.dropDownSmallWrap1]}
                    onPress={() => { setToDropOpen(false); setFromDropOpen(!isFromDropOpen); setColorDropOpen(false); }}>
                    {/* <Image style={styles.calIcon} source={Images.Clock} /> */}
                    <Clock style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                    <Text style={{ alignSelf: 'center', paddingStart: 20 }}>{selectedFromTime ? selectedFromTime : 'From'}</Text>
                    {/* <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} /> */}
                    <ArrowDown style={styles.dropDownArrowdatetime1} height={hp(1.51)} width={hp(1.51)} />
                </TouchableOpacity>
                {isFromDropOpen ?
                    <View style={styles.colorDropView}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFromDropOpen(false); setSelectedFromTime(item) }}>
                                    <Text style={{ padding: 10 }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={{ height: 200 }} />
                    </View>
                    :
                    null
                }
            </View>
        );
    };

    const toTimeDropDown = () => {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={opacity}
                    style={[styles.subjectDateTime, styles.dropDownSmallWrap2]}
                    onPress={() => { setToDropOpen(!isToDropOpen); setFromDropOpen(false); setColorDropOpen(false); }}>
                    {/* <Image style={styles.calIcon} source={Images.Clock} /> */}
                    <Clock style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                    <Text style={{ alignSelf: 'center', paddingStart: 20 }}>{selectedToTime ? selectedToTime : 'To'}</Text>
                    {/* <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} /> */}
                    <ArrowDown style={styles.dropDownArrowdatetime1} height={hp(1.51)} width={hp(1.51)} />
                </TouchableOpacity>
                {isToDropOpen ?
                    <View style={styles.colorDropView}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setToDropOpen(false); setSelectedToTime(item) }}>
                                    <Text style={{ padding: 10 }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={{ height: 200 }} />
                    </View>
                    :
                    null
                }
            </View>
        );
    };

    return (
        <View>
            {/* <TouchableOpacity><Text style={STYLE.openClassLink} onPress={toggleModal}>Event Calendar Entry</Text></TouchableOpacity> */}
            <View>
                <View style={styles.popupContent}>
                    <View style={styles.tabcontent}>
                        <KeyboardAwareScrollView>
                            <View style={styles.beforeBorder}>
                                <View style={styles.titleSave}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { props.route.params.onGoBack(); props.navigation.goBack(); }}>
                                        {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                                        <BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} />
                                    </TouchableOpacity>
                                    <Text h2 style={styles.titleTab}>Add a calendar entry</Text>
                                    <View style={styles.uploadCalendar}>
                                        <View style={styles.lessonstartButton}>
                                            {/* {!isLoading ?
                                                <ActivityIndicator
                                                    style={{ ...styles.buttonGrp, right: 30 }}
                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                    color={COLORS.buttonGreen} />
                                                : */}
                                            <TouchableOpacity
                                                onPress={() => isFieldsValidated()}
                                                style={[styles.buttonGrp, styles.commonButtonGreenheader]}
                                                activeOpacity={opacity}>
                                                {isLoading ?
                                                    <ActivityIndicator
                                                        // style={STYLE.commonButtonGreen}
                                                        size={Platform.OS == 'ios' ? 'small' : 'small'}
                                                        color={COLORS.white} />
                                                    :
                                                    <TickMarkWhite style={styles.checkWhiteIcon} height={hp(1.48)} width={hp(1.48)} />
                                                }

                                                {/* <Image style={[styles.checkWhiteIcon]} source={require('../../../../../assets/images/white-check-icon2.png')} /> */}
                                                {/* <TickMarkWhite style={styles.checkWhiteIcon} height={hp(1.48)} width={hp(1.48)} /> */}
                                                {/* <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text> */}
                                            </TouchableOpacity>


                                            {/* <TouchableOpacity style={styles.buttonGrp}>
                                                <Image style={styles.checkWhiteIcon} source={Images.CheckIconWhite} />
                                                <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text>
                                                </TouchableOpacity> */}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text label style={STYLE.labelCommon}>What event is it?</Text>
                                    <TextInput
                                        multiline={false}
                                        placeholder='Name of event'
                                        value={event}
                                        placeholderTextColor={COLORS.lightGray}
                                        style={styles.commonInputTextarea}
                                        onChangeText={eventName => setEvent(eventName)} />
                                </View>
                                <View style={styles.fieldWidthtwoMain}>
                                    <View style={styles.fieldWidthtwo1}>
                                        <Text label style={STYLE.labelCommon}>Date</Text>
                                        <TouchableOpacity onPress={() => showDatePicker()} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                            {/* <Image style={styles.calIcon} source={Images.CalenderIconSmall} /> */}
                                            <Calender style={styles.calIcon} height={hp(1.76)} width={hp(1.76)} />
                                            <View style={styles.subjectDateTime}>
                                                <View>
                                                    <Text style={styles.dateTimetextdummy}>{selectDate}</Text>
                                                </View>
                                                {/* <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} /> */}
                                                <ArrowDown style={styles.dropDownArrowdatetime} height={hp(1.51)} width={hp(1.51)} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={styles.fieldWidthtwo}>
                                    <Text label style={STYLE.labelCommon}>What time is it?</Text>
                                    <TouchableOpacity onPress={() => showTimePicker()} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                        <Image style={styles.calIcon} source={Images.Clock} />
                                        <View style={styles.subjectDateTime}>
                                            <View>
                                                <Text style={styles.dateTimetextdummy}>{selectTime}</Text>
                                            </View>
                                            <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} />
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                                </View>
                                <View style={styles.fieldWidthtwoMain}>
                                    <View style={styles.fieldWidthtwo}>
                                        <Text label style={STYLE.labelCommon}>Time From</Text>
                                        {fromTimeDropDown()}
                                    </View>
                                    <View style={styles.fieldWidthtwo}>
                                        <Text label style={STYLE.labelCommon}>Time To</Text>
                                        {toTimeDropDown()}
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text label style={STYLE.labelCommon}>Where?</Text>
                                    <View style={styles.copyInputParent}>
                                        <TextInput
                                            multiline={false}
                                            placeholder='Enter Location'
                                            value={location}
                                            placeholderStyle={styles.somePlaceholderStyle}
                                            style={styles.commonInputTextarea}
                                            onChangeText={location => setLocation(location)} />
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text label style={STYLE.labelCommon}>Notes</Text>
                                    <View style={styles.notes}>
                                        <View style={[styles.copyInputParent, styles.noteInput]}>
                                            <TextInput
                                                multiline={false}
                                                value={note}
                                                placeholderStyle={styles.somePlaceholderStyle}
                                                style={styles.commonInputTextarea}
                                                onChangeText={notes => setnote(notes)}
                                                 />
                                        </View>
                                        <View style={[styles.copyInputParent, styles.colorPicker]}>
                                            <TouchableOpacity onPress={() => { setColorDropOpen(!isColorDropOpen); setToDropOpen(false); setFromDropOpen(false) }} style={[styles.subjectDateTime, styles.dropDownSmallWrap, styles.dateandColor]}>
                                                <View style={styles.subjectDateTime}>
                                                    <TouchableOpacity>
                                                        <View style={[styles.colorSelect, { backgroundColor: selectedColor, }]}></View>
                                                    </TouchableOpacity>
                                                    <ArrowDown style={styles.dropDownArrowdatetime} height={hp(1.51)} width={hp(1.51)} />
                                                </View>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity>
                                                <CalendarUpload style={styles.uploadCalIcon} height={hp(5.20)} width={hp(5.20)} />
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>

                {
                    isColorDropOpen ?
                        <View style={styles.colorDropView}>
                            <FlatList
                                data={colorArr}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { setSelectColorId(item._id); selectColor(item) }} style={styles.colorButton}>
                                            <Image style={{ width: 30, height: 30, borderRadius: 5, backgroundColor: item.EventColor }} />
                                            <Text style={{ justifyContent: 'center' }}>   {item.EventType}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View> : null
                }
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
        </View>
    );
}
export default TeacherEventEdit;

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(0),
    },
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        top: hp(8),
    },
    popupContent: {
        width: '100%',
        marginTop: Platform.OS == 'android' ? hp(-1) : hp(3),
    },
    beforeBorder: {
        padding: hp(1.95),
        paddingBottom: hp(0.5),
    },
    afterBorder: {
        padding: hp(2.60),
        paddingTop: hp(0.5),
    },
    titleTab: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    uploadCalIcon: {
        width: hp(5.20),
        resizeMode: 'contain',
    },
    dateandColor: {
        marginRight: hp(1.84),
        bottom: hp(0.5),
    },
    uploadCalendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    buttonGrp: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
    },
    newCheckButton: {
        width: hp(4.92),
        height: hp(4.92),
        backgroundColor: COLORS.dashboardGreenButton,
        borderRadius: hp(0.9),
        overflow: 'hidden',
        paddingTop: hp(1.7),
        paddingLeft: hp(1.7),
        paddingRight: hp(1.7),
        paddingBottom: hp(1.7),
    },
    checkWhiteIcon: {
        width: hp(1.48),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    popupCustomButton: {
        paddingLeft: hp(4.42),
        paddingRight: hp(3.125),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
    },
    // commonInputTextarea: {
    //     height: hp(5.20),
    //     borderWidth: 1,
    //     borderColor: COLORS.borderGrp,
    //     borderRadius: hp(1),
    //     paddingTop: hp(1.5),
    //     paddingBottom: hp(1.5),
    //     paddingRight: hp(1.5),
    //     paddingLeft: hp(1.5),
    //     marginTop: hp(1.3),
    //     fontSize: hp(1.82),
    //     color: COLORS.darkGray,
    //     lineHeight: hp(2.60),
    //     fontFamily: FONTS.fontSemiBold,
    // },
    commonInputTextarea: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontSemiBold,
        // paddingHorizontal : 10,
        // alignContent : 'center',
        // alignItems : 'flex-start',
        // justifyContent : 'center'


    },
    field: {
        marginBottom: hp(2.5),
    },
    somePlaceholderStyle: {
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
    },
    fieldWidthtwoMain: {
        flexDirection: 'row',
        marginLeft: hp(-0.9),
        marginRight: hp(-0.9),
        marginBottom: hp(2.5),
        alignItems: 'center',
    },
    fieldWidthtwo: {
        width: '50%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    fieldWidthtwo1: {
        width: '100%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    entryData: {
        paddingLeft: hp(4.23),
        paddingRight: hp(4.23),
    },
    entryIcon: {
        width: hp(10),
        height: hp(10),
        resizeMode: 'contain',
        marginBottom: hp(2.28),
    },
    entryTitle: {
        fontSize: hp(1.37),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subjectDateTime: {
        alignItems: 'flex-start',
        width: '100%',
        position: 'relative',
    },
    dropDownSmallWrap: {
        height: 50,
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp(5.20),
        marginTop: hp(1.3),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
        paddingTop: hp('2.0%'),
        paddingBottom: hp('2.0%'),
    },
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight: hp(1.04),
        position: 'absolute',
        // top: hp(1.1),
        alignSelf: 'center',
        left: hp(1.4),
    },
    subjectDateTime: {
        alignItems: 'flex-start',
        width: '100%',
    },
    dropDownSmallWrap1: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp(5.20),
        marginTop: hp(1.3),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
    },
    dropDownSmallWrap2: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        // top: hp(0.5),
        borderColor: COLORS.borderGrp,
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        height: hp(5.20),
        marginTop: hp(1.3),
        paddingLeft: hp('2.0%'),
        paddingRight: hp('2.0%'),
    },
    dateTimetextdummy: {
        fontSize: hp(1.7),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        top: hp(-0.65),
        left: hp(2.5),
        position: 'absolute'
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(-0.8),
        top: hp(-0.2),
    },
    dropDownArrowdatetime1: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.6),
        alignSelf: 'center'
    },
    timeField: {
        flex: 0.20
    },
    noteInput: {
        width: '100%',
    },
    colorPicker: {
        width: '22%',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorSelect: {
        width: hp(2.86),
        height: hp(3.51),
        borderRadius: hp(0.8),
        left: hp(-0.78),
        position: 'absolute',
        top: hp(-1.3),
    },
    titleSave: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 10,
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(1.5),
        // top: Platform.OS == 'android' ? hp(1.5) : 0,
        alignSelf: 'center',
    },
    colorDropView: { position: "absolute", alignSelf: 'center', height: 'auto', width: 150, borderRadius: hp(1.23), backgroundColor: COLORS.white, left: 15, bottom: hp(11), padding: hp(1.84), borderColor: COLORS.borderGrp, borderWidth: 1, },
    colorButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: hp(1) },
    dateTimetextdummy1: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
});