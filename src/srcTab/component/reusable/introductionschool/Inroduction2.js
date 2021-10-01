import React from "react";
import { View, StyleSheet,Text, Image, ImageBackground } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import FONTS from '../../../../utils/Fonts';
// import Images from '../../../../utils/Images';
import STabletOnboarding2 from "../../../../svg/school/introductionTablet/STabletOnboarding2";


const Introduction2 = (props) => {
    return (
        <View style={{...STYLE.viewBox, backgroundColor: COLORS.white}}>
            <View style={styles.imageArea}>
                {/* <Image source={Images.introSlideTwo} style={styles.SlideImage}></Image> */}
                <STabletOnboarding2 style={styles.SlideImage} width={'100%'} height={hp(46.48)} />
            </View>
            <View style={styles.lefContent}>
               <Text h2 style={styles.introTitle}>Secure, encrypted and safe</Text>
               <Text p style={styles.introContent}>Designed with data privacy and protaction at its heart, MyEd Open School is safe,{'\n'}secure and only accessible by your school and pupils.</Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageArea: {        
        alignSelf: 'center',
        height: hp(61.45),
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
        // width: hp(111.17),
    },
});
export default Introduction2;