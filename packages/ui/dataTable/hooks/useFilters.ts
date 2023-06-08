import { BaseRecord } from '@refinedev/core'
import { UseTableReturnType } from '@refinedev/react-table'
import { Column } from '@tanstack/react-table'

type UseFilterReturn<TData extends BaseRecord = BaseRecord> = {
  filters: FilterItem<TData>[]
  activated: ActiveFilterItem<TData>[]
  appendFilter: (filter: FilterItem<TData>, value: any, operator?: string) => void
  removeFilter: (filter: FilterItem<TData>) => void
}

export type EnumItem = {
  value: string
  label: React.ReactNode
}

export type EnumUI = { type: 'enum'; icon?: any; options: EnumItem[] }

export type FilterItem<TData extends BaseRecord = BaseRecord> = {
  column: Column<TData>
  ui:
    | EnumUI
    | { type: 'text'; icon?: any }
    | { type: 'date'; icon?: any }
    | { type: 'boolean'; icon?: any }
    | { type: 'number'; icon?: any }
}

export type ActiveFilterItem<TData extends BaseRecord = BaseRecord> = {
  operator: string
  value: string
} & FilterItem<TData>

export const useFilters = <TData extends BaseRecord = BaseRecord>(
  table: UseTableReturnType<TData>,
): UseFilterReturn<TData> => {
  const state = table.getState().columnFilters as any
  const columns = table.getAllLeafColumns().filter((column) => {
    return column.getCanFilter() && (column.columnDef as any).meta?.ui
  })

  const filters: FilterItem<TData>[] = columns.map((column) => {
    const meta = (column.columnDef as any).meta
    return { column, ui: meta.ui }
  })

  const activated: ActiveFilterItem<TData>[] = filters
    .filter((filter) => filter.column.getIsFiltered())
    .map((filter) => {
      const value = state.find((it: any) => it.id === filter.column.id)
      return {
        ...filter,
        operator: value.operator || (filter.column.columnDef as any).meta.filterOperator,
        value: value.value,
      }
    })

  const appendFilter = (filter: FilterItem<TData>, value: any, operator?: string) => {
    if (operator) {
      ;(filter.column.columnDef as any).meta.filterOperator = operator
    }
    filter.column.setFilterValue(value)
  }

  const removeFilter = (filter: FilterItem<TData>) => {
    filter.column.setFilterValue(null)
  }

  return {
    filters,
    activated,
    appendFilter,
    removeFilter,
  }
}
