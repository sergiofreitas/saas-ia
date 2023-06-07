import { BaseRecord, HttpError } from '@refinedev/core'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Text } from '@chakra-ui/react'
import { UseTableReturnType } from '@refinedev/react-table'
import { useFilters } from '../hooks/useFilters'

type FilterDropdownProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseTableReturnType<TData, TError>
  children: React.ReactNode
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ table, children }) => {
  const { filters, activated } = useFilters(table)

  return <>{children}</>
}

/**
 * Filter type:
 * - text
 * - number
 * - enum
 * - date
 * - boolean
 *
 *
 * - Lista de opções (é igual, não é igual, é um destes)
 * - Lista de opções (contem e não contem)
 * - Modal de texto (contem e não contem)
 * - Modal de numeros (maior que, menor que, igual, diferente)
 * - Lista de datas (antes e depois)
 */
