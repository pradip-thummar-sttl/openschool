import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant";
import FONTS from "../../../utils/Fonts";
import Images from "../../../utils/Images";
import { User } from "../../../utils/Model";
import PAGESTYLE from './Style';

const GroupSetUp = (props) => {
    console.log('props', props);

    const [groups, setGroups] = useState([])
    const [pupils, setPupils] = useState([])
    const [pupilsClone, setPupilsClone] = useState([])
    const [groupsClone, setGroupsClone] = useState([])
    const [selectedPupils, setSelectedPupils] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isPupilLoading, setPupilLoading] = useState([])
    const [isGroupLoading, setGroupLoading] = useState([])

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        setGroupLoading(true)

        // Service.get(`${EndPoints.GetParticipants}${User.user._id}`, (res) => {
        Service.get(`getparticipants/604b09139dc64117024690c3`, (res) => {
            setGroupLoading(false)
            if (res.code == 200) {
                setGroups(res.data)
                setGroupsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setGroupLoading(false)
            console.log('error of GetParticipants', err)
        })

    }

    const Grouplist = (item) => (
        <View style={PAGESTYLE.groupParent}>
            <View style={PAGESTYLE.groupTitle1}>
                <Text style={PAGESTYLE.groupName} numberOfLines={1}>{item.item.GroupName}</Text>
                <TouchableOpacity
                    style={{ height: 30, width: 30 }}
                    activeOpacity={opacity}
                    onPress={() => { props.props.navigation.navigate('GroupSetUpPupilSelection', { onRefresh: () => refresh(), 'data': item.item.PupilList }) }}>
                    <Image
                        style={PAGESTYLE.groupEdit1}
                        source={Images.Edit} />
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

    const pushGroup = (_index) => {
        if (selectedPupils.length != 0) {
            showMessage('Please reset your list first')
            return
        }

        setSelectedGroup([...selectedGroup, groupsClone[_index]])

        const newList = [], newSelectedList = []
        pupilsClone.map((item1) => {
            let flag = false
            groupsClone[_index].PupilList.map((item2) => {
                if (item1._id == item2.PupilId) {
                    flag = true
                }
            })
            if (!flag) {
                newList.push(item1)
            } else {
                newSelectedList.push(item1)
            }
        });
        setPupilsClone(newList)
        setSelectedPupils(newSelectedList)
        setGroupName(groupsClone[_index].GroupName)
    }


    return (
        <SafeAreaView style={PAGESTYLE.mainPage1}>
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => { props.props.navigation.navigate('GroupSetUpPupilSelection', { onRefresh: () => refresh(), }) }}>
                <View style={PAGESTYLE.newGroup}>
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
                            showsVerticalScrollIndicator={false} />
                        :
                        <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                }
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUp;