import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity } from "../../../../utils/Constant";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
var moment = require('moment');

const Pupillist = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
            <View style={PAGESTYLE.userStamp}></View>
            <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.PupilName}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn}>
            <Text style={PAGESTYLE.pupilName}>{props.item.GroupName}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName, props.item.Submited ? PAGESTYLE.yesText : PAGESTYLE.noText}>{props.item.Submited ? 'Yes' : 'No'}</Text>
        </View>
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
            <Text style={PAGESTYLE.pupilName}>{props.item.HomeWorkDate ? moment(props.item.HomeWorkDate).format('YYYY-MM-DD') : '-'}</Text>
        </View>
        <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.lastColumn]}>
            <Text style={PAGESTYLE.pupilName, props.item.Marked ? PAGESTYLE.markText : PAGESTYLE.noText}>{props.item.Marked ? 'Yes' : 'No'}</Text>
            <TouchableOpacity
                style={PAGESTYLE.pupilDetailLink}
                activeOpacity={opacity}
                onPress={() => props.navigateToDetail()}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>
        </View>
    </View>
);

const TLHomeWorkSubmitted = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [homeworkData, setHomeworkData] = useState([]);

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
    const pupilRender = ({ item, index }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => props.navigateToDetail(item)}
            />
        );
    };

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        // Service.post(`${EndPoints.HomeworkSubmited}${props.lessonId}`, (res) => {
        Service.post(data,`${EndPoints.HomeworkSubmited}606d5993b1cda417a86d9332`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                setHomeworkData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }

    return (

        <View style={PAGESTYLE.plainBg}>
            <View style={PAGESTYLE.pupilTable}>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Pupil name</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Class Group</Text>
                </View>
                <View style={PAGESTYLE.pupilTableHeadingMain}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Submitted</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Submission date</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Marked</Text>
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

    );
}
export default TLHomeWorkSubmitted;