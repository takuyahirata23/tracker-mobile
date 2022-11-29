import React from 'react'
import { View, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'

import { colors } from '~/utils/constants'
import Layout from '~/components/Layout'
import Text from '~/components/Text'
import Button from '~/components/Button'
import { url } from '~/utils/constants'
import { validateSignUpForm } from '~/functions/validations'

import type { TextInputProps } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'

type Props = NativeStackScreenProps<AuthStackPramList, 'SignUp'>

type InputProps = {
  error?: string
} & TextInputProps

function Input({ error, ...rest }: InputProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={colors.secondary}
        textAlign="left"
        className="bg-bg-secondary text-primary rounded-md h-10  px-4"
        {...rest}
      />
      {error && <Text variant="tertiary">{error}</Text>}
    </View>
  )
}

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

  const [formErrors, setFormErrors] = React.useState({ isValid: false })

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
      <View className="gap-4">
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
        />
      </View>
      <View className="mt-8">
        <View className="mb-8">
          <Button onPress={handleSubmit}>{t('Auth.signUp')}</Button>
        </View>
        <Button onPress={navigation.goBack}>{t('common.back')}</Button>
      </View>
    </Layout>
  )
}
