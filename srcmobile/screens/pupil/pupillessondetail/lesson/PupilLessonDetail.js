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
import HeaderWhitewithoutsearch from "../../../../component/reusable/header/bulck/HeaderWhitewithoutsearch";
import Sidebarpupil from "../../../../component/reusable/sidebar/Sidebarpupil";
import moment from "moment";
import { Download } from "../../../../utils/Download";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import { opacity } from "../../../../utils/Constant";

const PupilLessonDetailInternal = (props) => {
    const [activeSections, setActiveSections] = useState([])
    const [item, setItem] = useState(props.route.params.item)

    const refresh = () => {
        Service.get(`${EndPoints.GetPupilLesson}/${item._id}/${User.user.UserDetialId}`, (res) => {
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setItem(res.data[0])
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }
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
                        <Text style={PAGESTYLE.lessonText}>{item.LessonDescription}</Text>
                    </View>
                </View>
                :
                activeSections.includes(1) ?
                    <View style={PAGESTYLE.content}>
                        <View style={PAGESTYLE.lessonDesc}>
                            <View style={PAGESTYLE.fileBoxGrpWrap}>
                                {
                                    item != undefined && item.MaterialList.length > 0 ?
                                        item.MaterialList.map((obj) => {
                                            return (
                                                <View style={PAGESTYLE.fileGrp}>
                                                    <Text style={PAGESTYLE.fileName}>{obj.originalname}</Text>
                                                    <TouchableOpacity onPress={() => Download(obj)} style={PAGESTYLE.downloaBtn}>
                                                        <Image source={Images.Download} style={PAGESTYLE.downloadIcon} />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }) :
                                        <Text style={{ alignSelf: 'center' }}>No material</Text>
                                }
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
                            {
                                item != undefined && item.WorkSpacelist.length > 0 ?
                                    item.WorkSpacelist.map((obj, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={PAGESTYLE.fileGrp}
                                                onPress={() => props.navigation.navigate('WorkSpace', { id: item.LessonId, isWorkspace: false, item: item.WorkSpacelist, tappedItem: index })}>
                                                <Text style={PAGESTYLE.fileName}>Workspace {index + 1}</Text>
                                                <Image source={require('../../../../assets/images/moreNew2.png')} style={PAGESTYLE.moreIcon} />
                                            </TouchableOpacity>
                                        )
                                    }) :
                                    <Text style={{ alignSelf: 'center' }}>No Workspace</Text>
                            }
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
                <Header6
                    title={` ${item.SubjectName}`}
                    date={moment(item.LessonDate).format('DD/MM/YYYY')}
                    goBack={() => props.navigation.goBack()}
                    onAlertPress={() => props.navigation.openDrawer()}
                    onOpenWorkSpacePress={() => props.navigation.navigate('WorkSpace', { onGoBack: () => refresh(), id: item.LessonId, isWorkspace: true })}
                    onSeeHomeworkPress={() => null} />
                <View>
                    <View style={{ height: '93%', bottom: 20 }}>
                        <View style={PAGESTYLE.largeVideoBlock}>
                            <Image source={Images.videoBanner} style={PAGESTYLE.largeVideo} />
                        </View>
                        <ScrollView style={{ top: 0, height: '100%' }} showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.videoTitleLine}>
                                <View>
                                    <Text style={PAGESTYLE.videoMainTitle}>{item.LessonTopic}</Text>
                                    <Text style={PAGESTYLE.videoPublishDate}>Published on {moment(item.LessonDate).format('ll')}</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.bookmarkuserNameMain}>
                                <View style={PAGESTYLE.userNameMain}>
                                    <View style={PAGESTYLE.userMainThumb}></View>
                                    <Text style={PAGESTYLE.mainNameText}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
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
                    </View>
                    <View style={PAGESTYLE.lessonstartButtonPupil}>
                            <TouchableOpacity style={PAGESTYLE.buttonGrp}
                                activeOpacity={opacity}
                                onPress={() => props.navigation.navigate('WorkSpace', { onGoBack: () => refresh(), id: item.LessonId, isWorkspace: true })}>
                                <Text style={[STYLE.commonButtonBorderedGreen, PAGESTYLE.fixedButton]}>open workspace</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={PAGESTYLE.buttonGrp}><Text style={[STYLE.commonButtonGreenDashboardSide, PAGESTYLE.fixedButton]}>see homework</Text></TouchableOpacity>
                        </View>
                </View>
            </View>
        </View>
    );
}
export default PupilLessonDetailInternal;