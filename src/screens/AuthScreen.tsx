import React from 'react'
import { View, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'

import Layout from '~/components/Layout'
import Button from '~/components/Button'
import Text from '~/components/Text'

export default function AuthScreen() {
  const { t } = useTranslation()

  return (
    <Layout classOverride="flex justify-center">
      <View className="flex items-center my-8">
        <Text classOverride="text-3xl">{t('Auth.heading')}</Text>
        <Text classOverride="mt-4" variant="secondary">
          {t('Auth.welcomeMessage')}
        </Text>
      </View>
      <View>
        <Button>{t('Sign up!')}</Button>
        <View className="mt-4">
          <Text variant="tertiary" classOverride="text-center text-lg">
            {t('Auth.alreadyHaveAccount')}
          </Text>
          <Pressable onPress={() => null}>
            <Text variant="secondary" classOverride="text-center">
              {t('Auth.login')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  )
}
