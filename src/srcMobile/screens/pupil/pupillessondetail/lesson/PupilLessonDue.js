import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import moment from "moment";
import { baseUrl } from "../../../../../utils/Constant";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
// import Images from "../../../../../../src/utils/Images";
import DueIcon from "../../../../../svg/pupil/dashboard/HWDue_Orange";
import SubmittedIcon from "../../../../../svg/pupil/lessonhwplanner/SubmittedIcon";
import MarkedIcon from "../../../../../svg/pupil/lessonhwplanner/MarkedIcon";

const PupilLessonDue = (props) => {
    return (

        <View style={[PAGESTYLE.videoSliderSpaceLH,{flex : 1}]}>
            <ScrollView>
            {
                props.isHomeworkLoading ?
                <View>
                    <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.lightOrangeLogin} />
                    </View>
                    :
                    <>
                        {props.DueHomeWork.length > 0 || props.SubmitHomeWork.length > 0 || props.MarkedHomeWork.length > 0 ?
                            <>
                                {props.DueHomeWork.length > 0 ?
                                    <>
                                        <Text style={[PAGESTYLE.videoTitle,{paddingTop : 10,paddingBottom : 10,marginBottom : 0}]}>Homework due</Text>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>

                                            {
                                                props.DueHomeWork.map((item) => {
                                                    return (
                                                        <TouchableOpacity style={[PAGESTYLE.videoCard,{height : hp(30)}]} onPress={() => props.navigatePupilHomeWorkDetail(item)}>
                                                            <View style={PAGESTYLE.videoCardThumb}>
                                                                <DueIcon style={PAGESTYLE.dueIcon} height={hp(1.98)} width={hp(1.79)} />
                                                                {/* <Image source={require('../../../../../assets/images/dueToday2.png')} style={PAGESTYLE.dueIcon} /> */}
                                                                <Text style={PAGESTYLE.videoDateBlack}>Due: {moment(item.DueDate).format('DD/MM/yyyy')}</Text>
                                                                {/* <Image source={require('../../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabelDue} /> */}
                                                            </View>
                                                            <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                                                                <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                                <Text style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace, { alignItems: 'center' }]}>
                                                                <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                                <Text style={[PAGESTYLE.videoUserName, { textAlign: 'center' }]}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </> : null
                                }
                                {props.SubmitHomeWork.length > 0 ?
                                    <>
                                        <Text style={[PAGESTYLE.videoTitle,{paddingTop : 10,paddingBottom : 10,marginBottom : 0}]}>Submitted homework</Text>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                                            {
                                                props.SubmitHomeWork.map((item) => {
                                                    return (
                                                        <TouchableOpacity style={[PAGESTYLE.videoCard,{height : hp(30)}]} onPress={() => props.navigatePupilHomeworkesubmited(item)}>
                                                            <View style={PAGESTYLE.videoCardThumb}>
                                                                <SubmittedIcon width={hp(1.79)} height={hp(1.98)} style={PAGESTYLE.dueIcon} />
                                                                {/* <Image source={require('../../../../../assets/images/submitted2.png')} style={PAGESTYLE.dueIcon} /> */}
                                                                <Text style={PAGESTYLE.videoDateBlack}>Submitted: {moment(item.SubmitedDate).format('DD/MM/yyyy')}</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                                                                <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                                <Text style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace, { alignItems: 'center' }]}>
                                                                <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                                <Text style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                                            </View>
                                                            
                                                        </TouchableOpacity>
                                                       
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </> : null
                                }
                                {props.MarkedHomeWork.length > 0 ?
                                    <>
                                        <Text style={[PAGESTYLE.videoTitle,{paddingTop : 10,paddingBottom : 10,marginBottom : 0}]}>Homework marked</Text>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>

                                            {
                                                props.MarkedHomeWork.map((item) => {
                                                    return (
                                                        <TouchableOpacity style={[PAGESTYLE.videoCard,{height : hp(30)}]} onPress={() => props.navigatePupilHomeworkemarked(item)}>
                                                            <View style={PAGESTYLE.videoCardThumb}>
                                                                {/* <Image source={require('../../../../../assets/images/marked2.png')} style={PAGESTYLE.dueIcon} /> */}
                                                                <MarkedIcon width={hp(1.79)} height={hp(1.98)} style={PAGESTYLE.dueIcon} />
                                                                <Text style={PAGESTYLE.videoDateBlack}>Marked</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                                                                <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                                <Text style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                            </View>
                                                            <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace, { alignItems: 'center' }]}>
                                                                <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                                <Text style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </> : null
                                }
                            </>
                            :
                            <EmptyStatePlaceHohder holderType={3} title1={MESSAGE.noLessonHWPupil1} title2={MESSAGE.noLessonHWPupil2} />
                        }
                    </>
            }
            </ScrollView>
        </View >


    );
}
export default PupilLessonDue;