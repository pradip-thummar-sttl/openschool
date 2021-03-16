import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { showMessage } from "../../../utils/Constant";
import { connect, useSelector } from "react-redux";

const Item = ({ onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[PAGESTYLE.item, style]}>
        <View style={PAGESTYLE.classSubject}>
            <View style={PAGESTYLE.subjecRow}>
                <View style={PAGESTYLE.border}></View>
                <View>
                    <Text style={PAGESTYLE.subjectName}>English</Text>
                    <Text style={PAGESTYLE.subject}>Grammar</Text>
                </View>
            </View>
            <View style={PAGESTYLE.timingMain}>
                <Text style={PAGESTYLE.groupName}>Grouap A1</Text>
                <Text style={PAGESTYLE.timing}>09:00 - 09:30</Text>
            </View>
        </View>
    </TouchableOpacity>
);
const Pupillist = ({ style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.pupilProfile}>
            <View style={PAGESTYLE.pupilImage}></View>
            <Text style={PAGESTYLE.pupilName}>Janice Williamson</Text>
        </View>
        <View style={PAGESTYLE.groupColumnmain}>
            <View style={PAGESTYLE.groupColumn}>
                <Text style={PAGESTYLE.pupilgroupName}>1A</Text>
            </View>
        </View>
        <View style={PAGESTYLE.perfomanceColumn}>
            <View style={PAGESTYLE.perfomanceDotmain}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.purpleDot]}></View></View>
            <View style={PAGESTYLE.perfomanceDotmainTwo}><View style={[PAGESTYLE.perfomanceDots, PAGESTYLE.yellowDot]}></View></View>
        </View>
        <View style={PAGESTYLE.rewardColumn}>
            <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
        </View>
        <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
        </TouchableOpacity>
    </View>
);
const LessonandHomeworkPlannerDashboard = (props) => {
    const userAuthData = useSelector(state => {
        // console.log('state of user',state)
        return state.AuthReducer.userAuthData
    })
    console.log('userdata', userAuthData)
    useEffect(() => {
        console.log('hello')
        Service.get(`${EndPoints.GetLessionById}/6041cf525ff1ce52e5d4d398`, (res) => {
            if (res.code == 200) {
                console.log('response of get all lesson', res)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)

        })
        return () => {
        }
    }, [])
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
            />
        );
    };
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? COLORS.selectedDashboard : COLORS.white;

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };
    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <Header />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.dashBoardBoxes}>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.greenBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Start a new {"\n"}call</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={Images.DashboardCallIcon}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.yellowBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New lesson</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={Images.LessonIcon}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.purpleBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New calendar {"\n"}entry</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={Images.ImageIcon}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.blueBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Add new pupil {"\n"}group</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={Images.PupilGrpIcon}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.myDay}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={Images.Myday} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View style={[PAGESTYLE.datePosition]}>
                                <Text style={PAGESTYLE.date}>25</Text>
                                <Text style={PAGESTYLE.month}>Sept</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.whiteBoard}>
                        <View style={STYLE.viewRow}>
                            <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                />
                            </SafeAreaView>
                            <View style={PAGESTYLE.rightTabContent}>
                                <View style={PAGESTYLE.arrowSelectedTab}></View>
                                <View style={PAGESTYLE.tabcontent}>
                                    <Text h2 style={PAGESTYLE.titleTab}>Cartoon Drawings</Text>
                                    <View style={PAGESTYLE.timedateGrp}>
                                        <View style={PAGESTYLE.dateWhiteBoard}>
                                            <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                            <Text style={PAGESTYLE.datetimeText}>14/09/2020</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                            <Image style={PAGESTYLE.timeIcon} source={Images.Clock} />
                                            <Text style={PAGESTYLE.datetimeText}>09:00 - 09:30</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                            <Image style={PAGESTYLE.calIcon} source={Images.Group} />
                                            <Text style={PAGESTYLE.datetimeText}>Group 2A</Text>
                                        </View>
                                    </View>
                                    <View style={STYLE.hrCommon}></View>
                                    <View style={PAGESTYLE.mediaMain}>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.mediabar}></View></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.mediabarTouch}><View style={PAGESTYLE.moreMedia}><Text style={PAGESTYLE.moreMediaText}>2+</Text></View></TouchableOpacity>
                                    </View>
                                    <Text style={PAGESTYLE.lessondesciption}>This fun lesson will be focused on drawing a cartoon character. We will work together to sharpen your drawing skills, encourage creative thinking and have fun with colours.</Text>
                                    <View style={PAGESTYLE.attchmentSectionwithLink}>
                                        <TouchableOpacity style={PAGESTYLE.attachment}>
                                            <Image style={PAGESTYLE.attachmentIcon} source={Images.AttachmentIcon} />
                                            <Text style={PAGESTYLE.attachmentText}>1 Attachment</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={PAGESTYLE.linkText}>see more</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <Text style={PAGESTYLE.requireText}>Items that your class will need</Text>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                            <Text style={PAGESTYLE.lessonPointText}>Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens.</Text>
                                        </View>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                            <Text style={PAGESTYLE.lessonPointText}>Drawing work sheet.</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.lessonstartButton}>
                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBordered}>Edit Lesson</Text></TouchableOpacity>
                                        <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Start Class</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[PAGESTYLE.myDay, PAGESTYLE.pupilBoard]}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={Images.PupilDashIcon} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Pupils</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={Images.MoreLinks} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[PAGESTYLE.whiteBoard, PAGESTYLE.pupilDashboard]}>
                        <View style={PAGESTYLE.pupilTable}>
                            <View style={PAGESTYLE.pupilTableHeadingMain}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Name</Text>
                                <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Total students</Text>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil2]}>
                                <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Group</Text>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil3]}>
                                <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Performance</Text>
                                <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Enagagement</Text>
                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitle}>Effort</Text>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.tabpupil4]}>
                                <Text style={[PAGESTYLE.pupilTableHeadingMainTitle, STYLE.centerText]}>Quick Reward</Text>
                                <View style={PAGESTYLE.pupilTableHeadingsubMain}>
                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Bronze</Text>
                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Silver</Text>
                                    <Text style={PAGESTYLE.pupilTableHeadingMainsubTitlestar}>Gold</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[STYLE.hrCommon, PAGESTYLE.pupilhrCustomMargin]}></View>
                        <View style={PAGESTYLE.pupilTabledata}>
                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={pupilRender}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default LessonandHomeworkPlannerDashboard;