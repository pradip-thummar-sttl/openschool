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
import { User } from "../../../utils/Model";

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [pupilData, setPupilData] = useState(User.user.ChildrenList[0])

    return (
        <View>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onSwitchPupil={(pupilData) => setPupilData(pupilData)}
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')}
                />
                {selectedTabIndex == 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.mainPage}>
                        <View style={PAGESTYLE.feedsMain}>
                            <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                                <View style={PAGESTYLE.leftContent}>
                                    <View style={PAGESTYLE.dateGrp}>
                                        <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>14/09/2020</Text></View>
                                        <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View>
                                    </View>
                                    <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>Back to school newsletter from the he…</Text></View>
                                    <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusSent}>Sent</Text></View>
                                </View>
                                <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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