import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import NewMessageHeader from '../../../component/reusable/header/NewMessageHeader'
import COLORS from '../../../utils/Colors';
import STYLE from '../../../utils/Style';
import styles from './Styles';
import ToggleSwitch from 'toggle-switch-react-native';
import Images from '../../../utils/Images';

const NewMessage = () => {
    const [event, setEvent] = useState('');
    const [note, setnote] = useState('');

    const [isSwitch, setSwitch] = useState(true)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }
    return (
        <View>
            <NewMessageHeader />
            <View style={styles.field1}>
                <Text label style={STYLE.labelCommon}>Message Title</Text>
                <View style={styles.copyInputParent}>
                    <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.borderGrp}
                        style={[styles.commonInputTextarea1, , styles.inputWidth]}
                        onChangeText={eventName => setEvent(eventName)} />
                </View>
            </View>

            <View style={styles.field1}>
                <Text label style={STYLE.labelCommon}>Recipient</Text>
                <View style={styles.copyInputParent}>
                    <TextInput
                        multiline={false}
                        placeholder='Enter title of the message'
                        value={event}
                        placeholderStyle={styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.borderGrp}
                        style={styles.commonInputTextarea1}
                        onChangeText={eventName => setEvent(eventName)} />

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
                        multiline={true}
                        placeholder='Write a message here'
                        value={event}
                        placeholderStyle={styles.somePlaceholderStyle}
                        placeholderTextColor={COLORS.borderGrp}
                        style={[styles.commonInputTextarea1, styles.inputHeight]}
                        onChangeText={eventName => setEvent(eventName)} />
                </View>
            </View>
            <TouchableOpacity  style={styles.buttonGroup1}>
                <Image style={styles.addIcon} source={Images.CheckIconWhite} />
                <Text style={styles.commonButtonGreenheaderwithicon}>SAVE AS DRAFT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewMessage
