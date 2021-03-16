import React, { Component } from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import Splash from './src/screens/splash/Splash';
import Users from './src/screens/users/Users';
import Introduction from './src/screens/introduction/Introduction';
import Login from './src/screens/login/Login';
import Popup from './src/component/reusable/popup/Popup';
import Popupuser from './src/component/reusable/popup/Popupuser';
import Sidebar from './src/component/reusable/sidebar/Sidebar';
import Header from './src/component/reusable/header/Header';
import LessonandHomeworkPlanner from './src/screens/teacher/lessonandhomeworkplannerempty/Lessonandhomeworkplanner';
import NotificationDrawer from './src/component/reusable/notificationdrawer/NotificationDrawer';
import LessonandHomeworkPlannerDashboard from './src/screens/teacher/lessonandhomeworkplannerdashboard/Lessonandhomeworkplannerdashboard';
import PupilLessonEmpty from './src/screens/pupil/pupillessonempty/PupilLessonEmpty';
import PupuilDashboard from './src/screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from './src/screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import TeacherLessonList from './src/screens/teacher/teacherlessonlist/TeacherLessonList';
import TeacherLessonDetail from './src/screens/teacher/teacherlessondetail/TeacherLessonDetail';
import TeacherLessonEmpty from './src/screens/teacher/teacherlessonempty/TeacherLessonEmpty';
import PupilLessonDetail from './src/screens/pupil/pupillessondetail/PupilLessonDetail';
import combineReducers from './src/reducer/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import Route from './src/route/Route'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <MenuProvider>
          <Route />
        </MenuProvider>
      </SafeAreaView>
    </Provider>
  )
}
}

function ScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      {/* <Stack.Screen name="Users" component={Users} /> */}
      {/* <Stack.Screen name="Introduction" component={Introduction} /> */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Popup" component={Popup} /> */}
      {/* <Stack.Screen name="Popupuser" component={Popupuser} /> */}
      {/* <Stack.Screen name="Sidebar" component={Sidebar} /> */}
      {/* <Stack.Screen name="Header" component={Header} /> */}
      {/* <Stack.Screen name="LessonandHomeworkPlanner" component={LessonandHomeworkPlanner} /> */}
      {/* <Stack.Screen name="LessonandHomeworkPlannerDashboard" component={LessonandHomeworkPlannerDashboard} /> */}
      <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} />
      {/* <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} /> */}
      {/* <Stack.Screen name="TeacherLessonEmpty" component={TeacherLessonEmpty} /> */}
      {/* <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} /> */}
      {/* <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetail} />  */}
      {/* <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} /> */}
      {/* <Stack.Screen name="PupilLessonDetail" component={PupilLessonDetail} />  */}
      {/* <Stack.Screen name="PupilLessonEmpty" component={PupilLessonEmpty} /> */}
      {/* <Stack.Screen name="TeacherLessonEmpty" component={TeacherLessonEmpty} /> */}
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <NotificationDrawer {...props} />}
      drawerPosition='right'
      headerMode='none'
      drawerStyle={STYLE.drawerWidth} >
      <Drawer.Screen name="ScreenStack" component={ScreenStack} />
    </Drawer.Navigator>
  );
}
