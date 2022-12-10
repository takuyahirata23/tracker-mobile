import React from 'react'
import { useQuery, useMutation } from 'urql'
import { Select, VStack, Spinner } from 'native-base'

import { Layout, Text, Button, Input } from '~/components'

const MakesQuery = `
  query {
    makes {
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
mutation($motorcycleInput: MotorcycleInput!) {
  registerMotorcycle(MotorcycleInput: $motorcycleInput) {
      id
      make
      modal
      year
    }
  }
`

export default function NewMotorcycle() {
  const [makeId, setMakeId] = React.useState('')
  const [modalId, setModalId] = React.useState('')
  const [year, setYear] = React.useState('')
  const [makesRes] = useQuery({ query: MakesQuery })
  const [modalRes] = useQuery({
    query: ModalQuery,
    pause: !Boolean(makeId),
    variables: { makeId },
  })

  const [_registerMotorcycleResult, registerMotorcycle] = useMutation(
    UserMotorcyleRegistrationMutation
  )

  const onSubmit = () => {
    if (makeId && modalId && year) {
      registerMotorcycle({
        motorcycleInput: { makeId, modalId, year: Number(year) },
      }).then(console.log)
    }
  }

  if (makesRes.fetching) return null

  const makes = makesRes.data?.makes
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
