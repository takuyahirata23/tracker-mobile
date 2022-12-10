import React from 'react'
import { useTranslation } from 'react-i18next'
import { HStack } from 'native-base'

import { Layout, Text, Button } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type Props = NativeStackScreenProps<RecordStackparmList, 'Tracks'>

export default function MyTracks({ navigation }: Props) {
  const { t } = useTranslation()
  return (
    <Layout>
      <HStack alignItems="center">
        <Text type="heading" flex={1}>
          {t('Record.Tracks.title')}
        </Text>
        <Button onPress={() => navigation.navigate('NewTrack')}>
          {t('common.new')}
        </Button>
      </HStack>
    </Layout>
  )
}
