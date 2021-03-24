import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';


const PupilLessonDue = (props) => {
    return (

        <View style={[PAGESTYLE.commonBg, PAGESTYLE.videoSliderSpace]}>
            <Text style={PAGESTYLE.videoTitle}>Homework due</Text>
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard} onPress={()=>props.navigatePupilHomeworkesubmited()}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/dueToday2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Due: Today</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabelDue} />
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Text style={PAGESTYLE.videoDateBlack}>Due: 14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabelDue} />
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightYellowDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Text style={PAGESTYLE.videoDateBlack}>Due: 14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmarkOff2.png')} style={PAGESTYLE.bookMarkLabelDue} />
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightPurpleDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Text style={PAGESTYLE.videoDateBlack}>Due: 14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmarkOff2.png')} style={PAGESTYLE.bookMarkLabelDue} />
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightOrangeDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
            <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Submitted homework</Text>
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/submitted2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Submitted: 14/09/2020</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/submitted2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Submitted: 14/09/2020</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightYellowDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/submitted2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Submitted: 14/09/2020</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightPurpleDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/submitted2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Submitted: 14/09/2020</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightOrangeDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
            <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Homework marked</Text>
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Marked</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightSkyBlueDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Marked</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightYellowDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Marked</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightPurpleDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image source={require('../../../../assets/images/marked2.png')} style={PAGESTYLE.dueIcon} />
                        <Text style={PAGESTYLE.videoDateBlack}>Marked</Text>
                    </View>
                    <View style={[PAGESTYLE.lessonDue, PAGESTYLE.lightOrangeDue]}>
                        <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                        <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    </View>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.dueVideoUserSpace]}>
                        <View style={PAGESTYLE.lessonThumb}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>
               
            </ScrollView>
        </View>


    );
}
export default PupilLessonDue;