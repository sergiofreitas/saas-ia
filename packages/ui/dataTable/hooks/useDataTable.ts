import { BaseRecord, HttpError } from '@refinedev/core'
import { UseTableProps, UseTableReturnType, useTable } from '@refinedev/react-table'
import { ColumnDef as BaseColumnDef } from '@tanstack/react-table'

export type ColumnsDef<TData, TValue = unknown> = BaseColumnDef<TData, TValue>[]

export type UseDataTableReturn<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  isLoading: boolean
} & UseTableReturnType<TData, TError>

export const useDataTable = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>(
  props: UseTableProps<TQueryFnData, TError, TData>,
): UseDataTableReturn<TData, TError> => {
  const response = useTable(props)

  return {
    isLoading: response.refineCore.tableQueryResult.isLoading,
    ...response,
  }
}
