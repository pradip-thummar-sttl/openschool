import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import MESSAGE from "../../../../utils/Messages";
import { User } from "../../../../utils/Model";
import PAGESTYLE from './Style';
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import CloseBlack from "../../../../svg/teacher/pupilmanagement/Close_Black";
import Ic_DragnDrop from "../../../../svg/teacher/pupilmanagement/Ic_DragnDrop";

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

        loadGroup()

        setPupilLoading(true)

        Service.get(`${EndPoints.GetPupilByTeacherId}${User.user._id}`, (res) => {
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

    const loadGroup = () => {
        setGroupLoading(true)

        Service.get(`${EndPoints.GetParticipants}${User.user._id}`, (res) => {
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

    const saveGroup = () => {
        if (groupName.trim().length == 0) {
            showMessage(MESSAGE.groupName)
            return
        } else if (selectedPupils.length == 0) {
            showMessage(MESSAGE.selectPupil)
            return
        }

        let list = []
        selectedPupils.forEach(element => {
            list.push({ PupilId: element.PupilId })
        });

        let data, url
        if (selectedGroup.length == 0) {
            url = `${EndPoints.Groupsetup}`
            data = {
                GroupName: groupName,
                TeacherId: User.user._id,
                CreatedBy: User.user._id,
                PupilList: list
            }
        } else {
            url = `${EndPoints.UpdateGroupSetup}/${selectedGroup[0]._id}`
            data = {
                GroupName: groupName,
                UpdatedBy: User.user._id,
                PupilList: list
            }
        }

        Service.post(data, url, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                reset()
                loadGroup()
                if (selectedGroup.length == 0) {
                    showMessage(MESSAGE.groupCreated)
                } else {
                    showMessage(MESSAGE.groupUpdated)
                }
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
        <View>
            <View style={PAGESTYLE.selectedPupilParent}>
                <Image
                    style={PAGESTYLE.selectedMediabar}
                    source={{ uri: baseUrl + props.item.ProfilePicture }} />
                <Text style={PAGESTYLE.selectedPupilName} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
                <TouchableOpacity
                    style={{ justifyContent: 'center', flex: 1 }}
                    activeOpacity={opacity}
                    onPress={() => popPupil(props.index)}>
                    {/* <Image
                        style={PAGESTYLE.selectedRemove}
                        source={Images.PopupCloseIcon} /> */}

                        <CloseBlack style={PAGESTYLE.selectedRemove} width={13} height={13}  />
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
                        // <Image
                        //     style={PAGESTYLE.groupEdit}
                        //     source={Images.Edit} />
                        <Ic_Edit style={PAGESTYLE.groupEdit} height={15} width={15} />
                        :
                        null
                    }
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
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
                        // <View>
                        //     <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                        // </View>
                        <EmptyStatePlaceHohder holderType={4}  title1={MESSAGE.noPupil1} title2={MESSAGE.noPupil2} />
                }
            </View>
            <View style={PAGESTYLE.middle}>
                <TextInput
                    returnKeyType={"done"}
                    style={PAGESTYLE.input}
                    placeholder="Enter group name"
                    autoCapitalize={'sentences'}
                    maxLength={40}
                    placeholderTextColor={COLORS.darkGrayIntro}
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
                            columnWrapperStyle={{ justifyContent: "flex-start", margin: 0 }} />
                        <View style={PAGESTYLE.bar2}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <TouchableOpacity
                                style={PAGESTYLE.buttonParent}
                                onPress={() => { saveGroup() }}>
                                <Text style={{ ...PAGESTYLE.button, color: COLORS.dashboardGreenButton }}>Assign Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...PAGESTYLE.buttonParent, backgroundColor: COLORS.dashboardGreenButton, }}
                                onPress={() => { reset() }}>
                                <Text style={PAGESTYLE.button}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <View style={PAGESTYLE.createGrpBlock}>
                        {/* <Image source={Images.createGrpImageLogo} style={PAGESTYLE.createGrpImage} /> */}
                        <Ic_DragnDrop style={PAGESTYLE.createGrpImage} height={43.57} width={52.91} />
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
                        // <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                        <EmptyStatePlaceHohder holderType={4}  title1={MESSAGE.noGroup1} title2={MESSAGE.noGroup2} />
                }
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUp;