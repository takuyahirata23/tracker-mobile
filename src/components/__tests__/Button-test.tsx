import React from 'react'
import { render, fireEvent } from '~/utils/test-utils'

import Button from '../Button'
import type { Props } from '../Button'

const onPress = jest.fn()

beforeEach(jest.clearAllMocks)

const renderEl = (props: Omit<Props, 'onPress' | 'children'> = {}) =>
  render(
    <Button loadingText="Loading" onPress={onPress} {...props}>
      Here
    </Button>
  )

describe('Button', () => {
  test('should render button text', () => {
    const { getByText } = renderEl({ disabled: true })
    expect(getByText('Here')).toBeDefined()
  })

  test('should render loading text', () => {
    const { getByText } = renderEl({ isLoading: true, disabled: true })
    expect(getByText('Loading')).toBeDefined()
  })

  test('should be pressable when "isLoading" is false', () => {
    const { getByText } = renderEl({ isLoading: false })
    fireEvent(getByText('Here'), 'onPress')

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  test('should be pressable when "isLoading" is true', () => {
    const { getByText } = renderEl({ isLoading: true })
    fireEvent(getByText('Loading'), 'onPress')

    expect(onPress).toHaveBeenCalledTimes(0)
  })
})
