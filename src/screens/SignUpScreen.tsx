import React from 'react'
import { useTranslation } from 'react-i18next'
import { VStack, KeyboardAvoidingView, ScrollView } from 'native-base'

import { Layout, Button, Input } from '~/components'
import { url } from '~/utils/constants'
import { validateSignUpForm } from '~/functions/validations'
import checkOS from '~/procedures/checkOS'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'

type Props = NativeStackScreenProps<AuthStackPramList, 'SignUp'>

const signUp = (form: { [key: string]: string }) =>
  fetch(url.concat('/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(d => d.json())
    .then(console.log)
    .catch(console.error)

export default function SignUpScreen({ navigation }: Props) {
  const { t } = useTranslation()
  const [form, setForm] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = React.useState<{
    isValid: boolean
    name?: string
    username?: string
    email?: string
    password?: string
  }>({
    isValid: false,
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const { name, username, email, password } = form

  const onChangeText = (field: string) => (x: string) =>
    setForm(prev => ({ ...prev, [field]: x }))

  const handleSubmit = () => setFormErrors(validateSignUpForm(form))

  React.useEffect(() => {
    if (formErrors.isValid) {
      //signUp(form)
      console.log('run')
    }
  }, [formErrors, form])

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
              error={formErrors.name}
            />
            <Input
              value={username}
              onChangeText={onChangeText('username')}
              placeholder={t('common.username') as string}
              error={formErrors.username}
            />
            <Input
              value={email}
              onChangeText={onChangeText('email')}
              placeholder={t('common.email') as string}
              error={formErrors.email}
            />
            <Input
              value={password}
              onChangeText={onChangeText('password')}
              placeholder={t('common.password') as string}
              error={formErrors.password}
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
