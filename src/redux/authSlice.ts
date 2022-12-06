import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Errors } from '~/functions/traverseErrors'

type Status = 'pending' | 'rejected' | 'idle'

export type User = {
  id: number
  name: string
  username: string
}

export type UserAndToken = {
  user: User
  token: string
}

export type AuthResponse = {
  error: boolean
  errors: Errors
  status: string
  token?: string
  user?: User
}

interface AuthState {
  user: User | null
  token: null | string
  status: Status
  errorStatus: null | string
  isFetchingToken: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'pending',
  errorStatus: null,
  isFetchingToken: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserAndToken>) => {
      state.user = payload.user
      state.token = payload.token
      state.status = 'idle'
    },
    setErrorStatus: (state, { payload }: PayloadAction<string>) => {
      state.errorStatus = payload
      state.status = 'rejected'
    },
    updateStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload
    },
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload
      state.isFetchingToken = false
    },
  },
})

export const { setUser, setToken, updateStatus, setErrorStatus } =
  authSlice.actions

export default authSlice.reducer
