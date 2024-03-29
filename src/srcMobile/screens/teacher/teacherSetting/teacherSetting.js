import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity,ToastAndroid, BackHandler, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from "../../../../utils/Fonts";
import COLORS from "../../../../utils/Colors";
import ToggleSwitch from 'toggle-switch-react-native';
import SettingHeader from "../../../component/reusable/header/SettingHeader";
import STYLES from "../../../../utils/Style";
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { BadgeIcon, User } from "../../../../utils/Model";
import { showMessage } from "../../../../utils/Constant";
import { log } from "react-native-reanimated";
const Setting = (props) => {
    const [isSwitch, setSwitch] = useState(true)
    const [typeObject, setTypeObject] = useState([])
    const [settings, setSettings] = useState([])
    const [apiData, setApiData] = useState([])

    let currentCount = 0
    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {

        if (currentCount === 1) {
            BackHandler.exitApp()
            return true;
          }

        if (currentCount < 1) {
            currentCount += 1;
            ToastAndroid.show('Press BACK again to quit the App',ToastAndroid.SHORT)
          }
          setTimeout(() => {
            currentCount = 0;
          }, 2000);
        
        return true;
      }

    useEffect(() => {
        refresh()
    }, [])
    const refresh=()=>{
        Service.get(`${EndPoints.UserSetting}/${User.user.UserDetialId}`, (res) => {
            console.log('user setting response', res);
            if (res.flag) {
                setApiData(res.data)
                setData(res.data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('user setting error', err);

        })
    }
    const setData = (data) => {
        var type = []
        var type1 = []
        var subType = []
        var typeDic = []
        data.forEach(item => {
            if (!type.includes(item.Type)) {
                let o = { name: item.Type, isSelected: false }
                type.push(item.Type)
                type1.push(o)
            }
        });
        setTypeObject(type1)
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
        console.log('type  of mainArray ', mainArray[0].data)
    }
    const switchOnOff = (isOn, index, index1, index2) => {
        var arr = [...settings]
        let settingId = arr[index].data[index1][index2].SettingId

        let itemIndex = apiData.findIndex(el => el.SettingId == settingId);
        apiData[itemIndex] = { ...apiData[itemIndex], Value: isOn };

        let data = { "SettingList": apiData }

        arr[index].data[index1][index2].Value = isOn

        setSettings(arr)
        // // console.log('hello index', arr, arr[index].data[index1][index2])
        // let data = {"SettingList":[arr[index].data[index1][index2]]}
        Service.post(data, `${EndPoints.SaveSetting}/${User.user.UserDetialId}`, (res) => {
            console.log('save setyting response', res);
        }, (err) => {
            console.log('save setyting error', err);
        })
        // setSwitch(isOn)
    }
    const openNotification = () => {
        BadgeIcon.isBadge = false
        props.navigation.navigate('NotificationDrawer',{ onGoBack: () => refresh() })
    }

    return (
        <View style={styles.mainPage}>
            <SettingHeader onAlertPress={() => { props.navigation.openDrawer() }} STYLE={STYLES.pupilHeader} onNotification={()=>openNotification()} />

            <View style={[styles.lessonPlanTab, { height: 50, }]}>
                {
                    typeObject.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.tabs}>
                                <Text style={[styles.tabsText, styles.tabsTextSelected]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>


            <View >
                {
                    settings.map((item, index) => {
                        return (
                            item.data.map((item1, index1) => {
                                return (
                                    <>
                                        <View style={[styles.headingTextView, { height: wp(7), marginTop: hp(2) }]}>
                                            <Text style={styles.mainTitle}>{item1[0].SubType}</Text>
                                            {/* <View style={styles.headLineView} /> */}
                                        </View>
                                        <View style={[styles.headingTextView, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                            {
                                                item1.map((item2, index2) => {
                                                    return (
                                                        <View style={styles.listView}>
                                                            <Text style={styles.text}>{item2.Name}</Text>
                                                            <ToggleSwitch onColor={COLORS.dashboardGreenButton}
                                                                isOn={item2.Value} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn, index, index1, index2)}
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
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headingTextView: {
        flexDirection: 'row',
        paddingLeft: hp(1.95),
        alignItems: 'center',
        // height: hp(7),
    },
    mainTitle: {
        fontSize: hp(2.00),
        fontFamily: FONTS.fontSemiBold,
    },
    headLineView: {
        backgroundColor: COLORS.borderGrp,
        width: wp(70),
        height: 1,
        marginLeft: hp(1),
    },
    listView: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp(7),
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
        // paddingTop: hp(1.90),
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: COLORS.borderGrp
    },
    tabs: {
        // paddingRight: hp(3.90),
        paddingLeft: wp(3.90)
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