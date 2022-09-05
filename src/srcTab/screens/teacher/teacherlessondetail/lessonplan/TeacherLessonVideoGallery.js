import React, { useState, useEffect } from "react";
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
  BackHandler,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../../utils/Colors";
import STYLE from "../../../../../utils/Style";
// import Images from '../../../../../utils/Images';
import PAGESTYLE from "../Style";
import FONTS from "../../../../../utils/Fonts";
import CheckBox from "@react-native-community/checkbox";
import ToggleSwitch from "toggle-switch-react-native";
import { opacity, Var } from "../../../../../utils/Constant";
import HeaderGallery from "./header/HeaderGallery";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { BadgeIcon } from "../../../../../utils/Model";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";
import TickMarkGreen from "../../../../../svg/teacher/lessonhwplanner/TickMark_Green";
import TickMarkGrey from "../../../../../svg/teacher/lessonhwplanner/TickMark_Grey";
import VideoPopup from "../../../../../srcMobile/component/reusable/popup/VideoPopup";
import TabVideoPopup from "../../../../component/reusable/popup/TabVideoPopup";
const TLVideoGallery = (props) => {
  const [isHide, action] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectItem, setSelectedItem] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(props.lessonTopic);
  const [subjectBy, setSubjectBy] = useState(props.selectedSubject);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [videoRecord, setVideoRecord] = useState({});

  // selectedSubject
  // lessonTopic
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
  useEffect(() => {
    console.log("props o data in selected video", props.data);
    setSelectedItem(props.data);
  }, [props.data]);

  useEffect(() => {
    getChannelUser(1, searchKeyword);
  }, []);
  const getChannelUser = (pageNumber, search) => {
    const data = {
      Searchby: search,
      SubjectBy:subjectBy,
      Filterby: "",
      page: pageNumber,
      limit: "20",
    };
    Service.post(
      data,
      EndPoints.channelUser,
      (res) => {
        console.log("Channel User response ===>", res);
        if (pageNumber == 1) {
          setVideos(res.data);
        } else {
          setVideos([...videos, ...res.data]);
        }
      },
      (err) => {
        console.log("Channel User error ===>", err);
      }
    );
  };
  const handleBackButtonClick = () => {
    props.goBack(selectItem);
    return true;
  };
  const openNotification = () => {
    Var.isCalender = false;
    BadgeIcon.isBadge = false;
    props.navigation.openDrawer();
    // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
  };
  const onPaggination = () => {
    console.log("page number is ===>");

    if (videos.length / 20 == page) {
      //   console.log("page number is ===>");
      setPageNumber(page + 1);
      getChannelUser(page + 1, searchKeyword);
    }
  };
  // const onSelectVideo = (item) => {
  //   let items = [...selectItem];
  //   if (items.includes(item)) {
  //     const index = items.indexOf(item);
  //     items.splice(index, 1);
  //   } else {
  //     items.push(item);
  //   }
  //   setSelectedItem(items);
  // };
  const onSelectVideo = (item) => {
    let items = [...selectItem];
    const person = items.find(element => {
      if (element._id === item._id) {
        return true;
      }
      return false;
    });
    if (person == undefined)
      items.push(item);
    else {
      const index = items.indexOf(item);
      items.splice(index, 1);
    }

    setSelectedItem(items);
  };

  const isVideoFound = (id) => {
    let items = [...selectItem];

    const person = items.find(element => {
      if (element._id === id) {
        return true;
      }
      return false;
    });
    return person != undefined ? true : false
  }
  const openPopup = (item) => {
    setVideoRecord(item);
    setVideoModalVisible(true);

    console.log("=-=-=-=-=-=-=->")
  };
  return (
    <View style={PAGESTYLE.mainPage}>
     
      <View style={{ width: "100%" }}>
        <HeaderGallery
          navigateToBack={() => props.goBack(selectItem)}
          onAlertPress={() => openNotification()}
          onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
          onSearch={() => {
            setPageNumber(1);
            getChannelUser(1, searchKeyword);
          }}
          onClearSearch={() => {
            setSearchKeyword("");
            setPageNumber(1);
            getChannelUser(1, "");
          }}
        />
       
        <View style={STYLE.hrCommon}></View>
        <View style={{ height: wp(62) }}>
          <FlatList
            data={videos}
            style={{ height: "100%", alignSelf: "center" }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={PAGESTYLE.videoWrap} onPress={()=>openPopup(item)}>
                  <View>
                    <View style={PAGESTYLE.videoThumb}>
                      <Image style={PAGESTYLE.videoThumbnail} />
                      
                      <TouchableOpacity
                        style={PAGESTYLE.videoSelected}
                        onPress={() => onSelectVideo(item)}
                      >
                        {isVideoFound(item._id) ? (
                          <TickMarkGreen height={hp(2.9)} width={hp(2.9)} />
                        ) : (
                          <TickMarkGrey height={hp(2.9)} width={hp(2.9)} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text numberOfLines={2} style={PAGESTYLE.videoSubTitle}>
                      {item.Description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={4}
            keyExtractor={(item) => item.id}
            onEndReached={onPaggination}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
      <TabVideoPopup
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        item={videoRecord}
      />
    </View>
  );
};
export default TLVideoGallery;
