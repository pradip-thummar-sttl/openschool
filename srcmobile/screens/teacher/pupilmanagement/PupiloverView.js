import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPM from "./HeaderPM";

const { CallModule } = NativeModules;

const PupiloverView = (props) => {
    const [isHide, action] = useState(true);
    return (
        <View>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderPM onAlertPress={() => props.navigation.openDrawer()} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.mainPage}>
                    <View style={PAGESTYLE.mainContainer}>
                        <TouchableOpacity onPress={() => props.navigation.replace('PupilProfileView')}>
                            <View style={[PAGESTYLE.pupilData]}>
                                <View style={PAGESTYLE.pupilProfile}>
                                    <View style={PAGESTYLE.rowProfile}>
                                        <Image style={PAGESTYLE.pupilImage}></Image>
                                        <Text style={PAGESTYLE.pupilName}>Pratik</Text>
                                    </View>
                                    <View style={PAGESTYLE.groupPupil}>
                                        <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rewardColumn}>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                </View>
                                <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
                                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[PAGESTYLE.pupilData]}>
                                <View style={PAGESTYLE.pupilProfile}>
                                    <View style={PAGESTYLE.rowProfile}>
                                        <Image style={PAGESTYLE.pupilImage}></Image>
                                        <Text style={PAGESTYLE.pupilName}>Pratik</Text>
                                    </View>
                                    <View style={PAGESTYLE.groupPupil}>
                                        <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rewardColumn}>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                </View>
                                <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
                                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[PAGESTYLE.pupilData]}>
                                <View style={PAGESTYLE.pupilProfile}>
                                    <View style={PAGESTYLE.rowProfile}>
                                        <Image style={PAGESTYLE.pupilImage}></Image>
                                        <Text style={PAGESTYLE.pupilName}>Pratik</Text>
                                    </View>
                                    <View style={PAGESTYLE.groupPupil}>
                                        <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rewardColumn}>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                </View>
                                <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
                                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[PAGESTYLE.pupilData]}>
                                <View style={PAGESTYLE.pupilProfile}>
                                    <View style={PAGESTYLE.rowProfile}>
                                        <Image style={PAGESTYLE.pupilImage}></Image>
                                        <Text style={PAGESTYLE.pupilName}>Pratik</Text>
                                    </View>
                                    <View style={PAGESTYLE.groupPupil}>
                                        <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rewardColumn}>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                </View>
                                <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
                                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[PAGESTYLE.pupilData]}>
                                <View style={PAGESTYLE.pupilProfile}>
                                    <View style={PAGESTYLE.rowProfile}>
                                        <Image style={PAGESTYLE.pupilImage}></Image>
                                        <Text style={PAGESTYLE.pupilName}>Pratik</Text>
                                    </View>
                                    <View style={PAGESTYLE.groupPupil}>
                                        <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.rewardColumn}>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.BronzeStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.SilverStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                    <View style={PAGESTYLE.rewardStar}><Image source={Images.GoldStar} style={PAGESTYLE.rewardStartIcon} /></View>
                                </View>
                                <TouchableOpacity style={PAGESTYLE.pupilDetailLink}>
                                    <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupiloverView;