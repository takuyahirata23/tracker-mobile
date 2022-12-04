type FormErrors = {
  isValid: boolean
}

export type Errors = {
  [key: string]: string[]
}

export const traverseErrors = (formErrors: FormErrors, errors: Errors) =>
  Object.entries(errors).reduce(
    (acc, [key, xs]) => ({ ...acc, [key]: xs[0] }),
    { ...formErrors, isValid: false }
  )
