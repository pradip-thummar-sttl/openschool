import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Styles from './Style';

const Passcode = () => {
    const [t1, setT1] = useState("")
    const [t2, setT2] = useState("")
    const [t3, setT3] = useState("")
    const [t4, setT4] = useState("")

    const onSelectNumber = (number, index) => {
        console.log(number, index);
        if (index == 9) {
            
        }else if (index == 11) {
            if (t4!=="") {
                setT4("")
            }else if (t3 !== "") {
                setT3("")
            }else if (t2 !=="") {
                setT2("")
            }else if (t1 !== "") {
                setT1("")
            }
        }else{
            if (t1==="") {
                setT1(number)
            }else if (t2 === "") {
                setT2(number)
            }else if (t3 === "") {
                setT3(number)
            }else if (t4 === "") {
                setT4(number)
            }
        }

        
    }
    console.log('t1,t2,t3,t4', t1,t2,t3,t4)

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
                                        <Text style={Styles.withoutnumberText}>{item} </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => onSelectNumber(item, index)} style={Styles.roundButton}>
                                        <Text style={Styles.numberText}>{item} </Text>
                                    </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Passcode;
