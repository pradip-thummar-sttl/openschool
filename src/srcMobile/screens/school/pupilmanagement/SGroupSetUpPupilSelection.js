import CheckBox from "@react-native-community/checkbox";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View, BackHandler, Platform } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
// import Images from "../../../../utils/Images";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MESSAGE from "../../../../utils/Messages";
import { User } from "../../../../utils/Model";
import STYLE from "../../../../utils/Style";
import PAGESTYLE from './Style';
import EmptyStatePlaceHohder from "../../../component/reusable/placeholder/EmptyStatePlaceHohder";
import BackArrow from "../../../../svg/common/BackArrow";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/login/ArrowDown";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const SGroupSetUpPupilSelection = (props) => {

    const [groups, setGroups] = useState([])
    const [pupils, setPupils] = useState([])
    const [pupilsClone, setPupilsClone] = useState([])
    const [groupsClone, setGroupsClone] = useState([])
    const [selectedPupils, setSelectedPupils] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [groupName, setGroupName] = useState(props.route.params.isForUpdate ? props.route.params.groupName : '')
    const [isPupilLoading, setPupilLoading] = useState([])
    const [isGroupLoading, setGroupLoading] = useState(false)

    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.navigation.goBack()
        return true;
    }

    useEffect(() => {
        loadTeacher()
        setPupilLoading(true)

        if (props.route.params.groupData) {
            let previoslySelectedData = props.route.params.groupData
            setSelectedPupils(previoslySelectedData)
        }



        Service.get(`${EndPoints.PupilByShoolId}/${User.user.UserDetialId}`, (res) => {
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

    const loadTeacher = () => {
        console.log('User.user.UserDetialId', User.user.UserDetialId);
        const data = {
            Searchby: "",
            Filterby: ""
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            console.log('response of load response', res)
            if (res.code == 200) {
                setTeachers(res.data)
                // setTeacherClone(res.data)

                if (props.route.params.teacherId) {
                    let teacherData = []
                    res.data.map((item) => {
                        if (item.TeacherId === props.route.params.teacherId) {
                            teacherData.push(item)
                        }
                    })
                    setSelectedTeacher(teacherData)
                }
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })
    }
    const saveGroup = () => {
        // if (groupName.trim().length == 0) {
        //     showMessage(MESSAGE.groupName)
        //     return
        // } else if (selectedPupils.length == 0) {
        //     showMessage(MESSAGE.selectPupil)
        //     return
        // }

        // let list = []
        // selectedPupils.forEach(element => {
        //     list.push({ PupilId: element.PupilId })
        // });

        // let data, url
        // if (!props.route.params.isForUpdate) {
        //     url = `${EndPoints.Groupsetup}`
        //     data = {
        //         GroupName: groupName,
        //         TeacherId: User.user._id,
        //         CreatedBy: User.user._id,
        //         PupilList: list
        //     }
        // } else {
        //     url = `${EndPoints.UpdateGroupSetup}/${props.route.params.groupId}`
        //     data = {
        //         GroupName: groupName,
        //         UpdatedBy: User.user._id,
        //         PupilList: list
        //     }
        // }

        // Service.post(data, url, (res) => {
        //     setPupilLoading(false)
        //     if (res.code == 200) {
        //         reset()
        //         if (!props.route.params.isForUpdate) {
        //             showMessageWithCallBack(MESSAGE.groupCreate, () => {
        //                 props.route.params.onRefresh();
        //                 props.navigation.goBack()
        //             })
        //         } else {
        //             showMessageWithCallBack(MESSAGE.groupUpdated, () => {
        //                 props.route.params.onRefresh();
        //                 props.navigation.goBack()
        //             })
        //         }
        //     } else {
        //         showMessage(res.message)
        //     }
        // }, (err) => {
        //     setPupilLoading(false)
        //     console.log('error of GetPupilByTeacherId', err)
        // })

        //
        if (selectedTeacher.length <= 0) {
            showMessage(MESSAGE.selectTeacher)
            return
        } else if (selectedPupils.length == 0) {
            showMessage(MESSAGE.selectPupil)
            return
        }

        let list = []
        selectedPupils.forEach(element => {
            list.push({ PupilId: element.PupilId })
        });

        let data = {
            SchoolId: User.user.UserDetialId,
            TeacherId: selectedTeacher[selectedTeacher.length - 1].TeacherId,
            CreatedBy: User.user.UserDetialId,
            PupilList: list
        }
        setGroupLoading(true)
        console.log('data', data);
        Service.post(data, `${EndPoints.ClassSetup}`, (res) => {
            setGroupLoading(false)
            if (res.code == 200) {
                reset()
                // loadGroup()
                showMessage(MESSAGE.classSetup)
                setTimeout(() => {
                    props.route.params.onRefresh();
                    props.navigation.goBack()
                }, 1000)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setGroupLoading(false)
        })
    }

    const pushPupilItem = (isSelected, _index) => {
        // console.log('isSelected', selectedPupils, pupils);
        if (!isSelected) {
            const newList = selectedPupils.filter((item, index) => item.PupilId !== pupils[_index].PupilId);
            setSelectedPupils(newList)
        } else {
            setSelectedPupils([...selectedPupils, pupils[_index]])
        }
    }

    const isPupilChecked = (_index) => {
        // console.log('selectedPupils', selectedPupils, _index);

        console.log('----selectedTeacher-------', selectedTeacher)

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

    const pushGroup = (_index) => {
        if (selectedPupils.length != 0) {
            showMessage('Please reset your list first')
            return
        }

        setSelectedTeacher([...selectedTeacher, groupsClone[_index]])

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
        setSelectedTeacher([])
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
                <Text numberOfLines={1} style={[PAGESTYLE.pupilName1, { width: wp(60) }]} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
                <View style={PAGESTYLE.checkMark}>
                    <CheckBox
                        boxType={'square'}
                        onCheckColor={COLORS.white}
                        style={[STYLE.checkBoxcommon]}
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

    // const reset = () => {
    //     setGroupName('')
    //     setSelectedPupils([])
    // }


    const teacherDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.subjectText}>Assign Teacher</Text>
                <Menu onSelect={(item) => setSelectedTeacher([...selectedTeacher, item])}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length - 1].FirstName || selectedTeacher[selectedTeacher.length - 1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length - 1].LastName || selectedTeacher[selectedTeacher.length - 1].TeacherLastName) : 'Select a Teacher'}</Text>
                        {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: 14, } }}>
                        <FlatList
                            data={teachers}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: 10 }} value={item} text={item.FirstName + ' ' + item.LastName}></MenuOption>
                            )}
                            style={{ height: 190 }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };


    return (
        <SafeAreaView style={{ ...PAGESTYLE.mainPage, backgroundColor: COLORS.white }}>
            <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => { props.route.params.onRefresh(); props.navigation.goBack() }}>
                <BackArrow style={PAGESTYLE.backArrow} height={hp(2.34)} width={hp(2.34)} />
            </TouchableOpacity>
          
            {teacherDropDown()}
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
                        <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noPupil1} title2={MESSAGE.noPupil2} />
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderColor: COLORS.commonBorderColor, width: '100%', paddingHorizontal: hp(1.2), }}>
                <View style={{ ...PAGESTYLE.buttonParent1, backgroundColor: COLORS.dashboardGreenButton, }}>
                    <TouchableOpacity
                        onPress={() => { saveGroup() }}>
                        {isGroupLoading ?
                            <ActivityIndicator
                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                color={COLORS.white} />
                            : <Text style={PAGESTYLE.button1}>Assign Group </Text>}

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
export default SGroupSetUpPupilSelection;