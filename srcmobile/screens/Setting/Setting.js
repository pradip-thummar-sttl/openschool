import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FONTS from "../../utils/Fonts";
import COLORS from "../../utils/Colors";
import ToggleSwitch from 'toggle-switch-react-native';
import SettingHeader from "../../component/reusable/header/SettingHeader";
import STYLES from "../../utils/Style";
const Setting = (props) => {
    const [isSwitch, setSwitch] = useState(true)
    const switchOnOff = (isOn) => {
        setSwitch(isOn)
    }
    return (
        <View style={styles.mainPage}>
            <SettingHeader onAlertPress={() => { props.navigation.openDrawer() }} STYLE={STYLES.pupilHeader} />

            {/* First part */}
            <View style={styles.headingTextView}>
                <Text style={styles.mainTitle}>Notifications</Text>
                {/* <View style={styles.headLineView} /> */}
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
            <View style={[styles.headingTextView, { marginTop: hp(15) }]}>
                <Text style={styles.mainTitle}>Accessibility</Text>
                {/* <View style={styles.headLineView} /> */}
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
        paddingLeft: hp(1.95),
        alignItems: 'center',
        height: hp(7),
    },
    mainTitle: {
        fontSize: hp(2.50),
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
    }
})