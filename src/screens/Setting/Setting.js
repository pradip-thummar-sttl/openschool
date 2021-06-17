import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import SettingHeader from "../../component/reusable/header/SettingHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from "../../utils/Fonts";
import COLORS from "../../utils/Colors";
import ToggleSwitch from 'toggle-switch-react-native';
const Setting = (props) => {
    const [isSwitch, setSwitch] = useState(true)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }
    return (
        <View style={styles.mainPage}>
            <SettingHeader onAlertPress={() => { props.navigation.openDrawer() }} />

            {/* First part */}
            <View style={styles.headingTextView}>
                <Text style={styles.mainTitle}>Notifications</Text>
                <View style={styles.headLineView} />
            </View>
            <View style={[styles.headingTextView,{flexDirection:'column', alignItems:'flex-start'}]}>
                {
                    [1, 2, 3].map((item, index) => {
                        return (
                            <View style={styles.listView}>
                                <Text style={styles.text}>Upcoming Live Lessons</Text>
                                <ToggleSwitch
                                    isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                                />
                            </View>
                        )
                    })
                }
            </View>
            {/* second part */}
            <View style={[styles.headingTextView, { marginTop: wp(15) }]}>
                <Text style={styles.mainTitle}>Accessibility</Text>
                <View style={styles.headLineView} />
            </View>
            <View style={[styles.headingTextView,{flexDirection:'column', alignItems:'flex-start'}]}>
                {
                    [1, 2, 3].map((item, index) => {
                        return (
                            <View style={styles.listView}>
                                <Text style={styles.text}>Upcoming Live Lessons</Text>
                                <ToggleSwitch
                                    isOn={isSwitch} color={COLORS.dashboardGreenButton} onToggle={isOn => switchOnOff(isOn)}
                                />
                            </View>
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
    },
    headingTextView: {
        flexDirection: 'row',
        paddingLeft: hp(3.25),
        alignItems: 'center',
        height: wp(5),
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
    }
})