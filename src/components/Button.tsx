import React from 'react'
import { Pressable, Spinner, HStack, Box } from 'native-base'

import Text from './Text'

import type { IBoxProps } from 'native-base'
import type { Props as TextProps } from './Text'

export type Props = {
  children: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  loadingText?: string
  disabled?: boolean
  TextProps?: Omit<TextProps, 'children'>
} & IBoxProps

export default function Button({
  children,
  onPress,
  variant = 'primary',
  isLoading = false,
  loadingText = '',
  disabled,
  TextProps = {},
  ...rest
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={typeof disabled === 'boolean' ? disabled : isLoading}
    >
      {({ isPressed }) => (
        <Box
          p={2}
          bgColor={`btn-${variant}.500`}
          opacity={isPressed ? 0.85 : 1}
          borderRadius={6}
          {...rest}
        >
          {isLoading ? (
            <HStack space={2} justifyContent="center">
              <Spinner color="bg-primary.500" />
              <Text textAlign="center" {...TextProps}>
                {loadingText}
              </Text>
            </HStack>
          ) : (
            <Text textAlign="center" {...TextProps}>
              {children}
            </Text>
          )}
        </Box>
      )}
    </Pressable>
  )
}
