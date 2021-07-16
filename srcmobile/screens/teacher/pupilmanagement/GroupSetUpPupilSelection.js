import CheckBox from "@react-native-community/checkbox";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View, BackHandler, Platform } from "react-native";
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
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";

const GroupSetUpPupilSelection = (props) => {

    const [groups, setGroups] = useState([])
    const [pupils, setPupils] = useState([])
    const [pupilsClone, setPupilsClone] = useState([])
    const [groupsClone, setGroupsClone] = useState([])
    const [selectedPupils, setSelectedPupils] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [groupName, setGroupName] = useState(props.route.params.isForUpdate ? props.route.params.groupName : '')
    const [isPupilLoading, setPupilLoading] = useState([])
    const [isGroupLoading, setGroupLoading] = useState([])

    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.navigation.goBack() 
        return true;
      }
    useEffect(() => {
        setPupilLoading(true)

        Service.get(`${EndPoints.GetPupilByTeacherId}${User.user._id}`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                setPupils(res.data)
                setPupilsClone(res.data)

                if (props.route.params.data) {
                    let list = []
                    props.route.params.data.forEach(element => {
                        list.push({ PupilId: element.PupilId })
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
            list.push({ PupilId: element.PupilId })
        });

        let data, url
        if (!props.route.params.isForUpdate) {
            url = `${EndPoints.Groupsetup}`
            data = {
                GroupName: groupName,
                TeacherId: User.user._id,
                CreatedBy: User.user._id,
                PupilList: list
            }
        } else {
            url = `${EndPoints.UpdateGroupSetup}/${props.route.params.groupId}`
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
                if (!props.route.params.isForUpdate) {
                    showMessageWithCallBack(MESSAGE.groupCreate, () => {
                        props.route.params.onRefresh();
                        props.navigation.goBack()
                    })
                } else {
                    showMessageWithCallBack(MESSAGE.groupUpdated, () => {
                        props.route.params.onRefresh();
                        props.navigation.goBack()
                    })
                }
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
            console.log('error of GetPupilByTeacherId', err)
        })
    }

    const pushPupilItem = (isSelected, _index) => {
        console.log('isSelected', selectedPupils, pupils);
        if (!isSelected) {
            const newList = selectedPupils.filter((item, index) => item.PupilId !== pupils[_index].PupilId);
            setSelectedPupils(newList)
        } else {
            setSelectedPupils([...selectedPupils, pupils[_index]])
        }
    }

    const isPupilChecked = (_index) => {
        console.log('selectedPupils', selectedPupils, _index);
        if (selectedPupils.length > 0) {
            if (selectedPupils.some(ele => ele.PupilId == pupils[_index].PupilId)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const Pupillist = (props) => (
        // <TouchableOpacity
        //     activeOpacity={opacity}
        //     onPress={() => pushPupil(props.index)}>
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
        // </TouchableOpacity>
    );

    const pupilRender = ({ item, index }) => {
        return (
            <Pupillist
                item={item} index={index} />
        );
    };

    const pushPupil = (_index) => {
        setSelectedPupils([...selectedPupils, pupilsClone[_index]])

        // const newList = pupilsClone.filter((item, index) => index !== _index);
        // setPupilsClone(newList)
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
                    pupils.length > 0 ?
                        <FlatList
                            data={pupils}
                            renderItem={pupilRender}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false} />
                        :
                        // <View>
                        //     <Text style={{ height: 50, fontSize: 20, padding: 10, textAlign: 'center' }}>No data found!</Text>
                        // </View>
                        <EmptyStatePlaceHohder />
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderColor: COLORS.commonBorderColor, width: '100%',marginBottom:10 }}>
                <View style={{ ...PAGESTYLE.buttonParent1, backgroundColor: COLORS.dashboardGreenButton, }}>
                    <TouchableOpacity
                        onPress={() => { saveGroup() }}>
                        <Text style={PAGESTYLE.button1}>Assign Group</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ ...PAGESTYLE.buttonParent1, }}>
                    <TouchableOpacity
                        onPress={() => { reset() }}>
                        <Text style={{ ...PAGESTYLE.button1, color: COLORS.dashboardGreenButton }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default GroupSetUpPupilSelection;