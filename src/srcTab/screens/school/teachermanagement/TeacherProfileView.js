import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, Platform, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './StyleProfile';
import HeaderPMInner from './HeaderPMInner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import LessonList from "./lessonlist/LessonList";
import TeacherChat from "./teacherchat/TeacherChat";
import COLORS from "../../../../utils/Colors";

const TeacherProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);

    const item = props.selectedTeacher;
    const [isLessonDetail, setLessonDetail] = useState(false);
    const [teacherCountData, setTeacherCountData] = useState([])
    const [isSearch, setSearch] = useState('')
    const [isFilter, setFilter] = useState('')

    useEffect(() => {
        console.log(`${EndPoints.TeacherDetails}/${item.TeacherId}`);
        Service.get(`${EndPoints.TeacherDetails}/${item.TeacherId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setTeacherCountData(res.data)
                
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }, [])
    

    const openNotification = () => {
        props.onNavigation.openDrawer();
    }


    return (
       
        <View style={PAGESTYLE.mainPage1}>
            
            {!isLessonDetail &&
                <HeaderPMInner
                    onSearch={(search, filter) => { setSearch(search); setFilter(filter) }}
                    navigateToBack={() => { props.navigateToBack() }}
                    tabIndex={(index) => { setTabSelected(index) }}
                    tabSelected={tabSelected}
                    pupilName={item.FirstName + ' ' + item.LastName}
                    onNotification={() => openNotification()} 
                    // onEditTeacherProfile={}
                    />
            }

            <View style={{ flex: 1 }}>
                {
                    tabSelected === 0 ?
                        <View style={{ width: isHide ? '100%' : '100%', }}>
                            <View style={PAGESTYLE.whiteBg}>
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '99%' }}>
                                    <View style={PAGESTYLE.managementDetail}>
                                        <View style={PAGESTYLE.secondHeader}>
                                            <View style={{ height: '100%', overflow: 'hidden', width: '100%', position: 'absolute' }}>
                                                <TopBackImg style={PAGESTYLE.managementopImage} height={hp(21)} width={'100%'} />
                                            </View>
                                            <View style={PAGESTYLE.thumbTopUser}>
                                                <Image style={{ height: '100%', width: '100%', borderRadius: 100, backgroundColor: COLORS.borderGrp }}
                                                    source={{ uri: baseUrl + item.ProfilePicture }} />
                                            </View>
                                            <TouchableOpacity style={STYLE.btnEditView} onPress={() => props.onEditTeacherProfile()}>
                                                <Text style={STYLE.txtEditView}>Edit Profile</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Teacher name</Text>
                                                <Text style={PAGESTYLE.userName}>{item.FirstName} {item.LastName}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Teaching Year</Text>
                                                <Text style={PAGESTYLE.userName}>{item.TeachingYear}</Text>
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={[PAGESTYLE.userLabel,]}>Unique I.D (auto-generated)</Text>
                                                <Text style={PAGESTYLE.userName}>{item.UniqueNumber}</Text>
                                            </View>
                                        </View>
                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Email</Text>
                                                <Text style={PAGESTYLE.userName}>{item.Email}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Status</Text>
                                                <Text style={PAGESTYLE.userName}>{item.Active ? 'Active' : 'Inactive'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.rateAnnotationBlock}>
                                        <View style={PAGESTYLE.ratingBlock}>
                                            <Text style={PAGESTYLE.ratingTitle}>Teacher Insights</Text>
                                            <View style={PAGESTYLE.achivementBox}>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.ScheduledLesson}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Scheduled Lessons</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.HomeworkSet}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Homework Set</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.ActivePupile}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Active Pupils</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.PreviousLesson}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Previous Lessons</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.HomeworkSubmited}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Homework Submitted</Text>
                                                </View>
                                                <View style={PAGESTYLE.insightBox}>
                                                    <Text style={PAGESTYLE.insightMain}>{teacherCountData.InActivePupile}</Text>
                                                    <Text style={PAGESTYLE.insightLabel}>Inactive Pupils</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </KeyboardAwareScrollView>
                            </View>
                        </View>
                        :
                        tabSelected === 1 ?
                            <TeacherChat tabs={tabSelected} data={item} />
                            :
                            <LessonList data={item} search={isSearch} filter={isFilter} onNotification={() => openNotification()} setLessonDetail={(flag) => setLessonDetail(flag)} />
                }
            </View>
        </View>
    );
}
export default TeacherProfileView;