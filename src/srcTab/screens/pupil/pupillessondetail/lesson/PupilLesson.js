import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import Images from '../../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import moment from "moment";
import { baseUrl } from "../../../../../utils/Constant";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import LessonVideoBack from "../../../../../svg/pupil/lessonhwplanner/LessonVideoBack";
import LessonVideoOverlay from "../../../../../svg/pupil/lessonhwplanner/LessonVideoOverlay";
//import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";


const PupilLesson = (props) => {
    const { currentWeekLesson, lastWeekLesson } = props
    return (

        <View style={[PAGESTYLE.commonBg, PAGESTYLE.videoSliderSpace]}>
            {currentWeekLesson.length > 0 || lastWeekLesson.length > 0 ?
                <>
                    {currentWeekLesson.length > 0 ?
                        <>
                            <Text style={PAGESTYLE.videoTitle}>Lessons for Week beginning</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                                {
                                    currentWeekLesson.map((item) => {
                                        return (
                                            <TouchableOpacity style={PAGESTYLE.videoCard} onPress={() => props.navigatePupilLessonDetailInternal(item)}>
                                                <View style={PAGESTYLE.videoCardThumb}>
                                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} /> */}
                                                    <LessonVideoBack style={PAGESTYLE.videoThumbnail} width={'100%'} height={hp(13.54)} />
                                                    {/* <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} /> */}
                                                    <LessonVideoOverlay style={PAGESTYLE.videoShadow} width={'100%'} height={hp(13.54)} />
                                                    <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                                    <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} />
                                                </View>
                                                <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                                                    <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                    <Text numberOfLines={1} style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </>
                        :
                        null}

                    {lastWeekLesson.length > 0 ?
                        <>
                            <Text style={[PAGESTYLE.videoTitle]}>Lessons from last week</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                                {lastWeekLesson.map((item) => {
                                    return (
                                        <TouchableOpacity style={PAGESTYLE.videoCard} onPress={() => props.navigatePupilLessonDetailInternal(item)}>
                                            <View style={PAGESTYLE.videoCardThumb}>
                                                {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} /> */}
                                                <LessonVideoBack style={PAGESTYLE.videoThumbnail} width={'100%'} height={hp(13.54)} />
                                                {/* <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} /> */}
                                                <LessonVideoOverlay style={PAGESTYLE.videoShadow} width={'100%'} height={hp(13.54)} />
                                                <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                                <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} />
                                            </View>
                                            <Text style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                            <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                            <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                                                <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                <Text numberOfLines={1} style={PAGESTYLE.videoUserName}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </>
                        :
                        null
                    }
                </>
                :
                <EmptyStatePlaceHohder holderType={1} image={Images.noLessonHW} title1={MESSAGE.noLessonHWPupil1} title2={MESSAGE.noLessonHWPupil2} />
            }
        </View>


    );
}
export default PupilLesson;