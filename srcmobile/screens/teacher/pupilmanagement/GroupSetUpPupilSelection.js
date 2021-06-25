import CheckBox from "@react-native-community/checkbox";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../service/EndPoints";
import { Service } from "../../../service/Service";
import COLORS from "../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../utils/Constant";
import Images from "../../../utils/Images";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MESSAGE from "../../../utils/Messages";
import { User } from "../../../utils/Model";
import STYLE from "../../../utils/Style";
import PAGESTYLE from './Style';

const GroupSetUpPupilSelection = (props) => {
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
        setPupilLoading(true)

        // Service.get(`${EndPoints.GetPupilByTeacherId}${User.user._id}`, (res) => {
        Service.get(`pupilbyteacherid/604b09139dc64117024690c3`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                setPupils(res.data)
                setPupilsClone(res.data)

                if (props.route.params.data) {
                    let list = []
                    props.route.params.data.forEach(element => {
                        list.push({_id: element.PupilId})
                    });
                    setSelectedPupils(list)
                } else {
                }
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
            console.log('error of GetPupilByTeacherId', err)
        })
    }, [])

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
            list.push({ PupilId: element._id })
        });

        let data = {
            GroupName: groupName,
            TeacherId: User.user._id,
            CreatedBy: User.user._id,
            PupilList: list
        }

        console.log('data', data);

        // Service.get(`${EndPoints.Groupsetup}`, (res) => {
        Service.post(data, `groupsetup`, (res) => {
            if (res.code == 200) {
                showMessageWithCallBack(MESSAGE.groupCreate, () => {
                    props.route.params.onRefresh();
                    props.navigation.goBack()
                })
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetPupilByTeacherId', err)
        })
    }

    const pushPupilItem = (isSelected, _index) => {
        console.log('isSelected', isSelected, _index);
        if (!isSelected) {
            const newList = selectedPupils.filter((item, index) => item._id !== pupils[_index]._id);
            setSelectedPupils(newList)
        } else {
            setSelectedPupils([...selectedPupils, pupils[_index]])
        }
    }

    const isPupilChecked = (_index) => {
        if (selectedPupils.length > 0) {
            if (selectedPupils.some(ele => ele._id == pupils[_index]._id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
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
                            style={STYLE.checkBoxcommon}
                            tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                            onFillColor={COLORS.dashboardPupilBlue}
                            onTintColor={COLORS.dashboardPupilBlue}
                            tintColor={COLORS.dashboardPupilBlue}
                            value={isPupilChecked(props.index)}
                            tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                            onValueChange={(newValue) => { console.log('newValue', newValue); pushPupilItem(newValue, props.index) }}
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

    const reset = () => {
        setGroupName('')
        setSelectedPupils([])
    }

    return (
        <SafeAreaView style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.white }}>
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => props.navigation.goBack()}>
                <Image style={PAGESTYLE.arrow} source={Images.backArrow} />
            </TouchableOpacity>
            <TextInput
                returnKeyType={"done"}
                style={PAGESTYLE.input1}
                placeholder="Enter group name"
                autoCapitalize={'sentences'}
                maxLength={40}
                placeholderTextColor={COLORS.darkGrayIntro}
                value={groupName}
                onChangeText={groupName => { setGroupName(groupName) }} />
            <View style={STYLE.hrCommon}></View>
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderColor: COLORS.commonBorderColor, width: '100%', }}>
                <TouchableOpacity
                    style={{ ...PAGESTYLE.buttonParent1, backgroundColor: COLORS.dashboardGreenButton, }}
                    onPress={() => { saveGroup() }}>
                    <Text style={PAGESTYLE.button1}>Assign Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...PAGESTYLE.buttonParent1, paddingHorizontal: hp(7),}}
                    onPress={() => { reset() }}>
                    <Text style={{ ...PAGESTYLE.button1, color: COLORS.dashboardGreenButton }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUpPupilSelection;