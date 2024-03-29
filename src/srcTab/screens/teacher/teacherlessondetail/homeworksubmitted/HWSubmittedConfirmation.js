import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Images from "../../../../../utils/Images";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import UploadMaterial from "../../../../../svg/teacher/lessonhwplanner/UploadMaterial";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import Bronze from "../../../../../svg/teacher/lessonhwplanner/StarBronze";
import Silver from "../../../../../svg/teacher/lessonhwplanner/StartSilver";
import Gold from "../../../../../svg/teacher/lessonhwplanner/StarGold";
import Marked from "../../../../../svg/teacher/lessonhwplanner/Marked";
import Recording from "../../../../../svg/teacher/lessonhwplanner/Recording";

const TLHomeWorkSubmittedDetailConfirmation = (props) => {
    return (
        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrapTop}>
                <View style={PAGESTYLE.userLeft}>
                    <View style={PAGESTYLE.userThumb}></View>
                    <View>
                        <Text style={PAGESTYLE.userTopName}>Reuel Pardesi</Text>
                        <Text style={PAGESTYLE.userTopGroup}>Group: 1A</Text>
                    </View>
                </View>
                <View style={PAGESTYLE.userRight}>
                    <View style={PAGESTYLE.markedLabel}>
                        {/* <Image source={Images.Marcked} style={PAGESTYLE.markedIcon} /> */}
                        <Marked style={PAGESTYLE.markedIcon} width={60} height={60}/>
                        <Text style={PAGESTYLE.markedText}>Marked</Text>
                    </View>
                    <View style={PAGESTYLE.dateNameBlock}>
                        <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                        <Text style={PAGESTYLE.dateText}>19/02/2020</Text>
                    </View>
                    <View style={PAGESTYLE.dateNameBlock}>
                        <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                        <Text style={PAGESTYLE.dateText}>19/02/2020</Text>
                    </View>
                </View>
            </View>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitleWithoutTextArea}>Homework Description</Text>
                        <Text style={PAGESTYLE.lessonDesc}>Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest its from.</Text>
                    </View>
                    <View style={PAGESTYLE.requirementofClass}>
                        {/* <Text style={PAGESTYLE.requireText}>Create Checklist</Text> */}
                        <View style={PAGESTYLE.checkBoxGroup}>
                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                <CheckBox
                                    style={PAGESTYLE.checkMark}
                                    value={false}
                                    tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
                                    boxType={'square'}
                                    onCheckColor={COLORS.white}
                                    onFillColor={COLORS.dashboardPupilBlue}
                                    onTintColor={COLORS.dashboardPupilBlue}
                                    tintColor={COLORS.dashboardPupilBlue}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Watch The BBC Bitesize Video</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                <CheckBox
                                    style={PAGESTYLE.checkMark}
                                    tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
                                    value={false}
                                    boxType={'square'}
                                    onCheckColor={COLORS.white}
                                    onFillColor={COLORS.dashboardPupilBlue}
                                    onTintColor={COLORS.dashboardPupilBlue}
                                    tintColor={COLORS.dashboardPupilBlue}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Write a list of all the everyday items that come from the Amazon Rainforest</Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                <CheckBox
                                    style={PAGESTYLE.checkMark}
                                    value={false}
                                    tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
                                    boxType={'square'}
                                    onCheckColor={COLORS.white}
                                    onFillColor={COLORS.dashboardPupilBlue}
                                    onTintColor={COLORS.dashboardPupilBlue}
                                    tintColor={COLORS.dashboardPupilBlue}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Write a short story about where those items come from in the the forest and what they mean to you. </Text>
                            </View>
                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                <CheckBox
                                    style={PAGESTYLE.checkMark}
                                    value={false}
                                    tintColors={{true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue}}
                                    boxType={'square'}
                                    onCheckColor={COLORS.white}
                                    onFillColor={COLORS.dashboardPupilBlue}
                                    onTintColor={COLORS.dashboardPupilBlue}
                                    tintColor={COLORS.dashboardPupilBlue}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Take a photo of your work and upload here</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                            <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={PAGESTYLE.rightSideBar}>
                    <View style={PAGESTYLE.uploadBoardBlock}>
                        {/* <Image source={Images.UploadHomeWork} style={PAGESTYLE.uploadBoard} /> */}
                        <UploadMaterial style={PAGESTYLE.uploadBoard} width={hp(33.07)} height={hp(45.05)} />
                    </View>
                </View>
            </View>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.feedbackBlock}>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            defaultValue='Leave feedback here'
                            style={PAGESTYLE.commonInputTextareaBoldGrey}
                        />
                    </View>
                    <View style={PAGESTYLE.videoRecording}>
                        <View style={[PAGESTYLE.videoLinkBlock, PAGESTYLE.videoRecordSpace]}>
                            {/* <Image source={Images.PlayIcon} style={PAGESTYLE.videoLinkIcon} /> */}
                            <PlayBlue style={PAGESTYLE.videoLinkIcon} width={hp(2.38)} height={hp(2.38)} />
                            <Text style={PAGESTYLE.videoLinkText}>Homework Feedback - Reuel…</Text>
                        </View>
                        <View style={PAGESTYLE.recordLinkBlock}>
                            {/* <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} /> */}
                            <Recording style={PAGESTYLE.recordingLinkIcon} width={hp(2.34)} height={hp(2.34)}/>
                            <Popupaddrecording />
                        </View>
                    </View>
                </View>
                <View style={PAGESTYLE.ratingBlock}>
                    <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                    <View style={PAGESTYLE.achivementBox}>
                        <View style={PAGESTYLE.rewardStarMark}>
                            <View style={PAGESTYLE.centerText}>
                                {/* <Image source={Images.BronzeStar} style={[PAGESTYLE.starSelected]} /> */}
                                <Bronze style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                            </View>
                            <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                {/* <Image source={Images.SilverStar} style={[PAGESTYLE.starSelected]} /> */}
                                <Silver style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                <Text style={PAGESTYLE.starText}>Silver stars</Text>
                            </View>
                            <View style={PAGESTYLE.centerText}>
                                {/* <Image source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]} /> */}
                                <Gold style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                <Text style={PAGESTYLE.starText}>Gold stars</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default TLHomeWorkSubmittedDetailConfirmation;