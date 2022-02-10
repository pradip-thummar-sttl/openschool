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
import PopupAddNewData from "../../../../component/reusable/popup/Popupaddnewdata";
import { opacity } from "../../../../../utils/Constant";
import moment from 'moment';
import SearchBlue from "../../../../../svg/teacher/timetable/Search_Blue";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import Notification from "../../../../../svg/teacher/dashboard/Notification";
import CalendarTop from "../../../../../svg/teacher/timetable/CalendarTop";
import { BadgeIcon } from "../../../../../utils/Model";
import FilterBlack from "../../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";

const HeaderTT = (props) => {

    const textInput = useRef(null);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('All')
    const [keyword, setKeyword] = useState('')
    console.log('ppppppppppppppp filter by', props.filterBy);
    useEffect(() => {
        if (!isSearchActive) {
            props.onClearSearch()
            setKeyword('')
            textInput.current.clear()
        } else {
            props.onSearch()
        }
    }, [isSearchActive])
    useEffect(() => {
        props.onFilter(filterBy)
    }, [filterBy])

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
                        {
                            BadgeIcon.isBadge ?
                                <View style={STYLE.redDot}></View> : null
                        }
                    </TouchableOpacity>
                </View>
            </View>



            <View style={styles.searchParent}>
                <View style={styles.searchInner}>
                    <TouchableOpacity
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
                        {/* <Image style={{ height: 20, resizeMode: 'contain', }}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} /> */}
                        {isSearchActive ?
                            <CloseBlack height={20} width={20} />
                            :
                            <SearchBlue height={20} width={20} />
                        }
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput}
                        style={{
                            flex: 1,
                            paddingVertical: Platform.OS === 'android' ? 3 : 0,
                            height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold,
                        }}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            setKeyword(keyword);
                            props.onSearchKeyword(keyword);
                        }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Menu style={{ marginRight: 10 }}>
                        <MenuTrigger style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={styles.commonButtonBorderedheader}>By {filterBy} </Text>
                            <FilterBlack style={styles.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                        </MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>
                            {/* <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Subject</Text> */}
                            {/* <Image source={Images.CheckIcon} style={styles.checkMark} /> */}
                            {/* </View>
                            </MenuOption> */}
                            {/* <View style={{width:29,height : 20,backgroundColor : 'red',position :'absolute', justifyContent:'center',alignItems : 'center',right : 0,top : 15}}>
                            <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />
                            </View> */}
                            <MenuOption style={[styles.borderList]}>
                                <TouchableOpacity onPress={() => { setFilterBy('All'); setSelectedIndex(0) }} >
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>All</Text>
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
                                <TouchableOpacity onPress={() => { setFilterBy('Live Lesson');setSelectedIndex(1) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Live Lesson</Text>
                                        {selectedIndex == 1 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity onPress={() => { setFilterBy('Publish Lesson');setSelectedIndex(2) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Publish Lesson</Text>
                                        {selectedIndex == 2 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                    </View>
                                </TouchableOpacity>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>


                    {/* <Image style={styles.filterIcon} source={Images.FilterIcon} /> */}
                </View>
                <PopupAddNewData
                    navigateToAddLesson={() => props.navigateToAddLesson()}
                    refreshList={() => props.refreshList()} />
            </View>
        </View>
    );
}
export default HeaderTT;

const styles = StyleSheet.create({
    filterIcon: {
        width: hp(1.74),
        // height: hp(1.50),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
        // top: hp(1.85),
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
        borderBottomColor: COLORS.videoLinkBorder,
        borderBottomWidth: 1,

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
        fontFamily: FONTS.fontSemiBold,
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
        alignItems : 'center'
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
        justifyContent: 'center'

    },
    checkMark: {
        width: hp(1.48),
        resizeMode: 'contain',
        // position : 'absolute',
        // backgroundColor : 'red'
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