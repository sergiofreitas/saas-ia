import { ActiveFilterItem } from '../../hooks/useFilters'

type FilterValueProps = {
  isOpen?: boolean
  filter: ActiveFilterItem
  onChange: (value: string) => void
}
