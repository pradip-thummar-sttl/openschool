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

const ParentZoneProfile = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.managementDetail}>
                                <View style={PAGESTYLE.managementBlockTop}>
                                    <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg} />
                                    <View style={PAGESTYLE.topBannerParent}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { props.navigateToDetail() }}>
                                            <Text style={PAGESTYLE.topBannerBtn1}>EDit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.profileTitleRow]}>
                                    <Text style={PAGESTYLE.titleInner}>School details</Text>
                                </View>
                                <View style={PAGESTYLE.managementProfileSec}>
                                    <View style={PAGESTYLE.nameSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Name</Text>
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
                                    <Text style={PAGESTYLE.paragraphText}>Reuel has peanut and dairy allergies. I will make sure he carries medication with him. </Text>
                                </View>
                            </View>

                            <View style={[PAGESTYLE.profileTitleRow]}>
                                <Text style={PAGESTYLE.titleInner}>Parent/Guardian</Text>
                            </View>
                            <View style={PAGESTYLE.managementProfileSec}>
                                <View style={PAGESTYLE.nameSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Relationship to pupil</Text>
                                    <Text style={PAGESTYLE.userNameNormal}>Mother</Text>
                                </View>
                                <View style={PAGESTYLE.dateSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Parent/Guardian Name</Text>
                                    <Text style={PAGESTYLE.userName}>Ann Le-Pardesi</Text>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.userLabel}>Contact tel.</Text>
                                    <Text style={PAGESTYLE.userName}>01632 960600</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.managementProfileSec}>
                                <View style={PAGESTYLE.nameSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Associated email for child’s acc.</Text>
                                    <Text style={PAGESTYLE.userNameNormal}>ann@gmail.com</Text>
                                </View>
                                <View style={PAGESTYLE.dateSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Password</Text>
                                    <Text style={PAGESTYLE.userName}>*****************</Text>
                                </View>
                            </View>
                            <View style={PAGESTYLE.managementProfileSec}>
                                <View style={PAGESTYLE.nameSmlBlock}>
                                    <Text style={PAGESTYLE.userLabel}>Address</Text>
                                    <Text style={[PAGESTYLE.userNameNormal, PAGESTYLE.addressText]}>23 York Road, Moseley, Birmingham, B13 1LT</Text>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default ParentZoneProfile;