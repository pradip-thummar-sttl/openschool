import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Animated, Alert, AppState } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import { baseUrl, opacity } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ic_Dashboard from "../../../../src/svg/sidebar/Ic_Dashboard";
import Ic_calendar from "../../../../svg/sidebar/Ic_calendar";
import Ic_LessonPlanner from "../../../../svg/sidebar/Ic_LessonPlanner";
import Ic_PupilManagement from "../../../../svg/sidebar/Ic_PupilManagement";
import Ic_parents from "../../../../svg/sidebar/Ic_parents";
import Ic_Faq from "../../../../svg/sidebar/Ic_Faq";
import Logout from "../../../../svg/sidebar/Logout";
import Ic_Achievement from "../../../../svg/sidebar/Ic_Achievement";
import Ic_MyAvatar from "../../../../svg/sidebar/Ic_MyAvatar";
import More from "../../../../svg/teacher/dashboard/More";
import Ic_Dashboard from "../../../../svg/sidebar/Ic_Dashboard";
import TopLogo from "../../../../svg/common/TopLogo";
import Ic_OpenSchool from "../../../../svg/sidebar/Ic_OpenSchool";
import Teachers from "../../../../svg/sidebar/Teachers";
import Pupils from "../../../../svg/sidebar/Pupils";
import Messaging from "../../../../svg/sidebar/Messaging";



const Sidebar = (props) => {
    const [isSmall, action] = useState(true);
    const [selectedModule, setSelectedModule] = useState(0);
    const [lastLogoutModule, setLastLogoutModule] = useState(0);
    const navigateSidebarIndex = (index) => {
        props.navigateToTimetable()
        setSelectedIndex(1);
    }




    const appState = useRef(AppState.currentState);


    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                console.log("App has come to the foreground!");
            }
            else {
                setSelectedModule(0)
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);



    const showActionChooserTeacher = () => {
        Alert.alert(
            '',
            'Do you really want to logout?',
            [{
                text: 'YES',
                onPress: () => { teacherLogout(), setSelectedModule(0) },
            },
            {
                text: 'NO',
                onPress: () => { },
            },
            ],
            { cancelable: true }
        )
    }

    const showActionChooserPupil = () => {
        Alert.alert(
            '',
            'Do you really want to logout?',
            [{
                text: 'YES',
                onPress: () => { pupilLogout(), setSelectedModule(0) },
            },
            {
                text: 'NO',
                onPress: () => { },
            },
            ],
            { cancelable: true }
        )
    }

    const showActionChooserSchool = () => {
        Alert.alert(
            '',
            'Do you really want to logout?',
            [{
                text: 'YES',
                onPress: () => { schoolLogout(), setSelectedModule(0) },
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
        AsyncStorage.setItem('type', '')
        props.navigation.replace('Users');

    }

    const pupilLogout = () => {
        AsyncStorage.setItem('pupil', JSON.stringify(null))
        AsyncStorage.setItem('type', '')
        props.navigation.replace('Users');

    }
    const schoolLogout = () => {
        AsyncStorage.setItem('school', JSON.stringify(null))
        AsyncStorage.setItem('type', '')
        props.navigation.replace('Users');

    }

    return (
        User.user.UserType == 'Teacher' ?
            <View style={styles.sidebarHeader}>
                <View style={[styles.sideBarAside]}>
                    <TouchableOpacity style={styles.userInfo}>
                        <TopLogo style={styles.headerProfile} width={hp(5.40)} height={hp(5.40)} />
                        {/* <Image style={styles.headerProfile} source={Images.proffileLogo} /> */}
                        <View style={styles.profileTextMain}>
                            {/* <Text numberOfLines={1} style={[styles.profileTitle,{width:wp(55)}]}>{User.user.FirstName} {User.user.LastName}</Text>
                            <Text numberOfLines={1} style={[styles.profileDesi,{width:wp(55)}]}>{User.user.UserType}</Text> */}
                            <Text numberOfLines={1} style={[styles.profileTitle, { width: wp(40) }]}>MYED Open School</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.mainMenu}>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 0 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherDashboard'); setSelectedModule(0); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Dashboard}
                            /> */}
                            <Ic_Dashboard style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 1 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherTimeTable'); setSelectedModule(1); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Teacher}
                            /> */}
                            <Ic_calendar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 1 ? styles.selectedMenuText : null]}>My Calender</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 2 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('TeacherLessonList'); setSelectedModule(2); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Pupil}
                            /> */}
                            <Ic_LessonPlanner style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 2 ? styles.selectedMenuText : null]}>Lesson Planner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('PupiloverView', { item: 0 }); setSelectedModule(3); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Messaging}
                            /> */}
                            <Ic_PupilManagement style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 3 ? styles.selectedMenuText : null]}>Pupil Management</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 4 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('Message'); setSelectedModule(4); props.navigation.closeDrawer() }}>

                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Parents}
                            /> */}
                            <Ic_parents style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 4 ? styles.selectedMenuText : null]}>Parents</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 5 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            onPress={() => { props.navigation.replace('Setting'); setSelectedModule(5); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Faqs}
                            /> */}
                            <Ic_Faq style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 5 ? styles.selectedMenuText : null]}>FAQ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, selectedModule == 6 ? styles.menuItemSelected : null]}
                            activeOpacity={opacity}
                            // onPress={() => { showActionChooserTeacher(); setSelectedModule(6); props.navigation.closeDrawer() }}>
                            onPress={() => { showActionChooserTeacher(); props.navigation.closeDrawer() }}>
                            {/* <Image
                                style={styles.menuIcon}
                                source={Images.Faqs}
                            /> */}
                            <Logout style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                            <Text style={[styles.menuText, selectedModule == 6 ? styles.selectedMenuText : null]}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => { props.navigation.navigate('TeacherSetting'); props.navigation.closeDrawer() }}
                        style={[styles.userInfo, styles.userInfobottom]}>
                        <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                        <View style={styles.profileTextMain}>
                            <Text numberOfLines={1} style={[styles.profileTitleBottom, { width: wp(45) }]}>{User.user.FirstName} {User.user.LastName}</Text>
                        </View>
                        <TouchableOpacity style={styles.moreMenu}>
                            {/* <Image style={styles.moreIcon} source={Images.SidebarMore} /> */}
                            <More style={styles.moreIcon} height={5} width={hp(3)} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
            : User.user.UserType == 'School' ?
                <View style={styles.sidebarHeader}>
                    <View style={[styles.sideBarAside]}>
                        <TouchableOpacity style={styles.userInfo}>
                            <TopLogo style={styles.headerProfile} width={hp(5.40)} height={hp(5.40)} />
                            {/* <Image style={styles.headerProfile} source={Images.proffileLogo} /> */}
                            <View style={styles.profileTextMain}>
                                {/* <Text numberOfLines={1} style={[styles.profileTitle,{width:wp(55)}]}>{User.user.FirstName} {User.user.LastName}</Text>
                            <Text numberOfLines={1} style={[styles.profileDesi,{width:wp(55)}]}>{User.user.UserType}</Text> */}
                                <Text numberOfLines={1} style={[styles.profileTitle, { width: wp(40) }]}>MYED Open School</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.mainMenu}>

                            <TouchableOpacity onPress={() => { props.navigation.replace('SchoolDashBoard'); setSelectedModule(0); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 0 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.Dashboard}
                            /> */}
                                <Ic_Dashboard style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('TeacherManagement'); setSelectedModule(1); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 1 ? styles.menuItemSelected : null]}>

                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.Teacher}
                            /> */}
                                <Teachers style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 1 ? styles.selectedMenuText : null]}>Teacher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('TeacheroverView'); setSelectedModule(2); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 2 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyLessons}
                            /> */}
                                <Pupils style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 2 ? styles.selectedMenuText : null]}>Pupils</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('SchoolMessage'); setSelectedModule(3); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAchievements}
                            /> */}
                                <Messaging style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 3 ? styles.selectedMenuText : null]}>Messaging</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('Avatar'); setSelectedModule(4); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 4 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAvatar}
                            /> */}
                                <Ic_MyAvatar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 4 ? styles.selectedMenuText : null]}>Parents</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('ParentZoneSwitch'); setSelectedModule(5); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 5 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.OpenSchool}
                            />  */}
                                <Ic_OpenSchool style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />

                                {/* <Ic_MyAvatar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} /> */}

                                <Text style={[styles.menuText, selectedModule == 5 ? styles.selectedMenuText : null]}>FAQ</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => { showActionChooserSchool(); setSelectedModule(6); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 6 ? styles.menuItemSelected : null]}> */}
                            <TouchableOpacity onPress={() => { showActionChooserSchool(); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 6 ? styles.menuItemSelected : null]}>

                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAvatar}
                            /> */}
                                <Logout style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 6 ? styles.selectedMenuText : null]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.cartoon}>
                        <Image source={Images.cartoon} style={styles.cartoonIcon} />
                    </View> */}
                        <View style={[styles.userInfo, styles.userInfobottom]}>
                            <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                            <View style={styles.profileTextMain}>
                                <Text numberOfLines={1} style={[styles.profileTitleBottom, { width: wp(45) }]}>{User.user.FirstName} {User.user.LastName}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { props.navigation.replace('SchoolSetting'); setSelectedModule(7); props.navigation.closeDrawer() }} style={styles.moreMenu}>
                                {/* <Image style={styles.moreIcon} source={Images.SidebarMore} /> */}
                                <More style={styles.moreIcon} height={5} width={hp(3)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.sidebarHeader}>
                    <View style={[styles.sideBarAside]}>
                        <TouchableOpacity style={styles.userInfo}>
                            <TopLogo style={styles.headerProfile} width={hp(5.40)} height={hp(5.40)} />
                            {/* <Image style={styles.headerProfile} source={Images.proffileLogo} /> */}
                            <View style={styles.profileTextMain}>
                                {/* <Text numberOfLines={1} style={[styles.profileTitle,{width:wp(55)}]}>{User.user.FirstName} {User.user.LastName}</Text>
                            <Text numberOfLines={1} style={[styles.profileDesi,{width:wp(55)}]}>{User.user.UserType}</Text> */}
                                <Text numberOfLines={1} style={[styles.profileTitle, { width: wp(40) }]}>MYED Open School</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.mainMenu}>

                            <TouchableOpacity onPress={() => { props.navigation.replace('PupuilDashboard'); setSelectedModule(0); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 0 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.Dashboard}
                            /> */}
                                <Ic_Dashboard style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 0 ? styles.selectedMenuText : null]}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('PupilTimetable'); setSelectedModule(1); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 1 ? styles.menuItemSelected : null]}>

                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.Teacher}
                            /> */}
                                <Ic_calendar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 1 ? styles.selectedMenuText : null]}>My Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('PupilLessonDetail'); setSelectedModule(2); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 2 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyLessons}
                            /> */}
                                <Ic_LessonPlanner style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 2 ? styles.selectedMenuText : null]}>My Lessons</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => { props.navigation.replace('Setting'); setSelectedModule(3); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}> */}
                            <TouchableOpacity style={[styles.menuItem, selectedModule == 3 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAchievements}
                            /> */}
                                <Ic_Achievement style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 3 ? styles.selectedMenuText : null]}>My Achievements</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('Avatar'); setSelectedModule(4); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 4 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAvatar}
                            /> */}
                                <Ic_MyAvatar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 4 ? styles.selectedMenuText : null]}>My Avatar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace('ParentZoneSwitch'); setSelectedModule(5); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 5 ? styles.menuItemSelected : null]}>
                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.OpenSchool}
                            />  */}
                                <Ic_OpenSchool style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />

                                {/* <Ic_MyAvatar style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} /> */}

                                <Text style={[styles.menuText, selectedModule == 5 ? styles.selectedMenuText : null]}>Open School</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => { showActionChooserPupil(); setSelectedModule(6); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 6 ? styles.menuItemSelected : null]}> */}
                            <TouchableOpacity onPress={() => { showActionChooserPupil(); props.navigation.closeDrawer() }} style={[styles.menuItem, selectedModule == 6 ? styles.menuItemSelected : null]}>

                                {/* <Image
                                style={styles.menuIcon}
                                source={Images.MyAvatar}
                            /> */}
                                <Logout style={styles.menuIcon} height={hp(3.25)} width={hp(3.25)} />
                                <Text style={[styles.menuText, selectedModule == 6 ? styles.selectedMenuText : null]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.cartoon}>
                        <Image source={Images.cartoon} style={styles.cartoonIcon} />
                    </View> */}
                        <TouchableOpacity onPress={() => { props.navigation.replace('Setting'); setSelectedModule(3); props.navigation.closeDrawer() }} style={[styles.userInfo, styles.userInfobottom]}>
                            <Image style={styles.bottomUser} source={{ uri: baseUrl + User.user.ProfilePicture }} />
                            <View style={styles.profileTextMain}>
                                <Text numberOfLines={1} style={[styles.profileTitleBottom, { width: wp(35) }]}>{User.user.FirstName} {User.user.LastName}</Text>
                            </View>
                            <TouchableOpacity style={styles.moreMenu}>
                                {/* <Image style={styles.moreIcon} source={Images.SidebarMore} /> */}
                                <More style={styles.moreIcon} height={5} width={hp(3)} />
                            </TouchableOpacity>
                        </TouchableOpacity>
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
        paddingLeft: hp(1),
    },
    profileTextMain: {
        paddingLeft: hp(1.5),
        width: hp(19.53),
    },
    profileTitle: {
        fontSize: hp(1.82),
        color: COLORS.lightGray,
        fontFamily: FONTS.fontSemiBold,
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
        borderRadius: hp(100),
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
        borderRadius: hp(4.2 / 2)
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