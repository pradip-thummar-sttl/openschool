import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { msgEvent, msgLocation, msgNote, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { User } from "../../../../utils/Model";
import NewEvent from "../../../../svg/teacher/timetable/NewEvent";
import Clock from "../../../../svg/teacher/dashboard/Clock";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import Calender from "../../../../svg/teacher/dashboard/Calender";
import CalendarUpload from "../../../../svg/teacher/timetable/CalendarUpload";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import TickMarkWhite from "../../../../svg/teacher/lessonhwplanner/TickMark_White";
import ImportIndividual from "../../../../svg/school/teachermanagment/ImportIndividual";
import ImportCSV from "../../../../svg/school/teachermanagment/ImportCSV";

const PopupdataSecond = (props) => {
    const isFromDashboard = props.isFromDashboard
    console.log('isFromDashboard', isFromDashboard);
    const [isModalVisible, setModalVisible] = useState(isFromDashboard == true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setFromDropOpen(false)
        setToDropOpen(false)
        setColorDropOpen(false)
        setSelectedToTime('')
        setSelectedFromTime('')
        if (props.goBack != undefined) {
            props.goBack()
        }
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

    // this.state = {
    //     userName: '',
    //     password: '',
    // }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

    const isFieldsValidated = () => {
        console.log(timeSlot.indexOf(selectedToTime) - timeSlot.indexOf(selectedFromTime));
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
        saveEvent()
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

    const saveEvent = () => {
        setLoading(true)
        let data = {
            EventName: event,
            EventDate: moment(selectDate, 'DD/MM/yyyy').format('yyyy-MM-DD'),
            EventStartTime: selectedFromTime,
            EventEndTime: selectedToTime,
            EventLocation: location,
            EventDescription: note,
            EventTypeId: selectColorId,
            CreatedBy: User.user._id
        }
        console.log(data, selectDate);

        Service.post(data, `${EndPoints.CalenderEvent}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setDefaults()
                showMessageWithCallBack(MESSAGE.eventAdded, () => {
                    toggleModal()
                })
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
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
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
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
            <View style={[styles.dateWhiteBoard, styles.timeField]}>
                <TouchableOpacity
                    activeOpacity={opacity}
                    onPress={() => { setToDropOpen(false); setFromDropOpen(!isFromDropOpen); setColorDropOpen(false); }}>
                    <View style={[styles.subjectDateTime, styles.dropDownSmallWrap1]}>
                        {/* <Image style={styles.timeIcon} source={Images.Clock} /> */}
                        <Clock style={styles.timeIcon} height={hp(1.76)} width={hp(1.76)} />
                        <Text style={styles.dateTimetextdummy1}>{selectedFromTime ? selectedFromTime : 'From'}</Text>
                        {/* <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} /> */}
                        <ArrowDown style={styles.dropDownArrowdatetime1} height={hp(1.51)} width={hp(1.51)} />
                    </View>
                </TouchableOpacity>
                {isFromDropOpen ?
                    <View style={styles.colorDropView2}>
                        <FlatList
                            data={timeSlot}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFromDropOpen(false); setSelectedFromTime(item) }}>
                                    <Text style={{ padding: hp(1.23) }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={{ height: hp(24.63) }} />
                    </View>
                    :
                    null
                }
            </View>
        );
    };

    const toTimeDropDown = () => {
        return (
            <View style={[styles.dateWhiteBoard, styles.timeField]}>
                <TouchableOpacity
                    activeOpacity={opacity}
                    onPress={() => { setToDropOpen(!isToDropOpen); setFromDropOpen(false); setColorDropOpen(false); }}>
                    <View style={[styles.subjectDateTime, styles.dropDownSmallWrap1]}>
                        {/* <Image style={styles.timeIcon} source={Images.Clock} /> */}
                        <Clock style={styles.timeIcon} height={hp(1.76)} width={hp(1.76)} />
                        <Text style={styles.dateTimetextdummy1}>{selectedToTime ? selectedToTime : 'To'}</Text>
                        {/* <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} /> */}
                        <ArrowDown style={styles.dropDownArrowdatetime1} height={hp(1.51)} width={hp(1.51)} />
                    </View>
                </TouchableOpacity>
                {isToDropOpen ?
                    <View style={styles.colorDropView2}>
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
            {
                isFromDashboard == true ?
                    null
                    :
                    <TouchableOpacity
                        style={styles.entryData}
                        activeOpacity={opacity}
                        onPress={toggleModal}>
                        {/* <Image style={styles.entryIcon} source={Images.NewEvents} /> */}
                        <NewEvent style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                        <Text style={styles.entryTitle}>New Event</Text>
                    </TouchableOpacity>
            }
            <Modal isVisible={isModalVisible}>
                <KeyboardAwareScrollView>
                    <View style={styles.popupCard}>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            {/* <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} /> */}
                            <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                        <View style={styles.popupContent}>
                            <View style={styles.tabcontent}>
                                <View style={styles.beforeBorder}>
                                    <Text h2 style={styles.titleTab}>Add a calendar entry</Text>
                                    <View style={styles.field}>
                                        <Text label style={STYLE.labelCommon}>What event is it?</Text>
                                        <View style={styles.copyInputParent}>
                                            <TextInput
                                                multiline={false}
                                                placeholder='Name of event'
                                                value={event}
                                                placeholderStyle={styles.somePlaceholderStyle}
                                                placeholderTextColor={COLORS.popupPlaceHolder}
                                                style={styles.commonInputTextarea}
                                                onChangeText={eventName => setEvent(eventName)} />
                                        </View>
                                    </View>
                                    <View style={styles.fieldWidthtwoMain}>
                                        <View style={styles.fieldWidthtwo}>
                                            <Text label style={STYLE.labelCommon}>What day is it?</Text>
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
                                        <View style={styles.fieldWidthtwo1}>
                                            <Text label style={STYLE.labelCommon}>What time is it?</Text>
                                            {/* <TouchableOpacity onPress={() => showTimePicker()} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                                <Image style={styles.calIcon} source={Images.Clock} />
                                                <View style={styles.subjectDateTime}>
                                                    <View>
                                                        <Text style={styles.dateTimetextdummy}>{selectTime}</Text>
                                                    </View>
                                                    <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} />
                                                </View>
                                            </TouchableOpacity> */}
                                            {fromTimeDropDown()}
                                        </View>
                                        <View style={styles.fieldWidthtwo2}>
                                            <Text label style={STYLE.labelCommon}> </Text>
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
                                                placeholderTextColor={COLORS.popupPlaceHolder}
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
                                                    onChangeText={notes => setnote(notes)} />
                                            </View>
                                            <View style={[styles.copyInputParent, styles.colorPicker]}>
                                                <TouchableOpacity onPress={() => { setColorDropOpen(!isColorDropOpen); setToDropOpen(false); setFromDropOpen(false) }} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                                    <View style={styles.subjectDateTime}>
                                                        <View style={[styles.colorSelect, { backgroundColor: selectedColor, }]}></View>
                                                        {/* <Image style={styles.dropDownArrowdatetime2} source={Images.DropArrow} /> */}
                                                        <ArrowDown style={styles.dropDownArrowdatetime2} height={hp(1.51)} width={hp(1.51)} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.uploadCalendar}>
                                        <TouchableOpacity>
                                            {/* <Image style={styles.uploadCalIcon} source={Images.UploadCalender} /> */}
                                            <CalendarUpload style={styles.uploadCalIcon} height={hp(5.20)} width={hp(5.20)} />
                                        </TouchableOpacity>
                                        <View style={styles.lessonstartButton}>
                                            {isLoading ?
                                                <ActivityIndicator
                                                    style={{ ...styles.buttonGrp, right: 30 }}
                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                    color={COLORS.buttonGreen} />
                                                :
                                                <TouchableOpacity
                                                    onPress={isFieldsValidated}
                                                    style={styles.buttonGrp}
                                                    activeOpacity={opacity}>
                                                    {/* <Image style={styles.checkWhiteIcon} source={require('../../../../assets/images/white-check-icon2.png')} /> */}
                                                    <TickMarkWhite style={styles.checkWhiteIcon} height={hp(1.48)} width={hp(1.48)} />
                                                    <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text>
                                                </TouchableOpacity>
                                            }

                                            {/* <TouchableOpacity style={styles.buttonGrp}>
                                                <Image style={styles.checkWhiteIcon} source={Images.CheckIconWhite} />
                                                <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text>
                                                </TouchableOpacity> */}
                                        </View>
                                    </View>
                                </View>
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
                </KeyboardAwareScrollView>
            </Modal>
        </View>
    );
}
export default PopupdataSecond;

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
        fontSize: hp(3.125),
        fontFamily: FONTS.fontBold,
        lineHeight: hp(4.55),
        color: COLORS.darkGray,
        marginBottom: hp(6.51),
    },
    uploadCalIcon: {
        width: hp(5.20),
        resizeMode: 'contain',
    },
    uploadCalendar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3.90),
        marginTop: hp(1.95),
    },
    buttonGrp: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
    },
    checkWhiteIcon: {
        width: hp(1.48),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(1.7),
        top: 'auto',
        zIndex: 9,
    },
    popupCustomButton: {
        paddingLeft: hp(4.42),
        paddingRight: hp(3.125),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
    },
    commonInputTextarea: {
        height: hp(5.20),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontSemiBold,
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
        width: '40%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    fieldWidthtwo1: {
        width: '30%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    fieldWidthtwo2: {
        width: '30%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    entryData: {
        marginRight: 30,
        alignItems: 'center'
    },
    entryIcon: {
        width: hp(11.19),
        height: hp(11.19),
        resizeMode: 'contain',
        marginBottom: hp(2.6),
    },
    entryTitle: {
        fontSize: hp(1.56),
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
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
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
    calIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight: hp(1.04),
        position: 'absolute',
        //top: hp(1.1),
        left: hp(1.4),
    },
    subjectDateTime: {
        alignItems: 'flex-start',
        width: '100%',
    },
    dateTimetextdummy: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        // top: hp(-0.75),
        left: hp(2.5),
        // position: 'absolute'
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(0),
        top: hp(0.5),
    },
    dropDownArrowdatetime2: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(0),
        top: hp(-0.8),
    },
    notes: {
        flexDirection: 'row',
    },
    noteInput: {
        width: '80%',
    },
    colorPicker: {
        width: '18%',
        marginLeft: '2%',
        alignSelf: 'flex-end',
    },
    colorSelect: {
        width: hp(2.86),
        height: hp(3.51),
        borderRadius: hp(0.8),
        left: hp(-0.78),
        position: 'absolute',
        top: hp(-1.75),
    },
    // colorDropView: { position: "absolute", alignSelf: 'center', height: 200, width: 150, borderRadius: 10, backgroundColor: COLORS.white, right: 15, bottom: 80, padding: 15, borderColor: COLORS.dashboardBorder, borderWidth: 1.5 },
    // colorButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
    colorDropView: { position: "absolute", alignSelf: 'center', height: 'auto', width: hp(19.53), borderRadius: hp(1.23), backgroundColor: COLORS.white, right: hp(2.6), bottom: hp(19.5), padding: hp(1.84), borderColor: COLORS.borderGrp, borderWidth: 1, },
    colorDropView2: { position: "absolute", alignSelf: 'center', height: 'auto', width: hp(19.53), borderRadius: hp(1.23), backgroundColor: COLORS.white, right: hp(0), bottom: hp(6), padding: hp(0.5), borderColor: COLORS.borderGrp, borderWidth: 1, },
    colorButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: hp(1.30) },
    timeField: {
        flex: 0.20
    },
    dateWhiteBoard: {
    },
    subjectText: {
        flexDirection: 'row',
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        fontSize: hp(1.8),
        marginBottom: hp(0.8),
    },
    timeIcon: {
        resizeMode: 'contain',
        width: hp(1.76),
        marginRight: hp(1.04),
        alignSelf: 'center'
    },
    dateTimetextdummy1: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
    dropDownArrowdatetime1: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.6),
        alignSelf: 'center'
    },

});