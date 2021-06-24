import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";

const ParentZonemain = (props) => {
    const [isHide, action] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    return (
        <View>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                />
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
                        <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                            <View style={PAGESTYLE.leftContent}>
                                <View style={PAGESTYLE.dateGrp}>
                                    <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>14/09/2020</Text></View>
                                    <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View>
                                </View>
                                <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>School reopen in 3 weeks according to…</Text></View>
                                <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusDraft}>Draft</Text></View>
                            </View>
                            <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                            <View style={PAGESTYLE.leftContent}>
                                <View style={PAGESTYLE.dateGrp}>
                                    <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>14/09/2020</Text></View>
                                    <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View>
                                </View>
                                <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>Class cancelled for 2 days</Text></View>
                                <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusSent}>Sent</Text></View>
                            </View>
                            <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                            <View style={PAGESTYLE.leftContent}>
                                <View style={PAGESTYLE.dateGrp}>
                                    <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>14/09/2020</Text></View>
                                    <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View>
                                </View>
                                <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>Christmas Arts & Craft at Home</Text></View>
                                <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusSent}>Sent</Text></View>
                            </View>
                            <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.feeds} onPress={(null)}>
                            <View style={PAGESTYLE.leftContent}>
                                <View style={PAGESTYLE.dateGrp}>
                                    <View style={PAGESTYLE.date}><Text style={PAGESTYLE.dateText}>14/09/2020</Text></View>
                                    <View style={PAGESTYLE.group}><Text style={PAGESTYLE.groupText}>Group 2A</Text></View>
                                </View>
                                <View style={PAGESTYLE.titleMain}><Text style={PAGESTYLE.title}>School term break Sept-Oct 2020</Text></View>
                                <View style={PAGESTYLE.statusMain}><Text style={PAGESTYLE.statusSent}>Sent</Text></View>
                            </View>
                            <View style={PAGESTYLE.arrowMain}><Image source={Images.DashboardRightArrow} style={PAGESTYLE.arrowIcon} /></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZonemain;