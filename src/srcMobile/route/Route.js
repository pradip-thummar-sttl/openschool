import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Users from '../screens/users/Users';
import IntroductionPupil from '../screens/introduction/IntroductionPupil';
import IntroductionTeacher from '../screens/introduction/IntroductionTeacher';
import Login from '../screens/login/Login';
import PupilRegister from '../screens/login/PupilRegister';
import PupilVerify from '../screens/login/PupilVerify';
import PupilConnect from '../screens/login/PupilConnect';
// import Popup from '../component/reusable/popup/Popup';
import Popupuser from '../component/reusable/popup/Popupuser';
import Sidebar from '../component/reusable/sidebar/Sidebar';
import SidebarPupil from '../component/reusable/sidebar/Sidebarpupil';
import Header from '../component/reusable/header/Header';
import NotificationDrawer from '../component/reusable/notificationdrawer/NotificationDrawer';
import TeacherDashboard from '../screens/teacher/teacherdashboard/TeacherDashboard';
import PupilManagement from '../screens/teacher/pupilmanagement/PupilManagement';
import PupiloverView from '../screens/teacher/pupilmanagement/PupiloverView';
import PupilProfileView from '../screens/teacher/pupilmanagement/PupilProfileView';
import PupilProfileEdit from '../screens/teacher/pupilmanagement/PupilProfileEdit';
import PupuilDashboard from '../screens/pupil/pupildashboard/Pupildashboard';
import PupuilDashboardHomeWorkState from '../screens/pupil/pupildashboardhomeworkstate/Pupildashboardhomeworkstate';
import TeacherLessonList from '../screens/teacher/teacherlessonlist/TeacherLessonList';
import TeacherLessonDetail from '../screens/teacher/teacherlessondetail/TeacherLessonDetail';
import TeacherLessonEmpty from '../screens/teacher/teachertimetable/TeacherTimetable';
import TeacherTimeTable from '../screens/teacher/teachertimetable/TeacherTimetable';
import ParentZoneSwitch from '../screens/pupil/parentzone/ParentZoneSwitch';
import ParentZonemain from '../screens/pupil/parentzone/ParentZonemain';
import ParentZoneProfile from '../screens/pupil/parentzone/ParentZoneProfile';
import ParentZoneProfileEdit from '../screens/pupil/parentzone/ParentZoneProfileEdit';
import ParentZoneSchoolDetails from '../screens/pupil/parentzone/ParentZoneSchoolDetails';
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
import CreateNewEvent from '../screens/teacher/teachertimetable/createnewevent/CreateNewEvent';
import CreateNewEventPupil from '../screens/pupil/pupiltimetable/createnewevent/CreateNewEventPupil';
import WorkSpace from '../screens/pupil/Workspace/WorkSpace';
import Calendars from '../component/reusable/Calendar/Calendar';
import Setting from '../screens/Setting/Setting';
import teacherSetting from '../screens/teacher/teacherSetting/teacherSetting'
import Message from '../screens/teacher/GlobalMessage/Message';
import NewMessage from '../screens/teacher/GlobalMessage/NewMessage';
import GroupSetUpPupilSelection from '../screens/teacher/pupilmanagement/GroupSetUpPupilSelection';
import Passcode from '../screens/pupil/parentzone/Passcode';
import Chat from '../screens/Chat/Chat';
import ParentChat from '../screens/pupil/parentzone/Chat/ParentChat';

import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import Avatar from '../screens/pupil/Avatar/Avatar';
import ParentZonePerformance from '../screens/pupil/parentzone/ParentZonePerformance';
import Call from '../component/reusable/onetoonecall/Call';
import IntroductionSchool from '../screens/introduction/introductionSchool';
import SchoolDashBoard from '../screens/school/scholldashboard/SchoolDashBoard';
import SchoolSetting from '../screens/school/setting/SchoolSetting';
import SchoolProfileView from '../screens/school/profile/SchoolProfileView';
import SchoolProfileEdit from '../screens/school/profile/SchoolProfileEdit';
import SchoolNewMessage from '../screens/school/globalmessage/SchoolNewMessage';
import SchoolMessage from '../screens/school/globalmessage/SchoolMessage';
import TeacherManagement from '../screens/school/teacherManagament/TeacherManagement';
import TeacherProfileView from '../screens/school/teacherManagament/TeacherProfileView';
import TeacherProfileEdit from '../screens/school/teacherManagament/TeacherProfileEdit';
import AddNewTeacher from '../screens/school/teacherManagament/AddNewTeacher';
import SchoolTeacherLessonDetail from '../screens/school/teacherManagament/teacherlessionDetail/SchoolTeacherLessonDetail';
import TeacheroverView from '../screens/school/pupilmanagement/TeacheroverView';
import SPupilProfileView from '../screens/school/pupilmanagement/SPupilProfileView';
import SAddNewTeacher from '../screens/school/pupilmanagement/SAddNewTeacher';
import SPupilProfileEdit from '../screens/school/pupilmanagement/SPupilProfileEdit';
import SGroupSetUpPupilSelection from '../screens/school/pupilmanagement/SGroupSetUpPupilSelection';
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
            <Stack.Navigator headerMode='none' initialRouteName={'MyDrawerMenu'}>
                <Stack.Screen name="MyDrawer" component={MyDrawer} />
                <Stack.Screen name="MyDrawerMenu" component={MyDrawerMenu} />
                <Stack.Screen name="MyDrawerMenuPupil" component={MyDrawerMenuPupil} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

function ScreenStack() {
    return (
        <PubNubProvider client={pubnubDetail}>
            <Stack.Navigator headerMode='none' initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="IntroductionPupil" component={IntroductionPupil} />
                <Stack.Screen name="IntroductionTeacher" component={IntroductionTeacher} />
                <Stack.Screen name="IntroductionSchool" component={IntroductionSchool} />
                <Stack.Screen name="Users" component={Users} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PupilRegister" component={PupilRegister} />
                <Stack.Screen name="PupilVerify" component={PupilVerify} />
                <Stack.Screen name="PupilConnect" component={PupilConnect} />
                {/* <Stack.Screen name="Popup" component={Popup} /> */}
                <Stack.Screen name="Popupuser" component={Popupuser} />
                <Stack.Screen name="Sidebar" component={Sidebar} />
                <Stack.Screen name="SidebarPupil" component={SidebarPupil} />
                <Stack.Screen name="Header" component={Header} />
                <Stack.Screen name="PupilManagement" component={PupilManagement} />
                <Stack.Screen name="PupiloverView" component={PupiloverView} />
                <Stack.Screen name="PupilProfileView" component={PupilProfileView} />
                <Stack.Screen name="PupilProfileEdit" component={PupilProfileEdit} />
                <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
                <Stack.Screen name="PupuilDashboard" component={PupuilDashboard} />
                <Stack.Screen name="SchoolDashBoard" component={SchoolDashBoard} />
                <Stack.Screen name="PupuilDashboardHomeWorkState" component={PupuilDashboardHomeWorkState} />
                <Stack.Screen name="TeacherTimeTable" component={TeacherTimeTable} />
                <Stack.Screen name="TeacherLessonList" component={TeacherLessonList} />
                <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetail} />
                <Stack.Screen name="PupilLessonDetail" component={PupilLessonDetail} />
                <Stack.Screen name="CreateNewEvent" component={CreateNewEvent} />
                <Stack.Screen name="CreateNewEventPupil" component={CreateNewEventPupil} />
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
                <Stack.Screen name="WorkSpace" component={WorkSpace} />
                <Stack.Screen name="Calendars" component={Calendars} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="TeacherSetting" component={teacherSetting} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="NewMessage" component={NewMessage} />
                <Stack.Screen name="ParentZoneSwitch" component={ParentZoneSwitch} />
                <Stack.Screen name="Passcode" component={Passcode} />
                <Stack.Screen name="ParentZonemain" component={ParentZonemain} />
                <Stack.Screen name="ParentZoneProfile" component={ParentZoneProfile} />
                <Stack.Screen name="ParentZoneProfileEdit" component={ParentZoneProfileEdit} />
                <Stack.Screen name="ParentZoneSchoolDetails" component={ParentZoneSchoolDetails} />
                <Stack.Screen name="GroupSetUpPupilSelection" component={GroupSetUpPupilSelection} />
                <Stack.Screen name="ParentZonePerformance" component={ParentZonePerformance} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="ParentChat" component={ParentChat} />
                <Stack.Screen name="Avatar" component={Avatar} />
                <Stack.Screen name="Call" component={Call} />
                <Stack.Screen name="SchoolSetting" component={SchoolSetting} />
                <Stack.Screen name="SchoolProfileView" component={SchoolProfileView} />
                <Stack.Screen name="SchoolProfileEdit" component={SchoolProfileEdit} />
                <Stack.Screen name="SchoolNewMessage" component={SchoolNewMessage} />
                <Stack.Screen name="SchoolMessage" component={SchoolMessage} />
                <Stack.Screen name="TeacherManagement" component={TeacherManagement} />
                <Stack.Screen name="TeacherProfileView" component={TeacherProfileView} />
                <Stack.Screen name="TeacherProfileEdit" component={TeacherProfileEdit} />
                <Stack.Screen name="AddNewTeacher" component={AddNewTeacher} />
                <Stack.Screen name="SchoolTeacherLessonDetail" component={SchoolTeacherLessonDetail} />
                <Stack.Screen name="TeacheroverView" component={TeacheroverView} />
                <Stack.Screen name="SPupilProfileView" component={SPupilProfileView} />
                <Stack.Screen name="SPupilProfileEdit" component={SPupilProfileEdit} />
                <Stack.Screen name="SAddNewTeacher" component={SAddNewTeacher} />
                <Stack.Screen name="SGroupSetUpPupilSelection" component={SGroupSetUpPupilSelection} />
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
            <Drawer.Screen name="ScreenStack" component={ScreenStack} options={{
                swipeEnabled:false,
            }} />
        </Drawer.Navigator>
    );
}
function MyDrawerMenu() {
    return (
        <Drawer.Navigator
            drawerContent={props => <Sidebar {...props} />}
            drawerPosition='left'
            headerMode='none'
            drawerStyle={STYLE.drawerWidthSidebar} >
            <Drawer.Screen name="ScreenStack" component={ScreenStack} options={{
                swipeEnabled:false,
            }}/>
        </Drawer.Navigator>
    );
}
function MyDrawerMenuPupil() {
    return (
        <Drawer.Navigator
            drawerContent={props => <SidebarPupil {...props} />}
            drawerPosition='left'
            headerMode='none'
            drawerStyle={STYLE.drawerWidthSidebar} >
            <Drawer.Screen name="ScreenStack" component={ScreenStack} />
        </Drawer.Navigator>
    );
}

