import React from 'react'
import { Text as T } from 'react-native'

import classNames from '~/functions/classNames'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  classOverride?: string
}

const style = {
  primary: 'text-primary font-bold text-2xl',
  secondary: 'text-secondary text-lg',
  tertiary: 'text-tertiary',
}

export default function Text({
  children,
  variant = 'primary',
  classOverride = '',
}: Props) {
  return <T className={classNames(style[variant], classOverride)}>{children}</T>
}
