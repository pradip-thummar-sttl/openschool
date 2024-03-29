import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import { opacity, showMessage } from "../../../../../utils/Constant";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { User } from "../../../../../utils/Model";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import ArrowNext from "../../../../../svg/teacher/lessonhwplanner/ArrowNext";
var moment = require('moment');

const Pupillist = (props, { }) => (
    <TouchableOpacity
        activeOpacity={opacity}
        onPress={() => props.navigateToDetail()}>
        <View style={[PAGESTYLE.pupilData]}>
            <View style={PAGESTYLE.pupilProfile, PAGESTYLE.firstColumn}>
                <View style={PAGESTYLE.border}></View>
                <Text numberOfLines={1} style={PAGESTYLE.pupilName}>{props.item.SubjectName}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.secoundColumn,]}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(15) }]}>{props.item.LessonTopic}</Text>
            </View>
            <View style={[PAGESTYLE.pupilProfile, PAGESTYLE.date]}>
                <Text numberOfLines={1} style={PAGESTYLE.pupilName}>{moment(props.item.Date).format('DD/MM/yyyy')}</Text>
            </View>
            <View style={{...PAGESTYLE.pupilProfile, width: hp(12)}}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(12), }]}>{props.item.GroupName ? props.item.GroupName : '-'}</Text>
            </View>
            <View style={{...PAGESTYLE.pupilProfile, width: hp(17)}}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(17), }]}>{props.item.TeacherFirstName + ' ' + props.item.TeacherLastName}</Text>
            </View>
            <View style={{...PAGESTYLE.pupilProfile, width: hp(17)}}>
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName, { width: hp(17) }]}>{props.item.GroupName ? props.item.GroupName : '-'}</Text>
            </View>
            <View style={PAGESTYLE.pupilDetailLink}>
                {/* <Image style={[PAGESTYLE.pupilDetaillinkIcon,]} source={Images.DashboardRightArrow} /> */}
                <ArrowNext style={[PAGESTYLE.pupilDetaillinkIcon,]} height={hp(1.51)} width={hp(0.95)} />
            </View>
        </View>
    </TouchableOpacity>
);

const LessonList = (props) => {
    const [isHide] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [] = useState(false)
    const [isTLDetail, setTLDetail] = useState(false)
    const [data, setItem] = useState([])
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
            
                item={item}
                navigateToDetail={() => { setItem(item), setTLDetail(true), props.setLessonDetail(true) }}
            />
        );
    };

    const [lessonData, setLessonData] = useState([])
    const [isLessonLoading, setLessonLoading] = useState(true)
    const [] = useState('')
    const [] = useState('')




    useEffect(() => {
        fetchRecord('', '')
    }, [])

    const fetchRecord = (searchBy, filterBy) => {
        setLessonLoading(true)
        let data = {
            Searchby: searchBy,
            Filterby: filterBy,
        }
        Service.post(data, `${EndPoints.GetAllPupilLessonList}/${props.data.PupilId}`, (res) => {
            setLessonLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setLessonData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const refresh = () => {
        console.log('refreshed');
        fetchRecord('', '')
    }


    const renderList = () => {
        return (
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.pupilTable}>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Subject</Text>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Lesson Topic</Text>
                            </View>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Date</Text>
                            </View>
                            <View style={{...PAGESTYLE.pupilTableHeadingMain, width: hp(12)}}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Group</Text>
                            </View>
                            <View style={{...PAGESTYLE.pupilTableHeadingMain, width: hp(17)}}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Teacher's Name</Text>
                            </View>
                            <View style={{...PAGESTYLE.pupilTableHeadingMain, width: hp(17)}}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Feedback</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.pupilTabledata}>
                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                {isLessonLoading ?
                                    <ActivityIndicator
                                        style={{ flex: 1 }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.yellowDark} />
                                    :
                                    lessonData.length > 0 ?
                                        <FlatList
                                            data={lessonData}
                                            renderItem={pupilRender}
                                            keyExtractor={(item) => item.id}
                                            extraData={selectedId}
                                            showsVerticalScrollIndicator={false}
                                            style={{ height: wp(53.5) }}
                                        />
                                        :
                                        // <View style={{ height: 100, justifyContent: 'center' }}>
                                        //     <Text style={{ alignItems: 'center', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                        // </View>
                                        <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHW1} title2={MESSAGE.noLessonHW2} />
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            {
                isTLDetail ?
                        null
                        :
                        renderList()
            }
        </View>
    );
}
export default LessonList;