import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground } from "react-native";
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
import PopStyle from '../popup/newPupilAndTeacherAddPopupStyle'

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
                <View style={PopStyle.popupLarge}>
                    <TouchableOpacity style={PopStyle.cancelButton} onPress={() => { toggleModal() }}>
                        <CloseBlack style={PopStyle.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={PopStyle.beforeBorder}>
                        <Text h2 style={PopStyle.titleTab}>Add New Pupils</Text>
                        <View style={PopStyle.entryContentMain}>
                            <View style={PopStyle.btnSelectionView}>
                                <PopupdataSecondCSVUpload userType={'Pupil'} />
                            </View>
                            <View style={PopStyle.btnSelectionView}>
                                <TouchableOpacity activeOpacity={opacity} style={PopStyle.entryData} onPress={() => { setModalVisible(false); props.navigateToAddPupil() }}>
                                    <ImportIndividual style={PopStyle.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                                    <Text style={PopStyle.entryTitle}>Add Mnually</Text>
                                </TouchableOpacity>
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