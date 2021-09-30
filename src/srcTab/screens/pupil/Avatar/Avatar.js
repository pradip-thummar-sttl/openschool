import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
// import Images from '../../../../utils/Images'
// import Images from '../../../../../srcmobile/utils/Images'
import AvatarHeader from './AvatarHeader'
import Styles from './Style'
import BronzeStar from "../../../../svg/pupil/dashboard/BronzeStar";
import SilverStar from "../../../../svg/pupil/dashboard/SilverStar";
import GoldStar from "../../../../svg/pupil/dashboard/GoldStar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../../utils/Colors';

const tabs = [
    { name: 'COLOUR', isSelected: true },
    { name: 'HAIR', isSelected: false, },
    { name: 'EYES', isSelected: false, },
    { name: 'MOUTH', isSelected: false, },
    { name: 'CLOTHES', isSelected: false, }]


const backgroundColorArray = ['#a8d9fe', '#f5d538', '#ecb229', '#ecb229', '#a8d9fe', '#f5d538']

const bodyColorImage = [
    require('../../../../assets/Avtar/Body/bodyBlue.png'),
    require('../../../../assets/Avtar/Body/bodyCoral.png'),
    require('../../../../assets/Avtar/Body/bodyGreen.png'),
    require('../../../../assets/Avtar/Body/bodyOrange.png'),
    require('../../../../assets/Avtar/Body/bodyPupral.png'),
    require('../../../../assets/Avtar/Body/bodyYellow.png')
]


const hairImage = [
    require('../../../../assets/Avtar/Hair/hair1.png'),
    require('../../../../assets/Avtar/Hair/hair2.png'),
    require('../../../../assets/Avtar/Hair/hair3.png'),
    require('../../../../assets/Avtar/Hair/hair4.png'),
    require('../../../../assets/Avtar/Hair/hair5.png'),
    require('../../../../assets/Avtar/Hair/hair6.png')
]

const eyeImage = [
    require('../../../../assets/Avtar/Eyes/eye1.png'),
    require('../../../../assets/Avtar/Eyes/eye2.png'),
    require('../../../../assets/Avtar/Eyes/eye3.png'),
    require('../../../../assets/Avtar/Eyes/eye4.png'),
    require('../../../../assets/Avtar/Eyes/eye5.png'),
    require('../../../../assets/Avtar/Eyes/eye6.png')
]

const mouthImage = [
    require('../../../../assets/Avtar/Mouth/mouth1.png'),
    require('../../../../assets/Avtar/Mouth/mouth2.png'),
    require('../../../../assets/Avtar/Mouth/mouth3.png'),
    require('../../../../assets/Avtar/Mouth/mouth4.png'),
    require('../../../../assets/Avtar/Mouth/mouth5.png'),
    require('../../../../assets/Avtar/Mouth/mouth6.png')
]

const outfitImage = [
    require('../../../../assets/Avtar/Outfits/outfit1.png'),
    require('../../../../assets/Avtar/Outfits/outfit2.png'),
    require('../../../../assets/Avtar/Outfits/outfit3.png'),
    require('../../../../assets/Avtar/Outfits/outfit4.png'),
]

const Avatar = () => {

    const [stateOptions, setStateValues] = useState(tabs);
    const [currentSelected, setCurrentSelected] = useState('COLOUR');
    const [currentSelectedColour, setCurrentSelectedColour] = useState(0);
    const [currentSelectedHair, setCurrentSelectedHair] = useState(0);
    const [currentSelectedEyes, setCurrentSelectedEyes] = useState(0);
    const [currentSelectedMouth, setCurrentSelectedMouth] = useState(0);

    const changeTab = (index) => {

        let newArr = [...stateOptions];
        newArr.map((item) => {
            item.isSelected = false;
        })
        newArr[index].isSelected = true;
        setCurrentSelected(newArr[index].name);
        setStateValues(newArr);
    }

    const currentSelectedTab = () => {

        if (currentSelected === 'COLOUR') {
            return bodyColorImage
        }
        else if (currentSelected === 'HAIR') {
            return hairImage
        }
        else if (currentSelected === 'EYES') {
            return eyeImage
        }
        else if (currentSelected === 'MOUTH') {
            return mouthImage
        }
        else {
            return outfitImage
        }
    }

    const onPressAvtarParts = (index) => {

        if (currentSelected === 'COLOUR') {
            setCurrentSelectedColour(index)
        }
        else if (currentSelected === 'HAIR') {
            setCurrentSelectedHair(index)
        }
        else if (currentSelected === 'EYES') {
            setCurrentSelectedEyes(index)
        }
        else if (currentSelected === 'MOUTH') {
            setCurrentSelectedMouth(index)
        }
        else {
            return outfitImage
        }
    }

    const hairImageSet = () => {

        if (currentSelectedHair === 1) {
            return <Image source={hairImage[currentSelectedHair]} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(9), zIndex: 10, left: hp(11.5) }} ></Image>
        }
        else if (currentSelectedHair === 2) {
            return <Image source={hairImage[currentSelectedHair]} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(8), zIndex: 10, right:hp(13) }} ></Image>
        }
        else if (currentSelectedHair === 3) {
            return <Image source={hairImage[currentSelectedHair]} style={{ width: hp(22), height: hp(22), resizeMode: 'contain', position: 'absolute', top: hp(5.5), zIndex: 10,  }} ></Image>
        }
        else if (currentSelectedHair === 4) {
            return <Image source={hairImage[currentSelectedHair]} style={{ width: hp(22), height: hp(22), resizeMode: 'contain', position: 'absolute', top: hp(4), zIndex: 10,  }} ></Image>
        }
        else {
            return <Image source={hairImage[currentSelectedHair]} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(5), zIndex: 10 }} ></Image>
        }

    }

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
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.BronzeStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>18</Text>
                                </ImageBackground> */}
                                <BronzeStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starText}>Bronze stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.SilverStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>15</Text>
                                </ImageBackground> */}
                                <SilverStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starText}>Silver stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.GoldStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>5</Text>
                                </ImageBackground> */}
                                <GoldStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starText}>Gold stars</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingTop: hp(5), flex: 1 }} >
                        {/* Avatar editing View */}
                        {hairImageSet()}
                        <Image source={bodyColorImage[currentSelectedColour]} style={{ width: hp(25), height: hp(50), resizeMode: 'contain', position: 'absolute', bottom: 0 }} ></Image>
                        <Image source={eyeImage[currentSelectedEyes]} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(15), zIndex: 20 }} ></Image>
                        <Image source={mouthImage[currentSelectedMouth]} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(22), zIndex: 20 }} ></Image>
                        {/* <Image source={require('../../../../assets/Avtar/Outfits/outfit3.png')} style={{ width: hp(25), height: hp(50), resizeMode: 'contain', position: 'absolute', bottom: 0, zIndex:0 }} ></Image> */}
                    </View>
                </View>

                {/* Right View */}
                <View style={Styles.rightView}>
                    <View style={Styles.borderView}>
                        {/* Tabs */}
                        <View style={Styles.tabView}>
                            {
                                stateOptions.map((item, index) => {
                                    console.log('item', item)
                                    return (
                                        <TouchableOpacity onPress={() => changeTab(index)} style={Styles.tabBtn}>
                                            <Text style={[Styles.tabText, { color: item.isSelected === true ? COLORS.buttonGreen : COLORS.lightGray }]}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <FlatList
                            data={currentSelectedTab()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => onPressAvtarParts(index)} style={[Styles.itemBtn, { backgroundColor: backgroundColorArray[index] }]}>
                                        <Image source={item} style={{ width: hp(10), height: hp(10), resizeMode: 'contain' }} />
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
