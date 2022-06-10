import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import COLORS from "../../../../utils/Colors";
import STYLE from "../../../../utils/Style";
// import Images from '../../../../utils/Images';
import CloseBlack from "../../../../svg/teacher/timetable/Close_Black";
import SearchBlue from "../../../../svg/teacher/timetable/Search_Blue";
import FONTS from "../../../../utils/Fonts";
import Popuphomework from "../../reusable/popup/Popuphomework";
import Popupsubmithomework from "../../reusable/popup/Popupsubmithomework";
const { width, height } = Dimensions.get("window");
import Notification from "../../../../svg/teacher/dashboard/Notification";
import { BadgeIcon } from "../../../../utils/Model";
import FilterBlack from "../../../../svg/teacher/timetable/Filter_Black";
import TickMarkBlue from "../../../../svg/teacher/dashboard/TickMark_Blue";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { opacity } from "../../../../utils/Constant";
import AddWhite from "../../../../svg/teacher/timetable/Add_White";
const HeaderWhitepupilMessage = (props) => {
  const textInput = useRef(null);
  const [isSearchActive, setSearchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [filterBy, setFilterBy] = useState("Date");
  const [keyword, setKeyword] = useState("");


  useEffect(() => {
    props.onFilter(filterBy);
  }, [filterBy]);


  const openNotification = () => {
    BadgeIcon.isBadge = false;
    props.navigation.openDrawer()
  }


  const onSearchClick = (search) => {

    if (search && keyword != "") {
      setTimeout(() => {
        props.onSearch(keyword);
      }, 500)
    }
    else if (!search) {
      props.onClearSearch()
      setKeyword('')
      textInput.current.clear()
    }
  }

  return (
    <View style={styles.headerBarMainWhite}>
      <View style={styles.headerMain}>
        <Text style={styles.mainTitle}>Global Messaging</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notificationBar}
            onPress={() => openNotification()}
            activeOpacity={opacity}
          >
            <Notification
              style={styles.massagesIcon}
              height={hp(5.2)}
              width={hp(5.2)}
            />
            {BadgeIcon.isBadge ? <View style={STYLE.redDot}></View> : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchParent}>
        <View style={styles.searchInner}>
          <TouchableOpacity onPress={() => { onSearchClick(true) }} activeOpacity={opacity} >
            <SearchBlue height={20} width={20} />
          </TouchableOpacity>

          <TextInput
            ref={textInput}
            style={{
              flex: 1,
              paddingVertical: Platform.OS === "android" ? 3 : 0,
              height: "100%",
              paddingHorizontal: 10,
              fontSize: hp(1.82),
              fontFamily: FONTS.fontSemiBold,
            }}
            placeholder="Search messages"
            maxLength={50}
            placeholderTextColor={COLORS.menuLightFonts}
            onChangeText={(keyword) => {
              setKeyword(keyword);
              props.onSearchKeyword(keyword);
              keyword == "" && onSearchClick(false);
            }}
            onSubmitEditing={() => {keyword != "" && onSearchClick(true)}}
          />
          <TouchableOpacity onPress={() => { onSearchClick(false) }} activeOpacity={opacity} >
            {keyword != "" && <CloseBlack height={20} width={20} />}
          </TouchableOpacity>
          
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Menu style={{ marginLeft: 10 }}>
          <MenuTrigger
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.commonButtonBorderedheader}>
              By {filterBy}
            </Text>
            <FilterBlack
              style={[styles.filterIcon]}
              height={hp(1.74)}
              width={hp(1.74)}
            />
          </MenuTrigger>
          <MenuOptions style={[styles.filterListWrap]}>
            <MenuOption style={[styles.borderList]}>
              <TouchableOpacity
                activeOpacity={opacity}
                onPress={() => {
                  setFilterBy("Date");
                  setSelectedIndex(0);
                }}
              >
                <View style={styles.filterList}>
                  <Text style={styles.filterListText}>Date</Text>
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
                  setFilterBy("Title");
                  setSelectedIndex(1);
                }}
              >
                <View style={styles.filterList}>
                  <Text style={styles.filterListText}>Title</Text>
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
                  setFilterBy("Status");
                  setSelectedIndex(2);
                }}
              >
                <View style={styles.filterList}>
                  <Text style={styles.filterListText}>Status</Text>
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
          </MenuOptions>
        </Menu>
      </View>
      <TouchableOpacity
        style={styles.buttonGroup}
        activeOpacity={opacity}
        onPress={() => props.onNewMessage()}
      >
        <>
          <AddWhite
            style={styles.addIcon}
            width={hp(1.55)}
            height={hp(1.55)}
          />
          <Text style={styles.commonButtonGreenheader}>NEW MESSAGE</Text>
        </>
      </TouchableOpacity>
    </View>
    </View >
  );
};
export default HeaderWhitepupilMessage;

const styles = StyleSheet.create({
  headerBarMainWhite: {
    backgroundColor: COLORS.white,
    paddingLeft: hp(2.99),
    paddingRight: hp(4.16),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    shadowColor: COLORS.SidebarHeaderShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    zIndex: 9,
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: hp(2.86),
    fontFamily: FONTS.fontSemiBold,
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
  },
  field: {
    position: "relative",
    width: hp(81.11),
    justifyContent: "center",
    marginRight: hp(1.69),
  },
  searchHeader: {
    height: hp(5.2),
    paddingLeft: 15,
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
    width: 25,
    height: 25,
    right: hp(1.43),
  },
  userIcon1Parent: {
    position: "absolute",
    width: 25,
    height: 25,
    right: hp(1.43),
  },
  commonButtonBorderedheader: {
    // backgroundColor: 'red',
    color: COLORS.darkGrayIntro,
    borderRadius: hp(1),
    overflow: "hidden",
    textAlign: "center",
    paddingLeft: hp(2.2),
    paddingRight: hp(4),
    paddingTop: hp(1.2),
    paddingBottom: hp(1.4),
    height: hp(5.2),
    alignSelf: "center",
    // textTransform: 'uppercase',
    fontFamily: FONTS.fontSemiBold,
    borderWidth: 1,
    borderColor: COLORS.borderGrp,
    fontSize: hp(1.82),
  },
  buttonGroup: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  filterIcon: {
    width: hp(1.74),
    resizeMode: "contain",
    position: "absolute",
    right: hp(1.1), //hp(1.10)
  },
  commonButtonGreenheader: {
    backgroundColor: COLORS.dashboardGreenButton,
    color: COLORS.white,
    fontSize: hp(1.56),
    borderRadius: hp(1),
    overflow: "hidden",
    textAlign: "center",
    paddingLeft: hp(4.175),
    paddingRight: hp(2.5),
    height: hp(5.2),
    paddingTop: hp(1.4),
    paddingBottom: hp(1.4),
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: FONTS.fontBold,
  },
  addIcon: {
    width: hp(1.55),
    resizeMode: "contain",
    position: "absolute",
    left: hp(1.8),
    zIndex: 9,
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

  filterListWrap: {
    paddingHorizontal: 5,
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
  searchParent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: hp(5.2),
    backgroundColor: COLORS.white,
    marginTop: 15,
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
    height: 20,
    resizeMode: "contain",
    right: 0,
    alignSelf: "center",
  },
});
