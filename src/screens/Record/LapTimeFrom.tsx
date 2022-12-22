import React from 'react'
import {
  Select,
  HStack,
  VStack,
  Box,
  useDisclose,
  Pressable,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'urql'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import { split, compose, head } from 'ramda'

import { Layout, Text, Button, Input } from '~/components'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RecordStackparmList } from '~/navigations/RecordNavigator'

type Props = NativeStackScreenProps<RecordStackparmList, 'LapTimeForm'>

const today = new Date()

const initialState = {
  minutes: '',
  seconds: '',
  miliseconds: '',
  motorcycleId: '',
  myTrackId: '',
  date: today,
}

const formErrorInitialState = {
  isValid: false,
  minutes: '',
  seconds: '',
  miliseconds: '',
  date: '',
}

const MototcycleQuery = `
  query {
    motorcycles {
      id
      make
      modal
      year
    }
  }
`

export default function LapTimeForm({ route }: Props) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclose()
  const [motorcyclesRes] = useQuery({ query: MototcycleQuery })
  const [form, setForm] = React.useState({
    ...initialState,
    myTrackId: route.params.myTrackId,
  })

  const [formErrors, setFormErrors] = React.useState(formErrorInitialState)

  const { minutes, seconds, miliseconds, motorcycleId, myTrackId, date } = form

  const onChangeText = (field: string) => (x: string | Date) =>
    setForm(prev => ({ ...prev, [field]: x }))

  const formatDate = (date: string) => compose(head, split('T'))(date)

  return (
    <Layout>
      <Text>Best Lap Time</Text>
      <VStack space={8} mt={6}>
        <HStack space={4}>
          <Box flex={1}>
            <Input
              value={minutes}
              error={t(formErrors.minutes as string)}
              onChangeText={onChangeText('minutes')}
              keyboardType="numeric"
              placeholder="minutes"
            />
          </Box>
          <Box flex={1}>
            <Input
              value={seconds}
              error={t(formErrors.seconds as string)}
              onChangeText={onChangeText('seconds')}
              keyboardType="numeric"
              placeholder="seconds"
            />
          </Box>
          <Box flex={1}>
            <Input
              value={miliseconds}
              error={t(formErrors.miliseconds as string)}
              onChangeText={onChangeText('miliseconds')}
              keyboardType="numeric"
              placeholder="miliseconds"
            />
          </Box>
        </HStack>
        <Select
          p={4}
          placeholder="Make"
          onValueChange={onChangeText('motorcycleId')}
          selectedValue={motorcycleId}
          color="primary.500"
          placeholderTextColor="secondary.500"
          backgroundColor="btn-secondary.500"
          borderWidth={0}
        >
          {motorcyclesRes.data?.motorcycles?.map(
            ({ id, make, modal, year }: any) => (
              <Select.Item
                label={`${make} ${modal} ${year}`}
                value={id}
                key={id}
                color="primary.500"
              />
            )
          )}
        </Select>
        <Input value={route.params.title} editable={false} error="" />
        <HStack alignItems="center" space={2}>
          <Box flex={1}>
            <Input
              value={new Intl.DateTimeFormat('en-CA').format(date)}
              editable={false}
              error=""
            />
          </Box>
          <Button onPress={onOpen} py={2.5}>
            Pick date
          </Button>
        </HStack>
        <DatePicker
          modal
          open={isOpen}
          date={date}
          onConfirm={date => {
            onChangeText('date')(date)
            onClose()
          }}
          onCancel={onClose}
          mode="date"
          maximumDate={today}
        />
      </VStack>
    </Layout>
  )
}
