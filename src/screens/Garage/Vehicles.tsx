import React from 'react'
import { HStack } from 'native-base'
import { useQuery } from 'urql'

import { Layout, Text, Button } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { GarageStackparmList } from '~/navigations/GarageNavigator'

const VehicleQuery = `
  query {
    userVehicles {
      id
      make
      modal
      year
    }
  }
`

type Props = NativeStackScreenProps<GarageStackparmList, 'Vehicles'>

type UserVehicle = {
  id: string
  make: string
  modal: string
  year: number
}

export default function Vehicles({ navigation }: Props) {
  const [res] = useQuery({ query: VehicleQuery })

  if (res.fetching) return null

  return (
    <Layout>
      <HStack alignItems="center">
        <Text flex={1} type="heading">
          Vehicles
        </Text>
        <Button onPress={() => navigation.navigate('NewVehicle')}>
          New vehicle
        </Button>
      </HStack>
      {res.data?.userVehicles.map((modal: UserVehicle) => (
        <Text key={modal.id}>
          {modal.modal} ({modal.year})
        </Text>
      ))}
    </Layout>
  )
}
