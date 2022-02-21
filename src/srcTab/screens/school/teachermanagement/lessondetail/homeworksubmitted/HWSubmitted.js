import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../../utils/Colors";
// import Images from '../../../../../../utils/Images';
import PAGESTYLE from '../Style';
import { baseUrl, opacity, showMessage } from "../../../../../../utils/Constant";
import { EndPoints } from "../../../../../../service/EndPoints";
import { Service } from "../../../../../../service/Service";
import EmptyStatePlaceHohder from "../../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../../utils/Messages";
import ArrowNext from "../../../../../../svg/teacher/lessonhwplanner/ArrowNext";

var moment = require('moment');

const Pupillist = (props, { }) => (
    <TouchableOpacity
        activeOpacity={opacity}
        onPress={() => props.navigateToDetail()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilDataList}>
            <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
                <Image source={{ uri: baseUrl + props.item.ProfilePicture }} style={PAGESTYLE.userStamp} />
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName,{width:wp(20)}]}>{props.item.PupilName}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName]}>{props.item.GroupName}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile]}>
                <Text style={PAGESTYLE.pupilName, props.item.Submited ? PAGESTYLE.yesText : PAGESTYLE.noText}>{props.item.Submited ? 'Yes' : 'No'}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn]}>
                <Text style={PAGESTYLE.pupilName}>{props.item.HomeWorkDate ? moment(props.item.HomeWorkDate).format('DD/MM/yyyy') : '-'}</Text>
            </View>
            <View style={{width: hp(18.55),alignItems : 'center'}}>
                <Text style={PAGESTYLE.pupilName, props.item.Marked ? PAGESTYLE.markText : PAGESTYLE.noText}>{props.item.Marked ? 'Yes' : 'No'}</Text>
                <View style={PAGESTYLE.pupilDetailLink}>
                </View>
            </View>
            </View>
        </View>
    </TouchableOpacity>
);

const TLHomeWorkSubmitted = (props) => {
    const [] = useState(true);
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

    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => props.navigateToDetail(item)}
                onAlertPress={() => { props.onAlertPress() }}
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
        Service.post(data, `${EndPoints.HomeworkSubmited}${props.lessonId}`, (res) => {
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
                            <EmptyStatePlaceHohder holderType={1}  title1={MESSAGE.noHomework1} title2={MESSAGE.noHomework2} />
                    }
                </SafeAreaView>
            </View>
        </View>

    );
}
export default TLHomeWorkSubmitted;