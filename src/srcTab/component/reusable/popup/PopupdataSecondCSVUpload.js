import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity } from "../../../../utils/Constant";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import ImportCSV from "../../../../svg/school/teachermanagment/ImportCSV";

const PopupdataSecondCSVUpload = (props) => {
    const isFromDashboard = props.isFromDashboard
    console.log('isFromDashboard', isFromDashboard);

    const [isModalVisible, setModalVisible] = useState();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.entryData}
                activeOpacity={opacity}
                onPress={toggleModal}>
                {/* <Image style={styles.entryIcon} source={Images.NewEvents} /> */}
                <ImportCSV style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                <Text style={styles.entryTitle}>Import From CSV</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <KeyboardAwareScrollView>
                    <View style={styles.popupCard}>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            {/* <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} /> */}
                            <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        </View>
    );
}
export default PopupdataSecondCSVUpload;

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