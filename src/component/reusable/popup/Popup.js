import React , {useState} from "react";
import { View, StyleSheet,Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Modal from 'react-native-modal';

const Popup = (props) => {
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
                        <Image source={require('../../../assets/images/cancel2.png')} />
                    </TouchableOpacity>
                    <ImageBackground source={require('../../../assets/images/popup_back.png')} style={STYLE.popupBack} />
                    <View style={STYLE.popupContentMain}>
                        <Text style={STYLE.popupTitle}>Heading</Text>
                        <Text style={STYLE.popupText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</Text>
                        <Text style={STYLE.commonButtonGreen}>Click Me</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Popup;