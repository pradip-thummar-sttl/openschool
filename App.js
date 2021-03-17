import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import NotificationDrawer from './src/component/reusable/notificationdrawer/NotificationDrawer';
import PupuilDashboard from './src/screens/pupil/pupildashboard/Pupildashboard';
import combineReducers from './src/reducer/index';
import { MenuProvider } from 'react-native-popup-menu';
const store = createStore(combineReducers)


import Route from './src/route/Route'

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



