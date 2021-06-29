import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import COLORS from '../../../utils/Colors';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl, opacity, showMessage } from '../../../utils/Constant';
import { User } from '../../../utils/Model';
import MESSAGE from '../../../utils/Messages';

export default class ParentZoneSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childrenList: User.user.ChildrenList
        }
    }

    launchPupil(item) {
        if (User.user._id == item._id) {
            this.props.navigation.replace('PupuilDashboard')
        } else {
            showMessage(MESSAGE.loggedInPupil)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Images.parentZone} style={styles.image}></Image>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>Who will be learning today?</Text>
                    <View style={styles.userMain}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.props.navigation.replace('PupilRegister')}>
                            <View style={styles.user}>
                                <Image
                                    style={styles.userIcon}
                                    source={Images.addUser} />
                                <Text style={styles.text}>Add new user</Text>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            data={this.state.childrenList}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={opacity}
                                    onPress={() => this.launchPupil(item)}>
                                    <View style={styles.user}>
                                        <Image
                                            style={styles.userIcon}
                                            source={{ uri: baseUrl + item.ProfilePicture }} />
                                        <Text style={styles.text}>{item.FirstName} {item.LastName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            //Setting the number of column
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={styles.parentZone}>
                        <TouchableOpacity style={styles.parentZoneClick}
                            onPress={() => this.props.navigation.navigate('Passcode')}>
                            <Image source={Images.parentZoneIcon} style={styles.parentIcon}></Image>
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
        flex: 1,
        marginBottom: 50,
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
        marginLeft: hp(3.5),
        position: 'absolute',
        bottom: hp(3.5),
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