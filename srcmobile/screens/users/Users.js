import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import Images from '../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { opacity } from '../../utils/Constant';

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
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => this.props.navigation.navigate('Login', { userType: "School" })}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.UserIcon} />
                                    <Text style={styles.text}>School</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => this.props.navigation.navigate('Login', { userType: "Teacher" })}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.UserIcon} />
                                    <Text style={styles.text}>Teacher</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => this.props.navigation.navigate('Login', { userType: "Pupil" })}>
                                <View style={styles.user}>
                                    <Image
                                        style={styles.userIcon}
                                        source={Images.UserIcon} />
                                    <Text style={styles.text}>Pupil</Text>
                                </View>
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
        fontSize: hp(2.2),
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
    },
    titleText: {
        color: COLORS.white,
        fontSize: hp(2.3),
        fontFamily: FONTS.fontSemiBold,
        alignSelf: 'center',
        marginBottom: hp(0),
        marginTop: hp(6),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: hp(3.5),
    },
    user: {
        width: hp(22.13),
        justifyContent: "center",
        textAlign: 'center',
        marginBottom: hp(3),
    },
    userIcon: {
        width: hp(20),
        height: hp(20),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(2),
    },
});