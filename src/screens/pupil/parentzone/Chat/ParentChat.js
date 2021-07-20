import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import COLORS from '../../../../utils/Colors'
import Styles from './ChatStyle'
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../../utils/Images';
import { User } from '../../../../utils/Model';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { baseUrl } from '../../../../utils/Constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ParentChat = (props) => {

    const pubnub = usePubNub();

    const [channels, setChannels] = useState([]);

    const [isLoading, setLoading] = useState(false)
    const [teacherData, setTeacherData] = useState([])
    const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(-1)
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceHolder] = useState('');

    useEffect(() => {
        setLoading(true)

        Service.get(`${EndPoints.GetTeachersList}/${props.data.Pupilid}`, (res) => {
            setLoading(false)
            if (res.code == 200) {
                setTeacherData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }, [])

    const handleMessage = event => {
        var mesage = messages
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            mesage.push(event)
            addMessage(mesage);
        }
    };

    const sendMessage = message => {
        if (message.trim().length == 0) {
            return
        }

        message = message + '#@#' + props.data.ParentFirstName + ' ' + props.data.ParentLastName + '#@#' + User.user.ProfilePicture

        if (message) {
            pubnub
                .publish({ channel: channels[0], message })
                .then(() => setMessage(''))
                .catch((msg) => console.log(msg));
        }
    };

    useEffect(() => {
        if (channels.length == 0) {
            return
        }
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [channels]);

    useEffect(() => {
        if (selectedTeacherIndex == -1) {
            return
        }

        setPlaceHolder('Message ' + teacherData[selectedTeacherIndex].TeacherFirstName + ' ' + teacherData[selectedTeacherIndex].TeacherLastName)
        setChannels([`${User.user.MobileNumber}_${teacherData[selectedTeacherIndex].TeacherID}`])
    }, [selectedTeacherIndex]);

    useEffect(() => {
        if (teacherData.length == 0) {
            return
        }
        setSelectedTeacherIndex(0)
    }, [teacherData]);

    return (

        <View style={{ flex: 1 }}>
            {/* <ChatHeader /> */}
            {/* tabs */}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
                <View style={[Styles.lessonPlanTab, { height: 50 }]}>
                    {
                        tabs.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => onPressTab(index)} style={Styles.tabs}>
                                    <Text style={[Styles.tabsText, item.isSelected ? Styles.tabsTextSelected : null]}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={Styles.field}>
                    <Image
                        style={Styles.userIcon}
                        source={Images.SearchIcon} />
                    <TextInput
                        style={[STYLE.commonInput, Styles.searchHeader]}
                        placeholder="Search Messages"
                        maxLength={50}
                        placeholderTextColor={COLORS.menuLightFonts}
                    />
                </View>
            </View> */}

            {!isLoading ?
                <>
                    <View style={Styles.views}>
                        <View style={Styles.leftView}>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Teacher's name:</Text>
                                <Text style={Styles.subText}>{teacherData[selectedTeacherIndex].TeacherFirstName} {teacherData[selectedTeacherIndex].TeacherLastName}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Address:</Text>
                                <Text style={Styles.subText}>{teacherData[selectedTeacherIndex].TeacherAddressLine1 || teacherData[selectedTeacherIndex].TeacherAddressLine2 ? `${teacherData[selectedTeacherIndex].TeacherAddressLine1}\n${teacherData[selectedTeacherIndex].TeacherAddressLine2}` : '-'}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Telephone no:</Text>
                                <Text style={Styles.subText}>{teacherData[selectedTeacherIndex].TeacherMobileNumber ? teacherData[selectedTeacherIndex].TeacherMobileNumber : '-'}</Text>
                            </View>

                        </View>

                        <View style={[Styles.rightView, { width: hp(76) }]}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={Styles.teachers}>Chat with:</Text>
                                {teacherData.map((item, index) => (
                                    <TouchableOpacity
                                        activeOpacity={opacity}
                                        onPress={() => setSelectedTeacherIndex(index)}>
                                        <View style={{ ...Styles.checkBoxLabelNone }}>
                                            <Image source={{ uri: baseUrl + item.ProfilePicture }} style={Styles.userIconPupil} />
                                            <Text style={{ ...Styles.teachers, fontFamily: selectedTeacherIndex == index ? FONTS.fontSemiBold : FONTS.fontRegular }}>{item.TeacherFirstName} {item.TeacherLastName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <KeyboardAwareScrollView enableOnAndroid={true}
                                extraScrollHeight={90}
                                scrollEnabled
                                enableAutomaticScroll={(Platform.OS === 'ios')} >

                                <View style={Styles.mesagesView}>
                                    <FlatList
                                        data={messages}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={Styles.messageCell}>
                                                    <Image style={Styles.roundImage} source={{ uri: baseUrl + item.message.split('#@#')[2] }} />
                                                    <View style={Styles.messageSubCell}>
                                                        <Text style={Styles.userNameText}>{item.message.split('#@#')[1]}<Text style={Styles.timeText}>   {moment(new Date(((item.timetoken / 10000000) * 1000))).format('hh:mm')}</Text></Text>
                                                        <Text style={Styles.messageText}>{item.message.split('#@#')[0]}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }} />
                                </View>
                                <View style={[Styles.textView, { width: hp(76) }]}>
                                    <TextInput
                                        style={Styles.input}
                                        multiline={true}
                                        placeholder={placeholder}
                                        placeholderTextColor={COLORS.menuLightFonts}
                                        value={message}
                                        onChangeText={(text) => setMessage(text)}
                                    />
                                    <View style={Styles.buttonView}>
                                        <TouchableOpacity onPress={() => sendMessage(message)}>
                                            <Image style={Styles.btn} source={Images.send} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>

                        </View>
                    </View>
                </>
                :
                <ActivityIndicator
                    style={{ margin: 20 }}
                    size={Platform.OS == 'ios' ? 'large' : 'small'}
                    color={COLORS.yellowDark} />
            }
        </View>

    )
}

export default ParentChat
