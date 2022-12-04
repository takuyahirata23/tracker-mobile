import React from 'react'
import { VStack, KeyboardAvoidingView, ScrollView } from 'native-base'
import { useTranslation } from 'react-i18next'

import { Button, Layout, Text, Input } from '~/components'
import { login } from '~/procedures/auth'
import checkOS from '~/procedures/checkOS'
import { validateLoginForm } from '~/functions/validations'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxAppHooks'
import { setUser, updateStatus, setErrorStatus } from '~/redux/authSlice'

import type { SignUpErrorForm as ErrorForm } from '~/types/form'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'
import type { UserAndToken } from '~/redux/authSlice'

type Props = NativeStackScreenProps<AuthStackPramList, 'Login'>

const initialState = {
  email: '',
  password: '',
}

const formErrorInitialState = {
  isValid: false,
  email: '',
  password: '',
}

export default function Login({ navigation }: Props) {
  const { t } = useTranslation()
  const [form, setForm] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState<ErrorForm>(
    formErrorInitialState
  )
  const dispatch = useAppDispatch()
  const { status, errorStatus } = useAppSelector(state => state.auth)

  const { email, password } = form

  const onChangeText = (field: string) => (x: string) =>
    setForm(prev => ({ ...prev, [field]: x }))

  const onSubmit = () => setFormErrors(validateLoginForm(form))

  const dispatchSetErrorStatus = ({ status }: { status: string }) =>
    dispatch(setErrorStatus(status))

  const dispatchSetUser = (res: UserAndToken) => dispatch(setUser(res))

  const isPending = status === 'pending'

  React.useEffect(() => {
    if (formErrors.isValid) {
      dispatch(updateStatus('pending'))
    }
  }, [formErrors])

  React.useEffect(() => {
    if (isPending) {
      login(form)
        .then(either => either.fold(dispatchSetErrorStatus, dispatchSetUser))
        .catch(() => dispatch(setErrorStatus('There was a problem loggin in')))
    }
  }, [status, form])

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={checkOS() ? 'padding' : 'height'}
        flex={1}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text>Login</Text>
          {errorStatus && <Text>{errorStatus}</Text>}
          <VStack space={8}>
            <Input
              value={email}
              onChangeText={onChangeText('email')}
              placeholder={t('common.email') as string}
              error={t(formErrors.email as string)}
              keyboardType="email-address"
            />
            <Input
              value={password}
              onChangeText={onChangeText('password')}
              placeholder={t('common.password') as string}
              error={t(formErrors.password as string)}
              secureTextEntry
            />

            <Button
              onPress={onSubmit}
              isLoading={isPending}
              loadingText={t('common.loading') as string}
            >
              Login
            </Button>
            <Button onPress={navigation.goBack} bgColor="transparent">
              {t('common.back')}
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  )
}
