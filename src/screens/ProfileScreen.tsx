import React from 'react'
import { useQuery } from 'urql'

import { Layout, Text } from '~/components'

const UserQuery = `
  query {
    user {
      id
      name
      email
    }
    userVehicles {
      id
      make
      modal
      year
    }
  }
`

export default function ProfileScreen() {
  const [res] = useQuery({ query: UserQuery })

  if (res.fetching) return null

  const { name } = res.data.user

  console.log(res.data)

  return (
    <Layout>
      <Text type="heading">{name}</Text>
    </Layout>
  )
}
