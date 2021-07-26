import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import COLORS from '../../utils/Colors'
import STYLE from '../../utils/Style'
import ChatHeader from './ChatHeader'
import Styles from './Style'
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../src/utils/Images';
import { User } from '../../utils/Model';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { baseUrl } from '../../utils/Constant'

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

    // const [parentChannels] = useState([channel1]);
    // const [pupilChannels] = useState([channel2]);
    // const [schoolChannels] = useState([channel3]);
    // const [channels] = useState(['awesome-channel']);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
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
        // var mesage = messages
        const message = event.message;
        console.log('message', message);
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            // mesage.push(event)
            addMessage(messages => [...messages, event]);
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
        if (message.trim().length == 0) {
            return
        }
        
        message = message + '#@#' + User.user.FirstName + ' ' + User.user.LastName + '#@#' + User.user.ProfilePicture

        if (message) {
            pubnub
            .publish({ channel: channels[0], message })
                .then(() => setMessage(''))
                .catch((msg) => console.log(msg));
        }
    };

    const refresh = () => {
        console.log('hello who are you');
        addMessage([])
    }


    useEffect(() => {
        pubnub.addListener({ message: handleMessage });   
        pubnub.subscribe({ channels });
    }, [pubnub, channels,]);


   
    return (

        <View style={{flex:1}}>
           

            <KeyboardAwareScrollView 
            enableOnAndroid={true}
            extraScrollHeight={90}
            scrollEnabled
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flex:1}}
            >
                <View style={Styles.views}>

                    <View style={Styles.rightView}>
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
                           
                        </View>
                        <View style={Styles.textView}>
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

                    </View>

                </View>
            </KeyboardAwareScrollView>

        </View>

    )
}

export default Chat
