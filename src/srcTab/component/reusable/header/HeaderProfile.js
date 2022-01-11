import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import FONTS from '../../../../utils/Fonts';
import { baseUrl, emailValidate, opacity, showMessage } from "../../../../utils/Constant";
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import Ic_Edit from "../../../../svg/teacher/pupilmanagement/Ic_Edit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker/src";

const HeaderProfile = (props) => {

    const [isProfileUri, setProfileUri] = useState('')

    const showActionChooser = () => {
        console.log('image --- click --->');
        Alert.alert(
            '',
            'Browse a profile picture',
            [{
                text: 'TAKE PHOTO',
                onPress: () => captureImage(),
            },
            {
                text: 'CHOOSE PHOTO',
                onPress: () => chooseImage(),
            },
            ],
            { cancelable: true }
        )
    }

    const captureImage = () => {
        console.log('image --- request --->');
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                console.log('image --- response --->', response);
                setProfileUri(response)
            },
        )
    }

    const chooseImage = () => {
        console.log('image --- request --->');
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                console.log('image --- response --->', response);
                setProfileUri(response)
            }
        );
    }

    if (props.Type === "EditProfile") {

        return (
            <View style={styles.managementBlockTop}>
            <TopBackImg style={styles.managementopImage} height={'100%'} width={'100%'} />
             <View style={styles.TeacherProfileMainView}>
                <TouchableOpacity activeOpacity={opacity} onPress={() => showActionChooser()}>
                   
                    <Image style={styles.imageViewStyle}
                        source={{ uri: !isProfileUri ? baseUrl+props.ProfilePicture : isProfileUri }} />
                        <View style={styles.editprofileStyl}>
                        <Ic_Edit style={styles.pzEditIcon} width={hp(1.7)} height={hp(1.7)} />
                        </View>
                </TouchableOpacity>
            </View>

            <View style={styles.btnSendView}>
                <TouchableOpacity
                    activeOpacity={opacity}
                    onPress={() => { validateFields() }}>
                    <Text style={styles.btnSendTextView}>Save</Text>
                </TouchableOpacity>
            </View> 
        </View>
        );
    }
    else
    {
        return(null);
    }
}
export default HeaderProfile;

const styles = StyleSheet.create({
    managementBlockTop:{
        height:hp(12.5),
        position: 'relative',
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#90daff'
    },
    managementopImage:{
        width: '100%',
        resizeMode:'stretch',
    },
    imageViewStyle:{ height: '100%', backgroundColor: COLORS.lightGrey ,width: '100%', borderRadius: 100 },
    
    TeacherProfileMainView:{
        width: hp(13),
        height:hp(13),
        borderRadius: 96,
        borderColor:COLORS.white,
        borderWidth: 3,
        backgroundColor:'#ECEDF0',
        position:'absolute',
        left:hp(8),
        bottom:Platform.OS == 'ios' ? hp(-8) : hp(-9),
    },
    editprofileStyl: {
        width: hp(2),
        height: hp(2),
        padding:hp(1.7),
        position: 'absolute',
        left: hp(4),
        bottom: hp(0),
        zIndex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: hp(100),
        backgroundColor: COLORS.white,
        borderColor: COLORS.editBorder,
        borderWidth: 1,
    },
    btnSendView:{
        width: wp(12),
        height: hp(5),
        right:hp(1),
        top:hp(4.5),
        bottom:hp(5),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.buttonGreen,
        backgroundColor: COLORS.buttonGreen,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    btnSendTextView:{
        fontFamily: FONTS.fontBold,
        color: COLORS.white,
        fontSize: 12,
        lineHeight: 37.5,
        textTransform: 'uppercase',
        textAlign: 'center',
        overflow: 'hidden',
        borderColor: COLORS.buttonGreen,
    },
});