import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { msgEvent, msgLocation, msgNote, opacity, showMessage } from "../../../utils/Constant";
import MESSAGE from "../../../utils/Messages";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";

const PopupdataSecond = (props) => {
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
    const [isColorDropOpen, setColorDropOpen] = useState(false)
    const [selectDate, setSelectedDate] = useState(moment().format('DD/MM/yyyy'))
    const [selectTime, setSelectedTime] = useState(moment().format('hh:mm'))

    const colorArr = [COLORS.blueButton, COLORS.yellowBorder, COLORS.purpleDark, COLORS.red, COLORS.buttonGreen]
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
        } else if (!location) {
            showMessage(MESSAGE.location);
            return false;
        } else if (!note) {
            showMessage(MESSAGE.note);
            return false;
        }
        saveEvent()
    }

    const saveEvent = () => {
        setLoading(true)
        let data = {
            EventName: event,
            EventDate: selectDate,
            EventTime: selectTime,
            EventLocation: location,
            EventTypeId: "604b5aac006a0306d00ab87c",
            CreatedBy: "603f7af4f5dc5d4bb4892df0"
        }
        console.log(data);

        Service.post(data, `${EndPoints.CalenderEvent}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setDefaults()
                showMessage(MESSAGE.eventAdded)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })
    }
    const selectColor = (item) => {
        setSelectColor(item)
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
        setSelectedDate(moment(date).format('yyyy-MM-DD'))
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
    };

    return (
        <View>
            {/* <TouchableOpacity><Text style={STYLE.openClassLink} onPress={toggleModal}>Event Calendar Entry</Text></TouchableOpacity> */}
            <TouchableOpacity
                style={styles.entryData}
                activeOpacity={opacity}
                onPress={toggleModal}>
                <Image style={styles.entryIcon} source={Images.NewEvents} />
                <Text style={styles.entryTitle}>New Event</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <KeyboardAwareScrollView>
                    <View style={styles.popupCard}>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} />
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
                                                placeholderTextColor={COLORS.lightGray}
                                                style={styles.commonInputTextarea}
                                                onChangeText={eventName => setEvent(eventName)} />
                                        </View>
                                    </View>
                                    <View style={styles.fieldWidthtwoMain}>
                                        <View style={styles.fieldWidthtwo}>
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
                                        <View style={styles.fieldWidthtwo}>
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
                                                <TouchableOpacity onPress={() => setColorDropOpen(true)} style={[styles.subjectDateTime, styles.dropDownSmallWrap]}>
                                                    <View style={styles.subjectDateTime}>
                                                        <TouchableOpacity>
                                                            <View style={[styles.colorSelect, { backgroundColor: selectedColor, }]}></View>
                                                        </TouchableOpacity>
                                                        <Image style={styles.dropDownArrowdatetime} source={Images.DropArrow} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.uploadCalendar}>
                                        <TouchableOpacity>
                                            <Image style={styles.uploadCalIcon} source={Images.UploadCalender} />
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
                                                    <Image style={styles.checkWhiteIcon} source={require('../../../assets/images/white-check-icon2.png')} />
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
                                                <TouchableOpacity onPress={() => selectColor(item)} style={styles.colorButton}>
                                                    <Image style={{ width: 30, height: 30, borderRadius: 5, backgroundColor: item }} />
                                                    <Text>{item}</Text>
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
        width: '50%',
        paddingLeft: hp(0.9),
        paddingRight: hp(0.9),
    },
    entryData: {
        paddingLeft: hp(4.23),
        paddingRight: hp(4.23),
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
    dateTimetextdummy: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
        top: hp(-0.75),
        left: hp(2.5),
        position: 'absolute'
    },
    dropDownArrowdatetime: {
        width: hp(1.51),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(0),
        top: hp(-0.2),
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
        top: hp(-1.3),
    },

    colorDropView: { position: "absolute", alignSelf: 'center', height: 300, width: 150, borderRadius: 10, backgroundColor: COLORS.dashboardBorder, right: 15, bottom: 80, padding: 15 },
    colorButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
});