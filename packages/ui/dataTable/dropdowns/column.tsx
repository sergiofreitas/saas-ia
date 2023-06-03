import { useMemo } from 'react'
import { BaseRecord, HttpError } from '@refinedev/core'
import { flexRender } from '@tanstack/react-table'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Text } from '@chakra-ui/react'
import { UseTableReturnType } from '@refinedev/react-table'
import { ToggleButton, ToggleButtonGroup } from '../../toggleButton'

type ColumnDropdownProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table?: UseTableReturnType<TData, TError>
  title: string
  children: React.ReactNode
}

export const ColumnDropdown: React.FC<ColumnDropdownProps> = ({ table, title, children }) => {
  const columns = table?.getAllLeafColumns()

  const defaultValues = columns?.reduce<string[]>((values, column) => {
    if (column.getIsVisible()) {
      values.push(column.id)
    }

    return values
  }, [])

  const handleChange = (values: string | string[]) => {
    for (const column of columns || []) {
      const isVisible = column.getIsVisible()
      const isChecked = values.includes(column.id)

      if (isVisible !== isChecked) {
        column.toggleVisibility(isChecked)
      }
    }
  }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Text fontSize="xs" mb={2}>
            {title}
          </Text>
          <ToggleButtonGroup
            variant="outline"
            size="xs"
            type="checkbox"
            onChange={handleChange}
            defaultValue={defaultValues}
          >
            {columns?.map((column) => (
              <ToggleButton key={`column-${column.id}`} value={column.id}>
                {column.columnDef.header as string}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
