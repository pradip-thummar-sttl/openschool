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
import moment from 'moment';
import EditProfileTop_Tablet from "../../../../svg/pupil/parentzone/EditProfileTopBg_Tablet";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ParentZoneProfile = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [childrenList, setChildrenList] = useState(User.user.ChildrenList)
    return (
        <View style={PAGESTYLE.mainPage}>
            {/* <Sidebar hide={() => action(!isHide)} /> */}
            <View style={{ width: isHide ? '100%' : '78%', backgroundColor: COLORS.backgroundColorCommon }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.profile}>
                                <View style={PAGESTYLE.managementBlockTop} >
                                    {/* <ImageBackground style={PAGESTYLE.managementopImage} source={Images.managementBlockTopImg} /> */}
                                    <EditProfileTop_Tablet style={PAGESTYLE.managementopImage} 
                                    height={hp(14.06)} width={'100%'}/>
                                    {/* childrenList.length == 0 ? Images.userparent : */}
                                    <Image style={PAGESTYLE.proffileLogo} source={ { uri: baseUrl + props.data.ProfilePicture }} />
                                    <View style={PAGESTYLE.topBannerParent}>
                                        <TouchableOpacity
                                            activeOpacity={opacity}
                                            onPress={() => { props.navigateToDetail() }}>
                                            <Text style={[PAGESTYLE.topBannerBtn1,{fontSize : 15}]}>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[PAGESTYLE.profileTitleRow]}>
                                    <Text style={PAGESTYLE.titleInner}>Student details</Text>
                                </View>
                                <View style={PAGESTYLE.managementProfileSec}>
                                    <View style={PAGESTYLE.nameSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Name</Text>
                                        <Text style={PAGESTYLE.userName}>{props.data.FirstName} {props.data.LastName}</Text>
                                    </View>
                                    <View style={PAGESTYLE.dateSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Date of Birth</Text>
                                        <Text style={PAGESTYLE.userName}>{moment(props.data.Dob).format('DD/MM/yyyy')}</Text>
                                    </View>
                                    <View style={PAGESTYLE.UniqueNumberClass}>
                                        <Text style={PAGESTYLE.userLabel}>Unique I.D (auto-generated)</Text>
                                        <Text style={PAGESTYLE.userName}>{props.data.UniqueNumber}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.managementParaSec}>
                                    <Text style={PAGESTYLE.userLabel}>Notes</Text>
                                    <Text style={PAGESTYLE.paragraphText}>{props.data.Note ? props.data.Note : '-'}</Text>
                                </View>

                                <View style={[PAGESTYLE.profileTitleRow]}>
                                    <Text style={PAGESTYLE.titleInner}>Parent/Guardian</Text>
                                </View>
                                <View style={PAGESTYLE.managementProfileSec}>
                                    <View style={PAGESTYLE.nameSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Relationship to pupil</Text>
                                        <Text style={PAGESTYLE.userNameNormal}>{props.data.Relationship ? props.data.Relationship : '-'}</Text>
                                    </View>
                                    <View style={PAGESTYLE.dateSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Parent/Guardian Name</Text>
                                        <Text style={PAGESTYLE.userNameNormal}>{props.data.ParentFirstName} {props.data.ParentLastName}</Text>
                                    </View>
                                    <View>
                                        <Text style={PAGESTYLE.userLabel}>Contact tel.</Text>
                                        <Text style={PAGESTYLE.userNameNormal}>{props.data.MobileNumber}</Text>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.managementProfileSec}>
                                    <View style={PAGESTYLE.mailSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Associated email for child’s acc.</Text>
                                        <Text style={PAGESTYLE.userNameNormal}>{props.data.Email}</Text>
                                    </View>
                                    <View style={PAGESTYLE.passSmlBlock}>
                                        <Text style={PAGESTYLE.userLabel}>Password</Text>
                                        <Text style={PAGESTYLE.userNameNormal}>*******</Text>
                                    </View>
                                </View>
                                {props.data.AddressLine1.length > 0 || props.data.AddressLine1.length > 0 ?
                                    <View style={PAGESTYLE.managementProfileSec}>
                                        <View style={PAGESTYLE.addSmlBlock}>
                                            <Text style={PAGESTYLE.userLabel}>Address</Text>
                                            <Text style={[PAGESTYLE.userNameNormal, PAGESTYLE.addressText]}>{props.data.AddressLine1} {props.data.AddressLine2} {props.data.City} {props.data.PostCode}</Text>
                                        </View>
                                    </View>
                                    :
                                    null
                                }
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default ParentZoneProfile;