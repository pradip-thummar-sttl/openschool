import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import HeaderWhitewithoutsearch from "../../../../component/reusable/header/bulck/HeaderWhitewithoutsearch";
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import moment from "moment";
// import Images from "../../../../../utils/Images";
import { Download } from "../../../../../utils/Download";
import WorkSpace from "../../Workspace/WorkSpace";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { User } from "../../../../../utils/Model";
import PupilHomeWorkSubmitted from "../homework/PupilHomeWorkSubmitted";
import PupilHomeWorkMarked from "../homework/PupilHomeWorkMarked";
import PupilHomeWorkDetail from "../homework/PupilHomeWorkDetail";
import { baseUrl, opacity, showMessage } from "../../../../../utils/Constant";
import MESSAGE from "../../../../../utils/Messages";
import Video from "react-native-video";
import { set } from "react-native-reanimated";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import DownloadSVG from '../../../../../svg/teacher/lessonhwplanner/Download'
import BookMarkOn from "../../../../../svg/pupil/lessonhwplanner/BookMark_On";
import BookMarkOff from "../../../../../svg/pupil/lessonhwplanner/BookMark_Off";
import TabVideoPopup from "../../../../component/reusable/popup/TabVideoPopup";


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
    const [isPaused, setPause] = useState(true)
    // const { item } = props
    // const [item, setItem] = useState(props.route.params.item)
    const [item, setItem] = useState(props.item)
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    const [isVideoModalVisible, setVideoModalVisible] = useState(false);
    const [videoRecord, setVideoRecord] = useState({});

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }

    const refresh = () => {

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

    const saveLesson = (flag) => {
        let data = {
            SaveLesson: flag
        }
        Service.post(data, `${EndPoints.SaveLessonByPupil}/${item._id}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                let temp = { ...item, SaveLesson: flag }

                console.log('temp', temp);
                setItem(temp)
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

    const openPopup = (item) => {
        setVideoRecord(item);
        setVideoModalVisible(true);
    };

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            {
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
                            onAlertPress={() => props.onAlertPress()}
                            onLoading={isHomeworkLoading} />
                        :
                        isHWMarked ?
                            <PupilHomeWorkMarked
                                goBack={() => setHWMArked(false)}
                                item={hwData}
                                onAlertPress={() => props.onAlertPress()} />
                            :
                            isHWDetail ?
                                <PupilHomeWorkDetail
                                    goBack={() => setHWDetail(false)}
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
                                    <ScrollView>
                                        <View style={PAGESTYLE.containerWrap}>
                                            <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
                                                {item.RecordingList.length == 0 ?
                                                    // source={require('../../../../../assets/images/videoLarge2.png')} 
                                                    // <Image style={PAGESTYLE.largeVideo} />
                                                    null
                                                    :
                                                    <View style={PAGESTYLE.largeVideoBlock}>

                                                        <View style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: COLORS.blueBorder }}>
                                                            <Video source={{ uri: baseUrl + item.RecordingList[0].filename }}
                                                                resizeMode={'contain'}
                                                                style={PAGESTYLE.largeVideo1}
                                                                controls={true}
                                                                paused={isPaused} />
                                                            {isPaused ?
                                                                <TouchableOpacity
                                                                    activeOpacity={opacity}
                                                                    onPress={() => setPause(!isPaused)}>
                                                                    {/* <Image source={Images.PlayIcon} style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} /> */}
                                                                    <PlayBlue style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} height={30} width={30} />
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>

                                                    </View>
                                                }
                                                <View style={{ marginStart: 10 }}>
                                                    <View style={PAGESTYLE.videoTitleLine}>
                                                        <View>
                                                            <Text style={PAGESTYLE.videoMainTitle}>{item.LessonTopic}</Text>
                                                            <Text style={PAGESTYLE.videoPublishDate}>Published on {moment(item.LessonDate).format('ll')}</Text>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={opacity}
                                                            onPress={() => saveLesson(item.SaveLesson ? false : true)}>
                                                            <View style={PAGESTYLE.bookMark}>
                                                                {/* <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkOn} /> */}
                                                                {
                                                                    item.SaveLesson ?
                                                                        <BookMarkOn style={PAGESTYLE.bookMarkOn} height={hp(2.43)} width={hp(2.43)} /> :
                                                                        <BookMarkOff style={PAGESTYLE.bookMarkOn} height={hp(2.43)} width={hp(2.43)} />
                                                                }
                                                                <Text style={PAGESTYLE.saveBookMarkText}>{item.SaveLesson ? 'Saved!' : 'Save'}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={PAGESTYLE.userNameMain}>
                                                        <Image style={PAGESTYLE.userMainThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                                        <Text style={PAGESTYLE.mainNameText}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.lessonDesc}>
                                                        <Text style={PAGESTYLE.requireText}>Description</Text>
                                                        <Text style={PAGESTYLE.lessonText}>{item.LessonDescription}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={PAGESTYLE.rightSideBarLesson}>
                                                <View style={PAGESTYLE.fileBoxGrpWrap}>
                                                    <Text style={PAGESTYLE.requireText}>Learning material</Text>
                                                    {
                                                        item != undefined && item.MaterialList.length > 0 &&
                                                        item.MaterialList.map((obj, index) => {
                                                            return (
                                                                <TouchableOpacity onPress={() => {
                                                                    setLoader(true); setMateIndex(index); Download(obj, (res) => {
                                                                        setLoader(false)
                                                                        setMateIndex(-1)
                                                                    })
                                                                }} style={PAGESTYLE.fileGrp}>
                                                                    <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: hp(20) }]}>{obj.originalname}</Text>
                                                                    <View style={[PAGESTYLE.downloaBtn, { justifyContent: 'center' }]}>
                                                                        {(isMatLoading && index == mateIndex) ?
                                                                            <ActivityIndicator
                                                                                style={{ ...PAGESTYLE.downloadIcon }}
                                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                                color={COLORS.blueBorder} />
                                                                            :
                                                                            <DownloadSVG style={[PAGESTYLE.downloadIconTab]} height={hp(2.01)} width={hp(2.01)} />
                                                                        }
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })

                                                    }
                                                    {
                                                        item.ChannelList.length > 0 &&
                                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                            <View style={PAGESTYLE.thumbVideo}>
                                                                {
                                                                    item.ChannelList.map((items, index) => {
                                                                        return (
                                                                            <TouchableOpacity onPress={() => openPopup(items)}>
                                                                                <Image style={PAGESTYLE.smlThumbVideo} />
                                                                                <Text numberOfLines={1} style={PAGESTYLE.smlThumbVideoText}>
                                                                                    {items.Title}
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        </ScrollView>
                                                    }

                                                    {item.ChannelList.length == 0 && item.MaterialList.length == 0 && <Text style={{ alignSelf: 'center' }}>No material</Text>}


                                                </View>

                                                {/* <View style={PAGESTYLE.thumbVideo}>
                                                    <Image source={require('../../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />

                                                </View> */}
                                                <View style={PAGESTYLE.fileBoxGrpWrap}>
                                                    <Text style={PAGESTYLE.titleSpaceWorkspace}> Saved workspaces</Text>
                                                    <ScrollView style={{ height: '50%' }} showsVerticalScrollIndicator={false}>
                                                        {
                                                            item.WorkSpacelist.length > 0 ?
                                                                item.WorkSpacelist.map((obj, index) => {
                                                                    return (
                                                                        // props.navigation.navigate('WorkSpace',{id:item.LessonId, isWorkspace:false, item:obj.filename})
                                                                        <TouchableOpacity style={PAGESTYLE.fileGrp} onPress={() => { setTappedItem(index), setWorkSpaceEdit(false), setWorkSpace(true) }}>
                                                                            <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: hp(20) }]}>Workspace {index + 1}</Text>
                                                                            {/* <Image source={require('../../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} /> */}
                                                                        </TouchableOpacity>
                                                                    )
                                                                }) :
                                                                <Text style={{ alignSelf: 'center' }}>No Workspace</Text>
                                                        }
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
            }
            <TabVideoPopup
                isVisible={isVideoModalVisible}
                onClose={() => setVideoModalVisible(false)}
                item={videoRecord}
            />
        </View >
    );
}
export default PupilLessonDetailInternal;