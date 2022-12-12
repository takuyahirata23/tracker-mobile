import React from 'react'
import { useQuery } from 'urql'
import { Calendar } from 'react-native-calendars'

import { Layout, Text } from '~/components'

import type { RouteProp } from '@react-navigation/native'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type TrackScreenRouteProp = RouteProp<RecordStackparmList, 'Track'>

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
  }
`

export default function Track({ route }: Props) {
  const [res] = useQuery({
    query: MyTrackQuery,
    variables: { userTrackId: route.params.myTrackId },
  })

  if (res.fetching) return null

  const { track } = res.data.userTrack
  return (
    <Layout>
      <Text>{track.name}</Text>
    </Layout>
  )
}
