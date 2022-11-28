import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
  classOverride?: string
}

export default function Layout({ children, classOverride = '' }: Props) {
  return (
    <SafeAreaView
      className={['bg-bg-primary flex-1 p-6', classOverride].join(' ')}
      edges={['top', 'right', 'left', 'bottom']}
    >
      {children}
    </SafeAreaView>
  )
}
