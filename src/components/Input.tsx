import React from 'react'
import { Input as NBInput, VStack } from 'native-base'

import Text from './Text'

import type { TextInputProps } from 'react-native'

type InputProps = {
  error?: string
} & TextInputProps

export default function Input({ error, ...rest }: InputProps) {
  return (
    <VStack>
      <NBInput
        variant="filled"
        borderWidth={0}
        placeholderTextColor="secondary.500"
        backgroundColor="btn-secondary.500"
        cursorColor="primary.500"
        selectionColor="white"
        textDecorationColor="white"
        height={12}
        textAlign="left"
        color="primary.500"
        {...rest}
      />
      {error && <Text color="tertiary.500">{error}</Text>}
    </VStack>
  )
}
