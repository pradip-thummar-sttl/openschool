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


const PupilParentZoneNewsFeed = () => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
console.log( renderItem={pupilRender});
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <View style={PAGESTYLE.headerBarMainWhite}>
                    <View style={PAGESTYLE.headerMain}>
                        <Text style={PAGESTYLE.mainTitle}>Parent Zone</Text>

                        <View style={PAGESTYLE.headerRight}>

                            <View style={PAGESTYLE.filterListWrapNew}>
                                <Menu>
                                <MenuTrigger style={PAGESTYLE.filterGroup}>
                                    <View style={PAGESTYLE.smlFilterThumb}></View>
                                    <Text style={PAGESTYLE.selectDropList}>Reuel Pardesi</Text>
                                    <Image style={PAGESTYLE.dropArrow} source={Images.DropArrow} />
                                </MenuTrigger>
                                    <MenuOptions style={PAGESTYLE.filterListWrap}>
                                        <MenuOption style={PAGESTYLE.borderList}>
                                            <View style={PAGESTYLE.filterList}>
                                            <View style={PAGESTYLE.smlFilterThumb}></View>
                                                <Text style={PAGESTYLE.filterListText}>Reuel Pardesi</Text>
                                                <Image source={Images.CheckIcon} style={PAGESTYLE.checkMark} />
                                            </View>
                                        </MenuOption>
                                        <MenuOption style={PAGESTYLE.borderList}>
                                            <View style={PAGESTYLE.filterList}>
                                            <View style={PAGESTYLE.smlFilterThumb}></View>
                                                <Text style={PAGESTYLE.filterListText}>Elysian Pardesi</Text>
                                            </View>
                                        </MenuOption>
                                        <MenuOption style={PAGESTYLE.borderList}>
                                            <View style={PAGESTYLE.filterList}>
                                                <View style={PAGESTYLE.smlFilterThumb}></View>
                                                <Image source={Images.plusIcon} style={PAGESTYLE.plusMark} />
                                                <Text style={PAGESTYLE.filterListText}>Name</Text>
                                            </View>
                                        </MenuOption>
                                        <MenuOption style={PAGESTYLE.borderList}>
                                            <View style={PAGESTYLE.filterList}>
                                                <Image style={PAGESTYLE.addIcon} source={Images.AddIcon} />
                                                <Text style={PAGESTYLE.filterListText}>add new user</Text>
                                            </View>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>


                            </View>

                            <TouchableOpacity onPress={() => props.onAlertPress()} style={PAGESTYLE.notificationBar}>
                                <Image style={PAGESTYLE.massagesIcon} source={Images.Notification} />
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={[PAGESTYLE.generalRow, PAGESTYLE.filterAlign]}>
                        <View style={PAGESTYLE.tabLinks}>
                            <TouchableOpacity><Text style={[PAGESTYLE.tabLinkGrey, PAGESTYLE.tabLinkSelected]}>Newsfeed</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Performance</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Chat</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Faq</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Profile</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>My School</Text></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.filterbarMain}>
                            <View style={PAGESTYLE.field}>
                                <Image
                                    style={PAGESTYLE.userIcon}
                                    source={Images.SearchIcon} />
                                <TextInput
                                    style={[STYLE.commonInput, PAGESTYLE.searchHeader]}
                                    placeholder="Search subject, class, etc"
                                    maxLength={50}
                                    placeholderTextColor={COLORS.menuLightFonts}
                                />
                            </View>
                        </View>
                    </View>
                </View>
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

            </View>
        </View>
    );
}
export default PupilParentZoneNewsFeed;