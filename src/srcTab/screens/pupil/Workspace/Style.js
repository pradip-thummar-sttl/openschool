import React, { useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, StyleSheet } from 'react-native'
import FONTS from "../../../../utils/Fonts";
import COLORS from "../../../../utils/Colors";
export default StyleSheet.create({
    workSpaceView: {
        paddingVertical: hp(2),
        paddingHorizontal: hp(2),
        backgroundColor: 'white',
        height: '86.5%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        marginRight: -10,
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
    strokeColorButton: {
        marginHorizontal: 5,
        marginVertical: 10,
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    strokeWidthButton: {
        height: hp(6.74),
        width: hp(6.74),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
    },
    functionButton: {
        height: hp(6.74),
        width: hp(6.74),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        marginLeft: 10,
    },
    functionGreenButton: {
        height: hp(6.74),
        width: hp(6.74),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        paddingTop: 6,
        marginRight: hp(0.99),
        marginLeft: 10,
    },
    functionText: {
        color: COLORS.darkGray, 
        fontSize: hp(1.56),
        fontFamily: FONTS.fontBold,
        textTransform: 'uppercase',
    },
    erase: {
        width: hp(2.75),
        height: hp(2.57),
        resizeMode: 'contain',
    },
    commonWidthIcon: {
        // width: hp(2.75),
        // height: hp(2.57),
        resizeMode: 'contain',
    },
})