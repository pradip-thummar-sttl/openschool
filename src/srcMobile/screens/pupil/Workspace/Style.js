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
    workSpaceViewSaved: {
        height: '80%',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    workSpaceSaved: {
        // height: '100%',
        flex : 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    smallVideoImg: {
        marginTop: hp(1),
        marginLeft: wp(1)
    },
    bottomView: {
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: -2,
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
        height: hp(8),
        flexDirection: 'row',
        alignItems: "center"
    },
    fileGrpWorkspacee: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
    },
    fileGrp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.videoLinkBorder,
        paddingHorizontal: hp(2.46),
        paddingVertical: hp(1.23),
    },
    fileName: {
        fontFamily: FONTS.fontRegular,
        fontSize: hp(1.56),
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
        height: hp(5.20),
        width: hp(5.20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
    },
    functionButton: {
        height: hp(5.20),
        width: hp(5.20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: COLORS.borderGrp,
        borderWidth: 1,
        marginLeft: 10,
    },
    functionGreenButton: {
        height: hp(5.20),
        width: hp(5.20),
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
        width: hp(2.2),
        height: hp(2.3),
        resizeMode: 'contain',
    },
    commonWidthIcon: {
        // width: hp(2.2),
        // height: hp(2.3),
        resizeMode: 'contain',
    },
})