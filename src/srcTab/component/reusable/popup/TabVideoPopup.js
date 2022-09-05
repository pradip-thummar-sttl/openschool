import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import STYLE from "../../../../utils/Style";
import VideoPlayer from "react-native-video-controls";
import COLORS from "../../../../utils/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { opacity } from "../../../../utils/Constant";
import PlayBlue from "../../../../svg/pupil/lessonhwplanner/Play_Blue";
import { isTablet } from "react-native-device-info";
import YoutubePlayer from "react-native-youtube-iframe";
import FONTS from "../../../../utils/Fonts";
import { ScrollView } from "react-native-gesture-handler";

const TabVideoPopup = (props) => {
  const [isPaused, setPause] = useState(true);
  return (
    <Modal isVisible={props.isVisible}>
      <View style={PAGESTYLE.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{height:"100%"}}>
            <TouchableOpacity style={PAGESTYLE.cancelButton} onPress={() => props.onClose()}>
              <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
            </TouchableOpacity>
            <View style={PAGESTYLE.largeVideoBlock}>
              <Text style={{ Width: "100%", paddingHorizontal: 5, fontSize: wp(2.7), fontFamily: FONTS.fontBold }}>{props?.item?.ChannelTitle}</Text>
              <View style={{ height: hp(60), width: wp(80), alignItems: 'center', alignSelf: "center", justifyContent: "center", marginTop: hp(1) }}>
                <YoutubePlayer height={hp(60)} width={wp(80)} play={true} videoId={props.item.VideoId} />
              </View>
              <Text style={{ Width: "100%", padding: 5, fontSize: wp(1.5) }}>{props?.item?.Description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TabVideoPopup;

const PAGESTYLE = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: wp(90),
    height: hp(95),
  },
  largeVideo1: {
    backgroundColor: COLORS.black,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginHorizontal: 10,
  },
  largeVideoBlock: {
    width: "100%",
    flex:1,
    margin: hp(2),
    marginTop: hp(5),
  },
  cancelButton: {
    position: "absolute",
    right: hp(1.21),
    zIndex: 9,
  },
});
