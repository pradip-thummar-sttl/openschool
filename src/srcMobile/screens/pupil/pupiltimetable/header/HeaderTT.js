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
import Notification from "../../../../../svg/teacher/dashboard/Notification";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import AddWhite from "../../../../../svg/teacher/timetable/Add_White";
import CalendarTop from "../../../../../svg/teacher/timetable/CalendarTop";
import { BadgeIcon } from "../../../../../utils/Model";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";

const HeaderTT = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(2)
    const [keyword, setKeyword] = useState('')

    // useEffect(() => {
    //     if (!isSearchActive) {
    //         props.onClearSearch()
    //         setKeyword('')
    //         textInput.current.clear()
    //     } else {
    //         props.onSearch()
    //     }
    // }, [isSearchActive])

 

    

    const onSearchClick = (search) => {

        if (search && keyword != "") {
            props.onSearch()
        } 
        else if(!search)
        {
            props.onClearSearch()
            setKeyword('')
            textInput.current.clear()

        }
    }

    return (
        <View style={{ backgroundColor: COLORS.white, shadowColor: COLORS.black, shadowOffset: { width: 0, height: hp(1), }, shadowOpacity: 0.05, shadowRadius: hp(1), paddingBottom: hp(1.5) }}>
            <View style={styles.headerMain}>
                <View style={styles.menuIconWithTitle}>
                    <TouchableOpacity onPress={() => props.onAlertPress()}><HamburgerMenu width={hp(2.60)} height={hp(1.84)} style={styles.menuIcon} /></TouchableOpacity>
                    <Text style={styles.mainTitle}>Timetable</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => props.onCalenderPress()} style={styles.notificationBar} activeOpacity={opacity}>
                        <CalendarTop style={styles.calnderDashHeaderIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notificationBar}
                        onPress={() => props.onNotification()}
                        activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.2)} width={hp(5.2)} />
                        {
                            BadgeIcon.isBadge ? <View style={STYLE.redDot}></View> : null
                        }
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.searchParent}>
                <View style={styles.searchInner}>

                    <TouchableOpacity activeOpacity={opacity}
                        onPress={() => { onSearchClick(true) }}>
                        {<SearchBlue height={15} width={15} />}
                    </TouchableOpacity>

                    <TextInput
                        ref={textInput}

                        style={{
                            flex: 1, height: '100%', paddingStart: 10, fontSize: hp(1.82),
                            fontFamily: FONTS.fontSemiBold, paddingVertical: 0
                        }}

                        placeholder="Search subject etc"
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            setKeyword(keyword);
                            props.onSearchKeyword(keyword);
                            keyword.length == 0 && onSearchClick(false);
                        }}
                        returnKeyType='search'
                        onSubmitEditing={() => onSearchClick(true)}
                    />

                    <TouchableOpacity activeOpacity={opacity} style={{ paddingHorizontal: hp(1) }}
                        onPress={() => { keyword != "" && onSearchClick(false) }}>
                        {keyword != "" && <CloseBlack height={15} width={15} />}
                    </TouchableOpacity>

                    <Menu>
                        <MenuTrigger>
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
                                    onPress={() => { props.onFilterBy(''); setSelectedIndex(2) }}>
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
                                    onPress={() => { props.onFilterBy('Subject'); setSelectedIndex(0) }}>
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
                                    onPress={() => { props.onFilterBy('Date'); setSelectedIndex(1) }}>
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
                    onPress={() => props.navigateToCreateNewEvent()}>
                    {/* <Image style={styles.addIcon} source={Images.AddIconWhite} /> */}
                    <AddWhite style={styles.addIcon} height={hp(1.55)} width={hp(1.55)} />
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
                                            <Text style={styles.entryTitle}>New Lesson</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.entryData}
                                            onPress={() => { refRBSheet.current.close(); props.navigateToCreateNewEvent(); }}>
                                            {/* <Image style={styles.entryIcon} source={Images.NewEvents} /> */}
                                            <Text style={styles.entryTitle}>New Event</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </RBSheet>
            </View>



            {/* <View style={styles.filterbarMain}>
                <View style={styles.field}>
                    <TextInput
                        ref={textInput}
                        style={[styles.searchHeader]}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            setKeyword(keyword);
                            props.onSearchKeyword(keyword);
                        }} />

                    <TouchableOpacity
                        style={styles.userIcon1Parent}
                        activeOpacity={opacity}
                        onPress={() => {
                            keyword ?
                                isSearchActive ?
                                    setSearchActive(false)
                                    :
                                    setSearchActive(true)
                                :
                                null
                        }}>
                        <Image
                            style={styles.userIcon1}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} />
                    </TouchableOpacity>

                    <Menu style={{ ...styles.filterIcon }}>
                        <MenuTrigger>
                        </MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Subject'); setSelectedIndex(0) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Subject</Text>
                                        {selectedIndex == 0 ?
                                            <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Date'); setSelectedIndex(1) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Date</Text>
                                        {selectedIndex == 1 ?
                                            <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <TouchableOpacity style={[styles.buttonGroup]}>
                    <Menu style={styles.filterGroup}>
                        <MenuTrigger><Text style={styles.commonButtonBorderedheader}>By {filterBy}</Text></MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Subject'); setSelectedIndex(0) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Subject</Text>
                                        {selectedIndex == 0 ?
                                            <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Date'); setSelectedIndex(1) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Date</Text>
                                        {selectedIndex == 1 ?
                                            <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonGroup}
                    onPress={() => props.navigateToCreateNewEvent()}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
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
                            <Image style={STYLE.cancelButtonIcon} source={Images.PopupCloseIcon} />
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
                                            <Image style={styles.entryIcon} source={Images.NewLessons} />
                                            <Text style={styles.entryTitle}>New Lesson</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.entryData}
                                            onPress={() => { refRBSheet.current.close(); props.navigateToCreateNewEvent(); }}>
                                            <Image style={styles.entryIcon} source={Images.NewEvents} />
                                            <Text style={styles.entryTitle}>New Event</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </RBSheet>
            </View> */}
        </View>
    );
}
export default HeaderTT;

const styles = StyleSheet.create({
    headerBarMainWhite: {
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(4),
        backgroundColor: COLORS.white,
        paddingBottom: hp(1.5),
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: wp(5.33),
        paddingRight: wp(4),
        paddingTop: Platform.OS == 'android' ? hp(1.23) : hp(5.85),
        paddingBottom: hp(1),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
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
        height: hp(5.20),
        paddingLeft: hp(4.43),
        ...Platform.select({
            android: { padding: 0 }
        }),
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        color: COLORS.themeBlue,
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
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
        height: hp(1.66),
        resizeMode: 'contain',
        left: hp(0),
        top: hp(1)
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
        marginRight: hp(1)
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
        flexDirection: 'row', alignItems: 'center', height: hp(5.20), marginLeft: hp(1.95), marginRight: hp(1.95), backgroundColor: COLORS.white
    },
    searchInner: {
        height: '100%', flex: 1, marginRight: 10, borderColor: COLORS.borderGrp,
        borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchMenu: {
        height: 20, resizeMode: 'contain', right: 0, alignSelf: 'center',
    }
});