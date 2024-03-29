import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../../utils/Colors";
import STYLE from "../../../../../utils/Style";
import PAGESTYLE from "../Style";
import HeaderGallery from "./header/HeaderGallery";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import TickMarkGreen from "../../../../../svg/teacher/lessonhwplanner/TickMark_Green";
import TickMarkGrey from "../../../../../svg/teacher/lessonhwplanner/TickMark_Grey";
import VideoPopup from "../../../../component/reusable/popup/VideoPopup";
import TabVideoPopup from "../../../../../srcTab/component/reusable/popup/TabVideoPopup";

const TLVideoGallery = (props) => {
  const [isHide, action] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectItem, setSelectedItem] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [videoRecord, setVideoRecord] = useState({});
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);

  const [isSubject, setSubject] = useState("");
  const [isTopic, setTopic] = useState("");

  useEffect(() => {

    
    if (props?.route?.params?.data?.videoMaterial.length > 0)
      setSelectedItem(props?.route?.params?.data?.videoMaterial)
  }, [videos]);

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
    setSubject(props?.route?.params?.subject);
    setTopic(props?.route?.params?.topic);
    if (isSubject != "" && isTopic != "")
      getChannelUser(1, searchKeyword);

  }, [isSubject, isTopic]);

  const openPopup = (item) => {
    setVideoRecord(item);
    setVideoModalVisible(true);
  };

  const getChannelUser = (pageNumber, search) => {
    setLoading(true);
    const data = {
      Searchby: search != "" ? [search] : [isTopic],
      SubjectBy: [isSubject],
      Filterby: "",
      page: pageNumber,
      limit: "15",
    };
    Service.post(data, EndPoints.channelUser, (res) => {
      if (pageNumber == 1) {
        setVideos(res.data);
      } else {
        setVideos([...videos, ...res.data]);
      }
      setLoading(false);
    },
      (err) => {
        setLoading(false);
      }
    );
  };

  const handleBackButtonClick = () => {
    props.route.params.goBack(selectItem);
    return true;
  };
  const onPaggination = () => {
    if (videos.length / 10 == page) {
      let p = page + 1;
      setPageNumber(p);
      getChannelUser(page + 1, searchKeyword);
    }
  };

  const onSelectVideo = (item) => {
    let items = [...selectItem];

    let added = true;
    for (let person of items) {
      if (person._id === item._id) {
        added = false;
        break;
      }
    }

    if (added)
      items.push(item);
    else {
      for (let i = 0; i < items.length; i++) {
        if (items[i]._id === item._id)
          items.splice(i, 1);
      }
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

  return (
    <View style={PAGESTYLE.mainPage}>
      <View style={{ width: isHide ? "100%" : "100%" }}>
        <HeaderGallery
          navigateToBack={() => props.route.params.goBack(selectItem)}
          onAlertPress={() => props.navigation.openDrawer()}
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

        <View style={(PAGESTYLE.whiteBg, PAGESTYLE.mobileGalleryHolder)}>
          <View style={STYLE.hrCommon}></View>

          <FlatList
            data={videos}
            style={{ height: "80%" }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={PAGESTYLE.videoWrap} onPress={() => openPopup(item)}>
                  <View>
                    <View style={PAGESTYLE.videoThumb}>
                      <Image style={PAGESTYLE.videoThumbnail} />

                      <TouchableOpacity style={PAGESTYLE.videoSelected} onPress={() => onSelectVideo(item)}>
                        {isVideoFound(item._id) ? (
                          <TickMarkGreen height={hp(2.9)} width={hp(2.9)} />
                        ) : (
                          <TickMarkGrey height={hp(2.9)} width={hp(2.9)} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text numberOfLines={2} style={PAGESTYLE.videoSubTitle}>
                      {item.Title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            onEndReached={onPaggination}
            onEndReachedThreshold={0.1}
          />
          {isLoading ? (
            <ActivityIndicator
              size={Platform.OS == "ios" ? "large" : "small"}
              color={COLORS.lightOrangeLogin}
              style={{ paddingTop: 20 }}
            />
          ) : (
            null
          )}
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
export default TLVideoGallery;
