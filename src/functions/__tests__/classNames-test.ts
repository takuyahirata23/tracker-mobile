import classNames from '../classNames'

describe('classNmaes', () => {
  test('should generate className', () => {
    expect(classNames('hello', 'world')).toBe('hello world')
  })

  test('should trim spaces unneeded', () => {
    expect(classNames('hello', '')).toBe('hello')
  })
})
