import { hasValidLength, isEmail, validateSignUpForm } from '../validations'

describe('hasValidLength', () => {
  test('should validate length', () => {
    expect(hasValidLength()('')).toBe(false)
    expect(hasValidLength()(' ')).toBe(false)
    expect(hasValidLength()('hello ')).toBe(true)
  })

  test('should validate length with fixed value', () => {
    expect(hasValidLength(2)('a')).toBe(false)
    expect(hasValidLength(3)('as   ')).toBe(false)
    expect(hasValidLength(5)(' cad ')).toBe(false)

    expect(hasValidLength(2)('canada')).toBe(true)
    expect(hasValidLength(2)('CA')).toBe(true)
  })
})

describe('should validate email', () => {
  test('should return false when "@" is not included', () => {
    expect(isEmail('jon-doe')).toBe(false)
    expect(isEmail('')).toBe(false)
  })

  test('should return true when value has "@"', () => {
    expect(isEmail('jon-doe@test.com')).toBe(true)
    expect(isEmail('a@a.ca')).toBe(true)
  })
})

describe('validateSignUpForm', () => {
  test('should return  when all values are valid', () => {
    expect(
      validateSignUpForm({
        name: '',
        username: 'donjoe23',
        email: 'invalid-email',
        password: 'bestPassword!',
      })
    ).toEqual(
      expect.objectContaining({
        isValid: false,
        name: 'validationErroMessages.name',
        email: 'validationErroMessages.email',
      })
    )
  })

  test('should return object with "{isValid: true}" when all values are valid', () => {
    expect(
      validateSignUpForm({
        name: 'Don Joe',
        username: 'donjoe23',
        email: 'donjoe@test.com',
        password: 'bestPassword!',
      })
    ).toEqual(expect.objectContaining({ isValid: true }))
  })
})
