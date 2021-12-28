import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, BackHandler, Platform, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../../utils/Colors";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
// import ToggleSwitch from 'toggle-switch-react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import Header7 from '../../../../component/reusable/header/bulck/Header7'
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
// import Images from "../../../../../utils/Images";
import { Download } from "../../../../../utils/Download";
import SubmittedBook from "../../../../../svg/pupil/lessonhwplanner/SubmittedBook";
import Doc from "../../../../../svg/common/Doc";

var moment = require('moment');

const PupilHomeWorkSubmitted = (props) => {
    const { item } = props.route.params
    const [materialArr, setMaterialArr] = useState(item.HomeworkList)
    const [isMatLoading, setLoader] = useState(false)
    const [mateIndex, setMateIndex] = useState(-1)


    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.whiteBg}>
                <Header7
                    goBack={() => props.navigation.goBack()}
                    subjectName={item.SubjectName}
                    topicName={item.LessonTopic} />
                <View style={PAGESTYLE.containerWrapSubmit}>
                    <View style={PAGESTYLE.containerWrapTopSubmit}>
                        <View style={PAGESTYLE.dateBlockRowSubmitted}>
                            <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                <Text style={PAGESTYLE.dateTitleNormal}>Homework Date</Text>
                                <View style={PAGESTYLE.daterow}>
                                    <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.DueDate ? moment(item.DueDate).format('DD/MM/yyyy') : '-'}</Text>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.dateNameBlockSubmitted, PAGESTYLE.spaceSmallUserName]}>
                                <Text style={PAGESTYLE.dateTitleNormal}>Submitted On</Text>
                                <View style={PAGESTYLE.daterow}>
                                    <Text style={PAGESTYLE.dueDateTextBoldSubmit}>{item.SubmitedDate ? moment(item.SubmitedDate).format('DD/MM/yyyy') : '-'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.userLeft, PAGESTYLE.submittedBlueStrip]}>
                            <SubmittedBook style={PAGESTYLE.bookLightBlue} width={hp(13.02)} height={hp(10.01)} />
                            {/* <Image source={require('../../../../../assets/images/booklightblue2.png')} style={PAGESTYLE.bookLightBlue} /> */}
                            <Text style={PAGESTYLE.blueStripText}>Homework submitted on time!</Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={[PAGESTYLE.containerWrap]}>
                        <View style={PAGESTYLE.teacherDetailLeft}>
                            <View style={PAGESTYLE.lessonDesc}>
                                <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                <Text style={PAGESTYLE.descriptionText}>{item.HomeworkDescription}</Text>
                            </View>
                            <View style={PAGESTYLE.requirementofClass}>
                                <View style={PAGESTYLE.checkBoxGroup}>
                                    <FlatList
                                        data={item.CheckList}
                                        // data={[1,2,]}
                                        renderItem={({ item }) => (
                                            <View style={[PAGESTYLE.checkBoxLabelLine,{alignItems : 'center'}]}>
                                                <View style={[PAGESTYLE.alignRow]}>
                                                    <CheckBox
                                                        style={[PAGESTYLE.checkMark]}
                                                        value={item.IsCheck}
                                                        boxType={'square'}
                                                        onCheckColor={COLORS.white}
                                                        tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                </View>
                                            </View>
                                        )}

                                    />
                                </View>
                            </View>
                        </View >
                        {/* style={PAGESTYLE.rightSideBar} */}
                        <View style={PAGESTYLE.rightSideBar} >
                            <View style={PAGESTYLE.uploadBoardBlock}>
                                {/* <Image source={Images.UploadHomeWorkMobile} style={PAGESTYLE.uploadBoardsubmit} /> */}
                                <Text style={PAGESTYLE.HomeText}>Uploaded Homework</Text>
                                <FlatList
                                    data={item.HomeworkList}
                                    style={{ width: '100%', }}
                                    contentContainerStyle={{ alignItems: 'center' }}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => {setLoader(true);setMateIndex(index); Download(item, (res) => {
                                            setLoader(false)
                                            setMateIndex(-1)
                                        })}} style={PAGESTYLE.downloaBtn}>
                                            <View style={PAGESTYLE.alignRow1}>
                                                {(isMatLoading && index==mateIndex) ?
                                                    <ActivityIndicator
                                                        style={{ ...PAGESTYLE.markedIcon }}
                                                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                        color={COLORS.blueBorder} />
                                                    :
                                                    // <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                    <Doc style={PAGESTYLE.markedIcon} width={62} height={62} />
                                                }
                                                {/* <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} /> */}
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilHomeWorkSubmitted;