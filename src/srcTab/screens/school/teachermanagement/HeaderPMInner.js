import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';

import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";

import FONTS from '../../../../utils/Fonts';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { opacity } from "../../../../utils/Constant";
import { useState } from "react";
import BackArrow from "../../../../svg/common/BackArrow";
import Notification from "../../../../svg/teacher/dashboard/Notification";

const HeaderPMInner = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(props.tabSelected);

    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)

    const [searchKeyword, setSearchKeyword] = useState('')
    const [isSearchActive, setSearchActive] = useState(false)

    useEffect(() => {
    }, [filterBy])

    const onSearch = () => {
        if (searchKeyword) {
            if (isSearchActive) {
                setSearchKeyword('');
                setSearchActive(false)
                textInput.current.clear()
                props.onSearch('', filterBy);
            }
            else {
                setSearchActive(true)
                props.onSearch(searchKeyword, filterBy)
            }
        }
    }
    const onFilter = (index) => {
        if (index === 0) {
            setSelectedIndex(0)
            setFilterBy('Subject');
            props.onSearch(searchKeyword, "Subject")
        }
        else {
            setSelectedIndex(1)
            setFilterBy('Date');
            props.onSearch(searchKeyword, "Date")
        }

    }

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.titleRow}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => props.navigateToBack()}>
                        {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
                        <BackArrow style={styles.arrow} height={hp(2.34)} width={hp(2.34)} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.mainTitle}>{props.pupilName}</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => props.onNotification()}
                        style={styles.notificationBar}
                        activeOpacity={opacity}>
                        <Notification style={styles.massagesIcon} height={hp(5.20)} width={hp(5.20)} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.whiteBg]}>
                <View style={[styles.lessonPlanTop,{flex:1}]}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
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
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { setSelectedTab(2), props.tabIndex(2) }}>
                                <Text style={[styles.tabsText, tabIndex == 2 ? styles.tabsTextSelected : null]}>Lesson {'&'} Homework</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {
                        tabIndex == 2 &&
                        <View style={styles.serachView}>
                            <View style={[styles.field, { width: hp(35) }]}>
                                <TouchableOpacity onPress={() => { onSearch() }} style={[PAGESTYLE.userIcon1Parent]} activeOpacity={opacity}>
                                    {
                                        isSearchActive ?
                                            <CloseBlack style={PAGESTYLE.userIcon1} height={20} width={20} />
                                            :
                                            <SearchBlue style={[PAGESTYLE.userIcon1]} height={20} width={20} />
                                    }
                                </TouchableOpacity>

                                <TextInput
                                    ref={textInput}
                                    style={[styles.searchHeader, { flex:1, paddingVertical: Platform.OS === 'android' ? 2.5 : 0 }]}
                                    placeholder="Search subject,class,etc"
                                    maxLength={50}

                                    placeholderTextColor={COLORS.menuLightFonts}
                                    onChangeText={keyword => { setSearchKeyword(keyword); }} 
                                    onSubmitEditing={() => { onSearch() }}
                                    />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center',marginRight: 10 ,width : hp(16),paddingHorizontal : 2}}>
                                <Menu style={{}}>
                                    <MenuTrigger style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.commonButtonBorderedheader}>By {filterBy}</Text>
                                        <FilterBlack style={styles.filterIcon} height={hp(1.74)} width={hp(1.74)} />
                                    </MenuTrigger>

                                    <MenuOptions style={styles.filterListWrap}>
                                        <MenuOption style={styles.borderList}>
                                            <TouchableOpacity onPress={() => { onFilter(0) }} activeOpacity={opacity}>
                                                <View style={styles.filterList}>
                                                    <Text style={styles.filterListText}>Subject </Text>
                                                    {selectedIndex == 0 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                                </View>
                                            </TouchableOpacity>
                                        </MenuOption>
                                        <MenuOption style={styles.borderList}>
                                            <TouchableOpacity onPress={() => { onFilter(1); setFilterBy('Date'); setSelectedIndex(1) }} activeOpacity={opacity}>
                                                <View style={styles.filterList}>
                                                    <Text style={styles.filterListText}>Date</Text>
                                                    {selectedIndex == 1 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                                </View>
                                            </TouchableOpacity>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>

                        </View>
                    }
                </View>
            </View>



        </View>
    );
}
export default HeaderPMInner;

const styles = StyleSheet.create({
    serachView: {
        height: hp(6),
        flexDirection: 'row'
    },
    lessonPlanTop: {
        flexDirection: 'row',
    },
    filterIcon: {
        width: hp(1.74),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
    },
    lessonPlanTab: {
        height: hp(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    field: {
        position: 'relative',
        width: hp(30),
        alignItems: 'center',
        marginRight: hp(1.69),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        fontWeight: 'bold',
        paddingHorizontal: hp(1),
        fontFamily: FONTS.fontRegular,
    },
    field1: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        overflow: 'hidden',
        borderRadius: hp('1.0%'),
        lineHeight: hp(2.3),
        fontWeight: 'bold',
        // paddingHorizontal: hp(2),
        fontFamily: FONTS.fontRegular,
    },

    searchHeader: {
        height: hp(5.5),
        paddingLeft: 15,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.themeBlue,
        fontSize: hp('1.9%'),

    },
    userIcon1Parent: {
        position: 'absolute',
        right: 10,
        top: 2,

    },
    userIcon1: {
        position: 'absolute',
        width: hp(2),
        height: hp(2),
        resizeMode: 'contain',
        alignSelf: 'center',
        // top: hp(1),
        top: Platform.OS === 'android' ? hp(1) : hp(2),
        right: 5
    },
    commonButtonBorderedheader: {
        backgroundColor: COLORS.transparent,
        color: COLORS.darkGray,
        borderRadius: hp(1),
        overflow: 'hidden',
        textAlign: 'center',
        // paddingLeft: hp(2.2),
        paddingRight: hp(2),
        paddingTop: hp(1.1),
        paddingBottom: hp(1.4),
        alignSelf: 'center',
        textTransform: 'capitalize',
        fontFamily: FONTS.fontSemiBold,
        borderWidth: 1,
        borderColor: COLORS.borderGrp,
        height: hp(5.20),
        fontSize: hp(1.82),
        width : hp(16)
    },
    filterListWrap: {
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: Platform.OS === 'android' ? 'relative' : 'absolute',
        backgroundColor: COLORS.white,
        top: Platform.OS === 'android' ? hp(0) : hp(5.5),
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
    filterListText: {
        color: COLORS.darkGray,
        fontSize: hp(1.82),
        fontFamily: FONTS.fontRegular,
    },

    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLORS.dashBoard,
        paddingLeft: hp(3.90),
        paddingRight: hp(2.0),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(2),
        paddingBottom: hp(2),
    },
    headerMain: {
        backgroundColor: COLORS.white,
        width: '100%',
    },
    mainTitle: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
        top: 2,
    },
    arrow: {
        width: hp(2.34),
        resizeMode: 'contain',
        marginRight: hp(2),
        top: 2,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    massagesIcon: {
        width: hp(5.20),
        height: hp(5.20),
        resizeMode: 'contain',
        top: Platform.OS === 'android' ? 5 : 10
    },
    whiteBg: {
        paddingLeft: hp(3.90),
        paddingRight: hp(2.0),
        paddingVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"

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
});