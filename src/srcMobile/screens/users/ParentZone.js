import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../../utils/Colors';
import FONTS from '../../../utils/Fonts';
// import Images from '../../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { opacity } from '../../../utils/Constant';

export default class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <View style={styles.container}>
                {/* <Image source={Images.parentZone} style={styles.image}></Image> */}
                <View>
                    <Text style={styles.titleText}>Who will be learning today?</Text>
                    <View style={styles.userMain}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.props.navigation.navigate('ParentZonemain')}>
                            <View style={styles.user}>
                                <Text style={styles.text}>Reuel Pardesi</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}>
                            <View style={styles.user}>
                                <Text style={styles.text}>Elysian Pardesi</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={opacity}>
                            <View style={styles.user}>
                                <Text style={styles.text}>Add new user</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.parentZone}>
                        <TouchableOpacity style={styles.parentZoneClick}>
                            {/* <Image source={Images.parentZoneIcon} style={styles.parentIcon}></Image> */}
                            <Text style={styles.titleParent}>Parent Zone</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    text: {
        color: COLORS.darkGrayIntro,
        fontSize: hp(1.8),
        alignSelf: 'center',
        fontFamily: FONTS.fontRegular,
    },
    titleText: {
        color: COLORS.darkGrayIntro,
        fontSize: hp(2.46),
        fontFamily: FONTS.fontBold,
        alignSelf: 'center',
        marginTop: hp(7.3),
    },
    image: {
        resizeMode: "cover",
        width: '100%',
        height: hp(15),
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: hp(4.5),
    },
    user: {
        justifyContent: "center",
        textAlign: 'center',
        marginBottom: hp(2),
    },
    userIcon: {
        width: hp(13.5),
        height: hp(13.5),
        resizeMode: "contain",
        alignSelf: 'center',
        marginBottom: hp(1.5),
        borderRadius: hp(50),
    },
    parentZone: {
        alignSelf: 'flex-start',
        marginLeft: hp(3),
        position: 'absolute',
        bottom: hp(-6),
    },
    parentZoneClick: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    parentIcon: {
        width: hp(3.81),
        height: hp(3.44),
        resizeMode: 'contain',
        marginRight: hp(1.8),
    },
    titleParent: {
        fontSize: hp(1.97),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
    },
});