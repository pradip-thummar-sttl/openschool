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
const TLVideoGallery = (props) => {
  const [isHide, action] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectItem, setSelectedItem] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
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
    const data = {
      Searchby: search,
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
      getChannelUser(page + 1,searchKeyword);
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
      {/* <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
      <View style={{ width: "100%" }}>
        <HeaderGallery
          navigateToBack={() => props.goBack(selectItem)}
          onAlertPress={() => openNotification()}
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
        {/* <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    <View style={[PAGESTYLE.whiteBg, PAGESTYLE.leftSpace]}>
                        <Text style={PAGESTYLE.videoTitle}>Videos</Text>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.bbcImage} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} /> */}
        {/* <TouchableOpacity> */}
        {/* <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} />
                                        </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.TedVideo} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} /> */}
        {/* <TouchableOpacity> */}
        {/* <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /> */}
        {/* </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>TED-ED. Conserving the Amazo…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.SearchGarden} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.RainForest} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Amazing Rainforest: Birds &amp; Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.DreamWorks} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>DreamWorksTV: 25 Facts about…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.GardenNew} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.KidsNet} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Nat Geo Kids: What comes from…</Text>
                            </View>
                        </View>
                        <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Games &amp; Quizes</Text>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.bbcImage} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} /> */}
        {/* <TouchableOpacity
                                        activeOpacity={opacity}> */}
        {/* <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /> */}
        {/* </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.TedVideo} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} /> */}
        {/* <TouchableOpacity
                                        activeOpacity={opacity}>
                                        {/* <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /> */}
        {/* </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.SearchGarden} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.RainForest} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.DreamWorks} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.GardenNew} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}> */}
        {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.KidsNet} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
        {/* </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView> */}
          <View style={STYLE.hrCommon}></View>
<View style={{ height: wp(62),}}>
        <FlatList
          data={videos}
          style={{height:'100%', alignSelf:'center',  }}
          renderItem={({ item, index }) => {
            return (
              <View style={PAGESTYLE.videoWrap}>
                <View>
                  <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} />
                    {/* <TouchableOpacity style={PAGESTYLE.videoPlay}>
                      <PlayBlue height={hp(4)} width={hp(4)} />
                    </TouchableOpacity> */}
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
          numColumns={4}
          keyExtractor={(item) => item.id}
          onEndReached={onPaggination}
          onEndReachedThreshold={0.1}
        />
        </View>
      </View>
    </View>
  );
};
export default TLVideoGallery;
