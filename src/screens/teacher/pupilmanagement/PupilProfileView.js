import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant";
import Images from "../../../utils/Images";
import { User } from "../../../utils/Model";
import STYLE from '../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import HeaderPMInner from './HeaderPMInner';
import moment from 'moment';

const PupilProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    console.log('props', props.selectedPupil);
    return (
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInner navigateToBack={() => props.navigateToBack()} />
            <View style={{ width: isHide ? '100%' : '100%', }}>
                <View style={PAGESTYLE.whiteBg}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                    <View style={PAGESTYLE.thumbTopUser}>
                                        <Image style={{ height: '100%', width: '100%', borderRadius: 100 }}
                                            source={{ uri: baseUrl + props.selectedPupil.ProfilePicture }} />
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>EDit Profile</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={PAGESTYLE.managementNameSec}>
                                <View style={PAGESTYLE.nameSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Pupil name</Text>
                                    <Text style={PAGESTYLE.userName}>{props.selectedPupil.FirstName} {props.selectedPupil.LastName}</Text>
                                </View>
                                <View style={PAGESTYLE.dateSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Date of Birth</Text>
                                    <Text style={PAGESTYLE.userName}>{moment(props.selectedPupil.Dob).format('DD/MM/yyyy')}</Text>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.userLabel}>Unique I.D (auto-generated)</Text>
                                    <Text style={PAGESTYLE.userName}>{props.selectedPupil.FirstName}</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.managementParaSec}>
                                <Text style={PAGESTYLE.userLabel}>Notes</Text>
                                <Text style={PAGESTYLE.paragraphText}>{props.selectedPupil.FirstName}</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.rateAnnotationBlock}>
                            <View style={PAGESTYLE.ratingBlock}>
                                <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                <View style={PAGESTYLE.achivementBox}>
                                    <View style={PAGESTYLE.rewardStarMark}>
                                        <View style={PAGESTYLE.centerText}>
                                            <Image source={Images.BronzeStar} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                        </View>
                                        <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                            <Image source={Images.SilverStar} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerText}>
                                            <Image source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]} />
                                            <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.annotationText}>
                                <Text style={[PAGESTYLE.userLabel, PAGESTYLE.anoteTitle]}>Annotation</Text>
                                <Text style={[PAGESTYLE.paragraphText, PAGESTYLE.annotationBox]}>{props.selectedPupil.FirstName}</Text>
                            </View>
                        </View>
                        <View style={PAGESTYLE.generalRow}>
                            <Text style={PAGESTYLE.graphTitle}>Pupil’s performance</Text>
                        </View>
                        <View style={PAGESTYLE.graphBlock}>

                            <View style={PAGESTYLE.graphBox}>
                                <View style={PAGESTYLE.generalRow}>
                                    <View style={PAGESTYLE.chartBlock}>
                                        <Image source={Images.chartImg} style={PAGESTYLE.mngmntchartImg} />
                                    </View>
                                    <View>
                                        <Text style={PAGESTYLE.graphChartText}>Pupils are engaged and using the app and submitting home work on time. </Text>
                                        <View style={[PAGESTYLE.generalRow, PAGESTYLE.listBottomSpace]}>
                                            <Image source={Images.purpleMarkImg} style={PAGESTYLE.purpleMark} />
                                            <Text style={PAGESTYLE.labelMark}>Pupil engagement over last month</Text>
                                        </View>
                                        <View style={PAGESTYLE.generalRow}>
                                            <Image source={Images.orangeMarkImg} style={PAGESTYLE.orangeMark} />
                                            <Text style={PAGESTYLE.labelMark}>Pupil effort over last month</Text>
                                        </View>
                                    </View>
                                </View>
                                <Image source={Images.graphImg} style={PAGESTYLE.mngmntgraphImg} />
                            </View>
                            <View>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
export default PupilProfileView;