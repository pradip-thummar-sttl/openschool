import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView} from "react-native";
import Style from './Style';
import HeaderPM from "./HeaderPM";

const PupilManagement = (props) => {
    const [isHide, action] = useState(true);
    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer',{ onGoBack: () => refresh() })
    }
    return (
        <View style={Style.mainPage}>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM onAlertPress={() => props.navigation.openDrawer()} onNotification={() => openNotification()}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={Style.mainContainer}>
                        <Text H2 style={Style.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                        <Text P style={Style.nodataContent}>Start adding teachers to invite them to join the school</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilManagement;