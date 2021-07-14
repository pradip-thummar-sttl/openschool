import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler } from "react-native";
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
import Header14 from '../../../../component/reusable/header/bulck/Header14'
import Popuphomework from "../../../../component/reusable/popup/Popupsubmithomework";
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import moment from "moment";
import DocumentPicker from 'react-native-document-picker';
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
import Images from "../../../../utils/Images";

const PupilHomeWorkDetail = (props) => {
    const [isSubmitPopup, setSubmitPopup] = useState(false)
    const { item } = props.route.params
    const [materialArr, setMaterialArr] = useState([])
    const [isLoading, setLoading] = useState(false);
    console.log('props of homewor', baseUrl + item.TeacherProfile);
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


    const isFieldsValidated = () => {
        if (materialArr.length <= 0) {
            showMessage(MESSAGE.selectMaterial)
            return false
        }
        console.log(isSubmitPopup);
        setSubmitPopup(true)
    }

    const onSubmitHomework = () => {
        let formData = new FormData();

        materialArr.forEach(element => {
            formData.append('materiallist', {
                uri: element.uri,
                name: element.name,
                type: element.type
            });
        })

        // formData.append("Feedback", feedBack);
        // formData.append("Rewards", '1');

        Service.postFormData(formData, `${EndPoints.PupilUploadHomework}/${item.HomeWorkId}/${User.user.UserDetialId}`, (res) => {
            console.log('res', res);
            if (res.code == 200) {
                setLoading(false)
                console.log('response of save Homework', res)
                // setDefaults()
                showMessageWithCallBack(MESSAGE.hwSubmitted, () => {
                    props.navigation.goBack()
                })
                setSubmitPopup(false)
                // props.route.params.goBack()
            } else {
                showMessage(res.message)
                setLoading(false)
                setSubmitPopup(false)
            }
        }, (err) => {
            setLoading(false)
            console.log('response of get all lesson error', err)
            setSubmitPopup(false)
        })
    }
    const addMaterial = () => {
        console.log('hihihihihihi')
        var arr = [...materialArr]
        try {
            DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf,
                DocumentPicker.types.doc,
                DocumentPicker.types.xls,
                DocumentPicker.types.images,
                DocumentPicker.types.plainText],
            }).then((results) => {
                for (const res of results) {
                    console.log(
                        res.uri,
                        res.type, // mime type
                        res.name,
                        res.size
                    );
                    arr.push(res)

                }
                console.log('hello response arr', arr)
                setMaterialArr(arr)
            });

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const removeDocument = (_index) => {
        const newList = materialArr.filter((item, index) => index !== _index);
        setMaterialArr(newList)
    }

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebarpupil hide={() => action(!isHide)}
                moduleIndex={2}
                navigateToDashboard={() => props.navigation.navigate('PupuilDashboard')}
                navigateToTimetable={() => props.navigation.navigate('PupilTimetable')}
                onLessonAndHomework={() => props.navigation.navigate('PupilLessonDetail')} /> */}
            <View style={PAGESTYLE.whiteBg}>
                <Header14
                    onAlertPress={() => props.navigation.openDrawer()}
                    goBack={() => props.navigation.goBack()}
                    onSubmitHomework={() => isFieldsValidated()}
                    title={item.SubjectName + ' ' + item.LessonTopic} />
                <View style={{ ...PAGESTYLE.containerWrap, }}>

                    <View style={PAGESTYLE.teacherDetailLeft}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.dateBlockRow}>
                                <View style={[PAGESTYLE.dateNameBlock, PAGESTYLE.spaceSmallUserName]}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Due date</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Image source={require('../../../../assets/images/calendar-small-icon2.png')} style={PAGESTYLE.calander} />
                                        <Text style={PAGESTYLE.dueDateTextBold}>{item.DueDate ? moment(item.DueDate).format('DD/MM/yyyy') : '-'}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.dateNameBlock}>
                                    <Text style={PAGESTYLE.dateTitleNormal}>Teacher</Text>
                                    <View style={PAGESTYLE.daterow}>
                                        <Image style={PAGESTYLE.lessonThumb} source={{ uri: baseUrl + item.TeacherProfile }}></Image>
                                        <Text style={PAGESTYLE.dueDateTextBold}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.lessonDesc]}>
                                <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                                <Text style={PAGESTYLE.descriptionText}>{item.HomeworkDescription}ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</Text>
                            </View>
                            <View style={PAGESTYLE.requirementofClass}>
                                <Text style={PAGESTYLE.requireText}>Make sure you:</Text>
                                <View style={PAGESTYLE.checkBoxGroup}>
                                    <FlatList
                                        data={item.CheckList}
                                        renderItem={({ item }) => (
                                            <View style={PAGESTYLE.checkBoxLabelBox}>
                                                <View style={PAGESTYLE.alignRow}>
                                                    <CheckBox
                                                        style={PAGESTYLE.checkMark}
                                                        value={item.IsCheck}
                                                        boxType={'square'}
                                                        tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                                        onCheckColor={COLORS.white}
                                                        onFillColor={COLORS.dashboardPupilBlue}
                                                        onTintColor={COLORS.dashboardPupilBlue}
                                                        tintColor={COLORS.dashboardPupilBlue}
                                                    />
                                                    <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                                </View>
                                            </View>
                                        )}
                                        style={{ height: 200 }} />
                                </View>

                                <View style={PAGESTYLE.rightSideBar}>
                                    <View style={PAGESTYLE.uploadBoardBlock}>
                                        <TouchableOpacity
                                            style={PAGESTYLE.homeworkView}
                                            onPress={() => addMaterial()}>
                                            <Text style={PAGESTYLE.HomeText}>Upload Homework</Text>
                                        </TouchableOpacity>
                                        <ScrollView>
                                            <View style={PAGESTYLE.docView}>
                                                {materialArr.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={PAGESTYLE.homeworkView}
                                                            activeOpacity={opacity}
                                                            onPress={() => removeDocument(index)}>
                                                            <View style={PAGESTYLE.alignRow1}>
                                                                <Image source={Images.pdfIcon} style={PAGESTYLE.markedIcon} />
                                                                <Image source={Images.PopupCloseIcon} style={PAGESTYLE.removeIcon} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[PAGESTYLE.fullButtonMain]}>
                        <TouchableOpacity onPress={() => setSubmitPopup(true)} style={PAGESTYLE.buttonGrp}><Text style={[PAGESTYLE.commonButtonGreenheaderFullWidth, PAGESTYLE.fullButton]}>submit homework</Text></TouchableOpacity>
                    </View>
                </View>
                {
                    isSubmitPopup ? <Popuphomework OnSubmitHomeworkPress={() => onSubmitHomework()} onPopupClosed={(flag) => setSubmitPopup(flag)} /> : null
                }
            </View>
        </View>
    );
}
export default PupilHomeWorkDetail;