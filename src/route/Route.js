import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Users from '../screens/users/Users';
import Introduction from '../screens/introduction/Introduction';
import Login from '../screens/login/Login';
import Popup from '../component/reusable/popup/Popup';
import Popupuser from '../component/reusable/popup/Popupuser';
import Sidebar from '../component/reusable/sidebar/Sidebar';
import Header from '../component/reusable/header/Header';
import LessonandHomeworkPlanner from '../screens/teacher/lessonandhomeworkplannerempty/Lessonandhomeworkplanner';
import NotificationDrawer from '../component/reusable/notificationdrawer/NotificationDrawer';
import LessonandHomeworkPlannerDashboard from '../screens/teacher/lessonandhomeworkplannerdashboard/Lessonandhomeworkplannerdashboard';
import PupilLessonEmpty from '../screens/pupil/pupillessonempty/PupilLessonEmpty';
import PupuilDashboard from '../screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from '../screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import TeacherLessonList from '../screens/teacher/teacherlessonlist/TeacherLessonList';
import TeacherLessonDetail from '../screens/teacher/teacherlessondetail/TeacherLessonDetail';
import TeacherLessonEmpty from '../screens/teacher/teacherlessonempty/TeacherLessonEmpty';
import PupilLessonDetail from '../screens/pupil/pupillessondetail/PupilLessonDetail';
import STYLE from '../utils/Style';

import { MenuProvider } from 'react-native-popup-menu';
import combineReducers from '../reducer/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../screens/splash/Splash';
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

export default function Route() {
    return (

        <NavigationContainer drawerPosition='right'>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="MyDrawer" component={MyDrawer} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

function ScreenStack() {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="Introduction" component={Introduction} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Popup" component={Popup} />
            <Stack.Screen name="Popupuser" component={Popupuser} />
            <Stack.Screen name="Sidebar" component={Sidebar} />
            <Stack.Screen name="Header" component={Header} />
            <Stack.Screen name="LessonandHomeworkPlanner" component={LessonandHomeworkPlanner} />
            <Stack.Screen name="LessonandHomeworkPlannerDashboard" component={LessonandHomeworkPlannerDashboard} />
            <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} /> 
            <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} />
            <Stack.Screen name="TeacherLessonEmpty" component={TeacherLessonEmpty} />
            <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} />
            <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetail} />
            {/* <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} /> */}
            <Stack.Screen name="PupilLessonDetail" component={PupilLessonDetail} />
            <Stack.Screen name="PupilLessonEmpty" component={PupilLessonEmpty} />
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

