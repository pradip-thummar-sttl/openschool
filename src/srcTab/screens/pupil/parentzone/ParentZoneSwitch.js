import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, Alert, Platform, Dimensions } from 'react-native';
import COLORS from '../../../../utils/Colors';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl, opacity, showMessage } from '../../../../utils/Constant';
import { color } from 'react-native-reanimated';
import { User } from '../../../../utils/Model';
import MESSAGE from '../../../../utils/Messages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Top from '../../../../svg/userselection/Top'
import AddNewPupil from '../../../../svg/pupil/parentzone/AddNewPupil'
import ParentZone from '../../../../svg/pupil/parentzone/ParentZone'

const windowWidth = Dimensions.get('window').width;

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
            this.showMessage()
        }
    }

    showMessage() {
        if (Platform.OS == 'ios') {
            Alert.alert(MESSAGE.loggedInPupil, null,
                [{
                    text: 'LOGOUT',
                    onPress: () => {
                        AsyncStorage.setItem('pupil', JSON.stringify(null));
                        this.props.navigation.replace('Login', { userType: "Pupil" });
                    },
                }, {
                    text: 'CANCEL',
                    onPress: () => { },
                },],
                { cancelable: true }
            )
        } else {
            Alert.alert(null, MESSAGE.loggedInPupil,
                [{
                    text: 'LOGOUT',
                    onPress: () => {
                        AsyncStorage.setItem('pupil', JSON.stringify(null));
                        this.props.navigation.replace('Login', { userType: "Pupil" });
                    },
                }, {
                    text: 'CANCEL',
                    onPress: () => { },
                },],
                { cancelable: true }
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image style={styles.topBg} source={Images.illuTopBg} /> */}
                <Top style={styles.topBg} width={'100%'}
                    height={hp(17.4)} />
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={styles.titleText}>Who will be learning today?</Text>
                    <View style={styles.userMain}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.props.navigation.replace('PupilRegister')}>
                            <View style={styles.user}>
                                {/* <Image
                                    style={styles.userIcon}
                                    source={Images.parentZoneAdd} /> */}
                                <AddNewPupil style={styles.userIcon} width={hp(20.10)}
                                    height={hp(20.10)} />
                                <Text style={styles.text}>Add new user</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            { }
                            <FlatList
                                data={this.state.childrenList}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={{ maxWidth: windowWidth - hp(31)}}
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
                                horizontal
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 20 }}>
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => this.props.navigation.navigate('Passcode')}>
                            <View style={styles.parentZoneBottom}>
                                {/* <Image source={Images.parentZoneIcon} style={styles.parentZoneIcon} /> */}
                                <ParentZone width={hp(4.03)}
                                    height={hp(3.64)} style={styles.parentZoneIcon} />
                                <Text style={styles.parentLink}>Parent Zone</Text>
                            </View>
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
        color: COLORS.darkGray,
        fontSize: hp(2),
        alignSelf: 'center',
        fontFamily: FONTS.fontSemiBold,
        textAlign: 'center'
    },
    titleText: {
        color: COLORS.darkGray,
        fontSize: hp(2.86),
        fontFamily: FONTS.fontSemiBold,
        alignSelf: 'center',
        marginBottom: hp(3),
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
        height: '100%',
    },
    userMain: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    user: {
        marginLeft: hp(5),
        marginRight: hp(5),
        width: hp(21),
    },
    userIcon: {
        width: hp(20.10),
        height: hp(20.10),
        // resizeMode: "auto",
        alignSelf: 'center',
        marginBottom: hp(2),
        borderRadius: hp(20.10 / 2),
    },
    topBg: {
        width: '100%',
        height: hp(16.77),
        resizeMode: Platform.OS == 'android' ? 'cover' : 'cover',
        position: 'absolute',
        top: hp(-1),
    },
    parentZoneIcon: {
        width: hp(4.03),
        height: hp(3.64),
        resizeMode: "contain",
        marginRight: hp(1.5),
    },
    parentZoneBottom: {
        marginLeft: hp(8),
        flexDirection: 'row',
    },
    parentLink: {
        fontFamily: FONTS.fontSemiBold,
        fontSize: hp(2.08),
        color: COLORS.lightGray,
    }
});