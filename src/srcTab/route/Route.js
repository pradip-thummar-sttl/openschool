import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Users from '../screens/users/Users';
import IntroductionTeacher from '../screens/introduction/IntroductionTeacher';
import IntroductionPupil from '../screens/introduction/IntroductionPupil';
import IntroductionSchool from '../screens/introduction/IntroductionSchool';
import Login from '../screens/login/Login';
import PupilRegister from '../screens/login/PupilRegister';
import PupilConnect from '../screens/login/PupilConnect';
import Popup from '../component/reusable/popup/Popup';
import Popupuser from '../component/reusable/popup/Popupuser';
import Sidebar from '../component/reusable/sidebar/Sidebar';
import Header from '../component/reusable/header/Header';
import NotificationDrawer from '../component/reusable/notificationdrawer/NotificationDrawer';
import TeacherDashboard from '../screens/teacher/teacherdashboard/TeacherDashboard';
import SchoolDashboard from '../screens/school/schooldashboard/SchoolDashboard';
import PupilLessonEmpty from '../screens/pupil/pupillessonempty/PupilLessonEmpty';
import PupuilDashboard from '../screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from '../screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import TeacherLessonList from '../screens/teacher/teacherlessonlist/TeacherLessonList';
import TeacherLessonDetail from '../screens/teacher/teacherlessondetail/TeacherLessonDetail';
import TeacherLessonEmpty from '../screens/teacher/teachertimetable/TeacherTimetable';
import TeacherTimeTable from '../screens/teacher/teachertimetable/TeacherTimetable';
import STYLE from '../../utils/Style';

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
import Message from '../screens/teacher/GlobalMessage/Message';
import NewMessage from '../screens/teacher/GlobalMessage/NewMessage';
import Passcode from '../screens/pupil/parentzone/Passcode';
// import PupilManagement from '../screens/PupilManagement/PupilManagement';
import PupilManagement from '../screens/teacher/pupilmanagement/PupilManagement';
import PupilProfileView from '../screens/teacher/pupilmanagement/PupilProfileView';
import ParentZoneProfileEdit from '../screens/pupil/parentzone/ParentZoneProfileEdit';
import ParentZoneSwitch from '../screens/pupil/parentzone/ParentZoneSwitch';
import Chat from '../screens/Chat/Chat';
import ParentChat from '../screens/pupil/parentzone/Chat/ParentChat';
import PupiloverView from '../screens/teacher/pupilmanagement/PupiloverView';
import ParentZoneSchoolDetails from '../screens/pupil/parentzone/ParentZoneSchoolDetails';
import ParentZoneProfile from '../screens/pupil/parentzone/ParentZoneProfile';
import ParentZonemain from '../screens/pupil/parentzone/ParentZonemain';
import ParentZonePerformance from '../screens/pupil/parentzone/ParentZonePerformance';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import Avatar from '../screens/pupil/Avatar/Avatar';
import Call from '../component/reusable/onetoonecall/Call';
import SchoolMessage from '../screens/school/globalmessage/SchoolMessage';
import SchoolNewMessage from '../screens/school/globalmessage/SchoolNewMessage';
import SchoolSetting from '../screens/school/setting/SchoolSetting';
import TeacherManagement from '../screens/school/teachermanagement/TeacherManagement';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();


const pubnubDetail = new PubNub({
    publishKey: 'pub-c-bd967178-53ea-4b05-954a-2666bb3b6337',
    subscribeKey: 'sub-c-3d3bcd76-c8e7-11eb-bdc5-4e51a9db8267',
    uuid: 'myUniqueUUID'
});
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
        <PubNubProvider client={pubnubDetail}>
            <Stack.Navigator headerMode='none' initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Users" component={Users} />
                <Stack.Screen name="IntroductionTeacher" component={IntroductionTeacher} />
                <Stack.Screen name="IntroductionPupil" component={IntroductionPupil} />
                <Stack.Screen name="IntroductionSchool" component={IntroductionSchool} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PupilRegister" component={PupilRegister} />
                <Stack.Screen name="PupilConnect" component={PupilConnect} />
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
                <Stack.Screen name="ParentZoneProfileEdit" component={ParentZoneProfileEdit} />
                <Stack.Screen name="ParentZoneSwitch" component={ParentZoneSwitch} />
                <Stack.Screen name="ParentZoneSchoolDetails" component={ParentZoneSchoolDetails} />
                <Stack.Screen name="ParentZoneProfile" component={ParentZoneProfile} />
                <Stack.Screen name="ParentZonemain" component={ParentZonemain} />
                <Stack.Screen name="ParentZonePerformance" component={ParentZonePerformance} />

                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="ParentChat" component={ParentChat} />
                <Stack.Screen name="Avatar" component={Avatar} />
                <Stack.Screen name="Call" component={Call} />

                <Stack.Screen name="SchoolDashboard" component={SchoolDashboard} />
                <Stack.Screen name="SchoolSetting" component={SchoolSetting} />
                <Stack.Screen name="SchoolMessage" component={SchoolMessage} />
                <Stack.Screen name="SchoolNewMessage" component={SchoolNewMessage} />
                <Stack.Screen name="TeacherManagement" component={TeacherManagement} />
                <Stack.Screen name="NotificationDrawer" component={NotificationDrawer} />

            </Stack.Navigator>
        </PubNubProvider>
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

