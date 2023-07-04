import { Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import { ActiveFilterItem, FilterItem } from '../hooks/useFilters'

type FilterOperatorProps = {
  filter: ActiveFilterItem
  onChange: (operator: string) => void
}

type ValueLabel = {
  value: string
  label: string
}

const availableOptions = {
  text: [
    { value: 'contains', label: 'contém' },
    { value: 'ncontains', label: 'não contém' },
  ],
  number: [
    { value: 'lte', label: 'menor que' },
    { value: 'gte', label: 'maior que' },
  ],
  enum: [
    { value: 'eq', label: 'é igual a' },
    { value: 'ne', label: 'é diferente de' },
    { value: 'in', label: 'contém' },
    { value: 'nin', label: 'não contém' },
  ],
  date: [
    { value: 'lte', label: 'antes de' },
    { value: 'gte', label: 'depois de' },
  ],
  boolean: [{ value: 'eq', label: 'é' }],
}

export const getDefaultOperator = (filter: FilterItem): string => {
  return availableOptions[filter.ui.type][0].value
}

export const FilterOperator: React.FC<FilterOperatorProps> = ({ filter, onChange }) => {
  const options: ValueLabel[] = availableOptions[filter.ui.type] || []

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {options.find((o) => o.value == filter.operator)?.label}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={`option-${option.value}`} onClick={() => onChange(option.value)}>
            <Text fontSize="sm">{option.label}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
