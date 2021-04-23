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
        <View style={PAGESTYLE.mobilePupilProfile}>
            <View style={PAGESTYLE.thumbAlign}>
                <View style={PAGESTYLE.userStamp}></View>
                <View>
                    <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>{props.item.PupilName}</Text>
                    <Text style={PAGESTYLE.groupName}>{props.item.GroupName}</Text>
                </View>
            </View>
            <View>
                <Text style={PAGESTYLE.dateLesson}>{props.item.HomeWorkDate ? moment(props.item.HomeWorkDate).format('YYYY-MM-DD') : '-'}</Text>
            </View>
        </View>
        <View style={STYLE.hrCommon}></View>
        <View style={PAGESTYLE.rowLine}>
            <View style={PAGESTYLE.checkMarkedText}>
                <Image style={PAGESTYLE.tickIcon} source={props.item.Submited ? Images.CheckIcon : Images.CheckIconGrey} />
                <Text style={PAGESTYLE.tickText}>Submitted</Text>
            </View>
            <View style={PAGESTYLE.checkMarkedText}>
                <Image style={PAGESTYLE.tickIcon} source={props.item.Marked ? Images.CheckIcon : Images.CheckIconGrey} />
                <Text style={PAGESTYLE.tickText}>Marked</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={PAGESTYLE.pupilDetailLink}
                    activeOpacity={opacity}
                    onPress={() => props.navigateToDetail()}>
                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const TLHomeWorkSubmitted = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [homeworkData, setHomeworkData] = useState([]);
    const [filterBy, setFilterBy] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isSearchActive, setSearchActive] = useState(false)

    React.useEffect(() => {
        setFilterBy(props.filterBy)
        setSearchKeyword(props.searchKeyword)
        setSearchActive(props.searchActive)
    });

    useEffect(() => {
        fetchRecord('', filterBy)
    }, [filterBy])

    useEffect(() => {
        if (isSearchActive) {
            fetchRecord(searchKeyword, filterBy)
        } else {
            fetchRecord('', '')
        }
    }, [isSearchActive])

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
    const pupilRender = ({ item }) => {
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
        console.log('props.lessonId', props.lessonId);
        Service.post(data, `${EndPoints.HomeworkSubmited}${props.lessonId}`, (res) => {
            // Service.post(data, `${EndPoints.HomeworkSubmited}606d5993b1cda417a86d9332`, (res) => {
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
            {/* <View style={PAGESTYLE.pupilTable}>
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
            </View> */}
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