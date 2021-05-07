import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebarpupil from "../../../component/reusable/sidebar/Sidebarpupil";
import Header from "../../../component/reusable/header/Header";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useImperativeHandle } from "react/cjs/react.development";
import { baseUrl, opacity, showMessage, Var } from "../../../utils/Constant";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
const PupuilDashboard = (props) => {
    const refRBSheet = useRef();
    const refRBSheetTwo = useRef();
    const [isHide, action] = useState(true);
    // const [selectedId, setSelectedId] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [dashData, setdashData] = useState([])

    const [dataOfSubView, setDataOfSubView] = useState([])
    const [dataOfHWSubView, setDataOfHomeworkSubView] = useState([])
    const [myClass, setMyClass] = useState([])
    const [HomeworkList, setPupilHomeworkList] = useState([])
    const [isMyDayLoading, setMyDayLoading] = useState(true)
    const [isHomeworkLoading, setHomeworkLoading] = useState(true)

    useEffect(() => {
        Service.get(`${EndPoints.GetListOfPupilMyDay}/${User.user.UserDetialId}`, (res) => {
            console.log('response of my day', res)
            if (res.flag === true) {
                setMyClass(res.data)
                setDataOfSubView(res.data[0])
                setMyDayLoading(false)
            } else {
                showMessage(res.message)
                setMyDayLoading(false)
            }
        }, (err) => {
        })

        Service.get(`${EndPoints.GetHomeworkListByPupil}/${User.user.UserDetialId}`, (res) => {
            console.log('response of pupil homework list', res)
            if (res.flag === true) {
                setPupilHomeworkList(res.data)
                setDataOfHomeworkSubView(res.data[0])
                setHomeworkLoading(false)
            } else {
                showMessage(res.message)
                setHomeworkLoading(false)
            }
        }, (err) => {
        })
    }, [])
    const renderItem = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <Item
                item={item}
                onPress={() => setData(index)}
                style={{ backgroundColor }}
            />
        );
    };

    const renderItemHomework = ({ item, index }) => {
        const backgroundColor = index === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <HomeWorkItem
                item={item}
                onPress={() => setDataHomework(index)}
                style={{ backgroundColor }}
            />
        );
    };
    const setDataHomework = (index) => {
        setSelectedId(index)
        setDataOfHomeworkSubView(HomeworkList[index])
    }
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(myClass[index])
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={() => { onPress(); refRBSheet.current.open() }} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text style={PAGESTYLE.subjectName}>{item.SubjectName}</Text>
                        <Text style={PAGESTYLE.subject}>{item.LessonTopic ? item.LessonTopic : ""}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
            </View>
            <TouchableOpacity style={PAGESTYLE.topListingArrow}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>

        </TouchableOpacity>
    );
    const HomeWorkItem = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={() => { onPress(); refRBSheetTwo.current.open() }} style={[PAGESTYLE.item, style]}>
            <View style={PAGESTYLE.classSubject}>
                <View style={PAGESTYLE.subjecRow}>
                    <View style={PAGESTYLE.border}></View>
                    <View style={PAGESTYLE.subjectMain}>
                        <Text style={PAGESTYLE.subjectName}>{item.SubjectName}</Text>
                        <Text style={PAGESTYLE.subject}>{item.LessonTopic}</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.timingMain}>
                    <Text style={PAGESTYLE.groupName}>{item.GroupName}</Text>
                    <Text style={PAGESTYLE.timing}>{item.StartTime} - {item.EndTime}</Text>
                </View>
            </View>
            <TouchableOpacity style={PAGESTYLE.topListingArrow}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>

        </TouchableOpacity>
    );
    return (
        <View style={PAGESTYLE.mainPage} >
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={0}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <Header onAlertPress={() => { props.navigation.openDrawer() }} STYLE={STYLE.pupilHeader} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={STYLE.padLeftRight}>
                        <View style={PAGESTYLE.dashboardOrangeBox}>
                            <View style={PAGESTYLE.orangeBoxTop}>
                                <View style={PAGESTYLE.myDay}>
                                    <View>
                                        <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                                    </View>
                                    <View style={[PAGESTYLE.rightContent]}>
                                        <Image source={Images.PupilDashTopBg} style={PAGESTYLE.pupilGridTopBg} />
                                        <ImageBackground source={Images.CalenderBg} style={[PAGESTYLE.datePositionBg]}>
                                            <Text style={PAGESTYLE.date}>Today</Text>
                                            <Text style={PAGESTYLE.month}>25 Sept</Text>
                                        </ImageBackground>
                                        <View>
                                            <TouchableOpacity>
                                                <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.orangeBoxBottom}>
                                <View style={PAGESTYLE.whiteBoard}>
                                    {isMyDayLoading ?
                                        <ActivityIndicator
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.yellowDark} />
                                        :
                                        <View>
                                            {
                                                myClass.length > 0 ?
                                                    <>
                                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                                data={myClass}
                                                                renderItem={renderItem}
                                                                keyExtractor={(item) => item.id}
                                                                extraData={selectedId}
                                                            />
                                                        </SafeAreaView>
                                                        <RBSheet
                                                            ref={refRBSheet}
                                                            closeOnDragDown={true}
                                                            height={[hp(85)]}
                                                            style={{ position: 'relative', }}
                                                            closeOnPressMask={true}
                                                            customStyles={{
                                                                wrapper: {
                                                                    backgroundColor: COLORS.bottomSlideUpBack
                                                                },
                                                                draggableIcon: {
                                                                    backgroundColor: COLORS.darkGray
                                                                }
                                                            }}
                                                        >
                                                            <View style={PAGESTYLE.rightTabContent}>
                                                                {/* <View style={PAGESTYLE.arrowSelectedTab}></View> */}
                                                                <View style={PAGESTYLE.tabcontent}>
                                                                    <Text h2 style={PAGESTYLE.titleTab}>{dataOfSubView.SubjectName}</Text>
                                                                    <Text h3 style={PAGESTYLE.subTitleTab}>{dataOfSubView.LessonTopic}</Text>
                                                                    <View style={PAGESTYLE.yellowHrTag}></View>
                                                                    <View style={PAGESTYLE.timedateGrp}>
                                                                        <View style={PAGESTYLE.dateWhiteBoard}>
                                                                            <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                                                            <Text style={PAGESTYLE.datetimeText}>{moment(dataOfSubView.Date).format('ll')}</Text>
                                                                        </View>
                                                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                                                            <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                                                                            <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.StartTime} - {dataOfSubView.EndTime}</Text>
                                                                        </View>
                                                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                            <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                                                                            <Text style={PAGESTYLE.datetimeText}>{dataOfSubView.GroupName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={STYLE.hrCommon}></View>
                                                                    <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                                                                        <View style={PAGESTYLE.mediaMain}>
                                                                            <FlatList
                                                                                data={dataOfSubView.PupilList}
                                                                                style={{ width: '100%' }}
                                                                                renderItem={({ item, index }) => (
                                                                                    <TouchableOpacity style={PAGESTYLE.mediabarTouch}>
                                                                                        <Image style={PAGESTYLE.mediabar} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                                                                                    </TouchableOpacity>
                                                                                )}
                                                                                horizontal
                                                                                keyExtractor={(item, index) => index.toString()}
                                                                            />
                                                                        </View>
                                                                        <Text style={PAGESTYLE.lessondesciption}>{dataOfSubView.LessonDescription}</Text>
                                                                        <View style={PAGESTYLE.attchmentSectionwithLink}>
                                                                            <TouchableOpacity style={PAGESTYLE.attachment}>
                                                                                <Image style={PAGESTYLE.attachmentIcon} source={Images.AttachmentIcon} />
                                                                                <Text style={PAGESTYLE.attachmentText}>{dataOfSubView.MaterialList.length} Attachment(s)</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity>
                                                                                <Text style={PAGESTYLE.linkText}>see more</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={PAGESTYLE.requirementofClass}>
                                                                            <Text style={PAGESTYLE.requireText}>What you will need</Text>
                                                                            <FlatList
                                                                                data={dataOfSubView.CheckList}
                                                                                style={{ width: '100%' }}
                                                                                renderItem={({ item, index }) => (
                                                                                    <View style={PAGESTYLE.lessonPoints}>
                                                                                        <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                                                                        <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                    </View>
                                                                                )}
                                                                                numColumns={4}
                                                                                keyExtractor={(item, index) => index.toString()}
                                                                            />
                                                                        </View>
                                                                    </ScrollView>
                                                                    <View style={PAGESTYLE.lessonstartButton}>
                                                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Mark As Absent</Text></TouchableOpacity>
                                                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Join Class</Text></TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </RBSheet>
                                                    </>
                                                    :
                                                    <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                                        <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                    </View>
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={PAGESTYLE.dashboardPurpleBox}>
                            <View STYLE={PAGESTYLE.pupilHomeWorkGridTopBgHold}>
                                <Image source={Images.PupilHomeworkTableTopBg} style={PAGESTYLE.pupilHomeWorkGridTopBg} />
                            </View>
                            <View style={PAGESTYLE.purpleBoxTop}>
                                <View style={PAGESTYLE.myDayPurple}>
                                    <View>
                                        <Text H3 style={PAGESTYLE.dayTitle}>My Homework</Text>
                                    </View>
                                    <View style={[PAGESTYLE.rightContent]}>
                                        <Image source={Images.HomeworkBook} style={[PAGESTYLE.bookPositionBg]} />
                                        <View>
                                            <TouchableOpacity>
                                                <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.orangeBoxBottom}>
                                <View style={PAGESTYLE.whiteBoard}>
                                    {isHomeworkLoading ?
                                        <ActivityIndicator
                                            size={Platform.OS == 'ios' ? 'large' : 'small'}
                                            color={COLORS.yellowDark} />
                                        :
                                        <View>
                                            {
                                                HomeworkList.length > 0 ?
                                                    <>
                                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                                data={HomeworkList}
                                                                renderItem={renderItemHomework}
                                                                keyExtractor={(item) => item.id}
                                                                extraData={selectedId}
                                                            />
                                                        </SafeAreaView>
                                                        <RBSheet
                                                            ref={refRBSheetTwo}
                                                            closeOnDragDown={true}
                                                            height={[hp(85)]}
                                                            style={{ position: 'relative', }}
                                                            closeOnPressMask={true}
                                                            customStyles={{
                                                                wrapper: {
                                                                    backgroundColor: COLORS.bottomSlideUpBack
                                                                },
                                                                draggableIcon: {
                                                                    backgroundColor: COLORS.darkGray
                                                                }
                                                            }}
                                                        >
                                                            <View style={PAGESTYLE.rightTabContent}>
                                                                <View style={PAGESTYLE.arrowSelectedTab}></View>
                                                                <View style={PAGESTYLE.tabcontent}>
                                                                    <Text h2 style={[PAGESTYLE.titleTab, PAGESTYLE.titleTabSecond]}>{dataOfHWSubView.LessonTopic}</Text>
                                                                    <View style={PAGESTYLE.timedateGrp}>
                                                                        <View style={PAGESTYLE.dateWhiteBoard}>
                                                                            <Image style={PAGESTYLE.calIcon} source={Images.DueToday} />
                                                                            <Text style={PAGESTYLE.datetimeText}>{moment(dataOfHWSubView.lessonDate).format('ll')}</Text>
                                                                        </View>
                                                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                                            <Image style={PAGESTYLE.calIcon} source={Images.SubIcon} />
                                                                            <Text style={PAGESTYLE.datetimeText}>{dataOfHWSubView.SubjectName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={STYLE.hrCommon}></View>
                                                                    <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                                                                        <Text style={[PAGESTYLE.lessondesciption, PAGESTYLE.lessondesciptionSecond]}>{dataOfHWSubView.HomeworkDescription}</Text>
                                                                        <View style={STYLE.hrCommon}></View>
                                                                        <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.requirementofClassSecond]}>
                                                                            <TouchableOpacity><Text style={PAGESTYLE.requireText}>Make sure you:</Text></TouchableOpacity>
                                                                            <FlatList
                                                                                data={dataOfHWSubView.CheckList}
                                                                                style={{ width: '100%' }}
                                                                                renderItem={({ item, index }) => (
                                                                                    <View style={[PAGESTYLE.lessonPoints, PAGESTYLE.lessonPointsBorder]}>
                                                                                        <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} />
                                                                                        <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                                                                    </View>
                                                                                )}
                                                                                keyExtractor={(item, index) => index.toString()}
                                                                            />
                                                                        </View>
                                                                    </ScrollView>
                                                                    <View style={PAGESTYLE.lessonstartButton}>
                                                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonBordered, PAGESTYLE.pupilSecondButton]}>tertiary cta</Text></TouchableOpacity>
                                                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.pupilSecondButton]}>See Homework</Text></TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </RBSheet>
                                                    </> :
                                                    <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
                                                        <Text style={{ alignItems: 'center', width: '100%', fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                                                    </View>
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.achivementWrap}>
                            <View style={PAGESTYLE.achivementBox}>
                                <Image source={Images.RewardStar} style={PAGESTYLE.rewardStar} />
                                <Text style={PAGESTYLE.starCovert}>Your stars convert to</Text>
                                <Text style={PAGESTYLE.starCovertPoints}>60 points</Text>
                                <View style={PAGESTYLE.rewardStarMark}>
                                    <View style={PAGESTYLE.centerText}>
                                        <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}>
                                            <Text style={PAGESTYLE.starSelectedText}>18</Text>
                                        </ImageBackground>
                                        <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                    </View>
                                    <View style={PAGESTYLE.centerStar}>
                                        <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}>
                                            <Text style={PAGESTYLE.starSelectedText}>15</Text>
                                        </ImageBackground>
                                        <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                    </View>
                                    <View style={PAGESTYLE.centerText}>
                                        <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}>
                                            <Text style={PAGESTYLE.starSelectedText}>5</Text>
                                        </ImageBackground>
                                        <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.lessonstartButtonBottom}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonBordered, PAGESTYLE.pupilSecondBottomButton]}>tertiary cta</Text></TouchableOpacity>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.pupilSecondBottomButton]}>View avatar</Text></TouchableOpacity>
                                </View>
                            </View>
                            <View style={PAGESTYLE.achivementRobot}>
                                <Image source={Images.Robot} style={PAGESTYLE.cartoon} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupuilDashboard;