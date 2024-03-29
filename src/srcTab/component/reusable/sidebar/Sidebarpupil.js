import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Animated, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { baseUrl } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ic_Dashboard from "../../../../svg/sidebar/Ic_Dashboard";
import Ic_calendar from "../../../../svg/sidebar/Ic_calendar";
import Ic_LessonPlanner from "../../../../svg/sidebar/Ic_LessonPlanner";
import Ic_Achievement from "../../../../svg/sidebar/Ic_Achievement";
import Ic_MyAvatar from "../../../../svg/sidebar/Ic_MyAvatar";
import Logout from "../../../../svg/sidebar/Logout";
import More from "../../../../svg/teacher/dashboard/More";
import Ic_Dashboard from "../../../../svg/sidebar/Ic_Dashboard";
import MyEdLogo from "../../../../svg/applogo/MyEdLogo";
import Ic_Faq from "../../../../svg/sidebar/Ic_Faq";
import Ic_OpenSchool from "../../../../svg/sidebar/Ic_OpenSchool";
import { KeyboardAvoidingView } from "react-native";


const Sidebar = (props) => {
    const [isSmall, action] = useState(true);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(hp(9.50)));
    const toggleAnimation = (flag) => {

        if (flag && isSmall) {
            return
        }

        if (isSmall) {
            Animated.timing(animationValue, {
                toValue: hp(29.29),
                duration: 500
            }).start(() => {
                action(false)
            });
        }
        else {
            Animated.timing(animationValue, {
                toValue: hp(9.375),
                duration: 500
            }).start(() => {
                action(true)
            });
        }
    }

    const animatedStyle = {
        width: animationValue,
    }

    const showActionChooser = () => {
        Alert.alert(
            '',
            'Do you really want to logout?',
            [{
                text: 'YES',
                onPress: () => pupilLogout(),
            },
            {
                text: 'NO',
                onPress: () => { },
            },
            ],
            { cancelable: true }
        )
    }

    const pupilLogout = () => {
        AsyncStorage.setItem('pupil', JSON.stringify(null))
        AsyncStorage.setItem('type', "")
        props.navigateUser();

    }
    return (
        <View style={styles.sidebarHeader}>
                <Animated.View style={[styles.sideBarAside, animatedStyle]}>
                    <TouchableOpacity onPress={() => toggleAnimation()} style={styles.userInfo}>
                        {/* <MyEdLogo style={styles.headerProfile} height={hp(5.20)} width={hp(5.20)} /> */}
                        <Image style={[styles.headerClosed]} source={require("../../../../assets/image/MyEdLogoClosed.png")} />
                        {
                            isSmall ? null :
                            <View style={styles.profileTextMainTop}>
                                    {/* <Text numberOfLines={1} style={styles.profileTitle}>{User.user.FirstName} {User.user.LastName}</Text>
                                <Text numberOfLines={1} style={styles.profileDesi}>{User.user.UserType}</Text> */}
                                    <Image style={styles.headerProfilesidebar} source={require("../../../../assets/image/MyEdOpenSchoolText.png")} />
                                </View>
                        }
                    </TouchableOpacity>
                    <View style={styles.mainMenu}>

                        <TouchableOpacity onPress={() => { props.navigateToDashboard(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 0 ? styles.menuItemSelected : null]}>
                            <Ic_Dashboard style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigateToTimetable(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 1 ? styles.menuItemSelected : null]}>
                            <Ic_calendar style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 1 ? styles.selectedMenuText : null]}>My Calendar</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.onLessonAndHomework(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 2 ? styles.menuItemSelected : null]}>
                            <Ic_LessonPlanner style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 2 ? styles.selectedMenuText : null]}>My Lessons</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.menuItem, props.moduleIndex == 3 ? styles.menuItemSelected : null]}>
                            <Ic_Achievement style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 3 ? styles.selectedMenuText : null]}>My Achievements</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.onAvatar(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 4 ? styles.menuItemSelected : null]}>
                            <Ic_MyAvatar style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 4 ? styles.selectedMenuText : null]}>My Avatar</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.onParentZone(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 5 ? styles.menuItemSelected : null]}>
                            {/* <Ic_Faq style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} /> */}
                            <Ic_OpenSchool style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 5 ? styles.selectedMenuText : null]}>Open School</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { showActionChooser(); toggleAnimation(true) }} style={[styles.menuItem, props.moduleIndex == 6 ? styles.menuItemSelected : null]}>
                            <Logout style={styles.menuIcon} width={hp(3.26)} height={hp(3.26)} />
                            {
                                isSmall ? null :
                                    <Text style={[styles.menuText, props.moduleIndex == 6 ? styles.selectedMenuText : null]}>Logout</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cartoon}>
                        {/* cartoon icon add karvano che */}
                    </View>
                    <View style={styles.userInfobottomMain}>
                        <TouchableOpacity onPress={() => { props.onSetting(); toggleAnimation(true) }} style={styles.userInfobottom}>
                            <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                            {
                                isSmall ? null :
                                    <>
                                        <View style={styles.profileTextMain}>
                                            <Text numberOfLines={1} style={[styles.profileTitleBottom, { width: hp(12) }]}>{User.user.FirstName} {User.user.LastName}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.moreMenu}
                                            onPress={() => props.onSetting()}>
                                            <More style={styles.moreIcon} width={hp(3)} height={5} />
                                        </TouchableOpacity>
                                    </>
                            }
                        </TouchableOpacity>
                    </View>
                </Animated.View>
        </View>
    );
}
export default Sidebar;

const styles = StyleSheet.create({
    sidebarHeader: {
        flexDirection: 'row',
        // backgroundColor: COLORS.SidebarHeaderBack,
        backgroundColor: 'white',
        zIndex: 9,
        position: 'relative',
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.06,
        shadowRadius: 1,
        borderColor: COLORS.bottomProfileLightBorder,
        borderRightWidth: 1,
    },
    userInfobottomMain: {
        alignSelf: 'center',
        paddingHorizontal: hp(1.35),
        width: '100%',
        flex:1
    },
    sideBarAside: {
        backgroundColor: COLORS.white,
        paddingTop: hp(2.0),
        paddingLeft: hp(1.0),
        paddingRight: hp(1.0),
        overflow: 'hidden',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingLeft: hp(1),
        // alignSelf:'center'
    },
    profileTextMain: {
        paddingLeft: hp(1.5),
    },
    headerClosed: {
        // backgroundColor: 'red',
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    profileTitle: {
        fontSize: hp(2.0),
        marginBottom: hp(0.1),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontRegular,
    },
    profileDesi: {
        fontSize: hp(1.6),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontRegular,
    },
    mainMenu: {
        paddingTop: hp(4.5),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(2),
        borderRadius: hp(1.5),
        marginBottom: hp(0.9),
    },
    menuItemSelected: {
        backgroundColor: COLORS.MenuSelectedback,
    },
    selectedMenuText: {
        color: COLORS.darkGray,
    },
    menuText: {
        fontSize: hp(1.8),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        paddingLeft: hp(2),
        width: hp(22),
        height: '100%'
    },
    headerProfile: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: hp(100),
    },
    headerProfilesidebar: {
        width: 140,
        height: 50,
        resizeMode: 'contain',
        // borderRadius: hp(100),
        // backgroundColor : 'red',

    },

    profileTextMainTop: {
        paddingLeft: hp(0.8),
    },
    userInfobottom: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderColor: COLORS.bottomProfileLightBorder,
        borderWidth: 1,
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        paddingHorizontal: hp(1.35),
        marginBottom:5
    },
    bottomUser: {
        width: hp(4.16),
        height: hp(4.16),
        // resizeMode: 'contain',
        borderRadius: hp(4.16),
        backgroundColor: COLORS.borderGrp
    },
    profileTitleBottom: {
        fontSize: hp(1.82),
        color: COLORS.menuLightFonts,
        fontFamily: FONTS.fontSemiBold,
    },
    menuIcon: {
        width: hp(3.5),
        height: hp(3.5),
        resizeMode: 'contain',
    },
    moreIcon: {
        width: 18,
        height: 5,
        resizeMode: 'contain',
    },
    cartoonIcon: {
        width: hp(21.5),
        resizeMode: 'contain',
    },
    cartoon: {
        position: 'absolute',
        bottom: hp(1.5),
        right: hp(-10.5),
    },
    moreMenu: {
        // position: 'absolute',
        marginLeft: hp(4),
        right: 0,
    },
    headerProfile: {
        width: 190,
        height: 50,
        // width: 50,
        // height: 40,
        resizeMode: 'contain',
        // borderRadius: hp(100),
        // backgroundColor : 'red',
        marginHorizontal: 3
    },
});