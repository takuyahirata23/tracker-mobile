import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'

import Button from './src/components/Button'

export default function App() {
  return (
    <SafeAreaView className="bg-bg-primary border-2 flex-1">
      <StatusBar barStyle="light-content" />
      <Text className="font-bold text-2xl text-primary">here</Text>
      <Button>Here</Button>
    </SafeAreaView>
  )
}
