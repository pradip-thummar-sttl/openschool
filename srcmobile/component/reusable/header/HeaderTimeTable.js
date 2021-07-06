import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, TextInput, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import { opacity } from "../../../utils/Constant";
import PopupAddNewData from "../../../component/reusable/popup/Popupaddnewdata";

const HeaderTimeTable = (props) => {
    const textInput = useRef(null);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')

    useEffect(() => {
        if (!isSearchActive) {
            // props.onClearSearch()
            textInput.current.clear()
        } else {
            props.onSearch()
        }
    }, [isSearchActive])
    return (
        <View style={styles.headerMain}>
            <View style={styles.menuIconWithTitle}>
                <TouchableOpacity><Image source={Images.menuIconTop} style={styles.menuIcon} /></TouchableOpacity>
                <Text style={styles.mainTitle}>Title</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    onPress={() => props.onCalenderPress()}
                    style={styles.notificationBar}
                    activeOpacity={opacity}>
                    <Image style={styles.calnderDashHeaderIcon} source={Images.calnderDashHeaderIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.onAlertPress()}
                    style={styles.notificationBar}
                    activeOpacity={opacity}>
                    <Image style={styles.massagesIcon} source={Images.Notification} />
                </TouchableOpacity>
            </View>
            <View style={styles.filterbarMain}>
                <View style={styles.field}>
                    <TextInput
                        ref={textInput}
                        style={[STYLE.commonInput, styles.searchHeader]}
                        placeholder="Search subject, class, etc"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => {
                            props.onSearchKeyword(keyword);
                        }} />
                    <TouchableOpacity
                        style={styles.userIcon1Parent}
                        activeOpacity={opacity}
                        onPress={() => {
                            isSearchActive ?
                                setSearchActive(false)
                                :
                                setSearchActive(true)
                        }}>
                        <Image
                            style={styles.userIcon1}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={styles.buttonGroup}>
                    <Menu style={styles.filterGroup}>
                        <MenuTrigger><Text style={styles.commonButtonBorderedheader}>by subject</Text></MenuTrigger>
                        <MenuOptions style={styles.filterListWrap}>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Subject</Text>
                                    <Image source={Images.CheckIcon} style={styles.checkMark} />
                                </View>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Date</Text>
                                </View>
                            </MenuOption>
                            <MenuOption style={styles.borderList}>
                                <View style={styles.filterList}>
                                    <Text style={styles.filterListText}>Name</Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Image style={styles.filterIcon} source={Images.FilterIcon} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.buttonGroup}>
                    <Image style={styles.addIcon} source={Images.AddIconWhite} />
                    <Text style={styles.commonButtonGreenheader}>Add Entry</Text>
                </TouchableOpacity> */}
                <PopupAddNewData />
            </View>
        </View>
    );
}
export default HeaderTimeTable;

const styles = StyleSheet.create({
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: hp(1.95),
        paddingRight: hp(1.95),
        paddingTop: hp(5),
        paddingBottom: hp(1),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.01,
        shadowRadius: 5,
        elevation: 1,
        marginBottom: hp(1.95),
        backgroundColor: COLORS.white,
    },
    mainTitle: {
        fontSize: hp(2.34),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.darkGray,
    },
    notificationBar: {
        marginLeft: hp(1.25),
    },
    massagesIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    menuIconWithTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: hp(2.60),
        resizeMode: 'contain',
        marginRight: hp(1.56),
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
    userIcon: {
        position: 'absolute',
        top: hp(1.1),
        width: hp(1.9),
        resizeMode: 'contain',
        left: hp(1.43),
    },
    userIcon1: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: hp(1.43),
    },
    userIcon1Parent: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: hp(1.43),
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
    buttonGroup: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp(1.69),
    },
    filterIcon: {
        width: hp(1.74),
        resizeMode: 'contain',
        position: 'absolute',
        right: hp(1.30),
        top: hp(1.19),
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
        paddingTop: hp(1),
        paddingLeft: hp(1.2),
        paddingRight: hp(1.2),
        paddingBottom: hp(1),
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: hp(5.5),
        width: hp(30.98),
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
        width: 40,
        resizeMode: 'contain',
        height: 40,
    },
});