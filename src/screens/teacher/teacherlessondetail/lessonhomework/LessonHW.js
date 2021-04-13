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
import { opacity, showMessage } from "../../../../utils/Constant";
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import moment from "moment";
import { Addhomework } from "../../../../utils/Model";
var checkItem = [
    {
        ItemName: "Watch The BBC Bitesize Video",
        IsCheck: false
    },
    {
        ItemName: "Write a list of all the everyday items that come from the Amazon Rainforest",
        IsCheck: false
    },
    {
        ItemName: "Write a short story about where those items come from in the the forest and what they mean to you.",
        IsCheck: false
    },
    {
        ItemName: "Take a photo of your work and upload here",
        IsCheck: false
    },
]

const TLHomeWork = (props) => {
    const [materialArr, setMaterialArr] = useState([])
    const [isAddRecording, setAddRecording] = useState(false)
    const [description, setDescription] = useState("")
    const [isSwitch, setSwitch] = useState(true)
    const [cameraResponse, setCameraResponse] = useState({})


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate, setSelectedDate] = useState(moment().format('DD/MM/yyyy'))

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date, moment(date).format('DD/MM/yyyy'));
        setSelectedDate(moment(date).format('yyyy-MM-DD'))
        Addhomework.DueDate = selectDate
        hideDatePicker();
    };

    const addMaterial = () => {
        console.log('hihihihihihi')
        var arr = [...materialArr]
        try {
            DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
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

    const removeObject = (index1, item) => {
        var array = [...materialArr];
        array.splice(index1, 1);
        setMaterialArr(array)
        console.log('hello material', array)
    }

    const onCheckList = (index) => {
        checkItem[index].IsCheck = !checkItem[index].IsCheck
        console.log('check item', checkItem)
        Addhomework.CheckList = checkItem
    }
    const onScreeCamera = () => {
        setAddRecording(false)
        props.navigateScreeCamera()
    }
    const onScreeVoice = () => {
        setAddRecording(false)

    }
    const onCameraOnly = () => {
        launchCamera({ mediaType: 'video' }, (response) => {
            // setResponse(response);
            if (response.errorCode) {
                showMessage(response.errorCode)
            } else {
                setCameraResponse(response)
            }

        })
        setAddRecording(false)

    }

    const switchOnOff = (isOn) => {
        setSwitch(isOn)
        Addhomework.IsIncluded = isOn
    }
    const setDesc = (text) => {
        setDescription(text)
        Addhomework.HomeworkDescription = description
    }

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
                                        isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.duedateBox, PAGESTYLE.time]}>
                            <View style={[PAGESTYLE.subjectDateTimeHomework, PAGESTYLE.dropDownSmallWrapNormal]}>
                                <View style={PAGESTYLE.dueDateWrap}>
                                    <Text style={PAGESTYLE.dueDateText}>Due Date</Text>
                                </View>
                                <Image style={PAGESTYLE.calIconHomeWork} source={Images.CalenderIconSmall} />
                                <TouchableOpacity onPress={() => showDatePicker()} style={PAGESTYLE.subjectDateTimeHomework}>
                                    <View>
                                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectDate}</Text>
                                    </View>
                                </TouchableOpacity>
                                <Image style={PAGESTYLE.dropDownArrowdatetimehomeWork} source={Images.DropArrow} />
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonTitle}>Homework Description</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            style={PAGESTYLE.commonInputTextareaNormal}
                            onChangeText={(text) => setDesc(text)}
                        />
                    </View>
                    {/* <View style={PAGESTYLE.videoRecording}>
                        <View style={PAGESTYLE.recordLinkBlock}>
                            <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                            <Popupaddrecording />
                        </View>
                    </View> */}
                    <TouchableOpacity onPress={() => setAddRecording(true)} style={[PAGESTYLE.recordLinkBlock, PAGESTYLE.topSpaceRecording]}>
                        <Image source={Images.RecordIcon} style={PAGESTYLE.recordingLinkIcon} />
                        <Text style={PAGESTYLE.recordLinkText}>Add recording</Text>
                    </TouchableOpacity>
                    <View style={PAGESTYLE.requirementofClass}>
                        <Text style={PAGESTYLE.requireText}>Create Checklist</Text>
                        <View style={PAGESTYLE.checkBoxGroup}>
                            {
                                checkItem.map((item, index) => {
                                    return (
                                        <View style={PAGESTYLE.checkBoxLabelLine}>
                                            <CheckBox
                                                style={PAGESTYLE.checkMark}
                                                value={item.IsCheck}
                                                boxType={'square'}
                                                onCheckColor={COLORS.white}
                                                onFillColor={COLORS.dashboardPupilBlue}
                                                onTintColor={COLORS.dashboardPupilBlue}
                                                tintColor={COLORS.dashboardPupilBlue}
                                                onChange={() => onCheckList(index)}

                                            />
                                            <Text style={PAGESTYLE.checkBoxLabelText}>{item.ItemName}</Text>
                                        </View>
                                    )
                                })
                            }

                            {/* <View style={PAGESTYLE.checkBoxLabelLine}>
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
                            </View> */}
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
                    {/* <View style={PAGESTYLE.uploadBlock}>
                        <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
                    </View> */}

                    <TouchableOpacity onPress={() => addMaterial()} style={[PAGESTYLE.uploadBlock]}>
                        <Image source={Images.DropHolder} style={PAGESTYLE.grpThumbVideo} />
                    </TouchableOpacity>

                    {
                        materialArr.length != 0 ? materialArr.map((item, index) => {
                            return (
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => removeObject(index, item)}>
                                        <Image source={Images.PopupCloseIcon} style={PAGESTYLE.downloadIcon} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null
                    }

                    <View style={PAGESTYLE.thumbVideo}>
                        <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} />
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
            <Popupaddrecording isVisible={isAddRecording} onClose={() => setAddRecording(false)}
                onScreeCamera={() => onScreeCamera()}
                onScreeVoice={() => onScreeVoice()}
                onCameraOnly={() => onCameraOnly()} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>

    );
}
export default TLHomeWork;