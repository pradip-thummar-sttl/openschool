import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, opacity, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import { User } from "../../../../utils/Model";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";

const ParentZoneSchoolDetails = (props) => {
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
        <View>
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommonPupilEditSchool} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image> */}
                            <EditProfileTop_Mobile style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetailsFormSchool}>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>School details</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>School name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="School name"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={schoolFirstName + ' ' + schoolLastName}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Unique Link Code</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Unique Link Code"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={uniqueCode}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Teacher name</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Teacher name"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={teacherName}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>School contact tel.</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="School contact tel."
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={schoolMobile}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Address Line 1</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Address Line 1"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={add1}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Address Line 2</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Address Line 2"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={add2}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>City</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="City"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={city}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                        <View style={PAGESTYLE.fieldDetailsForm}>
                            <Text LABLE style={PAGESTYLE.labelForm}>Postcode</Text>
                            <TextInput
                                returnKeyType={"next"}
                                style={STYLE.commonInputGrayBack}
                                placeholder="Postcode"
                                autoCapitalize={'none'}
                                editable={false}
                                enabled={false}
                                maxLength={40}
                                value={zip}
                                placeholderTextColor={COLORS.menuLightFonts} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentZoneSchoolDetails;