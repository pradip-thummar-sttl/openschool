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
import { User } from '../../../../utils/Model'
import { baseUrl } from '../../../../utils/Constant';
import FONTS from '../../../../utils/Fonts';

const tabs = [
    { name: 'COLOUR', isSelected: true },
    { name: 'HAIR', isSelected: false, },
    { name: 'EYES', isSelected: false, },
    { name: 'MOUTH', isSelected: false, },
    // { name: 'CLOTHES', isSelected: false, }
]


const backgroundColorArray = ['#a8d9fe', '#f5d538', '#ecb229', '#ecb229', '#a8d9fe', '#f5d538']

const Avatar = () => {

    const [stateOptions, setStateValues] = useState(tabs);
    const [currentSelected, setCurrentSelected] = useState('COLOUR');
    const [currentSelectedColour, setCurrentSelectedColour] = useState(0);
    const [currentSelectedHair, setCurrentSelectedHair] = useState(0);
    const [currentSelectedEyes, setCurrentSelectedEyes] = useState(0);
    const [currentSelectedMouth, setCurrentSelectedMouth] = useState(0);


    const [colourAvtar, setColourAvtar] = useState([]);
    const [hairAvtar, setHairAvtar] = useState([]);
    const [eyesAvtar, setEyesAvtar] = useState([]);
    const [mouthAvtar, setMouthAvtar] = useState([]);
    const [clothsAvtar, setClothsAvtar] = useState([]);

    const [colourId, setColourId] = useState('');
    const [hairId, setHairId] = useState('');
    const [eyesId, setEyesId] = useState('');
    const [mouthId, setMouthId] = useState('');
    const [clothsId, setClothsId] = useState('');

    const [allAvtarData, setAllAvtarData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    useEffect(() => {

        console.log('-----User------', User)

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

            setAllAvtarData(res.data)

            res.data.forEach(element => {

                if (element.Type === 'colour') {
                    let colour = [];
                    colour = element.imglist
                    colour.map((data, index) => {
                        if (User.user.AvatarIdList) {

                            if (data._id == User.user.AvatarIdList[0].AvatarId) {
                                setCurrentSelectedColour(index)
                                data['isSelected'] = true
                                setColourId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }

                        }
                        else {
                            if (index === 0) {
                                data['isSelected'] = true
                                setColourId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                    })
                    setColourAvtar(colour)


                }
                else if (element.Type === 'hair') {
                    let hair = [];
                    hair = element.imglist
                    hair.map((data, index) => {
                        if (User.user.AvatarIdList) {
                            if (data._id === User.user.AvatarIdList[1].AvatarId) {
                                setCurrentSelectedHair(index)
                                data['isSelected'] = true
                                setHairId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                        else {
                            if (index === 0) {
                                data['isSelected'] = true
                                setHairId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                    })
                    setHairAvtar(hair)

                }
                else if (element.Type === 'eyes') {
                    let eyes = [];
                    eyes = element.imglist
                    eyes.map((data, index) => {
                        if (User.user.AvatarIdList) {
                            if (data._id === User.user.AvatarIdList[2].AvatarId) {
                                setCurrentSelectedEyes(index)
                                data['isSelected'] = true
                                setEyesId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                        else {
                            if (index === 0) {
                                data['isSelected'] = true
                                setEyesId(data._id)

                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                    })
                    setEyesAvtar(eyes)

                    //     if (User.user.AvatarIdList.length) {
                    //     let newArr = [...eyesAvtar];
                    //     newArr.map((item) => {
                    //         item.isSelected = false;
                    //     })




                    //     element.imglist.map((item, dataIndex) => {
                    //         if (item._id === User.user.AvatarIdList[2].AvatarId) {
                    //             setCurrentSelectedEyes(dataIndex)
                    //             newArr[dataIndex].isSelected = true;
                    //             setEyesAvtar(newArr)
                    //         }
                    //     })
                    // }
                }
                else if (element.Type === 'mouth') {
                    let mouth = [];
                    mouth = element.imglist
                    mouth.map((data, index) => {
                        if (User.user.AvatarIdList) {
                            if (data._id === User.user.AvatarIdList[3].AvatarId) {
                                setCurrentSelectedMouth(index)
                                data['isSelected'] = true
                                setMouthId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                        else {
                            if (index === 0) {
                                data['isSelected'] = true
                                setMouthId(data._id)
                            }
                            else {
                                data['isSelected'] = false
                            }
                        }
                    })
                    setMouthAvtar(mouth)

                }
                else if (element.Type === 'clothes') {
                    let clothes = [];
                    clothes = element.imglist
                    clothes.map((data, index) => {
                        if (index === 0) {
                            data['isSelected'] = true
                            setClothsId(data._id)
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
        console.log('currentSelected', currentSelected)
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
            allAvtarData.map((item) => {
                if (item.Type === "colour") {
                    setColourId(item.imglist[index]._id)
                }
            })
        }
        else if (currentSelected === 'HAIR') {
            let newArr = [...hairAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedHair(index)
            setHairAvtar(newArr);

            allAvtarData.map((item) => {
                if (item.Type === "hair") {
                    setHairId(item.imglist[index]._id)
                }
            })
        }
        else if (currentSelected === 'EYES') {
            let newArr = [...eyesAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedEyes(index)
            setEyesAvtar(newArr)

            allAvtarData.map((item) => {
                if (item.Type === "eyes") {
                    setEyesId(item.imglist[index]._id)
                }
            })
        }
        else if (currentSelected === 'MOUTH') {
            let newArr = [...mouthAvtar];
            newArr.map((item) => {
                item.isSelected = false;
            })
            newArr[index].isSelected = true;
            setCurrentSelectedMouth(index)
            setMouthAvtar(newArr)

            allAvtarData.map((item) => {
                if (item.Type === "mouth") {
                    setMouthId(item.imglist[index]._id)
                }
            })
        }
        else {
            return clothsAvtar
        }




    }

    const saveMyAvtar = () => {
        setTimeout(() => {
            console.log('colour', colourId)
            console.log('hair', hairId)
            console.log('eyes', eyesId)
            console.log('mouth', mouthId)



            let avatarIdListArray = []
            let colourApiId = { "AvatarId": colourId }
            let hairApiId = { "AvatarId": hairId }
            let eyesApiId = { "AvatarId": eyesId }
            let cmouthApiId = { "AvatarId": mouthId }
            avatarIdListArray.push(colourApiId, hairApiId, eyesApiId, cmouthApiId)


            console.log('avatarIdList', avatarIdListArray)

            let data =
            {
                AvatarIdList: avatarIdListArray
            }

            Service.post(data, `${EndPoints.UpdateAvtar}/${User.user.UserDetialId}`, (res) => {
                console.log('-----------api response------------', res)
            }, (err) => {
                console.log('response of get all lesson error', err)
            })

        }, 2000)

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
                            <Text style={Styles.headText}>{bronze + silver + gold} points</Text>
                        </View>
                        <View style={Styles.rewardStarMark}>
                            <View style={Styles.centerStar}>
                                <BronzeStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{bronze}</Text>
                                <Text style={Styles.starText}>Bronze stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                <SilverStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{silver}</Text>
                                <Text style={Styles.starText}>Silver stars</Text>
                            </View>
                            <View style={Styles.centerStar}>
                                <GoldStar width={hp(6)} height={hp(6)} />
                                <Text style={Styles.starSelectedText}>{gold}</Text>
                                <Text style={Styles.starText}>Gold stars</Text>
                            </View>
                        </View>
                    </View>
                    {isLoading == false ?
                        <View style={{ alignItems: "center", justifyContent: "center", paddingTop: hp(5), height: hp(60) }} >
                            {/* Avatar editing View */}
                            {currentSelectedHair == 0 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(5.2), zIndex: 10, left: hp(9.5) }} ></Image>
                                : null}
                            {currentSelectedHair == 1 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(20), height: hp(20), resizeMode: 'contain', position: 'absolute', top: hp(0), zIndex: 10 }} ></Image>
                                : null}
                            {currentSelectedHair == 2 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(15), height: hp(15), resizeMode: 'contain', position: 'absolute', top: hp(4.8), zIndex: 10, right: hp(13) }} ></Image>
                                : null}
                            {currentSelectedHair == 3 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(1.3), zIndex: 10, }} ></Image>
                                : null}
                            {currentSelectedHair == 4 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(1.3), zIndex: 10, }} ></Image>
                                : null}
                            {currentSelectedHair == 5 ?
                                <Image source={{ uri: baseUrl + hairAvtar[currentSelectedHair].Images }} style={{ width: hp(24), height: hp(24), resizeMode: 'contain', position: 'absolute', top: hp(-4), zIndex: 10, }} ></Image>
                                : null}
                            <Image source={{ uri: baseUrl + [colourAvtar[currentSelectedColour].Images] }} style={{ width: hp(25), height: hp(50), resizeMode: 'contain', position: 'absolute', }} ></Image>
                            <Image source={{ uri: baseUrl + eyesAvtar[currentSelectedEyes].Images }} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(13), zIndex: 20 }} ></Image>
                            <Image source={{ uri: baseUrl + mouthAvtar[currentSelectedMouth].Images }} style={{ width: hp(10), height: hp(10), resizeMode: 'contain', position: 'absolute', top: hp(20), zIndex: 20 }} ></Image>
                        </View> : null}
                </View>

                {/* Right View */}
                <View style={Styles.rightView}>
                    <View style={Styles.borderView}>
                        {/* Tabs */}
                        {isLoading == false ?
                            <View style={Styles.tabView}>
                                {
                                    stateOptions.map((item, index) => {
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
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => onPressAvtarParts(index)} style={[Styles.itemBtn, { backgroundColor: backgroundColorArray[index], borderColor: COLORS.black, borderWidth: item.isSelected ? 2 : 0 }]}>
                                            <Image source={{ uri: baseUrl + item.Images }} style={{ width: hp(10), height: hp(10), resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    )
                                }}
                                numColumns={3}
                            /> : null}

                        {isLoading == false ?
                            <TouchableOpacity style={{ width: wp(13), height: hp(6), backgroundColor: COLORS.dashboardGreenButton, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }} onPress={() => saveMyAvtar()} >
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: hp(1.56),
                                    textTransform: 'uppercase',
                                    fontFamily: FONTS.fontBold,
                                }} >SAVE AVATAR</Text>
                            </TouchableOpacity> : null}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Avatar
