import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, ImageBackground } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import FONTS from '../../../utils/Fonts';

const Sidebar = (props) => {
    const [isSmall, action] = useState(true);
    const isHide = () => {
        action(!isSmall)
        props.hide();
    }
    return (
        <View style={styles.sidebarHeader}>
            <View style={[styles.sideBarAside, {width: isSmall? hp(9.50) : hp(29.42)}]}>
                <TouchableOpacity onPress={()=>isHide()} style={styles.userInfo}>
                    <Image style={styles.headerProfile} source={require('../../../assets/images/profileBack.png')} />
                    {
                        isSmall? null:
                        <View style={styles.profileTextMain}>
                            <Text style={styles.profileTitle}>Johney Depp</Text>
                            <Text style={styles.profileDesi}>Administrator</Text>
                        </View>
                    }
                </TouchableOpacity>
                <View style={styles.mainMenu}>
                    <TouchableOpacity style={[styles.menuItem, styles.menuItemSelected]}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/dashboard2.png')}
                        />
                        {
                            isSmall? null:
                            <Text style={[styles.menuText, styles.selectedMenuText]}>Dashboard</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/teachers2.png')}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>Teachers</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/pupils2.png')}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>Pupils</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/messaging.png')}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>Messaging</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/parents2.png')}
                        />
                         {
                            isSmall? null:
                            <Text style={styles.menuText}>Parents</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Image
                            style={styles.menuIcon}
                            source={require('../../../assets/images/faq2.png')}
                        />
                        {
                            isSmall? null:
                            <Text style={styles.menuText}>FAQ</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={[styles.userInfo, styles.userInfobottom]}>
                    <Image style={styles.bottomUser} source={require('../../../assets/images/profileBack.png')} />
                    {
                        isSmall? null:
                        <>
                            <View style={styles.profileTextMain}>
                                <Text style={styles.profileTitleBottom}>Johney Depp</Text>
                            </View>
                            <TouchableOpacity style={styles.moreMenu}>
                                <Image style={styles.moreIcon} source={require('../../../assets/images/more2.png')} />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
        </View>
    );
}
export default Sidebar;

const styles = StyleSheet.create({
    sidebarHeader: {
        flexDirection: 'row',
        flex: 1,
    },
    sideBarAside: {
        shadowColor: '#152232',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        backgroundColor: COLORS.white,
        paddingTop: hp(2.0),
        paddingLeft: hp(1.0),
        paddingRight: hp(1.0),
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
    },
    menuItemSelected: {
        backgroundColor: '#F3F5F9',
    },
    selectedMenuText: {
        color: '#262626',
    },
    menuText: {
        fontSize: hp(2.0),
        fontFamily: FONTS.fontSemiBold,
        color: COLORS.menuLightFonts,
        paddingLeft: hp(2),
    },
    headerProfile: {
        width: hp(5.40),
        resizeMode: 'contain',
    },
    userInfobottom: {
        position: 'absolute',
        bottom: hp(6),
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
        width: hp(3.25),
        height: hp(3.25)
    },
    moreMenu: {
        marginLeft: hp(4),
    },
    moreIcon: {
        width: hp(3),
        resizeMode: 'contain',
    },
});