import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTabNavigator from '~/navigations/BottomTabNavigator'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
