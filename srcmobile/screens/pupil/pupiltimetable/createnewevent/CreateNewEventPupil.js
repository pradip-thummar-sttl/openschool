import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';
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

const CreateNewEventPupil = (props) => {
    console.log('props', props);
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

    const [timeSlot, setTimeSlots] = useState(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00'])
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
        if (!event) {
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
        } else if (!location) {
            showMessage(MESSAGE.location);
            return false;
        } else if (!note) {
            showMessage(MESSAGE.note);
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
            EventDate: moment(new Date(selectDate)).format('yyyy-DD-MM'),
            EventStartTime: selectedFromTime,
            EventEndTime: selectedToTime,
            EventLocation: location,
            EventDescription: note,
            EventTypeId: selectColorId,
            CreatedBy: User.user.UserDetialId
        }

        Service.post(data, `${EndPoints.CalenderEvent}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setDefaults()
                showMessageWithCallBack(MESSAGE.eventAdded, () => {
                    props.route.params.onGoBack();
                    props.navigation.goBack();
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
            <View>
                <TouchableOpacity
                    activeOpacity={opacity}
                    style={[styles.subjectDateTime, styles.dropDownSmallWrap1]}
                    onPress={() => { setFromDropOpen(true) }}>
                    <Image style={styles.calIcon} source={Images.Clock} />
                    <Text style={{ alignSelf: 'center', paddingStart: 20 }}>{selectedFromTime ? selectedFromTime : 'From'}</Text>
                    <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} />
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
                    style={[styles.subjectDateTime, styles.dropDownSmallWrap1]}
                    onPress={() => { setToDropOpen(true) }}>
                    <Image style={styles.calIcon} source={Images.Clock} />
                    <Text style={{ alignSelf: 'center', paddingStart: 20 }}>{selectedToTime ? selectedToTime : 'To'}</Text>
                    <Image style={styles.dropDownArrowdatetime1} source={Images.DropArrow} />
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
                                    <Text h2 style={styles.titleTab}><TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { props.route.params.onGoBack(); props.navigation.goBack(); }}>
                                        <Image style={styles.arrow} source={Images.backArrow} />
                                    </TouchableOpacity>
                                    Add a calendar entry
                                </Text>
                                    <View style={styles.uploadCalendar}>
                                        <View style={styles.lessonstartButton}>
                                            {isLoading ?
                                                <ActivityIndicator
                                                    style={{ ...styles.buttonGrp, right: 30 }}
                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                    color={COLORS.buttonGreen} />
                                                :
                                                <TouchableOpacity
                                                    onPress={isFieldsValidated}
                                                    style={[styles.buttonGrp, styles.newCheckButton]}
                                                    activeOpacity={opacity}>
                                                    <Image style={[styles.checkWhiteIcon]} source={require('../../../../assets/images/white-check-icon2.png')} />
                                                    {/* <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text> */}
                                                </TouchableOpacity>
                                            }

                                            {/* <TouchableOpacity style={styles.buttonGrp}>
                                                <Image style={styles.checkWhiteIcon} source={Images.CheckIconWhite} />
                                                <Text style={[STYLE.commonButtonGreenDashboardSide, styles.popupCustomButton]}>save entry</Text>
                                                </TouchableOpacity> */}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text label style={STYLE.labelCommon}>What event is it?</Text>
                                    <View style={styles.copyInputParent}>
                                        <TextInput
                                            multiline={false}
                                            placeholder='Name of event'
                                            value={event}
                                            placeholderStyle={styles.somePlaceholderStyle}
                                            placeholderTextColor={COLORS.lightGray}
                                            style={styles.commonInputTextarea}
                                            onChangeText={eventName => setEvent(eventName)} />
                                    </View>
                                </View>
                                <View style={styles.fieldWidthtwoMain}>
                                    <View style={styles.fieldWidthtwo1}>
                                        <Text label style={STYLE.labelCommon}>What day is it?</Text>
                                        <TouchableOpacity onPress={() => showDatePicker()} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                            <Image style={styles.calIcon} source={Images.CalenderIconSmall} />
                                            <View style={styles.subjectDateTime}>
                                                <View>
                                                    <Text style={styles.dateTimetextdummy}>{selectDate}</Text>
                                                </View>
                                                <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} />
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
                                        <Text label style={STYLE.labelCommon}>What time is it?</Text>
                                        {fromTimeDropDown()}
                                    </View>
                                    <View style={styles.fieldWidthtwo}>
                                        <Text label style={STYLE.labelCommon}></Text>
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
                                                onChangeText={notes => setnote(notes)} />
                                        </View>
                                        <View style={[styles.copyInputParent, styles.colorPicker]}>
                                            <TouchableOpacity onPress={() => setColorDropOpen(true)} style={[styles.subjectDateTime, styles.dropDownSmallWrap, styles.dateandColor]}>
                                                <View style={styles.subjectDateTime}>
                                                    <TouchableOpacity>
                                                        <View style={[styles.colorSelect, { backgroundColor: selectedColor, }]}></View>
                                                    </TouchableOpacity>
                                                    <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image style={styles.uploadCalIcon} source={Images.UploadCalender} />
                                            </TouchableOpacity>
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
                                            <Text>{item.EventType}</Text>
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
export default CreateNewEventPupil;

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
        marginTop: hp(3.88),
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
        marginBottom: hp(3),
        top: hp(0.7),
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
        top: hp(1.1),
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(1),
        top: hp(0.65),
    },
    colorDropView: { position: "absolute", alignSelf: 'center', height: 'auto', width: hp(16), borderRadius: hp(1.23), backgroundColor: COLORS.white, left: 15, bottom: hp(11), padding: hp(1.84), borderColor: COLORS.borderGrp, borderWidth: 1, },
    colorButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: hp(1) },
    dateTimetextdummy1: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        alignSelf: 'center',
    },
});