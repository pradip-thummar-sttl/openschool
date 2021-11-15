import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Animated, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { baseUrl, opacity } from "../../../../utils/Constant";
import Users from "../../../screens/users/Users";
import { User } from "../../../../utils/Model";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ic_Dashboard from "../../../../svg/sidebar/Ic_Dashboard";
import Ic_calendar from "../../../../svg/sidebar/Ic_calendar";
import Ic_LessonPlanner from "../../../../svg/sidebar/Ic_LessonPlanner";
import Ic_PupilManagement from "../../../../svg/sidebar/Ic_PupilManagement";
import Ic_parents from "../../../../svg/sidebar/Ic_parents";
import Ic_Faq from "../../../../svg/sidebar/Ic_Faq";
import Logout from "../../../../svg/sidebar/Logout";
import More from "../../../../svg/teacher/dashboard/More";
import Ic_Dashboard from "../../../../svg/sidebar/Ic_Dashboard";
import MyEdLogo from "../../../../svg/applogo/MyEdLogo";
import Teachers from "../../../../svg/sidebar/Teachers";
import Pupils from "../../../../svg/sidebar/Pupils";
import Messaging from "../../../../svg/sidebar/Messaging";


const SidebarSchool = (props) => {
    const [isSmall, action] = useState(true);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(hp(9.50)));
    // const [moduleIndex, setSelectedIndex] = useState(0);
    // const isHide = () => {
    //     action(!isSmall)
    //     props.hide();
    // }

    console.log('props', props);

    toggleAnimation = (flag) => {

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

    const navigateSidebarIndex = (index) => {
        props.navigateToTeachers()
        // setSelectedIndex(1);
    }

    const showActionChooser = () => {
        Alert.alert(
            '',
            'Do you really want to logout?',
            [{
                text: 'YES',
                onPress: () => teacherLogout(),
            },
            {
                text: 'NO',
                onPress: () => { },
            },
            ],
            { cancelable: true }
        )
    }

    const teacherLogout = () => {
        AsyncStorage.setItem('user', JSON.stringify(null))
        AsyncStorage.setItem('type', "")
        props.navigateUser()

    }

    console.log('module index', props.moduleIndex)
    return (
        <View style={styles.sidebarHeader}>
            <Animated.View style={[styles.sideBarAside, animatedStyle]}>
                <TouchableOpacity onPress={() => toggleAnimation()} style={styles.userInfo}>
                    {/* <Image style={styles.headerProfile} source={Images.proffileLogo} /> */}
                   <MyEdLogo style={styles.headerProfile} height={hp(5.20)} width={hp(5.20)} />
                    {
                        isSmall ? null :
                            <View style={styles.profileTextMain}>
                                {/* <Text numberOfLines={1} style={styles.profileTitle}>{User.user.FirstName} {User.user.LastName}</Text>
                                <Text numberOfLines={1} style={styles.profileDesi}>{User.user.UserType}</Text> */}
                                <Text numberOfLines={1} style={styles.profileTitle}>MYED Open School</Text>
                            </View>
                    }
                </TouchableOpacity>
                <View style={styles.mainMenu}>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 0 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToDashboard(); toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Dashboard}
                        /> */}
                        <Ic_Dashboard style={styles.menuIcon} width={hp(3.38)} height={hp(3.25)} />
                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 1 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToTeachers(); toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Teacher}
                        /> */}
                        <Teachers style={styles.menuIcon} width={hp(3.38)} height={hp(3.125)} />
                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 1 ? styles.selectedMenuText : null]}>Teachers</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 2 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToPupils(); toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Pupil}
                        /> */}
                        <Pupils style={styles.menuIcon} width={hp(3.20)} height={hp(3.390)} />

                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 2 ? styles.selectedMenuText : null]}>Pupils</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 3 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToMessaging(); toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Messaging}
                        /> */}
                        <Messaging style={styles.menuIcon} width={hp(3.52)} height={hp(2.78)} />

                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 3 ? styles.selectedMenuText : null]}>Messaging</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 4 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToParents(); toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Parents}
                        /> */}
                        <Ic_parents style={styles.menuIcon} width={hp(3.20)} height={hp(3.26)} />

                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 4 ? styles.selectedMenuText : null]}>Parents</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 5 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.Faqs}
                        />
                         */}
                        <Ic_Faq style={styles.menuIcon} width={hp(3.20)} height={hp(3.20)} />

                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 5 ? styles.selectedMenuText : null]}>FAQ</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuItem, props.moduleIndex == 6 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { showActionChooser(), toggleAnimation(true) }}>
                        {/* <Image
                            style={styles.menuIcon}
                            source={Images.logout}
                        /> */}
                        <Logout style={styles.menuIcon} width={hp(3.25)} height={hp(3.25)} />

                        {
                            isSmall ? null :
                                <Text style={[styles.menuText, props.moduleIndex == 6 ? styles.selectedMenuText : null]}>Logout</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={[styles.userInfobottomMain]}>
                    <TouchableOpacity
                        style={[styles.userInfobottom, props.moduleIndex == 7 ? styles.menuItemSelected : null]}
                        activeOpacity={opacity}
                        onPress={() => { props.navigateToSettings(); toggleAnimation(true) }}>
                            <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                            {
                                isSmall ? null :
                                    <>
                                        <View style={styles.profileTextMain}>
                                            <Text numberOfLines={1} style={styles.profileTitleBottom}>{User.user.FirstName} {User.user.LastName}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.moreMenu}>
                                            {/* <Image style={styles.moreIcon} source={Images.SidebarMore} /> */}
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
export default SidebarSchool;

const styles = StyleSheet.create({
    sidebarHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.SidebarHeaderBack,
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
        paddingBottom: hp(2.0),
        paddingLeft: hp(1.1),
        // alignSelf:'center'
    },
    profileTextMain: {
        paddingLeft: hp(1.5),
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
        paddingLeft: hp(2.2),
        paddingTop: hp(2.2),
        paddingRight: hp(2.0),
        paddingBottom: hp(2.2),
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
    },
    headerProfile: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: hp(100),
    },
    userInfobottomMain: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        paddingHorizontal: hp(1.35),
        borderColor: COLORS.bottomProfileLightBorder,
        borderWidth: 1,
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        width: '100%',
    },
    userInfobottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomUser: {
        width: hp(4.16),
        height: hp(4.16),
        // resizeMode: 'contain',
        borderRadius: hp(4.16),
    },
    profileTitleBottom: {
        fontSize: hp(2.0),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontSemiBold,
    },
    menuIcon: {
        // width: hp(3.25),
        // height: hp(3.25)
    },
    moreIcon: {
        width: hp(3),
        resizeMode: 'contain',
    },
    moreMenu: {
        // position: 'absolute',
        marginLeft: hp(4),
        right: 0,
    },
});