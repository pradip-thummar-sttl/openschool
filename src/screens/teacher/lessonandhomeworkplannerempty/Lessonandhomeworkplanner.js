import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";

const LessonandHomeworkPlanner = (props) => {
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar />
            <View>
                <Header />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.myDay}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={require('../../../assets/images/myDay3.png')} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Day</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View style={[PAGESTYLE.datePosition]}>
                                <Text style={PAGESTYLE.date}>25</Text>
                                <Text style={PAGESTYLE.month}>Sept</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={require('../../../assets/images/dashBoardMorelink2.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.whiteBoard}>
                        <View></View>
                    </View>
                    <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={require('../../../assets/images/pupilIcon2.png')} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Pupils</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={require('../../../assets/images/dashBoardMorelink2.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.whiteBoard}>
                        <View></View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default LessonandHomeworkPlanner;