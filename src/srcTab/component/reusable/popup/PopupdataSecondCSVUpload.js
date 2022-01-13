import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity, showMessage } from "../../../../utils/Constant";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import ImportCSV from "../../../../svg/school/teachermanagment/ImportCSV";
import UploadCSV from "../../../../svg/school/teachermanagment/UploadCSV";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import DocumentPicker from "react-native-document-picker";
import { User } from "../../../../utils/Model";
import MESSAGE from "../../../../utils/Messages";
import PopStyle from '../popup/newPupilAndTeacherAddPopupStyle'

const PopupdataSecondCSVUpload = (props) => {
    const isFromDashboard = props.isFromDashboard
    const [isModalVisible, setModalVisible] = useState();
    const [isLoader, setLoader] = useState(false);

    const [csv, setCSV] = useState(null)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const addCSV = () => {
        try {
            DocumentPicker.pick({ type: [DocumentPicker.types.xlsx,], }).then((results) => {
                uploadProfile(results)
            });

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }

    const uploadProfile = (csv) => {

        let data = new FormData();
        let url;

        if (props.userType == 'Teacher') {
            url = `${EndPoints.TeacherUpload}/${User.user.UserDetialId}`
        } else {
            url = `${EndPoints.PupilUpload}/${User.user.UserDetialId}`
        }

        data.append('file', {
            uri: csv.uri,
            name: csv.name,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        setLoader(true)
        Service.postFormData(data, url, (res) => {
            if (res.code == 200) {
                showMessage(MESSAGE.inviteSent)
                console.log('response of save lesson', res)
            } else {
                showMessage(res.message)
            }
            setLoader(false)
        }, (err) => {
            setLoader(false)
            console.log('response of get all lesson error', err)
        })
    }
    return (
        <View>
            <TouchableOpacity style={PopStyle.entryData} activeOpacity={opacity} onPress={toggleModal}>
                <ImportCSV style={PopStyle.entryIcon} height={hp(11.19)} width={hp(11.19)} />
                <Text style={PopStyle.popTitle}>Import From CSV</Text>
            </TouchableOpacity>
          
            <Modal isVisible={isModalVisible}>
                <View style={PopStyle.popupLarge}>
                    <Text h2 style={[PopStyle.titleTab, STYLE.centerText]}>Upload CSV</Text>
                    <TouchableOpacity style={PopStyle.cancelButton} onPress={toggleModal}>
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={PopStyle.popupCard}>
                        <TouchableOpacity style={PopStyle.upload} onPress={() => addCSV()}>
                            <UploadCSV height={43.57} width={52.91} />
                            <Text style={PopStyle.labelUpload}>Click here to select source</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    isLoader &&
                    <ActivityIndicator
                        style={PopStyle.indicaterStyle}
                        size={'large'}
                        color={COLORS.yellowDark} />
                }
            </Modal>
        </View>
    );
}
export default PopupdataSecondCSVUpload;
