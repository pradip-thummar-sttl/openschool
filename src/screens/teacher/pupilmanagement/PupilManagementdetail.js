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

const PupilManagementdetail = () => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.managementDetail}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                    <View style={PAGESTYLE.thumbTopUser}></View>
                                    <TouchableOpacity>
                                        <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>EDit Profile</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={PAGESTYLE.managementNameSec}>
                                <View style={PAGESTYLE.nameSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Pupil name</Text>
                                    <Text style={PAGESTYLE.userName}>Reuel Pardesi</Text>
                                </View>
                                <View style={PAGESTYLE.dateSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Date of Birth</Text>
                                    <Text style={PAGESTYLE.userName}>17/07/2012</Text>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.userLabel}>Unique I.D (auto-generated)</Text>
                                    <Text style={PAGESTYLE.userName}>RP170712</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.managementParaSec}>
                                <Text style={PAGESTYLE.userLabel}>Notes</Text>
                                <Text style={PAGESTYLE.paragraphText}>Reuel is a bright boy that is always helpful to all those around him. He is eager to learn and is particularly interesting Mathematics and Science.</Text>
                                <Text style={PAGESTYLE.paragraphText}>Reminder: Mention to parent that he is nominated to participate in Science Wiz quiz. Need parent signature and confirmation.</Text>
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
                                <Text style={[PAGESTYLE.paragraphText, PAGESTYLE.annotationBox]}>Rainforests are one of the oldest ecosystems on Earth and are fundamental to all life on the planet. You will learn all about different forms of physical geography, including different world ecosystems. You will also learn about everyday items that come from the Amazon Rainforest.</Text>
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
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default  PupilManagementdetail;