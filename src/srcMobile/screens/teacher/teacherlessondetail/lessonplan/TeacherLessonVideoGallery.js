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
import { opacity } from "../../../../../utils/Constant";
import HeaderGallery from "./header/HeaderGallery";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";
import { Service } from "../../../../../service/Service";
import { EndPoints } from "../../../../../service/EndPoints";

const TLVideoGallery = (props) => {
  const [isHide, action] = useState(true);
  const [videos, setVideos] = useState([]);
  const [page, setPageNumber] = useState(1);
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
    getChannelUser();
  }, []);
  const getChannelUser = () => {
    const data = {
      Searchby: "",
      Filterby: "",
      page: page,
      limit: "10",
    };
    Service.post(
      data,
      EndPoints.channelUser,
      (res) => {
        console.log("Channel User response ===>", res);
        setVideos([...videos, ...res.data]);
      },
      (err) => {
        console.log("Channel User error ===>", err);
      }
    );
  };

  const handleBackButtonClick = () => {
    props.route.params.goBack();
    return true;
  };
  const onPaggination = () => {
    console.log("page number is ===>");

    if (videos.length / 10 == page) {
    //   console.log("page number is ===>");
      setPageNumber(page + 1);
      getChannelUser();
    }
  };
  return (
    <View style={PAGESTYLE.mainPage}>
      <View style={{ width: isHide ? "100%" : "100%" }}>
        <HeaderGallery
          navigateToBack={() => props.route.params.goBack()}
          onAlertPress={() => props.navigation.openDrawer()}
        />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={PAGESTYLE.teacherLessonGrid}
        > */}
          <View style={(PAGESTYLE.whiteBg, PAGESTYLE.mobileGalleryHolder)}>
            {/* <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Games &amp; Quizes</Text> */}
            <View style={STYLE.hrCommon}></View>
            <FlatList
              data={videos}
              renderItem={({item, index}) => {
                return (
                  <View style={PAGESTYLE.videoWrap}>
                    <View>
                      <View style={PAGESTYLE.videoThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} />
                        <Image style={PAGESTYLE.videoPlay} />
                        <Image style={PAGESTYLE.videoSelected} />
                      </View>
                      <Text style={PAGESTYLE.videoSubTitle}>
                        BBC Bitesize. The Amazon Ra…
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
              onEndReached={onPaggination}
              onEndReachedThreshold={0.1}
            />
          </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
export default TLVideoGallery;
