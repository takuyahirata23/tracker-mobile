import React from 'react'

import AuthScreen from '~/screens/AuthScreen'
import BottomTabNavigator from '~/navigations/BottomTabNavigator'

export default function Router() {
  const isAuthenticated = false
  return isAuthenticated ? <BottomTabNavigator /> : <AuthScreen />
}
