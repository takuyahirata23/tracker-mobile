import React from 'react'
import { HStack, VStack } from 'native-base'
import { useQuery } from 'urql'

import { Layout, Text, Button } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type Props = NativeStackScreenProps<RecordStackparmList, 'Track'>

type BestLapTime = {
  id: string
  minutes: number
  seconds: number
  miliseconds: number
  date: string
}

const MyTrackQuery = `
  query($userTrackId: String!) {
    userTrack(userTrackId: $userTrackId) {
      id
      track {
        id
        name
        description
      }
    }

    bestLapTimes(userTrackId: $userTrackId) {
      date
      minutes
      seconds
      miliseconds
    }
  }
`

export default function Track({ route, navigation }: Props) {
  const [res] = useQuery({
    query: MyTrackQuery,
    variables: { userTrackId: route.params.myTrackId },
  })

  if (res.fetching) return null

  const {
    userTrack: { track },
    bestLapTimes,
  } = res.data

  const toLapTimeForm = () =>
    navigation.navigate('LapTimeForm', {
      myTrackId: route.params.myTrackId,
      title: track.name,
    })

  return (
    <Layout>
      <VStack>
        {track.description && <Text>{track.description}</Text>}
        <Button onPress={toLapTimeForm}>New</Button>
      </VStack>

      <VStack mt={4}>
        {bestLapTimes.map(
          ({ minutes, seconds, miliseconds, date }: BestLapTime, i: number) => (
            <HStack key={i} justifyContent="space-between">
              <Text>
                {minutes}:{seconds}:{miliseconds}
              </Text>
              <Text>{date}</Text>
            </HStack>
          )
        )}
      </VStack>
    </Layout>
  )
}
