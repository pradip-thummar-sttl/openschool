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
  ActivityIndicator,
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
import { opacity } from "../../../../../utils/Constant";
import HeaderGallery from "./header/HeaderGallery";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";
import TickMarkGreen from "../../../../../svg/teacher/lessonhwplanner/TickMark_Green";
import TickMarkGrey from "../../../../../svg/teacher/lessonhwplanner/TickMark_Grey";
import PlayBlue from "../../../../../svg/pupil/lessonhwplanner/Play_Blue";

const TLVideoGallery = (props) => {
  const [isHide, action] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectItem, setSelectedItem] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setLoading] = useState(false);

  console.log("props", props);

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
    getChannelUser(1,searchKeyword);
  }, []);
  const getChannelUser = (pageNumber, search) => {
    setLoading(true);
    const data = {
      Searchby: search,
      Filterby: "",
      page: pageNumber,
      limit: "10",
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
        setLoading(false);
      },
      (err) => {
        console.log("Channel User error ===>", err);
        setLoading(false);
      }
    );
  };

  const handleBackButtonClick = () => {
    props.route.params.goBack(selectItem);
    return true;
  };
  const onPaggination = () => {
    console.log("page number is ===>");

    if (videos.length / 10 == page) {
      console.log("page number is under block ===>");
      let p = page + 1;
      setPageNumber(p);
        getChannelUser(page + 1, searchKeyword);
    }
  };
  const onSelectVideo = (item) => {
    let items = [...selectItem];
    if (items.includes(item)) {
      const index = items.indexOf(item);
      items.splice(index, 1);
    } else {
      items.push(item);
    }
    setSelectedItem(items);
  };
  return (
    <View style={PAGESTYLE.mainPage}>
      <View style={{ width: isHide ? "100%" : "100%" }}>
        <HeaderGallery
          navigateToBack={() => props.route.params.goBack(selectItem)}
          onAlertPress={() => props.navigation.openDrawer()}
          onSearchKeyword={(keyword) => setSearchKeyword(keyword)}
          onSearch={() => {
            setPageNumber(1);
            getChannelUser(1,searchKeyword);
          }}
          onClearSearch={() => {
            setSearchKeyword("");
            setPageNumber(1);
            getChannelUser(1,"");
          }}
        />

        <View style={(PAGESTYLE.whiteBg, PAGESTYLE.mobileGalleryHolder)}>
          {/* <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Games &amp; Quizes</Text> */}
          <View style={STYLE.hrCommon}></View>
          
            <FlatList
              data={videos}
              style={{ height: "80%" }}
              renderItem={({ item, index }) => {
                return (
                  <View style={PAGESTYLE.videoWrap}>
                    <View>
                      <View style={PAGESTYLE.videoThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} />
                        <TouchableOpacity style={PAGESTYLE.videoPlay}>
                          <PlayBlue height={hp(4)} width={hp(4)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={PAGESTYLE.videoSelected}
                          onPress={() => onSelectVideo(item)}
                        >
                          {selectItem.includes(item) ? (
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
                  </View>
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
    </View>
  );
};
export default TLVideoGallery;
