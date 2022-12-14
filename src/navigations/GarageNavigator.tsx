import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToken } from 'native-base'

import Motorcycles from '~/screens/Garage/Motorcycles'
import NewMotorcycle from '~/screens/Garage/NewMotorcycle'

export type GarageStackparmList = {
  Motorcycles: undefined
  NewMotorcycle: undefined
}

const Stack = createNativeStackNavigator<GarageStackparmList>()

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
      <Stack.Screen name="Motorcycles" component={Motorcycles} />
      <Stack.Screen name="NewMotorcycle" component={NewMotorcycle} />
    </Stack.Navigator>
  )
}
