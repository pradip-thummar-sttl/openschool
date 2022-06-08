import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../utils/Colors";
import STYLE from "../../../../utils/Style";
// import Images from '../../../../utils/Images';
import FONTS from "../../../../utils/Fonts";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { opacity } from "../../../../utils/Constant";
import { useLinkProps } from "@react-navigation/native";
import HamburgerMenu from "../../../../svg/common/HamburgerMenu";
import { useState } from "react";
import Notification from "../../../../svg/teacher/dashboard/Notification";
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import AddWhite from "../../../../svg/teacher/timetable/Add_White";
import { BadgeIcon } from "../../../../utils/Model";
const Header = (props) => {
  const textInput = useRef(null);
  const [isSearchActive, setSearchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [filterBy, setFilterBy] = useState("Date");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // if (!isSearchActive) {
    //   props.onClearSearch();
    //   setKeyword("");
    //   textInput.current.clear();
    // } else {
    //   props.onSearch();
    // }
  }, [isSearchActive]);

  useEffect(() => {
    props.onFilter(filterBy);
  }, [filterBy]);

  const search = () => {
    setSearchActive(true);
    if (keyword != "") {
      setSearchActive(true);
      props.onSearch();
    } else {
      setSearchActive(false);
    }
  };

  const onCloseSearch = () => {
    props.onClearSearch();
    setKeyword("");
    textInput.current.clear();
    setSearchActive(false);
  
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.dashBoard,
      }}
    >
      <View style={styles.headerMain}>
        <View style={styles.menuIconWithTitle}>
          <TouchableOpacity onPress={() => props.onAlertPress()}>
            <HamburgerMenu
              width={hp(2.6)}
              height={hp(1.84)}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mainTitle}>
            Lesson & homework planner
          </Text>
        </View>

        <View style={styles.headerRight}>
          {/* <TouchableOpacity style={styles.notificationBar}>
                        <Image style={styles.calnderDashHeaderIcon} source={Images.calnderDashHeaderIcon} />
                    </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.notificationBar}
            onPress={() => props.onNotification()}
            activeOpacity={opacity}
          >
            {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
            <Notification
              style={styles.massagesIcon}
              height={hp(5.2)}
              width={hp(5.2)}
            />
            {BadgeIcon.isBadge ? <View style={STYLE.redDot}></View> : null}
            {/* <View style={STYLE.redDot}></View> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchParent}>
        <View style={styles.searchInner}>
        <TouchableOpacity activeOpacity={opacity} onPress={() => search()}>
              <SearchBlue height={18} width={18} />
          </TouchableOpacity>
          <TextInput
            ref={textInput}
            style={{
              flex: 1,
              height: "95%",
              paddingHorizontal: 10,
              fontSize: hp(1.82),
              fontFamily: FONTS.fontSemiBold,
              paddingVertical: 0,
            }}
            placeholder="Search subject,class,etc"
            maxLength={50}
            placeholderTextColor={COLORS.menuLightFonts}
            numberOfLines={1}
            multiline={false}
            onChangeText={(keyword) => {
              setKeyword(keyword);
              props.onSearchKeyword(keyword);
              if (keyword == "") {
                search();
                setSearchActive(false);
              }
            }}
            onSubmitEditing={() => search()}
          />
          <TouchableOpacity
            activeOpacity={opacity}
            onPress={() => onCloseSearch()}
          >
            {isSearchActive ? <CloseBlack height={20} width={20} /> : null}
          </TouchableOpacity>
          <Menu>
            <MenuTrigger>
              {/* <Image style={styles.searchMenu} source={Images.mobileFilter} /> */}
              <FilterBlack style={styles.searchMenu} height={15} width={15} />
            </MenuTrigger>
            <MenuOptions style={styles.filterListWrap}>
              <MenuOption style={styles.borderList}>
                <TouchableOpacity
                  activeOpacity={opacity}
                  onPress={() => {
                    setFilterBy("Subject");
                    setSelectedIndex(0);
                  }}
                >
                  <View style={styles.filterList}>
                    <Text style={styles.filterListText}>Subject</Text>
                    {selectedIndex == 0 ? (
                      // <Image source={Images.CheckIcon} style={styles.checkMark} />
                      <TickMarkBlue
                        style={styles.checkMark}
                        height={hp(1.48)}
                        width={hp(1.48)}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </MenuOption>
              <MenuOption style={styles.borderList}>
                <TouchableOpacity
                  activeOpacity={opacity}
                  onPress={() => {
                    setFilterBy("Date");
                    setSelectedIndex(1);
                  }}
                >
                  <View style={styles.filterList}>
                    <Text style={styles.filterListText}>Date</Text>
                    {selectedIndex == 1 ? (
                      <TickMarkBlue
                        style={styles.checkMark}
                        height={hp(1.48)}
                        width={hp(1.48)}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </MenuOption>
              <MenuOption style={styles.borderList}>
                <TouchableOpacity
                  activeOpacity={opacity}
                  onPress={() => {
                    setFilterBy("LiveLesson");
                    setSelectedIndex(2);
                  }}
                >
                  <View style={styles.filterList}>
                    <Text style={styles.filterListText}>Live Lesson</Text>
                    {selectedIndex == 2 ? (
                      <TickMarkBlue
                        style={styles.checkMark}
                        height={hp(1.48)}
                        width={hp(1.48)}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </MenuOption>
              <MenuOption style={styles.borderList}>
                <TouchableOpacity
                  activeOpacity={opacity}
                  onPress={() => {
                    setFilterBy("PublishLesson");
                    setSelectedIndex(3);
                  }}
                >
                  <View style={styles.filterList}>
                    <Text style={styles.filterListText}>Publish Lesson</Text>
                    {selectedIndex == 3 ? (
                      <TickMarkBlue
                        style={styles.checkMark}
                        height={hp(1.48)}
                        width={hp(1.48)}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <TouchableOpacity
          style={styles.commonButtonGreenheader}
          activeOpacity={opacity}
          onPress={() => props.navigateToAddSubject()}
        >
          <AddWhite style={styles.addIcon} width={hp(1.55)} height={hp(1.55)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  headerMain: {
    paddingTop: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: hp(2),
    paddingRight: hp(2),
    paddingTop: Platform.OS == "android" ? hp(1.23) : hp(4.31),
    paddingBottom: hp(1.23),
    backgroundColor: COLORS.white,
    zIndex: 1,
    shadowColor: COLORS.headerShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    marginBottom: hp(1.23),
  },
  mainTitle: {
    fontSize: hp(2.21),
    fontFamily: FONTS.fontSemiBold,
    width: "80%",
    // backgroundColor  :'red'
  },
  date: {
    fontSize: hp(2.86),
    fontFamily: FONTS.fontRegular,
  },
  massagesIcon: {
    width: hp(5.2),
    height: hp(5.2),
    resizeMode: "contain",
  },
  filterbarMain: {
    flexDirection: "row",
    marginBottom: hp(2.6),
    marginTop: hp(-1.5),
    width: "100%",
    alignItems: "center",
  },
  field: {
    position: "relative",
    width: "84%",
    justifyContent: "center",
    marginRight: hp(1.2),
  },
  searchHeader: {
    height: hp(5.2),
    width: "100%",
    paddingTop: hp(0),
    paddingBottom: hp(0),
    paddingRight: hp(4),
    paddingLeft: hp(4.43),
    borderColor: COLORS.borderGrp,
    fontSize: hp(1.82),
    fontFamily: FONTS.fontSemiBold,
  },
  userIcon: {
    position: "absolute",
    top: hp(1.1),
    width: hp(1.9),
    resizeMode: "contain",
    left: hp(1.43),
  },
  userIcon1: {
    position: "absolute",
    width: 15,
    resizeMode: "contain",
    height: 30,
    top: 0,
  },
  userIcon1Parent: {
    position: "absolute",
    width: hp(1.66),
    top: hp(0.8),
    left: hp(1.5),
  },
  commonButtonBorderedheader: {
    backgroundColor: COLORS.transparent,
    color: COLORS.darkGray,
    borderRadius: hp(1),
    overflow: "hidden",
    textAlign: "center",
    paddingLeft: hp(2.2),
    paddingRight: hp(4),
    paddingTop: hp(1.2),
    paddingBottom: hp(1.4),
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: FONTS.fontSemiBold,
    borderWidth: 1,
    borderColor: COLORS.borderGrp,
    height: hp(5.2),
    fontSize: hp(1.82),
  },
  buttonGroup: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  filterIcon: {
    width: hp(1.74),
    resizeMode: "contain",
    position: "absolute",
  },
  filterIcon1: {
    width: hp(1.74),
    resizeMode: "contain",
    position: "absolute",
  },
  commonButtonGreenheader: {
    backgroundColor: COLORS.dashboardGreenButton,
    color: COLORS.white,
    borderRadius: hp(1),
    height: hp(5.2),
    width: hp(5.2),
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    width: hp(1.55),
    height: hp(1.55),
    // resizeMode: 'contain',
    // position: 'absolute',
    // top: Platform.OS == 'android' ? hp(1) : hp(1.29),
    // left: hp(1.8),
    // zIndex: 9,
  },
  iconTop: {
    top: hp(4.2),
  },
  borderList: {
    borderBottomColor: COLORS.bottomProfileLightBorder,
    borderBottomWidth: hp(0.26),
  },
  filterList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: hp(1),
    paddingBottom: hp(1),
    flex: 1,
  },
  // filterListWrap: {
  //     paddingTop: hp(1),
  //     paddingLeft: hp(1.2),
  //     paddingRight: hp(1.2),
  //     paddingBottom: hp(1),
  //     position: 'absolute',
  //     backgroundColor: COLORS.white,
  //     top: hp(5.5),
  //     width: hp(30.78),
  //     borderRadius: hp(1),
  //     shadowColor: COLORS.black,
  //     shadowOffset: { width: 0, height: hp(1), },
  //     shadowOpacity: 0.05,
  //     shadowRadius: hp(1),
  //     right: hp(-1),
  // },
  filterListWrap: {
    backgroundColor: COLORS.white,
    borderRadius: hp(1),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: hp(1) },
    shadowOpacity: 0.05,
    shadowRadius: hp(1),
  },
  checkMark: {
    width: hp(1.48),
    resizeMode: "contain",
    right: 10,
  },
  filterListText: {
    color: COLORS.darkGray,
    fontSize: hp(1.82),
    fontFamily: FONTS.fontRegular,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  massagesIcon: {
    width: hp(5.2),
    height: hp(5.2),
    resizeMode: "contain",
  },
  filterGroup: {
    marginTop: wp(-11.5),
  },
  menuIconWithTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: hp(2.6),
    resizeMode: "contain",
    marginRight: hp(1.56),
  },
  searchParent: {
    flexDirection: "row",
    marginHorizontal: hp(1.84),
    alignItems: "center",
    marginBottom: hp(1.23),
    marginTop: 0,
    backgroundColor: COLORS.white,
  },
  searchInner: {
    height: "100%",
    flex: 1,
    borderColor: COLORS.borderGrp,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchMenu: {
    height: 15,
    resizeMode: "contain",
    right: 0,
    alignSelf: "center",
  },
});
