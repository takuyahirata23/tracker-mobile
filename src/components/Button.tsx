import React from 'react'
import { Pressable } from 'react-native'

import classNames from '~/functions/classNames'
import Text from '~/components/Text'

export type Props = {
  children: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
}

const style = {
  primary: 'bg-btn-primary',
  secondary: 'bg-btn-secondary',
}

export default function Button({
  children,
  onPress,
  variant = 'primary',
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={classNames('block p-2 rounded-md', style[variant])}
    >
      <Text classOverride="text-center text-lg">{children}</Text>
    </Pressable>
  )
}
