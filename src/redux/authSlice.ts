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
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  errorStatus: null,
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
  },
})

export const { setUser, updateStatus, setErrorStatus } = authSlice.actions

export default authSlice.reducer
