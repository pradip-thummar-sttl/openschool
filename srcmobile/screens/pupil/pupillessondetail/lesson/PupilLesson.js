import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import moment from "moment";
import { baseUrl } from "../../../../utils/Constant";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../utils/Messages";
//import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";


const PupilLesson = (props) => {
    const { currentWeekLesson, lastWeekLesson } = props
    return (

        <View style={[PAGESTYLE.commonBg, PAGESTYLE.videoSliderSpace]}>
            {currentWeekLesson.length > 0 || lastWeekLesson.length > 0 ?
                <>
                    <Text style={PAGESTYLE.videoTitle}>Lessons for Week beginning</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                        {
                            currentWeekLesson.map((item) => {
                                
                                return (
                                    <TouchableOpacity style={PAGESTYLE.videoCard} onPress={() => props.navigatePupilLessonDetailInternal(item)}>
                                        <View style={PAGESTYLE.videoCardThumb}>
                                            <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} />
                                            <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} />
                                            <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                            <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} />
                                        </View>
                                        <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                        <Text style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                        <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                                            <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                            <Text style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Lessons from last week</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                        {lastWeekLesson.map((item) => {
                            return (
                                <TouchableOpacity style={PAGESTYLE.videoCard} onPress={() => props.navigatePupilLessonDetailInternal(item)}>
                                    <View style={PAGESTYLE.videoCardThumb}>
                                        <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} />
                                        <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} />
                                        <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                        <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} />
                                    </View>
                                    <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                    <Text style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                                        <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                        <Text style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </>
                :
                <EmptyStatePlaceHohder image={Images.noCalender} title1={MESSAGE.noTimetable1} title2={MESSAGE.noTimetable2} />
            }
        </View>


    );
}
export default PupilLesson;