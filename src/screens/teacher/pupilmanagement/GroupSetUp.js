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

const GroupSetUp = () => {

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

    const saveGroup = () =>{
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
                <View style={PAGESTYLE.pupilParent}>
                    <Image
                        style={PAGESTYLE.mediabar}
                        source={{ uri: baseUrl + props.item.ProfilePicture }}></Image>
                    <Text style={PAGESTYLE.pupilName} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
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

    const SelectedPupillist = (props) => (
        <View style={{ width: '33%', }}>
            <View style={PAGESTYLE.selectedPupilParent}>
                <Image
                    style={PAGESTYLE.selectedMediabar}
                    source={{ uri: baseUrl + props.item.ProfilePicture }} />
                <Text style={PAGESTYLE.selectedPupilName} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
                <TouchableOpacity
                    style={{ justifyContent: 'center', flex: 1 }}
                    activeOpacity={opacity}
                    onPress={() => popPupil(props.index)}>
                    <Image
                        style={PAGESTYLE.selectedRemove}
                        source={Images.PopupCloseIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const selectedPupilRender = ({ item, index }) => {
        return (
            <SelectedPupillist
                item={item} index={index} />
        );
    };

    const Grouplist = (props) => (
        <View style={PAGESTYLE.groupParent}>
            <View style={PAGESTYLE.groupTitle}>
                <Text style={PAGESTYLE.groupName} numberOfLines={1}>{props.item.GroupName}</Text>
                <TouchableOpacity
                    style={{ justifyContent: 'center', flex: 1 }}
                    activeOpacity={opacity}
                    onPress={() => pushGroup(props.index)}>
                    {selectedGroup.length == 0 ?
                        <Image
                            style={PAGESTYLE.groupEdit}
                            source={Images.Edit} />
                        :
                        null
                    }
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }}>
                    {props.item.PupilList.map((data, index) => (
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

    const pushPupil = (_index) => {
        setSelectedPupils([...selectedPupils, pupilsClone[_index]])

        const newList = pupilsClone.filter((item, index) => index !== _index);
        setPupilsClone(newList)
    }

    const popPupil = (_index) => {
        setPupilsClone([...pupilsClone, selectedPupils[_index]])

        const newList = selectedPupils.filter((item, index) => index !== _index);
        setSelectedPupils(newList)
    }

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

    const reset = () => {
        setPupilsClone(pupils)
        setGroupsClone(groups)
        setSelectedPupils([])
        setSelectedGroup([])
        setGroupName('')
    }

    return (
        <SafeAreaView style={PAGESTYLE.mainPage}>
            <View style={PAGESTYLE.left}>
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
            <View style={PAGESTYLE.middle}>
                <TextInput
                    returnKeyType={"done"}
                    style={PAGESTYLE.input}
                    placeholder="Enter group name"
                    autoCapitalize={'sentences'}
                    maxLength={40}
                    placeholderTextColor={COLORS.lightplaceholder}
                    value={groupName}
                    onChangeText={groupName => { setGroupName(groupName) }} />
                {selectedPupils.length > 0 ?
                    <>
                        <FlatList
                            data={selectedPupils}
                            renderItem={selectedPupilRender}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: "space-around", margin: 10 }} />
                        <View style={PAGESTYLE.bar}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{ ...PAGESTYLE.buttonParent, backgroundColor: COLORS.dashboardGreenButton, }}
                                onPress={() => { launchLiveClass() }}>
                                <Text style={PAGESTYLE.button}>Assign Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={PAGESTYLE.buttonParent}
                                onPress={() => { reset() }}>
                                <Text style={{ ...PAGESTYLE.button, color: COLORS.dashboardGreenButton }}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <View>
                        <Text style={PAGESTYLE.label}>Tap on the pupil to create a new group!</Text>
                    </View>
                }
            </View>
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