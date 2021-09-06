import React, { useState, useEffect } from "react";
import QB from "quickblox-react-native-sdk";
import { appSettings, User } from "../../../../utils/Model";

const makeModuleReady = (callBack) => {
    QB.webrtc
        .init()
        .then(function () { callBack({ errCode: 200 }); })
        .catch(function (e) { callBack({ err: e, errCode: 400 }); })
}

const connectUser = (callBack) => {
    QB.chat
        .connect({
            userId: User.user.QBUserId,
            password: 'Admin@123'
        })
        .then(function () {
            console.log('connected successfully');
            makeModuleReady(callBack)
        })
        .catch(function (e) {
            callBack({ err: e, errCode: 400 });
        });
}

const isUserConnected = (callBack) => {
    QB.chat
        .isConnected()
        .then(function (connected) { // boolean
            // handle as necessary, i.e.
            if (connected === false) {
                connectUser(callBack)
            } else {
                console.log('Already connected');
                makeModuleReady(callBack)
            }
        })
        .catch(function (e) {
            callBack({ err: e, errCode: 400 });
        });
}

const authenticateUser = (callBack) => {
    QB.auth
        .login({
            login: User.user.Email,
            password: 'Admin@123'
        })
        .then(function (info) {
            console.log('signed in successfully, handle info as necessary', info);

            isUserConnected(callBack)
        })
        .catch(function (e) {
            callBack({ err: e, errCode: 400 });
        });
}

const initSession = (callBack) => {
    QB.auth
        .getSession()
        .then(function (session) {
            console.log('handle session', session);
            authenticateUser(callBack)
        })
        .catch(function (e) {
            callBack({ err: e, errCode: 400 });
        });
}

export const initApp = (callBack) => {
    QB.auth
        .logout()
        .then(function () {
            QB.settings
                .init(appSettings)
                .then(function () {
                    initSession(callBack)
                })
                .catch(function (e) {
                    callBack({ err: e, errCode: 400 });
                });
        })
        .catch(function (e) {
            callBack({ err: e, errCode: 400 });
        });
}