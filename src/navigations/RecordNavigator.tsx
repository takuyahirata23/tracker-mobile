import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToken } from 'native-base'

import MyTracks from '~/screens/Record/MyTracks'
import Tracks from '~/screens/Record/Tracks'
import Track from '~/screens/Record/Track'
import LapTimeForm from '~/screens/Record/LapTimeFrom'

export type RecordStackparmList = {
  MyTracks: undefined
  Tracks: undefined
  Track: { myTrackId: string; title: string }
  LapTimeForm: { myTrackId: string; title: string }
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
      <Stack.Screen name="MyTracks" component={MyTracks} />
      <Stack.Screen name="Tracks" component={Tracks} />
      <Stack.Screen
        name="Track"
        component={Track}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="LapTimeForm" component={LapTimeForm} />
    </Stack.Navigator>
  )
}
