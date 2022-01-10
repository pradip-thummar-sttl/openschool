import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from '../../../../service/EndPoints'
import { Service } from '../../../../service/Service'
import { baseUrl, opacity, showMessage, Var } from '../../../../utils/Constant'
// import Images from '../../../../utils/Images'
import STYLE from '../../../../utils/Style'
import HeaderPM from './HeaderPM'
import PAGESTYLE from './StyleList'
import ClassSetUp from './ClassSetUp'
import COLORS from '../../../../utils/Colors'
import { BadgeIcon, User } from '../../../../utils/Model'
import Bronze from '../../../../svg/teacher/pupilmanagement/StarBronze';
import Silver from '../../../../svg/teacher/pupilmanagement/StartSilver';
import Gold from '../../../../svg/teacher/pupilmanagement/StarGold';
import ArrowNext from '../../../../svg/teacher/pupilmanagement/ArrowNext';
import NoPupil from '../../../../svg/emptystate/NoPupil';
import PupilProfileView from './PupilProfileView';
import PupilProfileAdd from './PupilProfileAdd';
import PupilProfileEdit from './PupilProfileEdit';

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
                <Text numberOfLines={1} style={[PAGESTYLE.pupilgroupName1, { width: wp(9) }]}>{props.item.GroupName.length != 0 ? props.item.GroupName[0] : '-'}</Text>
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

const PupilManagement = (props) => {
    const [selectedId, setSelectedId] = useState(0);
    const [pupilData, setPupilData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [isPupilProfile, setPupilProfile] = useState(false);
    const [isPupilAdd, setPupilAdd] = useState(false);
    const [isPupilEdit, setPupilEdit] = useState(false)
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        fetchRecord('', 'name')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {

        let data = { "Searchby": searchBy, "Filterby": filterBy, "page": "1", "limit": "100" }
        Service.post(data, `${EndPoints.PupilByShoolId}/${User.user.UserDetialId}`, (res) => {
            if (res.flag) {
                setLoading(false)
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of absent check', err);
        })
    }

    const pupilRender = ({ item }) => {
        return (
            <Pupillist item={item} onPupilClick={() => { setPupilProfile(true); setSelectedItem(item) }} />
        );
    };
    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
    }

    const onEditClick = () => {
        setPupilEdit(true);
        setPupilProfile(false);
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.backgroundColorCommon }}>
            {
                isPupilProfile ?
                    <PupilProfileView selectedPupil={selectedItem} navigateToBack={() => setPupilProfile(false)} onEditTeacherProfile={() => onEditClick()} />
                    :
                    isPupilAdd ?
                        <PupilProfileAdd selectedPupil={selectedItem} navigateToBack={() => setPupilAdd(false)} />
                        :
                        isPupilEdit ?
                            <PupilProfileEdit navigateToBack={() => setPupilEdit(false)} 
                            selectedPupil={selectedItem} openNotification={() => { openNotification() }} />
                            :
                            <>
                                <HeaderPM
                                    onAlertPress={() => openNotification()}
                                    onTabSelected={(tab) => setSelectedTab(tab)}
                                    tabs={props.tabs}
                                    onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
                                    onSearch={(keyword) => fetchRecord(keyword, 'name')}
                                    onClearSearch={() => { setSearchKeyword(''); fetchRecord('', 'name') }}
                                    onFilter={(filterBy) => fetchRecord('', filterBy)}
                                    navigateToAddNewUser={() => props.navigateToAddNewUser()}
                                    navigateToAddPupil={() => setPupilAdd(true)} />

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
                                                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>First Name</Text>
                                                            </View>
                                                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Last Name</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil2]}>
                                                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Class Group</Text>
                                                            </View>

                                                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil22, { alignItems: 'center' }]}>
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
                                                                style={{ height: '85%' }}
                                                            />
                                                        </View>
                                                    </>
                                                    :
                                                    <View style={PAGESTYLE.mainContainer}>
                                                        <NoPupil style={PAGESTYLE.noDataImage} height={300} width={300} />
                                                        <Text style={PAGESTYLE.nodataTitle}>There doesn’t seem to be any pupils here</Text>
                                                        <Text style={PAGESTYLE.nodataContent}>Start adding teachers to invite them to join the school</Text>
                                                    </View>
                                        }
                                    </View>
                                    :
                                    <ClassSetUp />
                                }
                            </>
            }
        </View>
    )
}

export default PupilManagement
