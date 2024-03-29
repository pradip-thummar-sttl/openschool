import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, ActivityIndicator, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import Modal from 'react-native-modal';
import { Addhomework, User } from "../../../../utils/Model";
import TickMarkWhite from "../../../../svg/teacher/lessonhwplanner/TickMark_White";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import { baseUrl } from "../../../../utils/Constant";
import HWSubmitBg from "../../../../svg/teacher/lessonhwplanner/HWSubmitBg";

const Popuphomework = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <TouchableOpacity onPress={() => props.onOpenPopup()} style={[styles.buttonGroup,styles.setHomeworkBtnn,
            ]}>
                  {props.isHomeworkLoading ?
                    <ActivityIndicator
                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                        color={COLORS.white} 
                        style={{width:hp(14)}}/>
                    :
                    <>
                        <TickMarkWhite style={[styles.addIcon, styles.iconTop]} height={hp(1.55)} width={hp(1.55)} />
                        <Text style={styles.commonButtonGreenheader}>{props.hwBtnName}</Text>
                    </>
                }
            </TouchableOpacity>
            <Modal isVisible={props.isVisible}>
                <View style={styles.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={() => props.onClose()}>
                        {/* <Image style={STYLE.cancelButtonIcon} source={require('../../../../assets/images/cancel2.png')} /> */}
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    {/* <ImageBackground source={require('../../../../assets/images/popup_back.png')} style={STYLE.popupBack} /> */}
                    <HWSubmitBg style={STYLE.popupBack} height={hp(10.41)} width={'100%'} />
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
        height: hp(7),
        top: 30,
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
    setHomeworkBtnn : {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
        height: hp(5.20),
        // width : 170,
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        justifyContent : 'center',
        alignItems : 'center'
    },
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(1.8),
        zIndex: 9,
    },
    commonButtonGreenheader: {
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