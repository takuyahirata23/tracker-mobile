import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

type Status = 'pending' | 'rejected' | 'idle'

type User = {
  id: number
  name: string
  username: string
}

type Res = {
  user: User
  token: string
}

interface AuthState {
  user: User | null
  token: null | string
  status: Status
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Res>) => {
      state.user = payload.user
      state.token = payload.token
      state.status = 'idle'
    },
    updateStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload
    },
  },
})

export const { setUser, updateStatus } = authSlice.actions

export default authSlice.reducer
