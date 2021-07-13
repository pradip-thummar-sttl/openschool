import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import { User } from "../../../utils/Model";
import ActivityRings from "react-native-activity-rings";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { showMessage } from "../../../utils/Constant";

const ParentZonePerformance = (props) => {
    const item = props.data;
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

    useEffect(() => {
        console.log('chartData', chartData);
    }, [chartData])

    const getLessonData = () => {
        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
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
        Service.get(`${EndPoints.GetCountHomework}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per != 'null' ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                lessonData.push(data)
                console.log('lessonData', lessonData);
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
                    <View style={PAGESTYLE.pupilPerfomance}>
                        <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                        {/* <Image style={PAGESTYLE.graph} source={Images.graphImagePupilPerfomance}></Image> */}

                        <View style={PAGESTYLE.performancePArent}>
                            <ActivityRings
                                data={chartData}
                                config={activityConfig} />

                            <View style={{ flexDirection: 'row', height: 50 }}>
                                <View style={PAGESTYLE.colorLeftParent}>
                                    <View style={PAGESTYLE.colorSquare} />
                                    <Text style={PAGESTYLE.introText}>{`Engagement over${'\n'}last month`}</Text>
                                </View>
                                <View style={PAGESTYLE.colorRightParent}>
                                    <View style={PAGESTYLE.colorSquareRight} />
                                    <Text style={PAGESTYLE.introText}>{`Effort over last${'\n'}month`}</Text>
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <Text style={PAGESTYLE.bottomText}>Based on {item.FirstName + ' ' + item.LastName}'s engagement and effort, he is doing well and is excelling. He is also very eager to learn and perticularly interested in Mathematics and Science subjects.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZonePerformance;