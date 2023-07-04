import { Button, Menu, MenuButton, Text, MenuItem } from '@chakra-ui/react'
import { FilterableMenuList } from '../../../filterableMenu'
import { FilterValueProps } from './types'

const FilterContent: React.FC<FilterValueProps> = ({ onChange }) => (
  <FilterableMenuList placeholder="filtrar">
    <MenuItem onClick={() => onChange('true')}>
      <Text as="div" fontSize="sm">
        verdadeiro
      </Text>
    </MenuItem>
    <MenuItem onClick={() => onChange('false')}>
      <Text as="div" fontSize="sm">
        falso
      </Text>
    </MenuItem>
  </FilterableMenuList>
)

const FilterMenu: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {filter.value === 'true' ? 'verdadeiro' : 'falso'}
      </MenuButton>
      <FilterContent onChange={onChange} filter={filter} />
    </Menu>
  )
}

export const FilterBoolean = {
  Menu: FilterMenu,
  Content: FilterContent,
}
