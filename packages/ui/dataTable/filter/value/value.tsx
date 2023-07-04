import { ActiveFilterItem } from '../../hooks/useFilters'
import { FilterEnum } from '../value/filterEnum'
import { FilterBoolean } from './filterBoolean'
import { FilterNumber } from './filterNumber'
import { FilterDate } from './filterDate'
import { FilterText } from './filterText'

type FilterValueProps = {
  isOpen?: boolean
  filter: ActiveFilterItem
  onChange: (value: string) => void
}

export const FilterValue: React.FC<FilterValueProps> = (props) => {
  switch (props.filter.ui.type) {
    case 'boolean':
      return <FilterBoolean.Menu {...props} />
    case 'number':
      return <FilterNumber.Menu {...props} />
    case 'date':
      return <FilterDate.Menu {...props} />
    case 'enum':
      return <FilterEnum.Menu {...props} />
    case 'text':
    default:
      return <FilterText.Menu {...props} />
  }
}
