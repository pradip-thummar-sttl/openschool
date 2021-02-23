import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";

const Item = ({ onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>        
        <View style={PAGESTYLE.classSubject}>
            <View style={PAGESTYLE.border}></View>
            <View style={PAGESTYLE.subjecRow}>
                <Text style={PAGESTYLE.subjectName}>English</Text>
                <Text style={PAGESTYLE.subject}>Grammar</Text>
            </View>
        </View>
        <View style={PAGESTYLE.timingandGrp}>
            <Text style={PAGESTYLE.groupName}>Group 2A</Text>
            <Text style={PAGESTYLE.timing}>09:00 - 09:30</Text>
        </View>
    </TouchableOpacity>
);
const LessonandHomeworkPlannerDashboard = (props) => {
    const [selectedId, setSelectedId] = useState(null);
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
            <Sidebar />
            <View>
                <Header />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.dashBoardBoxes}>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.greenBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Start a new {"\n"}call</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/callDashboard2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.yellowBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New lesson</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/lessonIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.purpleBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New calendar {"\n"}entry</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/calenderIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.blueBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Add new pupil {"\n"}group</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/pupilgrpIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.myDay}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={require('../../../assets/images/myDay3.png')} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
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
                        <View style={STYLE.viewRow}>
                            <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                <FlatList
                                    data={[1]}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                />
                            </SafeAreaView>
                            <View style={PAGESTYLE.rightTabContent}>
                                <View style={PAGESTYLE.tabcontent}>
                                    <Text h2 style={PAGESTYLE.titleTab}>Cartoon Drawings</Text>
                                    <View style={PAGESTYLE.timedateGrp}>
                                        <View style={PAGESTYLE.date}>
                                            <Image style={PAGESTYLE.calIcon} source={require('../../../assets/images/calendar-small-icon2.png')} />
                                            <Text style={PAGESTYLE.datetimeText}>14/09/2020</Text>
                                        </View>
                                        <View style={[PAGESTYLE.date, PAGESTYLE.time]}>
                                            <Image style={PAGESTYLE.timeIcon} source={require('../../../assets/images/clock2.png')} />
                                            <Text style={PAGESTYLE.datetimeText}>09:00 - 09:30</Text>
                                        </View>
                                        <View style={[PAGESTYLE.date, PAGESTYLE.grp]}>
                                            <Image style={PAGESTYLE.calIcon} source={require('../../../assets/images/group2.png')} />
                                            <Text style={PAGESTYLE.userIcon}>Group 2A</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
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
export default LessonandHomeworkPlannerDashboard;