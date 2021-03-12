import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";
import Images from "../../../utils/Images";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { showMessage } from "../../../utils/Constant";

const LessonandHomeworkPlanner = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

   
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
            />
        );
    };
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <Header />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.myDay}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={Images.DayIcon} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Day</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View style={[PAGESTYLE.datePosition]}>
                                <Text style={PAGESTYLE.date}>25</Text>
                                <Text style={PAGESTYLE.month}>Sept</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.whiteBoard}>
                        <View></View>
                    </View>
                    <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={Images.PupilDashIcon} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Pupils</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
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