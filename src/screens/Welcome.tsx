import React from 'react'
import { VStack, Pressable } from 'native-base'
import { useTranslation } from 'react-i18next'

import { Button, Layout, Text } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { AuthStackPramList } from '~/navigations/AuthNavigator'

type Props = NativeStackScreenProps<AuthStackPramList, 'Welcome'>

export default function Welcome({ navigation }: Props) {
  const { t } = useTranslation()

  const onPress = () => navigation.navigate('SignUp')

  return (
    <Layout pt={16}>
      <VStack alignItems="center" space={2}>
        <Text type="heading" color="primary.500">
          {t('Auth.heading')}
        </Text>
        <Text variant="secondary" textAlign="center">
          {t('Auth.welcomeMessage')}
        </Text>
      </VStack>
      <VStack mt={8}>
        <Button onPress={onPress}>{t('Auth.signUp')}</Button>
        <VStack mt={6} alignItems="center" space={2}>
          <Text>{t('Auth.alreadyHaveAccount')}</Text>
          <Pressable onPress={() => null}>
            <Text variant="tertiary">{t('Auth.login')}</Text>
          </Pressable>
        </VStack>
      </VStack>
    </Layout>
  )
}
