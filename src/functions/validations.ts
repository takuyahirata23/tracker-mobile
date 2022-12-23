import { Predicate } from 'fts-utils'
import { reduce, lte, gte, compose, prop } from 'ramda'

import type { Predicate as P } from 'fts-utils'

type Predicates = { [key: string]: P }
type Form = { [key: string]: string }

const digitsRegex = /^\d+$/

export const areOnlyNumbers = (x: string) => digitsRegex.test(x)

export const validateMinLength =
  (minLength: number = 1) =>
  (x: string) => {
    return x.trim().length >= minLength
  }

export const validateMaxLength =
  (maxLength: number = 1) =>
  (x: string) => {
    return x.trim().length <= maxLength
  }

export const isNumberString = (x: string) => x.match(/\d/)

export const isEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const predicateWithMinimumLengthValidation = (x: number) =>
  Predicate(validateMinLength(x))

export const predicateWithMaxLengthValidation = (x: number) =>
  Predicate(validateMinLength(x))

const signUpVlidations = {
  name: predicateWithMinimumLengthValidation(2),
  username: predicateWithMinimumLengthValidation(2),
  email: Predicate(isEmail),
  password: predicateWithMinimumLengthValidation(8),
}

const loginValidations = {
  email: Predicate(isEmail),
  password: predicateWithMinimumLengthValidation(1),
}

const lapTimeValidations = {
  minutes: predicateWithMinimumLengthValidation(1)
    .concat(predicateWithMaxLengthValidation(1))
    .concat(Predicate(compose(gte(9), Number))),
  seconds: predicateWithMinimumLengthValidation(2)
    .concat(predicateWithMaxLengthValidation(2))
    .concat(Predicate(compose(gte(59), Number))),
  miliseconds: predicateWithMinimumLengthValidation(3)
    .concat(predicateWithMaxLengthValidation(3))
    .concat(Predicate(compose(gte(999), Number))),
}

const runValidations = (predicates: Predicates) => (form: Form) =>
  reduce(
    (acc, [key, value]) =>
      predicates[key].run(value)
        ? acc
        : { ...acc, isValid: false, [key]: `validationErroMessages.${key}` },
    { isValid: true },
    Object.entries(form)
  )

export const validateSignUpForm = runValidations(signUpVlidations)
export const validateLoginForm = runValidations(loginValidations)
export const validateLapTimeForm = runValidations(lapTimeValidations)
