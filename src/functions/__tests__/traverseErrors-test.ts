import { traverseErrors } from '../traverseErrors'

const errors = {
  email: ['has already been taken'],
}

const obj = {
  isValid: false,
  name: '',
  username: '',
  email: 'has already been taken',
  password: '',
}

const errors2 = {
  name: ['name not good'],
  username: ['username no good'],
  password: ['nope', 'no'],
}

const obj2 = {
  isValid: false,
  name: 'name not good',
  username: 'username no good',
  email: '',
  password: 'nope',
}

const errorForm = {
  isValid: true,
  name: '',
  username: '',
  email: '',
  password: '',
}

describe('transformErrorsToFormErrors', () => {
  test('should transform errors to form errors', () => {
    expect(traverseErrors(errorForm, errors)).toMatchObject(obj)
    expect(traverseErrors(errorForm, errors2)).toMatchObject(obj2)
  })
})
