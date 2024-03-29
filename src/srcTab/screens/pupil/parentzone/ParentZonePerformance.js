import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import { User } from "../../../../utils/Model";
import ActivityRings from "react-native-activity-rings";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { showMessage } from "../../../../utils/Constant";

const ParentZonePerformance = (props) => {
    const item = props.data;
    console.log('........>>>>',item);
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);
    const [chartData, setChartData] = useState([])

    const myref = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    const handleOnClick = (index) => {
        setTabSelected(index)
        console.log('reference', myref);
        if (myref.current) {
            myref.current.refresh();
        }
    }

    useEffect(() => {
        getLessonData()
    }, [])

    const getLessonData = () => {
        Service.get(`${EndPoints.GetCountLession}/${item.Pupilid}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.purpleDark,
                    backgroundColor: COLORS.lightPurple
                }]
                getHomeworkData(data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const getHomeworkData = (lessonData) => {
        Service.get(`${EndPoints.GetCountHomework}/${item.Pupilid}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                lessonData.push(data)
                setChartData(lessonData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    return (
        <View>
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEditSchool} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.graphBlock}>

                        <View style={PAGESTYLE.graphBox}>
                            <View style={PAGESTYLE.generalRow}>
                                <View style={PAGESTYLE.chartBlock}>
                                    <ActivityRings
                                        data={chartData}
                                        config={activityConfig} />
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.graphChartText}>Pupils are engaged and using the app and submitting home work on time. </Text>
                                    <View style={[PAGESTYLE.generalRow, PAGESTYLE.listBottomSpace]}>
                                        <Image  style={PAGESTYLE.purpleMark} />
                                        <Text style={PAGESTYLE.labelMark}>Pupil engagement over last month</Text>
                                    </View>
                                    <View style={PAGESTYLE.generalRow}>
                                        <Image  style={PAGESTYLE.orangeMark} />
                                        <Text style={PAGESTYLE.labelMark}>Pupil effort over last month</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZonePerformance;