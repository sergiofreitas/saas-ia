import { Box, Button, Menu, MenuButton, Text, MenuItem } from '@chakra-ui/react'
import { EnumUI } from '../../hooks/useFilters'
import { FilterableMenuList } from '../../../filterableMenu'
import { FilterValueProps } from './types'

const FilterContent: React.FC<FilterValueProps> = ({ filter, onChange }) => (
  <FilterableMenuList placeholder="filtrar">
    {(filter.ui as EnumUI).options.map((option, idx) => {
      const icon = option.icon || <Box w={4}></Box>
      return (
        <MenuItem key={`option-enum-${idx}`} onClick={() => onChange(option.value)} icon={icon}>
          <Text as="div" fontSize="sm">
            {option.label}
          </Text>
        </MenuItem>
      )
    })}
  </FilterableMenuList>
)

const FilterMenu: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const option = (filter.ui as EnumUI).options.find((f) => f.value === filter.value)
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        <Box display="flex" flexDir="row" gap={0.5}>
          {option?.icon}
          {option?.label}
        </Box>
      </MenuButton>
      <FilterContent onChange={onChange} filter={filter} />
    </Menu>
  )
}

export const FilterEnum = {
  Menu: FilterMenu,
  Content: FilterContent,
}
