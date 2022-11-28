import React from 'react'
import { View, TextInput } from 'react-native'
import { colors } from '~/utils/constants'
import { useTranslation } from 'react-i18next'

import Layout from '~/components/Layout'
import Text from '~/components/Text'
import Button from '~/components/Button'

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

export default function SignUpScreen({ navigation }) {
  const { t } = useTranslation()
  const [{ name, username, email, password }, setState] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const onChangeText = (field: string) => (x: string) =>
    setState(prev => ({ ...prev, [field]: x }))

  return (
    <Layout>
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
      <Button onPress={navigation.goBack}>{t('common.back')}</Button>
    </Layout>
  )
}
