import React from 'react'
import { render } from 'test-utils'

import Button from '../Button'

describe('Button', () => {
  test('should render text', () => {
    const { getByText } = render(<Button>Here</Button>)
    expect(getByText('Here')).toBeDefined()
  })
})
