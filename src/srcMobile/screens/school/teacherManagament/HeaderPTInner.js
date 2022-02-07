import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import Notification from "../../../../svg/teacher/dashboard/Notification";
import FONTS from '../../../../utils/Fonts';
import { opacity } from "../../../../utils/Constant";
import { useState } from "react";
import BackArrow from '../../../../svg/teacher/lessonhwplanner/ArrowBack'
import EditWhite from "../../../../svg/pupil/parentzone/EditWhite";


const HeaderPTInner = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)

    useEffect(() => {
    }, [filterBy])
    
    return (
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.titleRow}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => props.navigateToBack()}>
                        <BackArrow style={styles.arrow} height={hp(2.4)} width={hp(2.4)} />
                    </TouchableOpacity>
                    <View>
                        <Text numberOfLines={1} style={[styles.mainTitle, { width: wp(75) }]}>{props.name}</Text>
                    </View>
                </View>
                {tabIndex == 0 ? 
                <View style={{flexDirection : 'row',right :Platform.OS === 'android'? 55 : 70}}>
                <View style={{paddingHorizontal: 3}}>
                    <TouchableOpacity onPress={() => props.navigateToPupilProfileEdit()} style={styles.profileEdit}>
                        {/* <Image  style={PAGESTYLE.profileeditButton} /> */}
                        <EditWhite style={styles.profileEditButton} height={hp(2)} width={hp(2)} />
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 3}}>
                    <TouchableOpacity
                        style={styles.notificationBar}
                        onPress={() => props.onNotification()}
                        activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                </View>
                </View>
                : null
                    }
            </View>
            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={styles.lessonPlanTab}>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(0), props.tabIndex(0) }}>
                                <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>Teacher profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(1), props.tabIndex(1) }}>
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(2), props.tabIndex(2) }}>
                                <Text style={[styles.tabsText, tabIndex == 2 ? styles.tabsTextSelected : null]}>Lessons & Homework</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default HeaderPTInner;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1, borderColor: COLORS.dashBoard,
        paddingLeft: hp(2.46),
        paddingRight: hp(2),
        paddingBottom: 10,
        height : 50,
    },
    headerMain: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
    },
   
    mainTitle: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(2),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    whiteBg: {
        paddingLeft: hp(2.46),
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessonPlanTop: {
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
    },
    lessonPlanTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabs: {
        paddingRight: hp(2.5),
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.6),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
    profileEdit : {
        // backgroundColor: COLORS.dashboardGreenButton,
        // alignSelf: 'flex-end',
        // padding: hp(1.5),
        // borderRadius: hp(1),
        // // marginRight : 10
        // // marginBottom: hp(1.32),

        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        borderRadius: hp(1),
        height: hp(5),
        width: hp(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileEditButton : {
        width: hp(1.57),
        height: hp(1.57),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    
   
});