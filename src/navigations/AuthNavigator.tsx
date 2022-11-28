import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen from '~/screens/WelcomeScreen'
import SignUpScreen from '~/screens/SignUpScreen'

export type AuthStackPramList = {
  Welcome: undefined
  SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthStackPramList>()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
