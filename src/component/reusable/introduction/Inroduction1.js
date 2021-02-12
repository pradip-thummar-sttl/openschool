import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';

const Introduction1 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Teach</Text>
               <Text p style={styles.introContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{"\n"}{"\n"}Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,{"\n"}{"\n"} when an unknown printer took a galley of type and scrambled it to make a type specimen book. {"\n"}{"\n"}It has survived not only five centuries.
               </Text>
           </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lefContent:{
        width: '40%',
        top: 330,
        left: 70,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    introTitle: {
        color:COLORS.white,
        fontSize: 50,
        marginBottom:30,
        fontWeight: '600',
    },
    introContent: {
        fontSize: 25,
        color: COLORS.white,
        lineHeight:35,
    },
});

export default Introduction1;