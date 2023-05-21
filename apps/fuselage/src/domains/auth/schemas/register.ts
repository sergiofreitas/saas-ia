import { object, string, boolean } from 'yup'

export type Register = {
  email: string
  password: string
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
  })
}
