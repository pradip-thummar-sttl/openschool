import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator, Platform, StyleSheet, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from '../../../../service/EndPoints'
import { Service } from '../../../../service/Service'
import { baseUrl, opacity, showMessage, Var } from '../../../../utils/Constant'
// import Images from '../../../../utils/Images'
import STYLE from '../../../../utils/Style'
import HeaderPM from './HeaderPM'
import PAGESTYLE from './StyleList'
import GroupSetUp from './GroupSetUp'
import COLORS from '../../../../utils/Colors'
import { BadgeIcon, User } from '../../../../utils/Model'
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

            <View style={styles.firstNameContent}>
                <Text numberOfLines={1} style={PAGESTYLE.pupilName}>{props.item.FirstName}</Text>
            </View>
            <View style={styles.lastNameContent}>
                <Text style={[PAGESTYLE.pupilName]}>{props.item.LastName}</Text>
            </View>
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={styles.classGroupContent}>
                
                <Text numberOfLines={1} style={[PAGESTYLE.pupilgroupName1]}>{ props?.item?.GroupName.length != 0 ? props.item.GroupName : 'Group A'}</Text>
            </View>
            {/* </View> */}
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={styles.birthdateContent}>
                <Text style={PAGESTYLE.pupilgroupName10} numberOfLines={1}>{moment(props.item.Dob).format('DD/MM/YYYY')}</Text>
            </View>
            {/* </View> */}
            <View style={styles.performanceCpntent}>
                <View style={[PAGESTYLE.perfomanceDotmain, { width: '50%' }]}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.purpleDot]}></View></View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.yellowDot]}></View></View>
            </View>
            <View style={styles.quickStartContent}>
                {props.item.RewardsList.map((item, index) => {
                    return (
                        item._id == '3' ?
                            <View style={{ width: '30%' }}>
                                <Bronze style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                {/* <Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                            </View>
                            :
                            item._id == '6' ?
                                <View style={{ width: '30%' }}>
                                    <Silver style={PAGESTYLE.rewardStartIcon} width={hp(2.15)} height={hp(2.15)} />
                                    {/* <Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /> */}
                                    <Text style={{ alignSelf: 'center' }}>{item.count}</Text>
                                </View>
                                :
                                item._id == '9' ?
                                    <View style={{ width: '30%' }}>
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
            <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon, { right: 10 }]} width={hp(1)} height={hp(3)} />
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
    const [pagination, setPaginationData] = useState([])
    const [limit, setLimit] = useState('50')
    let pageNo = 1;

    useEffect(() => {
        console.log('`${EndPoints.PupilByTeacherId}/${User.user._id}`', `${EndPoints.PupilByTeacherId}/${User.user._id}`);
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setSelectedTab(props.tabs)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
            page: String(pageNo),
            limit: limit
        }
        setLoading(true);
        Service.post(data,`${EndPoints.PupilByTeacherId}/${User.user._id}`, (res) => { ///name/${searchBy}
            console.log('res of all pupil by teacher', res)
            setPaginationData(res?.pagination)
            if (res.flag) {
                setPupilData(res.data)
                setLoading(false)
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
            setLoading(false)

        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }

    const pupilRender = ({ item }) => {

        return (
            <Pupillist
                navigation={props.navigation}
                item={item}
                onPupilClick={() => props.onPupilClick(item)}
            />
        );
    };
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }
    const addMorePage = () => {
        if (pupilData?.length !== pagination?.TotalCount && pagination !== '')  {
        //    setLoading(true)
            pageNo = pageNo + 1
            setTimeout(() => { 
                fetchRecord('','') 
            }, 1500)
        }
    }
    return (
        <View style={{ width: '100%',backgroundColor: COLORS.backgroundColorCommon }}>
            <HeaderPM
                onNotification={() => openNotification()}
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
                            pupilData?.length > 0 ?
                                <>
                                    <View style={PAGESTYLE.pupilTable}>
                                        <View style={{ width: Platform.OS === 'android' ? 0 : hp(2) }}></View>
                                        <View style={styles.fName}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>First Name</Text>
                                            {/* <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text> */}
                                        </View>
                                        <View style={styles.lName}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Last Name</Text>
                                            {/* <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text> */}
                                        </View>
                                        <View style={styles.classGroup}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}> Class Group</Text>
                                        </View>

                                        <View style={styles.birthdate}>
                                            <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>D.O.B</Text>
                                        </View>
                                        <View style={styles.performanceView}>
                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Performance</Text>
                                            <View style={[PAGESTYLE.pupilTableHeadingsubMain]}>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainsubTitle]}>Enagagement</Text>
                                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Effort</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rewardStars}>
                                            <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Quick Reward</Text>
                                            <View style={[PAGESTYLE.pupilTableHeadingsubMain]}>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainsubTitlestar]}>Bronze</Text>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainsubTitlestar]}>Silver</Text>
                                                <Text style={[PAGESTYLE.pupilTableHeadingMainsubTitlestar]}>Gold</Text>
                                            </View>
                                        </View>
                                    </View>
                                        <FlatList
                                            data={pupilData}
                                            renderItem={pupilRender}
                                            keyExtractor={(item) => item.id}
                                            extraData={selectedId}
                                            showsVerticalScrollIndicator={false}
                                            // onEndReachedThreshold={0.9}
                                            // onEndReached={() => addMorePage()}
                                            contentContainerStyle={{flexGrow:1,paddingBottom:wp(12)}}
                                        />
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
const styles = StyleSheet.create({
    fName: {
        width: Platform.OS === 'android' ? '10%' : '12%',
        marginRight: 20
    },
    lName: {
        width: '12%',
        marginRight: 20,
        alignItems: 'center'
    },
    classGroup: {
        width: '14%',
        marginRight: 20,
        alignItems: 'center'
    },
    birthdate: {
        width: '10%',
        marginRight: 20,
        alignItems: 'center'
    },
    performanceView: {
        width: '20%',
        marginRight: 15,
        alignItems: 'center'
    },
    rewardStars: {
        width: '18%',
        alignItems: 'center'
    },
    firstNameContent: {
        width: Platform.OS === 'ios' ? '12%' : '10%',
        marginRight: Platform.OS === 'ios' ? 20 : null
    },
    lastNameContent: {
        width: '12%',
        alignItems: 'center',
        marginRight: 20
    },
    classGroupContent: {
        width: '14%',
        alignItems: 'center',
        marginRight: 20
    },
    birthdateContent: {
        width: '10%',
        alignItems: 'center',
        marginRight: 20
    },
    performanceCpntent: {
        width: '18%',
        flexDirection: 'row',
        marginRight: 25,
        paddingStart: Platform.OS === 'ios' ? null : 10
    },
    quickStartContent: {
        width: '20%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingStart: Platform.OS === 'ios' ? null : 20
    }
})

export default PupiloverView
