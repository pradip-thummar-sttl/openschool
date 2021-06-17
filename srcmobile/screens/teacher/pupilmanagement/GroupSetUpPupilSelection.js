import CheckBox from "@react-native-community/checkbox";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant";
import Images from "../../../utils/Images";
import { User } from "../../../utils/Model";
import PAGESTYLE from './Style';

const GroupSetUpPupilSelection = (props) => {

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

        setPupilLoading(true)

        // Service.get(`${EndPoints.GetPupilByTeacherId}${User.user._id}`, (res) => {
        Service.get(`pupilbyteacherid/604b09139dc64117024690c3`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                setPupils(res.data)
                setPupilsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
            console.log('error of GetPupilByTeacherId', err)
        })
    }, [])

    const saveGroup = () => {
        let data = {

        }

        // Service.get(`${EndPoints.Groupsetup}`, (res) => {
        Service.post(`groupsetup`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                setPupils(res.data)
                setPupilsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
            console.log('error of GetPupilByTeacherId', err)
        })
    }

    const Pupillist = (props) => (
        <TouchableOpacity
            activeOpacity={opacity}
            onPress={() => pushPupil(props.index)}>
            <View style={{ flexDirection: 'column' }}>
                <View style={PAGESTYLE.pupilParent1}>
                    <Image
                        style={PAGESTYLE.mediabar}
                        source={{ uri: baseUrl + props.item.ProfilePicture }}></Image>
                    <Text style={PAGESTYLE.pupilName1} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
                    <View style={PAGESTYLE.checkMark}>
                        <CheckBox
                            boxType={'square'}
                            onCheckColor={COLORS.white}
                            tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                            onFillColor={COLORS.dashboardPupilBlue}
                            onTintColor={COLORS.dashboardPupilBlue}
                            tintColor={COLORS.dashboardPupilBlue}
                            tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                            onValueChange={(newValue) => { console.log('newValue', newValue); }}
                        />
                    </View>
                </View>
                <View style={PAGESTYLE.bar}></View>
            </View>
        </TouchableOpacity>
    );

    const pupilRender = ({ item, index }) => {
        return (
            <Pupillist
                item={item} index={index} />
        );
    };

    const pushPupil = (_index) => {
        setSelectedPupils([...selectedPupils, pupilsClone[_index]])

        const newList = pupilsClone.filter((item, index) => index !== _index);
        setPupilsClone(newList)
    }

    return (
        <SafeAreaView style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.white }}>
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => props.route.params.goBack()}>
                <Image style={PAGESTYLE.arrow} source={Images.backArrow} />
            </TouchableOpacity>
            <TextInput
                returnKeyType={"done"}
                style={PAGESTYLE.input1}
                placeholder="Enter group name"
                autoCapitalize={'sentences'}
                maxLength={40}
                placeholderTextColor={COLORS.lightplaceholder}
                value={groupName}
                onChangeText={groupName => { setGroupName(groupName) }} />
            <View style={PAGESTYLE.left1}>
                {isPupilLoading ?
                    <ActivityIndicator
                        size={Platform.OS == 'ios' ? 'large' : 'small'}
                        color={COLORS.blueButton} />
                    :
                    pupilsClone.length > 0 ?
                        <FlatList
                            data={pupilsClone}
                            renderItem={pupilRender}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false} />
                        :
                        <View>
                            <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUpPupilSelection;