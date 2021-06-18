import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import COLORS from '../../utils/Colors'
import Images from '../../utils/Images'
import STYLE from '../../utils/Style'
import ChatHeader from './ChatHeader'
import Styles from './Style'

// var data = [
//     { name: 'PUPIL PROFILE', isSelected: true },
//     { name: 'PARENT CHAT', isSelected: false },
//     { name: 'PUPIL CHAT', isSelected: false },
//     { name: 'SCHOOL CHAT', isSelected: false }]
const Chat = () => {
    const [tabs, settabs] = useState([
        { name: 'PUPIL PROFILE', isSelected: true },
        { name: 'PARENT CHAT', isSelected: false },
        { name: 'PUPIL CHAT', isSelected: false },
        { name: 'SCHOOL CHAT', isSelected: false }])


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
            <ChatHeader />
            {/* tabs */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
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
            </View>

            <View style={Styles.views}>
                <View style={Styles.leftView}>
                    <View style={Styles.firstView}>
                        <Image style={Styles.iconParent} source={Images.LessonIcon} />
                        <Text style={Styles.availabeText}>{'This person is curently offline.\nAvailable from 09:00 - 17:00'}</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Parent/Guardian</Text>
                        <Text style={Styles.subText}>Ann Le-Pardesi</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Relationship to pupil:</Text>
                        <Text style={Styles.subText}>Mother</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Email:</Text>
                        <Text style={Styles.subText}>ann@gmail.com</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Address:</Text>
                        <Text style={Styles.subText}>{'23 York Road, Mosely,\nBirmingham, B13 1LT'}</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Telephone no:</Text>
                        <Text style={Styles.subText}>07777 777 777</Text>
                    </View>
                    <View style={Styles.secondView}>
                        <Text style={Styles.headText}>Notes:</Text>
                        <Text style={Styles.subText}>{'Speak to her about Reuels'}</Text>
                    </View>

                </View>
                <View style={Styles.rightView}>
                    <View style={Styles.mesagesView}>
                        <FlatList
                            data={[1, 2, 3, 4, 5, 6, 7]}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={Styles.messageCell}>
                                        <Image style={Styles.roundImage} />
                                        <View style={Styles.messageSubCell}>
                                            <Text style={Styles.userNameText}>Miss Barker<Text style={Styles.timeText}>   08:20</Text></Text>
                                            <Text style={Styles.messageText}>ok Thank you</Text>
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
                        />
                        <View style={Styles.buttonView}>
                            <TouchableOpacity>
                                <Image style={Styles.btn} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:20}}>
                                <Image style={Styles.btn} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image style={Styles.btn} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default Chat
