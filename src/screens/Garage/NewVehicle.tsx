import React from 'react'
import { useQuery, useMutation } from 'urql'
import { Select, VStack, Spinner } from 'native-base'

import { Layout, Text, Button, Input } from '~/components'

const MakeQuery = `
  query {
    vehicles {
      id
      name
    }
  }
`

const ModalQuery = `
  query($makeId: String!) {
    modals(makeId: $makeId) {
      id
      name
    }
  }
`

const UserMotorcyleRegistrationMutation = `
  mutation($makeId: String!, $modalId: String!, $year: Int!) {
    registerUserVehicle(makeId: $makeId, modalId: $modalId, year: $year) {
      id
      make
      modal
      year
    }
  }
`

export default function NewVehicle() {
  const [makeId, setMakeId] = React.useState('')
  const [modalId, setModalId] = React.useState('')
  const [year, setYear] = React.useState('')
  const [makeRes] = useQuery({ query: MakeQuery })
  const [modalRes] = useQuery({
    query: ModalQuery,
    pause: !Boolean(makeId),
    variables: { makeId },
  })

  const [registerMotorcycleResult, registerMotorcycle] = useMutation(
    UserMotorcyleRegistrationMutation
  )

  const onSubmit = () => {
    if (makeId && modalId && year) {
      registerMotorcycle({ makeId, modalId, year: Number(year) })
    }
  }

  if (makeRes.fetching) return null

  const makes = makeRes.data.vehicles
  const modals = modalRes.data?.modals || []

  return (
    <Layout>
      <Text type="heading">Register New Vehicle</Text>
      <VStack my={6} space={4}>
        <Select
          p={4}
          placeholder="Make"
          onValueChange={setMakeId}
          selectedValue={makeId}
          color="primary.500"
        >
          {makes.map((make: any) => (
            <Select.Item
              label={make.name}
              value={make.id}
              key={make.id}
              color="primary.500"
            />
          ))}
        </Select>
        {modalRes.fetching ? (
          <Spinner />
        ) : (
          <Select
            p={4}
            placeholder="Modal"
            onValueChange={setModalId}
            selectedValue={modalId}
            color="primary.500"
          >
            {modals.map((modal: any) => (
              <Select.Item
                label={modal.name}
                value={modal.id}
                key={modal.id}
                color="primary.500"
              />
            ))}
          </Select>
        )}
        <Input
          value={year}
          onChangeText={setYear}
          error=""
          placeholder="Year"
          keyboardType="number-pad"
        />
      </VStack>
      <Button onPress={onSubmit}>Register</Button>
    </Layout>
  )
}
