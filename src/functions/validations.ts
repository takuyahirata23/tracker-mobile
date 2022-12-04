import { Predicate } from 'fts-utils'
import { reduce } from 'ramda'

import type { Predicate as P } from 'fts-utils'

type Predicates = { [key: string]: P }
type Form = { [key: string]: string }

export const hasValidLength =
  (minLength: number = 1) =>
  (x: string) => {
    return x.trim().length >= minLength
  }

export const isEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const predicateWithLengthValidation = (x: number) =>
  Predicate(hasValidLength(x))

const signUpVlidations = {
  name: predicateWithLengthValidation(2),
  username: predicateWithLengthValidation(2),
  email: Predicate(isEmail),
  password: predicateWithLengthValidation(8),
}

const loginValidations = {
  email: Predicate(isEmail),
  password: predicateWithLengthValidation(1),
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
