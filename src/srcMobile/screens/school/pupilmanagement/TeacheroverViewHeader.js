import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import { opacity } from "../../../../utils/Constant";
import { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import HamburgerMenu from "../../../../svg/common/HamburgerMenu";
import Ic_Search from '../../../../svg/teacher/pupilmanagement/Ic_Search'
import CloseBlack from '../../../../svg/teacher/pupilmanagement/Close_Black'
import AddWhite from '../../../../svg/teacher/timetable/Add_White'
import Notification from '../../../../svg/teacher/dashboard/Notification'
import ImportIndividual from "../../../../svg/school/teachermanagment/ImportIndividual";
import MPopupdataSecondCSVUpload from "../../../component/reusable/popup/MPopupdataSecondCSVUpload";
const TeacheroverViewHeader = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [keyword, setKeyword] = useState('')

   
    const onFilter = (filter) => {
        setTimeout(() => {
            props.onFilter(filter)
        }, 500)
    }

    const onSearchClick = (search) => {

        if (search && keyword != "") {
            setTimeout(() => {
                props.onSearch()
            }, 500)
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
                    <Text style={styles.mainTitle}>Pupil Management</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationBar}
                        onPress={() => props.onNotification()}
                        activeOpacity={opacity}>
                        <View style={styles.massagesIcon}>
                            <Notification />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {props.tabs === 0 &&
                <View style={styles.searchParent}>
                    <View style={styles.searchInner}>
                       
                        <TouchableOpacity onPress={() => { onSearchClick(true) }} activeOpacity={opacity} >
                            <Ic_Search style={{ resizeMode: 'contain', marginLeft: wp(1.5) }} height={hp(2.2)} width={hp(2.2)} />
                        </TouchableOpacity>

                        <TextInput
                            ref={textInput}
                            style={{ flex:1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                            placeholder="Search pupil"
                            placeholderTextColor={COLORS.menuLightFonts}
                            onSubmitEditing={() =>  onSearchClick(true)}
                            onChangeText={keyword => { props.onSearchKeyword(keyword); setKeyword(keyword)}} />
                      
                        <TouchableOpacity onPress={() => { onSearchClick(false) }} activeOpacity={opacity} >
                            {keyword != "" && <CloseBlack style={{ resizeMode: 'contain', paddingHorizontal: wp(5) }} height={hp(2.2)} width={hp(2.2)} />}
                        </TouchableOpacity>

                        <Menu>
                            <MenuTrigger>
                                <FilterBlack style={styles.searchMenu} height={15} width={15} />
                            </MenuTrigger>
                            <MenuOptions style={styles.filterListWrap}>
                                <MenuOption style={styles.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setSelectedIndex(0); onFilter("name"); }}>
                                        <View style={styles.filterList}>
                                            <Text style={styles.filterListText}>Name</Text>
                                            {selectedIndex == 0 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                                <MenuOption style={styles.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setSelectedIndex(1); onFilter("group"); }}>
                                        <View style={styles.filterList}>
                                            <Text style={styles.filterListText}>Group</Text>
                                            {selectedIndex == 1 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                                <MenuOption style={styles.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setSelectedIndex(2); onFilter("dob"); }}>
                                        <View style={styles.filterList}>
                                            <Text style={styles.filterListText}>DOB</Text>
                                            {selectedIndex == 2 && <TickMarkBlue style={styles.checkMark} height={hp(1.48)} width={hp(1.48)} />}
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>

                    <TouchableOpacity style={styles.buttonGroup} onPress={() => refRBSheet.current.open()}>
                        <AddWhite style={styles.addIcon} height={hp(1.6)} width={hp(1.6)} />
                        <Text style={styles.commonButtonGreenheader}></Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.whiteBg}>
                <View style={styles.lessonPlanTop}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <View style={styles.lessonPlanTab}>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(0); setSelectedTab(0) }}>
                                <Text style={[styles.tabsText, tabIndex == 0 ? styles.tabsTextSelected : null]}>pupil overview</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabs}
                                activeOpacity={opacity}
                                onPress={() => { props.setSelectedTabIndex(1); setSelectedTab(1) }}>
                                <Text style={[styles.tabsText, tabIndex == 1 ? styles.tabsTextSelected : null]}>Class set up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
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
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={styles.popupContent}>
                        <View style={styles.tabcontent}>
                            <View style={styles.beforeBorder}>
                                <Text h2 style={[styles.titleTab, STYLE.centerText]}>Add New Pupil</Text>
                                <View style={styles.entryContentMain}>

                                    <MPopupdataSecondCSVUpload />
                                    <TouchableOpacity
                                        style={styles.entryData}
                                        onPress={() => { refRBSheet.current.close(); props.navigateToCreateNewEvent(); }}>
                                        <ImportIndividual style={styles.entryIcon} height={hp(10)} width={hp(10)} />
                                        <Text style={styles.entryTitle}>ADD MANUALLY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </RBSheet>

        </View>
    );
}
export default TeacheroverViewHeader;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1, borderColor: COLORS.dashBoard,
        paddingBottom: hp(1.23),
        paddingLeft: hp(2),
        paddingRight: hp(2),
    },
    headerMain: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(0.2), },
        shadowOpacity: 0.05,
        shadowRadius: hp(1),
        paddingTop: Platform.OS == 'android' ? hp(1.23) : hp(4.31),
        paddingBottom: hp(1),
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
    },
    mainTitle: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGrayIntro,
    },
    date: {
        fontSize: hp(2.21),
        fontFamily: FONTS.fontRegular,
        color: COLORS.darkGrayIntro,
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
        paddingTop: hp(1),
        paddingBottom: hp(1),
        flex: 1,
    },
    filterListWrap: {
        padding: hp(1),
        backgroundColor: COLORS.white,
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
        right: -5,
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
        justifyContent: 'center'
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
        flexDirection: 'row', marginHorizontal: hp(1.84), alignItems: 'center', marginBottom: hp(0.75), marginTop: hp(1.3), backgroundColor: COLORS.white,
    },
    searchInner: {
        height: '100%', flex: 1, borderColor: COLORS.borderGrp, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },
    searchMenu: {
        height: 15, resizeMode: 'contain', right: 0, alignSelf: 'center',
    },
    whiteBg: {
        paddingBottom: hp(1),
        paddingTop: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: hp(1.84),
        paddingLeft: hp(1.84),
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
});