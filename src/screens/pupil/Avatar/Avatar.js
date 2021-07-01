import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Images from '../../../../srcmobile/utils/Images'
import AvatarHeader from './AvatarHeader'
import Styles from './Style'
var tabs = [
    { name: 'COLOUR', isSelected: false },
    { name: 'HAIR', isSelected: false, },
    { name: 'EYES', isSelected: false, },
    { name: 'MOUTH', isSelected: false, },
    { name: 'CLOTHES', isSelected: false, }]
const Avatar = () => {
    return (
        <View>
            <AvatarHeader />
            <View style={Styles.mainView}>
                {/* LeftView */}
                <View style={Styles.leftView}>
                    <View style={Styles.starView}>
                        <View style={Styles.yellowView}>
                            <Text style={Styles.subText}>Your stars convert to</Text>
                            <Text style={Styles.headText}>60 points</Text>
                        </View>
                        <View style={Styles.rewardStarMark}>
                            <View style={Styles.centerText}>
                                <ImageBackground source={Images.BronzeStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>18</Text>
                                </ImageBackground>
                                <Text style={Styles.starText}>Bronze stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                <ImageBackground source={Images.SilverStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>15</Text>
                                </ImageBackground>
                                <Text style={Styles.starText}>Silver stars</Text>
                            </View>
                            <View style={Styles.centerText}>
                                <ImageBackground source={Images.GoldStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>5</Text>
                                </ImageBackground>
                                <Text style={Styles.starText}>Gold stars</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* Avatar editing View */}
                    </View>
                </View>

                {/* Right View */}
                <View style={Styles.rightView}>
                    <View style={Styles.borderView}>
                        {/* Tabs */}
                        <View style={Styles.tabView}>
                            {
                                tabs.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={Styles.tabBtn}>
                                            <Text style={Styles.tabText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <FlatList
                            data={[1, 2, 3, 4, 5, 6]}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={Styles.itemBtn}>

                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={3}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Avatar
