import React, { useState, useEffect } from "react";
import { View, PAGESTYLEheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, Platform, BackHandler } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import Header6 from '../../../../component/reusable/header/bulck/Header6'
// import Images from "../../../../../utils/Images";
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HeaderWhitewithoutsearch from "../../../../component/reusable/header/bulck/HeaderWhitewithoutsearch";
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import moment from "moment";
import VideoPlayer from 'react-native-video-controls'
import { Download } from "../../../../../utils/Download";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { User } from "../../../../../utils/Model";
import { baseUrl, opacity, showMessage } from "../../../../../utils/Constant";
import MESSAGE from "../../../../../utils/Messages";
import VideoBanner from "../../../../../svg/pupil/lessonhwplanner/VideoBanner";
import Video from "react-native-video";
import WorkSpaceMore from "../../../../../svg/teacher/dashboard/More";
import DropDownArrow from "../../../../../svg/pupil/timetable/DropDown";
import DownloadIcon from "../../../../../svg/teacher/lessonhwplanner/Download";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import BookMarkOn from "../../../../../svg/pupil/lessonhwplanner/BookMark_On";
import BookMarkOff from "../../../../../svg/pupil/lessonhwplanner/BookMark_Off";
import VideoPopup from "../../../../component/reusable/popup/VideoPopup";
const PupilLessonDetailInternal = (props) => {
    const [activeSections, setActiveSections] = useState([])
    const [item, setItem] = useState(props.route.params.item)
    const [isHomeworkLoading, setHomeworkLoading] = useState(false)
    const [isPaused, setPause] = useState(true)
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)

    const [isVideoModalVisible, setVideoModalVisible] = useState(false);
    const [videoRecord, setVideoRecord] = useState({});

    console.log("item.MaterialList.length -=-=-=-=-->", item.ChannelList)
    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const openPopup = (item) => {
        setVideoRecord(item);
        setVideoModalVisible(true);
    };

    const handleBackButtonClick = () => {
        props.navigation.goBack()
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

    const getHomeWork = () => {
        setPause(true)
        setHomeworkLoading(true)
        Service.get(`${EndPoints.GetPupilHomework}/${item._id}/${User.user.UserDetialId}`, (res) => {
            setHomeworkLoading(false)
            if (res.code == 200) {
                console.log('response of get all homework', res)
                if (res.data._id) {
                    if (res.data.Submited) {
                        props.navigation.navigate('PupilHomeWorkSubmitted', { item: res.data })
                    } else if (res.data.Marked) {
                        props.navigation.navigate('PupilHomeWorkMarked', { item: res.data })
                    } else {
                        props.navigation.navigate('PupilHomeWorkDetail', { item: res.data, })
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

    const NEW = [
        {
            title: 'Description',
        },
        {
            title: 'Learning material',
        },
        {
            title: 'Saved workspaces',
        },
    ]
    const _renderHeader = section => {
        return (
            <View style={PAGESTYLE.header}>
                <Text style={PAGESTYLE.headerText}>{section.title}</Text>
                {/* <Image source={Images.DropArrow} style={PAGESTYLE.arrowAccordion} /> */}
                <DropDownArrow height={hp(0.9)} width={hp(1.43)} style={PAGESTYLE.arrowAccordion} />
            </View>
        );
    };
    const _renderContent = section => {

        return (
            activeSections.includes(0) ?
                <View style={PAGESTYLE.content}>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonText}>{item.LessonDescription}</Text>
                    </View>
                </View>
                :
                activeSections.includes(1) ?
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <View style={[PAGESTYLE.fileBoxGrpWrap]}>
                                {
                                    item.MaterialList.length > 0 &&
                                        item.MaterialList.map((obj, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    setLoader(true); setMateIndex(index); Download(obj, (res) => {
                                                        setLoader(false)
                                                        setMateIndex(-1)
                                                    })
                                                }} style={[PAGESTYLE.fileGrp, { alignItems: 'center' }]}>
                                                    <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: wp(75) }]}>{obj.originalname}</Text>
                                                    <View style={[PAGESTYLE.downloaBtn, { alignItems: 'center', justifyContent: 'center' }]}>
                                                        {(isMatLoading && index == mateIndex) ?
                                                            <ActivityIndicator
                                                                style={{ ...PAGESTYLE.downloadIcon }}
                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                color={COLORS.blueBorder} />
                                                            :
                                                            // <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                                            <DownloadIcon style={[PAGESTYLE.downloadIconPupil]} width={hp(1.90)} height={hp(1.89)} />
                                                        }
                                                        {/* <Image source={Images.Download} style={PAGESTYLE.downloadIcon} /> */}
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
                                                                {items.Description}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </ScrollView>
                                }
                                {
                                     item.ChannelList.length == 0 && item.MaterialList.length == 0 && <Text style={{ alignSelf: 'center', paddingVertical: 10, }}>No material</Text>
                                }
                            </View>
                        </View>
                    </View>
                    :
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            {
                                item != undefined && item.WorkSpacelist.length > 0 ?
                                    item.WorkSpacelist.map((obj, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={PAGESTYLE.fileGrp}
                                                onPress={() => props.navigation.navigate('WorkSpace', { id: item.LessonId, isWorkspace: false, item: item.WorkSpacelist, tappedItem: index })}>
                                                <Text style={PAGESTYLE.fileName}>Workspace {index + 1}</Text>
                                                <WorkSpaceMore width={hp(2.27)} height={hp(0.58)} style={PAGESTYLE.moreIcon} />
                                                {/* <Image source={require('../../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} /> */}
                                            </TouchableOpacity>
                                        )
                                    }) :
                                    <Text style={{ alignSelf: 'center', paddingVertical: 10, }}>No Workspace</Text>
                            }
                        </View>
                    </View>
        );
    };
    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
    };
    return (
        <View style={{ ...PAGESTYLE.mainPage, }}>
            <View style={PAGESTYLE.commonBg}>
                <Header6
                    title={` ${item.SubjectName}`}
                    date={moment(item.LessonDate).format('DD/MM/YYYY')}
                    goBack={() => props.navigation.goBack()}
                    onAlertPress={() => props.navigation.openDrawer()}
                    onOpenWorkSpacePress={() => props.navigation.navigate('WorkSpace', { onGoBack: () => refresh(), id: item.LessonId, isWorkspace: true })}
                    onSeeHomeworkPress={() => null} />
                <View style={{ height: '93%', paddingBottom: 30 }}>
                    {item.RecordingList.length == 0 ?
                        // <VideoBanner width={'100%'} height={hp(25.86)} style={PAGESTYLE.largeVideo} />
                        // <Image source={Images.videoBanner} style={PAGESTYLE.largeVideo} />
                        null
                        :
                        <View style={PAGESTYLE.largeVideoBlock}>

                            <View style={{ height: '100%', justifyContent: 'center' }}>
                                {/* <Video source={{ uri: baseUrl + item.RecordingList[0].filename }}
                                    // hideShutterView={true}
                                    playInBackground={false}
                                    resizeMode={'contain'}
                                    style={PAGESTYLE.largeVideo1}
                                    controls={true}
                                    paused={isPaused} /> */
                                }

                                <VideoPlayer
                                    source={{ uri: baseUrl + item.RecordingList[0].filename }}
                                    paused={isPaused}
                                    resizeMode={'contain'}
                                    style={PAGESTYLE.largeVideo1}
                                />
                                {isPaused ?
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => setPause(!isPaused)}>
                                        <PlayBlue style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} height={30} width={30} />
                                        {/* <Image source={Images.PlayIcon} style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }} /> */}
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </View>

                        </View>
                    }
                    <ScrollView style={{ top: 0, marginBottom: 5 }} showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.videoTitleLine}>
                            <View>
                                <Text style={PAGESTYLE.videoMainTitle}>{item.LessonTopic}</Text>
                                <Text style={PAGESTYLE.videoPublishDate}>Published on {moment(item.LessonDate).format('ll')}</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.bookmarkuserNameMain}>
                            <View style={[PAGESTYLE.userNameMain, { alignItems: 'center' }]}>
                                <Image style={PAGESTYLE.userMainThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                <Text style={[PAGESTYLE.mainNameText, { textAlign: 'center' }]}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={opacity}
                                onPress={() => saveLesson(item.SaveLesson ? false : true)}>
                                <View style={PAGESTYLE.bookMark}>
                                    <Text style={PAGESTYLE.saveBookMarkText}>{item.SaveLesson ? 'Saved!' : 'Save'}</Text>
                                    {/* <Image source={item.SaveLesson ? Images.BookmarkIcon : Images.BookmarkIconOff} style={PAGESTYLE.bookMarkOn} /> */}
                                    {
                                        item.SaveLesson ?
                                            <BookMarkOn style={PAGESTYLE.bookMarkOn} height={hp(2.12)} width={hp(1.81)} />
                                            : <BookMarkOff style={PAGESTYLE.bookMarkOn} height={hp(2.12)} width={hp(1.81)} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: hp(12) }}>
                            <Accordion
                                activeSections={activeSections}
                                sections={NEW}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                                underlayColor={COLORS.white}
                                style={PAGESTYLE.accordion}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={PAGESTYLE.lessonstartButtonPupil}>
                    <TouchableOpacity
                        style={{ width: '50%', }}
                        activeOpacity={opacity}
                        onPress={() => props.navigation.navigate('WorkSpace', { onGoBack: () => refresh(), id: item.LessonId, isWorkspace: true })}>
                        <Text style={{ ...PAGESTYLE.fixedButton, marginRight: 10 }}>open workspace</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...PAGESTYLE.fixedButtonHomework }}
                        activeOpacity={opacity}
                        onPress={() => getHomeWork()}>
                        {isHomeworkLoading ?
                            <ActivityIndicator
                                // style={{ ...PAGESTYLE.fixedButton, backgroundColor: COLORS.dashboardGreenButton, width: '50%', marginLeft: 10 }}
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.white} />
                            :


                            <Text style={{ ...PAGESTYLE.homeworkText }} >see homework</Text>
                        }
                    </TouchableOpacity>

                </View>
            </View>
            <VideoPopup
                isVisible={isVideoModalVisible}
                onClose={() => setVideoModalVisible(false)}
                item={videoRecord}
            />
        </View>
    );
}
export default PupilLessonDetailInternal;