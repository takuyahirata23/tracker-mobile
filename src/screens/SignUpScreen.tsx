import React from 'react'
import { View, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'

import { colors } from '~/utils/constants'
import Layout from '~/components/Layout'
import Text from '~/components/Text'
import Button from '~/components/Button'
import { url } from '~/utils/constants'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'

type Props = NativeStackScreenProps<AuthStackPramList, 'SignUp'>

function Input({ ...rest }) {
  return (
    <View>
      <TextInput
        placeholderTextColor={colors.secondary}
        textAlign="left"
        className="bg-bg-secondary text-primary rounded-md h-10  px-4"
        {...rest}
      />
    </View>
  )
}

export default function SignUpScreen({ navigation }: Props) {
  const { t } = useTranslation()
  const [state, setState] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const { name, username, email, password } = state

  const onChangeText = (field: string) => (x: string) =>
    setState(prev => ({ ...prev, [field]: x }))

  const validate = () => {}

  // const handleSubmit = () => {
  //   fetch(url.concat('/register'), {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(state),
  //   })
  //     .then(d => d.json())
  //     .then(console.log)
  //     .catch(console.error)
  // }

  return (
    <Layout classOverride="border-2 border-white">
      <View className="gap-4">
        <Input
          value={name}
          onChangeText={onChangeText('name')}
          placeholder={t('common.name')}
        />
        <Input
          value={username}
          onChangeText={onChangeText('username')}
          placeholder={t('common.username')}
        />
        <Input
          value={email}
          onChangeText={onChangeText('email')}
          placeholder={t('common.email')}
        />
        <Input
          value={password}
          onChangeText={onChangeText('password')}
          placeholder={t('common.password')}
        />
        <TextInput value={username} onChangeText={onChangeText('username')} />
      </View>
      <View>
        <Button onPress={handleSubmit}>{t('Auth.signUp')}</Button>
        <Button onPress={navigation.goBack}>{t('common.back')}</Button>
      </View>
    </Layout>
  )
}
