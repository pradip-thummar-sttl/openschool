import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';

const Introduction1 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <Text style={styles.text}>ZERO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontSize: 18,
    }
});

export default Introduction1;