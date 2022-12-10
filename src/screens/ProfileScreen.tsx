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
  }
`

export default function ProfileScreen() {
  const [res] = useQuery({ query: UserQuery })

  if (res.fetching) return null

  const { name } = res.data?.user

  return (
    <Layout>
      <Text type="heading">{name}</Text>
    </Layout>
  )
}
