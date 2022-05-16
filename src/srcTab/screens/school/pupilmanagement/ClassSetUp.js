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
import PAGESTYLE from './StyleClass';
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import CloseBlack from "../../../../svg/teacher/pupilmanagement/Close_Black";
import Ic_DragnDrop from "../../../../svg/teacher/pupilmanagement/Ic_DragnDrop";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import ArrowDown from "../../../../svg/teacher/lessonhwplanner/ArrowDown";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ClassSetUp = () => {

    const [groups, setGroups] = useState([])
    const [pupils, setPupils] = useState([])
    const [pupilsClone, setPupilsClone] = useState([])
    const [teachers, setTeachers] = useState([])
    const [groupsClone, setGroupsClone] = useState([])
    const [teacherClone, setTeacherClone] = useState([])
    const [selectedPupils, setSelectedPupils] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isPupilLoading, setPupilLoading] = useState([])
    const [isGroupLoading, setGroupLoading] = useState([])

    useEffect(() => {

        loadGroup()

        loadTeacher()

        setPupilLoading(true)

        Service.get(`${EndPoints.pupilbyclasssetup}/${User.user.UserDetialId}`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                setPupils(res.data)
                setPupilsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
        })
    }, [])

    const loadGroup = () => {
        setGroupLoading(true)

        Service.get(`${EndPoints.GetClassSetup}/${User.user.UserDetialId}`, (res) => {
            setGroupLoading(false)
            if (res.code == 200) {
                setGroups(res.data)
                setGroupsClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setGroupLoading(false)
        })
    }

    const loadTeacher = () => {
        const data = {
            Searchby: "",
            Filterby: ""
        }

        Service.post(data, `${EndPoints.TeacherBySchoolId}/${User.user.UserDetialId}`, (res) => {
            console.log('response of GetSubjectBySchoolId response', res)
            if (res.code == 200) {
                setTeachers(res.data)
                setTeacherClone(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('error of GetSubjectBySchoolId', err)
        })
    }

    useEffect(() => {
        if(!selectedTeacher){
            return
        }

        console.log(' selectedTeacher', selectedTeacher);

    }, [selectedTeacher])

    const saveGroup = () => {
        if (selectedTeacher.length == 0) {
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
            PupilList: list,
            RemovePupilList : list

            
        }

        Service.post(data, `${EndPoints.ClassSetup}`, (res) => {
            setPupilLoading(false)
            if (res.code == 200) {
                reset()
                loadGroup()
                showMessage(MESSAGE.classSetup)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            setPupilLoading(false)
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
            <View style={[PAGESTYLE.selectedPupilParent,{width : hp(20)}]}>
                <Image
                    style={PAGESTYLE.selectedMediabar}
                    source={{ uri: baseUrl + props.item.ProfilePicture }} />
                <Text style={[PAGESTYLE.selectedPupilName]} numberOfLines={1}>{props.item.FirstName} {props.item.LastName}</Text>
                <TouchableOpacity
                    style={{ justifyContent: 'center', flex: 1}}
                    activeOpacity={opacity}
                    onPress={() => popPupil(props.index)}>
                    {/* <Image
                        style={PAGESTYLE.selectedRemove}
                        source={Images.PopupCloseIcon} /> */}

                    <CloseBlack style={[PAGESTYLE.selectedRemove,{right : 0}]} width={hp(1.69)} height={hp(1.69)} />
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
                <Text style={PAGESTYLE.groupName} numberOfLines={1}>{props.item.TeacherFirstName} {props.item.TeacherLastName}</Text>
                <TouchableOpacity
                    style={{ justifyContent: 'center', flex: 1 }}
                    activeOpacity={opacity}
                    onPress={() => pushGroup(props.index)}>
                    {selectedGroup.length == 0 ?
                        // <Image
                        //     style={PAGESTYLE.groupEdit}
                        //     source={Images.Edit} />
                        <Ic_Edit style={PAGESTYLE.groupEdit} height={hp(1.66)} width={hp(1.66)} />
                        :
                        null
                    }
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row', marginTop: hp(1.95) }}>
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

    const teacherDropDown = () => {
        return (
            <View style={PAGESTYLE.dropDownFormInput}>
                <Text style={PAGESTYLE.subjectText}>Assign Teacher</Text>
                <Menu style={{marginBottom: hp(2),}} onSelect={(item) => setSelectedTeacher([...selectedTeacher, item])}>
                    <MenuTrigger style={[PAGESTYLE.dropDown]}>
                        <Text style={PAGESTYLE.dateTimetextdummy}>{selectedTeacher.length > 0 ? (selectedTeacher[selectedTeacher.length-1].FirstName || selectedTeacher[selectedTeacher.length-1].TeacherFirstName) + ' ' + (selectedTeacher[selectedTeacher.length-1].LastName || selectedTeacher[selectedTeacher.length-1].TeacherLastName) : 'Select a Teacher'}</Text>
                        {/* <Image style={PAGESTYLE.dropDownArrow} source={Images.DropArrow} /> */}
                        <ArrowDown style={PAGESTYLE.dropDownArrow} height={hp(1.51)} width={hp(1.51)} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionText: { fontSize: hp(1.82), } }}>
                        <FlatList
                            data={teachers}
                            renderItem={({ item }) => (
                                <MenuOption style={{ padding: hp(1.30) }} value={item} text={item.FirstName + ' ' + item.LastName}></MenuOption>
                            )}
                            style={{ height: hp(26), }} />
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

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
                        <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noPupil1} title2={MESSAGE.noPupil2} />
                }
            </View>
            <View style={PAGESTYLE.middle}>

                {teacherDropDown()}

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
                                style={[PAGESTYLE.buttonParentSchool,{ backgroundColor: COLORS.dashboardGreenButton}]}
                                onPress={() => { saveGroup() }}>
                                <Text style={{ ...PAGESTYLE.button }}>Assign Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...PAGESTYLE.buttonParentSchool, }}
                                onPress={() => { reset() }}>
                                <Text style={[PAGESTYLE.button,{ color: COLORS.dashboardGreenButton}]}>Reset</Text>
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
                        <EmptyStatePlaceHohder holderType={4} title1={MESSAGE.noGroup1} title2={MESSAGE.noGroup2} />
                }
            </View>
        </SafeAreaView>
    );
}
export default ClassSetUp;