import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, Platform, BackHandler, ToastAndroid } from 'react-native'
import HeaderWhitepupilMessage from '../../../component/reusable/header/HeaderWhitepupilMessage';
import COLORS from '../../../../utils/Colors'
import { opacity, showMessage } from '../../../../utils/Constant';
// import Images from '../../../../utils/Images'
import PAGESTYLE from './Style'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from '../../../../utils/Fonts'
import { Service } from '../../../../service/Service';
import { EndPoints } from '../../../../service/EndPoints';
// import { User } from '../../../../utils/Model';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import CloseBlack from '../../../../svg/teacher/timetable/Close_Black';
import SearchBlue from '../../../../svg/teacher/timetable/Search_Blue';
import AddWhite from '../../../../svg/teacher/timetable/Add_White';
import ArrowNext from '../../../../svg/teacher/lessonhwplanner/ArrowNext';
import { BadgeIcon, User } from "../../../../utils/Model";
import FilterBlack from '../../../../svg/teacher/timetable/Filter_Black';
import TickMarkBlue from '../../../../svg/teacher/dashboard/TickMark_Blue';

var moment = require('moment');

const SchoolMessage = (props) => {
    let currentCount = 0
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const handleBackButtonClick = () => {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
        }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App', ToastAndroid.SHORT)
        }
        setTimeout(() => {
            currentCount = 0;
        }, 2000);

        return true;
    }

    const onSearchClick = (search) => {

        if (search && keyword != "") {
            fetchRecord(keyword, filterBy)
        }
        else if (!search) {
            textInput.current.clear()
            setKeyword("");
            fetchRecord('', filterBy)
        }
    }

    const searchHeader = () => {
        return (
            <View style={PAGESTYLE.searchParent}>
                <View style={PAGESTYLE.searchInner}>
                   
                    <TouchableOpacity onPress={() => { onSearchClick(true) }} activeOpacity={opacity} >
                        <SearchBlue height={20} width={20} />
                    </TouchableOpacity>

                    <TextInput
                        ref={textInput}
                        style={{ flex: 1, height: '100%', paddingHorizontal: 10, fontSize: hp(1.82), fontFamily: FONTS.fontSemiBold,paddingVertical:0 }}
                        placeholder="Search message"
                        placeholderTextColor={COLORS.menuLightFonts}
                        multiline={false}
                        onChangeText={keyword => { setKeyword(keyword); keyword == "" && onSearchClick(false); }} 
                        onSubmitEditing={()=>keyword != "" && onSearchClick(true)}/>

                     <TouchableOpacity onPress={() => { onSearchClick(false) }} activeOpacity={opacity} style={{marginRight:wp(2)}} >
                        {keyword != "" && <CloseBlack height={20} width={20} />}
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={opacity}>
                        <Menu style={PAGESTYLE.filterGroup}>
                            <MenuTrigger>
                                <FilterBlack style={PAGESTYLE.searchMenu} height={15} width={15} />
                            </MenuTrigger>
                            <MenuOptions style={PAGESTYLE.filterListWrap}>
                                <MenuOption style={PAGESTYLE.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setFilterBy('Title'); setSelectedIndex(0) }}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Text style={PAGESTYLE.filterListText}>Title</Text>
                                            {selectedIndex == 0 ?
                                                <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />
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
                                                <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />
                                                :
                                                null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </MenuOption>
                                <MenuOption style={PAGESTYLE.borderList}>
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => { setFilterBy('Status'); setSelectedIndex(2) }}>
                                        <View style={PAGESTYLE.filterList}>
                                            <Text style={PAGESTYLE.filterListText}>Status</Text>
                                            {selectedIndex == 2 ?
                                                <TickMarkBlue style={PAGESTYLE.checkMark} height={hp(1.48)} width={hp(1.48)} />
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
                    onPress={() => props.navigation.navigate('SchoolNewMessage', { onGoBack: () => onSearchClick(false) })}>
                    <AddWhite style={PAGESTYLE.addIcon4} height={hp(1.56)} width={hp(1.56)} />
                </TouchableOpacity>
            </View>


        )
    }

    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [keyword, setKeyword] = useState('')

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [messageData, setMessageData] = useState([])

    const MessageList = (item) => {
        return (
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => props.navigation.navigate('SchoolNewMessage', { onGoBack: () => fetchRecord('', ''), data: item.item })}>
                <View style={PAGESTYLE.flateMainView}>
                    <View style={PAGESTYLE.firstRow}>
                        <Text style={PAGESTYLE.dateText}>{moment(item.item.CreatedDate).format('DD/MM/yyyy')}</Text>
                        {/* <Text style={PAGESTYLE.groupText}>Group A</Text> */}
                    </View>
                    <View style={PAGESTYLE.secondRow}>
                        <Text numberOfLines={1} style={[PAGESTYLE.titleText,{width:'85%'}]}>{item.item.Title}</Text>
                        {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                        <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1)} width={hp(1)}  />
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
    //     ('', )
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
        Service.post(data, `${EndPoints.GlobalMessaging}/${User.user._id}/S`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all global messages', res)
                setMessageData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all global messages', err)
        })
    }

    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => fetchRecord('', '') })
    }

    return (
        <View>
            <HeaderWhitepupilMessage
                onAlertPress={() => props.navigation.openDrawer()} 
                title={'Global Messaging'}
                onNotification={() => openNotification()}
            />

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
                    // <View style={{ height: 100, justifyContent: 'center' }}>
                    //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                    // </View>
                    <EmptyStatePlaceHohder holderType={2}  title1={MESSAGE.noMessage1} title2={MESSAGE.noMessage2} />
            }
        </View>
    )
}

export default SchoolMessage
