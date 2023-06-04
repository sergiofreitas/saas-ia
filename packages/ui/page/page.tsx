import { Box, HStack, Heading, type BoxProps, Text } from '@chakra-ui/react'
import { Loader } from '@saas-ui/react'

type PageHeaderProps = {
  title?: React.ReactNode
  toolbar?: React.ReactNode
  tabbar?: React.ReactNode
  nav?: React.ReactNode
  description?: React.ReactNode
  variant?: 'settings' | 'appbar'
}

type PageBodyProps = {
  children: React.ReactNode
  errorComponent?: React.ReactNode
  hasError?: boolean
  isLoading?: boolean
}

export type PageProps = {
  fullWidth?: boolean
} & PageBodyProps &
  PageHeaderProps &
  BoxProps

const PageHeader: React.FC<PageHeaderProps> = ({ title, toolbar, nav, tabbar, description, variant = 'appbar' }) => {
  if (variant === 'settings') {
    return (
      <Box as="header">
        <Box my={8} borderBottomWidth={1}>
          {nav}
          <Box py={8}>
            <Heading as="h2" fontSize="2xl" fontWeight="semibold">
              {title}
            </Heading>
            <Text color="muted" fontSize="md">
              {description}
            </Text>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box as="header">
      <HStack px={6} py={2} minHeight={14} borderBottomWidth={1} pl={{ base: 16, lg: 6 }}>
        {nav}
        <Heading as="h2" fontSize="lg" fontWeight="semibold">
          {title}
        </Heading>

        <Box flex={1} display="flex" justifyContent="flex-end">
          {toolbar}
        </Box>
      </HStack>
      {tabbar && (
        <HStack px={6} py={2} minHeight={12} borderBottomWidth={1}>
          {tabbar}
        </HStack>
      )}
    </Box>
  )
}

export const PageBody: React.FC<PageBodyProps> = ({ children, isLoading, hasError, errorComponent }) => {
  if (isLoading) {
    return (
      <Box alignItems="center" alignSelf="center" height="100%">
        <Loader />
      </Box>
    )
  }

  if (hasError && errorComponent) {
    return <>{errorComponent}</>
  }

  return <>{children}</>
}

export const Page: React.FC<PageProps> = ({
  children,
  maxW,
  height = '100vh',
  width = '100vw',
  mx = 'auto',
  ...props
}) => {
  return (
    <Box display="flex" flexDir="column" height={height} width={width} mx={mx} maxW={maxW || 'container.xl'}>
      <PageHeader {...props} />
      <Box flex="1 1 0%" overflowY="auto">
        <PageBody {...props}>{children}</PageBody>
      </Box>
    </Box>
  )
}
