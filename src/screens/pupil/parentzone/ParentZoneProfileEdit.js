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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { add, not } from "react-native-reanimated";
import moment from 'moment';

const ParentZoneProfileEdit = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const [profileData, setProfileData] = useState(props.data);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [note, setNote] = useState('');
    const [relation, setRelation] = useState('');
    const [code, setCode] = useState('');
    const [parentName, setParentName] = useState('');
    const [mobile, setMobile] = useState('');
    const [childEmail, setChildEmail] = useState('');
    const [childPass, setChildPass] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        setFirstName(profileData.FirstName)
        setLastName(profileData.LastName)
        setDob(moment(profileData.Dob).format('DD/MM/yyyy'))
        setUniqueCode(profileData.UniqueNumber)
        setNote(profileData.Note)
        setRelation(profileData.Relationship)
        setCode(profileData.PinPassword)
        setParentName(profileData.ParentFirstName + ' ' + profileData.ParentLastName)
        setMobile(profileData.MobileNumber)
        setChildEmail(profileData.Email)
        setAdd1(profileData.AddressLine1)
        setAdd2(profileData.AddressLine2)
        setCity(profileData.City)
        setZip(profileData.PostCode)
    }, [profileData])

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PAGESTYLE.whiteBg}>
                            <View style={PAGESTYLE.managementDetail}>
                                <View style={PAGESTYLE.managementBlockTop}>
                                    <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                        <View style={PAGESTYLE.thumbTopUser}>
                                            <Image style={PAGESTYLE.pzEditIcon} source={Images.editIcon} />
                                        </View>
                                        <View style={PAGESTYLE.topBannerParent}>
                                            <TouchableOpacity
                                                activeOpacity={opacity}
                                                onPress={() => { props.navigateToProfile() }}>
                                                <Text style={PAGESTYLE.topBannerBtn1}>Save Profile</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={[PAGESTYLE.loginAccountForm, PAGESTYLE.formSpace, PAGESTYLE.formTopSpace]}>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>First Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={(input) => { this.t1 = input; }}
                                            onSubmitEditing={() => { this.t2.focus(); }}
                                            style={STYLE.commonInput}
                                            value={firstName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={firstName => setFirstName(firstName)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Last Name</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={(input) => { this.t2 = input; }}
                                            onSubmitEditing={() => { this.t3.focus(); }}
                                            style={STYLE.commonInput}
                                            value={lastName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setLastName(lastName)}
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
                                            ref={(input) => { this.t3 = input; }}
                                            onSubmitEditing={() => { this.t4.focus(); }}
                                            style={STYLE.commonInput}
                                            value={uniqueCode}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={lastName => setUniqueCode(uniqueCode)}
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
                                            ref={(input) => { this.t4 = input; }}
                                            onSubmitEditing={() => { this.t5.focus(); }}
                                            style={[STYLE.commonInput, PAGESTYLE.textArea]}
                                            placeholder="You can leave notes here for the teacher such as special needs, behaviour, performance, things to discuss with teachers etc."
                                            value={note}
                                            autoCapitalize={'sentences'}
                                            multiline
                                            numberOfLines={4}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={note => setNote(note)}
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
                                            ref={(input) => { this.t5 = input; }}
                                            onSubmitEditing={() => { this.t6.focus(); }}
                                            style={STYLE.commonInput}
                                            value={relation}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={relation => setRelation(relation)}
                                        />
                                        {/* <Image source={Images.DropArrow} style={PAGESTYLE.dropArrow} /> */}
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Set 4 digit passcode</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <View style={PAGESTYLE.eyeParent}>
                                            <TextInput
                                                ref={(input) => { this.t6 = input; }}
                                                onSubmitEditing={() => { this.t7.focus(); }}
                                                style={STYLE.commonInputPassword}
                                                value={code}
                                                maxLength={30}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={code => setCode(code)}
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
                                            ref={(input) => { this.t7 = input; }}
                                            onSubmitEditing={() => { this.t8.focus(); }}
                                            style={STYLE.commonInput}
                                            value={parentName}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={pName => setParentName(pName)}
                                        />

                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Contact tel.</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={(input) => { this.t8 = input; }}
                                            onSubmitEditing={() => { this.t9.focus(); }}
                                            style={STYLE.commonInput}
                                            value={mobile}
                                            keyboardType={'phone-pad'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={mobile => setMobile(mobile)}
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
                                            ref={(input) => { this.t9 = input; }}
                                            onSubmitEditing={() => { this.t10.focus(); }}
                                            style={STYLE.commonInput}
                                            value={childEmail}
                                            autoCapitalize={false}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={email => setChildEmail(email)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Password</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <View style={PAGESTYLE.eyeParent}>
                                            <TextInput
                                                placeholder="Password"
                                                autoCapitalize={'none'}
                                                ref={(input) => { this.t10 = input; }}
                                                onSubmitEditing={() => { this.t11.focus(); }}
                                                style={STYLE.commonInputPassword}
                                                value={childPass}
                                                maxLength={30}
                                                placeholderTextColor={COLORS.lightplaceholder}
                                                onChangeText={pass => setChildPass(pass)}
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
                                            ref={(input) => { this.t11 = input; }}
                                            onSubmitEditing={() => { this.t12.focus(); }}
                                            style={STYLE.commonInput}
                                            value={add1}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={add1 => setAdd1(add1)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Address Line 2</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={(input) => { this.t12 = input; }}
                                            onSubmitEditing={() => { this.t13.focus(); }}
                                            style={STYLE.commonInput}
                                            value={add2}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={add2 => setAdd2(add2)}
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
                                            ref={(input) => { this.t13 = input; }}
                                            onSubmitEditing={() => { this.t14.focus(); }}
                                            style={STYLE.commonInput}
                                            value={city}
                                            autoCapitalize={'words'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={city => setCity(city)}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={PAGESTYLE.fieldInputLabel}>Postcode</Text>
                                    <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>
                                        <TextInput
                                            returnKeyType={"next"}
                                            ref={(input) => { this.t14 = input; }}
                                            style={STYLE.commonInput}
                                            value={zip}
                                            keyboardType={'phone-pad'}
                                            maxLength={40}
                                            placeholderTextColor={COLORS.lightplaceholder}
                                            onChangeText={zip => setZip(zip)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
export default ParentZoneProfileEdit;