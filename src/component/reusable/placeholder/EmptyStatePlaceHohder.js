import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PAGESTYLE from './Style';
import Images from "../../../utils/Images";

const EmptyStatePlaceHohder = () => {
    return (
        <View style={PAGESTYLE.managementBlankImgWrap}>
            <Image style={PAGESTYLE.blankPageImage} source={Images.managementBlankImg} />
            <Text style={PAGESTYLE.blankManageTextBold}>There doesn’t seem to be any record here</Text>
        </View>
    );
}
export default EmptyStatePlaceHohder;