import React, { useState } from "react";
import { View, PAGESTYLEheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import Header6 from '../../../../component/reusable/header/bulck/Header6'
import Images from "../../../../utils/Images";
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const PupilLessonDetailInternal = (props) => {
    const [activeSections, setActiveSections] = useState([])

    const SECTIONS = [
        {
            title: 'First',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Second',
            content: 'Lorem ipsum...',
        },
    ];

    const _renderSectionTitle = section => {
        return (
          <View style={PAGESTYLE.content}>
            <Text>{section.title}</Text>
          </View>
        );
      };
    
      const _renderHeader = section => {
        return (
          <View style={PAGESTYLE.header}>
            <Text style={PAGESTYLE.headerText}>{section.title}</Text>
          </View>
        );
      };
    
      const _renderContent = section => {
        return (
          <View style={PAGESTYLE.content}>
            <Text>{section.content}</Text>
          </View>
        );
      };

    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
    };
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.commonBg}>
                <Header6 />
                <ScrollView>
                    <View style={PAGESTYLE.containerWrap}>
                        <View style={[PAGESTYLE.teacherDetailLeft]}>
                            <View style={PAGESTYLE.largeVideoBlock}>
                                <Image source={require('../../../../assets/images/videoLarge2.png')} style={PAGESTYLE.largeVideo} />
                            </View>
                            <View style={PAGESTYLE.videoTitleLine}>
                                <View>
                                    <Text style={PAGESTYLE.videoMainTitle}>Grammar: How to use conjunctions to join two words together</Text>
                                    <Text style={PAGESTYLE.videoPublishDate}>Published on 29 July 2020</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.bookmarkuserNameMain}>
                                <View style={PAGESTYLE.userNameMain}>
                                    <View style={PAGESTYLE.userMainThumb}></View>
                                    <Text style={PAGESTYLE.mainNameText}>Miss Barker</Text>
                                </View>
                                <View style={PAGESTYLE.bookMark}>
                                    <Text style={PAGESTYLE.saveBookMarkText}>Save</Text>
                                    <Image source={Images.bookmarkOff} style={PAGESTYLE.bookMarkOn} />
                                </View>
                            </View>
                            <View style={PAGESTYLE.lessonDesc}>
                                <Text style={PAGESTYLE.lessonText}>In this lesson, we will learn all about conjunctions: what they are and how to use them. You will learn your first 7 conjunctions and I would like you to complete the homework that comes with it. This lesson is worth 5 gold stars!</Text>
                            </View>
                            <Accordion
                                activeSections={activeSections}
                                sections={SECTIONS}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            />
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
                                <Text style={PAGESTYLE.requireText}>Learning material</Text>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Filename</Text>
                                    <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Filename</Text>
                                    <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Filename</Text>
                                    <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Filename</Text>
                                    <Image source={require('../../../../assets/images/download2.png')} style={PAGESTYLE.downloadIcon} />
                                </View>
                            </View>

                            <View style={PAGESTYLE.thumbVideo}>
                                <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />

                            </View>
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
                                <Text style={[PAGESTYLE.lightGreyText, PAGESTYLE.titleSpace]}>Saved workspaces</Text>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Workspace</Text>
                                    <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Workspace</Text>
                                    <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Workspace</Text>
                                    <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                </View>
                                <View style={PAGESTYLE.fileGrp}>
                                    <Text style={PAGESTYLE.fileName}>Workspace</Text>
                                    <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilLessonDetailInternal;