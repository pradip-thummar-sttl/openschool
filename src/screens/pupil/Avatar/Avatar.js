import React from 'react'
import { View, Text } from 'react-native'
import AvatarHeader from './AvatarHeader'
import Styles from './Style'

const Avatar = () => {
    return (
        <View>
            <AvatarHeader />
            <View style={Styles.mainView}>
                <View style={Styles.leftView}>
                    <View style={Styles.starView}>

                    </View>
                </View>
                <View style={Styles.rightView}>

                </View>
            </View>
        </View>
    )
}

export default Avatar
