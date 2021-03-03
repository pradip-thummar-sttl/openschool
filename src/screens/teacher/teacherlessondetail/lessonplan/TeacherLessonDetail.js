import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';


const TLDetail = (props) => {
    return (

        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>
                    <View style={PAGESTYLE.timedateGrp}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Subject</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>Geography</Text>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                            <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Text style={PAGESTYLE.labelTextMain}>The Amazon Forest </Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.timedateGrp}>
                        <View style={PAGESTYLE.dateWhiteBoard}>
                            <Text style={PAGESTYLE.subjectText}>Date</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Image style={PAGESTYLE.calIcon} source={require('../../../../assets/images/calendar-small-icon2.png')} />
                                <Text style={PAGESTYLE.datetimeText}>14/09/2020</Text>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.time]}>
                            <Text style={PAGESTYLE.subjectText}>Time</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Image style={PAGESTYLE.timeIcon} source={require('../../../../assets/images/clock2.png')} />
                                <Text style={PAGESTYLE.datetimeText}>09:00 - 09:30</Text>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.grp]}>
                            <Text style={PAGESTYLE.subjectText}>Participants</Text>
                            <View style={PAGESTYLE.subjectDateTime}>
                                <Image style={PAGESTYLE.calIcon} source={require('../../../../assets/images/group2.png')} />
                                <Text style={PAGESTYLE.datetimeText}>Group 2A</Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitle}>Lesson Description</Text>
                        <Text style={PAGESTYLE.lessonText}>Rainforests are one of the oldest ecosystems on Earth and are fundamental to all life on the planet. You will learn all about different forms of physical geography, including different world ecosystems. You will also learn about everyday items that come from the Amazon Rainforest.</Text>
                    </View>
                    <View style={[PAGESTYLE.videoLinkBlock, PAGESTYLE.videoLinkBlockSpaceTop]}>
                        <Image source={require('../../../../assets/images/playIcon2.png')} style={PAGESTYLE.videoLinkIcon} />
                        <Text style={PAGESTYLE.videoLinkText}>Geography - Instructional video</Text>
                    </View>
                    <View style={PAGESTYLE.requirementofClass}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Items your class may need</Text>
                        <View style={PAGESTYLE.lessonPoints}>
                            <Image source={require('../../../../assets/images/check-icon2.png')} style={PAGESTYLE.checkIcon} />
                            <Text style={PAGESTYLE.lessonPointText}>Text book, a pencil, colouring pencils or felt tip pens, rubber eraser, tip pens.</Text>
                        </View>
                        <View style={PAGESTYLE.lessonPoints}>
                            <Image source={require('../../../../assets/images/check-icon2.png')} style={PAGESTYLE.checkIcon} />
                            <Text style={PAGESTYLE.lessonPointText}>Drawing work sheet.</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.checkBoxGrpWrap}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Individual pupils</Text>
                        <View style={PAGESTYLE.checkBoxGrp}>

                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Reuel Pardesi</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Gene Aw</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Janice Williamson</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Jovan Singh</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Sophia Lauren</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Mark Mitchell</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabel}>
                                <CheckBox
                                    style={[STYLE.checkBoxcommon, PAGESTYLE.checkBoxcommon]}
                                    value={false}
                                    onCheckColor={'#03014C'}
                                    onTintColor={'#03014C'}
                                    tintColor={'#676693'}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Madeline Ghenea</Text>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.toggleBoxGrpWrap}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>Class Settings</Text>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Will this lesson be delivered live</Text>
                            <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Publish lesson before live lesson</Text>
                            <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                        <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                            <ToggleSwitch isOn={false} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View>
                    </View>
                </View>
                <View style={PAGESTYLE.rightSideBar}>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Learning material</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                    </View>

                    <View style={PAGESTYLE.thumbVideo}>
                        <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />

                    </View>
                    <View style={[PAGESTYLE.thumbVideo, PAGESTYLE.videoLinkBlockSpaceBottom]}>
                        <Text style={PAGESTYLE.requireText}>View lesson recording</Text>
                        <View style={PAGESTYLE.videoLinkBlock}>
                            <Image source={require('../../../../assets/images/playIcon2.png')} style={PAGESTYLE.videoLinkIcon} />
                            <Text style={PAGESTYLE.videoLinkText}>Lesson Recording</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Filename</Text>
                            <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}
export default TLDetail;