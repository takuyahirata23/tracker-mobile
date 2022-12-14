import AsyncStorage from '@react-native-async-storage/async-storage'
import { Left, Right } from 'fts-utils'

import { url } from '~/utils/constants'

import type { SignUpForm, LoginForm } from '~/types/form'

const key = 'token'

const ResponseEither = (res: { error: boolean }) =>
  res.error ? Left(res) : Right(res)

export const signUp = (form: SignUpForm) =>
  fetch(url.concat('/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(res => res.json())
    .then(res =>
      ResponseEither(res).map(res => ({ user: res.user, token: res.token }))
    )

export const login = (form: LoginForm) =>
  fetch(url.concat('/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(res => res.json())
    .then(res =>
      ResponseEither(res).map(res => ({ user: res.user, token: res.token }))
    )

export const setTokenToAsyncStorage = (token: string) =>
  AsyncStorage.setItem(key, token).catch(console.error)

export const getToken = () => AsyncStorage.getItem(key)
