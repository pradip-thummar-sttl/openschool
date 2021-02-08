import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import IntroductionActivity from './src/component/teacher/Introduction';

import combineReducers from './src/reducer/index'

const store = createStore(combineReducers)
const Stack = createStackNavigator()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen name="Home" component={IntroductionActivity} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    )
  }
}
