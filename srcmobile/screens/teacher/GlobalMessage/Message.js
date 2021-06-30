import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator } from 'react-native'
import HeaderWhitepupilMessage from '../../../component/reusable/header/HeaderWhitepupilMessage';
import COLORS from '../../../utils/Colors'
import { opacity, showMessage } from '../../../utils/Constant';
import Images from '../../../utils/Images'
import PAGESTYLE from './Style'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../utils/Fonts'
import { Service } from '../../../service/Service';
import { EndPoints } from '../../../service/EndPoints';
import { User } from '../../../utils/Model';
var moment = require('moment');

const Message = (props) => {
    const searchHeader = () => {
        return (
            <View style={PAGESTYLE.searchParent}>
                <View style={PAGESTYLE.searchInner}>
                    <TouchableOpacity
                        activeOpacity={opacity}
                        onPress={() => {
                            keyword ?
                                refresh()
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
                                        onPress={() => { setFilterBy('Title'); setSelectedIndex(0) }}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Text style={PAGESTYLE.filterListText}>Title</Text>
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
                <TouchableOpacity
                    style={PAGESTYLE.buttonGroup}
                    onPress={() => props.navigation.navigate('NewMessage', { onGoBack: () => refresh() })}>
                    <Image style={PAGESTYLE.addIcon} source={Images.AddIconWhite} />
                </TouchableOpacity>
            </View>


        )
    }

    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [messageData, setMessageData] = useState([])

    const MessageList = (item) => {
        return (
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => props.navigation.navigate('NewMessage', { onGoBack: () => fetchRecord('', ''), data: item.item })}>
                <View style={PAGESTYLE.flateMainView}>
                    <View style={PAGESTYLE.firstRow}>
                        <Text style={PAGESTYLE.dateText}>{moment(item.item.CreatedDate).format('DD/MM/yyyy')}</Text>
                        {/* <Text style={PAGESTYLE.groupText}>Group A</Text> */}
                    </View>
                    <View style={PAGESTYLE.secondRow}>
                        <Text style={PAGESTYLE.titleText}>{item.item.Title}</Text>
                        <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                    </View>
                    <View style={item.item.Status == 'Draft' ? PAGESTYLE.thirdRowDraft : PAGESTYLE.thirdRow}>
                        <Text style={item.item.Status == 'Draft' ? PAGESTYLE.draftText : PAGESTYLE.sentText}>{item.item.Status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const messageRender = ({ item, index }) => {
        return (
            <MessageList
                item={item}
                navigateToDetail={() => { }} />
        );
    };

    // useEffect(() => {
    //     fetchRecord('', )
    // }, [])

    useEffect(() => {
        fetchRecord('', filterBy)
    }, [filterBy])

    const fetchRecord = (searchby, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchby,
            Filterby: filterBy
        }

        Service.post(data, `${EndPoints.GlobalMessaging}/${User.user._id}/T`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setMessageData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        if (isSearchActive) {
            textInput.current.clear()
            setSearchActive(false)
            fetchRecord('', filterBy)
        } else {
            setSearchActive(true)
            fetchRecord(keyword, filterBy)
        }
    }

    return (
        <View>
            <HeaderWhitepupilMessage />
            {searchHeader()}
            {isLoading ?
                <ActivityIndicator
                    style={{ flex: 1, marginTop: 20 }}
                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                    color={COLORS.yellowDark} />
                :
                messageData.length > 0 ?
                    <FlatList
                        style={{ marginTop: 10, height: '80%' }}
                        data={messageData}
                        renderItem={messageRender}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsVerticalScrollIndicator={false} />
                    :
                    <View style={{ height: 100, justifyContent: 'center' }}>
                        <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                    </View>
            }
        </View>
    )
}

export default Message