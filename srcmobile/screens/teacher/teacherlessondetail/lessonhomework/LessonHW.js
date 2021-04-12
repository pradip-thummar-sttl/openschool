import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Popupaddrecording from '../../../../component/reusable/popup/Popupaddrecording';
import { opacity } from "../../../../utils/Constant";

const TLHomeWork = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (

        <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.containerWrap}>
                <View style={PAGESTYLE.teacherDetailLeft}>
                    <View style={PAGESTYLE.timedateGrp}>
                        <View style={PAGESTYLE.dropDownFormInput}>
                            <View style={PAGESTYLE.toggleBox}>
                                <View style={PAGESTYLE.toggleGrpBox}>
                                    <Text style={PAGESTYLE.toggleText}>Include homework</Text>
                                    <ToggleSwitch
                                        isOn={true} color={COLORS.dashboardGreenButton} onToggle={isOn => true}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={PAGESTYLE.timedateGrp}>
                            <View style={PAGESTYLE.dropDownFormInput}>
                                <Text style={PAGESTYLE.subjectText}>Due Date</Text>
                                <View style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
                                    <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} />
                                    <TouchableOpacity>
                                        <Text style={PAGESTYLE.dateTimetextdummy}>14/09/2020</Text>
                                    </TouchableOpacity>
                                    <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            defaultValue='Watch the BBC Bitesize video and write down a list of all of the everyday items that come from the Amazon Rainforest.  Write a short story about the items that you can find in your house and what they mean to you. Write about what you can do with the item and which part of the Amazon Rainforest its from.'
                            style={PAGESTYLE.commonInputTextareaNormal}
                        />
                    </View>
                    <View style={PAGESTYLE.videoRecording}>
                        <View style={PAGESTYLE.recordLinkBlock}>
                            <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                            <Popupaddrecording />
                        </View>
                    </View>

                    <View style={PAGESTYLE.requirementofClass}>
                        <View style={STYLE.hrCommon}></View>
                        <Text style={PAGESTYLE.requireText}>Create Checklist</Text>
                        <View style={PAGESTYLE.checkBoxGroup}>
                            <View style={PAGESTYLE.checkBoxLabelLine}>
                                <CheckBox
                                    style={PAGESTYLE.checkMark}
                                    value={false}
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
                                    boxType={'square'}
                                    onCheckColor={COLORS.white}
                                    onFillColor={COLORS.dashboardPupilBlue}
                                    onTintColor={COLORS.dashboardPupilBlue}
                                    tintColor={COLORS.dashboardPupilBlue}
                                />
                                <Text style={PAGESTYLE.checkBoxLabelText}>Take a photo of your work and upload here</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={PAGESTYLE.addItem}>
                            <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                            <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={PAGESTYLE.rightSideBar}>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <Text style={PAGESTYLE.requireText}>Learning material</Text>
                        <Text style={PAGESTYLE.rightBlockText}>Drop links, videos, or documents here or find relevant materials with our clever AI</Text>
                    </View>
                    <View style={PAGESTYLE.uploadBlock}>
                        <TouchableOpacity>
                            <Image source={Images.MobileUpload} style={PAGESTYLE.mobileUploadLink} />
                        </TouchableOpacity>
                    </View>
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Material</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.fileGrp}>
                            <Text style={PAGESTYLE.fileName}>Material</Text>
                            <TouchableOpacity style={PAGESTYLE.closeNotificationbar}><Image source={Images.PopupCloseIcon} style={PAGESTYLE.closeIconSmall} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={PAGESTYLE.videoScroll}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <TouchableOpacity>
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={Images.VideoSmlThumb} style={PAGESTYLE.smlThumbVideo} />
                                    <Text style={PAGESTYLE.smlThumbVideoText}>BBC Bitesize. The Amazon Rainforest</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={Images.VideoSmlThumb} style={PAGESTYLE.smlThumbVideo} />
                                    <Text style={PAGESTYLE.smlThumbVideoText}>BBC Bitesize. The Amazon Rainforest</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={Images.VideoSmlThumb} style={PAGESTYLE.smlThumbVideo} />
                                    <Text style={PAGESTYLE.smlThumbVideoText}>BBC Bitesize. The Amazon Rainforest</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={Images.VideoSmlThumb} style={PAGESTYLE.smlThumbVideo} />
                                    <Text style={PAGESTYLE.smlThumbVideoText}>BBC Bitesize. The Amazon Rainforest</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                        <TouchableOpacity
                            style={PAGESTYLE.buttonGrp}
                            activeOpacity={opacity}
                            onPress={() => props.navigateToVideoGallery()}>
                            <Text style={STYLE.commonButtonBorderedGreen}>find me learning material</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    );
}
export default TLHomeWork;