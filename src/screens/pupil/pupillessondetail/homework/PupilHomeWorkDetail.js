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

const PupilHomeWorkDetail = (props) => {
    return (
        <View style={PAGESTYLE.whiteBg}>

            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>

                    <View style={PAGESTYLE.dateBlockRow}>
                        <View style={[PAGESTYLE.dateNameBlock, PAGESTYLE.spaceSmallUserName]}>
                            <Text style={PAGESTYLE.dateTitleNormal}>Due date</Text>
                            <View style={PAGESTYLE.daterow}>
                                <Image source={require('../../../../assets/images/calendar-small-icon2.png')} style={PAGESTYLE.calander} />
                                <Text style={PAGESTYLE.dueDateTextBold}>14/09/2020</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.dateNameBlock}>
                            <Text style={PAGESTYLE.dateTitleNormal}>Teacher</Text>
                            <View style={PAGESTYLE.daterow}>
                                <View style={PAGESTYLE.thumbSmall}></View>
                                <Text style={PAGESTYLE.dueDateTextBold}>Miss Barker</Text>
                            </View>
                        </View>
                    </View>

                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                        <Text style={PAGESTYLE.descriptionText}>Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest it comes from.</Text>
                    </View>
                    <View style={PAGESTYLE.requirementofClass}>

                        <Text style={PAGESTYLE.requireText}>Make sure you:</Text>
                        <View style={PAGESTYLE.checkBoxGroup}>
                            <View style={PAGESTYLE.checkBoxLabelBox}>
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
                                <View style={PAGESTYLE.lessonstartButton}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Watch Video</Text></TouchableOpacity>
                                </View>

                            </View>
                            <View style={PAGESTYLE.checkBoxLabelBox}>
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
                                <View style={PAGESTYLE.lessonstartButton}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Upload File</Text></TouchableOpacity>
                                </View>

                            </View>
                            <View style={PAGESTYLE.checkBoxLabelBox}>
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
                                <View style={PAGESTYLE.lessonstartButton}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Upload File</Text></TouchableOpacity>
                                </View>

                            </View>
                            <View style={PAGESTYLE.checkBoxLabelBox}>
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
                                <View style={PAGESTYLE.lessonstartButton}>
                                    <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={STYLE.commonButtonBorderedGreen}>Take Photo</Text></TouchableOpacity>
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
    );
}
export default PupilHomeWorkDetail;