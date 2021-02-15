import React , {useState} from "react";
import { View, StyleSheet,Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';

const Sidebar = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.sideBarAside}>
                <View style={styles.userInfo}>
                    {/* |<TouchableOpacity>
                        <Image 
                        source={require('../../../assets/images/userProfilePopup.png')} />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}
export default Sidebar;

const styles = StyleSheet.create({
    
});