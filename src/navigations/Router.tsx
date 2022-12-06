import React from 'react'
import { createClient, Provider } from 'urql'

import AuthNavigator from '~/navigations/AuthNavigator'
import BottomTabNavigator from '~/navigations/BottomTabNavigator'
import { getToken } from '~/procedures/auth'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxAppHooks'
import { setToken } from '~/redux/authSlice'
import { url } from '~/utils/constants'

export default function Router() {
  const dispatch = useAppDispatch()
  const { token, isFetchingToken } = useAppSelector(state => state.auth)

  const dispatchSetToken = (t: string | null) => dispatch(setToken(t))

  React.useEffect(() => {
    getToken().then(dispatchSetToken)
  }, [])

  const client = createClient({
    url: url.concat('/api'),
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })

  if (isFetchingToken) return null

  return token ? (
    <Provider value={client}>
      <BottomTabNavigator />
    </Provider>
  ) : (
    <AuthNavigator />
  )
}
