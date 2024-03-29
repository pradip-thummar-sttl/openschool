import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
  Platform,
} from "react-native";
// import STYLE from '../../../../utils/Style';
import PAGESTYLE from "./Style";
// import Sidebar from "../../../component/reusable/sidebar/Sidebar";

import {
  opacity,
  showMessage,
  showMessageWithCallBack,
} from "../../../../../utils/Constant";
// import TLDetail from "./lessonplan/TeacherLessonDetail";
import TLHomeWork from "./Slessonhomework/LessonHW";
import TLHomeWorkSubmitted from "./Shomeworksubmitted/HWSubmitted";
TLHomeWork;
// import HeaderLP from "./header/HeaderLP";
// import HeaderHW from "./header/HeaderHW";
// import HeaderHWS from "./header/HeaderHWS";
import { Service } from "../../../../../service/Service";
import { Addhomework, User } from "../../../../../utils/Model";
import { EndPoints } from "../../../../../service/EndPoints";
import { TextInput } from "react-native-gesture-handler";
// import Images from '../../../../utils/Images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
// import COLORS from "../../../../../utils/Colors";
import MESSAGE from "../../../../../utils/Messages";
import ScreenAndCameraRecording from "../../../../../srcTab/screens/teacher/screenandcamera/ScreenandCamera";
// ../../../../src/srcTab/screens/teacher/screenandcamera/ScreenandCamera
import TLVideoGallery from "./sLessonPlan/STeacherLessonVideoGallery";
import moment from "moment";
import HeaderSLP from "./STheader/HeaderSLP";
import HeaderSHW from "./STheader/HeaderSHW";
import HeaderSHWS from "./STheader/HeaderSHWS";
import STLDetail from "./sLessonPlan/STeacherLessonDetail";

const SchoolTeacherLessonDetail = (props) => {
  const [isHide, action] = useState(true);
  const [tabIndex, setSelectedTab] = useState(0);
  const [lessonData, setLessonData] = useState(props.route.params.data);
  const [isVisiblePopup, setVisiblePopup] = useState(false);
  const [isHomeworkLoading, setHomeworkLoading] = useState(false);
  const [updateFlag, setUpdate] = useState(false);

  const [isScreenAndCameraRecording, setScreenAndCameraRecording] = useState(
    false
  );
  const [isTLVideoGallery, setTLVideoGallery] = useState(false);

  const [isSearchActive, setSearchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [filterBy, setFilterBy] = useState("Date");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isHSDataChanged, setHSDataChanged] = useState(false);

  const [videoMaterial, setVideoMaterial] = useState([]);

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
  useEffect(() => {
    if (!isSearchActive && tabIndex == 2) {
      // this.textInput.clear()
    }
  }, [isSearchActive]);

  const isFiedlsValidated = () => {
    console.log("Addhomework", Addhomework, User.user._id);
    if (!Addhomework.HomeworkDescription) {
      showMessage(MESSAGE.description);
      return;
    } else if (Addhomework.CheckList.length == 0) {
      showMessage(MESSAGE.checkList);
      return;
    }

    setVisiblePopup(true);
  };

  const onAddHomework = () => {
    setHomeworkLoading(true);
    const data = {
      LessonId: lessonData._id,
      IsIncluded: Addhomework.IsIncluded,
      DueDate: moment(Addhomework.DueDate, "DD/MM/yyyy").format("yyyy-MM-DD"),
      HomeworkDescription: Addhomework.HomeworkDescription,
      CreatedBy: User.user._id,
      CheckList: Addhomework.CheckList,
    };
    console.log("add homework data", data);
    if (Addhomework.IsUpdate) {
      Service.post(
        data,
        `${EndPoints.HomeworkUpdate}/${Addhomework.HwId}`,
        (res) => {
          console.log("res", res);
          if (res.flag) {
            // setHomeworkLoading(false)
            // setVisiblePopup(false)
            // showMessage('Homework updated successfully')

            uploadMatirial(res.data._id);
          } else {
            setHomeworkLoading(false);
            setVisiblePopup(false);
            showMessage(res.message);
          }
        },
        (err) => {
          console.log("response of update homework err", err);
          setHomeworkLoading(false);
          setVisiblePopup(false);
        }
      );
    } else {
      Service.post(
        data,
        EndPoints.Homework,
        (res) => {
          // setHomeworkLoading(false)
          // setVisiblePopup(false)
          // showMessage('Homework added successfully')
          console.log("res First", res);
          uploadMatirial(res.data._id);
        },
        (err) => {
          console.log("response of add homework err", err);
          setHomeworkLoading(false);
          setVisiblePopup(false);
        }
      );
    }
  };

  const uploadMatirial = (homeworkId) => {
    let data = new FormData();

    Addhomework.MaterialArr.forEach((element) => {
      if (element.uri) {
        data.append("materiallist", {
          uri: element.uri,
          name: element.name,
          type: element.type,
        });
      }
    });

    Addhomework.RecordingArr.forEach((element) => {
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

    if (
      Addhomework.MaterialArr.length == 0 &&
      Addhomework.RecordingArr.length == 0
    ) {
      let msg;
      if (Addhomework.IsUpdate) {
        msg = MESSAGE.homeworkUpdated;
      } else {
        msg = MESSAGE.homeworkAdded;
      }
      showMessageWithCallBack(msg, () => {
        props.route.params.onGoBack();
        props.navigation.goBack();
      });
      setHomeworkLoading(false);
      setVisiblePopup(false);
      return;
    }

    if (data._parts.length == 0) {
      let msg;
      if (Addhomework.IsUpdate) {
        msg = MESSAGE.homeworkUpdated;
      } else {
        msg = MESSAGE.homeworkAdded;
      }
      showMessageWithCallBack(msg, () => {
        props.route.params.onGoBack();
        props.navigation.goBack();
      });
      setHomeworkLoading(false);
      setVisiblePopup(false);
      return;
    }

    console.log(
      "data",
      data._parts,
      homeworkId,
      Addhomework.MaterialArr.length,
      Addhomework.RecordingArr.length
    );

    Service.postFormData(
      data,
      `${EndPoints.HomeworkMaterialUpload}${homeworkId}`,
      (res) => {
        console.log("res11", res);
        if (res.code == 200) {
          setHomeworkLoading(false);
          setVisiblePopup(false);
          // setDefaults()
          let msg;
          if (Addhomework.IsUpdate) {
            msg = MESSAGE.homeworkUpdated;
          } else {
            msg = MESSAGE.homeworkAdded;
          }
          showMessageWithCallBack(msg, () => {
            props.route.params.onGoBack();
            props.navigation.goBack();
          });
        } else {
          showMessage(res.message);
          setHomeworkLoading(false);
          setVisiblePopup(false);
        }
      },
      (err) => {
        setHomeworkLoading(false);
        setVisiblePopup(false);
        console.log("response of get all lesson error", err);
      }
    );
  };

  return (
    <View style={PAGESTYLE.mainPage}>
      {isScreenAndCameraRecording ? (
        <ScreenAndCameraRecording
          goBack={() => setScreenAndCameraRecording(false)}
        />
      ) : isTLVideoGallery ? (
        <TLVideoGallery goBack={() => setTLVideoGallery(false)} />
      ) : (
        <View style={{ width: isHide ? "100%" : "100%" }}>
          <HeaderSLP
            lessonData={lessonData}
            date={lessonData.Date}
            navigateToBack={() => props.navigation.goBack()}
            onAlertPress={() =>
              props.navigation.navigate("NotificationDrawer", {
                onGoBack: () => {},
              })
            }
          />

          <View style={PAGESTYLE.whiteBg}>
            <View style={PAGESTYLE.lessonPlanTop}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <View style={PAGESTYLE.lessonPlanTab}>
                  <TouchableOpacity
                    style={PAGESTYLE.tabs}
                    activeOpacity={opacity}
                    onPress={() => setSelectedTab(0)}
                  >
                    <Text
                      style={[
                        PAGESTYLE.tabsText,
                        tabIndex == 0 ? PAGESTYLE.tabsTextSelected : null,
                      ]}
                    >
                      lesson plan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={PAGESTYLE.tabs}
                    activeOpacity={opacity}
                    onPress={() => setSelectedTab(1)}
                  >
                    <Text
                      style={[
                        PAGESTYLE.tabsText,
                        tabIndex == 1 ? PAGESTYLE.tabsTextSelected : null,
                      ]}
                    >
                      lesson homework
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={PAGESTYLE.tabs}
                    activeOpacity={opacity}
                    onPress={() => setSelectedTab(2)}
                  >
                    <Text
                      style={[
                        PAGESTYLE.tabsText,
                        tabIndex == 2 ? PAGESTYLE.tabsTextSelected : null,
                      ]}
                    >
                      homework submitted
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          >
            {tabIndex == 0 ? (
              <STLDetail lessonData={lessonData} />
            ) : tabIndex == 1 ? (
              <TLHomeWork
                id={props.route.params.data._id}
                updateBtnName={(flag) => setUpdate(flag)}
                navigateScreeCamera={() => setScreenAndCameraRecording(true)}
                navigateToVideoGallery={() =>
                  props.navigation.navigate("TLVideoGallery", {
                    goBack: (selectItem) => {
                      setVideoMaterial(selectItem);
                      props.navigation.goBack();
                    },
                  })
                }
                videoMaterial={videoMaterial}
              />
            ) : (
              <TLHomeWorkSubmitted
                lessonId={lessonData._id}
                searchKeyword={searchKeyword}
                filterBy={filterBy}
                searchActive={isSearchActive}
                dataChanged={isHSDataChanged}
                navigateToDetail={(data) =>
                  props.navigation.navigate("TLHomeWorkSubmittedDetail", {
                    onGoBack: () => {
                      console.log("BACK");
                      setHSDataChanged(true);
                    },
                    item: data,
                  })
                }
              />
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default SchoolTeacherLessonDetail;
