import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, PermissionsAndroid, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import moment from 'moment';
import { Download } from "../../../../utils/Download";
import { baseUrl } from "../../../../utils/Constant";
const TLDetail = (props) => {
    console.log('props', props.lessonData.MaterialList);
    return (
        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrap}>
                <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
                    <View style={PAGESTYLE.timedateGrp}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Subject</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>{props.lessonData.SubjectName}</Text>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeSpace]}>
                            <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>{props.lessonData.LessonTopic} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.timedateGrp}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Date</Text>
                            <View style={PAGESTYLE.alignRow}>
                                <Image style={PAGESTYLE.calIconNoInput} source={Images.CalenderIconSmall} />
                                <Text style={PAGESTYLE.datetimeText}>{moment(props.lessonData.Date).format('DD/MM/yyyy')}</Text>
                            </View>

                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                            <Text style={PAGESTYLE.subjectText}>Time</Text>
                            <View style={PAGESTYLE.alignRow}>
                                <Image style={PAGESTYLE.timeIconNoInput} source={Images.Clock} />
                                <Text style={PAGESTYLE.datetimeText}>{props.lessonData.StartTime} - {props.lessonData.EndTime}</Text>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                            <Text style={PAGESTYLE.subjectText}>Participants</Text>
                            <View style={PAGESTYLE.alignRow}>
                                <Image style={PAGESTYLE.calIconNoInput} source={Images.Group} />
                                <Text style={PAGESTYLE.datetimeText}>{props.lessonData.GroupName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitleWithoutTextArea}>Lesson Description</Text>
                        <Text style={PAGESTYLE.lessonText}>{props.lessonData.LessonDescription}</Text>
                    </View>
                    {props.lessonData.RecordingName ?
                        <TouchableOpacity style={[PAGESTYLE.videoLinkBlock, PAGESTYLE.videoLinkBlockSpaceTop]}>
                            <Image source={Images.PlayIcon} style={PAGESTYLE.videoLinkIcon} />
                            <Text style={PAGESTYLE.videoLinkText}>{props.lessonData.RecordingName}</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                    <View style={PAGESTYLE.requirementofClass}>
                        <View style={PAGESTYLE.hrTagMIddleReverse}>
                            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Items your class may need</Text>
                            <View style={[STYLE.hrCommon, PAGESTYLE.commonWidthSmall]}></View>
                        </View>
                        <FlatList
                            data={props.lessonData.CheckList}
                            style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                            renderItem={({ item, index }) => (
                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                    <Image source={Images.CheckIcon} style={PAGESTYLE.checkIcon} />
                                    <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={PAGESTYLE.checkBoxGrpWrap}>
                        <View style={PAGESTYLE.hrTagMIddleReverse}>
                            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Individual pupils</Text>
                            <View style={[STYLE.hrCommon, PAGESTYLE.commonWidthMidium]}></View>
                        </View>
                        <View style={PAGESTYLE.checkBoxGrp}>
                            <FlatList
                                data={props.lessonData.PupilList}
                                style={{ alignSelf: 'center', width: '100%', bottom: 20, marginTop: 10 }}
                                renderItem={({ item, index }) => (
                                    <View style={PAGESTYLE.checkBoxLabelNone}>
                                        <Image source={{ uri: baseUrl + item.ProfilePicture }} style={PAGESTYLE.userIconPupil} />
                                        <Text style={PAGESTYLE.checkBoxLabelTextNone}>{item.PupilName}</Text>
                                    </View>
                                )}
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                    <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
                        <View style={PAGESTYLE.hrTagMIddleReverse}>
                            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                            <View style={[STYLE.hrCommon, PAGESTYLE.commonWidth]}></View>
                        </View>
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
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Learning material</Text>

                        {props.lessonData.MaterialList.length > 0 ?
                            props.lessonData.MaterialList.map((item, index) => {
                                return (
                                    <View style={{ ...PAGESTYLE.fileGrp, height: 60 }}>
                                        <Text numberOfLines={1} style={[PAGESTYLE.fileName,{width:hp(20)}]}>{item.originalname}</Text>
                                        <TouchableOpacity onPress={() => Download(item)} style={PAGESTYLE.downloaBtn}>
                                            <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text style={{ fontSize: hp(1.75), textAlign: 'center' }}>No material uploaded!</Text>
                        }
                    </View>

                    {props.lessonData.RecommendedList.length > 0 ?
                        <FlatList
                            data={props.lessonData.RecommendedList}
                            style={{ alignSelf: 'center', width: '100%', bottom: hp(2.60), marginTop: hp(1.30) }}
                            renderItem={({ item, index }) => (
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} />
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        null
                    }
                    <View style={[PAGESTYLE.videoLinkBlockSpaceBottom, PAGESTYLE.videoLinkBlockSpaceTop]}>
                        <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                        {props.lessonData.RecordingList ?
                            props.lessonData.RecordingList.map((item, index) => {
                                return (
                                    <View style={{ ...PAGESTYLE.fileGrp, height: 60 }}>
                                        <Text numberOfLines={1} style={[PAGESTYLE.fileName,{width:hp(20)}]}>{item.originalname}</Text>
                                        <TouchableOpacity onPress={() => Download(item)} style={PAGESTYLE.downloaBtn}>
                                            <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text style={{ fontSize: hp(1.75), textAlign: 'center' }}>No lesson recording found!</Text>
                        }
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                        {props.lessonData.ChatTranscript ?
                            <View style={PAGESTYLE.fileGrp}>
                                <Text style={PAGESTYLE.fileName}>Filename</Text>
                                <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                            </View>
                            :
                            <Text style={{ fontSize: hp(1.75), textAlign: 'center' }}>No chat transcript found!</Text>
                        }
                    </View>
                </View>
            </View>
        </View>

    );
}
export default TLDetail;