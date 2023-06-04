import { Box } from '@chakra-ui/react'
import { ActiveFilterItem, FilterItem } from '../hooks/useFilters'

type FilterListItemProps = {
  filter: ActiveFilterItem
  onRemove: (filter: FilterItem) => void
}

export const FilterListItem: React.FC<FilterListItemProps> = ({ filter, onRemove }) => (
  <Box borderWidth={1}>
    <span>{filter.column.columnDef.header as string}</span>
    <span> {filter.operator}</span>
    <span> {filter.value}</span>
  </Box>
)
