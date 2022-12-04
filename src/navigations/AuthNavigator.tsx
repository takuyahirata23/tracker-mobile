import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '~/screens/Welcome'
import SignUp from '~/screens/Auth/SignUp'
import Login from '~/screens/Auth/Login'

export type AuthStackPramList = {
  Welcome: undefined
  SignUp: undefined
  Login: undefined
}

const Stack = createNativeStackNavigator<AuthStackPramList>()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}
