import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

const extended = {
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
    },
  },
}

export const theme = extendTheme(extended, baseTheme)
