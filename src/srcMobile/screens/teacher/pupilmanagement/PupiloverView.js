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
import NoPupil from '../../../../svg/emptystate/NoPupil';
import PupilProfileAdd from "./ProfilePupilAdd";

const { CallModule } = NativeModules;

const PupiloverView = (props) => {
    const item = props.route.params.item;
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [limit, setLimit] = useState('50')
    const [selectedId, setSelectedId] = useState(null);
    const [pagination, setPaginationData] = useState([])

    let pageNo = 1;
    let currentCount = 0

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

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

    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setSelectedTabIndex(item)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pageNo),
            limit: limit
        }
        setLoading(true);
        Service.post(data, `${EndPoints.PupilByTeacherId}/${User.user._id}`, (res) => {

            setPaginationData(res.pagination);

            if (res?.flag) {
                setPupilData(res.data);
                setLoading(false);
            } else {
                showMessage(res.message);
                setLoading(false);
            }
        }, (err) => {
            console.log('Err of   all pupil by teacher', err)
            setLoading(false)
        })
    }

    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => fetchRecord('', '') })
    }

    const onRefresh = () => {
        fetchRecord('', '')
    }
    const addMorePage = () => {
        if (pupilData?.length !== pagination?.TotalCount && pagination !== '') {
            setLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => {
                fetchRecord('', '')
            }, 1500)
        }
    }

    const renderItem = ({ item }) => (

        <TouchableOpacity onPress={() => props.navigation.navigate('PupilProfileView', { item: item, onGoBack: () => onRefresh() })}>
            <View style={[PAGESTYLE.pupilData]}>
                <View style={PAGESTYLE.pupilProfile}>
                    <View style={PAGESTYLE.rowProfile}>
                        <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                        <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(35) }]}>{item.FirstName} {item.LastName}</Text>
                    </View>
                    <View style={PAGESTYLE.groupPupil}>
                        <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(35) }]}>{item?.GroupName.length !== 0 ? item.GroupName : '-'}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.rewardColumn}>
                    {item.RewardsList.map((item, index) => {
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

    const selectTan = (tab) => {
        setSelectedTabIndex(tab);
        if (tab == 0)
            fetchRecord('', '');
        else
            setPupilData([])

    }
    return (
        <View>
            <View style={{ height: '100%', width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => selectTan(tab)}
                    tabs={selectedTabIndex}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, '')}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)}
                    onNotification={() => openNotification()}
                    addProfile={() => props.navigation.navigate('ProfilePupilAdd')}
                />

                <View style={{ flex: 1 }}>
                    {selectedTabIndex == 0 ?
                        <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.mainPage}>
                            {
                                isLoading ?
                                    <ActivityIndicator
                                        style={{ margin: 20 }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.yellowDark} />
                                    :
                                    <View style={PAGESTYLE.mainContainer}>
                                        {
                                            pupilData?.length > 0 ?
                                                <FlatList
                                                    data={pupilData}
                                                    renderItem={renderItem}
                                                    extraData={selectedId}
                                                    keyExtractor={(item) => item.id}
                                                    showsVerticalScrollIndicator={false}
                                                    onEndReached={() => addMorePage()}
                                                // onEndReachedThreshold={0.1}
                                                // onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                                                // onEndReached={() => {
                                                //     if (!onEndReachedCalledDuringMomentum) {
                                                //         addMorePage();    // LOAD MORE DATA
                                                //         setOnEndReachedCalledDuringMomentum(true)
                                                //     }
                                                // }
                                                // }

                                                />
                                                :

                                                <View style={PAGESTYLE.mainContainer}>
                                                    {/* <Image source={Images.noData} style={PAGESTYLE.noDataImage}></Image> */}
                                                    <NoPupil style={PAGESTYLE.noDataImage} height={hp(22)} width={hp(22)} />
                                                    <Text style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                                                    <Text style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                                                </View>
                                        }


                                    </View>
                            }
                        </ScrollView>
                        :
                        <GroupSetUp props={props} />
                    }
                </View>
           
            </View>
        </View>

    );
}

export default PupiloverView;