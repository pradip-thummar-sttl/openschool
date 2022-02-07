import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import moment from "moment";
import { baseUrl, opacity } from "../../../../../utils/Constant";
import EmptyStatePlaceHohder from "../../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import MESSAGE from "../../../../../utils/Messages";
import LessonVideoBack from "../../../../../svg/pupil/lessonhwplanner/LessonVideoBack";
import LessonVideoOverlay from "../../../../../svg/pupil/lessonhwplanner/LessonVideoOverlay";
import BookMarkOn from "../../../../../svg/pupil/lessonhwplanner/BookMark_On";
import BookMarkOff from "../../../../../svg/pupil/lessonhwplanner/BookMark_Off";
//import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";


const PupilLesson = (props) => {
    const { currentWeekLesson, lastWeekLesson } = props
    return (

        <View style={[PAGESTYLE.videoSliderSpaceLH,{flex : 1}]}>
            <ScrollView>
            {
                props.isLoading ?
                    <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : 'small'} color={COLORS.lightOrangeLogin} style={{ margin: 20 }} />
                    :
                    <>
                        {currentWeekLesson.length > 0 || lastWeekLesson.length > 0 ?
                            <>
                                {currentWeekLesson.length > 0 ?
                                    <>
                                       
                                        <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Lessons for Week beginning</Text>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={PAGESTYLE.videoWrap}>
                                            {
                                                currentWeekLesson.map((item) => {

                                                    return (
                                                        <TouchableOpacity
                                                            style={[PAGESTYLE.videoCard,{height : hp(30)}]}
                                                            onPress={() => props.navigatePupilLessonDetailInternal(item)}
                                                            activeOpacity={opacity}>
                                                            <View style={PAGESTYLE.videoCardThumb}>
                                                                {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} /> */}
                                                                <LessonVideoBack style={PAGESTYLE.videoThumbnail} width={'100%'} height={hp(13.54)} />
                                                                {/* <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} /> */}
                                                                <LessonVideoOverlay style={PAGESTYLE.videoShadow} width={'100%'} height={hp(13.54)} />
                                                                <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                                                {
                                                                    item.SaveLesson ?
                                                                        <BookMarkOn style={PAGESTYLE.bookMarkLabel} height={hp(2.12)} width={hp(1.81)} />
                                                                        : <BookMarkOff style={PAGESTYLE.bookMarkLabel} height={hp(2.12)} width={hp(1.81)} />
                                                                }
                                                                {/* <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} /> */}
                                                            </View>
                                                            <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                            <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                            <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft, {
                                                                alignItems: 'center'
                                                            }]}>
                                                                <Image style={[PAGESTYLE.lessonThumb]} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                                <Text style={[PAGESTYLE.videoUserName, { textAlign: "center" }]}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
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
                                        <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Lessons from last week</Text>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[PAGESTYLE.videoWrap,]}>
                                            {lastWeekLesson.map((item) => {
                                                return (

                                                    <TouchableOpacity
                                                        style={[PAGESTYLE.videoCard,{height : hp(30)}]}
                                                        onPress={() => props.navigatePupilLessonDetailInternal(item)}
                                                        activeOpacity={opacity}>
                                                        <View style={PAGESTYLE.videoCardThumb}>
                                                            {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.VideoBack} /> */}
                                                            <LessonVideoBack style={PAGESTYLE.videoThumbnail} width={'100%'} height={hp(13.54)} />
                                                            {/* <Image style={PAGESTYLE.videoShadow} source={Images.VideoShadow} /> */}
                                                            <LessonVideoOverlay style={PAGESTYLE.videoShadow} width={'100%'} height={hp(13.54)} />
                                                            <Text style={PAGESTYLE.videoDate}>{moment(item.LessonDate).format('DD/MM/YYYY')}</Text>
                                                            {
                                                                item.SaveLesson ?
                                                                    <BookMarkOn style={PAGESTYLE.bookMarkLabel} height={hp(2.12)} width={hp(1.81)} />
                                                                    : <BookMarkOff style={PAGESTYLE.bookMarkLabel} height={hp(2.12)} width={hp(1.81)} />
                                                            }
                                                            {/* <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkLabel} /> */}
                                                        </View>
                                                        <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleNormal}>{item.SubjectName}</Text>
                                                        <Text numberOfLines={1} style={PAGESTYLE.videoSubTitleBold}>{item.LessonTopic}</Text>
                                                        <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft, { alignItems: 'center' }]}>
                                                            <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                            <Text style={[PAGESTYLE.videoUserName, { textAlign: 'center' }]}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
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
                            <EmptyStatePlaceHohder holderType={1} title1={MESSAGE.noLessonHWPupil1} title2={MESSAGE.noLessonHWPupil2} />
                        }
                    </>
            }
            </ScrollView>
        </View>


    );
}
export default PupilLesson;