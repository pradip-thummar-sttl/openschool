import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';

const Introduction2 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <Text style={styles.text}>ONE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontSize: 18,
    }
});

export default Introduction2;