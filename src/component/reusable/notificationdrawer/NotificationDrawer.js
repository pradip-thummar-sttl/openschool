import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import PopupUser from '../../../component/reusable/popup/Popupuser';
import { ScrollView } from "react-native-gesture-handler";
import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";

const NotificationDrawer = (props) => {
    return (
        <View style={styles.drawerMain}>
            <View style={styles.drawerTitleMain}>
                <Text style={styles.drawerTitle} >My Notifications</Text>
                <TouchableOpacity style={styles.closeNotificationbarMain}><Image source={require('../../../assets/images/cancel2.png')} style={styles.closeIcon} /></TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <Text style={styles.notificationsText}>Live Classes</Text>
                    <View style={styles.classDetail}>
                        <TouchableOpacity style={styles.closeNotificationbar}><Image source={require('../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /></TouchableOpacity>
                        <Text style={styles.classsummary}>Your English Grammar class - Group 1A is schedule to start in 5m</Text>
                        <View style={styles.timingJoinClass}>
                            <View style={styles.timing}>
                                <Image source={require('../../../assets/images/clock2.png')} style={styles.timingClass} />
                                <Text style={styles.timingText}>09:00 - 09:30</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={STYLE.openClassLink}>{[<PopupUser />]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.notificationsText}>Homework</Text>
                    <View style={styles.classDetail}>
                        <TouchableOpacity style={styles.closeNotificationbar}><Image source={require('../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /></TouchableOpacity>
                        <Text style={styles.classsummary}>Your English Grammar class - Group 1A is schedule to start in 5m</Text>
                        <View style={styles.timingJoinClass}>
                            <View style={styles.timing}>
                                <Text style={styles.timingText}>6 submitted</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={STYLE.openClassLink}>Check</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.notificationsText}>Personal</Text>
                    <View style={styles.classDetail}>
                        <TouchableOpacity style={styles.closeNotificationbar}><Image source={require('../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /></TouchableOpacity>
                        <Text style={styles.classsummary}>You have a new message from</Text>
                        <View style={styles.timingJoinClass}>
                            <View style={styles.timing}>
                                <Text style={styles.timingText}>Mrs Ann Le-Paradesi</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={STYLE.openClassLink}>Read</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.classDetail}>
                        <TouchableOpacity style={styles.closeNotificationbar}><Image source={require('../../../assets/images/cancel2.png')} style={styles.closeIconSmall} /></TouchableOpacity>
                        <Text style={styles.classsummary}>You have a new message from</Text>
                        <View style={styles.timingJoinClass}>
                            <View style={styles.timing}>
                                <Text style={styles.timingText}>Mr Harminder Singh</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={STYLE.openClassLink}>Read</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default NotificationDrawer;

const styles = StyleSheet.create({
    drawerMain: {
        flex: 1,
    },
    drawerTitleMain: {
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        paddingLeft: hp(1.95),
        paddingTop: hp(3.25),
        paddingBottom: hp(3.25),
        paddingRight: hp(1.95),
        position: 'relative',
        zIndex: 9,
    },
    drawerTitle: {
        fontSize: hp(2.08),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(2.86),
        color: COLORS.darkGray,
    },
    closeNotificationbarMain: {
        position: 'absolute',
        top: hp(2.7),
        zIndex: 9,
        right: hp(1.95),
        zIndex: 9,
    },
    closeIcon: {
        width: hp(3),
        resizeMode: 'contain',
    },
    classDetail: {
        padding: hp(1.95),
        marginBottom: -1,
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        position: 'relative',
    },
    notificationsText: {
        padding: hp(1.95),
        paddingBottom: hp(1),
        paddingTop: hp(1),
        borderWidth: 1,
        borderColor: COLORS.commonBorderColor,
        color: COLORS.menuLightFonts,
        fontSize: hp(1.56),
        fontFamily: FONTS.fontSemiBold,
        textTransform: 'uppercase',
    },
    closeNotificationbar: {
        position: 'absolute',
        top: hp(0.7),
        right: hp(1.95),
    },
    closeIconSmall: {
        width: hp(2.8),
        resizeMode: 'contain',
        opacity: 0.4,
    },
    classsummary: {
        paddingRight: hp(5.1),
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
        lineHeight: hp(2.6),
        color: COLORS.darkGray,
        marginBottom: hp(1.95),
    },
    timingJoinClass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timingClass: {
        width: hp(1.69),
        resizeMode: 'contain',
        marginRight: hp(0.7),
    },
    timingText: {
        fontSize: hp(1.56),
        color: COLORS.darkGray,
        fontFamily: FONTS.fontRegular,
    },
});