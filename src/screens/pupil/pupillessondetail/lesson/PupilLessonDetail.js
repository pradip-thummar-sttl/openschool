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
import moment from "moment";
import Images from "../../../../utils/Images";
import { Download } from "../../../../utils/Download";


const PupilLessonDetailInternal = (props) => {
    // console.log('props routes',props)
    const { item } = props.route.params
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />

            <View style={PAGESTYLE.commonBg}>
                <HeaderWhitewithoutsearch
                    title={` ${item.SubjectName} - ${moment(item.LessonDate).format('DD/MM/YYYY')}`}
                    goBack={() => props.navigation.goBack()}
                    onAlertPress={() => props.navigation.openDrawer()}
                    onOpenWorkSpacePress={() => props.navigation.navigate('WorkSpace',{id:item.LessonId,isWorkspace:true})}
                    onSeeHomeworkPress={() => props.navigation.navigate('PupilHomeWorkDetail')}
                />

                <View style={PAGESTYLE.containerWrap}>
                    <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>

                        <View style={PAGESTYLE.largeVideoBlock}>
                            <Image source={require('../../../../assets/images/videoLarge2.png')} style={PAGESTYLE.largeVideo} />
                        </View>
                        <View style={PAGESTYLE.videoTitleLine}>
                            <View>
                                <Text style={PAGESTYLE.videoMainTitle}>{item.LessonTopic}</Text>
                                <Text style={PAGESTYLE.videoPublishDate}>Published on {moment(item.LessonDate).format('ll')}</Text>
                            </View>
                            <View style={PAGESTYLE.bookMark}>
                                <Image source={require('../../../../assets/images/bookmarkOn2.png')} style={PAGESTYLE.bookMarkOn} />
                                <Text style={PAGESTYLE.saveBookMarkText}>Saved!</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.userNameMain}>
                            <Image style={PAGESTYLE.userMainThumb} source={{ uri: item.TeacherProfile }}></Image>
                            <Text style={PAGESTYLE.mainNameText}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                        </View>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonText}>{item.LessonDescription}</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.rightSideBar}>
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            <Text style={PAGESTYLE.requireText}>Learning material</Text>
                            {
                                item.MaterialList.length > 0 ?
                                    item.MaterialList.map((obj) => {
                                        return (
                                            <View style={PAGESTYLE.fileGrp}>
                                                <Text style={PAGESTYLE.fileName}>{obj.originalname}</Text>
                                                <TouchableOpacity onPress={() => Download(obj)} style={PAGESTYLE.downloaBtn}>
                                                    <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                                </TouchableOpacity>
                                                {/* <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} /> */}
                                            </View>
                                        )
                                    }) :
                                    <Text style={{ alignSelf: 'center' }}>No material</Text>
                            }

                        </View>

                        <View style={PAGESTYLE.thumbVideo}>
                            <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />

                        </View>
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            <Text style={[PAGESTYLE.lightGreyText, PAGESTYLE.titleSpace]}>Saved workspaces</Text>
                            {
                                item.WorkSpacelist.length > 0 ?
                                    item.WorkSpacelist.map((obj) => {
                                        return (
                                            <TouchableOpacity style={PAGESTYLE.fileGrp} onPress={() => props.navigation.navigate('WorkSpace',{id:item.LessonId, isWorkspace:false, item:obj.filename})}>
                                                <Text style={PAGESTYLE.fileName}>Workspace</Text>
                                                <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                            </TouchableOpacity>
                                        )
                                    }) :
                                    <Text style={{ alignSelf: 'center' }}>No Workspace</Text>
                            }

                            {/* <View style={PAGESTYLE.fileGrp}>
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
                            </View> */}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilLessonDetailInternal;