import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Animated } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';
import Images from '../../../utils/Images';
import { baseUrl, opacity } from "../../../utils/Constant";
import { User } from "../../../utils/Model";

const Sidebar = (props) => {
    const [isSmall, action] = useState(true);
    const [selectedModule, setSelectedModule] = useState(0);
    const navigateSidebarIndex = (index) => {
        props.navigateToTimetable()
        setSelectedIndex(1);
    }

    return (
        User.user.UserType == 'Teacher' ?
            <View style={styles.sidebarHeader}>
                <View style={[styles.sideBarAside]}>
                    <TouchableOpacity style={styles.userInfo}>
                        <Image style={styles.headerProfile} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitle}>{User.user.FirstName} {User.user.LastName}</Text>
                            <Text style={styles.profileDesi}>{User.user.UserType}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.mainMenu}>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 0 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherDashboard'); setSelectedModule(0); props.navigation.closeDrawer() }}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Dashboard}
                            />
                            <Text style={[styles.menuText, selectedModule == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 1 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherTimeTable'); setSelectedModule(1); props.navigation.closeDrawer() }}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Teacher}
                            />
                            <Text style={[styles.menuText, selectedModule == 1 ? styles.selectedMenuText : null]}>My Calender</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 2 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherLessonList'); setSelectedModule(2); props.navigation.closeDrawer() }}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Pupil}
                            />
                            <Text style={[styles.menuText, selectedModule == 2 ? styles.selectedMenuText : null]}>Lesson Planner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('PupiloverView',{item:0}); setSelectedModule(3); props.navigation.closeDrawer() }}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Messaging}
                            />
                            <Text style={[styles.menuText, selectedModule == 3 ? styles.selectedMenuText : null]}>Pupil Management</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 4 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('Message'); setSelectedModule(4); props.navigation.closeDrawer() }}>

                            <Image
                                style={styles.menuIcon}
                                source={Images.Parents}
                            />
                            <Text style={[styles.menuText, selectedModule == 4 ? styles.selectedMenuText : null]}>Parents</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 5 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('Setting'); setSelectedModule(5); props.navigation.closeDrawer() }}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Faqs}
                            />
                            <Text style={[styles.menuText, selectedModule == 5 ? styles.selectedMenuText : null]}>FAQ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.userInfo, styles.userInfobottom]}>
                        <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitleBottom}>{User.user.FirstName} {User.user.LastName}</Text>
                        </View>
                        <TouchableOpacity style={styles.moreMenu}>
                            <Image style={styles.moreIcon} source={Images.SidebarMore} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <View style={styles.sidebarHeader}>
                <View style={[styles.sideBarAside]}>
                    <TouchableOpacity style={styles.userInfo}>
                        <Image style={styles.headerProfile} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitle}>{User.user.FirstName} {User.user.LastName}</Text>
                            <Text style={styles.profileDesi}>{User.user.UserType}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.mainMenu}>

                        <TouchableOpacity onPress={() => { props.navigation.replace('PupuilDashboard'); setSelectedModule(0); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 0 ? styles.menuItemSelected : null]}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.Dashboard}
                            />
                            <Text style={[styles.menuText, selectedModule == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.replace('PupilTimetable'); setSelectedModule(1); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 1 ? styles.menuItemSelected : null]}>

                            <Image
                                style={styles.menuIcon}
                                source={Images.Teacher}
                            />
                            <Text style={[styles.menuText, selectedModule == 1 ? styles.selectedMenuText : null]}>My Calendar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.replace('PupilLessonDetail'); setSelectedModule(2); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 2 ? styles.menuItemSelected : null]}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.MyLessons}
                            />
                            <Text style={[styles.menuText, selectedModule == 2 ? styles.selectedMenuText : null]}>My Lessons</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.replace('Setting'); setSelectedModule(3); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.MyAchievements}
                            />
                            <Text style={[styles.menuText, selectedModule == 3 ? styles.selectedMenuText : null]}>My Achievements</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.menuItem, selectedModule == 4 ? styles.menuItemSelected : null]}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.MyAvatar}
                            />
                            <Text style={[styles.menuText, selectedModule == 4 ? styles.selectedMenuText : null]}>My Avatar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.replace('ParentZoneSwitch'); setSelectedModule(3); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 5 ? styles.menuItemSelected : null]}>
                            <Image
                                style={styles.menuIcon}
                                source={Images.OpenSchool}
                            />
                            <Text style={[styles.menuText, selectedModule == 5 ? styles.selectedMenuText : null]}>Open School</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.cartoon}>
                        <Image source={Images.cartoon} style={styles.cartoonIcon} />
                    </View> */}
                    <View style={[styles.userInfo, styles.userInfobottom]}>
                        <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitleBottom}>{User.user.FirstName} {User.user.LastName}</Text>
                        </View>
                        <TouchableOpacity style={styles.moreMenu}>
                            <Image style={styles.moreIcon} source={Images.SidebarMore} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

    );
}
export default Sidebar;

const styles = StyleSheet.create({
    sidebarHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.SidebarHeaderBack,
        zIndex: 9,
        position: 'relative',
        shadowColor: COLORS.SidebarHeaderShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        flex: 1,
        width: '100%',
    },
    sideBarAside: {
        backgroundColor: COLORS.white,
        paddingTop: hp(2.0),
        paddingLeft: hp(1.0),
        paddingRight: hp(1.0),
        overflow: 'hidden',
        width: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(3),
        paddingBottom: hp(2.0),
        paddingLeft: hp(2.5),
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
        paddingTop: hp(2),
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
        fontSize: Platform.OS == 'android' ? hp(1.6) : hp(1.8),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        paddingLeft: hp(2),
        width: hp(22),
    },
    headerProfile: {
        width: hp(5.40),
        height: hp(5.40),
        resizeMode: 'contain',
    },
    userInfobottom: {
        position: 'absolute',
        bottom: hp(6),
        borderWidth: 1,
        left: 0,
        right: 0,
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
        width: hp(3.25),
        height: hp(3.25)
    },
    moreIcon: {
        width: hp(3),
        resizeMode: 'contain',
    },
    moreMenu: {
        position: 'absolute',
        right: hp(3)
    },
});