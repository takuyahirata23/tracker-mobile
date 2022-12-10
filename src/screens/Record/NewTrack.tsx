import React from 'react'
import { useQuery } from 'urql'
import { useTranslation } from 'react-i18next'
import { VStack } from 'native-base'

import { Layout, Text } from '~/components'

const TracksQuery = `
  query {
    tracks {
      id
      name
      description
    }
  }
`

export default function NewTrack() {
  const { t } = useTranslation()
  const [tracksRes] = useQuery({ query: TracksQuery })

  if (tracksRes.fetching) return null

  const tracks = tracksRes.data.tracks

  return (
    <Layout>
      <Text type="heading">{t('Record.NewTrack.title')}</Text>
      {tracks.map(track => (
        <VStack key={track.id} space={2}>
          <Text>{track.name}</Text>
          {track.description && <Text>{track.description}</Text>}
        </VStack>
      ))}
    </Layout>
  )
}
