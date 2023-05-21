import { object, string, boolean } from 'yup'

export type Credentials = {
  email: string
  password: string
  rememberMe?: boolean
}

export const createSchema = (t: any) => {
  return object({
    email: string()
      .email(t('fields.errors.string.email'))
      .required(t('fields.errors.mixed.required'))
      .label(t('pages.login.fields.email'))
      .meta({ type: 'email' }),
    password: string()
      .required(t('fields.errors.mixed.required'))
      .label(t('pages.login.fields.password'))
      .meta({ type: 'password' }),
    rememberMe: boolean().label(t('pages.login.fields.rememberMe')).meta({ type: 'checkbox' }),
  })
}
