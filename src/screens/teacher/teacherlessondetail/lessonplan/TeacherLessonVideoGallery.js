import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';


const TLVideoGallery = (props) => {
    return (

        <View style={PAGESTYLE.whiteBg}>
            <Text style={PAGESTYLE.videoTitle}>Videos</Text>
            <View style={STYLE.hrCommon}></View>
            <View style={PAGESTYLE.videoWrap}>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/bbc-video2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/tick-selected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/ted-video2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/tick-selected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/scratch-garden2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/amazing-rainforest2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/dream-works2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/scratch-garden-new2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/kids-nat-geo2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
            </View>
            <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Videos</Text>
            <View style={STYLE.hrCommon}></View>
            <View style={PAGESTYLE.videoWrap}>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/bbc-video2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/tick-selected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/ted-video2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/tick-selected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/scratch-garden2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/amazing-rainforest2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/dream-works2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/scratch-garden-new2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
                <View>
                <View style={PAGESTYLE.videoThumb}>
                    <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/kids-nat-geo2.png')} />
                    <Image style={PAGESTYLE.videoPlay} source={require('../../../../assets/images/play-transparent-icon2.png')} />
                    <Image style={PAGESTYLE.videoSelected} source={require('../../../../assets/images/unselected2.png')} />
                </View>
                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                </View>
            </View>
        </View>


    );
}
export default TLVideoGallery;