import { validateLength, isEmail } from '../validations'

describe('validateLength', () => {
  test('should validate length', () => {
    expect(validateLength('')).toBe(false)
    expect(validateLength(' ')).toBe(false)
    expect(validateLength('hello ')).toBe(true)
  })

  test('should validate length with fixed value', () => {
    expect(validateLength('a', 1)).toBe(false)
    expect(validateLength('a ', 1)).toBe(false)
    expect(validateLength(' cad ', 5)).toBe(false)

    expect(validateLength('canada', 2)).toBe(true)
    expect(validateLength('CA', 1)).toBe(true)
  })
})

describe('should validate email', () => {
  test('should return false when "@" is not included', () => {
    expect(isEmail('jon-doe')).toBe(false)
    expect(isEmail('')).toBe(false)
  })

  test('should return true when value has "@"', () => {
    expect(isEmail('jon-doe@test.com')).toBe(true)
    expect(isEmail('a@a')).toBe(true)
  })
})
