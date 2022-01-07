import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Modal from 'react-native-modal';
import { opacity } from "../../../../utils/Constant";
import AddWhite from "../../../../svg/teacher/timetable/Add_White";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import ImportIndividual from "../../../../svg/school/teachermanagment/ImportIndividual";
import PopupdataSecondCSVUpload from "./PopupdataSecondCSVUpload";
const PopupaddnewdataPM = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View>
            <TouchableOpacity
                style={styles.buttonGroup}
                activeOpacity={opacity}
                onPress={toggleModal}>
                <AddWhite style={styles.addIcon} width={hp(1.55)} height={hp(1.55)} />
                <Text style={styles.commonButtonGreenheader}>New Pupil</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupLarge}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { toggleModal() }}>
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={styles.popupContent}>
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={[styles.titleTab, STYLE.centerText]}>Add New Pupils</Text>
                                <View style={styles.entryContentMain}>
                                    <PopupdataSecondCSVUpload userType={'Pupil'} />
                                   
                                    <TouchableOpacity activeOpacity={opacity} style={styles.entryData} onPress={() => { setModalVisible(false); props.navigateToAddPupil() }}>
                                        <ImportIndividual style={styles.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                                        <Text style={styles.entryTitle}>Add Mnually</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default PopupaddnewdataPM;

const styles = StyleSheet.create({
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(1),
    },
    popupLarge: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        width: hp(80.59),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        paddingBottom: hp(6.5),
    },
    titleTab: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(4.5),
        marginTop: hp(4.5),
    },
    entryContentMain: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor : 'red'
        // marginLeft: hp(-4.23),
        // marginRight: hp(-4.23),
    },
    entryData: {
        width: hp(15),
        height: hp(20),
        marginLeft: 30,
        justifyContent:'center',
        alignItems:'center',
        alignItems: 'center',
        // backgroundColor : 'red',
    },
    entryIcon: {
        resizeMode: 'contain',
        marginBottom: Platform.OS === 'android' ? 0 : hp(2.6),
    },
    entryTitle: {
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
        right : 14,
      bottom : Platform.OS === 'android' ? 10.5 : 0
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(1.8),
        zIndex: 9,
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
});