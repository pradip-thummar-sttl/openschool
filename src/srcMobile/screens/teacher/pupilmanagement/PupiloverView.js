import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler, ToastAndroid } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import GroupSetUp from "./GroupSetUp";
import { User } from "../../../../utils/Model";
import { baseUrl } from "../../../../utils/Constant";

const { CallModule } = NativeModules;

const PupiloverView = (props) => {
    const item = props.route.params.item;
    const [isHide, action] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [pupilData, setPupilData] = useState([])
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')


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
        Service.get(`${EndPoints.PupilByTeacherId}/${User.user._id}/name/${searchBy}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setLoading(false)
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    return (
        <View>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM
                    onAlertPress={() => props.navigation.openDrawer()}
                    setSelectedTabIndex={(tab) => setSelectedTabIndex(tab)}
                    tabs={selectedTabIndex}
                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                    onSearch={() => fetchRecord(searchKeyword, '')}
                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                    onFilter={(filterBy) => fetchRecord('', filterBy)}
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister')}
                />
                {selectedTabIndex == 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.mainPage}>
                        <View style={PAGESTYLE.mainContainer}>
                            {
                                isLoading ?
                                    <ActivityIndicator
                                        style={{ margin: 20 }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.yellowDark} />
                                    :
                                    pupilData.length > 0 ?
                                        pupilData.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.navigate('PupilProfileView', { item: item })}>
                                                    <View style={[PAGESTYLE.pupilData]}>
                                                        <View style={PAGESTYLE.pupilProfile}>
                                                            <View style={PAGESTYLE.rowProfile}>
                                                                <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                                                                <Text numberOfLines={1} style={[PAGESTYLE.pupilName,{width:wp(35)}]}>{item.FirstName} {item.LastName}</Text>
                                                            </View>
                                                            <View style={PAGESTYLE.groupPupil}>
                                                                <Text numberOfLines={1} style={[PAGESTYLE.groupName,{width:wp(35)}]}>{item.GroupName ? item.GroupName : '-'}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={PAGESTYLE.rewardColumn}>
                                                            {item.RewardsList.map((item, index) => {
                                                                return (
                                                                    item._id == '3' ?
                                                                        <View style={PAGESTYLE.rewardStar}>
                                                                            <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} />
                                                                            <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                                                        </View>
                                                                        :
                                                                        item._id == '6' ?
                                                                            <View style={PAGESTYLE.rewardStar}>
                                                                                <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} />
                                                                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                                                            </View>
                                                                            :
                                                                            item._id == '9' ?
                                                                                <View style={PAGESTYLE.rewardStar}>
                                                                                    <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} />
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
                                                            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                        :
                                        <View style={PAGESTYLE.mainContainer}>
                                            <Image source={Images.noData} style={PAGESTYLE.noDataImage}></Image>
                                            <Text style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                                            <Text style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                                        </View>

                            }
                        </View>
                    </ScrollView>
                    :
                    <GroupSetUp props={props} />
                }
            </View>
        </View>
    );
}

export default PupiloverView;