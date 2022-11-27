import { Platform } from 'react-native'

import checkOS from '../checkOS'

describe('checkOS', () => {
  Platform.OS = 'ios'
  test("should check if it's iOS when no arguments given", () => {
    expect(checkOS()).toBe(true)
  })

  test('should check OS with arguments given', () => {
    Platform.OS = 'ios'
    expect(checkOS('ios')).toBe(true)
    expect(checkOS('android')).toBe(false)

    Platform.OS = 'android'
    expect(checkOS('ios')).toBe(false)
    expect(checkOS('android')).toBe(true)
  })
})
