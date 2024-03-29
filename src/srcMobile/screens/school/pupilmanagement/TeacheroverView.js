import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import GroupSetUp from "./GroupSetUp";
import { BadgeIcon, User } from "../../../../utils/Model";
import { baseUrl } from "../../../../utils/Constant";

import Bronze from '../../../../svg/teacher/pupilmanagement/StarBronze';
import Silver from '../../../../svg/teacher/pupilmanagement/StartSilver';
import Gold from '../../../../svg/teacher/pupilmanagement/StarGold';
import ArrowNext from '../../../../svg/teacher/pupilmanagement/ArrowNext';
import TeacheroverViewHeader from "./TeacheroverViewHeader";
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import { useFocusEffect } from "@react-navigation/native";

const { CallModule } = NativeModules;

var pageNo = 1;
let DataArr = [];

const TeacheroverView = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isCsvPopup, setCsvPopup] = useState(false)
    const [limit, setLimit] = useState('50')
    const [selectedId, setSelectedId] = useState(null);
    const [pagination, setPaginationData] = useState([]);

    const [filterBy, setFilterBy] = useState('');


    let currentCount = 0

    useEffect(() => {
        pageNo = 1
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    useEffect(() => {
        pageNo = 1;
        fetchRecord('', 'name')
    }, [])

    const handleBackButtonClick = () => {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
        }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App', ToastAndroid.SHORT)
        }
        setTimeout(() => {
            currentCount = 0;
        }, 2000);

        return true;
    }




    const onChangeTab = (tab) => {
        setSelectedTabIndex(tab);
        if (tab == 0)
            fetchRecord(searchKeyword, filterBy);
        else
            setPupilData([])

    }

    const addMorePage = () => {
        if (pupilData?.length !== pagination?.TotalCount && pagination !== '') {
            setLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => {
                fetchRecord('', 'name')
            }, 1000)
        }
    }

    const fetchRecord = (searchBy, filterBy) => {

        setLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pageNo),
            limit: limit
        }

        Service.post(data, `${EndPoints.PupilByShoolId}/${User.user.UserDetialId}`, (res) => {
            setPaginationData(res.pagination)
            if (res.code == 200) {

                if (res.data && pageNo == 1) {
                    DataArr = [];
                    DataArr = res.data;
                    setPupilData(DataArr)
                }
                else if (res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        DataArr.push(res.data[i]);
                        setPupilData(DataArr)
                    }
                }
                // else{
                //     pageNo = pageNo - 1
                // }
                setLoading(false)
            } else {
                setLoading(false)
                showMessage(res.message)
            }

        }, (err) => {
            console.log('error of absent check', err);
            setLoading(false)
        })
    }

    const refresh = () => {
        pageNo = 1;
        fetchRecord('', '')
    }

    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => fetchRecord(searchKeyword, filterBy)})
    }

    const messageRender = ({ item}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SPupilProfileView', { item: item, onGoBack: () => refresh()  })}>
                <View style={[PAGESTYLE.pupilData,]}>
                    <View style={PAGESTYLE.pupilProfile}>
                        <View style={PAGESTYLE.rowProfile}>
                            <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                            <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(35) }]}>{item.FirstName} {item.LastName}</Text>
                        </View>
                        <View style={PAGESTYLE.groupPupil}>
                            <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(35) }]}>{item?.GroupName && item?.GroupName?.length !== 0 ? item?.GroupName[0] : '-'}</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.rewardColumn}>
                        {item?.RewardsList && item.RewardsList.map((item, index) => {
                            return (
                                item._id == '3' ?
                                    <View style={PAGESTYLE.rewardStar}>
                                        {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                        <Bronze style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                        <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                    </View>
                                    :
                                    item._id == '6' ?
                                        <View style={PAGESTYLE.rewardStar}>
                                            {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                            <Silver style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                            <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                        </View>
                                        :
                                        item._id == '9' ?
                                            <View style={PAGESTYLE.rewardStar}>
                                                {/* <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                                <Gold style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                            </View>
                                            :
                                            null
                            )
                        })}
                        {/* <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                                <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                                <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View> */}
                    </View>
                    <View style={PAGESTYLE.pupilDetailLink}>
                        {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                        <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.5)} width={hp(1.5)} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View>
            <View style={{ width: '100%', height: '100%' }}>

                <TeacheroverViewHeader

                    onSearch={() => { pageNo = 1; fetchRecord( searchKeyword, filterBy) }}
                    onClearSearch={() => { setSearchKeyword(''); pageNo = 1; fetchRecord('', filterBy) }}
                    onFilter={(filterBy) => { pageNo = 1; setFilterBy(filterBy); fetchRecord(searchKeyword, filterBy) }}
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => onChangeTab(tab)}
                    tabs={selectedTabIndex}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    navigateToCsvPopup={() => { setCsvPopup(true); console.log('iscsvpopup', isCsvPopup); }}
                    navigateToCreateNewEvent={() => props.navigation.navigate('SAddNewTeacher', { onGoBack: () => refresh() })}
                    onNotification={() => openNotification()}
                />

                {selectedTabIndex == 0 ?
                    pupilData.length > 0 ?
                        <View style={[PAGESTYLE.mainContainer, { height: '76%' }]}>
                            <FlatList
                                data={pupilData}
                                renderItem={messageRender}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.01}
                                onEndReached={() => addMorePage()}
                            />
                        </View>


                        :
                        <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.teacherManage1} title2={MESSAGE.teacherManage2} />

                    :
                    <GroupSetUp props={props} />
                }
               
            </View>
            {isLoading &&
                <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        style={{ flex: 1, marginTop: 20 }}
                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                        color={COLORS.yellowDark} />
                </View>
            }
        </View>
    );
}

export default TeacheroverView;