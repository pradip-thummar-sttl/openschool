import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
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

const VideoPopup = (props) => {
  const [isPaused, setPause] = useState(true);
  return (
    <View style={PAGESTYLE.container}>
      <Modal isVisible={props.isVisible}>
        <View style={{ ...STYLE.popupCard, width: wp(90), height:hp(90) }}>
          <ScrollView>
          <TouchableOpacity style={PAGESTYLE.cancelButton} onPress={() => props.onClose()}>
            <CloseBlack style={STYLE.cancelButtonIcon} height={isTablet()?hp(4.94):hp(2.94)} width={isTablet()?hp(4.94):hp(2.94)}/>
          </TouchableOpacity>
          <View style={PAGESTYLE.largeVideoBlock}>
              <Text style={{ paddingHorizontal:5, fontSize:wp(5),fontFamily: FONTS.fontBold}}>{props?.item?.ChannelTitle}</Text>
            <View style={{ width:'90%',alignSelf:'center', marginTop:hp(1) }}>
              <YoutubePlayer height={isTablet()? hp(40):hp(25)} width={'95%'} play={true} videoId={props.item.VideoId} />
            </View>
            <Text style={{ padding:5, fontSize:isTablet()?hp(3):hp(2)}}>{props?.item?.Description}</Text>
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default VideoPopup;

const PAGESTYLE = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    // width: wp(90),
    // height: hp(25),
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
    height: isTablet() ? hp(65) : hp(25.86),
    margin: hp(2),
    marginTop: hp(5),
  },
  cancelButton: {
    position: "absolute",
    right: hp(1.21),
    // zIndex: 9,
  },
});
