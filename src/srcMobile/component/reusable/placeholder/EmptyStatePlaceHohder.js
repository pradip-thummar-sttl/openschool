import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PAGESTYLE from './Style';
import Images from "../../../../utils/Images";

const EmptyStatePlaceHohder = (props) => {
    console.log('props.image', props.title1);

    return (
        <View style={PAGESTYLE.managementBlankImgWrap}>
            <Image style={PAGESTYLE.blankPageImage} source={props.image} />
            <Text style={PAGESTYLE.blankManageTextBold}>{props.title1}</Text>
            <Text P style={PAGESTYLE.nodataContent}>{props.title2}</Text>
        </View>
    );
}
export default EmptyStatePlaceHohder;