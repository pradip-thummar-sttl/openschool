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
    const NEW = [
        {
            title: 'Description',
        },
        {
            title: 'Learning material',
        },
        {
            title: 'Saved workspaces',
        },
    ]
    const _renderHeader = section => {
        return (
            <View style={PAGESTYLE.header}>
                <Text style={PAGESTYLE.headerText}>{section.title}</Text>
                <Image source={Images.DropArrow} style={PAGESTYLE.arrowAccordion} />
            </View>
        );
    };
    const _renderContent = section => {
        console.log('activeSections', activeSections);
        return (
            activeSections.includes(0) ?
                <View style={PAGESTYLE.content}>
                    <View style={PAGESTYLE.lessonDesc}>
                        <Text style={PAGESTYLE.lessonText}>In this lesson, we will learn all about conjunctions: what they are and how to use them. You will learn your first 7 conjunctions and I would like you to complete the homework that comes with it. This lesson is worth 5 gold stars!</Text>
                    </View>
                </View>
                :
                activeSections.includes(1) ?
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonText}>Pratik</Text>
                        </View>
                    </View>
                    :
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <Text style={PAGESTYLE.lessonText}>Pradip</Text>
                        </View>
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
                <View style={PAGESTYLE.containerWrap}>
                    <View style={[PAGESTYLE.teacherDetailLeft]}>
                        <View style={PAGESTYLE.largeVideoBlock}>
                            <Image source={Images.videoBanner} style={PAGESTYLE.largeVideo} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
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
                            <View style={PAGESTYLE.accordionMain}>
                                <Accordion
                                    activeSections={activeSections}
                                    sections={NEW}
                                    renderHeader={_renderHeader}
                                    renderContent={_renderContent}
                                    onChange={_updateSections}
                                    underlayColor={COLORS.white}
                                    style={PAGESTYLE.accordion}
                                />
                            </View>
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
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilLessonDetailInternal;