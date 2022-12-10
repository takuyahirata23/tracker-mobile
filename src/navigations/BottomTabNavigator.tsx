import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, User, Tool, Activity } from 'react-native-feather'
import { useToken } from 'native-base'

import checkOS from '~/procedures/checkOS'
import HomeScreen from '~/screens/HomeScreen'
import ProfileScreen from '~/screens/ProfileScreen'
import GarageNavigator from '~/navigations/GarageNavigator'
import RecordNavigator from '~/navigations/RecordNavigator'

const BottomTab = createBottomTabNavigator()

const isIos = checkOS()

export default function BottomTabNavigator() {
  const [label, background] = useToken('colors', [
    'primary.500',
    'bg-secondary.500',
  ])

  return (
    <BottomTab.Navigator
      safeAreaInsets={{
        bottom: isIos ? undefined : 10,
      }}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: label,
        },
        tabBarStyle: {
          backgroundColor: background,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Home width={30} stroke="#0ea4e9" /> }}
      />
      <BottomTab.Screen
        name="Garage"
        component={GarageNavigator}
        options={{ tabBarIcon: () => <Tool width={30} stroke="#0ea4e9" /> }}
      />
      <BottomTab.Screen
        name="Record"
        component={RecordNavigator}
        options={{ tabBarIcon: () => <Activity width={30} stroke="#0ea4e9" /> }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <User width={30} stroke="#0ea4e9" /> }}
      />
    </BottomTab.Navigator>
  )
}
