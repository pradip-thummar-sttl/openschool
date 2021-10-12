import React,{useEffect} from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import RouteTablet from './src/srcTab/route/Route'
import RouteMobile from './src/srcMobile/route/Route'
import { LogBox, View, StatusBar } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
LogBox.ignoreAllLogs();
import { isTablet } from 'react-native-device-info';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

requestMultiple(
  [PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.RECORD_AUDIO,]
).then((statuses) => {
  console.log('statuses', statuses);
});

export default function App() {
  useEffect(() => {
    console.log('hello')
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, [])
  return (
    <>
      {/* <StatusBar hidden /> */}
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MenuProvider>
            {isTablet() ?
              <RouteTablet /> :
              <RouteMobile />
            }
          </MenuProvider>
        </View>
      </Provider>
    </>
  )
}
