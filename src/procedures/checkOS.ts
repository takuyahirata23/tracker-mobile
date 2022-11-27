import { Platform, PlatformOSType } from 'react-native'

export default function checkOS(
  os: PlatformOSType | undefined = 'ios'
): boolean {
  return Platform.OS === os
}
