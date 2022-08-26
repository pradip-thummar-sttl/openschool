import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Modal from 'react-native-modal';
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import STYLE from '../../../../utils/Style';
import VideoPlayer from 'react-native-video-controls'
import COLORS from "../../../../utils/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { opacity } from "../../../../utils/Constant";
import PlayBlue from "../../../../svg/pupil/lessonhwplanner/Play_Blue";
import { isTablet } from 'react-native-device-info';
const VideoPopup = (props) => {
    const [isPaused, setPause] = useState(true)

 console.log('video id',`https://www.youtube.com/embed/${props.item.VideoId}`);
  return (
    <View style={PAGESTYLE.container}>
      <Modal isVisible={props.isVisible}>
                <View style={{...STYLE.popupCard, width: '100%',}}>
                    <TouchableOpacity style={PAGESTYLE.cancelButton} onPress={()=>props.onClose()}>
                        <CloseBlack style={STYLE.cancelButtonIcon} height={hp(2.94)} width={hp(2.94)} />
                    </TouchableOpacity>
                    <View style={PAGESTYLE.largeVideoBlock}>

                            <View style={{ height: '100%', justifyContent: 'center' }}>
                                
                                <VideoPlayer
                                    source={{ uri: `https://www.youtube.com/embed/${props.item.VideoId}` }}
                                    paused={isPaused}
                                    resizeMode={'contain'}
                                    style={PAGESTYLE.largeVideo1}
                                />
                            </View>

                        </View>
                </View>
            </Modal>
    </View>
  );
};

export default VideoPopup;

const PAGESTYLE=StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderRadius:10,
        width:wp(90),
        height: hp(25),
    },
    largeVideo1: {
        backgroundColor: COLORS.black,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        marginHorizontal:10
    },
    largeVideoBlock: {
        width: '100%',
        height: isTablet()?hp(50):hp(25.86),
        margin:hp(2),
        marginTop:hp(5)
    },
    cancelButton: {
        position: 'absolute',
        right: hp(1.21),
        zIndex: 9,
    },
})