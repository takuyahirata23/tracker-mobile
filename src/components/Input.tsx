import React from 'react'
import { Input as NBInput, VStack } from 'native-base'

import Text from './Text'

import type { TextInputProps } from 'react-native'

type InputProps = {
  error: string
} & TextInputProps

function Input({ error, ...rest }: InputProps, ref: any) {
  return (
    <VStack>
      <NBInput
        ref={ref}
        variant="filled"
        borderWidth={0}
        placeholderTextColor="secondary.500"
        backgroundColor="btn-secondary.500"
        height={12}
        color="primary.500"
        {...rest}
      />
      {error && (
        <Text fontSize="sm" color="tertiary.500">
          {error}
        </Text>
      )}
    </VStack>
  )
}

export default React.forwardRef(Input)
