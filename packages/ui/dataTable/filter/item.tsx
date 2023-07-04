import { IconButton, Text, HStack } from '@chakra-ui/react'
import { ActiveFilterItem, FilterItem } from '../hooks/useFilters'
import { IconX, IconCircle } from '@tabler/icons-react'
import { FilterOperator } from './operator'
import { FilterValue } from './value'

type FilterListItemProps = {
  filter: ActiveFilterItem
  onRemove: (filter: FilterItem) => void
  onChange: (value: string, operator: string) => void
}

export const FilterListItem: React.FC<FilterListItemProps> = ({ filter, onChange, onRemove }) => {
  const Icon = filter.ui.icon || IconCircle

  return (
    <HStack rounded="md" borderWidth={1} overflow="hidden" pl={3} spacing={0}>
      <Icon size={14} style={{ marginRight: '0.5rem' }} />
      <Text as="span" fontSize="xs" fontWeight="semibold" pr={1}>
        {filter.column.columnDef.header as string}
      </Text>
      <FilterOperator filter={filter} onChange={(operator) => onChange(filter.value, operator)} />
      <FilterValue filter={filter} onChange={(value) => onChange(value, filter.operator)} />
      <IconButton
        onClick={() => onRemove(filter)}
        variant="ghost"
        rounded={0}
        icon={<IconX size={14} opacity={0.7} />}
        aria-label="Remove"
      />
    </HStack>
  )
}
