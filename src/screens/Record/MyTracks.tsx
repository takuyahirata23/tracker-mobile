import React from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, VStack, Pressable } from 'native-base'
import { useQuery } from 'urql'

import { Layout, Text, Button } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type Track = {
  id: string
  name: string
  description: string
}

type UserTrack = {
  id: string
  track: Track
}

type Props = NativeStackScreenProps<RecordStackparmList, 'MyTracks'>

const MyTracksQuery = `
  query {
    userTracks {
      id 
      track {
        id
        name
      }
    }
  }
`

export default function MyTracks({ navigation }: Props) {
  const { t } = useTranslation()
  const [myTracksRes] = useQuery({ query: MyTracksQuery })

  if (myTracksRes.fetching) return null

  const onTracksPress = () => navigation.navigate('Tracks')
  const onEachTrackPress = (myTrackId: string, title: string) => () =>
    navigation.navigate('Track', {
      myTrackId,
      title,
    })

  const { userTracks } = myTracksRes.data

  return (
    <Layout>
      <HStack alignItems="center">
        <Text type="heading" flex={1}>
          {t('Record.Tracks.title')}
        </Text>
        <Button onPress={onTracksPress}>{t('common.new')}</Button>
      </HStack>
      <VStack mt={4} space={4}>
        {userTracks.map((userTrack: UserTrack) => (
          <Pressable
            onPress={onEachTrackPress(userTrack.id, userTrack.track.name)}
            key={userTrack.id}
            bgColor="bg-secondary.500"
            p={2}
            rounded="md"
            shadow={2}
          >
            <Text fontSize="lg">{userTrack.track.name}</Text>
          </Pressable>
        ))}
      </VStack>
    </Layout>
  )
}
