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
import combineReducers from './src/reducer/index';

const store = createStore(combineReducers)
const Stack = createStackNavigator()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
              {/* <Stack.Screen name="Splash" component={Splash} /> */}
              {/* <Stack.Screen name="Users" component={Users} /> */}
              {/* <Stack.Screen name="Introduction" component={Introduction} /> */}
              {/* <Stack.Screen name="Login" component={Login} /> */}
              {/* <Stack.Screen name="Popup" component={Popup} /> */}
              {/* <Stack.Screen name="Popupuser" component={Popupuser} /> */}
              <Stack.Screen name="Sidebar" component={Sidebar} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    )
  }
}