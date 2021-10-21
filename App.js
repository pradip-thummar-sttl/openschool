import React,{useEffect, useState} from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import RouteTablet from './src/srcTab/route/Route'
import RouteMobile from './src/srcMobile/route/Route'
import { LogBox, View, StatusBar, Alert } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
LogBox.ignoreAllLogs();
import { isTablet } from 'react-native-device-info';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import NotificationDrawer from './src/srcTab/component/reusable/notificationdrawer/NotificationDrawer';
import { NotificationToken } from './src/utils/Model';

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
  const [permissions, setPermissions] = useState({});

  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('register', onRegistered);
  //   PushNotificationIOS.addEventListener(
  //     'registrationError',
  //     onRegistrationError,
  //   );
  //   PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  //   PushNotificationIOS.addEventListener(
  //     'localNotification',
  //     onLocalNotification,
  //   );

  //   PushNotificationIOS.requestPermissions({
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //     critical: true,
  //   }).then(
  //     (data) => {
  //       console.log('PushNotificationIOS.requestPermissions', data);
  //     },
  //     (data) => {
  //       console.log('PushNotificationIOS.requestPermissions failed', data);
  //     },
  //   );

  //   return () => {
  //     PushNotificationIOS.removeEventListener('register');
  //     PushNotificationIOS.removeEventListener('registrationError');
  //     PushNotificationIOS.removeEventListener('notification');
  //     PushNotificationIOS.removeEventListener('localNotification');
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const onRegistered = (deviceToken) => {
    console.log('token in device', deviceToken);
    Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ]);
  };

  const onRegistrationError = (error) => {
    Alert.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
      Title:  ${notification.getTitle()};\n
      Subtitle:  ${notification.getSubtitle()};\n
      Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()};\n
      Notification is clicked: ${String(isClicked)}.`;

    if (notification.getTitle() == undefined) {
      Alert.alert('Silent push notification Received', result, [
        {
          text: 'Send local push',
          onPress: sendLocalNotification,
        },
      ]);
    } else {
      Alert.alert('Push Notification Received', result, [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]);
    }
  };

  const onLocalNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    Alert.alert(
      'Local Notification Received',
      `Alert title:  ${notification.getTitle()},
      Alert subtitle:  ${notification.getSubtitle()},
      Alert message:  ${notification.getMessage()},
      Badge: ${notification.getBadgeCount()},
      Sound: ${notification.getSound()},
      Thread Id:  ${notification.getThreadID()},
      Action Id:  ${notification.getActionIdentifier()},
      User Text:  ${notification.getUserText()},
      Notification is clicked: ${String(isClicked)}.`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions((permissions) => {
      setPermissions({permissions});
    });
  };

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        NotificationToken.token = token
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
     
        // process the notification
    Alert.alert(' notification recieve')
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
