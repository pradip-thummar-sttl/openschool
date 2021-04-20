import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import Images from '../../../../utils/Images';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import Header8 from '../../../../component/reusable/header/bulck/Header8'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";

const PupilHomeWorkMarked = (props) => {
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.wrapper}>
                <View style={PAGESTYLE.whiteBg}>
                    <Header8 goBack={() => props.navigation.goBack()} />
                    <View style={PAGESTYLE.containerWrapSubmit}>
                        <View style={PAGESTYLE.containerWrapTopSubmit}>
                            <View style={PAGESTYLE.dateBlockRowSubmitted}>
                                <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Homework Date</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>19/02/2020</Text>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Submitted On</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Text style={PAGESTYLE.dueDateTextBoldSubmit}>19/02/2020</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.userLeft, PAGESTYLE.markedPurpleStrip]}>
                                <Image source={require('../../../../assets/images/bookpurplestrip2.png')} style={PAGESTYLE.bookLightBlue} />
                                <Text style={PAGESTYLE.blueStripText}>Homework has been marked!</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingBottom: hp(69) }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.containerWrap}>
                                <View style={PAGESTYLE.teacherDetailLeft}>
                                    <View style={PAGESTYLE.lessonDesc}>
                                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                        <Text style={PAGESTYLE.descriptionText}>Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest it comes from.</Text>
                                    </View>
                                    <View style={PAGESTYLE.requirementofClass}>
                                        <View style={PAGESTYLE.checkBoxGroup}>
                                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                                <View style={PAGESTYLE.alignRow}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={true}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelTextSubmit}>Watch The BBC Bitesize Video</Text>
                                                </View>
                                            </View>
                                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                                <View style={PAGESTYLE.alignRow}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={false}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelTextSubmit}>Write a list of all the everyday items that come from the Amazon Rainforest</Text>
                                                </View>
                                            </View>
                                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                                <View style={PAGESTYLE.alignRow}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={true}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelTextSubmit}>Write a short story about where those items come from in the the forest and what they mean to you. </Text>
                                                </View>
                                            </View>
                                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                                <View style={PAGESTYLE.alignRow}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={true}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelTextSubmit}>Take a photo of your work and upload here</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rightSideBar}>
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <Image source={Images.UploadHomeWorkMobile} style={PAGESTYLE.uploadBoardsubmit} />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.containerWrapMarked}>
                                <View style={PAGESTYLE.feedbackBlock}>
                                    <View style={PAGESTYLE.lessonDescmarked}>
                                        <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                                        <Text style={PAGESTYLE.descriptionText}>Well done Reuel. Your story was very well written and constructed. Excellent use of grammar and punctuation. Watch the video for more comments</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.feedbackVideoBlock}>
                                    <Image source={require('../../../../assets/images/videoThumb2.png')} style={PAGESTYLE.videoThumbMedium} />
                                    <View>
                                        <Text style={[PAGESTYLE.lessonFeedDesc]}>Reuel Pardesi - Feedback {"\n"}for English </Text>
                                        <Text style={PAGESTYLE.techerName}>Miss Barker</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilHomeWorkMarked;