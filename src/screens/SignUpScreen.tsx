import React from 'react'
import { useTranslation } from 'react-i18next'
import { VStack, KeyboardAvoidingView, ScrollView } from 'native-base'

import { Layout, Button, Input } from '~/components'
import { validateSignUpForm } from '~/functions/validations'
import checkOS from '~/procedures/checkOS'
import { signUp } from '~/procedures/signUp'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxAppHooks'
import { setUser, updateStatus } from '~/redux/authSlice'
import { traverseErrors } from '~/functions/traverseErrors'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'
import type { SignUpErrorForm as ErrorForm } from '~/types/form'

type Props = NativeStackScreenProps<AuthStackPramList, 'SignUp'>

const formInitialState = {
  name: '',
  username: '',
  email: '',
  password: '',
}

const formErrorInitialState = {
  isValid: false,
  name: '',
  username: '',
  email: '',
  password: '',
}

export default function SignUpScreen({ navigation }: Props) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.status)

  const [form, setForm] = React.useState(formInitialState)

  const [formErrors, setFormErrors] = React.useState<ErrorForm>(
    formErrorInitialState
  )

  const { name, username, email, password } = form

  const onChangeText = (field: string) => (x: string) =>
    setForm(prev => ({ ...prev, [field]: x }))

  const handleSubmit = () => setFormErrors(validateSignUpForm(form))

  React.useEffect(() => {
    if (formErrors.isValid) {
      dispatch(updateStatus('pending'))
    }
  }, [formErrors, form])

  React.useEffect(() => {
    if (status === 'pending') {
      signUp(form)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            dispatch(updateStatus('rejected'))
            setFormErrors(traverseErrors(formErrors, res.errors))
          } else {
            dispatch(setUser({ user: res.user, token: res.token }))
          }
        })
        .catch(console.error)
    }
  }, [status])

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
          <VStack space={8}>
            <Input
              value={name}
              onChangeText={onChangeText('name')}
              placeholder={t('common.name') as string}
              error={t(formErrors.name as string)}
            />
            <Input
              value={username}
              onChangeText={onChangeText('username')}
              placeholder={t('common.username') as string}
              error={t(formErrors.username as string)}
              keyboardType="numeric"
            />
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
              keyboardType="numeric"
              secureTextEntry
            />
          </VStack>
          <VStack mt={8} space={8}>
            <Button onPress={handleSubmit} bgColor="btn-primary.500">
              {t('Auth.signUp')}
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
