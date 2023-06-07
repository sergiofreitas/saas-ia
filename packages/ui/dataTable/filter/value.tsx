import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ActiveFilterItem } from '../hooks/useFilters'

type FilterValueProps = {
  isOpen?: boolean
  filter: ActiveFilterItem
  onChange: (value: string) => void
}

const FilterValueBoolean: React.FC<FilterValueProps> = ({ filter, onChange, isOpen = false }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {filter.value === 'true' ? 'verdadeiro' : 'falso'}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onChange('true')}>verdadeiro</MenuItem>
        <MenuItem onClick={() => onChange('false')}>falso</MenuItem>
      </MenuList>
    </Menu>
  )
}

const FilterValueText: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Button variant="ghost" rounded={0}>
      {filter.value}
    </Button>
  )
}

const FilterValueNumber: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Button variant="ghost" rounded={0}>
      {filter.value}
    </Button>
  )
}

const FilterValueDate: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Button variant="ghost" rounded={0}>
      {filter.value}
    </Button>
  )
}

const FilterValueEnum: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Button variant="ghost" rounded={0}>
      {filter.value}
    </Button>
  )
}

export const FilterValue: React.FC<FilterValueProps> = (props) => {
  switch (props.filter.ui.type) {
    case 'boolean':
      return <FilterValueBoolean {...props} />
    case 'text':
    default:
      return <FilterValueText {...props} />
  }
}
