import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';


const PupilLesson = (props) => {
    return (

        <View style={PAGESTYLE.whiteBg}>
            <Text style={PAGESTYLE.videoTitle}>Lessons for Week beginning - 07/09/20</Text>
            <View style={STYLE.hrCommon}></View>
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                    </View>
                    <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </TouchableOpacity>                
            </ScrollView>
            <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Lessons from last week - 28/08/20</Text>
            <View style={STYLE.hrCommon}></View>            
        </View>


    );
}
export default PupilLesson;