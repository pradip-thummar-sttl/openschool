import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import RouteTablet from './src/route/Route'
import RouteMobile from './srcmobile/route/Route'
import { LogBox, View } from 'react-native';

LogBox.ignoreAllLogs();
import { isTablet } from 'react-native-device-info';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MenuProvider>
          {isTablet() ?
            <RouteTablet />:
            <RouteMobile />
          }          
        </MenuProvider>
      </View>
    </Provider>
  )
}
