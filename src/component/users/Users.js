import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import Images from '../../utils/Images';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Images.GradientBack} style={styles.image}>
                    <View>
                        <Text style={styles.titleText}>Select the type of user you are</Text>
                        <View style={styles.userMain}>
                            <TouchableOpacity style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.UserIcon} />
                                <Text style={styles.text}>School</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.user} onPress={()=>this.props.navigation.replace('Login')}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.UserIcon} />
                                <Text style={styles.text}>Teacher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.UserIcon} />
                                <Text style={styles.text}>Pupil</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: COLORS.white,
        fontSize: hp(2.86),
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
    },
    titleText: {
        color: COLORS.white,
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        alignSelf: 'center',
        marginBottom: hp(3),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    user: {
        width: hp(22.13),
        justifyContent: "center",
        textAlign: 'center',
        marginLeft: hp(5.5),
        marginRight: hp(5.5),
    },
    userIcon: {
        width: hp(25.0),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(2),
    },
});