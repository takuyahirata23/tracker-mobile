import React from 'react'
import { Pressable } from 'native-base'

import Text from './Text'

import { Props as TextProps } from './Text'

export type Props = {
  children: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  TextProps?: Omit<TextProps, 'children'>
}

export default function Button({
  children,
  onPress,
  variant = 'primary',
  TextProps = {},
  ...rest
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      p={2}
      borderRadius={6}
      bgColor={`btn-${variant}.500`}
      {...rest}
    >
      <Text textAlign="center" {...TextProps}>
        {children}
      </Text>
    </Pressable>
  )
}
