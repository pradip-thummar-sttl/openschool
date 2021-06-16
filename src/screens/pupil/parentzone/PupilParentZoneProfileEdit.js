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

const PupilParentZoneProfileEdit = () => {
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
                                    <View style={PAGESTYLE.thumbTopUser}>
                                        <Image style={PAGESTYLE.pzEditIcon} source={Images.editIcon} />
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={[STYLE.commonButtonGreen, PAGESTYLE.topBannerBtn]}>EDit Profile</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, PAGESTYLE.formTopSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Reuel"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Last Name</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Pardesi"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Date of Birth</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <Image source={Images.CalenderIconSmall} style={PAGESTYLE.dateIconSml} />
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={[STYLE.commonInput, PAGESTYLE.dateField]}
                                        placeholder="Select"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                    <Image source={Images.DropArrow} style={PAGESTYLE.dropArrow} />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Unique I.D (auto-generated)</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="RD102010"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Notes</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={[STYLE.commonInput, PAGESTYLE.textArea]}
                                        placeholder="You can leave notes here for the teacher such as special needs, behaviour, performance, things to discuss with teachers etc."
                                        autoCapitalize={false}
                                        maxLength={40}
                                        multiline
                                        numberOfLines={4}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Relationship to pupil</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Mother"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                    <Image source={Images.DropArrow} style={PAGESTYLE.dropArrow} />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Set 4 digit passcode</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <View style={PAGESTYLE.eyeParent}>
                                        <TextInput
                                            style={STYLE.commonInputPassword}
                                            placeholder="Password"
                                            maxLength={30}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                        />

                                        <View style={PAGESTYLE.eye}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={Images.HidePassword} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace]}>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Parent/Guardian Name</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Ann-Le Pardesi"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />

                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Contact tel.</Text>
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
                                <Text style={PAGESTYLE.fieldInputLabel}>Associated email for child’s acc.</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={STYLE.commonInput}
                                        placeholder="Date"
                                        autoCapitalize={false}
                                        maxLength={40}
                                        placeholderTextColor={COLORS.lightplaceholder}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>Password</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                    <View style={PAGESTYLE.eyeParent}>
                                        <TextInput
                                            style={STYLE.commonInputPassword}
                                            placeholder="Password"
                                            maxLength={30}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                        />

                                        <View style={PAGESTYLE.eye}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={Images.HidePassword} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
export default PupilParentZoneProfileEdit;