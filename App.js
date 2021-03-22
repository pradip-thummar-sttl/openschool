import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import Route from './src/route/Route'
import { View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MenuProvider>
          <Route />
        </MenuProvider>
      </View>
    </Provider>
  )
}
