import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant";
import Images from "../../../utils/Images";
import { User } from "../../../utils/Model";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import HeaderPM from "./HeaderPM";
import ParentZoneProfile from "./ParentZoneProfile";
import ParentZoneSchoolDetails from "./ParentZoneSchoolDetails";
import ParentZoneProfileEdit from "./ParentZoneProfileEdit";
import ParentZonePerformance from "./ParentZonePerformance";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../utils/Messages";
import ParentChat from "./Chat/ParentChat";
var moment = require('moment');

const MessageList = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.firstColumn}>
            <Text numberOfLines={1} style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.Title}</Text>
        </View>
        <View style={PAGESTYLE.firstColumn}>
            <Text numberOfLines={1} style={[PAGESTYLE.message, PAGESTYLE.userStampName]}>{props.item.Message}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={[PAGESTYLE.message, PAGESTYLE.userStampName]}>{moment(props.item.CreatedDate).format('DD/MM/yyyy')}</Text>
        </View>
    </View>
);

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [isProfileEdit, setProfileEdit] = useState(false)
    const [pupilData, setPupilData] = useState(User.user.ChildrenList)
    const [pupilIndex, setPupilIndex] = useState(0)
    const [keyword, setKeyword] = useState('')

    const [messageData, setMessageData] = useState([])

    const messageRender = ({ item, index }) => {
        return (
            <MessageList
                item={item}
                navigateToDetail={() => { }} />
        );
    };

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
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
        console.log('refreshed');
        fetchRecord('', '')
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <HeaderPM
                    onSwitchPupil={(pupilData) => setPupilIndex(pupilData)}
                    data={pupilData}
                    setSelectedTabIndex={(tab) => { setProfileEdit(false); setSelectedTabIndex(tab) }}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')}
                    onSearchKeyword={(keyword) => setKeyword(keyword)}
                    onSearch={() => fetchRecord(keyword, '')}
                    onClearSearch={() => { setKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', '')} />

                {isProfileEdit ?
                    <ParentZoneProfileEdit
                        data={pupilData[pupilIndex]}
                        navigateToProfile={() => { setProfileEdit(false); setPupilData(User.user.ChildrenList) }} />
                    :
                    selectedTabIndex == 0 ?
                        <View style={PAGESTYLE.plainBg}>
                            <ScrollView style={PAGESTYLE.flexDiv} showsVerticalScrollIndicator={false}>
                                <View style={PAGESTYLE.managementDetail}>
                                    <View style={PAGESTYLE.table}>
                                        <View style={PAGESTYLE.pupilTable}>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Message title</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Message</Text>
                                            </View>
                                            <View>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainTitle,{marginLeft:-10}]}>Date</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}></Text>
                                            </View>
                                        </View>
                                        <View>
                                            <SafeAreaView>
                                                {isLoading ?
                                                    <ActivityIndicator
                                                        style={{ flex: 1 }}
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.yellowDark} />
                                                    :
                                                    messageData.length > 0 ?
                                                        <FlatList
                                                            style={{ marginTop: 10 }}
                                                            data={messageData}
                                                            renderItem={messageRender}
                                                            keyExtractor={(item) => item.id}
                                                            extraData={selectedId}
                                                            showsVerticalScrollIndicator={false} />
                                                        :
                                                        // <View style={{ height: 100, justifyContent: 'center' }}>
                                                        //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                        // </View>
                                                        <EmptyStatePlaceHohder image={Images.noMessage} title1={MESSAGE.noMessagePrent1} title2={MESSAGE.noMessagePrent2} />
                                                }
                                            </SafeAreaView>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        selectedTabIndex == 1 ?
                            <ParentZonePerformance
                                data={pupilData[pupilIndex]} />
                            :
                            selectedTabIndex == 2 ?
                                <ParentChat
                                    data={pupilData[pupilIndex]}
                                    tabs={1} />
                                :
                                selectedTabIndex == 3 ?
                                    null
                                    :
                                    selectedTabIndex == 4 ?
                                        <ParentZoneProfile
                                            data={pupilData[pupilIndex]}
                                            navigateToDetail={() => setProfileEdit(true)} />
                                        :
                                        <ParentZoneSchoolDetails
                                            data={pupilData[pupilIndex]} />
                }
            </View>
        </View>
    );
}
export default ParentZonemain;