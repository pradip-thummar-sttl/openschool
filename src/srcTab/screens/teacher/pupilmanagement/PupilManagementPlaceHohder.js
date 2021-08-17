import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import Images from "../../../../utils/Images";
import { User } from "../../../../utils/Model";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from './Style';
import Sidebar from "../../../component/reusable/sidebar/Sidebar";

const PupilManagement = () => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <View style={PAGESTYLE.mainPage}>
            <Sidebar hide={() => action(!isHide)} />
            <View style={{ width: isHide ? '93%' : '78%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={PAGESTYLE.whiteBg}>
                        <View style={PAGESTYLE.managementBlankImgWrap}>
                            <Image style={PAGESTYLE.blankPageImage} source={Images.managementBlankImg} />
                            <Text style={PAGESTYLE.blankManageTextBold}>There doesn’t seem to be any pupils here</Text>
                            <Text style={PAGESTYLE.blankManageTextNormal}>Start adding pupils to invite them to join the school</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default PupilManagement;