import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '~/screens/Welcome'
import SignUpScreen from '~/screens/SignUpScreen'

export type AuthStackPramList = {
  Welcome: undefined
  SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthStackPramList>()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
