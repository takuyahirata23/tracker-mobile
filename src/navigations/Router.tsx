import React from 'react'

import AuthNavigator from '~/navigations/AuthNavigator'
import BottomTabNavigator from '~/navigations/BottomTabNavigator'

export default function Router() {
  const isAuthenticated = false
  return isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />
}
