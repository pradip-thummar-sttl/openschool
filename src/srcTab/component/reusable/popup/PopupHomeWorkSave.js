import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Modal from 'react-native-modal';
import { baseUrl, opacity } from "../../../../utils/Constant";
import TickMarkWhite from "../../../../svg/teacher/lessonhwplanner/TickMark_White";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import { User } from "../../../../utils/Model";
import HWSubmitBg from "../../../../svg/teacher/lessonhwplanner/HWSubmitBg";

const PopupHomeWorkSave = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const initialRender = useRef(true);

    const toggleModal = (props) => {
        setModalVisible(!isModalVisible);
    };

    React.useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            setModalVisible(false);
        }
    }, [props.isModalVisible]);

    return (
        <View>
            {!props.isMarked && props.isSubmitted ?
                <TouchableOpacity onPress={toggleModal} style={[styles.buttonGroup, styles.markHomeworkBtn, { marginHorizontal: 10 }]}>
                    {/* <Image style={[styles.addIcon, styles.iconTop]} source={require('../../../../assets/images/checkIcon2.png')} /> */}
                    <TickMarkWhite style={[styles.addIcon, styles.iconTop]} height={hp(1.55)} width={hp(1.55)} />
                    <Text style={styles.markHomeworktext}>mark homework</Text>
                </TouchableOpacity>
                :
                null
            }
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={toggleModal}>
                        {/* <Image style={STYLE.cancelButtonIcon} source={require('../../../../assets/images/cancel2.png')} /> */}
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    {/* <ImageBackground source={require('../../../../assets/images/popup_back.png')} style={STYLE.popupBack} /> */}
                    <HWSubmitBg style={STYLE.popupBack} height={hp(10.41)} width={'100%'} />
                    <View style={styles.userProfile}><Image style={styles.userProfileimage} source={{ uri: baseUrl + User.user.ProfilePicture }} /></View>
                    <View style={STYLE.popupContentMain}>
                        <Text style={styles.popupTitle}>You are saving feedback to your pupil</Text>
                        <Text style={[styles.popupText, STYLE.centerText]}>By pressing save pupil will be notified. You can edit your feedback at any time. </Text>

                        <TouchableOpacity activeOpacity={opacity}
                            onPress={() => { props.onSetHomework() }}
                            style = {styles.markHomeworkBtnn}>
                            {props.isLoading ?
                                <ActivityIndicator
                                    // style={STYLE.commonButtonGreenDashboardSide}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.white} />
                                :
                                <Text style={styles.markHomeworkBtnnText}>Save</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default PopupHomeWorkSave;

const styles = StyleSheet.create({
    markHomeworkBtnnText : {
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    markHomeworkBtnn : {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        // paddingLeft: hp(4.175),
        // paddingRight: hp(2.50),
        height: hp(5.20),
        width : 100,
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        justifyContent : 'center',
        alignItems : 'center'
    },
    popupCard: {
        backgroundColor: COLORS.white,
        borderRadius: hp(1.3),
        width: hp(69.66),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
    },
    userProfile: {
        position: 'absolute',
        top: hp(2.5),
    },
    userProfileimage: {
        width: hp(7),
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
        // marginRight: hp(1.69),
    },
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
        position: 'absolute',
        // top: hp(1.52),
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
    markHomeworkBtn: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        width: 160,
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    markHomeworktext: {
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    popupTitle: {
        fontSize: hp(2.34),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(2.6),
    },
    popupText: {
        fontSize: hp(1.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginBottom: hp(3.5),
        lineHeight: hp(2.6),
    },
});