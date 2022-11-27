import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="bg-bg-primary flex-1"
      edges={['top', 'right', 'left', 'bottom']}
    >
      <Text className="text-secondary text-3xl">Hello</Text>
    </SafeAreaView>
  )
}
