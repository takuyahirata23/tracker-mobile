import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToken } from 'native-base'

import Vehicles from '~/screens/Garage/Vehicles'
import NewVehicle from '~/screens/Garage/NewVehicle'

export type GarageStackparmList = {
  Vehicles: undefined
  NewVehicle: undefined
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
      <Stack.Screen name="Vehicles" component={Vehicles} />
      <Stack.Screen name="NewVehicle" component={NewVehicle} />
    </Stack.Navigator>
  )
}
