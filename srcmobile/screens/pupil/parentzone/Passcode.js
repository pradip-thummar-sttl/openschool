import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { EndPoints } from '../../../service/EndPoints';
import { Service } from '../../../service/Service';
import { showMessage, showMessageWithCallBack } from '../../../utils/Constant';
import MESSAGE from '../../../utils/Messages';
import { User } from '../../../utils/Model';
import Images from '../../../utils/Images';
import Styles from './StylePassCode';


const Passcode = (props) => {
    const [t1, setT1] = useState("")
    const [t2, setT2] = useState("")
    const [t3, setT3] = useState("")
    const [t4, setT4] = useState("")

    const [pin, setPin] = useState(User.user.PinPassword)
    const [createdPin, setCreatedPin] = useState('')
    const [reEnteredPin, setReEnteredPin] = useState('')
    const [isConfirmation, setConfirmation] = useState(false)

    useEffect(() => {
        if (createdPin.length == 4) {
            if (!pin) {
                setConfirmation(true)
                setT1('')
                setT2('')
                setT3('')
                setT4('')
            } else {
                if (pin == createdPin) {
                    props.navigation.replace('ParentZonemain')
                } else {
                    showMessageWithCallBack(MESSAGE.validCode, () => {
                        setT1('')
                        setT2('')
                        setT3('')
                        setT4('')
                        setCreatedPin('')
                    })
                }
            }
        }
    }, [createdPin])

    useEffect(() => {
        if (reEnteredPin.length == 4) {
            if (isConfirmation) {
                if (reEnteredPin == createdPin) {
                    console.log('PIN CONFIRMED');
                    savePin()
                } else {
                    showMessage(MESSAGE.codeMismatched)
                    setConfirmation(false)
                    setCreatedPin('')
                    setReEnteredPin('')
                    setT1('')
                    setT2('')
                    setT3('')
                    setT4('')
                }
            }
        }
    }, [reEnteredPin])

    const onSelectNumber = (number, index) => {
        console.log(number, index);
        if (index == 9) {

        } else if (index == 11) {
            if (t4 !== "") {
                setT4("")
                isConfirmation ? reEnteredPin(parseInt(reEnteredPin / 10)) : setCreatedPin(parseInt(createdPin / 10))
            } else if (t3 !== "") {
                setT3("")
                isConfirmation ? reEnteredPin(parseInt(reEnteredPin / 10)) : setCreatedPin(parseInt(createdPin / 10))
            } else if (t2 !== "") {
                setT2("")
                isConfirmation ? reEnteredPin(parseInt(reEnteredPin / 10)) : setCreatedPin(parseInt(createdPin / 10))
            } else if (t1 !== "") {
                setT1("")
                isConfirmation ? setReEnteredPin('') : setCreatedPin('')
            }
        } else {
            if (t1 === "") {
                setT1(number)
                isConfirmation ? setReEnteredPin(number) : setCreatedPin(number)
            } else if (t2 === "") {
                setT2(number)
                isConfirmation ? setReEnteredPin(reEnteredPin + '' + number) : setCreatedPin(createdPin + '' + number)
            } else if (t3 === "") {
                setT3(number)
                isConfirmation ? setReEnteredPin(reEnteredPin + '' + number) : setCreatedPin(createdPin + '' + number)
            } else if (t4 === "") {
                setT4(number)
                isConfirmation ? setReEnteredPin(reEnteredPin + '' + number) : setCreatedPin(createdPin + '' + number)
            }
        }
    }

    const savePin = () => {

        let data = {
            MobileNumber: User.user.MobileNumber,
            PinPassword: createdPin
        }

        Service.post(data, `${EndPoints.SetPin}`, (res) => {
            if (res.code == 200) {
                showMessageWithCallBack(MESSAGE.setCode, () => {
                    props.navigation.replace('ParentZonemain')
                })
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('response of get all lesson error', err)
        })
    }

    console.log('t1,t2,t3,t4', createdPin, reEnteredPin, pin)

    return (
        <View style={Styles.mainView}>
            <Text style={Styles.EnterCodeText}>Enter your code</Text>
            <View style={Styles.codeView}>
                <View style={Styles.input}>
                    <Text style={Styles.text}>{t1}</Text>
                </View>

                <View style={Styles.input}>
                    <Text style={Styles.text}>{t2}</Text>
                </View>

                <View style={Styles.input}>
                    <Text style={Styles.text}>{t3}</Text>
                </View>

                <View style={Styles.input}>
                    <Text style={Styles.text}>{t4}</Text>
                </View>


            </View>
            <View style={Styles.numberView}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, "FORGOT?", 0, "REMOVE"].map((item, index) => {
                        return (
                            index == 9 ?
                                <TouchableOpacity onPress={() => onSelectNumber(item, index)} style={Styles.withoutRoundButton}>
                                    <Text style={Styles.withoutnumberText}>{item} </Text>
                                </TouchableOpacity>
                                : index == 11 ?
                                    <TouchableOpacity onPress={() => onSelectNumber(item, index)} style={Styles.withoutRoundButton}>
                                        <Text style={Styles.withoutnumberText}><Image style={Styles.backSpaceArrow} source={Images.backSpaceArrow}></Image></Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={Styles.roundButtonMain}>
                                        <TouchableOpacity onPress={() => onSelectNumber(item, index)} style={Styles.roundButton}>
                                            <Text style={Styles.numberText}>{item}</Text>
                                        </TouchableOpacity>
                                    </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Passcode;
