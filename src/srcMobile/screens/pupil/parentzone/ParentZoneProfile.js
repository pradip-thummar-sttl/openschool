import React, { useState, useEffect, useRef } from "react";
import { opacity, NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, TextInput, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
// import Images from '../../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../../utils/Fonts';
import HeaderPM from "./HeaderPM";
import { PanGestureHandler } from "react-native-gesture-handler";
import moment from 'moment';
import { baseUrl } from "../../../../utils/Constant";
import Ic_CheckWhite from "../../../../svg/pupil/parentzone/Ic_CheckWhite";
import EditProfileTop_Mobile from "../../../../svg/pupil/parentzone/EditProfileTopBg_Mobile";
import EditWhite from "../../../../svg/pupil/parentzone/EditWhite";

const PupilProfileView = (props) => {
    console.log('PupilProfileView ->>>>> props.data', props.data);
    // const item = props.route.params.item;
    const [isHide, action] = useState(true);
    
    return (
        <View>
            <View style={PAGESTYLE.MainProfile}>
                <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.mainContainerProfile}>
                        <View style={PAGESTYLE.profileImageArea}>
                            {/* <Image style={PAGESTYLE.coverImage} source={Images.parentProfilecoverImage}></Image> */}
                            <EditProfileTop_Mobile style={PAGESTYLE.coverImage} height={hp(13.8)} width={'100%'} />
                            <View style={PAGESTYLE.profileOuter}>
                                <Image style={PAGESTYLE.profileImage} source={{ uri: baseUrl + props.data.ProfilePicture }} />
                            </View>
                        </View>
                    </View>
                    <View style={PAGESTYLE.mainDetails}>
                        <View style={PAGESTYLE.editProfileButtonMain}>
                            <TouchableOpacity onPress={() => props.navigateToDetail()} style={PAGESTYLE.profileEdit}>
                                {/* <Image  style={PAGESTYLE.profileeditButton} /> */}
                                <EditWhite style={PAGESTYLE.profileeditButton} height={hp(1.57)} width={hp(1.57)} />
                            </TouchableOpacity>
                        </View>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Student details</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Name</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.FirstName} {props.data.LastName}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                            <Text P style={PAGESTYLE.data}>{moment(props.data.Dob).format('DD/MM/yyyy')}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.UniqueNumber}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.Note ? props.data.Note : '-'}</Text>
                        </View>
                        <View style={PAGESTYLE.pupilPerfomance}>
                            <Text H2 style={PAGESTYLE.titlePerfomance}>Parent/Guardian</Text>
                            <View HR style={STYLE.hrCommon}></View>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Relationship to pupil</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.Relationship ? props.data.Relationship : '-'}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Parent/Guardian Name</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.ParentFirstName} {props.data.ParentLastName}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Contact tel.</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.MobileNumber}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Associated email for child’s acc.</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.Email}</Text>
                        </View>
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Password</Text>
                            <Text P style={PAGESTYLE.data}>*******</Text>
                        </View>
                        {props.data.AddressLine1.length > 0 || props.data.AddressLine1.length > 0 ?
                        <View style={PAGESTYLE.fieldDetails}>
                            <Text LABLE style={PAGESTYLE.label}>Address</Text>
                            <Text P style={PAGESTYLE.data}>{props.data.AddressLine1} {props.data.AddressLine2} {props.data.City} {props.data.PostCode}</Text>
                        </View>
                        :
                        null
}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PupilProfileView;