import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  H3,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
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
import moment from "moment";
import { Download } from "../../../../../utils/Download";
import { baseUrl } from "../../../../../utils/Constant";
import { floor } from "react-native-reanimated";
import Calender from "../../../../../svg/teacher/dashboard/Calender";
import Clock from "../../../../../svg/teacher/dashboard/Clock";
import Participants from "../../../../../svg/teacher/dashboard/Participants";
import TickMarkBlue from "../../../../../svg/teacher/dashboard/TickMark_Blue";
import DownloadSVG from "../../../../../svg/teacher/lessonhwplanner/Download";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import CloseBlack from "../../../../../svg/teacher/timetable/Close_Black";
import VideoPopup from "../../../../../srcMobile/component/reusable/popup/VideoPopup";

const TLDetail = (props) => {
  const [isRecordLoading, setRecordLoader] = useState(false);
  const [mateIndex, setMateIndex] = useState(-1);
  const [isMatLoading, setLoader] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(props.lessonData.ChannelList);

  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [videoRecord, setVideoRecord] = useState({});

  const openPopup = (item) => {
    setVideoRecord(item);
    setVideoModalVisible(true);
  };

  return (
    <View style={PAGESTYLE.whiteBg}>
      <View style={PAGESTYLE.containerWrap}>
        <View style={[PAGESTYLE.teacherDetailLeft, PAGESTYLE.borderRight]}>
          <View style={PAGESTYLE.timedateGrp}>
            <View style={PAGESTYLE.dateWhiteBoard1}>
              <Text style={PAGESTYLE.subjectText}>Subject</Text>
              <View style={PAGESTYLE.subjectDateTime}>
                <Text style={PAGESTYLE.labelTextMain}>
                  {props.lessonData.SubjectName}
                </Text>
              </View>
            </View>
            <View style={[PAGESTYLE.dateWhiteBoard1, PAGESTYLE.timeSpace1]}>
              <Text style={PAGESTYLE.subjectText}>Lesson Topic</Text>
              <View style={PAGESTYLE.subjectDateTime}>
                <Text style={PAGESTYLE.labelTextMain}>
                  {props.lessonData.LessonTopic}{" "}
                </Text>
              </View>
            </View>
          </View>
          <View style={PAGESTYLE.timedateGrp}>
            <View style={PAGESTYLE.dateLable}>
              <Text style={PAGESTYLE.subjectText}>Date</Text>
              <View style={PAGESTYLE.alignRow}>
                <Calender
                  style={PAGESTYLE.calIconNoInput}
                  height={hp(1.76)}
                  width={hp(1.76)}
                />
                <Text style={PAGESTYLE.datetimeText}>
                  {moment(props.lessonData.Date).format("DD/MM/yyyy")}
                </Text>
              </View>
            </View>
            {props.lessonData.StartTime ? (
              <View style={PAGESTYLE.TimeLable}>
                <Text style={PAGESTYLE.subjectText}>Time</Text>
                <View style={PAGESTYLE.alignRow}>
                  <Clock
                    style={PAGESTYLE.timeIconNoInput}
                    height={hp(1.76)}
                    width={hp(1.76)}
                  />
                  <Text style={PAGESTYLE.datetimeText}>
                    {props.lessonData.StartTime} - {props.lessonData.EndTime}
                  </Text>
                </View>
              </View>
            ) : null}

            <View style={PAGESTYLE.dateLable}>
              <Text style={PAGESTYLE.subjectText}>Participants</Text>
              <View style={PAGESTYLE.alignRow}>
                <Participants
                  style={PAGESTYLE.calIconNoInput}
                  height={hp(1.76)}
                  width={hp(1.76)}
                />
                <Text
                  numberOfLines={1}
                  style={[PAGESTYLE.datetimeText, { width: hp(20) }]}
                >
                  {props.lessonData.GroupName}
                </Text>
              </View>
            </View>
          </View>
          <View style={PAGESTYLE.lessonDesc}>
            <Text style={PAGESTYLE.lessonTitleWithoutTextArea}>
              Lesson Description
            </Text>
            <Text style={PAGESTYLE.lessonText}>
              {props.lessonData.LessonDescription}
            </Text>
          </View>

          {props.lessonData.RecordingName ? (
            <TouchableOpacity
              style={[
                PAGESTYLE.videoLinkBlock,
                PAGESTYLE.videoLinkBlockSpaceTop,
              ]}
            >
              <PlayBlue
                style={PAGESTYLE.videoLinkIcon}
                height={hp(2.38)}
                width={hp(2.38)}
              />
              <Text style={PAGESTYLE.videoLinkText}>
                {props.lessonData.RecordingName}
              </Text>
            </TouchableOpacity>
          ) : null}
          <View style={PAGESTYLE.requirementofClass}>
            <View style={PAGESTYLE.hrTagMIddleReverse}>
              {props.lessonData?.CheckList?.length > 0 && (
                <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
                  Items your class may need
                </Text>
              )}
            </View>
            <FlatList
              data={props.lessonData.CheckList}
              style={{
                alignSelf: "center",
                width: "100%",
                bottom: 20,
                marginTop: 10,
              }}
              renderItem={({ item, index }) => (
                <View
                  style={[PAGESTYLE.checkBoxLabelLine, { paddingVertical: 12 }]}
                >
                  <TickMarkBlue
                    style={PAGESTYLE.checkIcon}
                    height={hp(1.7)}
                    width={hp(1.7)}
                  />
                  <Text style={PAGESTYLE.lessonPointText}>{item.ItemName}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={PAGESTYLE.checkBoxGrpWrap}>
            <View style={PAGESTYLE.hrTagMIddleReverse}>
              <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
                Individual pupils
              </Text>
              <View
                style={[STYLE.hrCommon, PAGESTYLE.commonWidthMidium]}
              ></View>
            </View>
            <View style={PAGESTYLE.checkBoxGrp}>
              <FlatList
                data={props.lessonData.PupilList}
                style={{
                  alignSelf: "center",
                  width: "100%",
                  bottom: 20,
                  marginTop: 10,
                }}
                renderItem={({ item, index }) => (
                  <View style={PAGESTYLE.checkBoxLabelNone}>
                    <Image
                      source={{ uri: baseUrl + item.ProfilePicture }}
                      style={PAGESTYLE.userIconPupil}
                    />
                    <Text style={PAGESTYLE.checkBoxLabelTextNone}>
                      {item.PupilName}
                    </Text>
                  </View>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          <View style={[PAGESTYLE.toggleBoxGrpWrap, PAGESTYLE.spaceTop]}>
            <View style={PAGESTYLE.hrTagMIddleReverse}>
              <Text style={[PAGESTYLE.requireText, PAGESTYLE.subLineTitle]}>
                Class Settings
              </Text>
              <View style={[STYLE.hrCommon, PAGESTYLE.commonWidth]}></View>
            </View>
            <View style={PAGESTYLE.toggleGrp}>
              <Text style={PAGESTYLE.toggleText}>
                Will this lesson be delivered live
              </Text>
              <ToggleSwitch
                onColor={COLORS.dashboardGreenButton}
                isOn={props.lessonData.LiveSession}
                onToggle={(isOn) => console.log("changed to : ", isOn)}
              />
            </View>
            <View style={PAGESTYLE.toggleGrp}>
              <Text style={PAGESTYLE.toggleText}>
                Publish lesson before live lesson
              </Text>
              <ToggleSwitch
                onColor={COLORS.dashboardGreenButton}
                isOn={props.lessonData.Publish}
                onToggle={(isOn) => console.log("changed to : ", isOn)}
              />
            </View>
            {/* <View style={PAGESTYLE.toggleGrp}>
                            <Text style={PAGESTYLE.toggleText}>Switch on in -class voting</Text>
                            <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={props.lessonData.IsVotingEnabled} onToggle={isOn => console.log("changed to : ", isOn)} />
                        </View> */}
          </View>
        </View>
        <View style={PAGESTYLE.rightSideBar}>
          {props.lessonData.RecordingList.length > 0 ||
          // props.lessonData.ChatTranscript.length > 0 ||
          props.lessonData.RecommendedList.length > 0 ||
          props.lessonData.MaterialList.length > 0 ||
          selectedVideo.length > 0 ? (
            <>
              {props.lessonData.MaterialList.length > 0 ? (
                <View style={PAGESTYLE.fileBoxGrpWrap}>
                  <Text style={PAGESTYLE.requireText}>Learning material</Text>

                  {props.lessonData.MaterialList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setLoader(true);
                          setMateIndex(index);
                          Download(item, (res) => {
                            setLoader(false);
                            setMateIndex(-1);
                          });
                        }}
                        style={{ ...PAGESTYLE.fileGrp, height: 60 }}
                      >
                        <Text
                          numberOfLines={1}
                          style={[PAGESTYLE.fileName, { width: hp(20) }]}
                        >
                          {item.originalname}
                        </Text>
                        <View style={PAGESTYLE.downloaBtn}>
                          {isMatLoading && index == mateIndex ? (
                            <ActivityIndicator
                              style={{ ...PAGESTYLE.downloadIcon }}
                              size={Platform.OS == "ios" ? "large" : "small"}
                              color={COLORS.white}
                            />
                          ) : (
                            // <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                            <DownloadSVG
                              style={PAGESTYLE.downloadIcon}
                              height={hp(2.01)}
                              width={hp(2.01)}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}

              {props.lessonData.RecommendedList.length > 0 ? (
                <FlatList
                  data={props.lessonData.RecommendedList}
                  style={{
                    alignSelf: "center",
                    width: "100%",
                    bottom: hp(2.6),
                    marginTop: hp(1.3),
                  }}
                  renderItem={({ item, index }) => (
                    <View style={PAGESTYLE.thumbVideo}>
                      {/* <Image source={Images.VideoUpload} style={PAGESTYLE.grpThumbVideo} /> */}
                      <DownloadSVG
                        style={PAGESTYLE.grpThumbVideo}
                        height={hp(2.01)}
                        width={hp(2.01)}
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : null}

              {props.lessonData.RecordingList.length > 0 ? (
                <View
                  style={[
                    PAGESTYLE.videoLinkBlockSpaceBottom,
                    PAGESTYLE.videoLinkBlockSpaceTop,
                  ]}
                >
                  <Text style={PAGESTYLE.requireText}>
                    View lesson recording
                  </Text>
                  {props.lessonData.RecordingList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setRecordLoader(true);
                          Download(item, (res) => {
                            setRecordLoader(false);
                          });
                        }}
                        style={{ ...PAGESTYLE.fileGrp, height: 60 }}
                      >
                        <Text
                          numberOfLines={1}
                          style={[PAGESTYLE.fileName, { width: hp(20) }]}
                        >
                          {item.originalname}
                        </Text>
                        <View style={PAGESTYLE.downloaBtn}>
                          {isRecordLoading ? (
                            <ActivityIndicator
                              style={{ ...PAGESTYLE.downloadIcon }}
                              size={Platform.OS == "ios" ? "large" : "small"}
                              color={COLORS.blueBorder}
                            />
                          ) : (
                            // <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                            <DownloadSVG
                              style={PAGESTYLE.downloadIcon}
                              height={hp(2.01)}
                              width={hp(2.01)}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
              {selectedVideo.length > 0 && (
                <>
                 <Text style={[PAGESTYLE.requireText,PAGESTYLE.videoLinkBlockSpaceTop,]}>
                    Recommended Video
                  </Text>
                <FlatList
                  style={{ flex: 1 }}
                  scrollEnabled={true}
                  data={selectedVideo}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={PAGESTYLE.thumbVideo} onPress={()=>openPopup(item)}>
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
                    </TouchableOpacity>
                  )}
                  numColumns={2}
                />
                </>
              )}
              {props.lessonData.ChatTranscript ? (
                <View style={PAGESTYLE.fileBoxGrpWrap}>
                  <Text style={PAGESTYLE.requireText}>Chat transcript</Text>
                  <View style={PAGESTYLE.fileGrp}>
                    <Text style={PAGESTYLE.fileName}>Filename</Text>
                    {/* <Image source={Images.Download} style={PAGESTYLE.downloadIcon} /> */}
                    <DownloadSVG
                      style={PAGESTYLE.downloadIcon}
                      height={hp(2.01)}
                      width={hp(2.01)}
                    />
                  </View>
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </View>
      <VideoPopup
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        item={videoRecord}
      />
    </View>
  );
};
export default TLDetail;
