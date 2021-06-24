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

const Pupillist = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
            <Image source={{ uri: baseUrl + props.item.ProfilePicture }} style={PAGESTYLE.userStamp} />
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>Back to school newsletter from the headteacher</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>14/09/2020</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, props.item.Submited ? PAGESTYLE.yesText : PAGESTYLE.noText}>Group 1A</Text>
        </View>
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.sentBlueText]}>Sent</Text>
        </View>
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.lastColumn]}>
            <TouchableOpacity
                style={PAGESTYLE.pupilDetailLink}
                activeOpacity={opacity}
                onPress={() => props.navigateToDetail()}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>
        </View>
    </View>
);

const pupilRender = ({ item, index }) => {
    return (
        <Pupillist
            item={item}
            navigateToDetail={() => props.navigateToDetail(item)}
            onAlertPress={() => { props.onAlertPress() }}
        />
    );
};

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [isProfileEdit, setProfileEdit] = useState(false)

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <HeaderPM
                    setSelectedTabIndex={(tab) => { setProfileEdit(false); setSelectedTabIndex(tab) }}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')} />

                {isProfileEdit ?
                    <ParentZoneProfileEdit
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
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Date</Text>
                                            </View>
                                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Class</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Status</Text>
                                            </View>
                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}></Text>
                                            </View>
                                        </View>
                                        <View style={PAGESTYLE.pupilTabledata}>
                                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                                {isLoading ?
                                                    <ActivityIndicator
                                                        style={{ flex: 1 }}
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.yellowDark} />
                                                    :
                                                    homeworkData.length > 0 ?
                                                        <FlatList
                                                            data={homeworkData}
                                                            renderItem={pupilRender}
                                                            keyExtractor={(item) => item.id}
                                                            extraData={selectedId}
                                                            showsVerticalScrollIndicator={false}
                                                        />
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
                                            navigateToDetail={() => setProfileEdit(true)} />
                                        :
                                        <ParentZoneSchoolDetails />
                }
            </View>
        </View>
    );
}
export default ParentZonemain;