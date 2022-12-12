import React from 'react'
import { useQuery, useMutation } from 'urql'
import { useTranslation } from 'react-i18next'
import { VStack, HStack } from 'native-base'

import { Layout, Text, Button } from '~/components'

const TracksQuery = `
  query {
    tracks {
      id
      name
      description
    }
  }
`

const RegisterTrackMutation = `
mutation($trackId: String!) {
    registerTrack(trackId: $trackId) {
      id 
      track {
        id
        name
      }
    }
  }
`

type Track = {
  id: string
  name: string
  description: string
}

export default function Tracks() {
  const { t } = useTranslation()
  const [tracksRes] = useQuery({ query: TracksQuery })
  const [_res, registerTrack] = useMutation(RegisterTrackMutation)

  if (tracksRes.fetching) return null

  const tracks = tracksRes.data.tracks

  const onPress = (trackId: string) => () => registerTrack({ trackId })

  return (
    <Layout>
      <Text type="heading">{t('Record.NewTrack.title')}</Text>
      <VStack space={4} mt={4}>
        {tracks.map((track: Track) => (
          <HStack
            key={track.id}
            alignItems="center"
            space={2}
            bgColor="bg-secondary.500"
            p={2}
            rounded="md"
            shadow={2}
          >
            <Text flex={1} fontSize="lg">
              {track.name}
            </Text>
            <Button onPress={onPress(track.id)}>Add</Button>
          </HStack>
        ))}
      </VStack>
    </Layout>
  )
}
