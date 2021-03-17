import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import NotificationDrawer from './src/component/reusable/notificationdrawer/NotificationDrawer';
import PupuilDashboard from './src/screens/pupil/pupildashboard/Pupildashboard';
import combineReducers from './src/reducer/index';
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

function ScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen name="Users" component={Users} />
      {/* <Stack.Screen name="Introduction" component={Introduction} /> */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Popup" component={Popup} /> */}
      {/* <Stack.Screen name="Popupuser" component={Popupuser} /> */}
      {/* <Stack.Screen name="Sidebar" component={Sidebar} /> */}
      {/* <Stack.Screen name="Header" component={Header} /> */}
      {/* <Stack.Screen name="LessonandHomeworkPlanner" component={LessonandHomeworkPlanner} /> */}
      {/* <Stack.Screen name="LessonandHomeworkPlannerDashboard" component={LessonandHomeworkPlannerDashboard} /> */}
      {/* <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} /> */}
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