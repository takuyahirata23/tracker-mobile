import React from 'react'
import { HStack, VStack } from 'native-base'
import { useQuery } from 'urql'

import { Layout, Text, Button } from '~/components'

import type { RouteProp } from '@react-navigation/native'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type TrackScreenRouteProp = RouteProp<RecordStackparmList, 'Track'>

type BestLapTime = {
  id: string
  minutes: number
  seconds: number
  miliseconds: number
  date: string
}

type Props = {
  route: TrackScreenRouteProp
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

export default function Track({ route }: Props) {
  const [res] = useQuery({
    query: MyTrackQuery,
    variables: { userTrackId: route.params.myTrackId },
  })

  if (res.fetching) return null

  const {
    userTrack: { track },
    bestLapTimes,
  } = res.data
  return (
    <Layout>
      <VStack>
        {track.description && <Text>{track.description}</Text>}
        <Button onPress={() => null}>New</Button>
      </VStack>

      <VStack mt={4}>
        {bestLapTimes.map(
          ({ id, minutes, seconds, miliseconds, date }: BestLapTime) => (
            <HStack key={id} justifyContent="space-between">
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
