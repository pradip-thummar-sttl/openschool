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
var moment = require('moment');

const MessageList = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.firstColumn}>
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.Title}</Text>
        </View>
        <View style={PAGESTYLE.firstColumn}>
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.Message}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>{moment(props.item.CreatedDate).format('DD/MM/yyyy')}</Text>
        </View>
        {/* <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, props.item.Submited ? PAGESTYLE.yesText : PAGESTYLE.noText}>Group 1A</Text>
        </View>
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.sentBlueText]}>Sent</Text>
        </View> */}
        {/* <View style={{ right: 10, position: 'absolute' }}>
            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
        </View> */}
    </View>
);

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [isProfileEdit, setProfileEdit] = useState(false)
    const [pupilData, setPupilData] = useState(User.user.ChildrenList[0])
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
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <HeaderPM
                    onSwitchPupil={(pupilData) => setPupilData(pupilData)}
                    setSelectedTabIndex={(tab) => { setProfileEdit(false); setSelectedTabIndex(tab) }}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')}
                    onSearchKeyword={(keyword) => setKeyword(keyword)}
                    onSearch={() => fetchRecord(keyword, '')}
                    onClearSearch={() => { setKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', '')} />

                {isProfileEdit ?
                    <ParentZoneProfileEdit
                        data={pupilData}
                        navigateToProfile={() => setProfileEdit(false)} />
                    :
                    selectedTabIndex == 0 ?
                        <View style={PAGESTYLE.whiteBg}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={PAGESTYLE.managementDetail}>
                                    <View style={PAGESTYLE.plainBg}>
                                        <View style={PAGESTYLE.pupilTable}>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Message title</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Message</Text>
                                            </View>
                                            <View>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Date</Text>
                                            </View>
                                            {/* <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Class</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Status</Text>
                                            </View> */}
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
                                                        <View style={{ height: 100, justifyContent: 'center' }}>
                                                            <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                        </View>
                                                }
                                            </SafeAreaView>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        selectedTabIndex == 1 ?
                            null
                            :
                            selectedTabIndex == 2 ?
                                null
                                :
                                selectedTabIndex == 3 ?
                                    null
                                    :
                                    selectedTabIndex == 4 ?
                                        <ParentZoneProfile
                                            data={pupilData}
                                            navigateToDetail={() => setProfileEdit(true)} />
                                        :
                                        <ParentZoneSchoolDetails
                                            data={pupilData} />
                }
            </View>
        </View>
    );
}
export default ParentZonemain;