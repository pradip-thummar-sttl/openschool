import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Users from '../screens/users/Users';
import IntroductionTeacher from '../screens/introduction/IntroductionTeacher';
import IntroductionPupil from '../screens/introduction/IntroductionPupil';
import Login from '../screens/login/Login';
import PupilRegister from '../screens/login/PupilRegister';
import Popup from '../component/reusable/popup/Popup';
import Popupuser from '../component/reusable/popup/Popupuser';
import Sidebar from '../component/reusable/sidebar/Sidebar';
import Header from '../component/reusable/header/Header';
import NotificationDrawer from '../component/reusable/notificationdrawer/NotificationDrawer';
import TeacherDashboard from '../screens/teacher/teacherdashboard/TeacherDashboard';
import PupilLessonEmpty from '../screens/pupil/pupillessonempty/PupilLessonEmpty';
import PupuilDashboard from '../screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from '../screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import TeacherLessonList from '../screens/teacher/teacherlessonlist/TeacherLessonList';
import TeacherLessonDetail from '../screens/teacher/teacherlessondetail/TeacherLessonDetail';
import TeacherLessonEmpty from '../screens/teacher/teachertimetable/TeacherTimetable';
import TeacherTimeTable from '../screens/teacher/teachertimetable/TeacherTimetable';
import STYLE from '../utils/Style';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../screens/splash/Splash';
import TLDetailEdit from '../screens/teacher/teacherlessondetail/lessonplan/TeacherLessonDetailEdit';
import TLVideoGallery from '../screens/teacher/teacherlessondetail/lessonplan/TeacherLessonVideoGallery';
import TLDetail from '../screens/teacher/teacherlessondetail/lessonplan/TeacherLessonDetail';
// import PupilLessonDetail from '../screens/pupil/pupillessondetail/PupilLessonDetail';
import PupilLessonDetailInternal from '../screens/pupil/pupillessondetail/lesson/PupilLessonDetail';
import PupilHomeWorkMarked from '../screens/pupil/pupillessondetail/homework/PupilHomeWorkMarked';
import PupilHomeWorkDetail from '../screens/pupil/pupillessondetail/homework/PupilHomeWorkDetail';
import TLHomeWorkSubmittedDetail from '../screens/teacher/teacherlessondetail/homeworksubmitted/HWSubmittedDetail';
import TLDetailAdd from '../screens/teacher/teacherlessondetail/lessonplan/TeacherLessonDetailAdd';
import PupilTimetable from '../screens/pupil/pupiltimetable/PupilTimetable';
import PupilLessonDetail from '../screens/pupil/pupillessondetail/PupilLessonDetail';
import PupilHomeWorkSubmitted from '../screens/pupil/pupillessondetail/homework/PupilHomeWorkSubmitted';
import ScreenAndCameraRecording from '../screens/teacher/screenandcamera/ScreenandCamera';
import WorkSpace from '../screens/pupil/Workspace/WorkSpace';
import GroupSetUp from '../screens/teacher/pupilmanagement/GroupSetUp';
import Setting from '../screens/Setting/Setting';
import Message from '../screens/GlobalMessage/Message';
import NewMessage from '../screens/GlobalMessage/NewMessage';
import Passcode from '../screens/Passcode/Passcode';
// import PupilManagement from '../screens/PupilManagement/PupilManagement';
import PupilManagement from '../screens/teacher/pupilmanagement/PupilManagement';
import PupilProfileView from '../screens/teacher/pupilmanagement/PupilProfileView';
import PupilParentZoneProfileEdit from '../screens/pupil/parentzone/PupilParentZoneProfileEdit';
import ParentZoneSwitch from '../screens/pupil/parentzone/ParentZoneSwitch';
import PupiloverView from '../screens/teacher/pupilmanagement/PupiloverView';
import PupilParentZoneProfileConnecttoMySchool from '../screens/pupil/parentzone/PupilParentZoneProfileConnecttoMySchool';
import PupilParentZoneProfile from '../screens/pupil/parentzone/PupilParentZoneProfile';
import PupilParentZoneNewsFeed from '../screens/pupil/parentzone/PupilParentZoneNewsFeed';

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
            <Stack.Screen name="IntroductionTeacher" component={IntroductionTeacher} />
            <Stack.Screen name="IntroductionPupil" component={IntroductionPupil} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PupilRegister" component={PupilRegister} />
            <Stack.Screen name="Popup" component={Popup} />
            <Stack.Screen name="Popupuser" component={Popupuser} />
            <Stack.Screen name="Sidebar" component={Sidebar} />
            <Stack.Screen name="Header" component={Header} />
            <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
            <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} />
            <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} />
            <Stack.Screen name="TeacherTimeTable" component={TeacherTimeTable} />
            <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} />
            <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetail} />
            <Stack.Screen name="PupilLessonDetail" component={PupilLessonDetail} />
            {/* <Stack.Screen name="PupilLessonEmpty" component={PupilLessonEmpty} /> */}
            <Stack.Screen name="PupilTimetable" component={PupilTimetable} />
            <Stack.Screen name="TLDetailEdit" component={TLDetailEdit} />
            <Stack.Screen name="TLDetail" component={TLDetail} />
            <Stack.Screen name="PupilLessonDetailInternal" component={PupilLessonDetailInternal} />
            <Stack.Screen name="PupilHomeWorkMarked" component={PupilHomeWorkMarked} />
            <Stack.Screen name="PupilHomeWorkSubmitted" component={PupilHomeWorkSubmitted} />
            <Stack.Screen name="PupilHomeWorkDetail" component={PupilHomeWorkDetail} />
            {/* <Stack.Screen name="TeacherLessonEmpty" component={TeacherLessonEmpty} /> */}
            <Stack.Screen name="TLDetailAdd" component={TLDetailAdd} />
            <Stack.Screen name="TLVideoGallery" component={TLVideoGallery} />
            <Stack.Screen name="TLHomeWorkSubmittedDetail" component={TLHomeWorkSubmittedDetail} />
            <Stack.Screen name="ScreenAndCameraRecording" component={ScreenAndCameraRecording} />
            <Stack.Screen name="WorkSpace" component={WorkSpace} />
            <Stack.Screen name="GroupSetUp" component={GroupSetUp} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Message" component={Message} />
            <Stack.Screen name="NewMessage" component={NewMessage} />
            <Stack.Screen name="Passcode" component={Passcode} />
            {/* <Stack.Screen name="PupilManagement" component={PupilManagement} /> */}

            <Stack.Screen name="PupiloverView" component={PupiloverView} />
            <Stack.Screen name="PupilManagement" component={PupilManagement} />
            <Stack.Screen name="PupilProfileView" component={PupilProfileView} />
            <Stack.Screen name="PupilParentZoneProfileEdit" component={PupilParentZoneProfileEdit} />
            <Stack.Screen name="ParentZoneSwitch" component={ParentZoneSwitch} />
            <Stack.Screen name="PupilParentZoneProfileConnecttoMySchool" component={PupilParentZoneProfileConnecttoMySchool} />
            <Stack.Screen name="PupilParentZoneProfile" component={PupilParentZoneProfile} />
            <Stack.Screen name="PupilParentZoneNewsFeed" component={PupilParentZoneNewsFeed} />
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

