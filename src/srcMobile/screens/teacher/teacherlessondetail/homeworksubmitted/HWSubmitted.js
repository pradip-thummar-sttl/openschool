import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { baseUrl, opacity } from "../../../../../utils/Constant";
import { EndPoints } from "../../../../../service/EndPoints";
import { Service } from "../../../../../service/Service";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import ArrowNext from "../../../../../svg/teacher/lessonhwplanner/ArrowNext";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import TickMarkGrey from "../../../../../svg/teacher/lessonhwplanner/TickMark_Grey";
var moment = require('moment');

const Pupillist = (props, item) => (
    <TouchableOpacity
        activeOpacity={opacity}
        onPress={() => props.navigateToDetail()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.mobilePupilProfile}>
                <View style={PAGESTYLE.thumbAlign}>
                    <Image source={{ uri: baseUrl + props.item.ProfilePicture }} style={PAGESTYLE.userStamp} />
                    <View>
                        <Text numberOfLines={1} style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName, { width: wp(45) }]}>{props.item.PupilName}</Text>
                        <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(45) }]}>{props.item.GroupName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={PAGESTYLE.dateLesson}>{props.item.HomeWorkDate ? moment(props.item.HomeWorkDate).format('DD/MM/yyyy') : '-'}</Text>
                </View>
            </View>
            <View style={STYLE.hrCommon}></View>
            <View style={PAGESTYLE.rowLine}>
                <View style={PAGESTYLE.checkMarkedText}>
                    {/* <Image style={PAGESTYLE.tickIcon} source={props.item.Submited ? Images.CheckIcon : Images.CheckIconGrey} /> */}
                    {props.item.Submited ?
                        <TickMarkBlue style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                        :
                        <TickMarkGrey style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                    }
                    <Text style={PAGESTYLE.tickText}>Submitted</Text>
                </View>
                <View style={PAGESTYLE.checkMarkedText}>
                    {/* <Image style={PAGESTYLE.tickIcon} source={props.item.Marked ? Images.CheckIcon : Images.CheckIconGrey} /> */}
                    {props.item.Marked ?
                        <TickMarkBlue style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                        :
                        <TickMarkGrey style={PAGESTYLE.tickIcon} height={hp(1.4)} width={hp(1.4)} />
                    }
                    <Text style={PAGESTYLE.tickText}>Marked</Text>
                </View>
                <View style={{alignItems : 'center',justifyContent : 'center'}}>
                    {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon]} height={hp(1.51)} width={hp(0.95)} />
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const TLHomeWorkSubmitted = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [homeworkData, setHomeworkData] = useState([]);
    const [filterBy, setFilterBy] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isSearchActive, setSearchActive] = useState(false)
    const [dataChanged, setDataChanged] = useState(false)

    React.useEffect(() => {
        setFilterBy(props.filterBy)
        setSearchKeyword(props.searchKeyword)
        setSearchActive(props.searchActive)
        setDataChanged(props.dataChanged)
    });

    useEffect(() => {
        fetchRecord('', filterBy)
    }, [filterBy])

    useEffect(() => {
        fetchRecord('', '')
    }, [dataChanged])

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

        <View style={[PAGESTYLE.plainBg,{flex:1}]}>
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
            <View style={{flex : 1}}>
                {isLoading ?
                    <ActivityIndicator
                        style={{ flex: 1, margin: 20 }}
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
                        // <View style={{ height: 100, justifyContent: 'center' }}>
                        //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                        // </View>
                        <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noHomework1} title2={MESSAGE.noHomework2} />
                }
            </View>
        </View>

    );
}
export default TLHomeWorkSubmitted;