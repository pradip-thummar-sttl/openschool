import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Splash from './src/component/splash/Splash';
import Users from './src/component/users/Users';
import Introduction from './src/component/teacher/Introduction';
import Login from './src/component/login/Login';
import Popup from './src/component/reusable/popup/Popup';
import Popupuser from './src/component/reusable/popup/Popupuser';
import Sidebar from './src/component/reusable/sidebar/Sidebar';
import Header from './src/component/reusable/header/Header';
import LessonandHomeworkPlanner from './src/screens/teacher/lessonandhomeworkplannerempty/Lessonandhomeworkplanner';
import NotificationDrawer from './src/component/reusable/notificationdrawer/NotificationDrawer';
import LessonandHomeworkPlannerDashboard from './src/screens/teacher/lessonandhomeworkplannerdashboard/Lessonandhomeworkplannerdashboard';
import TeacherLessonEmpty from './src/screens/teacher/teacherlessonempty/TeacherLessonEmpty';
import PupuilDashboard from './src/screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from './src/screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import combineReducers from './src/reducer/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import STYLE from './src/utils/Style';

const store = createStore(combineReducers)
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer drawerPosition='right'>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}

function ScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      {/* <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Popup" component={Popup} />
      <Stack.Screen name="Popupuser" component={Popupuser} />
      <Stack.Screen name="Sidebar" component={Sidebar} />
      <Stack.Screen name="Header" component={Header} /> */}
      {/* <Stack.Screen name="LessonandHomeworkPlannerDashboard" component={LessonandHomeworkPlannerDashboard} /> */}
      {/* <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} /> */}
      {/* <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} /> */}
      <Stack.Screen name="TeacherLessonEmpty" component={TeacherLessonEmpty} />
      <Stack.Screen name="LessonandHomeworkPlannerDashboard" component={LessonandHomeworkPlannerDashboard} /> */}
      {/* <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} /> */}
      <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator 
    drawerContent={props => <NotificationDrawer {...props}  />}
    drawerPosition='right'
    headerMode='none'
    drawerStyle={STYLE.drawerWidth} >
      <Drawer.Screen name="ScreenStack" component={ScreenStack} />
    </Drawer.Navigator>
  );
}
