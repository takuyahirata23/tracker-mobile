import { url } from '~/utils/constants'

import type { SignUpForm } from '~/types/form'

export const signUp = (form: SignUpForm) =>
  fetch(url.concat('/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
