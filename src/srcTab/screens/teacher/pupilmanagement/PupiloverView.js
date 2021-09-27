import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from '../../../../service/EndPoints'
import { Service } from '../../../../service/Service'
import { baseUrl, opacity, showMessage } from '../../../../utils/Constant'
// import Images from '../../../../utils/Images'
import STYLE from '../../../../utils/Style'
import HeaderPM from './HeaderPM'
import PAGESTYLE from './StyleList'
import GroupSetUp from './GroupSetUp'
import COLORS from '../../../../utils/Colors'
import { User } from '../../../../utils/Model'
import Bronze from '../../../../svg/teacher/pupilmanagement/StarBronze';
import Silver from '../../../../svg/teacher/pupilmanagement/StartSilver';
import Gold from '../../../../svg/teacher/pupilmanagement/StarGold';
import ArrowNext from '../../../../svg/teacher/pupilmanagement/ArrowNext';
import NoPupil from '../../../../svg/emptystate/NoPupil';

const Pupillist = (props, { item }) => (
    <TouchableOpacity
        activeOpacity={opacity}
        style={PAGESTYLE.pupilDetailLink}
        onPress={() => props.onPupilClick()}>
        <View style={[PAGESTYLE.pupilData]}>
            <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + props.item.ProfilePicture }}></Image>

            <View style={[PAGESTYLE.pupilProfile,]}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(10) }]}>{props.item.FirstName}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(10) }]}>{props.item.LastName}</Text>
            </View>
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilgroupName1, { width: wp(8) }]}>{props.item.GroupName ? props.item.GroupName : 'Grop A'}</Text>
            </View>
            {/* </View> */}
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn11}>
                <Text style={PAGESTYLE.pupilgroupName10} numberOfLines={1}>{moment(props.item.Dob).format('DD/MM/YYYY')}</Text>
            </View>
            {/* </View> */}
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.purpleDot]}></View></View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.yellowDot]}></View></View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                {props.item.RewardsList.map((item, index) => {
                    return (
                        item._id == '3' ?
                            <View style={PAGESTYLE.rewardStar}>
                                <Bronze style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                            </View>
                            :
                            item._id == '6' ?
                                <View style={PAGESTYLE.rewardStar}>
                                    <Silver style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                    {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                    <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                </View>
                                :
                                item._id == '9' ?
                                    <View style={PAGESTYLE.rewardStar}>
                                        <Gold style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                        {/* <Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /> */}
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
            <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} width={hp(1)} height={hp(3)} />
            {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
        </View>
    </TouchableOpacity>
);

const PupiloverView = (props) => {
    const [selectedId, setSelectedId] = useState(0);
    const [pupilData, setPupilData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log('`${EndPoints.PupilByTeacherId}/${User.user._id}`', `${EndPoints.PupilByTeacherId}/${User.user._id}`);
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setSelectedTab(props.tabs)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }

        Service.get(`${EndPoints.PupilByTeacherId}/${User.user._id}/name/${searchBy}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setPupilData(res.data)
                setLoading(false)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }

    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                onPupilClick={() => props.onPupilClick(item)}
            />
        );
    };
    return (
        <View style={{ width: '100%', backgroundColor: COLORS.backgroundColorCommon }}>
            <HeaderPM
                onAlertPress={() => props.navigation.openDrawer()}
                onTabSelected={(tab) => setSelectedTab(tab)}
                tabs={props.tabs}
                onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                onSearch={() => fetchRecord(searchKeyword, '')}
                onClearSearch={() => { setSearchKeyword(''); fetchRecord('', '') }}
                onFilter={(filterBy) => fetchRecord('', filterBy)}
                navigateToAddNewUser={() => props.navigateToAddNewUser()} />

            {selectedTab == 0 ?
                <View style={[PAGESTYLE.whiteBoard, PAGESTYLE.pupilDashboard]}>
                    {
                        isLoading ?
                            <ActivityIndicator
                                style={{ margin: 20 }}
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.yellowDark} />
                            :
                            pupilData.length > 0 ?
                                <>
                                    <View style={PAGESTYLE.pupilTable}>
                                        <View style={{width: hp(2)}}></View>
                                        <View style={PAGESTYLE.pupilTableHeadingMain}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>First Name</Text>
                                            {/* <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text> */}
                                        </View>
                                        <View style={PAGESTYLE.pupilTableHeadingMain}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Last Name</Text>
                                            {/* <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text> */}
                                        </View>
                                        <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil2]}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}> Class Group</Text>
                                        </View>

                                        <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil22]}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>D.O.B</Text>
                                        </View>
                                        <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil3]}>
                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Performance</Text>
                                            <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Enagagement</Text>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Effort</Text>
                                            </View>
                                        </View>
                                        <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil4]}>
                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Quick Reward</Text>
                                            <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Bronze</Text>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Silver</Text>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Gold</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.pupilTabledata}>
                                        <FlatList
                                            data={pupilData}
                                            renderItem={pupilRender}
                                            keyExtractor={(item) => item.id}
                                            extraData={selectedId}
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled
                                        />
                                    </View>
                                </>
                                :
                                <View style={PAGESTYLE.mainContainer}>
                                    {/* <Image source={Images.noData} style={PAGESTYLE.noDataImage}></Image> */}
                                    <NoPupil style={PAGESTYLE.noDataImage} height={300} width={300} />
                                    <Text style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                                    <Text style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                                </View>
                    }
                </View>
                :
                <GroupSetUp />
            }
        </View>
    )
}

export default PupiloverView
