import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native'
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
import BronzeStar from "../../../../svg/pupil/dashboard/BronzeStar";
import SilverStar from "../../../../svg/pupil/dashboard/SilverStar";
import GoldStar from "../../../../svg/pupil/dashboard/GoldStar";
import { Service } from '../../../../service/Service'
import { EndPoints } from '../../../../service/EndPoints'
import { User } from '../../../../utils/Model'
import { baseUrl } from '../../../../utils/Constant';

var tabs = [
    { name: 'COLOUR', isSelected: false },
    { name: 'HAIR', isSelected: false, },
    { name: 'EYES', isSelected: false, },
    { name: 'MOUTH', isSelected: false, },
    // { name: 'CLOTHES', isSelected: false, }
]

const backgroundColorArray = ['#a8d9fe', '#f5d538', '#ecb229', '#ecb229', '#a8d9fe', '#f5d538']

const Avatar = (prop) => {

    const props = prop.route.params
    const [stateOptions, setStateValues] = useState(tabs);
    const [currentSelected, setCurrentSelected] = useState('COLOUR');
    const [currentSelectedColour, setCurrentSelectedColour] = useState(0);
    const [currentSelectedHair, setCurrentSelectedHair] = useState(0);
    const [currentSelectedEyes, setCurrentSelectedEyes] = useState(0);
    const [currentSelectedMouth, setCurrentSelectedMouth] = useState(0);
    const [currentSelectedCloth, setCurrentSelectedCloth] = useState(0);

    const [colourAvtar, setColourAvtar] = useState([]);
    const [hairAvtar, setHairAvtar] = useState([]);
    const [eyesAvtar, setEyesAvtar] = useState([]);
    const [mouthAvtar, setMouthAvtar] = useState([]);
    const [clothsAvtar, setClothsAvtar] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    useEffect(() => {
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

        Service.get(EndPoints.GetAllAvtar, (res) => {

            console.log('get avtar ', res)

            res.data.forEach(element => {

                if (element.Type === 'colour') {
                    let colour = [];
                    colour = element.imglist
                    colour.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                        }
                        else {
                            data['isSelected'] = false
                        }
                    })
                    setColourAvtar(colour)
                    console.log('colour', colour)
                    console.log('colour', colourAvtar)
                }
                else if (element.Type === 'hair') {
                    let hair = [];
                    hair = element.imglist
                    hair.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                        }
                        else {
                            data['isSelected'] = false
                        }
                    })
                    setHairAvtar(hair)
                    console.log('hair', hair)
                    console.log('hair', hairAvtar)
                }
                else if (element.Type === 'eyes') {
                    let eyes = [];
                    eyes = element.imglist
                    eyes.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                        }
                        else {
                            data['isSelected'] = false
                        }
                    })
                    setEyesAvtar(eyes)
                    console.log('eyes', eyes)
                    console.log('eyes', eyesAvtar)
                }
                else if (element.Type === 'mouth') {
                    let mouth = [];
                    mouth = element.imglist
                    mouth.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                        }
                        else {
                            data['isSelected'] = false
                        }
                    })
                    setMouthAvtar(mouth)
                    console.log('mouth', mouth)
                    console.log('mouth', mouthAvtar)
                }
                else if (element.Type === 'clothes') {
                    let clothes = [];
                    clothes = element.imglist
                    clothes.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                        }
                        else {
                            data['isSelected'] = false
                        }
                    })
                    setClothsAvtar(clothes)
                    console.log('cloth', clothes)
                    console.log('cloth', clothsAvtar)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)

                }
            });


        }, (err) => {
            console.log('err', err)
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
            // return outfitImage
            let newArr = [...clothsAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedCloth(index)
            setClothsAvtar(newArr)
        }
    }

    const hairImageSet = () => {

        if (currentSelectedHair === 1) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(13), height: hp(13), resizeMode: 'contain', position: 'absolute', top: hp(-1), zIndex: 10, left: hp(-11) }} ></Image>
        }
        else if (currentSelectedHair === 2) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(13), height: hp(13), resizeMode: 'contain', position: 'absolute', top: hp(-1), zIndex: 10, right: hp(-11) }} ></Image>
        }
        else if (currentSelectedHair === 3) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(19), height: hp(19), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
        }
        else if (currentSelectedHair === 4) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(19), height: hp(19), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
        }
        else if (currentSelectedHair === 5) {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(16), height: hp(16), resizeMode: 'contain', position: 'absolute', top: hp(-6), zIndex: 10, }} ></Image>
        }
        else {
            return <Image source={hairAvtar[currentSelectedHair].image} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(-5), zIndex: 10 }} ></Image>
        }

    }



    return (
        <View>
            <AvatarHeader onAlertPress={() => { prop.navigation.openDrawer() }} />
            <View style={Styles.mainView}>
                <View style={Styles.yellowView}>
                    <Text style={Styles.subText}>Your stars convert to</Text>
                    <Text style={Styles.headText}>{bronze + silver + gold} points</Text>
                </View>

                <View style={Styles.rewardStarMark}>
                    <View style={Styles.centerStar}>
                        {/* <ImageBackground source={Images.BronzeStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>18</Text>
                        </ImageBackground> */}
                        <BronzeStar width={hp(5)} height={hp(5)} />
                        <Text style={Styles.starSelectedText}>{bronze}</Text>
                        <Text style={Styles.starText}>Bronze stars</Text>
                    </View>
                    <View style={Styles.centerStar}>
                        {/* <ImageBackground source={Images.SilverStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>15</Text>
                        </ImageBackground> */}
                        <SilverStar width={hp(5)} height={hp(5)} />
                        <Text style={Styles.starSelectedText}>{silver}</Text>
                        <Text style={Styles.starText}>Silver stars</Text>
                    </View>
                    <View style={Styles.centerStar}>
                        {/* <ImageBackground source={Images.GoldStarFill} style={[Styles.starSelected]}>
                            <Text style={Styles.starSelectedText}>5</Text>
                        </ImageBackground> */}
                        <GoldStar width={hp(5)} height={hp(5)} />
                        <Text style={Styles.starSelectedText}>{gold}</Text>
                        <Text style={Styles.starText}>Gold stars</Text>
                    </View>
                </View>
                {/* <View style={{ height: 300, width: '100%' }}> */}
                {/* <BodyOrange width={'100%'} height={'100%'} /> */}
                {/* <EyeSpecs width={'100%'} height={'100%'} /> */}
                {/* <HairRed width={'100%'} height={'100%'} /> */}
                {/* <MouthCheeks width={200} height={200} /> */}
                {/* </View> */}

                {/* <View style={{ alignItems: "center", justifyContent: "center", paddingTop: hp(5), height: hp(38) }} >
                    {hairImageSet()}
                    <Image source={colourAvtar[currentSelectedColour].image} style={{ width: hp(20), height: hp(35), resizeMode: 'contain', position: 'absolute', }} ></Image>
                    <Image source={eyesAvtar[currentSelectedEyes].image} style={{ width: hp(8), height: hp(8), resizeMode: 'contain', position: 'absolute', top: hp(5), zIndex: 20 }} ></Image>
                    <Image source={mouthAvtar[currentSelectedMouth].image} style={{ width: hp(8), height: hp(8), resizeMode: 'contain', position: 'absolute', top: hp(10), zIndex: 20 }} ></Image>
                </View> */}


                <View style={Styles.borderView}>
                    {/* Tabs */}
                    {/* <View style={Styles.tabView}>
                        {
                            tabs.map((item, index) => {
                                return (
                                    <TouchableOpacity style={Styles.tabBtn}>
                                        <Text style={Styles.tabText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View> */}
                    {isLoading == false ?
                        <View style={{ alignItems: "center", justifyContent: "center", paddingTop: hp(5), height: hp(38) }} >
                            {currentSelectedHair == 0 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(13), height: hp(13), resizeMode: 'contain', position: 'absolute', top: hp(-1), zIndex: 10, left: hp(-11) }} ></Image>
                                : null}
                            {currentSelectedHair == 1 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(-5), zIndex: 10 }} ></Image>
                                : null}
                            {currentSelectedHair == 2 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(13), height: hp(13), resizeMode: 'contain', position: 'absolute', top: hp(-1), zIndex: 10, right: hp(-11) }} ></Image>
                                : null}
                            {currentSelectedHair == 3 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(19), height: hp(19), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
                                : null}
                            {currentSelectedHair == 4 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(19), height: hp(19), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
                                : null}
                            {currentSelectedHair == 5 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(16), height: hp(16), resizeMode: 'contain', position: 'absolute', top: hp(-6), zIndex: 10, }} ></Image>
                                : null}
                            <Image source={{ uri: baseUrl + [colourAvtar[currentSelectedColour].Images] }} style={{ width: hp(20), height: hp(35), resizeMode: 'contain', position: 'absolute', }} ></Image>
                            <Image source={{ uri: baseUrl + eyesAvtar[currentSelectedEyes].Images }} style={{ width: hp(8), height: hp(8), resizeMode: 'contain', position: 'absolute', top: hp(6), zIndex: 20 }} ></Image>
                            <Image source={{ uri: baseUrl + mouthAvtar[currentSelectedMouth].Images }} style={{ width: hp(8), height: hp(8), resizeMode: 'contain', position: 'absolute', top: hp(12), zIndex: 20 }} ></Image>
                        </View> : null}

                    {isLoading == false ?
                        <View style={{ borderColor: COLORS.borderGrp, borderWidth: 1, width: '100%' }} /> : null}

                    {isLoading == false ?
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
                        </View> : null}
                    {isLoading == false ?
                        <FlatList
                            data={currentSelectedTab()}
                            contentContainerStyle={{ paddingBottom: hp(5) }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => onPressAvtarParts(index)} style={[Styles.itemBtn, { backgroundColor: backgroundColorArray[index], borderColor: COLORS.black, borderWidth: item.isSelected ? 2 : 0 }]}>
                                        <Image source={{ uri: baseUrl + item.Images }} style={{ width: hp(9), height: hp(9), resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={3}
                        /> : null}
                    {/* <FlatList
                        data={[1, 2, 3, 4, 5, 6]}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={Styles.itemBtn}>

                                </TouchableOpacity>
                            )
                        }}
                        numColumns={3}
                    /> */}
                </View>
            </View>

        </View>
    )
}

export default Avatar
