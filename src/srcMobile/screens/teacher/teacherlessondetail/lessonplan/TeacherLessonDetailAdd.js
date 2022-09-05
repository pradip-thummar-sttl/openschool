import React, { useState, useEffect, useRef } from "react";
import {
  NativeModules,
  View,
  StyleSheet,
  Text,
  TextInput,
  Textarea,
  TouchableOpacity,
  H3,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../../utils/Colors";
import STYLE from "../../../../../utils/Style";
import PAGESTYLE from "../Style";
import CheckBox from "@react-native-community/checkbox";
import ToggleSwitch from "toggle-switch-react-native";
import {
  showMessage,
  msgTopic,
  msgDescription,
  opacity,
  showMessageWithCallBack,
  isRunningFromVirtualDevice,
} from "../../../../../utils/Constant";
import HeaderWhite from "../../../../component/reusable/header/HeaderWhite";
import MESSAGE from "../../../../../utils/Messages";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderAddNew from "./header/HeaderAddNew";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import DocumentPicker from "react-native-document-picker";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { User } from "../../../../../utils/Model";
import RecordScreen from "react-native-record-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { launchCamera } from "react-native-image-picker";
// import ImagePicker from 'react-native-image-picker';
import {
  PERMISSIONS,
  requestMultiple,
  check,
  request,
} from "react-native-permissions";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import ArrowDown from "../../../../../svg/teacher/lessonhwplanner/ArrowDown";
import Participants from "../../../../../svg/teacher/dashboard/Participants";
import Clock from "../../../../../svg/teacher/dashboard/Clock";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import UploadMaterial from "../../../../../svg/teacher/lessonhwplanner/UploadMaterial";
import Modal from "react-native-modal";
import VideoPopup from "../../../../component/reusable/popup/VideoPopup";
const { DialogModule, Dialog } = NativeModules;

const TLDetailAdd = (props) => {
  const t2 = useRef(null);
  const item = useRef(null);
  const [materialArr, setMaterialArr] = useState([]);
  const [recordingArr, setRecordingArr] = useState([]);
  const [isAddRecording, setAddRecording] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [isHide, action] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [lessonTopic, setLessonTopic] = useState("");
  const [description, setDescription] = useState("");

  const [newItem, setNewItem] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [itemCheckList, setItemCheckList] = useState([]);
  const [pupils, setPupils] = useState([]);
  const [filteredPupils, setFilteredPupils] = useState([]);

  const [timeSlot, setTimeSlots] = useState([
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "24:00",
  ]);

  const [selectedSubject, setSelectedSubject] = useState("");

  const [selectedFromTime, setSelectedFromTime] = useState("");
  const [selectedToTime, setSelectedToTime] = useState("");

  const [selectedParticipants, setSelectedParticipants] = useState("");
  const [selectedPupils, setSelectedPupils] = useState("");

  const [IsDeliveredLive, setDeliveredLive] = useState(false);
  const [IsPublishBeforeSesson, setPublishBeforeSesson] = useState(false);
  const [IsVotingEnabled, setVotingEnabled] = useState(false);
  const [isScreenVoiceSelected, setScreenVoiceSelected] = useState(false);
  const [isRecordingStarted, setRecordingStarted] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [recordingName, setRecordingName] = useState("");

  const [currentRecordMode, setCurrentRecordMode] = useState("isScreen");
  const [videoRecordingResponse, setVideoRecordingResponse] = useState([]);
  const [limit, setLimit] = useState("50");

  const [videoMaterial, setVideoMaterial] = useState([]);
  const [videoRecord, setVideoRecord] = useState({});

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    }
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [props.navigation]);

  const handleBackButtonClick = () => {
    props.navigation.goBack();
    return true;
  };
  const openPopup = (item) => {
    setVideoRecord(item);
    setVideoModalVisible(true);
  };
  useEffect(() => {
    Service.get(
      `${EndPoints.GetSubjectBySchoolId}${User.user.SchoolId}`,
      (res) => {
        console.log("response of GetSubjectBySchoolId response", res);
        if (res.code == 200) {
          setSubjects(res.data);
        } else {
          showMessage(res.message);
        }
      },
      (err) => {
        console.log("error of GetSubjectBySchoolId", err);
      }
    );


    Service.get(
      `${EndPoints.GetParticipants}${User.user._id}`,
      (res) => {
        console.log("response of GetParticipants response", res);
        if (res.code == 200) {
          setParticipants(res.data);
        } else {
          showMessage(res.message);
        }
      },
      (err) => {
        console.log("error of GetParticipants", err);
      }
    );
    const data = {
      Searchby: "",
      Filterby: "",
      page: "1",
      limit: limit,
    };
    Service.post(
      data,
      `${EndPoints.GetPupilByTeacherId}${User.user._id}`,
      (res) => {
        console.log("response of GetPupilByTeacherId response", res);
        if (res.code == 200) {
          let newData = [];
          res.data.forEach((element) => {
            element.PupilId = element._id;
            newData.push(element);
          });
          setPupils(newData);
        } else {
          showMessage(res.message);
        }
      },
      (err) => {
        console.log("error of GetPupilByTeacherId", err);
      }
    );
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format("DD/MM/yyyy"));
    hideDatePicker();
  };

  const addMaterial = () => {
    var arr = [...materialArr];
    try {
      DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.xls,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
        ],
      }).then((results) => {
        for (const res of results) {
          arr.push(res);
        }
        setMaterialArr(arr);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const removeObject = (index1, item) => {
    var array = [...materialArr];
    array.splice(index1, 1);
    setMaterialArr(array);
  };

  const pushCheckListItem = () => {
    if (!newItem.trim()) {
      showMessage(MESSAGE.addItem);
      return;
    }

    let flag = false;
    itemCheckList.forEach((element) => {
      if (element.ItemName.toLowerCase() == newItem.trim().toLowerCase()) {
        flag = true;
        return;
      }
    });

    if (flag) {
      showMessage(MESSAGE.duplicateItem);
      return;
    }

    let temp = {
      ItemName: newItem,
    };
    setItemCheckList([...itemCheckList, temp]);
    item.current.clear();
    setNewItem("");
  };

  const removeCheckListItem = (_index) => {
    const newList = itemCheckList.filter((item, index) => index !== _index);
    setItemCheckList(newList);
  };

  const pushPupilItem = (isSelected, _index) => {
    if (!isSelected) {
      const newList = selectedPupils.filter(
        (item, index) => item._id !== filteredPupils[_index]._id
      );
      setSelectedPupils(newList);
    } else {
      setSelectedPupils([...selectedPupils, filteredPupils[_index]]);
    }
  };

  const isPupilChecked = (_index) => {
    if (selectedPupils.length > 0) {
      if (selectedPupils.some((ele) => ele._id == filteredPupils[_index]._id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onScreeCamera = () => {
    setAddRecording(false);
    props.navigation.navigate("ScreenAndCameraRecording");
  };

  const onScreeVoice = () => {
    setAddRecording(false);
    setScreenVoiceSelected(true);
  };

  const startRecording = async () => {
    if (Platform.OS === "android") {
      const res = await check(PERMISSIONS.ANDROID.CAMERA);
      console.log("tldetail add check permission", res);
      if (res === "granted") {
        setRecordingStarted(true);
        RecordScreen.startRecording().catch((error) =>
          setRecordingStarted(false)
        );
      } else {
        const res2 = await request(PERMISSIONS.ANDROID.CAMERA);
        if (res2 === "granted") {
          setRecordingStarted(true);
          RecordScreen.startRecording().catch((error) =>
            setRecordingStarted(false)
          );
        } else {
          showMessage("We need permission to access  camera");
        }
      }
    } else {
      const res = await check(PERMISSIONS.IOS.CAMERA);
      if (res === "granted") {
        setRecordingStarted(true);
        RecordScreen.startRecording().catch((error) =>
          setRecordingStarted(false)
        );
      } else {
        const res2 = await request(PERMISSIONS.IOS.CAMERA);

        if (res2 === "granted") {
          setRecordingStarted(true);
          RecordScreen.startRecording().catch((error) =>
            setRecordingStarted(false)
          );
        } else {
          showMessage("We need permission to access  camera");
        }
      }
    }
  };

  const stopRecording = async () => {
    if (recordingName.length > 0) {
      var arr = [];
      const res = await RecordScreen.stopRecording().catch((error) => {
        setRecordingStarted(false);
        console.warn(error);
      });
      if (res) {
        setRecordingStarted(false);
        const url = res.result.outputURL;
        let ext = url.split(".");

        let obj = {
          uri: Platform.OS == "android" ? "file:///" + url : url,
          originalname: `${recordingName}.mp4`,
          fileName: `${recordingName}.mp4`,
          type: "video/" + (ext.length > 0 ? ext[1] : "mp4"),
        };
        arr.push(obj);
        setRecordingArr(arr);
        setScreenVoiceSelected(false);
        setRecordingName("");
        toggleModal();
      }
    } else {
      showMessage("Please provide recording name proper");
    }
  };

  const onCameraOnly = () => {
    const options = {
      mediaType: "video",
      cameraType: "back",
    };

    launchCamera(options, (response) => {
      // Same code as in above section!
      if (response.errorCode) {
        showMessage(response.errorCode);
      } else if (response.didCancel) {
      } else {
        setVideoRecordingResponse(response);
        setCurrentRecordMode("isCamera");
        toggleModal();
      }
    });
    setAddRecording(false);
  };

  const saveCameraData = () => {
    var arr = [...recordingArr];

    if (recordingName.length > 0) {
      const url = videoRecordingResponse.uri;
      let ext = url.split(".");

      let obj = {
        uri: url,
        originalname: `${recordingName}.mp4`,
        fileName: `${recordingName}.mp4`,
        type: "video/" + (ext.length > 0 ? ext[1] : "mp4"),
      };
      arr.push(obj);
      setRecordingArr(arr);
      setRecordingName("");
      toggleModal();
    } else {
      showMessage("Please provide recording name proper");
    }
  };

  const editNewText = (text, index) => {
    let newArray = [...itemCheckList];
    newArray[index].ItemName = text;
    setItemCheckList(newArray);
  };

  const itemCheckListView = () => {
    return (
      <View style={[PAGESTYLE.requirementofClass, PAGESTYLE.blockSpaceBottom]}>
        <View style={STYLE.hrCommon}></View>
        <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
          Items your class may need
        </Text>
        <FlatList
          data={itemCheckList}
          style={{ alignSelf: "center", width: "100%", bottom: hp(1) }}
          renderItem={({ item, index }) => (
            <View
              style={{
                margin: hp(0.5),
                justifyContent: "center",
                paddingBottom: 8,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.dashboardBorder,
              }}
            >
              {/* <Text style={{ fontSize: Platform.OS == 'android' ? hp(1.7) : hp(1.85) }}>{item.ItemName}</Text> */}
              <TextInput
                style={{
                  width: "90%",
                  height: 41,
                  fontSize: Platform.OS == "android" ? hp(1.7) : hp(1.85),
                }}
                onChangeText={(text) => {
                  editNewText(text, index);
                }}
                value={item.ItemName}
              />
              <TouchableOpacity
                style={PAGESTYLE.userIcon1Parent}
                activeOpacity={opacity}
                onPress={() => {
                  removeCheckListItem(index);
                }}
              >
                {/* <Image style={PAGESTYLE.userIcon1} source={Images.PopupCloseIcon} /> */}
                <CloseBlack
                  style={PAGESTYLE.userIcon1}
                  height={hp(2.5)}
                  width={hp(2.5)}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            ...PAGESTYLE.subjectDateTime,
            ...PAGESTYLE.textBox1,
            justifyContent: "center",
          }}
        >
          <TextInput
            ref={item}
            returnKeyType={"done"}
            style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
            placeholder="Add items pupil may need"
            autoCapitalize={"sentences"}
            maxLength={40}
            placeholderTextColor={COLORS.menuLightFonts}
            onChangeText={(text) => {
              setNewItem(text);
            }}
            onSubmitEditing={() => pushCheckListItem()}
          />

          <TouchableOpacity
            style={{ alignSelf: "center", position: "absolute", right: hp(1) }}
            opacity={opacity}
            onPress={() => pushCheckListItem()}
          >
            <Text style={{ fontSize: hp(1.6), right: hp(0.5) }}>ADD ITEM</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                </TouchableOpacity> */}
      </View>
    );
  };

  const showRemainingPupils = (item) => {
    setSelectedPupils([]);
    let newArr = [];
    pupils.forEach((ele1) => {
      let flag = false;
      item.PupilList.forEach((ele2) => {
        if (ele1.PupilId == ele2.PupilId) {
          flag = true;
        }
      });
      if (!flag) {
        newArr.push(ele1);
      }
    });
    setFilteredPupils(newArr);
  };

  const pupilListView = () => {
    return (
      <>
        {filteredPupils.length > 0 ? (
          <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
            <View style={STYLE.hrCommon}></View>
            <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
              Add pupils
            </Text>
            {/* <TouchableOpacity style={PAGESTYLE.addItem}>
                    <Image source={Images.AddIcon} style={PAGESTYLE.addIcon} />
                    <Text style={PAGESTYLE.addItemText}>Add another item</Text>
                </TouchableOpacity> */}
            <FlatList
              data={filteredPupils}
              style={{
                alignSelf: "center",
                width: "100%",
                bottom: 20,
                paddingStart: 5,
              }}
              renderItem={({ item, index }) => (
                <View style={PAGESTYLE.alignRow}>
                  <CheckBox
                    style={PAGESTYLE.checkMark}
                    boxType={"square"}
                    onCheckColor={COLORS.white}
                    tintColors={{
                      true: COLORS.dashboardPupilBlue,
                      false: COLORS.dashboardPupilBlue,
                    }}
                    onFillColor={COLORS.dashboardPupilBlue}
                    onTintColor={COLORS.dashboardPupilBlue}
                    tintColor={COLORS.dashboardPupilBlue}
                    value={isPupilChecked(index)}
                    // tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                    onValueChange={(newValue) => {
                      pushPupilItem(newValue, index);
                    }}
                  />
                  <Text style={PAGESTYLE.checkBoxLabelText}>
                    {item.FirstName} {item.LastName}
                  </Text>
                </View>
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
      </>
    );
  };

  const subjectsDropDown = () => {
    return (
      <View style={PAGESTYLE.dropDownFormInput}>
        <Text style={PAGESTYLE.subjectText}>Subject</Text>

        <Menu onSelect={(item) => setSelectedSubject(item)}>
          <MenuTrigger style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDown]}>
            <Text style={PAGESTYLE.dateTimetextdummy}>
              {selectedSubject ? selectedSubject.SubjectName : "Select Subject"}
            </Text>
            <ArrowDown
              style={PAGESTYLE.dropDownArrow}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: { fontSize: hp(2) } }}>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: hp(1.2) }}
                  value={item}
                  text={item.SubjectName}
                ></MenuOption>
              )}
              style={{ height: hp(20) }}
            />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const participantsDropDown = () => {
    return (
      <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.participantsField]}>
        <Text style={PAGESTYLE.subjectText}>Participants</Text>
        <Menu
          onSelect={(item) => {
            setSelectedParticipants(item);
            showRemainingPupils(item);
          }}
        >
          <MenuTrigger
            style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}
          >
            {/* <Image style={PAGESTYLE.calIcon} source={Images.Group} /> */}
            <Participants
              style={PAGESTYLE.calIcon}
              height={hp(1.76)}
              width={hp(1.76)}
            />
            <Text
              numberOfLines={1}
              style={[PAGESTYLE.dateTimetextdummy, { width: wp(22) }]}
            >
              {selectedParticipants ? selectedParticipants.GroupName : "Select"}
            </Text>
            {/* <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrowdatetime}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0) } }}>
            <FlatList
              data={participants}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: 15 }}
                  value={item}
                  text={item.GroupName}
                ></MenuOption>
              )}
              style={{ height: hp(20) }}
            />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const fromTimeDropDown = () => {
    return (
      <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
        <Text style={PAGESTYLE.subjectText}>Time</Text>
        <Menu onSelect={(item) => setSelectedFromTime(item)}>
          <MenuTrigger
            style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}
          >
            {/* <Image style={PAGESTYLE.timeIcon} source={Images.Clock} /> */}
            <Clock
              style={PAGESTYLE.timeIcon}
              height={hp(1.76)}
              width={hp(1.76)}
            />
            <Text style={PAGESTYLE.dateTimetextdummy}>
              {selectedFromTime ? selectedFromTime : "From"}
            </Text>
            {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrow}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0) } }}>
            <FlatList
              data={timeSlot}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ fpadding: hp(1) }}
                  value={item}
                  text={item}
                ></MenuOption>
              )}
              style={{ height: hp(20) }}
            />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const toTimeDropDown = () => {
    return (
      <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
        <Text style={PAGESTYLE.subjectText}> </Text>
        <Menu onSelect={(item) => setSelectedToTime(item)}>
          <MenuTrigger
            style={[PAGESTYLE.subjectDateTime, PAGESTYLE.dropDownSmallWrap]}
          >
            {/* <Image style={PAGESTYLE.timeIcon} source={Images.Clock} /> */}
            <Clock
              style={PAGESTYLE.timeIcon}
              height={hp(1.76)}
              width={hp(1.76)}
            />
            <Text style={PAGESTYLE.dateTimetextdummy}>
              {selectedToTime ? selectedToTime : "To"}
            </Text>
            {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrow}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: { fontSize: hp(2.0) } }}>
            <FlatList
              data={timeSlot}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ fpadding: hp(1) }}
                  value={item}
                  text={item}
                ></MenuOption>
              )}
              style={{ height: hp(20) }}
            />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const createQBDialog = () => {
    if (isRunningFromVirtualDevice) {
      saveLesson("RUNNING_FROM_VIRTUAL_DEVICE");
    } else {
      let userIDs = [],
        userNames = [],
        names = [];

      selectedParticipants.PupilList.forEach((pupil) => {
        userIDs.push(pupil.QBUserID);
        userNames.push(pupil.Email);
        names.push(pupil.PupilName);
      });

      selectedPupils.forEach((pupil) => {
        userIDs.push(pupil.QBUserID);
        userNames.push(pupil.Email);
        names.push(pupil.FirstName + " " + pupil.LastName);
      });
      try {
        if (Platform.OS == "android") {
          DialogModule.qbCreateDialog(
            userIDs,
            userNames,
            names,
            (error, ID) => {
              if (ID && ID != "" && ID != null && ID != undefined) {
                saveLesson(ID);
              } else {
                setLoading(false);
                showMessage("Sorry, we are unable to add lesson!");
              }
            }
          );
        } else {
          Dialog.qbCreateDialogtags(
            userIDs,
            userNames,
            names,
            (ID) => {
              if (ID && ID != "" && ID != null && ID != undefined) {
                saveLesson(ID);
              } else {
                setLoading(false);
                showMessage("Sorry, we are unable to add lesson!");
              }
            },
            (error) => { }
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const saveLesson = (ID) => {
    let data = {
      SubjectId: selectedSubject._id,
      LessonTopic: lessonTopic,
      LessonDate: moment(selectedDate, "DD/MM/yyyy").format("yyyy-MM-DD"),
      LessonEndTime: selectedToTime,
      LessonStartTime: selectedFromTime,
      PupilGroupId: selectedParticipants._id,
      LessonDescription: description,
      RecordingName: "",
      RecordedLessonName: "",
      ChatTranscript: "",
      IsDeliveredLive: IsDeliveredLive,
      IsPublishBeforeSesson: IsPublishBeforeSesson,
      IsVotingEnabled: IsVotingEnabled,
      CreatedBy: User.user._id,
      PupilList: selectedPupils,
      CheckList: itemCheckList,
      QBDilogID: ID,
      ChannelList: videoMaterial,
    };

    Service.post(
      data,
      `${EndPoints.Lesson}`,
      (res) => {
        if (res.code == 200) {
          console.log("response of save lesson", res);
          uploadMatirial(res.data._id);
        } else {
          showMessage(res.message);
          setLoading(false);
        }
      },
      (err) => {
        console.log("response of get all lesson error", err);
        setLoading(false);
      }
    );
  };

  const uploadMatirial = (lessionId) => {
    let data = new FormData();

    materialArr.forEach((element) => {
      data.append("materiallist", {
        uri: element.uri,
        name: element.name,
        type: element.type,
      });
    });

    recordingArr.forEach((element) => {
      let ext = element.fileName.split(".");

      if (Platform.OS === "ios") {
        ext = element.uri.split(".");
      }

      data.append("recording", {
        uri: element.uri,
        name: element.fileName,
        // name: 'MY_RECORDING.mp4',
        type: "video/" + (ext.length > 0 ? ext[1] : "mp4"),
      });
    });

    if (materialArr.length == 0 && recordingArr.length == 0 && lessionId) {
      showMessageWithCallBack(MESSAGE.lessonAdded, () => {
        props.route.params.onGoBack();
        props.navigation.goBack();
      });
      setLoading(false);
      return;
    }

    Service.postFormData(
      data,
      `${EndPoints.LessonMaterialUpload}${lessionId}`,
      (res) => {
        if (res.code == 200) {
          setLoading(false);
          console.log("response of save lesson", res);
          // setDefaults()
          showMessageWithCallBack(MESSAGE.lessonAdded, () => {
            props.route.params.onGoBack();
            props.navigation.goBack();
          });
        } else {
          showMessage(res.message);
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        console.log("response of get all lesson error", err);
      }
    );
  };

  const removeRecording = () => {
    var arr = [...recordingArr];
    arr.splice(0, 1);
    setRecordingArr(arr);
  };

  const toggleModal = () => {
    setRecordingStarted(false);
    setModalVisible(!isModalVisible);
  };

  const renderRecordingNamePopup = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <KeyboardAwareScrollView>
          <View style={PAGESTYLE.popupCard}>
            <TouchableOpacity
              style={PAGESTYLE.cancelButton}
              onPress={toggleModal}
            >
              <CloseBlack
                style={STYLE.cancelButtonIcon}
                height={hp(2.94)}
                width={hp(2.94)}
              />
            </TouchableOpacity>
            <View style={PAGESTYLE.popupContent}>
              <View style={PAGESTYLE.tabcontent}>
                <View style={PAGESTYLE.beforeBorder}>
                  <Text h2 style={PAGESTYLE.titleTab}>
                    Add a recording name
                  </Text>
                  <View style={[PAGESTYLE.field, { width: wp(80) }]}>
                    <Text label style={STYLE.labelCommon}>
                      For what recording is?
                    </Text>
                    <View
                      style={[
                        PAGESTYLE.subjectDateTime,
                        { height: 50, width: "100%" },
                      ]}
                    >
                      <TextInput
                        multiline={false}
                        placeholder="Name of event"
                        value={recordingName}
                        placeholderStyle={PAGESTYLE.somePlaceholderStyle}
                        placeholderTextColor={COLORS.popupPlaceHolder}
                        style={[
                          PAGESTYLE.commonInputTextarea,
                          { height: 50, width: "89%" },
                        ]}
                        onChangeText={(eventName) =>
                          setRecordingName(eventName)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                // onPress={() => { stopRecording() }}
                onPress={() => {
                  currentRecordMode === "isScreen"
                    ? stopRecording()
                    : saveCameraData();
                }}
                style={PAGESTYLE.buttonGrp}
                activeOpacity={opacity}
              >
                <Text style={[STYLE.commonButtonGreenDashboardSide]}>save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  const getDataFromQuickBloxAndroid = () => {
    if (!selectedSubject) {
      showMessage(MESSAGE.subject);
      return false;
    } else if (!lessonTopic.trim()) {
      showMessage(MESSAGE.topic);
      return false;
    } else if (!selectedDate) {
      showMessage(MESSAGE.date);
      return false;
    } else if (!selectedFromTime && IsDeliveredLive != "") {
      showMessage(MESSAGE.fromTime);
      return false;
    } else if (!selectedToTime && IsDeliveredLive != "") {
      showMessage(MESSAGE.toTime);
      return false;
    } else if (
      timeSlot.indexOf(selectedToTime) <= timeSlot.indexOf(selectedFromTime) &&
      IsDeliveredLive != ""
    ) {
      showMessage(MESSAGE.invalidTo);
      return false;
    } else if (
      timeSlot.indexOf(selectedToTime) - timeSlot.indexOf(selectedFromTime) >
      4 &&
      IsDeliveredLive != ""
    ) {
      showMessage(MESSAGE.invalidFrom);
      return false;
    } else if (!selectedParticipants) {
      showMessage(MESSAGE.participants);
      return false;
    } else if (!description.trim()) {
      showMessage(MESSAGE.description);
      return false;
    }
    setLoading(true);
    createQBDialog();
  };

  const onSetDeliverLiveLesson = (isOn) => {
    if (!isOn) {
      setSelectedFromTime("");
      setSelectedToTime("");
    }
    setDeliveredLive(isOn);
  };

  return (
    <View style={PAGESTYLE.mainPage}>
      <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? "100%" : "100%" }}>
        <HeaderAddNew
          isLoading={isLoading}
          navigateToBack={() => {
            props.route.params.onGoBack();
            props.navigation.goBack();
          }}
          saveLesson={() => {
            getDataFromQuickBloxAndroid();
          }}
        />

        <KeyboardAwareScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={PAGESTYLE.containerWrap}>
              <View style={PAGESTYLE.teacherDetailLeft}>
                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
                  Class details
                </Text>
                <View style={PAGESTYLE.timedateGrp}>
                  {subjectsDropDown()}

                  <View style={[PAGESTYLE.dropDownFormInput]}>
                    <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                    <View style={[PAGESTYLE.subjectDateTime]}>
                      <TextInput
                        returnKeyType={"next"}
                        onSubmitEditing={() => {
                          t2.current.focus();
                        }}
                        style={{ ...PAGESTYLE.commonInput, width: "100%" }}
                        placeholder="e.g. Grammar, Fractions, etc"
                        autoCapitalize={"sentences"}
                        maxLength={40}
                        placeholderTextColor={COLORS.menuLightFonts}
                        onChangeText={(text) => setLessonTopic(text)}
                      />
                    </View>
                  </View>
                </View>

                <View style={PAGESTYLE.toggleGrp}>
                  <Text style={PAGESTYLE.toggleText}>
                    Will this lesson be delivered live
                  </Text>
                  <ToggleSwitch
                    onColor={COLORS.dashboardGreenButton}
                    isOn={IsDeliveredLive}
                    onToggle={(isOn) => onSetDeliverLiveLesson(isOn)}
                  />
                </View>

                <View style={[PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow]}>
                  <View style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.timeField]}>
                    <Text style={PAGESTYLE.subjectText}>Date</Text>
                    <TouchableOpacity onPress={() => showDatePicker()}>
                      <View
                        style={[
                          PAGESTYLE.subjectDateTime,
                          PAGESTYLE.dropDownSmallWrap,
                        ]}
                      >
                        <Calender
                          style={PAGESTYLE.calIcon}
                          height={hp(1.76)}
                          width={hp(1.76)}
                        />
                        <View style={PAGESTYLE.subjectDateTimePicker}>
                          <Text style={PAGESTYLE.dateTimetextdummy}>
                            {selectedDate ? selectedDate : "Select"}
                          </Text>
                          <ArrowDown
                            style={PAGESTYLE.dropDownArrowdatetime}
                            height={hp(1.51)}
                            width={hp(1.51)}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {participantsDropDown()}
                </View>
                {IsDeliveredLive && (
                  <View
                    style={[PAGESTYLE.timedateGrp, PAGESTYLE.timedateGrpRow]}
                  >
                    {fromTimeDropDown()}
                    {toTimeDropDown()}
                  </View>
                )}

                <View style={PAGESTYLE.lessonDesc}>
                  <Text style={PAGESTYLE.lessonTitle}>Lesson Description</Text>
                  <TextInput
                    ref={t2}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      item.current.focus();
                    }}
                    multiline={true}
                    autoCapitalize={"sentences"}
                    numberOfLines={4}
                    placeholder="Briefly explain what the lesson is about"
                    style={PAGESTYLE.commonInputTextareaBoldGrey}
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>
                <Popupaddrecording
                  recordingArr={recordingArr}
                  isVisible={isAddRecording}
                  isRecordingStarted={isRecordingStarted}
                  isScreenVoiceSelected={isScreenVoiceSelected}
                  onClose={() => setAddRecording(false)}
                  onScreeCamera={() => onScreeCamera()}
                  onScreeVoice={() => onScreeVoice()}
                  onRemoveRecording={() => removeRecording()}
                  onStartScrrenRecording={() => startRecording()}
                  onStopScrrenRecording={() => toggleModal()}
                  onCameraOnly={() => onCameraOnly()}
                />

                {pupilListView()}
                {itemCheckListView()}

                <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
                  <View style={STYLE.hrCommon}></View>
                  <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
                    Class Settings
                  </Text>
                  <View style={PAGESTYLE.toggleGrp}>
                    <Text style={PAGESTYLE.toggleText}>
                      Publish lesson before live lesson
                    </Text>
                    <ToggleSwitch
                      onColor={COLORS.dashboardGreenButton}
                      isOn={IsPublishBeforeSesson}
                      onToggle={(isOn) => setPublishBeforeSesson(isOn)}
                    />
                  </View>
                  {/* <View style={PAGESTYLE.toggleGrp}>
                                        <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                                        <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={IsVotingEnabled} onToggle={isOn => setVotingEnabled(isOn)} />
                                    </View> */}
                </View>
              </View>
              <View style={PAGESTYLE.rightSideBar}>
                <View style={PAGESTYLE.fileBoxGrpWrap}>
                  <Text style={PAGESTYLE.requireText}>Learning material</Text>
                  <Text style={PAGESTYLE.rightBlockText}>
                    Drop links, videos, or documents here or find relevant
                    materials with our clever AI
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => addMaterial()}
                  style={[PAGESTYLE.uploadBlock]}
                >
                  <UploadMaterial
                    style={PAGESTYLE.mobileUploadLink}
                    height={50}
                    width={"100%"}
                  />
                </TouchableOpacity>

                {materialArr.length != 0 &&
                  materialArr.map((item, index) => {
                    return (
                      <View style={PAGESTYLE.fileRender}>
                        <Text
                          style={{ ...PAGESTYLE.fileName, width: wp(74) }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeObject(index, item)}
                          style={[
                            PAGESTYLE.RenderDownload,
                            { marginLeft: hp(0.4) },
                          ]}
                        >
                          <CloseBlack
                            style={PAGESTYLE.downloadIcon}
                            height={hp(2)}
                            width={hp(2)}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                <FlatList
                  data={videoMaterial}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={PAGESTYLE.thumbVideo} onPress={() => openPopup(item)}>
                      <Image
                        // source={Images.VideoSmlThumb}
                        style={PAGESTYLE.smlThumbVideo}
                      />
                      <TouchableOpacity style={{ position: 'absolute', right: 10, top: 5 }} onPress={() => {
                        let selArr = [...videoMaterial];
                        selArr.splice(index, 1);
                        setVideoMaterial(selArr);
                      }}>
                        <CloseBlack
                          style={[PAGESTYLE.downloadIcon]}
                          height={hp(2.5)}
                          width={hp(2.5)}
                        />
                      </TouchableOpacity>
                      <Text style={PAGESTYLE.smlThumbVideoText}>
                        {item.ChannelTitle}
                      </Text>
                    </TouchableOpacity>
                  )}
                  numColumns={2}
                />

                <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>

                  {selectedSubject != "" && lessonTopic != "" &&
                    <TouchableOpacity style={PAGESTYLE.buttonGrp} activeOpacity={opacity} onPress={() => {
                      props.navigation.navigate("TLVideoGallery", { data: { videoMaterial }, goBack: (selectItem) => { setVideoMaterial(selectItem), props.navigation.goBack(); }, })
                    }}>
                      <Text style={STYLE.commonButtonBorderedGreen}>
                        find me learning material
                      </Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
          </ScrollView>
          {renderRecordingNamePopup()}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </KeyboardAwareScrollView>
      </View>
      <VideoPopup
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        item={videoRecord}
      />
    </View>
  );
};
export default TLDetailAdd;
