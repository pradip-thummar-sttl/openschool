import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Animated } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';

const Sidebar = (props) => {
    const [isSmall, action] = useState(true);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(hp(9.50)));
    // const isHide = () => {
    //     action(!isSmall)
    //     props.hide();
    // }

    toggleAnimation = () => {

        if (isSmall) {
            Animated.timing(animationValue, {
                toValue: hp(29.42),
                duration: 500
            }).start(() => {
                action(false)
            });
        }
        else {
            Animated.timing(animationValue, {
                toValue: hp(9.50),
                duration: 500
            }).start(() => {
                action(true)
            });
        }
    }

    const animatedStyle = {
        width: animationValue,
    }

    return (
        <View style={styles.sidebarHeader}>
            <Animated.View style={[styles.sideBarAside, animatedStyle]}>
                <TouchableOpacity onPress={()=>this.toggleAnimation()} style={styles.userInfo}>
                    <Image style={styles.headerProfile} source={Images.ProfileBack} />
                    {
                        isSmall? null:
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitle}>Johney Depp</Text>
                            <Text style={styles.profileDesi}>Administrator</Text>
                        </View>
                    }
                </TouchableOpacity>
                <View style={styles.mainMenu}>
                    <TouchableOpacity onPress={()=>props.navigateToDashboard()} style={[styles.menuItem, styles.menuItemSelected]}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.Dashboard}
                        />
                        {
                            isSmall? null:
                            <Text style={[styles.menuText, styles.selectedMenuText]}>Dashboard</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigateToTimetable()} style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.Teacher}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>Teachers</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.onLessonAndHomework()} style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.MyLessons}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>My Lessons</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.MyAchievements}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>My Achievements</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.MyAvatar}
                        />
                         {
                            isSmall? null:
                            <Text style={styles.menuText}>My Avatar</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={Images.OpenSchool}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>Open School</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.cartoon}>
                    <Image source={Images.cartoon} style={styles.cartoonIcon} />
                </View>
                <View style={[styles.userInfo, styles.userInfobottom]}>
                    <Image style={styles.bottomUser} source={Images.ProfileBackSideMenu} />
                    {
                        isSmall? null:
                        <>
                            <View style={styles.profileTextMain}>
                                <Text style={styles.profileTitleBottom}>Johney Depp</Text>
                            </View>
                            <TouchableOpacity style={styles.moreMenu}>
                                <Image style={styles.moreIcon} source={Images.SidebarMore} />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </Animated.View>
        </View>
    );
}
export default Sidebar;

const styles = StyleSheet.create({
    sidebarHeader: {
        flexDirection: 'row',
        backgroundColor:COLORS.SidebarHeaderBack,
        zIndex: 9,
        position: 'relative',
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
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
        paddingLeft: hp(1.5),
    },
    profileTextMain: {
        paddingLeft: hp(1.5),
        width: hp(19.53),
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
        width: hp(5.40),
        resizeMode: 'contain',
    },
    userInfobottom: {
        position: 'absolute',
        bottom: hp(1),
        borderWidth: 1,
        left: -1,
        width: hp(29.6),
        borderColor: COLORS.bottomProfileLightBorder,
        paddingTop: hp(1),
        paddingBottom: hp(1),
    },
    bottomUser: {
        width: hp(4.2),
        height: hp(4.2),
    },
    profileTitleBottom: {
        fontSize: hp(2.0),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontSemiBold,
    },
    menuIcon: {
        width: hp(3.5),
        height: hp(3.5),
        resizeMode: 'contain',
    },
    moreIcon: {
        width: hp(3),
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
});