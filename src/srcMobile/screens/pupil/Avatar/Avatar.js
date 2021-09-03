import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import BodyOrange from '../../../../svg/pupil/myavatar/Body/BodyOrange'
import EyeSpecs from '../../../../svg/pupil/myavatar/Eye/EyeSpecs'
import HairRed from '../../../../svg/pupil/myavatar/Hair/HairRed'
import MouthCheeks from '../../../../svg/pupil/myavatar/Mouth/MouthCheeks'
import COLORS from '../../../../utils/Colors'
// import Images from '../../../../srcmobile/utils/Images'
// import Images from '../../../../utils/Images'
import AvatarHeader from './AvatarHeader'
import Styles from './Style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
                <View style={Styles.yellowView}>
                    <Text style={Styles.subText}>Your stars convert to</Text>
                    <Text style={Styles.headText}>60 points</Text>
                </View>

                <View style={Styles.rewardStarMark}>
                    <View style={Styles.centerText}>
                        {/* <ImageBackground source={Images.BronzeStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>18</Text>
                        </ImageBackground> */}
                        <Text style={Styles.starText}>Bronze stars</Text>
                    </View>
                    <View style={Styles.centerStar}>
                        {/* <ImageBackground source={Images.SilverStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>15</Text>
                        </ImageBackground> */}
                        <Text style={Styles.starText}>Silver stars</Text>
                    </View>
                    <View style={Styles.centerText}>
                        {/* <ImageBackground source={Images.GoldStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>5</Text>
                        </ImageBackground> */}
                        <Text style={Styles.starText}>Gold stars</Text>
                    </View>
                </View>
                <View style={{ height: 300, width: '100%' }}>
                    {/* <BodyOrange width={'100%'} height={'100%'} /> */}
                    {/* <EyeSpecs width={'100%'} height={'100%'} /> */}
                    {/* <HairRed width={'100%'} height={'100%'} /> */}
                    <MouthCheeks width={200} height={200} />
                </View>

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
    )
}

export default Avatar
