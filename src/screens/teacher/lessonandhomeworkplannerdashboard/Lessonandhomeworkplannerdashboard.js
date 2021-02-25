import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import Header from "../../../component/reusable/header/Header";

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
            <View style={PAGESTYLE.rewardStar}><Image source={require('../../../assets/images/bronze-star2.png')} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={require('../../../assets/images/silver-star2.png')} style={PAGESTYLE.rewardStartIcon} /></View>
            <View style={PAGESTYLE.rewardStar}><Image source={require('../../../assets/images/gold-star2.png')} style={PAGESTYLE.rewardStartIcon} /></View>
        </View>
        <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
            <Image style={PAGESTYLE.pupilDetaillinkIcon} source={require('../../../assets/images/right-arrow2.png')} />
        </TouchableOpacity>
    </View>
);
const LessonandHomeworkPlannerDashboard = (props) => {
    const [isHide, action] = useState(true);
    const [animationValue, setAnimationValue] = useState('93%');
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
            <Sidebar hide={() => action(!isHide)} />
            <View style={{width: animationValue}}>
                <Header />
                <ScrollView style={STYLE.padLeftRight}>
                    <View style={PAGESTYLE.dashBoardBoxes}>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.greenBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Start a new {"\n"}call</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/callDashboard2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.yellowBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New lesson</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/lessonIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.purpleBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>New calendar {"\n"}entry</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/calenderIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={PAGESTYLE.boxDash}>
                            <View style={[PAGESTYLE.boxInnerMain, PAGESTYLE.blueBox]}>
                                <Text H3 style={PAGESTYLE.titleBox}>Add new pupil {"\n"}group</Text>
                                <ImageBackground style={PAGESTYLE.imageIcon} source={require('../../../assets/images/pupilgrpIcon2.png')}></ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.myDay}>
                        <View style={[STYLE.viewRow]}>
                            <Image style={PAGESTYLE.dayIcon} source={require('../../../assets/images/myDay3.png')} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Classes</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View style={[PAGESTYLE.datePosition]}>
                                <Text style={PAGESTYLE.date}>25</Text>
                                <Text style={PAGESTYLE.month}>Sept</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={require('../../../assets/images/dashBoardMorelink2.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.whiteBoard}>
                        <View style={STYLE.viewRow}>
                            <SafeAreaView style={PAGESTYLE.leftTabbing}>
                                <FlatList
                                    data={[1]}
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
                                            <Image style={PAGESTYLE.calIcon} source={require('../../../assets/images/calendar-small-icon2.png')} />
                                            <Text style={PAGESTYLE.datetimeText}>14/09/2020</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                                            <Image style={PAGESTYLE.timeIcon} source={require('../../../assets/images/clock2.png')} />
                                            <Text style={PAGESTYLE.datetimeText}>09:00 - 09:30</Text>
                                        </View>
                                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                                            <Image style={PAGESTYLE.calIcon} source={require('../../../assets/images/group2.png')} />
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
                                            <Image style={PAGESTYLE.attachmentIcon} source={require('../../../assets/images/attachment2.png')} />
                                            <Text style={PAGESTYLE.attachmentText}>1 Attachment</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={PAGESTYLE.linkText}>see more</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <Text style={PAGESTYLE.requireText}>Items that your class will need</Text>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={require('../../../assets/images/check-icon2.png')} style={PAGESTYLE.checkIcon} />
                                            <Text style={PAGESTYLE.lessonPointText}>Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens.</Text>
                                        </View>
                                        <View style={PAGESTYLE.lessonPoints}>
                                            <Image source={require('../../../assets/images/check-icon2.png')} style={PAGESTYLE.checkIcon} />
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
                            <Image style={PAGESTYLE.dayIcon} source={require('../../../assets/images/pupilIcon2.png')} />
                            <Text H3 style={PAGESTYLE.dayTitle}>My Pupils</Text>
                        </View>
                        <View style={[PAGESTYLE.rightContent]}>
                            <View>
                                <TouchableOpacity>
                                    <Image style={PAGESTYLE.moreDashboard} source={require('../../../assets/images/dashBoardMorelink2.png')} />
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
                        <View style={[STYLE.hrCommon,PAGESTYLE.pupilhrCustomMargin]}></View>
                        <View style={PAGESTYLE.pupilTabledata}>
                            <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                                <FlatList
                                    data={[1]}
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