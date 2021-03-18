import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import Header15 from '../../../../component/reusable/header/bulck/Header15'

const PupilHomeWorkMarked = (props) => {
    return (
        <View style={PAGESTYLE.wrapper}>
            <View style={PAGESTYLE.whiteBg}>
                <Header15 goBack={()=>props.navigation.goBack()} />
                <View style={PAGESTYLE.containerWrap}>
                    <View style={PAGESTYLE.containerWrapTopPurple}>
                        <View style={[PAGESTYLE.userLeft, PAGESTYLE.markedPurpleStrip]}>
                            <Image source={require('../../../../assets/images/bookpurplestrip2.png')} style={PAGESTYLE.bookPurpleStip} />
                            <Text style={PAGESTYLE.blueStripText}>Homework has been marked!</Text>
                        </View>
                        <View style={PAGESTYLE.userRight}>
                            <View style={[PAGESTYLE.markedLabel, PAGESTYLE.markSubmittedSpaceLeft]}>
                                <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.markedIcon} />
                                <Text style={PAGESTYLE.markedText}>Submitted</Text>
                            </View>
                            <View style={PAGESTYLE.dateNameBlock}>
                                <Text style={PAGESTYLE.dateTitle}>Homework Date</Text>
                                <Text style={PAGESTYLE.dateText}>08/03/21</Text>
                            </View>
                            <View style={PAGESTYLE.dateNameBlock}>
                                <Text style={PAGESTYLE.dateTitle}>Submitted On</Text>
                                <Text style={PAGESTYLE.dateText}>08/03/21</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={PAGESTYLE.containerWrap}>
                    <View style={PAGESTYLE.teacherDetailLeft}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                            <Text style={PAGESTYLE.descriptionText}>Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest it comes from.</Text>
                        </View>
                        <View style={PAGESTYLE.requirementofClass}>

                            <Text style={PAGESTYLE.requireText}>Make sure you:</Text>
                            <View style={PAGESTYLE.checkBoxGroup}>
                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                    <View style={PAGESTYLE.alignRow}>
                                        <CheckBox
                                            style={PAGESTYLE.checkMark}
                                            value={false}
                                            boxType={'square'}
                                            onCheckColor={COLORS.dashboardPupilBlue}
                                            onTintColor={COLORS.dashboardPupilBlue}
                                            tintColor={COLORS.dashboardPupilBlue}
                                        />
                                        <Text style={PAGESTYLE.checkBoxLabelText}>Watch The BBC Bitesize Video</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                    <View style={PAGESTYLE.alignRow}>
                                        <CheckBox
                                            style={PAGESTYLE.checkMark}
                                            value={false}
                                            boxType={'square'}
                                            onCheckColor={COLORS.dashboardPupilBlue}
                                            onTintColor={COLORS.dashboardPupilBlue}
                                            tintColor={COLORS.dashboardPupilBlue}
                                        />
                                        <Text style={PAGESTYLE.checkBoxLabelText}>Write a list of all the everyday items that come from
the Amazon Rainforest</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                    <View style={PAGESTYLE.alignRow}>
                                        <CheckBox
                                            style={PAGESTYLE.checkMark}
                                            value={false}
                                            boxType={'square'}
                                            onCheckColor={COLORS.dashboardPupilBlue}
                                            onTintColor={COLORS.dashboardPupilBlue}
                                            tintColor={COLORS.dashboardPupilBlue}
                                        />
                                        <Text style={PAGESTYLE.checkBoxLabelText}>Write a short story about where those items come from in the the forest and what they mean to you. </Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.checkBoxLabelLine}>
                                    <View style={PAGESTYLE.alignRow}>
                                        <CheckBox
                                            style={PAGESTYLE.checkMark}
                                            value={false}
                                            boxType={'square'}
                                            onCheckColor={COLORS.dashboardPupilBlue}
                                            onTintColor={COLORS.dashboardPupilBlue}
                                            tintColor={COLORS.dashboardPupilBlue}
                                        />
                                        <Text style={PAGESTYLE.checkBoxLabelText}>Take a photo of your work and upload here</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.rightSideBar}>
                        <View style={PAGESTYLE.uploadBoardBlock}>
                            <Image source={require('../../../../assets/images/upload-hw2.png')} style={PAGESTYLE.uploadBoard} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={PAGESTYLE.whiteBg}>
                <View style={PAGESTYLE.containerWrap}>
                    <View style={PAGESTYLE.feedbackBlock}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonTitleBold}>Teacher’s Feedback</Text>
                            <Text style={PAGESTYLE.descriptionText}>Well done Reuel. Your story was very well written and constructed. Excellent use of grammar and punctuation. Watch the video for more comments</Text>
                        </View>
                    </View>
                    <View style={PAGESTYLE.feedbackVideoBlock}>
                        <Image source={require('../../../../assets/images/videoThumb2.png')} style={PAGESTYLE.videoThumbMedium} />
                        <View>
                            <Text style={[PAGESTYLE.lessonDesc, PAGESTYLE.lineLength]}>Reuel Pardesi - Feedback for English </Text>
                            <Text style={PAGESTYLE.lessonTitle}>Miss Barker</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilHomeWorkMarked;