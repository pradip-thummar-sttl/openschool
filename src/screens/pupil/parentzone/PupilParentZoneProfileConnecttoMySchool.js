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

const PupilParentZoneProfileConnecttoMySchool = () => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.tabLinks}>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Newsfeed</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Performance</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Chat</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Faq</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkGrey}>Profile</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={PAGESTYLE.tabLinkSelected}>My School</Text></TouchableOpacity>
                        </View>

                        <View style={PAGESTYLE.managementDetail}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                    <TouchableOpacity>
                                        <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>save changes</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.titleInnerRow]}>
                            <Text style={PAGESTYLE.titleInner}>School details</Text>
                        </View>

                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, PAGESTYLE.profileFormTopSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>School name</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Moseley Church of England School"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        numberOfLines={4}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Unique Link Code</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Enter Unique Code"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        numberOfLines={4}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Teacher name</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Miss Rachel Barker"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>School contact tel.</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="01632 960600"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />

                                </View>
                            </View>
                        </View>


                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Address Line 1</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="23 York Road"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Address Line 2</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Moseley"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>City</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Birmingham"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Postcode</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="B13 1LT"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilParentZoneProfileConnecttoMySchool;