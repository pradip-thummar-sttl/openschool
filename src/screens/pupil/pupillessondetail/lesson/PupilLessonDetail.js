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
import WorkSpace from "../../Workspace/WorkSpace";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import PupilHomeWorkSubmitted from "../homework/PupilHomeWorkSubmitted";
import PupilHomeWorkMarked from "../homework/PupilHomeWorkMarked";
import PupilHomeWorkDetail from "../homework/PupilHomeWorkDetail";
import { baseUrl, showMessage } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";


const PupilLessonDetailInternal = (props) => {
    // console.log('props routes',props)
    const [isWorkspace, setWorkSpace] = useState(false)
    const [isWorkspaceEdit, setWorkSpaceEdit] = useState(false)
    const [tappedItem, setTappedItem] = useState(0)
    const [isHWDetail, setHWDetail] = useState(false)
    const [isHWSubmitted, setHWSubmitted] = useState(false)
    const [isHWMarked, setHWMArked] = useState(false)
    const [hwData, setHWData] = useState({})
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)
    // const { item } = props
    // const [item, setItem] = useState(props.route.params.item)
    const [item, setItem] = useState(props.item)
    console.log('props.route.params', props);

    const refresh = () => {
        console.log(`${EndPoints.GetPupilLesson}/${item._id}/${User.user.UserDetialId}`);

        Service.get(`${EndPoints.GetPupilLesson}/${item._id}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setItem(res.data[0])
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    const getHomeWork = () => {
        setHomeworkLoading(true)
        Service.get(`${EndPoints.GetPupilHomework}/${item._id}/${User.user.UserDetialId}`, (res) => {
            setHomeworkLoading(false)
            if (res.code == 200) {
                console.log('response of get all homework', res)
                if (res.data._id) {
                    setHWData(res.data)
                    if (res.data.Submited) {
                        setHWSubmitted(true)
                    } else if (res.data.Marked) {
                        setHWMArked(true)
                    } else {
                        setHWDetail(true)
                    }
                } else {
                    showMessage(MESSAGE.noHomework)
                }
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setHomeworkLoading(false)
            console.log('response of get all lesson error', err)
        })
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            {
                console.log('isworkspace on or off', isWorkspace),
                isWorkspace ?
                    <WorkSpace
                        goBack={() => setWorkSpace(false)}
                        onGoBack={() => refresh()}
                        isWorkspace={isWorkspaceEdit}
                        id={item.LessonId}
                        tappedItem={tappedItem}
                        item={item.WorkSpacelist}
                        onAlertPress={() => props.onAlertPress()} />
                    :
                    isHWSubmitted ?
                        <PupilHomeWorkSubmitted
                            goBack={() => setHWSubmitted(false)}
                            item={hwData}
                            onAlertPress={() => props.onAlertPress()} />
                        :
                        isHWMarked ?
                            <PupilHomeWorkMarked
                                goBack={() => setHWMArked(false)}
                                item={hwData}
                                onAlertPress={() => props.onAlertPress()} />
                            :
                            isHWDetail ?
                                <PupilHomeWorkDetail
                                    goBack={() => setHWMArked(false)}
                                    item={hwData}
                                    onAlertPress={() => props.onAlertPress()} />
                                :
                                <View style={PAGESTYLE.commonBg}>
                                    <HeaderWhitewithoutsearch
                                        title={` ${item.SubjectName} - ${moment(item.LessonDate).format('DD/MM/YYYY')}`}
                                        goBack={() => { props.goBack() }}
                                        onAlertPress={() => props.onAlertPress()}
                                        onOpenWorkSpacePress={() => { setWorkSpaceEdit(true), setWorkSpace(true) }}
                                        onSeeHomeworkPress={() => getHomeWork()} />
                                    {/* onOpenWorkSpacePress={() => props.navigation.navigate('WorkSpace', { onGoBack: () => refresh(), id: item.LessonId, isWorkspace: true })} */}

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
                                                <Image style={PAGESTYLE.userMainThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
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
                                                    item != undefined && item.MaterialList.length > 0 ?
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
                                                <ScrollView style={{ height: '50%' }} showsVerticalScrollIndicator={false}>
                                                    {
                                                        item.WorkSpacelist.length > 0 ?
                                                            item.WorkSpacelist.map((obj, index) => {
                                                                return (
                                                                    // props.navigation.navigate('WorkSpace',{id:item.LessonId, isWorkspace:false, item:obj.filename})
                                                                    <TouchableOpacity style={PAGESTYLE.fileGrp} onPress={() => { setTappedItem(index), setWorkSpaceEdit(false), setWorkSpace(true) }}>
                                                                        <Text style={PAGESTYLE.fileName}>Workspace {index + 1}</Text>
                                                                        <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                                                    </TouchableOpacity>
                                                                )
                                                            }) :
                                                            <Text style={{ alignSelf: 'center' }}>No Workspace</Text>
                                                    }
                                                </ScrollView>
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
            }
        </View >
    );
}
export default PupilLessonDetailInternal;