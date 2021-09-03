import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";

const ParentZoneSchoolDetails = (props) => {
    const [isHide, action] = useState(true);

    const [schoolData, setSchoolData] = useState(props.data);
    const [schoolFirstName, setSchoolFirstName] = useState('');
    const [schoolLastName, setSchoolLastName] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [schoolMobile, setSchoolMobile] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        Service.get(`${EndPoints.GetTeachersList}/${props.data.Pupilid}`, (res) => {
            if (res.code == 200) {
                let teacherName = ''
                for (let i = 0; i < res.data.length; i++) {
                    const ele = res.data[i];
                    teacherName = teacherName + (ele.TeacherFirstName + " " + ele.TeacherLastName) + (i == res.data.length - 1 ? '' : ' ')
                }
                setTeacherName(teacherName)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }, [])

    useEffect(() => {
        console.log('schoolData', schoolData);
        setSchoolFirstName(schoolData.SchoolFirstName)
        setSchoolLastName(schoolData.SchoolLastName)
        setUniqueCode(schoolData.UniqueNumber)
        setSchoolMobile(schoolData.SchoolMobileNumber + '')
        setAdd1(schoolData.SchoolAddressLine1)
        setAdd2(schoolData.SchoolAddressLine2)
        setCity(schoolData.SchoolCity)
        setZip(schoolData.SchoolPostalCode)
    }, [schoolData])

    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.profile}>
                            <View style={PAGESTYLE.managementBlockTop}>
                                {/* <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg}>
                                </ImageBackground> */}
                                <TopBackImg style={PAGESTYLE.managementopImage}  width={'100%'} height={hp(14.06)}/>
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
                                        style={[PAGESTYLE.commonInput, PAGESTYLE.fullInput]}
                                        placeholder="Moseley Church of England School"
                                        editable={false}
                                        maxLength={40}
                                        value={schoolFirstName + ' ' + schoolLastName}
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
                                        style={[PAGESTYLE.commonInput, PAGESTYLE.fullInput]}
                                        placeholder="Enter Unique Code"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        numberOfLines={4}
                                        value={uniqueCode}
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
                                        style={PAGESTYLE.commonInput}
                                        placeholder="Miss Rachel Barker"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={teacherName}
                                        placeholderTextColor={COLORS.darkGray}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={PAGESTYLE.fieldInputLabel}>School contact tel.</Text>
                                <View style={[PAGESTYLE.field, PAGESTYLE.filedSpace]}>

                                    <TextInput
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.t2.focus(); }}
                                        style={PAGESTYLE.commonInput}
                                        placeholder="01632 960600"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={schoolMobile}
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
                                        style={PAGESTYLE.commonInput}
                                        placeholder="23 York Road"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={add1}
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
                                        style={PAGESTYLE.commonInput}
                                        placeholder="Moseley"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={add2}
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
                                        style={PAGESTYLE.commonInput}
                                        placeholder="Birmingham"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={city}
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
                                        style={PAGESTYLE.commonInput}
                                        placeholder="B13 1LT"
                                        autoCapitalize={false}
                                        editable={false}
                                        maxLength={40}
                                        value={zip}
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
export default ParentZoneSchoolDetails;