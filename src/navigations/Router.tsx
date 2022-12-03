import React from 'react'

import { useAppSelector } from './../hooks/reduxAppHooks'
import AuthNavigator from '~/navigations/AuthNavigator'
import BottomTabNavigator from '~/navigations/BottomTabNavigator'

export default function Router() {
  const token = useAppSelector(state => state.auth.token)

  return token ? <BottomTabNavigator /> : <AuthNavigator />
}
