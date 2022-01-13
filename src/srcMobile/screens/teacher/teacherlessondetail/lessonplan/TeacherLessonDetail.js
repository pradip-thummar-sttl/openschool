import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
// import Images from '../../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import moment from 'moment';
import { Download } from "../../../../../utils/Download";
import { baseUrl, opacity } from "../../../../../utils/Constant";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../../svg/teacher/dashboard/Clock";
import Participants from "../../../../../svg/teacher/dashboard/Participants";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import DownloadSVG from "../../../../../svg/teacher/lessonhwplanner/Download";

const TLDetail = (props) => {
    console.log('props', props);
    const [isMatLoading, setLoader] = useState(false)
    const [isRecordLoading, setRecordLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)
    const [recordIndex, setRecordIndex] = useState(-1)

    return (
        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>
                    <View style={PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Subject</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>{props.lessonData.SubjectName}</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>{props.lessonData.LessonTopic} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Date</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <View style={PAGESTYLE.alignRow}>
                                    <Calender style={PAGESTYLE.calIconNoInput} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.datetimeText}>{moment(props.lessonData.Date).format('DD/MM/yyyy')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Time</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <View style={PAGESTYLE.alignRow}>
                                    <Clock style={PAGESTYLE.timeIconNoInput} height={hp(1.76)} width={hp(1.76)} />
                                    <Text style={PAGESTYLE.datetimeText}>{props.lessonData.StartTime} - {props.lessonData.EndTime}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                        <Text style={PAGESTYLE.subjectText}>Participants</Text>
                        <View style={PAGESTYLE.subjectDateTime}>
                            <View style={PAGESTYLE.alignRow}>
                                <Participants style={PAGESTYLE.calIconNoInput} height={hp(1.76)} width={hp(1.76)} />
                                <Text numberOfLines={1} style={[PAGESTYLE.datetimeText, { width: wp(50) }]}>{props.lessonData.GroupName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.lessonDesc, PAGESTYLE.spaceTop}>
                        <Text style={PAGESTYLE.lessonTitleWithoutTextArea}>Lesson Description</Text>
                        <Text style={PAGESTYLE.lessonText}>{props.lessonData.LessonDescription}</Text>
                    </View>
                    <View style={PAGESTYLE.requirementofClass}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Items your class may need</Text>
                        <FlatList
                            data={props.lessonData.CheckList}
                            style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                            renderItem={({ item, index }) => (
                                <View style={[PAGESTYLE.checkBoxLabelLine,{paddingVertical  :5}]}>
                                    <TickMarkBlue style={PAGESTYLE.checkIcon} height={hp(1.7)} width={hp(1.7)} />
                                    <Text numberOfLines={1} style={[PAGESTYLE.lessonPointText, { width: wp(82) }]}>{item.ItemName}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={PAGESTYLE.checkBoxGrpWrap}>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Individual pupils</Text>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <View style={PAGESTYLE.checkBoxGrp}>
                                <FlatList
                                    data={props.lessonData.Allpupillist}
                                    style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                    renderItem={({ item, index }) => (
                                        <View style={PAGESTYLE.checkBoxLabelNone}>
                                            <Image source={{ uri: baseUrl + item.ProfilePicture }} style={PAGESTYLE.userIconPupil} />
                                            <Text style={PAGESTYLE.checkBoxLabelTextNone}>{item.PupilName}</Text>
                                        </View>
                                    )}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Will this lesson be delivered live</Text>
                            <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={props.lessonData.LiveSession} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Publish lesson before live lesson</Text>
                            <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={props.lessonData.Publish} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                            <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={props.lessonData.IsVotingEnabled} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                    </View>
                </View>
                <View style={PAGESTYLE.rightSideBar}>
                    {props.lessonData.MaterialList.length > 0 &&
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            <Text style={PAGESTYLE.requireText}>Learning material</Text>
                            <FlatList
                                data={props.lessonData.MaterialList}
                                style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => {setLoader(true); setMateIndex(index); Download(item, (res) => {
                                        setLoader(false)
                                        setMateIndex(-1)
                                    })}} style={PAGESTYLE.fileGrp}>
                                        <Text numberOfLines={1} style={[PAGESTYLE.fileName, { width: wp(70) }]}>{item.originalname}</Text>
                                        <View style={PAGESTYLE.downloaBtn}>
                                            {(isMatLoading && index == mateIndex)?
                                                <ActivityIndicator
                                                    style={{ ...PAGESTYLE.downloadIcon }}
                                                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                    color={COLORS.blueBorder} />
                                                :
                                                <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }

                    {props.lessonData.RecordingList.length > 0 &&
                        <View style={[PAGESTYLE.videoLinkBlockSpaceBottom, PAGESTYLE.videoLinkBlockSpaceTop]}>
                            <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                            <TouchableOpacity
                                style={[PAGESTYLE.videoLinkBlock]}
                                activeOpacity={opacity}
                                onPress={() => {setRecordLoader(true); Download(props.lessonData.RecordingList[0], (res) => {
                                    setRecordLoader(false)
                                })}}>
                                {isRecordLoading ?
                                    <ActivityIndicator
                                        style={{ ...PAGESTYLE.videoLinkIcon }}
                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                        color={COLORS.blueBorder} />
                                    :
                                    <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                                }
                                <Text numberOfLines={1} style={[PAGESTYLE.videoLinkText, { width: wp(70) }]}>{props.lessonData.RecordingList[0].originalname}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {props.lessonData.ChatTranscript ?
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
                            <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                            <View style={PAGESTYLE.fileGrp}>
                                <Text style={PAGESTYLE.fileName}>Filename</Text>
                                <DownloadSVG style={PAGESTYLE.downloadIcon} height={hp(2.01)} width={hp(2.01)} />
                            </View>
                        </View>
                        :
                        null
                    }
                </View>
            </View>
        </View>

    );
}
export default TLDetail;