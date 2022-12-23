import {
  validateMinLength,
  validateMaxLength,
  isEmail,
  areOnlyNumbers,
  validateSignUpForm,
  validateLapTimeForm,
} from '../validations'

describe('validateMinLength', () => {
  test('should validate min length', () => {
    expect(validateMinLength()('')).toBe(false)
    expect(validateMinLength()(' ')).toBe(false)
    expect(validateMinLength()('hello ')).toBe(true)
  })

  test('should validate length with fixed value', () => {
    expect(validateMinLength(2)('a')).toBe(false)
    expect(validateMinLength(3)('as   ')).toBe(false)
    expect(validateMinLength(5)(' cad ')).toBe(false)

    expect(validateMinLength(2)('canada')).toBe(true)
    expect(validateMinLength(2)('CA')).toBe(true)
  })
})

describe('validateMaxLength', () => {
  test('should validate max length', () => {
    expect(validateMaxLength()('')).toBe(true)
    expect(validateMaxLength()(' ')).toBe(true)
    expect(validateMaxLength()('hello ')).toBe(false)
  })

  test('should validate length with fixed value', () => {
    expect(validateMaxLength(2)('a')).toBe(true)
    expect(validateMaxLength(3)('aa a ')).toBe(false)
    expect(validateMaxLength(5)(' cad ')).toBe(true)

    expect(validateMaxLength(2)('canada')).toBe(false)
    expect(validateMaxLength(2)('CA')).toBe(true)
  })
})

describe('areOnlyNumbers', () => {
  test.each([['as'], ['0s0'], ['00s'], ['a00']])(
    'should return false when value contains non digit',
    x => {
      expect(areOnlyNumbers(x)).toBe(false)
    }
  )

  test.each([['0'], ['123'], ['012390']])(
    'should return true when value are only digits',
    x => {
      expect(areOnlyNumbers(x)).toBe(true)
    }
  )
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
  test('should return object with "{isValid: false}" when some values are not valid', () => {
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

describe('validateLapTimeForm', () => {
  test.only('should return "isValid: true" when all values are valid', () => {
    expect(
      validateLapTimeForm({ minutes: '0', seconds: '59', miliseconds: '590' })
    ).toEqual({
      isValid: true,
    })
  })

  test.only('should return "isValid: false" when some values are invalid', () => {
    expect(
      validateLapTimeForm({ minutes: '', seconds: '60', miliseconds: '23' })
    ).toEqual({
      isValid: false,
      minutes: 'validationErroMessages.minutes',
      seconds: 'validationErroMessages.seconds',
      miliseconds: 'validationErroMessages.miliseconds',
    })
  })
})
