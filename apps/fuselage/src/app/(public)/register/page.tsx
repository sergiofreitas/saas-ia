'use client'

import { useCallback } from 'react'
import { useRegister, useTranslate } from '@refinedev/core'
import { Box, Container, Heading } from '@chakra-ui/react'
import { yupForm } from '@saas-ui/forms/yup'
import { AutoForm } from '@saas-ui/react'
import { type Register, createSchema } from '@/domains/auth/schemas/register'

const RegisterPage = () => {
  const { mutate: register } = useRegister<Register>()
  const t = useTranslate()
  const schema = createSchema(t)

  const onSubmit = useCallback((credentials) => register(credentials), [register])

  return (
    <Box h="100vh" w="100vw" display="flex" alignItems="center">
      <Container maxW="prose" px={4}>
        <Heading mb={12} textAlign="center">
          {t('pages.register.title')}
        </Heading>

        <AutoForm onSubmit={onSubmit} submitLabel="Register" {...yupForm(schema)} />
      </Container>
    </Box>
  )
}

export default RegisterPage
