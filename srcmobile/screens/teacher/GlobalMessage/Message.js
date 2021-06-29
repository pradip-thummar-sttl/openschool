import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import HeaderWhitepupilMessage from '../../component/reusable/header/HeaderWhitepupilMessage'
import COLORS from '../../utils/Colors'
import { opacity } from '../../utils/Constant'
import Images from '../../utils/Images'
import PAGESTYLE from './Style'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../utils/Fonts'


const Message = () => {
    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)

    const searchHeader = () => {
        return (

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
                        <Image style={{ height: 15, resizeMode: 'contain' }}
                            source={isSearchActive ? Images.PopupCloseIcon : Images.SearchIcon} />
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput}
                        style={{ flex: 1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold, }}
                        placeholder="Search subject, topic name etc"
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={keyword => { setKeyword(keyword) }} />
                    <TouchableOpacity
                        activeOpacity={opacity}>
                        <Menu style={PAGESTYLE.filterGroup}>
                            <MenuTrigger><Image style={PAGESTYLE.searchMenu} source={Images.mobileFilter} /></MenuTrigger>
                            <MenuOptions style={PAGESTYLE.filterListWrap}>
                                <MenuOption style={PAGESTYLE.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setFilterBy('Subject'); setSelectedIndex(0) }}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Text style={PAGESTYLE.filterListText}>Subject</Text>
                                            {selectedIndex == 0 ?
                                                <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                :
                                                null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                                <MenuOption style={PAGESTYLE.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setFilterBy('Date'); setSelectedIndex(1) }}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Text style={PAGESTYLE.filterListText}>Date</Text>
                                            {selectedIndex == 1 ?
                                                <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                                :
                                                null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={PAGESTYLE.buttonGroup}>
                    <Image style={PAGESTYLE.addIcon} source={Images.AddIconWhite} />
                </TouchableOpacity>
            </View>


        )
    }
    return (
        <View>
            <HeaderWhitepupilMessage />
            {searchHeader()}
            <FlatList
                style={{ marginTop: 10 }}
                data={[1, 2]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={PAGESTYLE.flateMainView}>
                            <View style={PAGESTYLE.firstRow}>
                                <Text style={PAGESTYLE.dateText}>14/09/1994</Text>
                                <Text style={PAGESTYLE.groupText}>Group A</Text>
                            </View>
                            <View style={PAGESTYLE.secondRow}>
                                <Text style={PAGESTYLE.titleText}>title</Text>
                                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                            </View>
                            <View style={PAGESTYLE.thirdRow}>
                            <Text style={PAGESTYLE.sentText}>SENT</Text>

                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Message
