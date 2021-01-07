/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './src/reducer/index'

const store = createStore(combineReducers)

import { Text, View } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text> textInComponent </Text>
        </View>
      </Provider>
    )
  }
}




