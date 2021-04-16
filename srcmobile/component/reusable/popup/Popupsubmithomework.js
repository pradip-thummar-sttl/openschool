import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Modal from 'react-native-modal';

const Popuphomework = (props) => {
    const [isModalVisible, setModalVisible] = useState(true);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            {/* <TouchableOpacity onPress={toggleModal} style={styles.buttonGroup}>
                <Image style={[styles.addIcon, styles.iconTop]} source={require('../../../assets/images/checkIcon2.png')} />
                <Text style={styles.commonButtonGreenheader}>Submit homework</Text>
            </TouchableOpacity> */}
            <Modal isVisible={true}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={toggleModal}>
                        <Image style={STYLE.cancelButtonIcon} source={require('../../../assets/images/cancel2.png')} />
                    </TouchableOpacity>
                    <ImageBackground source={require('../../../assets/images/popup_back.png')} style={STYLE.popupBack} />
                    <View style={STYLE.popupContentMain}>
                        <Text style={styles.popupTitle}>Ready to submit your homework?</Text>
                        <Text style={[styles.popupText, STYLE.centerText]}>You are submitting your homework to your teacher. You can review and edit your work in the homework section of your lessons. You will be notified when your teacher has marked</Text>
                        <TouchableOpacity onPress={()=>props.OnSubmitHomeworkPress()}>
                            <Text style={STYLE.commonButtonGreenDashboardSide}>yes, submit my homework</Text>
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
        marginRight: hp(1.69),
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
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,
    },
    popupTitle: {
        fontSize: wp(4.8),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
        marginBottom: hp(2.6),
        textAlign:'center',
        paddingLeft:wp(4.55),
        paddingRight:wp(4.55),
    },
    popupText: {
        fontSize: hp(1.9),
        fontFamily: FONTS.fontRegular,
        color: COLORS.lightGray,
        marginBottom: hp(3.5),
        lineHeight: hp(2.6),
        paddingLeft:wp(2.55),
        paddingRight:wp(2.55),
    },
});