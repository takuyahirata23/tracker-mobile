import React from 'react'
import { Text as T } from 'native-base'

import type { ITextProps } from 'native-base'

export type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  type?: 'heading' | 'body'
} & ITextProps

export default function Text({
  children,
  variant = 'primary',
  type = 'body',
  ...rest
}: Props) {
  const isBody = type === 'body'
  return (
    <T
      color={`[${variant}].500`}
      fontSize={isBody ? 'lg' : '3xl'}
      fontWeight={isBody ? 'normal' : 'bold'}
      {...rest}
    >
      {children}
    </T>
  )
}
