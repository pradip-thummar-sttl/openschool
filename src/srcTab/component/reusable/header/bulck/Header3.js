import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Platform } from "react-native";
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
import moment from 'moment';
import Notification from "../../../../../svg/teacher/dashboard/Notification";
import CalendarTop from "../../../../../svg/teacher/timetable/CalendarTop";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import PopupdataSecond from "../../popup/PopupdataSecond";
import PopupdataSecondPupil from "../../popup/PopupdataSecondPupil";
import { BadgeIcon } from "../../../../../utils/Model";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";

const HeaderWhite = (props) => {

    const textInput = useRef(null);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('All')
    const [keyword, setKeyword] = useState('')

   

    useEffect(() => {
        props.onFilter(filterBy)
    }, [filterBy])


    const onSearchClick = (search) => {

        if (search && keyword != "") {
            props.onSearch()
        }
        else if (!search) {
            props.onClearSearch()
            setKeyword('')
            textInput.current.clear()

        }
    }

    return (
        <View style={styles.headerBarMainWhite}>
            <View style={styles.headerMain}>
                <Text style={styles.mainTitle}>TimeTable - <Text style={styles.date}>{moment().format('DD/MM/yyyy')}</Text></Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => props.onCalenderPress()}
                        style={styles.notificationBar}
                        activeOpacity={opacity}>
                        {/* <Image style={styles.calnderDashHeaderIcon} source={Images.calnderDashHeaderIcon} /> */}
                        <CalendarTop style={styles.calnderDashHeaderIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.onAlertPress()}
                        style={styles.notificationBar}
                        activeOpacity={opacity}>
                        {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                        {/* <View style={STYLE.redDot}></View> */}

                        {
                            BadgeIcon.isBadge ?
                                <View style={STYLE.redDot}></View> : null
                        }
                    </TouchableOpacity>
                </View>
            </View>
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
                                
                                : 
                        }
                    </TouchableOpacity> */}

                    <TouchableOpacity activeOpacity={opacity}
                        onPress={() => { onSearchClick(true) }}>
                        {<SearchBlue style={{ height: 20, resizeMode: 'contain' }} height={20} width={20} />}
                    </TouchableOpacity>

                    <TextInput
                        ref={textInput}
                        style={{
                            flex: 1, height: '100%', paddingHorizontal: 10,
                            paddingVertical: Platform.OS === 'android' ? 3 : 0,
                            fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold,
                        }}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            setKeyword(keyword);
                            props.onSearchKeyword(keyword);
                            keyword == "" && onSearchClick(false);
                        }}
                        returnKeyType='search'
                        onSubmitEditing={()=>keyword != "" && onSearchClick(true)}
                    />

                    <TouchableOpacity activeOpacity={opacity} style={{ paddingHorizontal: hp(1) }}
                        onPress={() => { keyword != "" && onSearchClick(false) }}>
                        {keyword != "" && <CloseBlack style={{ height: 20, resizeMode: 'contain' }} height={20} width={20} />}
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.buttonGroup}>
                    <Menu style={styles.filterGroup}>
                        <MenuTrigger><Text style={styles.commonButtonBorderedheader}>By {filterBy}</Text>
                            <FilterBlack style={styles.filterIcon} width={hp(1.74)} height={hp(1.50)} />
                        </MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>

                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity onPress={() => { setSelectedIndex(0); setFilterBy('All') }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>All</Text>
                                        {selectedIndex == 0 ?
                                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity onPress={() => { setSelectedIndex(1); setFilterBy('Live Lesson') }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Live Lesson</Text>
                                        {selectedIndex == 1 ?
                                            // <Image source={Images.CheckIcon} style={styles.checkMark} />
                                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity onPress={() => { setSelectedIndex(2); setFilterBy('Publish Lesson') }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Publish Lesson</Text>
                                        {selectedIndex == 2 ?
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

                    {/* <Image style={styles.filterIcon} source={Images.FilterIcon} /> */}
                </TouchableOpacity>
                <PopupdataSecondPupil
                    navigateToAddLesson={() => props.navigateToAddLesson()}
                    refreshList={() => props.refreshList()} />
            </View>
        </View>
    );
}
export default HeaderWhite;

const styles = StyleSheet.create({
    filterIcon: {
        width: hp(1.74),
        height: hp(1.50),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
        top: hp(1.85),
    },
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(1.69),
    },
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
        // backgroundColor : 'red'
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginBottom: hp(2.60),
    },
    field: {
        position: 'relative',
        width: hp(81.11),
        justifyContent: 'center',
        marginRight: hp(1.69),
    },
    searchHeader: {
        height: hp(5.20),
        paddingLeft: 15,
        borderColor: COLORS.borderGrp,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
    },
    commonButtonBorderedheader: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(2.2),
        paddingRight: hp(4),
        paddingTop: hp(1.1),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'capitalize',
        fontFamily: FONTS.fontRegular,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.82),
    },
    commonButtonGreenheader: {
        backgroundColor: COLORS.dashboardGreenButton,
        color: COLORS.white,
        fontSize: hp(1.56),
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: hp(4.175),
        paddingRight: hp(2.50),
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
        top: hp(1.29),
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
    },
    filterListWrap: {
        paddingTop: Platform.OS === 'android' ? 0 : hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: Platform.OS === 'android' ? 0 : hp(1),
        position: Platform.OS === 'android' ? 'relative' : 'absolute',
        backgroundColor: COLORS.white,
        top: Platform.OS === 'android' ? 0 : hp(5.5),
        width: Platform.OS === 'android' ? null : hp(30.98),
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
    searchParent: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10, height: hp(5.20), backgroundColor: COLORS.white, marginTop: 15,
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, marginRight: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchMenu: {
        height: 20, resizeMode: 'contain', right: 0, alignSelf: 'center',
    }
});