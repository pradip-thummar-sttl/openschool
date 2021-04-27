import React, { useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, StyleSheet } from 'react-native'
import FONTS from "../../../utils/Fonts";
import COLORS from "../../../utils/Colors";
export default StyleSheet.create({
    workSpaceView: {
        //  marginHorizontal:hp(2),
        marginVertical: wp(2),
        backgroundColor: 'white',
        height: hp(84),
        width: wp(95),
        alignSelf: 'center',
        borderRadius: 5
    },
    smallVideoImg: {
        marginTop: hp(1),
        marginLeft: wp(1)
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: wp(95)
    },
    editorView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: wp(7),
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'

    },
    workspacebtn: {
        marginLeft: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: hp(30)
    },
    wsView: {
        width: '100%',
        height: wp(5),
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row',
        alignItems: "center"
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: hp(20),
        justifyContent: 'center',
        height: '100%',
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: hp(2)
    },
    fileName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.85),
        lineHeight: hp(2.60),
    },
    moreIcon: {
        width: hp(2.41),
        resizeMode: 'contain',

    },
    //
    strokeColorButton: {
        marginHorizontal: 5,
        marginVertical: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 50,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A',
        marginRight: 10,
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 40,
        width: 70,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10,
    },
    functionGreenButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 40,
        width: 70,
        backgroundColor: COLORS.buttonGreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10,
    },
    functionText: {
        color: 'white', 
        fontSize: 18,
        fontWeight: 'bold'
    },

})