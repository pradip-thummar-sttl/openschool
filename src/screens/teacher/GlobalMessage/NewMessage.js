import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
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

const NewMessage = (props) => {
    const t2 = useRef(null);
    const [data, setData] = useState(props.route.params.data);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const [isLoading, setLoading] = useState(true)
    const [parentsData, setPatrentsData] = useState([])
    const [selectedParents, setSelectedParents] = useState('')

    useEffect(() => {
        setId(data._id)
        setTitle(data.Title)
        setMessage(data.Message)
        setSelectedParents(data.PupilList)
        setStatus(data.Status)
    }, [data])

    const [isSwitch, setSwitch] = useState(true)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }

    useEffect(() => {
        Service.get('parentlist/60b0b79a0e74b0373679d1b6/T', (res) => {
        // Service.get(`${EndPoints.ParentList}/${User.user._id}/T`, (res) => {
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
                UpdatedBy: '60b0b79a0e74b0373679d1b6',
                // UpdatedBy: User.user._id,
                PupilList: selectedParents
            }
        } else {
            var data = {
                Title: title,
                Message: message,
                SendToAll: parentsData.length == selectedParents.length,
                Status: selectedStatus,
                Type: 'T',
                CreatedBy: '60b0b79a0e74b0373679d1b6',
                // CreatedBy: User.user._id,
                PupilList: selectedParents
            }
        }

        console.log('postData', data);

        Service.post(data, status == 'Draft' ? `${EndPoints.UpdateGlobalMessaging}` : `${EndPoints.GlobalMessaging}`, (res) => {
            if (res.code == 200) {
                console.log('response of save lesson', res)
                showMessageWithCallBack(selectedStatus == 'Draft' ? MESSAGE.gmMessageDraft : MESSAGE.gmMessageSent, () => {
                    props.route.params.onGoBack()
                    props.navigation.goBack()
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
            <View style={{ marginBottom: 10, flexDirection: 'column', }}>
                <Text label style={Style.labelCommon}>Recipient</Text>
                <FlatList
                    data={parentsData}
                    style={{ width: '100%', paddingStart: 5, }}
                    renderItem={({ item, index }) => (
                        <View style={{ ...Styles.alignRow, marginTop: 10 }}>
                            <CheckBox
                                style={Styles.checkMark}
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
                            <Text style={Styles.checkBoxLabelText}>{item.ParentFirstName} {item.ParentLastName}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    return (
        <View>
            <NewMessageHeader
                onDraft={() => saveMessage('Sent')}
                onGoback={() => props.navigation.goBack()}
                status={status} />
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
                <Text label style={STYLE.labelCommon}>Recipient</Text>
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

                    <ToggleSwitch
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
            <TouchableOpacity style={styles.buttonGroup1}
                activeOpacity={opacity}
                onPress={() => saveMessage('Draft')}>
                <Image style={styles.addIcon} source={Images.CheckIconWhite} />
                <Text style={styles.commonButtonGreenheaderwithicon}>SAVE AS DRAFT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewMessage