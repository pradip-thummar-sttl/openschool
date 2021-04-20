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
                        <Text style={PAGESTYLE.lessonText}>
                            In this lesson, we will learn all about conjunctions: what they are and how to use them. You will learn your first 7 conjunctions and I would like you to complete the homework that comes with it. This lesson is worth 5 gold stars!{"\n"}
                        Instructions: {"\n"}
                        1. Go through all learning materials{"\n"}
                        2. Watch all BBC Bitesize videos{"\n"}
                        3. Make notes using your workspaces{"\n"}
                        Have fun!
                        </Text>
                    </View>
                </View>
                :
                activeSections.includes(1) ?
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
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
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={PAGESTYLE.thumbVideo}>
                                    <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />
                                    <Image source={require('../../../../assets/images/video-uploads2.png')} style={PAGESTYLE.grpThumbVideo} />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    :
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.fileBoxGrpWrap}>
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
        );
    };
    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
    };
    return (
        <View style={{ ...PAGESTYLE.mainPage, height: '100%' }}>
            <View style={PAGESTYLE.commonBg}>
                <Header6 goBack={() => props.navigation.goBack()} />
                <View style={PAGESTYLE.containerWrap}>
                    <View style={{ height: '100%', paddingBottom: hp(18.8), }}>
                        <View style={PAGESTYLE.largeVideoBlock}>
                            <Image source={Images.videoBanner} style={PAGESTYLE.largeVideo} />
                        </View>
                        <ScrollView style={{ top: 0, height: '100%' }} showsVerticalScrollIndicator={false}>
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
                        </ScrollView>
                        <View style={PAGESTYLE.lessonstartButtonPupil}>
                            <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonBorderedGreen, PAGESTYLE.fixedButton]}>open workspace</Text></TouchableOpacity>
                            <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.fixedButton]}>see homework</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PupilLessonDetailInternal;