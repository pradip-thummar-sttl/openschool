import React from "react";
import { View, StyleSheet,Text, Button, Image, ImageBackground, Alert } from "react-native";
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';

const Introduction3 = (props) => {
    return (
        <View style={STYLE.viewBox}>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Anywhere, anytime</Text>
               <Text p style={styles.introContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{"\n"}{"\n"}Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,{"\n"}{"\n"} when an unknown printer took a galley of type and scrambled it to make a type specimen book. {"\n"}{"\n"}It has survived not only five centuries.
               </Text>
           </View>
           <Text style={styles.commonButtonGreen} onPress={() => Alert.alert('Welcome to Open School')} >Get Started</Text>
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
    commonButtonGreen: {
        backgroundColor: '#00A36B',
        color: COLORS.white,
        fontSize: 24,
        fontWeight: '800',
        borderRadius:8,
        overflow: 'hidden',
        textAlign: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        bottom: 131,
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 50,},
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 4,
        textTransform: 'uppercase',
    },
});

export default Introduction3;