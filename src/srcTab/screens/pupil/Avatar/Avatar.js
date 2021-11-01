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
import { Service } from '../../../../service/Service'
import { EndPoints } from '../../../../service/EndPoints'
import { BadgeIcon, User } from '../../../../utils/Model'

const tabs = [
    { name: 'COLOUR', isSelected: true },
    { name: 'HAIR', isSelected: false, },
    { name: 'EYES', isSelected: false, },
    { name: 'MOUTH', isSelected: false, },
    // { name: 'CLOTHES', isSelected: false, }
]


const backgroundColorArray = ['#a8d9fe', '#f5d538', '#ecb229', '#ecb229', '#a8d9fe', '#f5d538']

const bodyColorImage = [
    { image: require('../../../../assets/Avtar/Body/bodyBlue.png'), isSelected: true },
    { image: require('../../../../assets/Avtar/Body/bodyCoral.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Body/bodyGreen.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Body/bodyOrange.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Body/bodyPupral.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Body/bodyYellow.png'), isSelected: false }
]


const hairImage = [
    { image: require('../../../../assets/Avtar/Hair/hair1.png'), isSelected: true },
    { image: require('../../../../assets/Avtar/Hair/hair2.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Hair/hair3.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Hair/hair4.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Hair/hair5.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Hair/hair6.png'), isSelected: false },
]

const eyeImage = [
    { image: require('../../../../assets/Avtar/Eyes/eye1.png'), isSelected: true },
    { image: require('../../../../assets/Avtar/Eyes/eye2.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Eyes/eye3.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Eyes/eye4.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Eyes/eye5.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Eyes/eye6.png'), isSelected: false },
]

const mouthImage = [
    { image: require('../../../../assets/Avtar/Mouth/mouth1.png'), isSelected: true },
    { image: require('../../../../assets/Avtar/Mouth/mouth2.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Mouth/mouth3.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Mouth/mouth4.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Mouth/mouth5.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Mouth/mouth6.png'), isSelected: false }
]

const outfitImage = [
    { image: require('../../../../assets/Avtar/Outfits/outfit1.png'), isSelected: true },
    { image: require('../../../../assets/Avtar/Outfits/outfit2.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Outfits/outfit3.png'), isSelected: false },
    { image: require('../../../../assets/Avtar/Outfits/outfit4.png'), isSelected: false }
]

const Avatar = (props) => {

    const [stateOptions, setStateValues] = useState(tabs);
    const [currentSelected, setCurrentSelected] = useState('COLOUR');
    const [currentSelectedColour, setCurrentSelectedColour] = useState(0);
    const [currentSelectedHair, setCurrentSelectedHair] = useState(0);
    const [currentSelectedEyes, setCurrentSelectedEyes] = useState(0);
    const [currentSelectedMouth, setCurrentSelectedMouth] = useState(0);

    const [colourAvtar, setColourAvtar] = useState(bodyColorImage);
    const [hairAvtar, setHairAvtar] = useState(hairImage);
    const [eyesAvtar, setEyesAvtar] = useState(eyeImage);
    const [mouthAvtar, setMouthAvtar] = useState(mouthImage);
    const [clothsAvtar, setClothsAvtar] = useState(outfitImage);

    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    useEffect(()=> {
        Service.get(`${EndPoints.GetPupilRewards}/${User.user.UserDetialId}`, (res) => {
            console.log('response of my day', res)
            if (res.flag) {
                res.data.forEach(element => {
                    switch (element._id) {
                        case '3':
                            setBronze(element.count)
                            break;
                        case '6':
                            setSilver(element.count)
                            break;
                        case '9':
                            setGold(element.count)
                            break;
                        default:
                            break;
                    }
                });
            } else {
                showMessage(res.message)
                setMyDayLoading(false)
            }
        }, (err) => {
        })
    }, [])

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
            return colourAvtar
        }
        else if (currentSelected === 'HAIR') {
            return hairAvtar
        }
        else if (currentSelected === 'EYES') {
            return eyesAvtar
        }
        else if (currentSelected === 'MOUTH') {
            return mouthAvtar
        }
        else {
            return clothsAvtar
        }
    }

    const onPressAvtarParts = (index) => {

        if (currentSelected === 'COLOUR') {

            let newArr = [...colourAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedColour(index)
            setColourAvtar(newArr)
        }
        else if (currentSelected === 'HAIR') {
            let newArr = [...hairAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedHair(index)
            setHairAvtar(newArr);
        }
        else if (currentSelected === 'EYES') {
            let newArr = [...eyesAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedEyes(index)
            setEyesAvtar(newArr)
        }
        else if (currentSelected === 'MOUTH') {
            let newArr = [...mouthAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedMouth(index)
            setMouthAvtar(newArr)
        }
        else {
            return outfitImage
        }
    }

    const hairImageSet = () => {

        if (currentSelectedHair === 1) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(5.2), zIndex: 10, left: hp(11.5) }} ></Image>
        }
        else if (currentSelectedHair === 2) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(4.8), zIndex: 10, right: hp(13) }} ></Image>
        }
        else if (currentSelectedHair === 3) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(1.3), zIndex: 10, }} ></Image>
        }
        else if (currentSelectedHair === 4) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(1.3), zIndex: 10, }} ></Image>
        }
        else if (currentSelectedHair === 5) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
        }
        else {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(20), height: hp(20), resizeMode: 'contain', position: 'absolute', top: hp(0), zIndex: 10 }} ></Image>
        }

    }
    
    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // prop.navigation.navigate('NotificationDrawer',{ onGoBack: () => refresh() })
    }
    return (
        <View>
            <AvatarHeader onAlertPress={()=>openNotification() }/>
            <View style={Styles.mainView}>
                {/* LeftView */}
                <View style={Styles.leftView}>
                    <View style={Styles.starView}>
                        <View style={Styles.yellowView}>
                            <Text style={Styles.subText}>Your stars convert to</Text>
                            <Text style={Styles.headText}>{bronze + silver + gold} points</Text>
                        </View>
                        <View style={Styles.rewardStarMark}>
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.BronzeStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>18</Text>
                                </ImageBackground> */}
                                <BronzeStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{bronze}</Text>
                                <Text style={Styles.starText}>Bronze stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.SilverStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>15</Text>
                                </ImageBackground> */}
                                <SilverStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{silver}</Text>
                                <Text style={Styles.starText}>Silver stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                {/* <ImageBackground source={Images.GoldStarFill} style={[Styles.starSelected]}>
                                    <Text style={Styles.starSelectedText}>5</Text>
                                </ImageBackground> */}
                                <GoldStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{gold}</Text>
                                <Text style={Styles.starText}>Gold stars</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", paddingTop: hp(5), height: hp(60) }} >
                        {/* Avatar editing View */}
                        {hairImageSet()}
                        <Image source={colourAvtar[currentSelectedColour].image} style={{ width: hp(25), height: hp(50), resizeMode: 'contain', position: 'absolute', }} ></Image>
                        <Image source={eyesAvtar[currentSelectedEyes].image} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(13), zIndex: 20 }} ></Image>
                        <Image source={mouthAvtar[currentSelectedMouth].image} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(20), zIndex: 20 }} ></Image>
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
                                    <TouchableOpacity onPress={() => onPressAvtarParts(index)} style={[Styles.itemBtn, { backgroundColor: backgroundColorArray[index], borderColor: COLORS.black, borderWidth: item.isSelected ? 2 : 0 }]}>
                                        <Image source={item.image} style={{ width: hp(10), height: hp(10), resizeMode: 'contain' }} />
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
