import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import HeaderWhitewithoutsearch from "../../../../component/reusable/header/bulck/HeaderWhitewithoutsearch";
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";


const PupilLessonDetailInternal = (props) => {
    return (
        <View style={PAGESTYLE.mainPage}>
        <Sidebarpupil hide={() => action(!isHide)}
            navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
            navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
            onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />

        <View style={PAGESTYLE.whiteBg}>
            <HeaderWhitewithoutsearch
                goBack={() => props.navigation.goBack()}
                onAlertPress={() => props.navigation.openDrawer()}
                onSeeHomeworkPress={() => props.navigation.navigate('PupilHomeWorkDetail')}
            />

            <View style={PAGESTYLE.containerWrap}>
                <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>

                    <View style={PAGESTYLE.largeVideoBlock}>
                        <Image source={require('../../../../assets/images/videoLarge2.png')} style={PAGESTYLE.largeVideo} />
                    </View>
                    <View style={PAGESTYLE.videoTitleLine}>
                        <View>
                            <Text style={PAGESTYLE.videoMainTitle}>Grammar: How to use conjunctions to join two words together</Text>
                            <Text style={PAGESTYLE.videoPublishDate}>Published on 29 July 2020</Text>
                        </View>
                        <View style={PAGESTYLE.bookMark}>
                            <Image source={require('../../../../assets/images/bookmarkOn2.png')} style={PAGESTYLE.bookMarkOn} />
                            <Text style={PAGESTYLE.saveBookMarkText}>Saved!</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.userNameMain}>
                        <View style={PAGESTYLE.userMainThumb}></View>
                        <Text style={PAGESTYLE.mainNameText}>Miss Barker</Text>
                    </View>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonText}>In this lesson, we will learn all about conjunctions: what they are and how to use them. You will learn your first 7 conjunctions and I would like you to complete the homework that comes with it. This lesson is worth 5 gold stars!</Text>
                    </View>




                </View>
                <View style={PAGESTYLE.rightSideBar}>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Learning material</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                    </View>

                    <View style={PAGESTYLE.thumbVideo}>
                        <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />

                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={[PAGESTYLE.lightGreyText, PAGESTYLE.titleSpace]}>Saved workspaces</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Workspace</Text>
                            <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Workspace</Text>
                            <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Workspace</Text>
                            <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Workspace</Text>
                            <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
</View>
    );
}
export default PupilLessonDetailInternal;