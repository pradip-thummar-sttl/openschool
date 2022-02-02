import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native'
import HeaderWhitepupilMessage from '../../../component/reusable/header/HeaderWhitepupilMessage';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import { EndPoints } from '../../../../service/EndPoints';
import { Service } from '../../../../service/Service';
import COLORS from '../../../../utils/Colors';
import { opacity, showMessage } from '../../../../utils/Constant';
// import Images from '../../../../utils/Images';
import MESSAGE from '../../../../utils/Messages';
import { User } from '../../../../utils/Model';
import NewMessage from './NewMessage';
import PAGESTYLE from './Styles';
import ArrowNext from '../../../../svg/teacher/lessonhwplanner/ArrowNext';
import HidePassword from '../../../../svg/teacher/login/HidePassword';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Message = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [messageData, setMessageData] = useState([])

    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('')
    const [keyword, setKeyword] = useState('')
    const [isAddMessage, setAddMessage] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    const pupilRender = ({ item, index }) => {
        return (
            <MessageList
                item={item}
                navigateToDetail={() => { }} />
        );
    };

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

    const MessageList = (item, { style }) => (
        <TouchableOpacity
            activeOpacity={opacity}
            onPress={() => { setSelectedItem(item.item); setAddMessage(true); }}>
            <View style={[PAGESTYLE.pupilData]}>
                <View style={[PAGESTYLE.pupilProfileMessage]}>
                    <Text numberOfLines={1} style={[PAGESTYLE.pupilName,{ paddingStart : 20}]}>{item.item.Title}</Text>
                </View>

                <View style={PAGESTYLE.pupilProfileDate}>
                    <Text style={PAGESTYLE.pupilName}>{moment(item.item.CreatedDate).format('DD/MM/yyyy')}</Text>
                </View>
                {/* <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
                <Text style={PAGESTYLE.pupilName}>{'group 1'}</Text>
            </View> */}

                <View style={PAGESTYLE.pupilProfileStatus}>
                    <Text style={[PAGESTYLE.pupilName, item.item.Status == 'Draft' ? PAGESTYLE.noText : PAGESTYLE.yesText, ]}>{item.item.Status}</Text>
                </View>

                <View style={[PAGESTYLE.lastColumnArrow]}>
                    {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(1.51)} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ width: '93%', }}>
            <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
                {!isAddMessage ?
                    <>
                        <HeaderWhitepupilMessage
                            navigation = {props.navigation}
                            onSearchKeyword={(keyword) => setKeyword(keyword)}
                            onSearch={() => fetchRecord(keyword, filterBy)}
                            onClearSearch={() => { setKeyword(''); fetchRecord('', '') }}
                            onFilter={(filterBy) => fetchRecord('', filterBy)}
                            onNewMessage={() => setAddMessage(true)} />

                        <View style={{ backgroundColor: COLORS.greyBack, flex:1 }}>
                            {isLoading ?
                                <ActivityIndicator
                                    style={{ flex: 1, marginTop: 20 }}
                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                    color={COLORS.yellowDark} />
                                :
                                messageData.length > 0 ? <>
                                    <View style={[PAGESTYLE.pupilTable]}>
                                        <View style={PAGESTYLE.pupilTableHeadingMessage}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>MESSAGE TITLE</Text>
                                        </View>
                                        <View style={PAGESTYLE.pupilTableHeadingDate}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>DATE</Text>
                                        </View>
                                        <View style={PAGESTYLE.pupilTableHeadingStatus}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>STATUS</Text>
                                        </View>
                                    </View>
                                    <FlatList
                                        style={{ height: '77%' }}
                                        data={messageData}
                                        renderItem={pupilRender}
                                        keyExtractor={(item) => item.id}
                                        extraData={selectedId}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </>
                                    :
                                    // <View style={{ height: 100, justifyContent: 'center' }}>
                                    //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                    // </View>
                                    <View style={{ backgroundColor: COLORS.white, flex:1, justifyContent: 'center', marginHorizontal: 15, marginBottom: 15 }}>
                                    <EmptyStatePlaceHohder holderType={2} title1={MESSAGE.noMessage1} title2={MESSAGE.noMessage2} />
                                    </View>
                            }
                        </View>
                    </>
                    :
                    <NewMessage
                        selectedItem={selectedItem}
                        onGoBack={() => { setAddMessage(false); fetchRecord('', '') }}
                        goBack={() => {setAddMessage(false); setSelectedItem(null) }} />
                }
            </SafeAreaView>
        </View>
    );

}

export default Message;
