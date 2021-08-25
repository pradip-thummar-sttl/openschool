import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Modal from 'react-native-modal';
import { baseUrl } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import TickMarkWhite from "../../../../svg/teacher/lessonhwplanner/TickMark_White";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import HWSubmitBg from "../../../../svg/teacher/lessonhwplanner/HWSubmitBg";

const Popuphomework = (props) => {
    const [isModalVisible, setModalVisible] = useState(true);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <TouchableOpacity onPress={() => props.onOpenPopup()} style={styles.buttonGroup}>
                {/* <Image style={[styles.addIcon, styles.iconTop]} source={require('../../../../assets/images/checkIcon2.png')} /> */}
                <TickMarkWhite style={[styles.addIcon, styles.iconTop]} height={hp(1.55)} width={hp(1.55)} />
                <Text style={styles.commonButtonGreenheader}>{props.hwBtnName}</Text>
            </TouchableOpacity>
            <Modal isVisible={props.isVisible}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={() => { props.onClose() }}>
                        {/* <Image style={STYLE.cancelButtonIcon} source={require('../../../../assets/images/cancel2.png')} /> */}
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    {/* <ImageBackground source={require('../../../../assets/images/popup_back.png')} style={STYLE.popupBack} /> */}
                    <HWSubmitBg style={STYLE.popupBack} height={hp(6.4)} width={'100%'} />
                    <View style={styles.userProfile}><Image style={styles.userProfileimage} source={{ uri: baseUrl + User.user.ProfilePicture }} /></View>
                    <View style={STYLE.popupContentMain}>
                        <Text style={styles.popupTitle}>You are setting homework for this class</Text>
                        <Text style={[styles.popupText, STYLE.centerText]}>By pressing set homework the pupils in this class will be notified. You can edit this class homework at any time. </Text>
                        <TouchableOpacity onPress={() => props.setHomework()}>
                            {props.isHomeworkLoading ?
                                <ActivityIndicator
                                    style={{ alignSelf: 'center' }}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.dashboardGreenButton} />
                                :
                                <Text style={STYLE.commonButtonGreenDashboardSide}>ok, set homework</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Popuphomework;

const styles = StyleSheet.create({
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.3),
        width: wp(89.33),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
    userProfile: {
        top: hp(9),
        width: 55,
        height: 55,
        borderWidth: 2,
        borderColor: COLORS.white,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        position: 'absolute',
        justifyContent: 'center'
    },
    userProfileimage: {
        width: 55,
        height: 55,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    commonInputTextarea: {
        width: hp(36.97),
        height: hp(10.67),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        borderRadius: hp(1.3),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingRight: hp(1.5),
        paddingLeft: hp(1.5),
        marginTop: hp(1.3),
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight: hp(2.60),
        fontFamily: FONTS.fontRegular,
    },
    copyInputParent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyIcon: {
        width: hp(1.98),
        resizeMode: 'contain',
    },
    copyIconMain: {
        top: hp(0.75),
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(1.69),
    },
    addIcon: {
        width: hp(1.4),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(1.8),
        zIndex: 9,
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: 14,
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4),
        paddingRight: hp(2),
        height: 40,
        paddingTop: 9,
        paddingBottom: 9,
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    popupTitle: {
        fontSize: hp(1.98),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(1.2),
        paddingLeft: wp(7.5),
        paddingRight: wp(7.5),
        textAlign: 'center',
        marginTop: 35,
    },
    popupText: {
        fontSize: wp(3.46),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginBottom: hp(3.5),
        lineHeight: hp(2.6),
        paddingLeft: wp(8.5),
        paddingRight: wp(8.5),
    },
});