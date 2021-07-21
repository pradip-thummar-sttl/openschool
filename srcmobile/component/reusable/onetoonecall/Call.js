import QB from "quickblox-react-native-sdk";
import React, { useState, useEffect, useRef } from "react";
import { Image, Text, View } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant"
import { initApp } from "./CallConfiguration";
import Style from './Style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from "../../../utils/Images";
import COLORS from "../../../utils/Colors";
import { User } from "../../../utils/Model";

const Call = (props) => {
    const params = props.route.params

    const [isLoading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const [isCallAccepted, setCallAccepted] = useState(false)
    const [pupilData, setPupilData] = useState(params.pupilData)
    const [selectedPupilData, setSelectedPupilData] = useState(params.userInfo ? params.userInfo : {})
    const [isCallStarted, setCallStarted] = useState(false)

    console.log('pupilData', params);

    useEffect(() => {
        if (params.userType == 'Teacher') {
            setLoading(true)
            initApp(callBack => {
                if (callBack.errCode == 200) {
                    setLoading(false)
                } else {
                    // showMessage(callBack.err)
                }
            });
        }
    }, []);

    const createSession = (QBUserID) => {
        setCallStarted(true)

        const userInfo = {
            FirstName: User.user.FirstName,
            LastName: User.user.LastName,
            ProfilePicture: User.user.ProfilePicture
        }

        const params = {
            opponentsIds: [QBUserID],
            type: QB.webrtc.RTC_SESSION_TYPE.AUDIO,
            userInfo: userInfo
        }

        QB.webrtc
            .call(params)
            .then(function (session) {
                console.log('Session created', session.id);
                setSessionId(session.id)
            })
            .catch(function (e) { console.log('session rejected', e); })
    }

    const acceptCall = (sessionId) => {
        const userInfo = {
            // custom data can be passed using this object
            // only [string]: string type supported
        }
        console.log('sessionId', sessionId);
        QB.webrtc
            .accept({ sessionId, userInfo })
            .then(function (session) { console.log('Sesson Started', session); setCallAccepted(true) })
            .catch(function (e) { console.log('Sesson Started Error', e); })
    }

    const endCall = (sessionId) => {
        const userInfo = {
            // custom data can be passed using this object
            // only [string]: string type supported
        }

        QB.webrtc
            .hangUp({ sessionId, userInfo })
            .then(function (session) {
                console.log('Sesson Ended', session);
                releaseResource()
                props.navigation.goBack()
            })
            .catch(function (e) {
                console.log('Sesson Ended Error', e);
                releaseResource()
                props.navigation.goBack()
            })
    }

    const releaseResource = () => {
        QB.webrtc
            .release()
            .then(() => { console.log('released successfully'); })
            .catch(e => { console.log('released successfully error', e); })

    }

    const pupilRender = ({ item }) => {
        return (
            <Pupillist
                item={item}
                onPress={() => { props.navigation.navigate('PupilProfileView', { item: item }) }}
            />
        );
    };

    const Pupillist = ({ item }) => (
        <TouchableOpacity onPress={() => { setSelectedPupilData(item); createSession(Number(item.QBUserID)) }}>
            <View style={[Style.pupilData]}>
                <View style={Style.pupilProfile}>
                    <View style={Style.rowProfile}>
                        <Image style={Style.pupilImage} source={{ uri: baseUrl + item.ProfilePicture }}></Image>
                        <Text numberOfLines={1} style={[Style.pupilName, {}]}>{item.FirstName} {item.LastName}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={Style.mainPage}>
            {!isLoading ?
                <>
                    <Image style={Style.profile} source={{ uri: baseUrl + selectedPupilData.ProfilePicture }} />
                    <Text style={Style.profileTitle} numberOfLines={1}>{selectedPupilData.FirstName} {selectedPupilData.LastName}</Text>

                    <View style={Style.actionParent}>
                        {params.userType == 'Pupil' && !isCallAccepted ?
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => acceptCall(params.userType == 'Teacher' ? sessionId : params.sessionId)}>
                                <Image style={Style.actionButton} source={Images.callPick} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => endCall(params.userType == 'Teacher' ? sessionId : params.sessionId)}>
                            <Image style={Style.actionButton} source={Images.callDrop} />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <Text style={Style.profileTitle}>Wait a moment, we're initializing a call...</Text>
            }
            {params.userType == 'Teacher' && !isCallStarted ?
                <FlatList
                    style={{ position: 'absolute', height: '100%', marginVertical: 40, width: '100%', backgroundColor: COLORS.white }}
                    data={pupilData}
                    renderItem={pupilRender}
                    keyExtractor={(item) => item.id}
                    extraData={0}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <Text style={Style.listHeader}>Tap any of the pupil to initiate a call..</Text>
                        )
                    }}
                />
                :
                null
            }
        </View>
    )
}

export default Call