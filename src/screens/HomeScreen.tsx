import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'urql'

import { Text } from 'react-native'

const UserQuery = `
query {
  user{
    id
    name
    email
  }
}
`

export default function HomeScreen() {
  const [res] = useQuery({ query: UserQuery })
  console.log(res)
  return (
    <SafeAreaView
      className="bg-bg-primary flex-1"
      edges={['top', 'right', 'left', 'bottom']}
    >
      <Text className="text-secondary text-3xl">Hello!</Text>
    </SafeAreaView>
  )
}
