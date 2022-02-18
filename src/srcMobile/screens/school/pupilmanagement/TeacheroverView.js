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
import MPopupdataSecondCSVUpload from "../../../component/reusable/popup/MPopupdataSecondCSVUpload";
import TeacheroverViewHeader from "./TeacheroverViewHeader";
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import { useFocusEffect } from "@react-navigation/native";

const { CallModule } = NativeModules;
var pageNo = 1

const TeacheroverView = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isCsvPopup, setCsvPopup] = useState(false)
    const [limit, setLimit] = useState('25')
    const [selectedId, setSelectedId] = useState(null);
    const [pagination, setPaginationData] = useState([])
    const [allNewAndOldData, setAllNewAndOldData] = useState([])


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

   

    // Function triggers when screen gets focused or unfocused
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused.
      fetchRecord('', 'name')
      return () => {
     // Do something when the screen is unfocused
        // alert('Home Screen was unfocused');
      };
    }, [])
  );

 

    const fetchRecord = (search, filter) => {

        setLoading(true)
        // let data = { Searchby: search, Filterby: filter, page: "1", limit: "100" }

        let data = {
            Searchby: search,
            Filterby: filter,
            page: String(pageNo),
            limit: limit
        }


        Service.post(data, `${EndPoints.PupilByShoolId}/${User.user.UserDetialId}`, (res) => {
            if (res.flag) {
                setPaginationData(res.pagination)
                if (allNewAndOldData.length > 0) {
                    if (res.data && res.data.length > 0) {
                        let newData = []
                        newData = res.data
                        if(pageNo == 1){
                            setPupilData(res.data)
                            setAllNewAndOldData(res.data)
                        }
                        else{
                            let newArray = [allNewAndOldData, ...newData]
                            setPupilData(newArray)
                            setAllNewAndOldData(newArray)
                        }
                        setLoading(false)
                    }
                    else {
                        search != '' && res.data ? setPupilData(res.data) : setPupilData(allNewAndOldData)
                        setLoading(false)
                    }
                }
                else {
                    setPupilData(res.data)
                    setAllNewAndOldData(res.data)
                    setLoading(false)
                }

            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of absent check', err);
        })
    }

    const addMorePage = () => {
        if (pupilData.length != pagination.TotalCount) {
            pageNo = pageNo + 1
            setTimeout(() => {
                fetchRecord('', 'name')
            }, 1000)
        }
    }

    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer', { onGoBack: () => fetchRecord('', 'name') })
    }

    const messageRender = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SPupilProfileView', { item: item })}>
                <View style={[PAGESTYLE.pupilData,]}>
                    <View style={PAGESTYLE.pupilProfile}>
                        <View style={PAGESTYLE.rowProfile}>
                            <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                            <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(35) }]}>{item.FirstName} {item.LastName}</Text>
                        </View>
                        <View style={PAGESTYLE.groupPupil}>
                            <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(35) }]}>{item.GroupName.length != 0 ? item.GroupName[0] : '-'}</Text>
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
    };

    return (
        <View>
            <View style={{ width: '100%', height: '100%' }}>

                <TeacheroverViewHeader
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                    tabs={selectedTabIndex}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, 'name')}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', 'name') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)}
                    navigateToCsvPopup={() => { setCsvPopup(true); console.log('iscsvpopup', isCsvPopup); }}
                    navigateToCreateNewEvent={() => props.navigation.navigate('SAddNewTeacher', { onGoBack: () => refresh() })}
                    onNotification={() => openNotification()}
                />
                {selectedTabIndex == 0 ?
                    // <ScrollView showsVerticalScrollIndicator={false}
                    //     style={PAGESTYLE.mainPage}
                    //     contentContainerStyle={{ paddingBottom: 10 }}
                    //     onScroll={({ nativeEvent }) => {
                    //         if (isCloseToBottom(nativeEvent)) {
                    //             isApiCall = true;
                    //             
                    //         }
                    //     }}
                    //     scrollEventThrottle={400}
                    // >
                    //     <View style={PAGESTYLE.mainContainer}>
                    //         {
                    //             isLoading ?
                    //                 <ActivityIndicator
                    //                     style={{ margin: 20 }}
                    //                     size={Platform.OS == 'ios' ? 'large' : 'small'}
                    //                     color={COLORS.yellowDark} />
                    //                 :
                    //                 pupilData.length > 0 ?
                    //                     pupilData.map((item, index) => {
                    //                         return (
                    //                             <TouchableOpacity onPress={() => props.navigation.navigate('SPupilProfileView', { item: item })}>
                    //                                 <View style={[PAGESTYLE.pupilData,]}>
                    //                                     <View style={PAGESTYLE.pupilProfile}>
                    //                                         <View style={PAGESTYLE.rowProfile}>
                    //                                             <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                    //                                             <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(35) }]}>{item.FirstName} {item.LastName}</Text>
                    //                                         </View>
                    //                                         <View style={PAGESTYLE.groupPupil}>
                    //                                             <Text numberOfLines={1} style={[PAGESTYLE.groupName, { width: wp(35) }]}>{item.GroupName.length != 0 ? item.GroupName[0] : '-'}</Text>
                    //                                         </View>
                    //                                     </View>
                    //                                     <View style={PAGESTYLE.rewardColumn}>
                    //                                         {item.RewardsList.map((item, index) => {
                    //                                             return (
                    //                                                 item._id == '3' ?
                    //                                                     <View style={PAGESTYLE.rewardStar}>
                    //                                                         {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                    //                                                         <Bronze style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                    //                                                         <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                    //                                                     </View>
                    //                                                     :
                    //                                                     item._id == '6' ?
                    //                                                         <View style={PAGESTYLE.rewardStar}>
                    //                                                             {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                    //                                                             <Silver style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                    //                                                             <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                    //                                                         </View>
                    //                                                         :
                    //                                                         item._id == '9' ?
                    //                                                             <View style={PAGESTYLE.rewardStar}>
                    //                                                                 {/* <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /> */}
                    //                                                                 <Gold style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                    //                                                                 <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                    //                                                             </View>
                    //                                                             :
                    //                                                             null
                    //                                             )
                    //                                         })}
                    //                                         {/* <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                    //                                     <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                    //                                     <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View> */}
                    //                                     </View>
                    //                                     <View style={PAGESTYLE.pupilDetailLink}>
                    //                                         {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                    //                                         <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.5)} width={hp(1.5)} />
                    //                                     </View>
                    //                                 </View>
                    //                             </TouchableOpacity>
                    //                         )
                    //                     })
                    //                     :
                    //                     <View style={PAGESTYLE.mainContainer}>
                    //                         <NoPupil style={PAGESTYLE.noDataImage} height={hp(22)} width={hp(22)} />
                    //                         <Text style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                    //                         <Text style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                    //                     </View>

                    //         }
                    //     </View>
                    // </ScrollView>
                    isLoading ?
                        <ActivityIndicator
                            style={{ margin: 20 }}
                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                            color={COLORS.yellowDark} />
                        :
                        pupilData.length > 0 ?
                            <View style={[PAGESTYLE.mainContainer, { height: '76%' }]}>
                                <FlatList
                                    // style={[PAGESTYLE.mainContainer]}
                                    data={pupilData}
                                    renderItem={messageRender}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                    showsVerticalScrollIndicator={false}
                                    onEndReachedThreshold={0}
                                    onEndReached={() => addMorePage()}
                                />
                            </View>
                            :
                            // <View style={{ height: 100, justifyContent: 'center' }}>
                            //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                            // </View>
                            <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.teacherManage1} title2={MESSAGE.teacherManage2} />

                    :
                    <GroupSetUp props={props} />
                }
            </View>
        </View>
    );
}

export default TeacheroverView;