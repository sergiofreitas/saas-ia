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
      '.chakra-popover__popper.chakra-popover__popper,  .chakra-menu__menu-button.chakra-menu__menu-button + span + div, .chakra-menu__menu-button + [style*="--popper-transform-origin"]':
        {
          margin: '0',
        },
    },
  },
}

export const theme = extendTheme(extended, baseTheme)
