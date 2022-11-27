import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import BottomTabNavigator from '~/navigations/BottomTabNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
