import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, SafeAreaView, FlatList } from "react-native";
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
import { Var } from "../../../utils/Constant";

const PupuilDashboard = (props) => {
    const [isHide, action] = useState(true);
    // const [selectedId, setSelectedId] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [dashData, setdashData] = useState([])

    const [dataOfSubView, setDataOfSubView] = useState([])
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
    const setData = (index) => {
        setSelectedId(index)
        setDataOfSubView(dashData[index])
    }
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
            <View style={PAGESTYLE.arrowSelectedTab}></View>

        </TouchableOpacity>
    );
    return (
        <View style={PAGESTYLE.mainPage} >
            <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={0}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} />
            <View style={{ width: isHide ? '93%' : '78%' }}>

                <ScrollView>
                    <Header onAlertPress={() => { props.navigation.openDrawer() }} STYLE={STYLE.pupilHeader} />
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
                                            <Text style={PAGESTYLE.date}>25</Text>
                                            <Text style={PAGESTYLE.month}>Sept</Text>
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
                                    <View style={STYLE.viewRow}>
                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                            <FlatList
                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                data={[1, 2, 3, 4, 5]}
                                                renderItem={renderItem}
                                                keyExtractor={(item) => item.id}
                                                extraData={selectedId}
                                            />
                                        </SafeAreaView>
                                        <View style={PAGESTYLE.rightTabContent}>
                                            {/* <View style={PAGESTYLE.arrowSelectedTab}></View> */}
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
                                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Mark As Absent</Text></TouchableOpacity>
                                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>Join Class</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
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
                                    <View style={STYLE.viewRow}>
                                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                            <FlatList
                                                style={PAGESTYLE.ScrollViewFlatlist}
                                                data={[1, 2, 3, 4, 5]}
                                                renderItem={renderItem}
                                                keyExtractor={(item) => item.id}
                                                extraData={selectedId}
                                            />
                                        </SafeAreaView>
                                        <View style={PAGESTYLE.rightTabContent}>
                                            <View style={PAGESTYLE.arrowSelectedTab}></View>
                                            <View style={PAGESTYLE.tabcontent}>
                                                <Text h2 style={PAGESTYLE.titleTab}>Grammar</Text>
                                                <View style={PAGESTYLE.timedateGrp}>
                                                    <View style={PAGESTYLE.dateWhiteBoard}>
                                                        <Image style={PAGESTYLE.calIcon} source={Images.DueToday} />
                                                        <Text style={PAGESTYLE.datetimeText}>Today</Text>
                                                    </View>
                                                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                                        <Image style={PAGESTYLE.calIcon} source={Images.SubIcon} />
                                                        <Text style={PAGESTYLE.datetimeText}>English Subject</Text>
                                                    </View>
                                                </View>
                                                <View style={STYLE.hrCommon}></View>
                                                <Text style={PAGESTYLE.lessondesciption}>Write a short story from your imagination. You can use the help sheet to plan your story. Your story should be one page long and can be about anything you choose. Make sure correct grammar is used as explained in the lesson.</Text>
                                                <View style={PAGESTYLE.requirementofClass}>
                                                    <Text style={PAGESTYLE.requireText}>Make sure you:</Text>
                                                    <View style={[PAGESTYLE.lessonPoints, PAGESTYLE.lessonPointsBorder]}>
                                                        <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} />
                                                        <Text style={PAGESTYLE.lessonPointText}>Watch The BBC Bitesize Video.</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.lessonPoints}>
                                                        <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} />
                                                        <Text style={PAGESTYLE.lessonPointText}>Write a list of all the everyday items that come from the Amazon Rainforest.</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.lessonPoints}>
                                                        <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} />
                                                        <Text style={PAGESTYLE.lessonPointText}>Write a short story about where those items come from in the the forest and what they mean to you.</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.lessonPoints}>
                                                        <Image source={Images.CheckedSqure} style={PAGESTYLE.checkIconSquare} />
                                                        <Text style={PAGESTYLE.lessonPointText}>Take a photo of your work and upload here.</Text>
                                                    </View>
                                                </View>
                                                <View style={PAGESTYLE.lessonstartButton}>
                                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBordered}>tertiary cta</Text></TouchableOpacity>
                                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>See Homework</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
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
                                <View style={PAGESTYLE.lessonstartButton}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBordered}>tertiary cta</Text></TouchableOpacity>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonGreenDashboardSide}>edit avatar</Text></TouchableOpacity>
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