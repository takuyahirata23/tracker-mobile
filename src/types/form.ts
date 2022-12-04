export type SignUpErrorForm = {
  isValid: boolean
  name?: string
  username?: string
  email?: string
  password?: string
}

export type SignUpForm = {
  name: string
  username: string
  email: string
  password: string
}

export type LoginForm = {
  email: string
  password: string
}
