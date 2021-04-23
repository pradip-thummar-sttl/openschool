import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Modal from 'react-native-modal';

const PopupHomeWorkSave = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <TouchableOpacity onPress={toggleModal} style={styles.buttonGroup}>
                {/* <Image style={[styles.addIcon, styles.iconTop]} source={require('../../../assets/images/checkIcon2.png')} /> */}
                <Text style={styles.commonButtonGreenheader}>Submit as homework</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={toggleModal}>
                        <Image style={STYLE.cancelButtonIcon} source={require('../../../assets/images/cancel2.png')} />
                    </TouchableOpacity>
                    <ImageBackground source={require('../../../assets/images/popup_back.png')} style={STYLE.popupBack} />
                    <View style={styles.userProfile}><Image style={styles.userProfileimage} source={require('../../../assets/images/userProfilePopup.png')} /></View>
                    <View style={STYLE.popupContentMain}>
                        <Text style={styles.popupTitle}>You are saving feedback to your pupil</Text>
                        <Text style={[styles.popupText, STYLE.centerText]}>By pressing save this pupil will be notified of your feedback. You can edit your feedback at anytime.</Text>
                        <TouchableOpacity
                            onPress={() => { toggleModal(); props.onSetHomework() }}>
                            <Text style={STYLE.commonButtonGreenDashboardSide}>Save Feedback</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default PopupHomeWorkSave;

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
        top: hp(1.52),
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
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
        width: '100%',
    },
    popupTitle: {
        fontSize: hp(2.34),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(2.6),
        textAlign: 'center',
        paddingLeft: wp(5.5),
        paddingRight: wp(5.5),
    },
    popupText: {
        fontSize: wp(3.46),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGray,
        marginBottom: hp(3.5),
        lineHeight: hp(2.6),
        paddingLeft: wp(7.5),
        paddingRight: wp(7.5),
    },
});