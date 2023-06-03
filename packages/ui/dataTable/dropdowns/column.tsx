import { BaseRecord, HttpError } from '@refinedev/core'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Text } from '@chakra-ui/react'
import { UseTableReturnType } from '@refinedev/react-table'
import { ToggleButton, ToggleButtonGroup } from '../../toggleButton'

type ColumnDropdownProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table?: UseTableReturnType<TData, TError>
  title: string
  children: React.ReactNode
}

const handleChange = (columns) => (values) => {}

export const ColumnDropdown: React.FC<ColumnDropdownProps> = ({ table, title, children }) => {
  const columns = table?.getAllLeafColumns()

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Text fontSize="xs" mb={2}>
            {title}
          </Text>
          <ToggleButtonGroup variant="outline" size="xs" type="checkbox" onChange={handleChange(columns)}>
            {columns?.map((column) => (
              <ToggleButton key={`column-${column.id}`} value={column.id}>
                {column.id}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
