import React from 'react'
import { HStack } from 'native-base'
import { useQuery } from 'urql'
import { useTranslation } from 'react-i18next'

import { Layout, Text, Button } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { GarageStackparmList } from '~/navigations/GarageNavigator'

const MotorcyclesQuery = `
  query {
    motorcycles {
      id
      make
      modal
      year
    }
  }
`

type Props = NativeStackScreenProps<GarageStackparmList, 'Motorcycles'>

type UserVehicle = {
  id: string
  make: string
  modal: string
  year: number
}

export default function Motorcycles({ navigation }: Props) {
  const [res] = useQuery({ query: MotorcyclesQuery })
  const { t } = useTranslation()

  if (res.fetching) return null

  return (
    <Layout>
      <HStack alignItems="center">
        <Text flex={1} type="heading">
          {t('Garage.Motorcycles.title')}
        </Text>
        <Button onPress={() => navigation.navigate('NewMotorcycle')}>
          {t('common.new')}
        </Button>
      </HStack>
      {res.data?.motorcycles.map((motorcycle: UserVehicle) => (
        <Text key={motorcycle.id}>
          {motorcycle.modal} ({motorcycle.year})
        </Text>
      ))}
    </Layout>
  )
}
