import { BaseRecord, HttpError } from '@refinedev/core'
import { HStack, Text, ButtonGroup, IconButton } from '@chakra-ui/react'
import { Form, SelectField, NumberInputField } from '@saas-ui/react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { UseDataTableReturn } from '../hooks/useDataTable'

type PaginationProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseDataTableReturn<TData, TError>
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isDev = process.env.NODE_ENV === 'development'

export const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <HStack alignItems="center" justifyContent="space-between" p={4} borderTopWidth={1}>
      <HStack alignItems="center" gap={1}>
        <Text fontSize="md">Page</Text>
        <Form
          onSubmit={(values) => {
            table.setPageIndex(Number(values.page) - 1)
          }}
        >
          <NumberInputField
            type="number"
            name="page"
            size="xs"
            w="80px"
            defaultValue={table.getState().pagination.pageIndex + 1}
            min={1}
            max={table.getPageCount()}
          />
        </Form>
        <Text fontSize="md">de {table.getPageCount()}</Text>
      </HStack>
      <HStack pr={isDev ? 12 : 0} gap={4}>
        <Form onSubmit={() => console.log('noop')}>
          <SelectField
            name="perPage"
            size="xs"
            defaultValue={`${table.getState().pagination.pageSize}`}
            onChange={(value) => table.setPageSize(Number(value))}
            options={[10, 25, 50, 100].map((it) => ({ value: `${it}`, label: `${it} por página` }))}
          />
        </Form>
        <ButtonGroup size="sm">
          <IconButton
            aria-label="Previous"
            icon={<IconChevronLeft />}
            isDisabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          />
          <IconButton
            aria-label="Next"
            icon={<IconChevronRight />}
            isDisabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          />
        </ButtonGroup>
      </HStack>
    </HStack>
  )
}
