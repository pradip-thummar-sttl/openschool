import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import EditWhite from "../../../../svg/pupil/parentzone/EditWhite";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { opacity } from "../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";
import BackArrow from '../../../../svg/teacher/lessonhwplanner/ArrowBack'
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
const HeaderPMInner = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)


    useEffect(() => {
        // props.onFilter(filterBy)
    }, [filterBy])
    console.log('props can get here......',props);
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
                    {/* <View>
                        <TouchableOpacity onPress={() => props.navigateToPupilProfileEdit()} style={styles.profileEdit}>

                            <EditWhite style={styles.profileEditButton} height={hp(2)} width={hp(2)} />
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View>
                    <TouchableOpacity onPress={() => props.navigateToPupilProfileEdit()} style={styles.profileEdit}>
                        {/* <Image  style={PAGESTYLE.profileeditButton} /> */}
                        <EditWhite style={styles.profileEditButton} height={hp(2)} width={hp(2)} />
                    </TouchableOpacity>
                </View>
                    {/* <View style={styles.headerRight}>
                        <TouchableOpacity
                        style={styles.editButton}
                            activeOpacity={opacity}
                            onPress={() => props.navigateToPupilProfileEdit()}>
                            <Ic_Edit style={styles.massagesIcon}width={hp(2.5)} height={hp(2.5)}/>
                        </TouchableOpacity>
                    </View> */}
                
            </View>
            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={styles.lessonPlanTab}>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(0), props.tabIndex(0) }}>
                                <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>Pupil profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(1), props.tabIndex(1) }}>
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>Parent Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default HeaderPMInner;

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
        width: hp(2.8),
        height: hp(2.8),
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
    headerRight: {
        alignSelf: 'flex-end',
        right: 10,
    },
    editButton: {
        borderRadius: 10,
        height: hp(4.20),
        width: hp(4.20),
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileEdit: {
        backgroundColor: COLORS.dashboardGreenButton,
        alignSelf: 'flex-end',
        padding: hp(1.5),
        borderRadius: hp(1),
        marginRight: 10
        // marginBottom: hp(1.32),
    },
    profileEditButton: {
        width: hp(1.57),
        height: hp(1.57),
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});