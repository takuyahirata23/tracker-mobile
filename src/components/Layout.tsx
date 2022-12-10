import React from 'react'
import { VStack, IBoxProps } from 'native-base'

type Props = {
  children: React.ReactNode
} & IBoxProps

export default function Layout({ children, ...rest }: Props) {
  return (
    <VStack flex={1} p={4} bgColor="bg-primary.500" {...rest}>
      {children}
    </VStack>
  )
}
