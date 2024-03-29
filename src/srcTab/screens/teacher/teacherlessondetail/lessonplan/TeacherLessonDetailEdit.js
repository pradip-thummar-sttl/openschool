import React, { useRef, useState } from "react";
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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../../utils/Colors";
import STYLE from "../../../../../utils/Style";
import PAGESTYLE from "../Style";
import FONTS from "../../../../../utils/Fonts";
import CheckBox from "@react-native-community/checkbox";
import ToggleSwitch from "toggle-switch-react-native";
import {
  isRunningFromVirtualDevice,
  opacity,
  showMessage,
  showMessageWithCallBack,
} from "../../../../../utils/Constant";
import Popupaddrecording from "../../../../component/reusable/popup/Popupaddrecording";
import HeaderUpdate from "./header/HeaderUpdate";
import moment from "moment";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useEffect } from "react";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import { User } from "../../../../../utils/Model";
import MESSAGE from "../../../../../utils/Messages";
import DocumentPicker from "react-native-document-picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera } from "react-native-image-picker";
import TLVideoGallery from "./TeacherLessonVideoGallery";
import RecordScreen from "react-native-record-screen";

import { PERMISSIONS, check, request } from "react-native-permissions";
import ArrowDown from "../../../../../svg/teacher/lessonhwplanner/ArrowDown";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import Participants from "../../../../../svg/teacher/dashboard/Participants";
import Clock from "../../../../../svg/teacher/dashboard/Clock";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import UploadDoc from "../../../../../svg/teacher/lessonhwplanner/UploadDoc";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import Modal from "react-native-modal";
import VideoPopup from "../../../../component/reusable/popup/TabVideoPopup";
import TabVideoPopup from "../../../../component/reusable/popup/TabVideoPopup";

const { DialogModule, Dialog } = NativeModules;

const TLDetailEdit = (props) => {
  const item = useRef(null);
  const t2 = useRef(null);
  const [isVideoGallery, setVideoGallery] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [isHide, action] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [lessonData, setLessonData] = useState(props.data);
  const [isAddRecording, setAddRecording] = useState(false);
  const [cameraResponse, setCameraResponse] = useState({});
  const [isScreenVoiceSelected, setScreenVoiceSelected] = useState(false);
  const [isRecordingStarted, setRecordingStarted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState([]);

  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [videoRecord, setVideoRecord] = useState({});

  var tempPupil = [];

  const openPopup = (item) => {
    setVideoRecord(item);
    setVideoModalVisible(true);
  };

  useEffect(() => {
    console.log("lesson data of edit lesson in tab", lessonData);
    if (itemCheckList.length == 0) {
      setItemCheckList(lessonData.CheckList);
    }
    setPublishBeforeSesson(lessonData.Publish);
    setDeliveredLive(lessonData.LiveSession);
    setVotingEnabled(lessonData.IsVotingEnabled);
    setDescription(lessonData.LessonDescription);
    setLessonTopic(lessonData.LessonTopic);
    setSelectedDate(moment(lessonData.Date).format("DD/MM/yyyy"));
    setSelectedFromTime(lessonData.StartTime);
    setSelectedToTime(lessonData.EndTime);
    setMaterialArr(lessonData.MaterialList);
    setRecordingArr(lessonData.RecordingList);
    setSelectedPupils(lessonData.PupilList);
    setSelectedVideo(lessonData.ChannelList);
    tempPupil = lessonData.PupilList;
  }, [lessonData]);

  const [lessonTopic, setLessonTopic] = useState("");
  const [description, setDescription] = useState("");
  const [materialArr, setMaterialArr] = useState([]);
  const [recordingArr, setRecordingArr] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [itemCheckList, setItemCheckList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/yyyy")
  );

  const [subjects, setSubjects] = useState([]);
  const [participants, setParticipants] = useState([]);
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
  const [selectedParticipants, setSelectedParticipants] = useState(null);
  const [selectedPupils, setSelectedPupils] = useState([]);

  const [IsDeliveredLive, setDeliveredLive] = useState(false);
  const [IsPublishBeforeSesson, setPublishBeforeSesson] = useState(false);
  const [IsVotingEnabled, setVotingEnabled] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [recordingName, setRecordingName] = useState("");

  const [currentRecordMode, setCurrentRecordMode] = useState("isScreen");
  const [videoRecordingResponse, setVideoRecordingResponse] = useState([]);

  const [isRemoveRecordingArr, setRemoveRecordingArr] = useState([]);
  const [isRemoveMaterialArr, setRemoveMaterialArr] = useState([]);
  const [limit, setLimit] = useState("50");

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
    props.goBack();
    return true;
  };

  useEffect(() => {
    if (selectedParticipants != null && selectedParticipants != undefined) {
      getAllPupils();
    }
  }, [selectedParticipants]);

  useEffect(() => {
    Service.get(
      `${EndPoints.GetSubjectBySchoolId}${User.user.SchoolId}`,
      (res) => {
        if (res.code == 200) {
          setSubjects(res.data);
          res.data.forEach((element) => {
            if (element._id == lessonData.SubjectId) {
              setSelectedSubject(element);
              return;
            }
          });
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
        if (res.code == 200) {
          setParticipants(res.data);
          res.data.forEach((element) => {
            if (element._id == lessonData.PupilGroupId) {
              setSelectedParticipants(element);
              return;
            }
          });
        } else {
          showMessage(res.message);
        }
      },
      (err) => {
        console.log("error of GetParticipants", err);
      }
    );
  }, []);
  // useEffect(() => {
  //     setSelectedVideo(props.selectVideo);
  //   }, [props.selectVideo]);
  const getAllPupils = () => {
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
        if (res.code == 200) {
          let newData = [];
          res.data.forEach((element) => {
            element.PupilId = element._id;
            newData.push(element);
          });
          refreshCheckBox(newData);
        } else {
          showMessage(res.message);
        }
      },
      (err) => {
        console.log("error of GetPupilByTeacherId", err);
      }
    );
  };

  const refreshCheckBox = (pupils) => {
    let newDataOfPupils = [];
    pupils.forEach((pupil) => {
      let flag = false;
      tempPupil.forEach((selectedPupil) => {
        if (selectedPupil._id == pupil._id) {
          flag = true;
        }
      });
      if (flag) {
        pupil.isSelected = true;
      } else {
        pupil.isSelected = false;
      }
      newDataOfPupils.push(pupil);
    });
    setPupils(newDataOfPupils);
    showRemainingPupils(newDataOfPupils, selectedParticipants);
  };

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
        (item, index) => item._id !== pupils[_index]._id
      );

      setSelectedPupils(newList);
    } else {
      setSelectedPupils([...selectedPupils, pupils[_index]]);
    }
  };

  const isPupilChecked = (_index) => {
    if (selectedPupils.length > 0) {
      if (selectedPupils.some((ele) => ele._id == pupils[_index]._id)) {
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
    props.navigateScreeCamera();
  };

  const onScreeVoice = () => {
    setAddRecording(false);
    setScreenVoiceSelected(true);
  };

  const startRecording = async () => {
    if (Platform.OS === "android") {
      const res = await check(PERMISSIONS.ANDROID.CAMERA);
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

  const onCameraOnly = () => {
    launchCamera({ mediaType: "video", videoQuality: "low" }, (response) => {
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
    var arr = [];

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
        <View style={PAGESTYLE.hrTagMIddleReverse}>
          <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
            Items your class may need
          </Text>
          <View style={[STYLE.hrCommon, PAGESTYLE.commonWidthSmall]}></View>
        </View>
        <View style={PAGESTYLE.hrCommon2}></View>
        <FlatList
          data={itemCheckList}
          style={{ alignSelf: "center", width: "100%" }}
          renderItem={({ item, index }) => (
            <View style={{ margin: hp(1), justifyContent: "center" }}>
              {/* <Text style={{ fontSize: hp(2), paddingRight: hp(6.5) }}>{item.ItemName}</Text> */}
              <TextInput
                style={{
                  width: "90%",
                  height: 41,
                  fontSize: hp(1.7),
                  fontFamily: FONTS.fontRegular,
                  color: COLORS.darkGray,
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
                  height={hp(2)}
                  width={hp(2)}
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
            marginTop: hp(2),
          }}
        >
          <TextInput
            ref={item}
            returnKeyType={"done"}
            // onSubmitEditing={() => {  }}
            style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
            placeholder="Add items your pupil need to prepare before class"
            autoCapitalize={"sentences"}
            maxLength={40}
            placeholderTextColor={COLORS.menuLightFonts}
            onChangeText={(text) => {
              setNewItem(text);
            }}
            onSubmitEditing={() => {
              item.current.focus();
              pushCheckListItem();
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              right: 10,
              paddingLeft: 12,
              borderLeftColor: COLORS.borderGrp,
              borderLeftWidth: 1,
            }}
            opacity={opacity}
            onPress={() => pushCheckListItem()}
          >
            <Text
              style={{
                paddingVertical: 8,
                fontSize: hp(1.82),
                color: COLORS.darkGray,
              }}
            >
              ADD ITEM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showRemainingPupils = (pupils, item) => {
    // setSelectedPupils([])
    let newArr = [];
    console.log("pupils of editable", pupils);
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
      <View style={[PAGESTYLE.checkBoxGrpWrap, PAGESTYLE.blockSpaceBottom]}>
        <View style={PAGESTYLE.hrTagMIddleReverse}>
          <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
            Add Pupils
          </Text>
          <View style={[STYLE.hrCommon, PAGESTYLE.commonWidthlarge]}></View>
        </View>
        {filteredPupils.length > 0 ? (
          <FlatList
            data={filteredPupils}
            style={{ alignSelf: "center", width: "100%" }}
            renderItem={({ item, index }) => (
              <View
                style={[
                  PAGESTYLE.alignRow,
                  {
                    width: "33.33%",
                    marginHorizontal: 3,
                  },
                ]}
              >
                <CheckBox
                  style={{ ...PAGESTYLE.checkMarkTool }}
                  boxType={"square"}
                  tintColors={{
                    true: COLORS.dashboardPupilBlue,
                    false: COLORS.dashboardPupilBlue,
                  }}
                  onCheckColor={COLORS.white}
                  onFillColor={COLORS.dashboardPupilBlue}
                  onTintColor={COLORS.dashboardPupilBlue}
                  tintColor={COLORS.dashboardPupilBlue}
                  value={isPupilChecked(index)}
                  onValueChange={(newValue) => pushPupilItem(newValue, index)}
                />
                <Text style={PAGESTYLE.checkBoxLabelText}>
                  {item.FirstName} {item.LastName}
                </Text>
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{ alignSelf: "center", fontSize: hp(1.92) }}>
            Pupils not available!
          </Text>
        )}
      </View>
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
            {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrow}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: PAGESTYLE.popUpContent }}>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: hp(1.85) }}
                  value={item}
                  text={item.SubjectName}
                ></MenuOption>
              )}
              style={{ height: hp(22) }}
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
            showRemainingPupils(pupils, item);
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
              style={[PAGESTYLE.dateTimetextdummy, { width: hp(13) }]}
            >
              {selectedParticipants ? selectedParticipants.GroupName : "Select"}
            </Text>
            {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrow}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: PAGESTYLE.popUpContent }}>
            <FlatList
              data={participants}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: hp(1.95) }}
                  value={item}
                  text={item.GroupName}
                ></MenuOption>
              )}
              style={{ height: hp(22) }}
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
            {/* <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrowdatetime}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: PAGESTYLE.popUpContent }}>
            <FlatList
              data={timeSlot}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: hp(1.95) }}
                  value={item}
                  text={item}
                ></MenuOption>
              )}
              style={{ height: hp(22) }}
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
            {/* <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} /> */}
            <ArrowDown
              style={PAGESTYLE.dropDownArrowdatetime}
              height={hp(1.51)}
              width={hp(1.51)}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: PAGESTYLE.popUpContent }}>
            <FlatList
              data={timeSlot}
              renderItem={({ item }) => (
                <MenuOption
                  style={{ padding: hp(1.95) }}
                  value={item}
                  text={item}
                ></MenuOption>
              )}
              style={{ height: hp(22) }}
            />
          </MenuOptions>
        </Menu>
      </View>
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
    // else if (recordingArr.length == 0 && !isRunningFromVirtualDevice) {
    //     showMessage(MESSAGE.recording);
    //     return false;
    // }

    setLoading(true);

    createQBDialog();
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
            (error) => {}
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
      ChannelList: selectedVideo,
    };

    Service.post(
      data,
      `${EndPoints.LessonUpdate}${lessonData._id}`,
      (res) => {
        if (res.code == 200) {
          if (isRemoveRecordingArr.length > 0 || isRemoveMaterialArr.length > 0)
            onRemoveUnselectedFile(res.data._id);
          else uploadMatirial(res.data._id);
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

  const onRemoveUnselectedFile = (lessionId) => {
    let data = {
      deletematerial: isRemoveMaterialArr,
      deleterecording: isRemoveRecordingArr,
      type: "L",
    };
    console.log("data ==============>", data);

    Service.post(
      data,
      `${EndPoints.DeleteRecordingAndMaterial}${lessonData._id}`,
      (res) => {
        if (res.code == 200) {
          uploadMatirial(lessionId);
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

  const uploadMatirial = (lessionId) => {
    let data = new FormData();

    materialArr.forEach((element) => {
      if (element.uri) {
        data.append("materiallist", {
          uri: element.uri,
          name: element.name,
          type: element.type,
        });
      }
    });

    recordingArr.forEach((element) => {
      if (element.uri) {
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
      }
    });

    if (materialArr.length == 0 && recordingArr.length == 0 && lessionId) {
      showMessageWithCallBack(MESSAGE.lessonUpdated, () => {
        // props.route.params.onGoBack();
        props.onRefresh();
        props.goBack();
      });
      setLoading(false);
      return;
    }

    if (data._parts.length == 0) {
      showMessageWithCallBack(MESSAGE.lessonUpdated, () => {
        // props.route.params.onGoBack();
        props.onRefresh();
        props.goBack();
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
          showMessageWithCallBack(MESSAGE.lessonUpdated, () => {
            // props.route.params.onGoBack();
            props.onRefresh();
            props.goBack();
          });
        } else {
          setLoading(false);
          showMessage(res.message);
        }
      },
      (err) => {
        setLoading(false);
        console.log("response of get all lesson error", err);
      }
    );
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
          res.originalname = res.name;

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

    var fname = array[index1]?.filename
      ? array[index1]?.filename
      : array[index1]?.name;

    var arr = fname.split("/");
    setRemoveMaterialArr((isRemoveMaterialArr) => [
      ...isRemoveMaterialArr,
      arr[arr.length - 1],
    ]);

    array.splice(index1, 1);
    setMaterialArr(array);
  };

  const removeRecording = () => {
    var arr = [...recordingArr];
    var fname = arr[0]?.filename ? arr[0]?.filename : arr[0]?.fileName;
    var currentName = fname.split("/");

    setRemoveRecordingArr((isRemoveRecordingArr) => [
      ...isRemoveRecordingArr,
      currentName[currentName.length - 1],
    ]);
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
                  <View style={[PAGESTYLE.field, { width: wp(40) }]}>
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
                        style={[PAGESTYLE.commonInputTextarea, { height: 50 }]}
                        onChangeText={(eventName) =>
                          setRecordingName(eventName)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
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

  const stopRecording = async () => {
    if (recordingName.length > 0) {
      var arr = [];
      const res = await RecordScreen.stopRecording().catch((error) => {
        setRecordingStarted(false);
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

  const onSetDeliverLiveLesson = (isOn) => {
    if (!isOn) {
      setSelectedFromTime("");
      setSelectedToTime("");
    }
    setDeliveredLive(isOn);
  };

  return (
    <View style={PAGESTYLE.mainPage}>
      {isVideoGallery ? (
        <TLVideoGallery
          data={selectedVideo}
          lessonTopic={lessonTopic}
          selectedSubject={selectedSubject.SubjectName}
          goBack={(selectVideo) => {
            setSelectedVideo(selectVideo);
            setVideoGallery(false);
          }}
        />
      ) : (
        <View style={{ ...PAGESTYLE.whiteBg, width: isHide ? "100%" : "78%" }}>
          <HeaderUpdate
            isLoading={isLoading}
            lessonData={lessonData}
            navigateToBack={() => {
              props.onRefresh();
              props.goBack();
            }}
            onAlertPress={() => {
              props.onAlertPress();
            }}
            saveLesson={() => {
              getDataFromQuickBloxAndroid();
            }}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={PAGESTYLE.containerWrap}>
                <View
                  style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}
                >
                  <View style={PAGESTYLE.hrTagMIddleReverse}>
                    <Text
                      style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}
                    >
                      Class details
                    </Text>
                    <View
                      style={[STYLE.hrCommon, PAGESTYLE.commonWidth]}
                    ></View>
                  </View>
                  <View style={PAGESTYLE.timedateGrp}>
                    {subjectsDropDown()}

                    <View style={[PAGESTYLE.dropDownFormInput, PAGESTYLE.time]}>
                      <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
                      <View
                        style={[PAGESTYLE.subjectDateTime, PAGESTYLE.textBox]}
                      >
                        <TextInput
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            t2.current.focus();
                          }}
                          style={[PAGESTYLE.commonInput, PAGESTYLE.textBox]}
                          placeholder="e.g. Grammar"
                          defaultValue={lessonData.LessonTopic}
                          autoCapitalize={"sentences"}
                          maxLength={40}
                          placeholderTextColor={COLORS.greyplaceholder}
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

                  <View style={PAGESTYLE.timedateGrp}>
                    <View
                      style={[PAGESTYLE.dateWhiteBoard, PAGESTYLE.dateField]}
                    >
                      <Text style={PAGESTYLE.subjectText}>Date</Text>
                      <TouchableOpacity onPress={() => showDatePicker()}>
                        <View
                          style={[
                            PAGESTYLE.subjectDateTime,
                            PAGESTYLE.dropDownSmallWrap,
                          ]}
                        >
                          {/* <Image style={PAGESTYLE.calIcon} source={Images.CalenderIconSmall} /> */}
                          <Calender
                            style={PAGESTYLE.calIcon}
                            height={hp(1.76)}
                            width={hp(1.76)}
                          />
                          <Text style={PAGESTYLE.dateTimetextdummy}>
                            {selectedDate ? selectedDate : "Select"}
                          </Text>
                          {/* <Image style={PAGESTYLE.dropDownArrowdatetime} source={Images.DropArrow} /> */}
                          <ArrowDown
                            style={PAGESTYLE.dropDownArrowdatetime}
                            height={hp(1.51)}
                            width={hp(1.51)}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    {IsDeliveredLive && (
                      <>
                        {fromTimeDropDown()}
                        {toTimeDropDown()}
                      </>
                    )}

                    {participantsDropDown()}
                  </View>

                  <View style={PAGESTYLE.lessonDesc}>
                    <Text style={PAGESTYLE.lessonTitle}>
                      Lesson Description
                    </Text>
                    <TextInput
                      ref={t2}
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        item.current.focus();
                      }}
                      multiline={true}
                      autoCapitalize={"sentences"}
                      numberOfLines={4}
                      defaultValue={lessonData.LessonDescription}
                      style={PAGESTYLE.commonInputTextareaNormal}
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
                    onStartScrrenRecording={() => startRecording()}
                    onStopScrrenRecording={() => toggleModal()}
                    onCameraOnly={() => onCameraOnly()}
                    onRemoveRecording={() => removeRecording()}
                  />

                  {itemCheckListView()}

                  {pupilListView()}

                  <View
                    style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}
                  >
                    <View style={PAGESTYLE.hrTagMIddleReverse}>
                      <Text
                        style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}
                      >
                        Class Settings
                      </Text>
                      <View
                        style={[
                          STYLE.hrCommon,
                          PAGESTYLE.commonWidthClassSetting,
                        ]}
                      ></View>
                    </View>

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
                    <UploadDoc
                      style={PAGESTYLE.grpThumbVideo}
                      width={hp(31.64)}
                      height={hp(15.36)}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 35,
                        color: COLORS.lightGrey,
                        fontWeight: "bold",
                      }}
                    >
                      Upload Material
                    </Text>
                  </TouchableOpacity>
                  {materialArr.length != 0 &&
                    materialArr.map((item, index) => {
                      return (
                        <View style={[PAGESTYLE.fileRender]}>
                          <Text numberOfLines={1} style={[PAGESTYLE.fileName]}>
                            {item.originalname}
                          </Text>
                          {item && (
                            <TouchableOpacity
                              onPress={() => removeObject(index, item)}
                              style={[PAGESTYLE.RenderDownload]}
                            >
                              <CloseBlack
                                style={PAGESTYLE.downloadIcon}
                                height={hp(3)}
                                width={hp(3)}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  {console.log(
                    "log of selected video in Flatelist",
                    selectedVideo
                  )}
                  {selectedVideo.length > 0 ? (
                    <FlatList
                      style={{ maxHeight: hp(25) }}
                      data={selectedVideo}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          style={PAGESTYLE.thumbVideo}
                          onPress={() => openPopup(item)}
                        >
                          <Image style={PAGESTYLE.grpThumbVideo} />
                          <TouchableOpacity
                            style={{ position: "absolute", right: 10, top: 10 }}
                            onPress={() => {
                              let selArr = [...selectedVideo];
                              selArr.splice(index, 1);
                              setSelectedVideo(selArr);
                            }}
                          >
                            <CloseBlack
                              style={PAGESTYLE.downloadIcon}
                              height={hp(2.5)}
                              width={hp(2.5)}
                            />
                          </TouchableOpacity>
                          <Text
                            numberOfLines={1}
                            style={PAGESTYLE.smlThumbVideoText}
                          >
                            {item.Title}
                          </Text>
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                    />
                  ) : null}
                  <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                    <TouchableOpacity
                      style={PAGESTYLE.buttonGrp}
                      activeOpacity={opacity}
                      onPress={() => setVideoGallery(true)}
                    >
                      <Text style={STYLE.commonButtonBorderedGreen}>
                        find me learning material
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {lessonData.RecordedLessonName ? (
                    <View style={PAGESTYLE.videoLinkBlockSpaceBottom}>
                      <Text style={PAGESTYLE.requireText}>
                        View lesson recording
                      </Text>
                      <View style={PAGESTYLE.videoLinkBlock}>
                        <PlayBlue
                          style={PAGESTYLE.videoLinkIcon}
                          height={hp(2.38)}
                          width={hp(2.38)}
                        />
                        <Text style={PAGESTYLE.videoLinkText}>
                          {lessonData.RecordedLessonName}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {lessonData.ChatTranscript ? (
                    <View style={PAGESTYLE.fileBoxGrpWrap}>
                      <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                      <View style={PAGESTYLE.fileGrp}>
                        <Text style={PAGESTYLE.fileName}>
                          {lessonData.ChatTranscript}
                        </Text>
                        <TouchableOpacity
                          style={PAGESTYLE.closeNotificationbar}
                        >
                          <PlayBlue
                            style={PAGESTYLE.downloadIcon}
                            height={hp(2)}
                            width={hp(2)}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
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
      )}
      
      <TabVideoPopup
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        item={videoRecord}
      />
    </View>
  );
};
export default TLDetailEdit;
