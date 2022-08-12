import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../../../../utils/Colors";
import STYLE from "../../../../../../utils/Style";
// import Images from '../../../../../../utils/Images';
import FONTS from "../../../../../../utils/Fonts";
import { opacity } from "../../../../../../utils/Constant";
import BackArrow from "../../../../../../svg/common/BackArrow";
import SearchBlue from "../../../../../../svg/teacher/timetable/Search_Blue";
import CloseBlack from "../../../../../../svg/teacher/timetable/Close_Black";
const HeaderGallery = (props) => {
  const textInput = useRef(null);

  const [isSearchActive, setSearchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [keyword, setKeyword] = useState("");

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
    <View style={styles.headerBarMainWhite}>
      <View style={styles.headerMain}>
        <Text style={styles.mainTitle}>
          <TouchableOpacity
            activeOpacity={opacity}
            onPress={() => props.navigateToBack()}
          >
            {/* <Image style={styles.arrow} source={Images.backArrow} /> */}
            <BackArrow height={hp(2.34)} width={hp(2.34)} />
          </TouchableOpacity>{" "}
          Recommended Content
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notificationBar}
            onPress={() => props.onAlertPress()}
            activeOpacity={opacity}
          >
            {/* <Image style={styles.massagesIcon} source={Images.Notification} /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterbarMain}>
        <View style={styles.lessonPlanTop}>
          <View style={styles.lessonPlanTab}>
            <Text style={styles.commonText}>
              Our AI has shortlisted the following content to help you to
              deliver your lesson
            </Text>
          </View>
        </View>
        <View style={styles.flexEnd}>
          <View style={styles.field}>
            {/* <Image
                            style={styles.userIcon}
                            source={Images.SearchIcon} /> */}
            <TouchableOpacity
              style={styles.userIcon}
              activeOpacity={opacity}
              onPress={() => search()}
            >
              <SearchBlue height={18} width={18} />
            </TouchableOpacity>
            <TextInput
              ref={textInput}
              style={[
                // STYLE.commonInput,
                styles.searchHeader,
                { paddingVertical: Platform.OS === "android" ? 2 : 0 },
              ]}
              placeholder="Search recomended content"
              maxLength={50}
              placeholderTextColor={COLORS.menuLightFonts}
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
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderGallery;

const styles = StyleSheet.create({
  headerBarMainWhite: {
    paddingLeft: hp(3.25),
    paddingRight: hp(2.0),
    backgroundColor: COLORS.white,
    // marginBottom: hp(5.85),
    paddingTop: Platform.OS == "android" ? hp(2) : hp(3.38),
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: hp(2.86),
    fontFamily: FONTS.fontSemiBold,
    alignItems: "center",
  },
  massagesIcon: {
    width: hp(5.2),
    height: hp(5.2),
    resizeMode: "contain",
  },
  massagesIcon: {
    width: hp(5.2),
    height: hp(5.2),
    resizeMode: "contain",
  },
  filterbarMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLORS.borderGrp,
    paddingBottom: hp(1.5),
  },
  field: {
    position: "relative",
    width: hp(41),
    alignItems:'center',
    // justifyContent:"space-between",
    flexDirection:'row',
    borderColor: COLORS.videoLinkBorder,
    borderRadius:5,
    borderWidth:1,
  },
  searchHeader: {
    height: hp(5.2),
    width:hp(32),
    fontSize: hp(1.82),
    fontFamily: FONTS.fontSemiBold,
    
  },
  userIcon: {
    // position: "absolute",
    // top: hp(1.1),
    width: hp(2),
    marginHorizontal:wp(1),
    resizeMode: "contain",
    // left: hp(1.43),
  },
  commonButtonBorderedheader: {
    backgroundColor: COLORS.transparent,
    color: COLORS.darkGray,
    borderRadius: hp(1),
    overflow: "hidden",
    textAlign: "center",
    paddingLeft: hp(2.2),
    paddingRight: hp(4),
    paddingTop: hp(1.4),
    paddingBottom: hp(1.4),
    alignSelf: "center",
    // textTransform: 'uppercase',
    fontFamily: FONTS.fontBold,
    borderWidth: 1,
    borderColor: COLORS.borderGrp,
    height: hp(5.2),
    fontSize: hp(1.5),
  },
  buttonGroup: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginRight: hp(1.69),
  },
  filterIcon: {
    width: hp(1.74),
    resizeMode: "contain",
    position: "absolute",
    right: hp(1.3),
    top: hp(1.19),
  },
  commonButtonGreenheader: {
    backgroundColor: COLORS.dashboardGreenButton,
    color: COLORS.white,
    fontSize: hp(1.56),
    borderRadius: hp(1),
    overflow: "hidden",
    textAlign: "center",
    paddingLeft: hp(3.125),
    paddingRight: hp(3.125),
    paddingTop: hp(1.4),
    paddingBottom: hp(1.4),
    height: hp(5.2),
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: FONTS.fontBold,
    marginLeft: hp(2),
  },
  commonButtonGreenheaderwithicon: {
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
    top: hp(1.5),
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
  },
  filterListWrap: {
    paddingTop: hp(1),
    paddingLeft: hp(1.2),
    paddingRight: hp(1.2),
    paddingBottom: hp(1),
    position: "absolute",
    backgroundColor: COLORS.white,
    top: hp(5.5),
    right: 0,
    width: hp(30.98),
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
  lessonPlanTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lessonPlanTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: hp(1.9),
  },
  tabs: {
    paddingRight: hp(3.9),
  },
  tabsText: {
    color: COLORS.menuLightFonts,
    fontFamily: FONTS.fontSemiBold,
    fontSize: hp(1.56),
    textTransform: "uppercase",
  },
  tabsTextSelected: {
    color: COLORS.buttonGreen,
  },
  flexEnd: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  arrow: {
    width: hp(2.34),
    resizeMode: "contain",
    marginRight: hp(1),
  },
  commonText: {
    fontSize: hp(1.82),
    color: COLORS.darkGray,
  },
});
