import QB from "quickblox-react-native-sdk";
import React, { useState, useEffect, useRef } from "react";
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { baseUrl, opacity, showMessage } from "../../../utils/Constant"
import { initApp } from "./CallConfiguration";
import Style from './Style'

const Call = (props) => {
    const params = props.route.params

    const [isLoading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const [isCallAccepted, setCallAccepted] = useState(false)

    useEffect(() => {
        if (params.userType == 'Teacher') {
            setLoading(true)
            initApp(callBack => {
                if (callBack.errCode == 200) {
                    createSession()
                } else {
                    // showMessage(callBack.err)
                }
            });
        }
    }, []);

    const createSession = () => {
        const params = {
            opponentsIds: [129315015],
            type: QB.webrtc.RTC_SESSION_TYPE.AUDIO
        }

        QB.webrtc
            .call(params)
            .then(function (session) {
                setLoading(false)
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

    return (
        <View style={Style.mainPage}>
            {!isLoading ?
                <>
                    <Image style={Style.profile} source={{ uri: baseUrl }} />
                    <Text style={Style.profileTitle} numberOfLines={1}>Caller Name Here</Text>

                    <View style={Style.actionParent}>
                        {params.userType == 'Pupil' && !isCallAccepted ?
                            <TouchableOpacity
                                activeOpacity={opacity}
                                onPress={() => acceptCall(params.userType == 'Teacher' ? sessionId : params.sessionId)}>
                                <Image style={Style.actionButton} source={{ uri: baseUrl }} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        <TouchableOpacity
                            activeOpacity={opacity}
                            onPress={() => endCall(params.userType == 'Teacher' ? sessionId : params.sessionId)}>
                            <Image style={Style.actionButton} source={{ uri: baseUrl }} />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <Text style={Style.profileTitle}>Wait a moment, we're initializing a call...</Text>
            }
        </View>
    )
}

export default Call