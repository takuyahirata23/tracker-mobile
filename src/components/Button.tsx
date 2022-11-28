import React from 'react'
import { Pressable } from 'react-native'

import classNames from '~/functions/classNames'
import Text from '~/components/Text'

export type Props = {
  children: string
  variant?: 'primary' | 'secondary'
}

const style = {
  primary: 'bg-btn-primary',
  secondary: 'bg-btn-secondary',
}

export default function Button({ children, variant = 'primary' }: Props) {
  return (
    <Pressable className={classNames('p-2 w-full rounded-md', style[variant])}>
      <Text classOverride="text-center text-lg">{children}</Text>
    </Pressable>
  )
}
