import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import Popuphomework from '../../reusable/popup/Popuphomework';
import Popupsubmithomework from '../../reusable/popup/Popupsubmithomework';
const { width, height } = Dimensions.get('window');
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { opacity } from "../../../../utils/Constant";
const HeaderWhitepupilMessage = (props) => {

    const textInput = useRef(null);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

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
        <View style={styles.headerMain}>
            <View style={styles.headerMaintop}>
                <View style={styles.menuIconWithTitle}>
                    <Text style={styles.mainTitle}>Global Messaging to Parents</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationBar}
                        onPress={() => null}
                        activeOpacity={opacity}>
                        <Image style={styles.massagesIcon} source={Images.Notification} />
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
                        <Image style={{ height: 20, resizeMode: 'contain' }}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} />
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput}
                        style={{ flex: 1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                        placeholder="Search Messages"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            setKeyword(keyword);
                            props.onSearchKeyword(keyword);
                        }} />
                </View>
                <TouchableOpacity style={styles.buttonGroup}>
                    <Menu style={styles.filterGroup}>
                        <MenuTrigger><Text style={styles.commonButtonBorderedheader}>By Date</Text></MenuTrigger>
                        <MenuOptions>
                            <MenuOption style={styles.borderList}>
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => { setFilterBy('Title'); setSelectedIndex(0) }}>
                                    <View style={styles.filterList}>
                                        <Text style={styles.filterListText}>Title</Text>
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
                    <Image style={styles.filterIcon} source={Images.FilterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonGroup}
                    activeOpacity={opacity}
                    onPress={() => props.onNewMessage()}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
                    <Text style={styles.commonButtonGreenheader}>NEW MESSAGE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default HeaderWhitepupilMessage;

const styles = StyleSheet.create({
    headerMaintop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        paddingTop: Platform.OS == 'android' ? hp(2) : hp(1.6),
        backgroundColor: COLORS.white,
    },
    headerMain: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: hp(1), },
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
        width: 40,
        height: 40,
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
        right: 30,
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
        paddingRight: hp(1.8),
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
    calnderDashHeaderIcon: {
        width: 40,
        resizeMode: 'contain',
        height: 40,
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
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 50,
        width: '100%',
        paddingLeft: hp(2.99),
        paddingRight: hp(4.16),
        marginTop: 15,
        paddingBottom: 5,
    },
    searchInner: {
        height: '100%',
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        borderRadius: 10,
        width: width - 295,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
    },
    searchMenu: {
        height: 20, resizeMode: 'contain', right: 0, alignSelf: 'center',
    },
});