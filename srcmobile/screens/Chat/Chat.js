import React, { useState, useEffect } from 'react'
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import COLORS from '../../utils/Colors'
import STYLE from '../../utils/Style'
import ChatHeader from './ChatHeader'
import Styles from './Style'
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../src/utils/Images';
import { User } from '../../utils/Model';


// var data = [
//     { name: 'PUPIL PROFILE', isSelected: true },
//     { name: 'PARENT CHAT', isSelected: false },
//     { name: 'PUPIL CHAT', isSelected: false },
//     { name: 'SCHOOL CHAT', isSelected: false }]


const Chat = (props) => {
    console.log('data of parent chat', props.data);
    const pubnub = usePubNub();
    let channel1=`${props.data.MobileNumber}_${User.user._id}`
    let channel2=`${props.data.PupilId}_${User.user._id}`
    let channel3=`${props.data.SchoolId}_${User.user._id}`

    const [channels] = useState([channel1, channel2, channel3]);
    // const [channels] = useState(['awesome-channel']);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [tabs, settabs] = useState([
        { name: 'PUPIL PROFILE', isSelected: true },
        { name: 'PARENT CHAT', isSelected: false },
        { name: 'PUPIL CHAT', isSelected: false },
        { name: 'SCHOOL CHAT', isSelected: false }])


    const handleMessage = event => {
        console.log('log of event message', event);
        var mesage = messages
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            const text = message.text || message;
            // addMessage(messages => [...messages, event]);
            
            console.log('messages array', mesage, event)
            mesage.push(event)
            addMessage(mesage);
        }
    };

    const sendMessage = message => {
        var channel = ""
        if (props.tabs === 1) {
            channel = channels[0]
        }else if (props.tabs === 2) {
            channel = channels[1]
        }else{
            channel = channels[2]
        }
        if (message) {
            pubnub
                .publish({ channel: channel, message })
                .then(() => setMessage(''));
        }
    };

    useEffect(() => {
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);


    // const onPressTab = (index) => {
    //     var data = [...tabs]
    //     data.forEach(element => {
    //         element.isSelected = false
    //     });
    //     data[index].isSelected = true
    //     settabs(data)
    //     setSelectedIndex(index)
    // }
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
                
            </View> */}
            
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, }}>
            <View style={Styles.views}>
               
                <View style={Styles.rightView}>
                    <View style={Styles.mesagesView}>
                        <FlatList
                            data={messages}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={Styles.messageCell}>
                                        <Image style={Styles.roundImage} />
                                        <View style={Styles.messageSubCell}>
                                            <Text style={Styles.userNameText}>Miss Barker<Text style={Styles.timeText}>   {moment(new Date(((item.timetoken / 10000000)*1000))).format('hh:mm')}</Text></Text>
                                            <Text style={Styles.messageText}>{item.message}</Text>
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
                    <View style={Styles.textView}>
                        <TextInput
                            style={Styles.input}
                            multiline={true}
                            placeholder="Message Ann le"
                            placeholderTextColor={COLORS.menuLightFonts}
                            value={message}
                            onChangeText={(text)=>setMessage(text)}
                        />
                        <View style={Styles.buttonView}>
                            <TouchableOpacity>
                                <Image style={Styles.btn} source={Images.paperClip}/>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image style={Styles.btn} source={Images.imageUpload} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>sendMessage(message)}>
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
