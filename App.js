import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import Route from './src/route/Route'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

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
