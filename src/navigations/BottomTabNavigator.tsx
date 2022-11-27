import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '~/screens/HomeScreen'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
    </BottomTab.Navigator>
  )
}
