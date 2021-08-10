import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView, BackHandler, Platform } from 'react-native'
import NewMessageHeader from '../../../component/reusable/header/NewMessageHeader'
import COLORS from '../../../utils/Colors';
import STYLE from '../../../utils/Style';
import styles from './Styles';
import ToggleSwitch from 'toggle-switch-react-native';
import Images from '../../../utils/Images';

import { EndPoints } from '../../../service/EndPoints'
import { User } from '../../../utils/Model'
import { opacity, showMessage, showMessageWithCallBack } from '../../../utils/Constant'
import CheckBox from '@react-native-community/checkbox';
import { Service } from '../../../service/Service'
import MESSAGE from '../../../utils/Messages'
import { ScrollView } from 'react-native-gesture-handler';

const NewMessage = (props) => {
    const t2 = useRef(null);
    const [data, setData] = useState(props.selectedItem);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const [isLoading, setLoading] = useState(true)
    const [parentsData, setPatrentsData] = useState([])
    const [selectedParents, setSelectedParents] = useState([])

    console.log('props.selectedItem', props.selectedItem);

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }

    useEffect(() => {
        if (data) {
            setId(data._id)
            setTitle(data.Title)
            setMessage(data.Message)
            setSelectedParents(data.PupilList)
            setStatus(data.Status)
        }
    }, [data])

    const [isSwitch, setSwitch] = useState(true)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }

    useEffect(() => {
        // Service.get('parentlist/60b0b79a0e74b0373679d1b6/T', (res) => {
        Service.get(`${EndPoints.ParentList}/${User.user._id}/T`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                console.log('response of get all lesson', res)
                setPatrentsData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }, [])

    const isPupilChecked = (_index) => {
        if (selectedParents.length > 0) {
            if (selectedParents.some(ele => ele.MobileNumber == parentsData[_index].MobileNumber)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const pushPupilItem = (isSelected, _index) => {
        console.log('isSelected', isSelected, _index);
        if (!isSelected) {
            const newList = selectedParents.filter((item, index) => item.MobileNumber !== parentsData[_index].MobileNumber);
            setSelectedParents(newList)
        } else {
            setSelectedParents([...selectedParents, parentsData[_index]])
        }
    }

    const saveMessage = (selectedStatus) => {
        if (!title.trim()) {
            showMessage(MESSAGE.gmTitle)
            return false;
        } else if (selectedParents.length == 0) {
            showMessage(MESSAGE.gmPArent)
            return false;
        } else if (!message.trim()) {
            showMessage(MESSAGE.gmMessage)
            return false;
        }

        if (status == 'Draft') {
            var data = {
                globalmessageId: id,
                Title: title,
                Message: message,
                SendToAll: parentsData.length == selectedParents.length,
                Status: selectedStatus,
                Type: 'T',
                // UpdatedBy: '60b0b79a0e74b0373679d1b6',
                UpdatedBy: User.user._id,
                PupilList: selectedParents
            }
        } else {
            var data = {
                Title: title,
                Message: message,
                SendToAll: parentsData.length == selectedParents.length,
                Status: selectedStatus,
                Type: 'T',
                // CreatedBy: '60b0b79a0e74b0373679d1b6',
                CreatedBy: User.user._id,
                PupilList: selectedParents
            }
        }

        console.log('postData', data);

        Service.post(data, status == 'Draft' ? `${EndPoints.UpdateGlobalMessaging}` : `${EndPoints.GlobalMessaging}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                showMessageWithCallBack(selectedStatus == 'Draft' ? MESSAGE.gmMessageDraft : MESSAGE.gmMessageSent, () => {
                    props.onGoBack()
                })
            } else {
                showMessage(res.message)
                setLoading(false)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
            setLoading(false)
        })
    }

    const parentListView = () => {
        return (
            <View style={{ marginBottom: 10, marginTop: 25, width: '65%', flexDirection: 'column', }}>
                <Text label style={styles.labelCommon}>Recipient</Text>
                <FlatList
                    data={parentsData}
                    style={{ width: '100%', paddingHorizontal: 20, }}
                    renderItem={({ item, index }) => (
                        <View style={{ ...styles.alignRow, marginTop: 10, marginRight: 20 }}>
                            <CheckBox
                                style={styles.checkMark1}
                                boxType={'square'}
                                onCheckColor={COLORS.white}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                value={isPupilChecked(index)}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onValueChange={(newValue) => { pushPupilItem(newValue, index) }}
                            />
                            <Text style={styles.checkBoxLabelText}>{item.ParentFirstName} {item.ParentLastName}</Text>
                        </View>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    return (
        <View style={{ height: '100%', backgroundColor: COLORS.white }}>
            <NewMessageHeader
                onSent={() => saveMessage('Sent')}
                onGoback={() => props.goBack()}
                status={status} />
            <ScrollView>
                <SafeAreaView style={{ paddingHorizontal: 20 }}>
                    <View style={styles.field1}>
                        <Text label style={STYLE.labelCommon}>Message Title</Text>
                        <View style={styles.copyInputParent}>
                            <TextInput
                                multiline={false}
                                placeholder='Enter title of the message'
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t2.current.focus(); }}
                                value={title}
                                autoCapitalize={'sentences'}
                                placeholderStyle={styles.somePlaceholderStyle}
                                placeholderTextColor={COLORS.borderGrp}
                                style={[styles.commonInputTextarea1, , styles.inputWidth]}
                                onChangeText={title => setTitle(title)} />
                        </View>
                    </View>

                    <View style={styles.field1}>
                        <View style={styles.copyInputParent}>
                            {/* <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.borderGrp}
                        style={styles.commonInputTextarea1}
                        onChangeText={eventName => setEvent(eventName)} /> */}
                            {parentListView()}

                            <ToggleSwitch onColor={COLORS.dashboardGreenButton}
                                isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                            />
                            <Text label style={[STYLE.labelCommon, { color: COLORS.black, }]}>Send to all parents</Text>

                        </View>
                    </View>

                    <View style={styles.field1}>
                        <Text label style={STYLE.labelCommon}>Message</Text>
                        <View style={styles.copyInputParent}>
                            <TextInput
                                ref={t2}
                                multiline={true}
                                placeholder='Write a message here'
                                value={message}
                                autoCapitalize={'sentences'}
                                placeholderStyle={styles.somePlaceholderStyle}
                                placeholderTextColor={COLORS.borderGrp}
                                style={[styles.commonInputTextarea1, styles.inputHeight]}
                                onChangeText={message => setMessage(message)} />
                        </View>
                    </View>
                    {status == 'Draft' || status == 'Sent' ?
                        null
                        :
                        <TouchableOpacity style={styles.buttonGroup1}
                            activeOpacity={opacity}
                            onPress={() => saveMessage('Draft')}>
                            <Image style={styles.addIcon} source={Images.CheckIcon} />
                            <Text style={styles.commonButtonGreenheaderwithicon}>SAVE AS DRAFT</Text>
                        </TouchableOpacity>
                    }
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default NewMessage
