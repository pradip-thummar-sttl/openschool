import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, TextInput, Text, ScrollView, Alert, Dimensions, ActivityIndicator, Platform } from 'react-native';
import HeaderWhite from '../../../component/reusable/header/HeaderWhite';
import Sidebar from '../../../component/reusable/sidebar/Sidebar';
import COLORS from '../../../utils/Colors';
import PAGESTYLE from './Style';

const TimeTable = (props) => {

    const [isHide, action] = useState(true);

    let days = ['', 'MONDAY', 'TUESDAYTUESDAY', 'WEDNESDAY', 'THRUSDAYTHRUSDAY', 'FRIDAY', 'SATURDAYSATURDAY'];
    let time = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'];

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('LessonandHomeworkPlannerDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('LessonandHomeworkPlanner')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <HeaderWhite />

                <View style={PAGESTYLE.mainPage}>
                <View style={styles.days}>
                    {days.map((data, key) => (
                        <View style={styles.day}>
                            <Text>{data}</Text>
                        </View>
                    ))}
                </View>
                <ScrollView
                    style={styles.days}
                    horizontal={true}>
                    {time.map((data, timneKey) => (
                        <View style={{ width: 100 }}>
                            <Text style={{ height: 100 }}>{data}</Text>

                            <View>
                                {days.map((data, dayKey) => (
                                    dayKey != 0 ?
                                        timneKey == 4 && dayKey == 4 ?
                                            <View style={{ backgroundColor: COLORS.white, height: 100, width: 0 }}></View>

                                            :
                                            <View style={{ ...styles.day, zIndex: 1, width: dayKey % 2 == 0 ? 200 : 100, backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }}>
                                                <Text style={{ width: dayKey % 2 == 0 ? 200 : 100, backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')' }}>{data}</Text>
                                            </View>
                                        :
                                        null

                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default TimeTable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    days: {
        flexDirection: 'column'
    },
    day: {
        width: 100,
        height: 100
    }
});