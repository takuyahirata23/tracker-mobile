import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, extendTheme } from 'native-base'

import Router from '~/navigations/Router'

const theme = extendTheme({
  colors: {
    primary: {
      500: '#ffffff',
    },
    socondary: {
      500: '#94a3b8',
    },
    tertiary: {
      500: '#0ea4e9',
    },
    'bg-primary': {
      500: '#0f172a',
    },
    'bg-secondary': {
      500: '#1e293b',
    },
    'btn-primary': {
      500: '#0ea5e9',
    },
    'btn-secondary': {
      500: '#334155',
    },
  },
})

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
