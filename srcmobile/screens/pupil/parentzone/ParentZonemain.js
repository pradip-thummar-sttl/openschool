import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import ParentZoneProfile from "./ParentZoneProfile";
import ParentZoneSchoolDetails from "./ParentZoneSchoolDetails";
import ParentZonePerformance from "./ParentZonePerformance";
import { User } from "../../../utils/Model";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import ParentChat from "./Chat/ParentChat";
var moment = require('moment');

const MessageList = (props) => {
    return (
        <View style={{ marginHorizontal: 10 }}>
            <View style={PAGESTYLE.feeds} onPress={(null)}>
                <View style={PAGESTYLE.leftContent}>
                    <View style={PAGESTYLE.dateGrp}>
                        <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>{moment(props.item.CreatedDate).format('DD/MM/yyyy')}</Text></View>
                        {/* <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View> */}
                    </View>
                    <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>{props.item.Title}</Text></View>
                    <View><Text style={PAGESTYLE.message}>{props.item.Message}</Text></View>
                    {/* <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusSent}>Sent</Text></View> */}
                </View>
                {/* <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View> */}
            </View>
        </View>
    )
}


const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [pupilData, setPupilData] = useState(User.user.ChildrenList[0])

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [messageData, setMessageData] = useState([])

    const [isSearchActive, setSearchActive] = useState(false)
    const textInput = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [filterBy, setFilterBy] = useState('Date')
    const [keyword, setKeyword] = useState('')

    const messageRender = ({ item, index }) => {
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

        Service.post(data, `${EndPoints.PupilGlobalMessaging}/${User.user.MobileNumber}`, (res) => {
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
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onSwitchPupil={(pupilData) => setPupilData(pupilData)}
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')}
                    onSearchKeyword={(keyword) => setKeyword(keyword)}
                    onSearch={() => fetchRecord(keyword, filterBy)}
                    onClearSearch={() => { setKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)} />
                {selectedTabIndex == 0 ?
                    isLoading ?
                        <ActivityIndicator
                            style={{ flex: 1, marginTop: 20 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        messageData.length > 0 ?
                            <FlatList
                                style={{ marginTop: 10, height: '77%' }}
                                data={messageData}
                                renderItem={messageRender}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                showsVerticalScrollIndicator={false} />
                            :
                            <View style={{ height: 100, justifyContent: 'center' }}>
                                <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            </View>

                    :
                    selectedTabIndex == 1 ?
                        <ParentZonePerformance
                            data={pupilData} />
                        :
                        selectedTabIndex == 2 ?
                            <ParentChat
                                data={pupilData}
                                tabs={1} />
                            :
                            selectedTabIndex == 3 ?
                                null
                                :
                                selectedTabIndex == 4 ?
                                    <ParentZoneProfile
                                        data={pupilData}
                                        navigateToDetail={() => props.navigation.navigate('ParentZoneProfileEdit', { data: pupilData })} />
                                    :
                                    <ParentZoneSchoolDetails
                                        data={pupilData} />
                }
            </View>
        </View>
    );
}

export default ParentZonemain;