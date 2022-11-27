import React from 'react'
import { Text, Pressable } from 'react-native'

type Props = {
  children: string
}

export default function Button({ children }: Props) {
  return (
    <Pressable className="px-2 py-1">
      <Text>{children}</Text>
    </Pressable>
  )
}
