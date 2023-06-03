import { Box, HStack, Heading, Text } from '@chakra-ui/react'

type SectionProps = {
  title: string
  description: string
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ children, title, description }) => {
  return (
    <HStack mt={4} maxW="100%" alignItems="flex-start">
      <Box w="30%" pr={4}>
        <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={1}>
          {title}
        </Heading>
        <Text color="muted" fontSize="md">
          {description}
        </Text>
      </Box>
      <Box flex="1">{children}</Box>
    </HStack>
  )
}
