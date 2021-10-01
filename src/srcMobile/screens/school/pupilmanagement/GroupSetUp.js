import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import FONTS from "../../../../utils/Fonts";
// import Images from "../../../../utils/Images";
import MESSAGE from "../../../../utils/Messages";
import { User } from "../../../../utils/Model";
import PAGESTYLE from './Style';
import Ic_Edit from '../../../../svg/teacher/pupilmanagement/Ic_Edit';
import UploadImage from '../../../../svg/teacher/pupilmanagement/UploadImage'

const GroupSetUp = (props) => {
    const [groups, setGroups] = useState([])
    const [pupils, setPupils] = useState([])
    const [pupilsClone, setPupilsClone] = useState([])
    const [groupsClone, setGroupsClone] = useState([])
    const [selectedPupils, setSelectedPupils] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isPupilLoading, setPupilLoading] = useState([])
    const [isGroupLoading, setGroupLoading] = useState([])

    // const [pupilsClone, setPupilsClone] = useState([])
    // const [groupsClone, setGroupsClone] = useState([])
    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        // setGroupLoading(true)

        // Service.get(`${EndPoints.GetParticipants}${User.user._id}`, (res) => {
        //     setGroupLoading(false)
        //     if (res.code == 200) {
        //         setGroups(res.data)
        //         setGroupsClone(res.data)
        //     } else {
        //         showMessage(res.message)
        //     }
        // }, (err) => {
        //     setGroupLoading(false)
        //     console.log('error of GetParticipants', err)
        // })

        loadGroup()

    }

    const loadGroup = () => {
        setGroupLoading(true)
        console.log('User.user.UserDetialId', User.user.UserDetialId);
        Service.get(`${EndPoints.GetClassSetup}/${User.user.UserDetialId}`, (res) => {
            console.log('response of groups', res);
            setGroupLoading(false)
            if (res.code == 200) {
                setGroups(res.data)
                setGroupsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of groups error', err);

            setGroupLoading(false)
        })
    }

    const Grouplist = (item) => (
        <View style={PAGESTYLE.groupParent}>
            <View style={PAGESTYLE.groupTitle1}>
                <Text style={PAGESTYLE.groupName} numberOfLines={1}>{item.item.GroupName}</Text>
                <TouchableOpacity
                    activeOpacity={opacity}
                    onPress={() => { props.props.navigation.navigate('SGroupSetUpPupilSelection', { onRefresh: () => refresh(), 'data': item.item.PupilList, groupName: item.item.GroupName, isForUpdate: true, groupId: item.item._id }) }}>
                    {/* <Image
                        style={PAGESTYLE.groupEdit1}
                        source={Images.Edit} /> */}
                    <Ic_Edit style={PAGESTYLE.groupEdit1} height={hp(2)} width={hp(2)} />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }}>
                    {item.item.PupilList.map((data, index) => (
                        <TouchableOpacity
                            activeOpacity={opacity}>
                            <Image style={PAGESTYLE.mediabarRight} source={{ uri: baseUrl + data.ProfilePicture }}></Image>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    const groupRender = ({ item, index }) => {
        return (
            <Grouplist
                item={item} index={index} />
        );
    };

    return (
        <SafeAreaView style={PAGESTYLE.mainPage1}>
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => { props.props.navigation.navigate('SGroupSetUpPupilSelection', { onRefresh: () => refresh(), isForUpdate: false }) }}>
                <View style={PAGESTYLE.newGroup}>
                    {/* <Image style={PAGESTYLE.createIcon} source={Images.uploadIcon} /> */}
                    <UploadImage style={PAGESTYLE.createIcon} width={hp(2)} height={hp(2)} />
                    <Text style={PAGESTYLE.newGroupLbl}>create new group</Text>
                </View>
            </TouchableOpacity>

            <View style={PAGESTYLE.right}>
                {isGroupLoading ?
                    <ActivityIndicator
                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                        color={COLORS.blueButton} />
                    :
                    groups.length > 0 ?
                        <FlatList
                            data={groups}
                            renderItem={groupRender}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        // <Text style={{ height: hp(6.15), fontSize: hp(2.46), padding: hp(1.23), textAlign: 'center' }}>No data found!</Text>
                        <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noGroup1} title2={MESSAGE.noGroup2} />
                }
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUp;