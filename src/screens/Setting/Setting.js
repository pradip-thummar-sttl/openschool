import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import SettingHeader from "../../component/reusable/header/SettingHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from "../../utils/Fonts";
import COLORS from "../../utils/Colors";
import ToggleSwitch from 'toggle-switch-react-native';
import { Service } from "../../service/Service";
import { EndPoints } from "../../service/EndPoints";
import { User } from "../../utils/Model";
import { showMessage } from "../../utils/Constant";
const Setting = (props) => {
    const [isSwitch, setSwitch] = useState(true)
    const [typeObject, setTypeObject] = useState([])
    const [settings, setSettings] = useState([])


    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }
    useEffect(() => {
        Service.get(`${EndPoints.UserSetting}/${User.user.UserDetialId}`, (res) => {
            console.log('user setting response', res);
            if (res.flag) {
                setData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('user setting error', err);

        })
    }, [])
    const setData = (data) => {
        var type = []
        var subType = []
        var typeDic = []
        data.forEach(item => {
            if (!type.includes(item.Type)) {
                type.push(item.Type)
            }
        });
        setTypeObject(type)
        var mainArray = []
        type.forEach(obj => {
            var x = []
            data.forEach(element => {
                if (element.Type === obj) {
                    x.push(element)
                }
            });
            console.log('type  of ', x)
            x.forEach(a => {
                if (!subType.includes(a.SubType)) {
                    subType.push(a.SubType)
                }
            });
            var z = []
            subType.forEach(obj => {
                var y = []
                x.forEach(element => {
                    if (element.SubType === obj) {
                        y.push(element)
                    }
                });
                z.push(y)

            });

            // console.log('type  of subType ', z)
            let dict = { data: z, isSelected: false }
            mainArray.push(dict)
        });
        setSettings(mainArray)
        console.log('type  of mainArray ', mainArray)
    }
    return (
        <View style={styles.mainPage}>
            <SettingHeader onAlertPress={() => { props.navigation.openDrawer() }} />


            <View style={[styles.lessonPlanTab, { height: 50 }]}>
                {
                    typeObject.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.tabs}>
                                <Text style={[styles.tabsText, styles.tabsTextSelected]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>



            {/* First part */}
            <View >
            {
                settings.map((item, index) => {
                    return (
                        item.data.map((item1, index1) => {
                            return (
                                <>
                                    <View style={[styles.headingTextView,{height: wp(5),marginTop:wp(2)}]}>
                                        <Text style={styles.mainTitle}>{item1[0].SubType}</Text>
                                        <View style={styles.headLineView} />
                                    </View>
                                    <View style={[styles.headingTextView, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                        {
                                            item1.map((item2, index2) => {
                                                return (
                                                    <View style={styles.listView}>
                                                        <Text style={styles.text}>{item2.Name}</Text>
                                                        <ToggleSwitch
                                                            isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                                                        />
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </>
                            )
                        })

                    )
                })

            }
            </View>
         
        </View>
    );
}
export default Setting;

const styles = StyleSheet.create({
    mainPage: {
        height:'100%',
        width:'100%'
    },
    headingTextView: {
        flexDirection: 'row',
        paddingLeft: hp(3.25),
        alignItems: 'center',
        
    },
    mainTitle: {
        fontSize: hp(2.50),
        fontFamily: FONTS.fontSemiBold,
    },
    headLineView: {
        backgroundColor: COLORS.borderGrp,
        width: hp(70),
        height: 1,
        marginLeft: hp(1),
    },
    listView: {
        width: hp(88),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: wp(5),
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp,
    },
    text: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.89)
    },
    lessonPlanTab: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingTop: hp(1.90),
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp
    },
    tabs: {
        // paddingRight: hp(3.90),
        paddingLeft: hp(3.90)
    },
    tabsText: {
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(1.56),
        textTransform: 'uppercase',
    },
    tabsTextSelected: {
        color: COLORS.buttonGreen,
    },
})