import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, FlatList, Platform, BackHandler, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import Styles from './Style'
import COLORS from '../../../../utils/Colors'
import Style from '../../../../utils/Style'
import NewMessageHeader from '../../../component/reusable/header/NewMessageHeader'
import { EndPoints } from '../../../../service/EndPoints'
import { User } from '../../../../utils/Model'
import { showMessage, showMessageWithCallBack } from '../../../../utils/Constant'
import CheckBox from '@react-native-community/checkbox';
import { Service } from '../../../../service/Service'
import MESSAGE from '../../../../utils/Messages'
import { ScrollView } from 'react-native-gesture-handler'
import ToggleSwitch from 'toggle-switch-react-native';
import STYLE from '../../../../utils/Style';

const NewMessage = (props) => {
    const t2 = useRef(null);
    const [data, setData] = useState(props.route.params.data);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const [isLoading, setLoading] = useState(true)
    const [parentsData, setPatrentsData] = useState([])
    const [selectedParents, setSelectedParents] = useState([])

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

    const [isSwitch, setSwitch] = useState(false)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
        if (isOn) {
            setSelectedParents(parentsData)
        }
        else {
            let allselectedData = selectedParents
            allselectedData = []
            setSelectedParents(allselectedData)
        }
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

    useEffect(() => {
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

    const parentListView = () => {
        return (
            <View style={{ marginBottom: 10, flexDirection: 'column',width : '100%' }}>
                <Text label style={Style.labelCommon}>Recipient</Text>
                <FlatList
                    data={parentsData}
                    style={{ width: '100%', paddingStart: 5, }}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection : 'row', marginTop: 10 ,width : '50%'}}>
                            <CheckBox
                                style={Styles.checkMark12}
                                boxType={'square'}
                                onCheckColor={COLORS.white}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onFillColor={COLORS.dashboardPupilBlue}
                                onTintColor={COLORS.dashboardPupilBlue}
                                tintColor={COLORS.dashboardPupilBlue}
                                value={isPupilChecked(index)}
                                disabled={status == 'Sent'}
                                tintColors={{ true: COLORS.dashboardPupilBlue, false: COLORS.dashboardPupilBlue }}
                                onValueChange={(newValue) => { pushPupilItem(newValue, index) }}
                            />
                            <Text numberOfLines={1} style={[Styles.checkBoxLabelText,{paddingLeft :Platform.OS === 'android' ? 0 : 5}]}>{item.ParentFirstName} {item.ParentLastName}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    const isPupilChecked = (_index) => {
        if (selectedParents.length > 0) {
            if (selectedParents.some(ele => ele._id == parentsData[_index]._id)) {
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
            const newList = selectedParents.filter((item, index) => item._id !== parentsData[_index]._id);
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
                CreatedBy: User.user._id,
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

    const onBackPress = () => {
        if (props && props.route && props.route.params) {
            props.route.params.onGoBack()
        }

        props.navigation.goBack()
    }

    const isTextInputEditable = () => {

        if (status == 'Sent') {
            return false;
        }
        else {
            return true;
        }
    }

    return (


        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <NewMessageHeader
                onSent={() => saveMessage('Sent')}
                onDraft={() => saveMessage('Draft')}
                // onGoback={() => props.navigation.goBack()}
                onGoback={() => onBackPress()}
                status={status} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView style={{ height: '100%' }}>
                    <View style={[Styles.field1,]}>
                        <Text label style={Style.labelCommon}>Title</Text>
                        <View style={[Styles.copyInputParent, { justifyContent: 'center' }]}>
                            <TextInput
                                multiline={false}
                                numberOfLines={1}
                                placeholder='Enter title of the message'
                                returnKeyType={"next"}
                                onSubmitEditing={() => { t2.current.focus(); }}
                                value={title}
                                autoCapitalize={'sentences'}
                                editable={isTextInputEditable()}
                                placeholderStyle={Styles.somePlaceholderStyle}
                                style={Styles.commonInputTextarea1}
                                onChangeText={title => setTitle(title)} />
                        </View>
                    </View>

                    <View style={Styles.field1}>
                        <View style={Styles.copyInputParent}>
                            {/* <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={Styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.black}
                        style={Styles.commonInputTextarea1}
                        onChangeText={eventName => setEvent(eventName)} /> */}
                            {parentListView()}

                        </View>
                    </View>

                    {status == 'Sent' ? null :
                        <View style={[Styles.field1, { flexDirection: 'row' }]}>
                            <ToggleSwitch onColor={COLORS.dashboardGreenButton} isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)} />
                            <Text label style={[STYLE.labelCommon, { color: COLORS.black, }]}>Send to all parents</Text>
                        </View>}

                    <View style={Styles.field1}>
                        <Text label style={Style.labelCommon}>Message</Text>
                        <View style={Styles.copyInputParent}>
                            <TextInput
                                ref={t2}
                                multiline={true}
                                placeholder='Write a message here'
                                value={message}
                                autoCapitalize={'sentences'}
                                editable={isTextInputEditable()}
                                placeholderStyle={Styles.somePlaceholderStyle}
                                style={[Styles.commonInputTextarea1, Styles.inputHeight]}
                                onChangeText={message => setMessage(message)} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

export default NewMessage
