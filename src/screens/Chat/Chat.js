import React, { useState, useEffect } from 'react'
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import COLORS from '../../utils/Colors'
import Images from '../../utils/Images'
import STYLE from '../../utils/Style'
import ChatHeader from './ChatHeader'
import Styles from './Style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { User } from '../../utils/Model';


// var data = [
//     { name: 'PUPIL PROFILE', isSelected: true },
//     { name: 'PARENT CHAT', isSelected: false },
//     { name: 'PUPIL CHAT', isSelected: false },
//     { name: 'SCHOOL CHAT', isSelected: false }]


const Chat = (props) => {
    const pubnub = usePubNub();
    

    let channel1 = [`${props.data.MobileNumber}_${User.user._id}`]
    let channel2 = [`${props.data.PupilId}_${User.user._id}`]
    let channel3 = [`${props.data.SchoolId}_${User.user._id}`]

    const [channels, setChannels] = useState(channel1);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [tabs, settabs] = useState([
        { name: 'PUPIL PROFILE', isSelected: true },
        { name: 'PARENT CHAT', isSelected: false },
        { name: 'PUPIL CHAT', isSelected: false },
        { name: 'SCHOOL CHAT', isSelected: false }])
    const [placeholder, setPlaceHolder] = useState('');

    useEffect(() => {
        if (props.tabs === 1) {
            setPlaceHolder("Message " + props.data.ParentFirstName + ' ' + props.data.ParentLastName)
        } else if (props.tabs === 2) {
            setPlaceHolder("Message " + props.data.FirstName + ' ' + props.data.LastName)
        } else {
            setPlaceHolder("Message School")
        }

        setMessage('')
        addMessage([])
        props.tabs === 1 ? setChannels(channel1) : props.tabs === 2 ? setChannels(channel2) : setChannels(channel3);
    }, [props.tabs])

    const handleMessage = event => {
        console.log('log of event message', event);
        var mesage = messages
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            const text = message.text || message;
            // var mesage = [...messages]
            mesage.push(event)
            addMessage(mesage);
        }
    };

    const sendMessage = message => {
        // var channel = ""
        // if (props.tabs === 1) {
        //     channel = channels[0]
        // } else if (props.tabs === 2) {
        //     channel = channels[1]
        // } else {
        //     channel = channels[2]
        // }
        message = message + '#@#' + User.user.FirstName + ' ' + User.user.LastName + '#@#' + User.user.ProfilePicture

        if (message) {
            pubnub
            .publish({ channel: channels[0], message })
                .then(() => setMessage(''))
                .catch((msg) => console.log(msg));
        }
    };

    useEffect(() => {
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);


    const onPressTab = (index) => {
        var data = [...tabs]
        data.forEach(element => {
            element.isSelected = false
        });
        data[index].isSelected = true
        settabs(data)
    }
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

            <View style={Styles.views}>
                {
                    props.tabs === 1 ?
                        <View style={Styles.leftView}>
                            <View style={Styles.firstView}>
                                <Image style={Styles.iconParent} source={Images.LessonIcon} />
                                <Text style={Styles.availabeText}>{'This person is curently offline.\nAvailable from 09:00 - 17:00'}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Parent/Guardian</Text>
                                <Text style={Styles.subText}>{props.data.ParentFirstName} {props.data.ParentLastName}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Relationship to pupil:</Text>
                                <Text style={Styles.subText}>{props.data.Relationship}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Email:</Text>
                                <Text style={Styles.subText}>{props.data.Email}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Address:</Text>
                                <Text style={Styles.subText}>{`${props.data.AddressLine1}\n${props.data.AddressLine2}`}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Telephone no:</Text>
                                <Text style={Styles.subText}>{props.data.MobileNumber}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Notes:</Text>
                                <Text style={Styles.subText}>{props.data.Note}</Text>
                            </View>

                        </View>
                        : null
                }

                <View style={[Styles.rightView, { width: props.tabs === 1 ? hp(76) : wp(85) }]}>
                    <KeyboardAwareScrollView >

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
                                }}
                            />
                            {/* <ScrollView>
                            {
                                [1, 2, 3, 4, 5, 6,].map((item, index) => {
                                    return (
                                        <View style={Styles.messageCell}>
                                            <Image style={Styles.roundImage} />
                                            <View style={Styles.messageSubCell}>
                                                <Text style={Styles.userNameText}>Miss Barker</Text>
                                                <Text style={Styles.messageText}>ok Thank you</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView> */}
                        </View>
                        <View style={[Styles.textView, { width: props.tabs === 1 ? hp(76) : wp(85) }]}>
                            <TextInput
                                style={Styles.input}
                                multiline={true}
                                placeholder={placeholder}
                                placeholderTextColor={COLORS.menuLightFonts}
                                value={message}
                                onChangeText={(text) => setMessage(text)}
                            />
                            <View style={Styles.buttonView}>
                                {/* <TouchableOpacity>
                                    <Image style={Styles.btn} source={Images.paperClip} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Image style={Styles.btn} source={Images.imageUpload} />
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => sendMessage(message)}>
                                    <Image style={Styles.btn} source={Images.send} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                </View>

            </View>
        </View>

    )
}

export default Chat
