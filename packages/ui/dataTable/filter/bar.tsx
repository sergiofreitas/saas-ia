import { BaseRecord, HttpError } from '@refinedev/core'
import { UseTableReturnType } from '@refinedev/react-table'
import { HStack, Wrap, WrapItem, Button } from '@chakra-ui/react'
import { useFilters } from '../hooks/useFilters'
import { FilterListItem } from './item'

type FilterBarProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseTableReturnType<TData, TError>
}

export const FilterBar: React.FC<FilterBarProps> = ({ table }) => {
  const { activated, removeFilter } = useFilters(table)

  if (!activated.length) {
    return null
  }

  return (
    <HStack
      px={6}
      py={2}
      gap={3}
      minHeight={10}
      borderBottomWidth={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Wrap flex="1" spacing="12px">
        {activated.map((filter) => (
          <WrapItem key={`filter-${filter.column.id}`}>
            <FilterListItem filter={filter} onRemove={() => removeFilter(filter)} />
          </WrapItem>
        ))}
      </Wrap>
      <Button size="sm" variant="ghost" onClick={() => table.resetColumnFilters(true)}>
        Clear filters
      </Button>
    </HStack>
  )
}
