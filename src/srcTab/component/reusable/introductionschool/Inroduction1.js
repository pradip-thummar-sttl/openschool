import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from "../../../../utils/Images";
import STabletOnboarding1 from "../../../../svg/school/introductionTablet/STabletOnboarding1";

const Introduction1 = (props) => {
    return (
        <View style={{...STYLE.viewBox, backgroundColor: COLORS.white}}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideOne} style={styles.SlideImage}></Image> */}
                <STabletOnboarding1 style={styles.SlideImage} width={'100%'} height={hp(47.23)}/>
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Always there for pupils </Text>
               <Text p style={styles.introContent}>Identify and support any pupil that may need extra attention with insights into their{'\n'}attendance, participation and achievements.</Text>
           </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageArea: {
        alignItems: 'center',
        height: hp(61.09),
        marginBottom: hp(6.51),
        justifyContent: 'flex-end',
        width: '100%',
    },
    lefContent:{
        width: '100%',
        paddingHorizontal: hp(4),
        textAlign: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
    },
    introTitle: {
        color:COLORS.darkGray,
        fontSize: hp(3.125),
        marginBottom:hp(2.8),
        textAlign: 'center',
        fontFamily: FONTS.fontBold,
    },
    introContent: {
        fontSize: hp(1.82),
        color: COLORS.darkGray,
        lineHeight:hp(2.60),
        textAlign: 'center',
        fontFamily: FONTS.fontRegular,
        paddingLeft:hp(7.81),
        paddingRight:hp(7.81),
    },
    SlideImage: {
       // width: hp(92.05),
    },
});

export default Introduction1;