import React, { useEffect, useRef } from "react";
import { Alert, View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
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
import BackArrow from "../../../../svg/common/BackArrow";
import CheckedBlue from "../../../../svg/pupil/dashboard/Checked_Blue";
import WhiteCheck from "../../../../svg/pupil/timetable/WhiteCheck";
const AddNewTeacherHeader = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)
    const showAlert = () => {
        Alert.alert(
            'Record successfully Saved...'
        )
    }
    useEffect(() => {
        // props.onFilter(filterBy)
    }, [filterBy])

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.titleRow}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => props.navigateToBack()}>
                        {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                        <BackArrow style={styles.arrow} height={hp(2.4)} width={hp(2.4)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.mainTitle}>Add New Pupil</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => props.OnSaveEdit()} style={[styles.buttonGroup, styles.commonButtonGreenheader]}>
                        {props.isLoading ?
                            <ActivityIndicator
                                // style={STYLE.commonButtonGreen}
                                size={Platform.OS == 'ios' ? 'small' : 'small'}
                                color={COLORS.white} />
                            :
                            <>
                                <WhiteCheck style={[styles.addIcon, styles.iconTop]} height={hp(1.55)} width={hp(1.55)} />
                            </>
                        }
                        {/* <Image style={[styles.addIcon, styles.iconTop]} source={require('../../../../assets/images/checkIcon2.png')} /> */}

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default AddNewTeacherHeader;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1, borderColor: COLORS.dashBoard,
        paddingLeft: hp(2),
        paddingRight: hp(2),
        paddingBottom: hp(1.23),
        paddingTop: Platform.OS == 'android' ? hp(1) : hp(2.3),
    },
    headerMain: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
        paddingTop: Platform.OS == 'android' ? hp(1) : hp(3.5),
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
        padding: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessonPlanTop: {
        flexDirection: 'row',
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
        borderRadius: hp(1),
        height: hp(5.20),
        width: hp(5.20),
        alignItems: 'center',
        justifyContent: 'center'
    },
});