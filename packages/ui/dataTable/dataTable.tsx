import { BaseRecord, HttpError } from '@refinedev/core'
import { flexRender } from '@tanstack/react-table'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Button } from '@chakra-ui/react'
import { Loader } from '@saas-ui/react'
import { IconAlertOctagonFilled, IconTableFilled } from '@tabler/icons-react'
import { UseDataTableReturn } from './hooks/useDataTable'
import { DataTableCheckbox } from './ui/checkbox'
import { Pagination } from './ui/pagination'
import { EmptyState } from '../emptyState'
import { FilterBar } from './filter/bar'

type DataTableProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseDataTableReturn<TData, TError>
}

export const DataTable: React.FC<DataTableProps> = ({ table }) => {
  if (table.isLoading) {
    return (
      <VStack width="100%" height="100%" position="relative">
        <Loader variant="overlay" />
      </VStack>
    )
  }

  if (table.isError) {
    return (
      <VStack width="100%" height="100%" position="relative">
        <EmptyState
          colorScheme="primary"
          icon={IconAlertOctagonFilled}
          title="Erro ao buscar dados"
          description={
            <>
              Tivemos um problema ao buscar os dados do servidor.
              <br />
              Por favor, tente novamente com outros filtros.
            </>
          }
        />
      </VStack>
    )
  }

  if (table.isFetched && table.refineCore.tableQueryResult.data?.total === 0) {
    return (
      <VStack width="100%" height="100%" position="relative">
        <EmptyState
          colorScheme="primary"
          icon={IconTableFilled}
          title="Nenhum resultado encontrado"
          description="Nenhum resultado encontrado com na busca realizada"
          actions={<Button variant="ghost">Limpar Filtros</Button>}
        />
      </VStack>
    )
  }

  return (
    <VStack width="100%" height="100%" flex="auto" alignItems="stretch">
      <FilterBar table={table} />
      <TableContainer flex="auto">
        <Table size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                <Th py={2} width="10px">
                  <DataTableCheckbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                </Th>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th py={2} key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Th>
                  )
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
      <Pagination table={table} />
    </VStack>
  )
}
