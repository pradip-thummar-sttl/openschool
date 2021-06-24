import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, } from 'react-native'
import { EndPoints } from '../../../service/EndPoints'
import { Service } from '../../../service/Service'
import { baseUrl, showMessage } from '../../../utils/Constant'
import Images from '../../../utils/Images'
import STYLE from '../../../utils/Style'
import HeaderPM from './HeaderPM'
import PAGESTYLE from './StyleList'
import GroupSetUp from './GroupSetUp'
import COLORS from '../../../utils/Colors'

const Pupillist = (props, { item }) => (
    <TouchableOpacity
        style={PAGESTYLE.pupilDetailLink}
        onPress={() => props.onPupilClick()}>
        <View style={[PAGESTYLE.pupilData]}>
            <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + props.item.ProfilePicture }}></Image>

            <View style={PAGESTYLE.pupilProfile}>
                <Text style={PAGESTYLE.pupilName}>{props.item.FirstName}</Text>
            </View>
            <View style={PAGESTYLE.pupilProfile}>
                <Text style={PAGESTYLE.pupilName}>{props.item.LastName}</Text>
            </View>
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn}>
                <Text style={PAGESTYLE.pupilgroupName}>{props.item.GroupName ? props.item.GroupName : 'Grop A'}</Text>
            </View>
            {/* </View> */}
            {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn11}>
                <Text style={PAGESTYLE.pupilgroupName}>{moment(props.item.Dob).format('DD/MM/YYYY')}</Text>
            </View>
            {/* </View> */}
            <View style={PAGESTYLE.perfomanceColumn}>
                <View style={PAGESTYLE.perfomanceDotmain}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.purpleDot]}></View></View>
                <View style={PAGESTYLE.perfomanceDotmainTwo}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.yellowDot]}></View></View>
            </View>
            <View style={PAGESTYLE.rewardColumn}>
                <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
            </View>
            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
        </View>
    </TouchableOpacity>
);

const PupiloverView = (props) => {
    const [selectedId, setSelectedId] = useState(0);
    const [pupilData, setPupilData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)

    useEffect(() => {
        Service.get(`${EndPoints.PupilByTeacherId}/6041cf525ff1ce52e5d4d398`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }, [])

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
                onTabSelected={(tab) => setSelectedTab(tab)} />

            {selectedTab == 0 ?
                <View style={[PAGESTYLE.whiteBoard, PAGESTYLE.pupilDashboard]}>
                    {pupilData.length > 0 ?
                        <>
                            <View style={PAGESTYLE.pupilTable}>
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
                            <Image source={Images.noData} style={PAGESTYLE.noDataImage}></Image>
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