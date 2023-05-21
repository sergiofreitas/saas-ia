'use client'

import { useCallback } from 'react'
import { useLogin, useTranslate } from '@refinedev/core'
import { Box, Container, Heading } from '@chakra-ui/react'
import { yupForm } from '@saas-ui/forms/yup'
import { AutoForm } from '@saas-ui/react'
import { type Credentials, createSchema } from '@/domains/auth/schemas/credentials'

const LoginPage = () => {
  const { mutate: login } = useLogin<Credentials>()
  const t = useTranslate()
  const schema = createSchema(t)

  const onSubmit = useCallback((credentials) => login(credentials), [login])

  return (
    <Box h="100vh" w="100vw" display="flex" alignItems="center">
      <Container maxW="prose" px={4}>
        <Heading mb={12} textAlign="center">
          {t('pages.login.title', 'Sign in to your account')}
        </Heading>

        <AutoForm onSubmit={onSubmit} submitLabel="Login" {...yupForm(schema)} />
      </Container>
    </Box>
  )
}

export default LoginPage
