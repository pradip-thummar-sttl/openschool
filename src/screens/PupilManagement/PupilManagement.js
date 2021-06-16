import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, } from 'react-native'
import { EndPoints } from '../../service/EndPoints'
import { Service } from '../../service/Service'
import { baseUrl, showMessage } from '../../utils/Constant'
import Images from '../../utils/Images'
import STYLE from '../../utils/Style'
import PAGESTYLE from '../PupilManagement/Style'


const Item = ({ onPress, style, item }) => (
    <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>

        <View style={PAGESTYLE.classSubject}>
            <View style={PAGESTYLE.subjecRow}>
                <View style={PAGESTYLE.border}></View>
                <View>
                    <Text style={PAGESTYLE.subjectName}>{item.SubjectName}</Text>
                    <Text style={PAGESTYLE.subject}>{item.LessonTopic}</Text>
                </View>
            </View>
            <View style={PAGESTYLE.timingMain}>
                <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
            </View>
        </View>
        <View style={PAGESTYLE.arrowSelectedTab}></View>

    </TouchableOpacity>
)
const Pupillist = ({ item }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>

        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName}>{item.FirstName}</Text>
        </View>
        <View style={PAGESTYLE.pupilProfile}>
            <Text style={PAGESTYLE.pupilName}>{item.LastName}</Text>
        </View>
        {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn}>
                <Text style={PAGESTYLE.pupilgroupName}>{item.GroupName ? item.GroupName : 'Grop A'}</Text>
            </View>
        {/* </View> */}
        {/* <View style={PAGESTYLE.groupColumnmain}> */}
            <View style={PAGESTYLE.groupColumn11}>
                <Text style={PAGESTYLE.pupilgroupName}>{moment(item.Dob).format('DD/MM/YYYY')}</Text>
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
        <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
        </TouchableOpacity>
    </View>
);

const PupilManagement = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [pupilData, setPupilData] = useState([])
    useEffect(() => {
        Service.get(`${EndPoints.PupilByTeacherId}/6041cf525ff1ce52e5d4d398`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setPupilData(res.data)
            }else{
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
            />
        );
    };
    return (
        <View>
            <View style={[PAGESTYLE.whiteBoard, PAGESTYLE.pupilDashboard]}>
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
                {/* <View style={[STYLE.hrCommon, PAGESTYLE.pupilhrCustomMargin]}></View> */}
                <View style={PAGESTYLE.pupilTabledata}>
                    {/* <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}> */}
                        <FlatList
                        // style={{backgroundColor:'gray'}}
                            data={pupilData}
                            renderItem={pupilRender}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    {/* </SafeAreaView> */}
                </View>
            </View>
        </View>
    )
}

export default PupilManagement
