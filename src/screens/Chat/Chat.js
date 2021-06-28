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


// var data = [
//     { name: 'PUPIL PROFILE', isSelected: true },
//     { name: 'PARENT CHAT', isSelected: false },
//     { name: 'PUPIL CHAT', isSelected: false },
//     { name: 'SCHOOL CHAT', isSelected: false }]


const Chat = (props) => {
    const pubnub = usePubNub();
    const [channels] = useState(['awesome-channel']);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
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
            // var mesage = [...messages]
            mesage.push(event)
            addMessage(mesage);
        }
    };

    const sendMessage = message => {
        if (message) {
            pubnub
                .publish({ channel: channels[0], message })
                .then(() => setMessage(''));
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
                                <Text style={Styles.subText}>Mother</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Email:</Text>
                                <Text style={Styles.subText}>{props.data.Email}</Text>
                            </View>
                            <View style={Styles.secondView}>
                                <Text style={Styles.headText}>Address:</Text>
                                <Text style={Styles.subText}>{'23 York Road, Mosely,\nBirmingham, B13 1LT'}</Text>
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

                <View style={[Styles.rightView,{width:props.tabs === 1?hp(76):wp(85)}]}>
            <KeyboardAwareScrollView >

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
                    <View style={[Styles.textView,{width:props.tabs === 1?hp(76):wp(85)}]}>
                        <TextInput
                            style={Styles.input}
                            multiline={true}
                            placeholder="Message Ann le"
                            placeholderTextColor={COLORS.menuLightFonts}
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                        />
                        <View style={Styles.buttonView}>
                            <TouchableOpacity>
                                <Image style={Styles.btn} source={Images.paperClip}  />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image style={Styles.btn} source={Images.imageUpload} />
                            </TouchableOpacity>
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
