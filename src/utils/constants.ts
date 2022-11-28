import checkOS from '~/procedures/checkOS'
const isIOS = checkOS()

export const url = `http://${isIOS ? 'localhost' : '10.0.2.2'}:4000`

export const colors = {
  primary: '#ffffff',
  secondary: '#94a3b8',
  tertiary: '#0ea4e9',
  'bg-primary': '#0f172a',
  'bg-secondary': '#1e293b',
  'btn-primary': '#0ea5e9',
  'btn-secondary': '#334155',
}
