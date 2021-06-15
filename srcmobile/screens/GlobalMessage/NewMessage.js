import React,{useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import Styles from './Style'
import COLORS from '../../utils/Colors'
import Style from '../../utils/Style'
import NewMessageHeader from '../../component/reusable/header/NewMessageHeader'

const NewMessage = () => {
    const [event, setEvent] = useState('');
    const [note, setnote] = useState('');
    return (
        <View>
            <NewMessageHeader/>
            <View style={Styles.field1}>
                <Text label style={Style.labelCommon}>Title</Text>
                <View style={Styles.copyInputParent}>
                    <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={Styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.black}
                        style={[Styles.commonInputTextarea1, , Styles.inputWidth]}
                        onChangeText={eventName => setEvent(eventName)} />
                </View>
            </View>

            <View style={Styles.field1}>
                <Text label style={Style.labelCommon}>Recipient</Text>
                <View style={Styles.copyInputParent}>
                    <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={Styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.black}
                        style={Styles.commonInputTextarea1}
                        onChangeText={eventName => setEvent(eventName)} />


                </View>
            </View>

            <View style={Styles.field1}>
                <Text label style={Style.labelCommon}>Message</Text>
                <View style={Styles.copyInputParent}>
                    <TextInput
                        multiline={true}
                        placeholder='Write a message here'
                        value={event}
                        placeholderStyle={Styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.black}
                        style={[Styles.commonInputTextarea1, Styles.inputHeight]}
                        onChangeText={eventName => setEvent(eventName)} />
                </View>
            </View>
            
        </View>
    )
}

export default NewMessage
