import React from 'react'
import { Text, Pressable } from 'react-native'

export type Props = {
  children: string
}

export default function Button({ children }: Props) {
  return (
    <Pressable className="px-2 py-1">
      <Text className="text-secondary">{children}</Text>
    </Pressable>
  )
}
