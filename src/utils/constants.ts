import checkOS from '~/procedures/checkOS'

const isIOS = checkOS()

export const url = `http://${isIOS ? 'localhost' : '10.0.2.2'}:4000`
