import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image, Platform } from "react-native";
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
import Notification from "../../../../svg/teacher/dashboard/Notification";
import Ic_CheckWhite from "../../../../svg/pupil/parentzone/Ic_CheckWhite";
import CloseBlack from "../../../../svg/teacher/pupilmanagement/Close_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import AddWhite from "../../../../svg/teacher/timetable/Add_White";
import PopupaddnewdataPM from "../../../component/reusable/popup/PopupaddnewdataPM";
const HeaderPM = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        props.onFilter(filterBy)
    }, [filterBy])

    const onSearchClick = (search) => {

        if (search && keyword != "") {
            setTimeout(() => {
                props.onSearch(keyword);
            }, 500)
        }
        else if (!search) {
            props.onClearSearch()
            setKeyword('')
            textInput.current.clear()
        }
    }

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.menuIconWithTitle}>
                    <Text style={styles.mainTitle}>Pupil Management</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationBar}
                        onPress={() => props.onAlertPress()}
                        activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <View style={styles.lessonPlanTab}>
                        <TouchableOpacity
                            style={styles.tabs}
                            activeOpacity={opacity}
                            onPress={() => { props.onTabSelected(0); setSelectedTab(0) }}>
                            <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>pupil overview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tabs}
                            activeOpacity={opacity}
                            onPress={() => { props.onTabSelected(1); setSelectedTab(1) }}>
                            <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>class set up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {tabIndex == 0 ?
                    <View style={styles.searchParent}>
                        <View style={styles.searchInner}>
                            {/* <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => {
                                    keyword &&
                                        isSearchActive ?
                                        setSearchActive(false)
                                        :
                                        setSearchActive(true)

                                }}>
                                {isSearchActive ?
                                    <CloseBlack height={15} width={15} />
                                    :
                                    <SearchBlue height={15} width={15} />
                                }
                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={() => { onSearchClick(true) }} activeOpacity={opacity} >
                                <SearchBlue height={20} width={20} />
                            </TouchableOpacity>

                            <TextInput
                                ref={textInput}
                                style={{ flex: 1, height: '100%', paddingVertical: 3.5, paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                                placeholder="Search pupil"
                                placeholderTextColor={COLORS.menuLightFonts}
                                onSubmitEditing={()=>keyword != "" && onSearchClick(true)}
                                onChangeText={keyword => {
                                    setKeyword(keyword);
                                    props.onSearchKeyword(keyword);
                                    keyword == "" && onSearchClick(false);
                                }} />

                            <TouchableOpacity onPress={() => { onSearchClick(false) }} activeOpacity={opacity} >
                                {keyword != "" && <CloseBlack height={20} width={20} />}
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                            <Menu style={{}}>
                                <MenuTrigger style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={styles.commonButtonBorderedheader}>By {filterBy}</Text>
                                    <FilterBlack style={styles.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                                </MenuTrigger>
                                <MenuOptions style={styles.filterListWrap}>
                                    <MenuOption style={styles.borderList}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { setFilterBy('name'); setSelectedIndex(0) }}>
                                            <View style={styles.filterList}>
                                                <Text style={styles.filterListText}>Name</Text>
                                                {selectedIndex == 0 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption style={styles.borderList}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { setFilterBy('group'); setSelectedIndex(1) }}>
                                            <View style={styles.filterList}>
                                                <Text style={styles.filterListText}>Group</Text>
                                                {selectedIndex == 1 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption style={styles.borderList}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { setFilterBy('dob'); setSelectedIndex(2) }}>
                                            <View style={styles.filterList}>
                                                <Text style={styles.filterListText}>DOB</Text>
                                                {selectedIndex == 2 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                        <PopupaddnewdataPM
                            navigateToAddLesson={() => props.navigateToAddLesson()}
                            refreshList={() => props.refreshList()}
                            navigateToAddPupil={() => props.navigateToAddPupil()} />
                    </View>
                    :
                    null
                }
            </View>
        </View>
    );
}
export default HeaderPM;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(4),
        backgroundColor: COLORS.white,
    },
    headerMain: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.5), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
        paddingBottom: hp(1),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
    },
    mainTitle: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
    },
    date: {
        fontSize: hp(2.86),
        fontFamily: FONTS.fontRegular,
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    filterbarMain: {
        flexDirection: 'row',
        paddingLeft: wp(5.33),
        paddingRight: wp(4),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        backgroundColor: COLORS.white,
        width: '100%',
        borderBottomColor: COLORS.dashBoard,
        borderBottomWidth: 1,
    },
    field: {
        position: 'relative',
        width: Platform.OS == 'android' ? hp(38.3) : hp(34.8),
        justifyContent: 'center',
        marginRight: hp(1.2),
    },
    searchHeader: {
        color: COLORS.themeBlue,
        fontSize: hp('1.9%'),
        borderWidth: 1,
        ...Platform.select({
            android: { padding: 0 }
        }),
        borderColor: COLORS.InoutBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.6),
        height: hp('5%'),
        paddingLeft: hp('4.43%'),
        paddingRight: hp('2.0%'),
        fontFamily: FONTS.fontSemiBold,
    },
    userIcon: {
        position: 'absolute',
        top: hp(1.1),
        width: hp(1.9),
        resizeMode: 'contain',
        left: hp(1.43),
    },
    userIcon1: {
        position: 'absolute',
        width: hp(1.66),
        resizeMode: 'contain',
        height: hp(3.5),
        left: hp(0),
    },
    filterIcon: {
        width: hp(1.74),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
    },
    filterIcon1: {
        width: hp(1.74),
        resizeMode: 'contain',
        position: 'absolute',
    },
    userIcon1Parent: {
        position: 'absolute',
        width: hp(1.66),
        left: hp(1.5),
        top: Platform.OS == 'android' ? hp(0.6) : hp(1),
        alignItems: 'center',
    },
    commonButtonBorderedheader: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2.2),
        paddingRight: hp(4),
        paddingTop: hp(1.2),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'capitalize',
        fontFamily: FONTS.fontRegular,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.82),
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(1.8),
        height: '100%',
        paddingTop: hp(1.4),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontFamily: FONTS.fontBold,

    },
    addIcon: {
        width: hp(1.55),
        resizeMode: 'contain',
        position: 'absolute',
        left: hp(1.8),
        zIndex: 9,
    },
    iconTop: {
        top: hp(4.2),
    },
    borderList: {
        borderBottomColor: COLORS.bottomProfileLightBorder,
        borderBottomWidth: hp(0.26),
    },
    filterList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp(1),
        paddingBottom: hp(1),
        flex: 1,
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: Platform.OS === 'android' ? 'relative' : 'absolute',
        backgroundColor: COLORS.white,
        top: Platform.OS === 'android' ? hp(0) : hp(5.5),
        right: hp(0),
        width: Platform.OS === 'android' ? null : hp(30.78),
        borderRadius: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
    },
    checkMark: {
        width: hp(1.48),
        resizeMode: 'contain',
    },
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
    },
    filterGroup: {
        display: 'none',
    },
    menuIconWithTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: hp(2.60),
        resizeMode: 'contain',
        marginRight: hp(1.56),
        height: hp(2.60),
    },
    cancelButton: {
        position: 'absolute',
        right: hp(1.5),
        zIndex: 9,
        top: hp(1),
    },
    popupLarge: {
        backgroundColor: COLORS.white,
        borderRadius: hp(2),
        width: hp(80.59),
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        fontFamily: FONTS.fontRegular,
        position: 'relative',
        paddingBottom: hp(6.5),
    },
    titleTab: {
        fontSize: hp(2.05),
        fontFamily: FONTS.fontSemiBold,
        lineHeight: hp(3.38),
        color: COLORS.darkGray,
        marginBottom: hp(5),
        marginTop: hp(3),
    },
    entryContentMain: {
        alignItems: 'center',
    },
    entryData: {
        marginBottom: hp(5.14)
    },
    entryIcon: {
        width: hp(10),
        height: hp(10),
        resizeMode: 'contain',
        marginBottom: hp(2.28),
    },
    entryTitle: {
        fontSize: hp(1.37),
        fontFamily: FONTS.fontBold,
        color: COLORS.darkGray,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    searchParent: {
        flexDirection: 'row',
        paddingLeft: hp(2),
        paddingRight: hp(4.16),
        alignItems: 'center',
        backgroundColor: COLORS.white,
        right: 0,
        position: 'absolute',
        height: hp(5.20),
    },
    searchInner: {
        height: '100%',
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        borderRadius: 10,
        width: hp(40.59),
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
        // backgroundColor : 'green'
    },
    searchMenu: {
        height: 20, resizeMode: 'contain', right: 0, alignSelf: 'center',
    },
    whiteBg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: hp(4.16),
        width: '100%',
        marginTop: hp(3),
        marginBottom: hp(2.5),
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
        fontSize: hp(1.56),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
});