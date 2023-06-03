import { BaseRecord, HttpError } from '@refinedev/core'
import { flexRender } from '@tanstack/react-table'
import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, forwardRef } from '@chakra-ui/react'
import { UseDataTableReturn } from './hooks/useDataTable'

type DataTableProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseDataTableReturn<TData, TError>
}

const DataTableCheckbox = forwardRef((props, ref) => {
  const { checked, indeterminate, ...rest } = props

  return (
    <div>
      <Checkbox ref={ref} isChecked={checked} isIndeterminate={indeterminate} {...rest} />
    </div>
  )
})

DataTableCheckbox.displayName = 'DataTableCheckbox'

export const DataTable: React.FC<DataTableProps> = ({ table }) => {
  return (
    <VStack width="100%" height="100%" alignItems="stretch">
      <TableContainer flex="1">
        <Table size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                <Th width="10px">
                  <DataTableCheckbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                </Th>
                {headerGroup.headers.map((header) => {
                  return <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Th>
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id} cursor="pointer">
                  <Td width="10px">
                    <DataTableCheckbox checked={row.getIsSelected()} onChange={() => row.toggleSelected()} />
                  </Td>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        py={3}
                        borderColor="whiteAlpha.100"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
