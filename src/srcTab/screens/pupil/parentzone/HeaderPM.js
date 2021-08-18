import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import FONTS from '../../../../utils/Fonts';
import PAGESTYLE from './Style';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { baseUrl, opacity } from "../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import PopupdataSecond from "../../../component/reusable/popup/PopupdataSecond";
import { User } from "../../../../utils/Model";

const HeaderPM = (props) => {
    const refRBSheet = useRef();
    const textInput = useRef(null);
    const [tabIndex, setSelectedTab] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [selectedPupilIndex, setSelectedPupilIndex] = useState(0)
    const [filterBy, setFilterBy] = useState('Date')
    const [isModalVisible, setModalVisible] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [childrenList, setChildrenList] = useState(props.data)

    useEffect(() => {
        setChildrenList(props.data);
    }, [props.data]);

    useEffect(() => {
        if (!isSearchActive && textInput.current) {
            props.onClearSearch()
            setKeyword('')
            textInput.current.clear()
        } else {
            props.onSearch()
        }
    }, [isSearchActive])

    return (
        <View style={PAGESTYLE.headerBarMainWhite}>
            <View style={PAGESTYLE.headerMain}>
                <Text style={PAGESTYLE.mainTitle}>Parent Zone</Text>

                <View style={PAGESTYLE.headerRight}>

                    <View style={PAGESTYLE.filterListWrapNew}>
                        <Menu>
                            <MenuTrigger style={PAGESTYLE.filterGroup}>
                                <Image source={childrenList.length == 0 ? Images.userparent : { uri: baseUrl + childrenList[selectedPupilIndex].ProfilePicture }} style={{ width: hp(3.5), height: hp(3.5), borderRadius: hp(100), resizeMode: 'cover', marginRight: hp(1), }} />
                                <Text style={PAGESTYLE.selectDropList} numberOfLines={1} ellipsizeMode='tail'>{childrenList.length == 0 ? '' : childrenList[selectedPupilIndex].FirstName + ' ' + childrenList[selectedPupilIndex].LastName}</Text>
                                <Image style={PAGESTYLE.dropArrow} source={Images.DropArrow} />
                            </MenuTrigger>
                            <MenuOptions style={PAGESTYLE.filterListWrap}>
                                {childrenList.map((item, index) => (
                                    <MenuOption style={PAGESTYLE.borderList}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { props.onSwitchPupil(index); setSelectedPupilIndex(index) }}>
                                            <View style={PAGESTYLE.filterList}>
                                                <Image source={{ uri: baseUrl + item.ProfilePicture }} style={{ width: hp(3.81), height: hp(3.81), borderRadius: hp(100), resizeMode: 'cover', marginRight: hp(1), }} />
                                                <Text style={PAGESTYLE.filterListText}>{item.FirstName} {item.LastName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MenuOption>
                                ))}
                                <MenuOption>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => props.navigateToAddNewUser()}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Image style={PAGESTYLE.addIcon} source={Images.AddIcon} />
                                            <Text style={PAGESTYLE.filterListTextAddUser}>add new user</Text>
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>


                    </View>

                    <TouchableOpacity style={PAGESTYLE.notificationBar}>
                        <Image style={PAGESTYLE.massagesIcon} source={Images.Notification} />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={[PAGESTYLE.filterAlign]}>
                <View style={PAGESTYLE.tabLinks}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(0); setSelectedTab(0) }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 0 ? PAGESTYLE.tabLinkSelected : null]}>Newsfeed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(1); setSelectedTab(1); console.log(tabIndex); }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 1 ? PAGESTYLE.tabLinkSelected : null]}>Performance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(2); setSelectedTab(2) }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 2 ? PAGESTYLE.tabLinkSelected : null]}>Chat</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(3); setSelectedTab(3) }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 3 ? PAGESTYLE.tabLinkSelected : null]}>Faq</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(4); setSelectedTab(4) }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 4 ? PAGESTYLE.tabLinkSelected : null]}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => { props.setSelectedTabIndex(5); setSelectedTab(5) }}>
                        <Text style={[PAGESTYLE.tabLinkGrey, tabIndex == 5 ? PAGESTYLE.tabLinkSelected : null]}>My School</Text>
                    </TouchableOpacity>
                </View>
                {tabIndex == 0 ?
                    <View style={PAGESTYLE.searchParent}>
                        <View style={PAGESTYLE.searchInner}>
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
                                    source={Images.SearchIcon} />
                            </TouchableOpacity>
                            <TextInput
                                ref={textInput}
                                style={{ flex: 1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                                placeholder="Search message"
                                maxLength={50}
                                placeholderTextColor={COLORS.menuLightFonts}
                                onChangeText={keyword => {
                                    setKeyword(keyword);
                                    props.onSearchKeyword(keyword);
                                }} />
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        </View>
    )
}
export default HeaderPM;