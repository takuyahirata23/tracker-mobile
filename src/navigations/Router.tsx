import React from 'react'
import AuthNavigator from '~/navigations/AuthNavigator'
import BottomTabNavigator from '~/navigations/BottomTabNavigator'
import { getToken } from '~/procedures/auth'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxAppHooks'
import { setToken } from '~/redux/authSlice'

export default function Router() {
  const dispatch = useAppDispatch()
  const { token, isFetchingToken } = useAppSelector(state => state.auth)

  const dispatchSetToken = (t: string | null) => dispatch(setToken(t))

  React.useEffect(() => {
    getToken().then(dispatchSetToken)
  }, [])

  if (isFetchingToken) return null

  return token ? <BottomTabNavigator /> : <AuthNavigator />
}
