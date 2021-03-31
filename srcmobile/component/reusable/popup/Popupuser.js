import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Modal from 'react-native-modal';

const Popupuser = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <Text style={STYLE.openClassLink} onPress={toggleModal}>Open Class</Text>
            <Modal isVisible={isModalVisible}>
                <View style={STYLE.popupCard}>
                    <TouchableOpacity style={STYLE.cancelButton} onPress={toggleModal}>
                        <Image style={STYLE.cancelButtonIcon} source={require('../../../assets/images/cancel2.png')} />
                    </TouchableOpacity>
                    <View style={STYLE.popupContentMain}>
                        <Text style={STYLE.popupTitle}>You are starting an instant call</Text>
                        <Text style={STYLE.popupText}>Share these joining info with others you want in the call:</Text>
                        <View style={styles.field}>
                            <Text label style={STYLE.labelCommon}>Joining Info</Text>
                            <View style={styles.copyInputParent}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    defaultValue='Meeting link: meet.myed/123-455-xyz Dial-in code: (UK) +44 000-000-000 Meeting password: 12345!'
                                    style={styles.commonInputTextarea}
                                />
                                <TouchableOpacity style={styles.copyIconMain}><Image source={require('../../../assets/images/copy-icon2.png')} style={styles.copyIcon} /></TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity><Text style={STYLE.commonButtonGreenDashboardSide}>share details</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Popupuser;

const styles = StyleSheet.create({
    field: {
        width: hp(42.96),
        marginBottom: hp(3),
    },
    commonInputTextarea: {
        width: '75%',
        height: hp(11),
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
    },
    copyIcon: {
        width: hp(1.98),
        resizeMode: 'contain',
        marginLeft: hp(2),
    },
    copyIconMain: {
        top: hp(0.75),
    },
});