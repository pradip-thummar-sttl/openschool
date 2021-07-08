import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import { opacity } from "../../../../utils/Constant";
import HeaderGallery from "./header/HeaderGallery";
import Sidebar from "../../../../component/reusable/sidebar/Sidebar";


const TLVideoGallery = (props) => {
    const [isHide, action] = useState(true);
    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.goBack() 
        return true;
      }


    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar
                hide={() => action(!isHide)}
                navigateToDashboard={() => props.navigation.replace('TeacherDashboard')}
                navigateToTimetable={() => props.navigation.replace('TeacherTimeTable')}
                navigateToLessonAndHomework={() => props.navigation.replace('TeacherLessonList')} /> */}
            <View style={{ width: '100%' }}>
                <HeaderGallery
                    navigateToBack={() => props.goBack()}
                    onAlertPress={() => props.navigation.openDrawer()} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    <View style={[PAGESTYLE.whiteBg, PAGESTYLE.leftSpace]}>
                        <Text style={PAGESTYLE.videoTitle}>Videos</Text>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.bbcImage} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <TouchableOpacity><Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /></TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.TedVideo} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <TouchableOpacity><Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /></TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>TED-ED. Conserving the Amazo…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.SearchGarden} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.RainForest} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Amazing Rainforest: Birds &amp; Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.DreamWorks} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>DreamWorksTV: 25 Facts about…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.GardenNew} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.KidsNet} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Nat Geo Kids: What comes from…</Text>
                            </View>
                        </View>
                        <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Games &amp; Quizes</Text>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.bbcImage} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <TouchableOpacity
                                        activeOpacity={opacity}>
                                        <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.TedVideo} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <TouchableOpacity
                                        activeOpacity={opacity}>
                                        <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.SearchGarden} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.RainForest} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.DreamWorks} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.GardenNew} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <Image style={PAGESTYLE.videoThumbnail} source={Images.KidsNet} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} />
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
}
export default TLVideoGallery;