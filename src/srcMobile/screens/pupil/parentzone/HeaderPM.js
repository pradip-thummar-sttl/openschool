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
import { baseUrl, opacity } from "../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";
import { BadgeIcon, User } from "../../../../utils/Model";
import HamburgerMenu from "../../../../svg/common/HamburgerMenu";
import Ic_Search from "../../../../svg/teacher/pupilmanagement/Ic_Search";
import CloseBlack from "../../../../svg/teacher/pupilmanagement/Close_Black";
import Ic_BlueCheck from "../../../../svg/teacher/timetable/Ic_BlueCheck";
import Notification from "../../../../svg/teacher/dashboard/Notification";
import AddWhite from "../../../../svg/teacher/timetable/Add_White";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";



const HeaderPM = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [selectedPupilIndex, setSelectedPupilIndex] = useState(0)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)
    const [childrenList, setChildrenList] = useState(props.data)
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        setChildrenList(props.data);
    }, [props.data]);

    useEffect(() => {
        props.onFilter(filterBy)
    }, [filterBy])

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
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.menuIconWithTitle}>
                    <TouchableOpacity onPress={() => props.onAlertPress()}><HamburgerMenu width={hp(2.60)} height={hp(1.84)} style={styles.menuIcon} /></TouchableOpacity>
                    <Text style={styles.mainTitle}>Parent Zone</Text>
                </View>

                <View style={styles.headerRight}>
                    <Menu>
                        {/* childrenList.length == 0 ? Images.userparent :  */}
                        <MenuTrigger><Image style={styles.userparent} source={{ uri: baseUrl + childrenList[selectedPupilIndex]?.ProfilePicture }} /></MenuTrigger>
                        <MenuOptions style={styles.filterCard}>
                            {childrenList.map((item, index) => (
                                <MenuOption style={styles.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { props.onSwitchPupil(index); setSelectedPupilIndex(index) }}>
                                        <View style={styles.filterList}>
                                            <View style={styles.filterListSub}>
                                                <Image style={styles.userparentInMenu} source={{ uri: baseUrl + item?.ProfilePicture }} />
                                                <Text numberOfLines={1} style={{ ...styles.filterListText, fontFamily: FONTS.fontSemiBold, width: hp(15) }}>{item.FirstName} {item.LastName}</Text>
                                            </View>
                                            {index == selectedPupilIndex ?
                                                // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                                <Ic_BlueCheck style={styles.checkMark} width={hp(1.48)} height={hp(1.48)} />
                                                :
                                                null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                            ))}
                            <MenuOption>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => props.navigateToAddNewUser()}>
                                    <View style={styles.filterList}>
                                        <View style={styles.filterListSub}>
                                            <View style={styles.userparentInMenuAddmain}>
                                                {/* <Image style={styles.userparentInMenuAdd} source={Images.AddIcon} /> */}
                                                <AddWhite style={[styles.userparentInMenuAdd]} height={hp(2.47)} width={hp(2.47)} fill={true} />
                                            </View>
                                            <Text style={{ ...styles.filterListText, fontFamily: FONTS.fontBold }}>ADD NEW USER</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
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
            {tabIndex == 0 ?
                <View style={styles.searchParent}>
                    <View style={styles.searchInner}>
                        {/* <TouchableOpacity
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
                            {
                                isSearchActive ?
                                    <CloseBlack height={20} width={20} />
                                    : <Ic_Search height={20} width={20} />

                            }
                           
                        </TouchableOpacity> */}

                        <TouchableOpacity activeOpacity={opacity}
                            onPress={() => { onSearchClick(true) }}>
                            {<Ic_Search height={20} width={20} />}
                        </TouchableOpacity>

                        <TextInput
                            ref={textInput}
                            style={{ flex: 1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                            placeholder="Search news"
                            placeholderTextColor={COLORS.menuLightFonts}
                            onChangeText={keyword => {
                                setKeyword(keyword);
                                props.onSearchKeyword(keyword);
                                keyword == "" && onSearchClick(false);
                            }} 
                            onSubmitEditing={()=>keyword != "" && onSearchClick(true)}/>

                        <TouchableOpacity activeOpacity={opacity} style={{ paddingHorizontal: hp(1) }}
                            onPress={() => { keyword != "" && onSearchClick(false) }}>
                            {keyword != "" && <CloseBlack height={20} width={20} />}
                        </TouchableOpacity>

                        <Menu>
                            <MenuTrigger>
                                {/* <Image style={styles.searchMenu} source={Images.mobileFilter} /> */}
                                <FilterBlack style={styles.searchMenu} height={15} width={15} />
                            </MenuTrigger>
                            <MenuOptions style={[styles.filterCard]}>
                                <MenuOption style={styles.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setFilterBy('Title'); setSelectedIndex(0) }}>
                                        <View style={styles.filterList}>
                                            <Text style={styles.filterListText}>Title</Text>
                                            {selectedIndex == 0 ?
                                                // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                                <Ic_BlueCheck style={styles.checkMark} width={hp(1.48)} height={hp(1.48)} />

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
                                                <Ic_BlueCheck style={styles.checkMark} width={hp(1.48)} height={hp(1.48)} />

                                                // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                                :
                                                null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
                :
                null
            }
            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={styles.lessonPlanTab}>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(0); setSelectedTab(0) }}>
                                <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>NEWSFEED</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(1); setSelectedTab(1) }}>
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>PERFORMANCE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(2); setSelectedTab(2) }}>
                                <Text style={[styles.tabsText, tabIndex == 2 ? styles.tabsTextSelected : null]}>MESSAGE</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(3); setSelectedTab(3) }}>
                                <Text style={[styles.tabsText, tabIndex == 3 ? styles.tabsTextSelected : null]}>FAQ</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(4); setSelectedTab(4) }}>
                                <Text style={[styles.tabsText, tabIndex == 4 ? styles.tabsTextSelected : null]}>PROFILE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(5); setSelectedTab(5) }}>
                                <Text style={[styles.tabsText, tabIndex == 5 ? styles.tabsTextSelected : null]}>My School</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default HeaderPM;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1, borderColor: COLORS.dashBoard,
        paddingBottom: 15,
        paddingLeft: hp(2.46),
        paddingRight: hp(2),
    },
    headerMain: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(5.85),
        paddingBottom: hp(1),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
    },
    mainTitle: {
        fontSize: hp(2.21),
        color: COLORS.darkGrayIntro,
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
    userparent: {
        width: hp(3.81),
        height: hp(3.81),
        borderRadius: hp(3.81 / 2),
        marginRight: hp(1.5),
        backgroundColor: COLORS.lightGrayPupil
    },
    userparentInMenu: {
        width: hp(3.81),
        height: hp(3.81),
        marginRight: hp(1),
        borderRadius: hp(3.81 / 2),
        backgroundColor: COLORS.lightGrayPupil
    },
    userparentInMenuAdd: {
        width: hp(1.47),
        height: hp(1.47),
        resizeMode: 'contain',

    },
    userparentInMenuAddmain: {
        width: hp(3.81),
        height: hp(3.81),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: hp(1),
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
        alignItems: 'center',
        paddingVertical: 5,
        flex: 1,
    },
    filterListSub: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
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
        flexDirection: 'row', paddingLeft: hp(2), paddingRight: hp(2), alignItems: 'center', marginBottom: hp(1), backgroundColor: COLORS.white, marginTop: 12, height: 50
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
    },
    searchMenu: {
        height: 15, resizeMode: 'contain', right: 0, alignSelf: 'center',
    },
    whiteBg: {
        paddingBottom: hp(1),
        paddingTop: hp(1.7),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: hp(0),
        paddingLeft: hp(2.46),
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
        fontSize: hp(1.56),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
    filterCard: {
        backgroundColor: COLORS.white,
        position: Platform.OS === 'android' ? 'relative' : 'absolute',
        top: Platform.OS === 'android' ? 0 : 50,
        right: 0,
        width: 200,
        padding: 10,
        paddingVertical: 5,
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 4, },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        borderRadius: 6,
        // marginTop  :30
    },
});