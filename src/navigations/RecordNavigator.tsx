import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToken } from 'native-base'

import Tracks from '~/screens/Record/Tracks'
import NewTrack from '~/screens/Record/NewTrack'

export type RecordStackparmList = {
  Tracks: undefined
  NewTrack: undefined
}

const Stack = createNativeStackNavigator<RecordStackparmList>()

export default function GarageNavigator() {
  const [color, background] = useToken('colors', [
    'primary.500',
    'bg-secondary.500',
  ])
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: color,
        headerStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Stack.Screen name="Tracks" component={Tracks} />
      <Stack.Screen name="NewTrack" component={NewTrack} />
    </Stack.Navigator>
  )
}
