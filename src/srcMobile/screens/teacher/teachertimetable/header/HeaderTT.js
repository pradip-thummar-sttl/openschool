import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import FONTS from '../../../../../utils/Fonts';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { opacity } from "../../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import PopupdataSecond from "../../../../component/reusable/popup/PopupdataSecond";
import HamburgerMenu from "../../../../../svg/common/HamburgerMenu";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import CalendarTop from "../../../../../svg/teacher/timetable/CalendarTop";
import Notification from "../../../../../svg/teacher/dashboard/Notification";
import AddWhite from "../../../../../svg/teacher/timetable/Add_White";
import NewLesson from "../../../../../svg/teacher/timetable/NewLesson";
import NewEvent from "../../../../../svg/teacher/timetable/NewEvent";
import { BadgeIcon } from "../../../../../utils/Model";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";

const HeaderTT = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(2)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (!isSearchActive) {
            props.onClearSearch()
            textInput.current.clear()
        } else {
            props.onSearch()
        }
    }, [isSearchActive])

    useEffect(() => {
        props.onFilter(filterBy)
    }, [filterBy])

    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.dashBoard, marginBottom: hp(1.23), }}>
            <View style={styles.headerMain}>
                <View style={styles.menuIconWithTitle}>
                    <TouchableOpacity onPress={() => props.onAlertPress()}><HamburgerMenu width={hp(2.60)} height={hp(1.84)} style={styles.menuIcon} /></TouchableOpacity>
                    <Text style={styles.mainTitle}>Timetable</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => props.onCalenderPress()} style={styles.notificationBar} activeOpacity={opacity}>
                        {/* <Image style={styles.calnderDashHeaderIcon} source={Images.calnderDashHeaderIcon} /> */}
                        <CalendarTop style={styles.calnderDashHeaderIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notificationBar}
                        onPress={() => props.onNotification()}
                        activeOpacity={opacity}>
                        {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                        {
                            BadgeIcon.isBadge ?
                                <View style={STYLE.redDot}></View> : null
                        }
                        {/* <View style={STYLE.redDot}></View> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchParent}>
                <View style={styles.searchInner}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => {
                            isSearchActive ?
                                setSearchActive(false)
                                :
                                setSearchActive(true)
                        }}>
                        {/* <Image style={{ height: 18, resizeMode: 'contain' }}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} /> */}
                        {isSearchActive ?
                            <CloseBlack height={18} width={18} />
                            :
                            <SearchBlue height={18} width={18} />
                        }
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput}
                        style={{ flex: 1, height: '100%', paddingHorizontal: 5, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, paddingVertical: 0, }}
                        placeholder="Search subject, topic name etc"
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            props.onSearchKeyword(keyword);
                        }} />
                    <Menu>
                        <MenuTrigger>
                            {/* <Image style={styles.searchMenu} source={Images.mobileFilter} /> */}
                            <FilterBlack style={styles.searchMenu} height={15} width={15} />
                        </MenuTrigger>
                        <MenuOptions style={{
                            backgroundColor: COLORS.white,
                            borderRadius: hp(1),
                            shadowColor: COLORS.black,
                            shadowOffset: { width: 0, height: hp(1), },
                            shadowOpacity: 0.05,
                            shadowRadius: hp(1),
                        }}>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy(''); setSelectedIndex(2) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>All</Text>
                                        {selectedIndex == 2 ?
                                            // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList} >
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('LiveLesson'); setSelectedIndex(0) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Live Lesson</Text>
                                        {selectedIndex == 0 ?
                                            // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('PublishLesson'); setSelectedIndex(1) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Publish Lesson</Text>
                                        {selectedIndex == 1 ?
                                            // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <TouchableOpacity
                    style={styles.buttonGroup}
                    onPress={() => refRBSheet.current.open()}>
                    {/* <Image style={styles.addIcon} source={Images.AddIconWhite} /> */}
                    <AddWhite style={styles.addIcon} width={hp(1.55)} height={hp(1.55)} />
                    <Text style={styles.commonButtonGreenheader}></Text>
                </TouchableOpacity>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    height={[hp(55.88)]}
                    style={{ position: 'relative', }}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: COLORS.bottomSlideUpBack
                        },
                        draggableIcon: {
                            backgroundColor: COLORS.darkGray
                        }
                    }}
                >
                    <View style={styles.popupLarge}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => { props.refreshList(); toggleModal() }}>
                            {/* <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} /> */}
                            <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                        </TouchableOpacity>
                        <View style={styles.popupContent}>
                            <View style={styles.tabcontent}>
                                <View style={styles.beforeBorder}>
                                    <Text h2 style={[styles.titleTab, STYLE.centerText]}>Add a new entry</Text>
                                    <View style={styles.entryContentMain}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            style={styles.entryData}
                                            onPress={() => { refRBSheet.current.close(); props.navigateToAddLesson() }}>
                                            {/* <Image style={styles.entryIcon} source={Images.NewLessons} /> */}
                                            <NewLesson style={styles.entryIcon} height={hp(10)} width={hp(10)} />
                                            <Text style={styles.entryTitle}>New Lesson</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.entryData}
                                            onPress={() => { refRBSheet.current.close(); props.navigateToCreateNewEvent(); }}>
                                            {/* <Image style={styles.entryIcon} source={Images.NewEvents} /> */}
                                            <NewEvent style={styles.entryIcon} height={hp(10)} width={hp(10)} />
                                            <Text style={styles.entryTitle}>New Event</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </RBSheet>
            </View>
        </View>
    );
}
export default HeaderTT;

const styles = StyleSheet.create({
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(2),
        paddingRight: hp(2),
        paddingTop: Platform.OS == 'android' ? hp(1.23) : hp(4.31),
        paddingBottom: hp(1.23),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
        shadowColor: COLORS.headerShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        marginBottom: hp(1.23),
    },
    mainTitle: {
        fontSize: hp(2.21),
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
        top: hp(1.19),
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
        textTransform: 'uppercase',
        fontFamily: FONTS.fontSemiBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.82),
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: hp(1)
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(1),
        height: hp(5.20),
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
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: hp(5.5),
        right: hp(0),
        width: hp(30.78),
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calnderDashHeaderIcon: {
        width: hp(5.20),
        resizeMode: 'contain',
        height: hp(5.20),
        marginRight: hp(1),
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
        flexDirection: 'row', marginHorizontal: hp(1.84), alignItems: 'center', marginBottom: hp(1.23), marginTop: 0, backgroundColor: COLORS.white,
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchMenu: {
        height: 15, resizeMode: 'contain', right: 0, alignSelf: 'center',
    }
});