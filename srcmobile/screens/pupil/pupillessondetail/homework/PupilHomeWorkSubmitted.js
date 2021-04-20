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
import Header7 from '../../../../component/reusable/header/bulck/Header7'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";

const PupilHomeWorkSubmitted = (props) => {
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.whiteBg}>
                <Header7 goBack={() => props.navigation.goBack()} />
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
                        <View style={[PAGESTYLE.userLeft, PAGESTYLE.submittedBlueStrip]}>
                            <Image source={require('../../../../assets/images/booklightblue2.png')} style={PAGESTYLE.bookLightBlue} />
                            <Text style={PAGESTYLE.blueStripText}>Homework submitted on time!</Text>
                        </View>
                    </View>
                </View>
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
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilHomeWorkSubmitted;