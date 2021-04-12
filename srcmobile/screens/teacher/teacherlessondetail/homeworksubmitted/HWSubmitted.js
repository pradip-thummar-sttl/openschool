import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import Images from '../../../../utils/Images';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';
import CheckBox from '@react-native-community/checkbox';
import ToggleSwitch from 'toggle-switch-react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { opacity } from "../../../../utils/Constant";

const Pupillist = (props, { style }) => (
    <View style={[PAGESTYLE.pupilData]}>
        <View style={PAGESTYLE.mobilePupilProfile}>
            <View style={PAGESTYLE.thumbAlign}>
                <View style={PAGESTYLE.userStamp}></View>
                <View>
                    <Text style={[PAGESTYLE.pupilName, PAGESTYLE.userStampName]}>Reuel Pardesi</Text>
                    <Text style={PAGESTYLE.groupName}>Group 1A</Text>
                </View>
            </View>
            <View>
                <Text style={PAGESTYLE.dateLesson}>14/09/2020</Text>
            </View>
        </View>
        <View style={STYLE.hrCommon}></View>
        <View style={PAGESTYLE.rowLine}>
            <View style={PAGESTYLE.checkMarkedText}>
                <Image style={PAGESTYLE.tickIcon} source={Images.CheckIcon} />
                <Text style={PAGESTYLE.tickText}>Submitted</Text>
            </View>
            <View style={PAGESTYLE.checkMarkedText}>
                <Image style={PAGESTYLE.tickIcon} source={Images.CheckIconGrey} />
                <Text style={PAGESTYLE.tickText}>Marked</Text>
            </View>
            <View>
            <TouchableOpacity
                style={PAGESTYLE.pupilDetailLink}
                activeOpacity={opacity}
                onPress={() => props.navigateToDetail()}>
                <Image style={PAGESTYLE.pupilDetaillinkIcon} source={Images.DashboardRightArrow} />
            </TouchableOpacity>
            </View>
        </View>
    </View>
);

const TLHomeWorkSubmitted = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? COLORS.selectedDashboard : COLORS.white;
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };
    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                navigateToDetail={() => props.navigateToDetail()}
            />
        );
    };
    return (

        <View style={PAGESTYLE.plainBg}>
            {/* <View style={PAGESTYLE.pupilTable}>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.firstColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Pupil name</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Class Group</Text>
                </View>
                <View style={PAGESTYLE.pupilTableHeadingMain}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Submitted</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.secoundColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Submission date</Text>
                </View>
                <View style={[PAGESTYLE.pupilTableHeadingMain, PAGESTYLE.lastColumn]}>
                    <Text style={PAGESTYLE.pupilTableHeadingMainTitle}>Marked</Text>
                </View>
            </View> */}
            <View style={PAGESTYLE.pupilTabledata}>
                <SafeAreaView style={PAGESTYLE.pupilTabledataflatlist}>
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={pupilRender}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </View>
        </View>

    );
}
export default TLHomeWorkSubmitted;