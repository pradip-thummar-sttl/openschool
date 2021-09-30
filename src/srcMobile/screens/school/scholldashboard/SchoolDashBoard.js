import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Image, ToastAndroid, BackHandler, Platform } from 'react-native'
import MoreWhite from '../../../../svg/teacher/dashboard/MoreWhite';
import MyDay from '../../../../svg/teacher/dashboard/MyDay';
import Header from "../../../component/reusable/header/Header";
import PAGESTYLE from './Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import COLORS from '../../../../utils/Colors';
import ArrowNext from '../../../../svg/teacher/pupilmanagement/ArrowNext';
import { baseUrl, showMessage } from '../../../../utils/Constant';
import { Service } from '../../../../service/Service';
import { EndPoints } from '../../../../service/EndPoints';
import { User } from '../../../../utils/Model';
import MyPupils from '../../../../svg/teacher/dashboard/MyPupils';
import Insights from '../../../../svg/school/dashboard/Insights';

const SchoolDashBoard = (props) => {

    const [dashData, setdashData] = useState([])
    const [pupilData, setPupilData] = useState([])
    const [isDashDataLoading, setDashDataLoading] = useState(true)
    const [isPupilDataLoading, setPupilDataLoading] = useState(true)
    let currentCount = 0

    useEffect(() => {
        refresh()

        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

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

    const refresh = () => {
        // Service.get(`${EndPoints.GetMyDayByTeacherId}/${User.user.UserDetialId}`, (res) => {
        //     setDashDataLoading(false)
        //     if (res.code == 200) {
        //         setdashData(res.data)
        //         // setDataOfSubView(res.data[0])
        //     } else {
        //         showMessage(res.message)
        //     }
        // }, (err) => {
        //     console.log('response of get all lesson error', err)
        // })

        // console.log('response of get all teacher', User.user)


        let data = {
            Searchby: "",
            Filterby: -1
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            setPupilDataLoading(false)
            if (res.code == 200) {
                setPupilData(res.data)
            } else {
                showMessage(res.message)
            }
            console.log('response of get all teacher', res)

        }, (err) => {
            console.log('response of get all teacher error', err)
        })
        return () => {
        }
    }
    const Pupillist = ({ item, onPress }) => (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={[PAGESTYLE.pupilData]}>
                <View style={PAGESTYLE.pupilProfile}>
                    <Image style={PAGESTYLE.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>

                    <View >
                        <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: wp(40) }]}>{item.FirstName} {item.LastName}</Text>
                        <Text numberOfLines={1} style={PAGESTYLE.groupName}>{item.TeachingYear}</Text>
                    </View>

                </View>

                {/* <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} /> */}
                <ArrowNext style={PAGESTYLE.pupilDetaillinkIcon} height={hp(1.51)} width={hp(0.95)} />
            </View>
        </TouchableOpacity>
    );


    return (
        <View >
            <Header onAlertPress={() => props.navigation.openDrawer()} />
            <ScrollView showsVerticalScrollIndicator={false} style={[PAGESTYLE.padLeftRight, { height: '90%' }]}>
                <View style={PAGESTYLE.viewRow}>
                    <View style={PAGESTYLE.iconView}>
                        <Insights style={PAGESTYLE.dayIcon} height={hp(2.9)} width={hp(2.9)} />
                        <Text H3 style={PAGESTYLE.dayTitle}>Insights</Text>
                    </View>
                    <TouchableOpacity>
                        <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.20)} width={hp(0.65)} />
                    </TouchableOpacity>
                </View>

                <View style={PAGESTYLE.whiteBoard}>
                    {/* <View>
                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                            <FlatList
                                style={PAGESTYLE.ScrollViewFlatlist}
                                data={[1,2,3,4,5,6]}
                                // renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                // extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        </SafeAreaView>
                    </View> */}
                    <EmptyStatePlaceHohder holderType={7} title1={MESSAGE.noInsights1} title2={MESSAGE.noInsights2} />
                </View>

                <View style={[PAGESTYLE.viewRow, { marginTop: hp(2), backgroundColor: COLORS.greenSchool }]}>
                    <View style={PAGESTYLE.iconView}>
                        <MyPupils style={PAGESTYLE.dayIcon} height={hp(2.5)} width={hp(2.5)} />
                        <Text H3 style={PAGESTYLE.dayTitle}>My Teachers</Text>
                    </View>
                    <TouchableOpacity>
                        <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.20)} width={hp(0.65)} />
                    </TouchableOpacity>
                </View>

                <View style={PAGESTYLE.whiteBoard}>
                    {
                        pupilData.length > 0 ?
                            <View>
                                <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                    <FlatList
                                        style={PAGESTYLE.ScrollViewFlatlist}
                                        data={pupilData}
                                        renderItem={Pupillist}
                                        keyExtractor={(item) => item.id}
                                        // extraData={selectedId}
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled
                                    />
                                </SafeAreaView>
                            </View> :
                            <EmptyStatePlaceHohder holderType={6} title1={MESSAGE.noTeacher} title2={MESSAGE.noLessonHWPupil2} />

                    }

                </View>
            </ScrollView>

        </View>
    )
}
export default SchoolDashBoard
